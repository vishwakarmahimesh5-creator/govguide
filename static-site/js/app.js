/* GovGuide India — shared app shell and interactions (vanilla JS).
   Loaded on every page after data.js. */

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */
const GG = {};

GG.esc = function (value) {
    return String(value == null ? "" : value).replace(
        /[&<>"']/g,
        (c) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        })[c],
    );
};

GG.icon = function (name, extraClass) {
    return `<i data-lucide="${name}"${extraClass ? ` class="${extraClass}"` : ""}></i>`;
};

GG.refreshIcons = function () {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
};

GG.formatDate = function (value, monthStyle) {
    return new Date(value).toLocaleDateString("en-IN", {
        day: "numeric",
        month: monthStyle || "short",
        year: "numeric",
    });
};

/* localStorage-backed string list, same keys as the original app */
GG.store = {
    read(key) {
        try {
            const raw = window.localStorage.getItem(key);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    },

    write(key, items) {
        try {
            window.localStorage.setItem(key, JSON.stringify(items));
        } catch {
            /* storage unavailable */
        }
    },

    add(key, value, limit) {
        const trimmed = String(value).trim();

        if (!trimmed) return this.read(key);

        const items = this.read(key).filter((i) => i !== trimmed);
        const next = [trimmed, ...items].slice(0, limit || 20);

        this.write(key, next);

        return next;
    },

    toggle(key, value) {
        const items = this.read(key);

        const next = items.includes(value)
            ? items.filter((i) => i !== value)
            : [value, ...items];

        this.write(key, next);

        return next;
    },

    clear(key) {
        this.write(key, []);
    },
};

/* ------------------------------------------------------------------ *
 * Authentication
 * ------------------------------------------------------------------ */

/*
  Check whether the user is currently logged in.
*/
GG.isLoggedIn = function () {
    return localStorage.getItem("isLoggedIn") === "true";
};

/*
  Logout user.
*/
GG.logout = function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("govguide-user");

    GG.toast("Logged out", "You have been logged out successfully.");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 700);
};

/* ------------------------------------------------------------------ *
 * Toast notifications
 * ------------------------------------------------------------------ */
GG.toast = function (title, description, tone) {
    let host = document.querySelector(".toasts");

    if (!host) {
        host = document.createElement("div");
        host.className = "toasts";
        document.body.appendChild(host);
    }

    const el = document.createElement("div");

    el.className = "toast" + (tone === "error" ? " error" : "");
    el.setAttribute("role", "status");

    el.innerHTML = `
    <strong>${GG.esc(title)}</strong>
    ${description ? `<span>${GG.esc(description)}</span>` : ""}
  `;

    host.appendChild(el);

    setTimeout(() => el.remove(), 4000);
};

/* ------------------------------------------------------------------ *
 * Scroll reveal
 * ------------------------------------------------------------------ */
GG.reveal = function (root) {
    const nodes = (root || document).querySelectorAll(".reveal:not(.in)");

    if (!("IntersectionObserver" in window)) {
        nodes.forEach((n) => n.classList.add("in"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const delay = Number(entry.target.dataset.delay || 0);

                setTimeout(
                    () => entry.target.classList.add("in"),
                    delay * 1000,
                );

                observer.unobserve(entry.target);
            });
        },
        { rootMargin: "-40px" },
    );

    nodes.forEach((node) => observer.observe(node));
};

/* ------------------------------------------------------------------ *
 * Animated counters
 * ------------------------------------------------------------------ */
GG.counters = function () {
    document.querySelectorAll("[data-count]").forEach((node) => {
        const value = Number(node.dataset.count);
        const suffix = node.dataset.suffix || "";
        const duration = 1400;

        let started = false;

        const run = () => {
            if (started) return;

            started = true;

            const start = performance.now();

            const tick = (now) => {
                const progress = Math.min(
                    (now - start) / duration,
                    1,
                );

                const current = Math.round(
                    value * (1 - Math.pow(1 - progress, 3)),
                );

                node.textContent =
                    current.toLocaleString("en-IN") + suffix;

                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            };

            requestAnimationFrame(tick);
        };

        if (!("IntersectionObserver" in window)) {
            return run();
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0] && entries[0].isIntersecting) {
                run();
                observer.disconnect();
            }
        });

        observer.observe(node);
    });
};

/* ------------------------------------------------------------------ *
 * Accordion
 * ------------------------------------------------------------------ */
GG.accordion = function (container) {
    container.addEventListener("click", (event) => {
        const trigger = event.target.closest(".accordion-trigger");

        if (!trigger || !container.contains(trigger)) return;

        const panel = trigger.nextElementSibling;

        const isOpen =
            trigger.getAttribute("aria-expanded") === "true";

        container
            .querySelectorAll(".accordion-trigger")
            .forEach((other) => {
                other.setAttribute("aria-expanded", "false");

                if (other.nextElementSibling) {
                    other.nextElementSibling.classList.remove("open");
                }
            });

        if (!isOpen) {
            trigger.setAttribute("aria-expanded", "true");
            panel.classList.add("open");
        }
    });
};

GG.accordionMarkup = function (items, renderQuestion) {
    return `
    <div class="accordion">
      ${items
            .map(
                (item, index) => `
          <div class="accordion-item">

            <button
              class="accordion-trigger"
              aria-expanded="false"
              id="acc-t-${index}"
              aria-controls="acc-p-${index}"
            >
              <span>
                ${renderQuestion
                        ? renderQuestion(item)
                        : GG.esc(item.question)
                    }
              </span>

              ${GG.icon("chevron-down")}
            </button>

            <div
              class="accordion-panel"
              id="acc-p-${index}"
              role="region"
              aria-labelledby="acc-t-${index}"
            >
              ${GG.esc(item.answer)}
            </div>

          </div>
        `,
            )
            .join("")}
    </div>
  `;
};

/* ------------------------------------------------------------------ *
 * Theme
 * ------------------------------------------------------------------ */
GG.theme = {
    get() {
        return (
            document.documentElement.getAttribute("data-theme") ||
            "light"
        );
    },

    set(value) {
        document.documentElement.setAttribute(
            "data-theme",
            value,
        );

        try {
            window.localStorage.setItem(
                "govguide-theme",
                value,
            );
        } catch {
            /* ignore */
        }

        const btn = document.querySelector(
            "[data-theme-toggle]",
        );

        if (btn) {
            btn.innerHTML = GG.icon(
                value === "dark" ? "sun" : "moon",
            );

            btn.setAttribute(
                "aria-label",
                value === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode",
            );

            GG.refreshIcons();
        }
    },

    toggle() {
        this.set(
            this.get() === "dark" ? "light" : "dark",
        );
    },
};

/* ------------------------------------------------------------------ *
 * Shell data
 * ------------------------------------------------------------------ */
const navItems = [
    { label: "Home", href: "index.html" },
    { label: "Services", href: "services.html" },
    { label: "Tutorials", href: "tutorials.html" },
    { label: "Nearby Centres", href: "centres.html" },
    { label: "Government Updates", href: "updates.html" },
    { label: "FAQ", href: "faq.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" },
];

const bottomNavItems = [
    {
        label: "Home",
        href: "index.html",
        icon: "house",
    },
    {
        label: "Search",
        href: "services.html",
        icon: "search",
    },
    {
        label: "Services",
        href: "tutorials.html",
        icon: "layout-grid",
    },
    {
        label: "Centres",
        href: "centres.html",
        icon: "map-pin",
    },
    {
        label: "Profile",
        href: "dashboard.html",
        icon: "user",
    },
];

const footerResources = [
    {
        label: "All Tutorials",
        href: "tutorials.html",
    },
    {
        label: "Nearby Centres",
        href: "centres.html",
    },
    {
        label: "Government Updates",
        href: "updates.html",
    },
    {
        label: "FAQ",
        href: "faq.html",
    },
];

const footerCompany = [
    {
        label: "About Us",
        href: "about.html",
    },
    {
        label: "Contact",
        href: "contact.html",
    },
    {
        label: "Login",
        href: "login.html",
    },
    {
        label: "Register",
        href: "register.html",
    },
];

GG.currentPage = function () {
    if (document.body.dataset.page) {
        return document.body.dataset.page;
    }
    // Automatically get the current filename from the URL (e.g., 'about.html')
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf("/") + 1);

    return page || "index.html";
};

/* ------------------------------------------------------------------ *
 * Header
 * ------------------------------------------------------------------ */
GG.renderHeader = function () {
    const current = GG.currentPage();

    const links = navItems
        .map(
            (item) =>
                `<a class="nav-link${item.href === current ? " active" : ""
                }" href="${item.href}">${item.label}</a>`,
        )
        .join("");

    const loggedIn = GG.isLoggedIn();

    return `
  <header class="site-header glass">

    <div class="container nav-bar">

      <a
        class="brand"
        href="index.html"
        aria-label="GovGuide India home"
      >
        <span class="brand-mark">
          ${GG.icon("shield-check")}
        </span>

        <span class="brand-text">
          <span class="brand-title">
            GovGuide India
          </span>

          <span class="brand-sub">
            Learn Government Services the Easy Way
          </span>
        </span>
      </a>

      <nav
        class="desktop-nav"
        aria-label="Main"
      >
        ${links}
      </nav>

      <div class="nav-actions">

        <button
          class="btn btn-icon"
          type="button"
          data-open-search
          aria-label="Search services"
        >
          ${GG.icon("search")}
        </button>

        <button
          class="btn btn-icon"
          type="button"
          data-theme-toggle
          aria-label="Switch to dark mode"
        >
          ${GG.icon("moon")}
        </button>

        ${loggedIn
            ? `
              <a
                class="btn btn-ghost btn-round hide-sm"
                href="dashboard.html"
              >
                Dashboard
              </a>

              <button
                class="btn btn-round shadow-soft hide-sm"
                type="button"
                data-logout
              >
                Logout
              </button>
            `
            : `
              <a
                class="btn btn-ghost btn-round hide-sm"
                href="login.html"
              >
                Login
              </a>

              <a
                class="btn btn-round shadow-soft hide-sm"
                href="register.html"
              >
                Register
              </a>
            `
        }

        <button
          class="btn btn-icon show-xl-down"
          type="button"
          data-menu-toggle
          aria-label="Open menu"
          aria-expanded="false"
        >
          ${GG.icon("menu")}
        </button>

      </div>

    </div>

    <div
      class="mobile-menu"
      data-mobile-menu
      hidden
    >

      <nav aria-label="Mobile">
        ${links}
      </nav>

      <div class="row">

        ${loggedIn
            ? `
              <a
                class="btn btn-outline btn-round"
                href="dashboard.html"
              >
                Dashboard
              </a>

              <button
                class="btn btn-round"
                type="button"
                data-logout
              >
                Logout
              </button>
            `
            : `
              <a
                class="btn btn-outline btn-round"
                href="login.html"
              >
                Login
              </a>

              <a
                class="btn btn-round"
                href="register.html"
              >
                Register
              </a>
            `
        }

      </div>

    </div>

  </header>`;
};

/* ------------------------------------------------------------------ *
 * Bottom navigation
 * ------------------------------------------------------------------ */
GG.renderBottomNav = function () {
    const current = GG.currentPage();

    return `
  <nav
    class="bottom-nav glass"
    aria-label="Quick navigation"
  >
    <ul>

      ${bottomNavItems
            .map(
                (item) => `
          <li>

            <a
              href="${item.href}"
              class="${item.href === current
                        ? "active"
                        : ""
                    }"
            >

              ${GG.icon(item.icon)}

              ${item.label}

            </a>

          </li>
        `,
            )
            .join("")}

    </ul>
  </nav>`;
};

/* ------------------------------------------------------------------ *
 * Footer
 * ------------------------------------------------------------------ */
GG.renderFooter = function () {
    const serviceLinks = services
        .slice(0, 6)
        .map(
            (service) =>
                `<li>
          <a href="service.html?slug=${service.slug}">
            ${GG.esc(service.name)}
          </a>
        </li>`,
        )
        .join("");

    const column = (title, items) => `
    <div>

      <h3>${title}</h3>

      <ul>
        ${items
            .map(
                (i) =>
                    `<li>
                <a href="${i.href}">
                  ${i.label}
                </a>
              </li>`,
            )
            .join("")}
      </ul>

    </div>`;

    return `
  <footer class="site-footer">

    <div class="container">

      <div class="footer-grid">

        <div class="footer-brand">

          <div class="brand">

            <span
              class="brand-mark"
              style="box-shadow:none"
            >
              ${GG.icon("shield-check")}
            </span>

            <span class="brand-title">
              GovGuide India
            </span>

          </div>

          <p
            class="muted small"
            style="margin-top:1rem;max-width:24rem;line-height:1.7"
          >
            An independent learning platform that explains
            Indian government services in plain language.
            We never ask for your Aadhaar number, OTP or documents.
          </p>

          <form
            class="row"
            style="margin-top:1.5rem;max-width:24rem;flex-wrap:nowrap"
            data-newsletter
          >

            <label
              class="sr-only"
              for="newsletter-email"
            >
              Email address
            </label>

            <input
              class="input input-round"
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
            />

            <button
              class="btn btn-round"
              type="submit"
            >
              Subscribe
            </button>

          </form>

          <div class="social">

            ${[
            "twitter",
            "facebook",
            "instagram",
            "linkedin",
        ]
            .map(
                (name) =>
                    `<a
                    href="#"
                    aria-label="Social media"
                  >
                    ${GG.icon(name)}
                  </a>`,
            )
            .join("")}

          </div>

        </div>

        <div>

          <h3>Services</h3>

          <ul>
            ${serviceLinks}
          </ul>

        </div>

        ${column(
                "Resources",
                footerResources,
            )}

        ${column(
                "Company",
                footerCompany,
            )}

      </div>

      <div class="footer-bottom">

        <p>
          © ${new Date().getFullYear()}
          GovGuide India.
          Not an official government website.
        </p>

        <div
          class="row"
          style="gap:1rem"
        >
          <a href="about.html">
            Privacy Policy
          </a>

          <a href="about.html">
            Terms of Use
          </a>

          <a href="contact.html">
            Feedback
          </a>
        </div>

      </div>

    </div>

  </footer>`;
};

/* ------------------------------------------------------------------ *
 * Assistant
 * ------------------------------------------------------------------ */
GG.renderAssistant = function () {
    return `
  <button
    class="assistant-fab"
    type="button"
    data-assistant-toggle
    aria-label="Open GovGuide assistant"
    aria-expanded="false"
  >
    ${GG.icon("message-circle")}
  </button>

  <aside
    class="assistant-panel"
    data-assistant-panel
    aria-label="GovGuide assistant"
    hidden
  >

    <div class="assistant-head">

      ${GG.icon("sparkles")}

      <div>

        <p
          style="font-size:.875rem;font-weight:600"
        >
          GovGuide Assistant
        </p>

        <p
          style="font-size:.6875rem;opacity:.8"
        >
          Answers in seconds · demo replies
        </p>

      </div>

    </div>

    <div
      class="assistant-body"
      data-assistant-body
    >

      <div class="msg-bot">
        Namaste! I'm the GovGuide assistant.
        Ask me about any government service and
        I'll point you to the right tutorial.
      </div>

      <div
        class="row"
        style="gap:.5rem;padding-top:.25rem"
        data-assistant-suggestions
      >

        ${assistantSuggestions
            .map(
                (s) =>
                    `<button
                type="button"
                class="chip"
              >
                ${GG.esc(s)}
              </button>`,
            )
            .join("")}

      </div>

    </div>

    <form
      class="assistant-form"
      data-assistant-form
    >

      <label
        class="sr-only"
        for="assistant-input"
      >
        Ask a question
      </label>

      <input
        class="input input-round"
        id="assistant-input"
        placeholder="Ask anything…"
        autocomplete="off"
      />

      <button
        class="btn btn-icon"
        type="submit"
        aria-label="Send message"
        style="background:var(--primary);color:var(--primary-foreground)"
      >
        ${GG.icon("send")}
      </button>

    </form>

  </aside>`;
};

/* ------------------------------------------------------------------ *
 * Search dialog
 * ------------------------------------------------------------------ */
GG.renderSearchDialog = function () {
    return `
  <div
    class="overlay"
    data-search-overlay
    hidden
  >

    <div
      class="command"
      role="dialog"
      aria-modal="true"
      aria-label="Search services"
    >

      <div class="command-input">

        ${GG.icon("search", "muted")}

        <input
          data-search-input
          placeholder="What do you want to do today?"
          autocomplete="off"
        />

      </div>

      <div
        class="command-list"
        data-search-list
      ></div>

    </div>

  </div>`;
};

const assistantFallback =
    "I can help with Aadhaar, PAN, DigiLocker, Passport, Driving Licence, Voter ID, Ayushman Bharat, PM Kisan, Birth Certificate and CSC. Open the matching tutorial for the full step-by-step guide.";

GG.initAssistant = function () {
    const fab = document.querySelector(
        "[data-assistant-toggle]",
    );

    const panel = document.querySelector(
        "[data-assistant-panel]",
    );

    const body = document.querySelector(
        "[data-assistant-body]",
    );

    const form = document.querySelector(
        "[data-assistant-form]",
    );

    if (!fab || !panel || !body || !form) return;

    const input = form.querySelector("input");

    const suggestions = body.querySelector(
        "[data-assistant-suggestions]",
    );

    const send = (text) => {
        const question = String(text).trim();

        if (!question) return;

        const user = document.createElement("div");
        user.className = "msg-user";
        user.textContent = question;

        const bot = document.createElement("div");
        bot.className = "msg-bot";
        bot.textContent =
            assistantAnswers[question] ||
            assistantFallback;

        body.insertBefore(user, suggestions);
        body.insertBefore(bot, suggestions);

        input.value = "";

        body.scrollTop = body.scrollHeight;
    };

    fab.addEventListener("click", () => {
        const open = panel.hidden;

        panel.hidden = !open;

        fab.setAttribute(
            "aria-expanded",
            String(open),
        );

        fab.innerHTML = GG.icon(
            open ? "x" : "message-circle",
        );

        fab.setAttribute(
            "aria-label",
            open
                ? "Close assistant"
                : "Open GovGuide assistant",
        );

        GG.refreshIcons();
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        send(input.value);
    });

    suggestions.addEventListener(
        "click",
        (event) => {
            const button =
                event.target.closest("button");

            if (button) {
                send(button.textContent);
            }
        },
    );
};

/* ------------------------------------------------------------------ *
 * Search dialog
 * ------------------------------------------------------------------ */
GG.initSearchDialog = function () {
    const overlay = document.querySelector(
        "[data-search-overlay]",
    );

    if (!overlay) return;

    const input = overlay.querySelector(
        "[data-search-input]",
    );

    const list = overlay.querySelector(
        "[data-search-list]",
    );

    const render = () => {
        const recent = GG.store.read(
            "govguide-recent-searches",
        );

        const query = input.value
            .trim()
            .toLowerCase();

        const matches = services.filter(
            (service) =>
                `${service.name} ${service.category} ${service.tagline}`
                    .toLowerCase()
                    .includes(query),
        );

        const popular = popularSearches.filter(
            (item) =>
                item.toLowerCase().includes(query),
        );

        const recentMatches = recent.filter(
            (item) =>
                item.toLowerCase().includes(query),
        );

        let html = "";

        if (
            !matches.length &&
            !popular.length &&
            !recentMatches.length
        ) {
            html = `
        <p class="command-empty">
          No matching service.
          Try "Aadhaar" or "Passport".
        </p>`;
        } else {
            if (recentMatches.length) {
                html += `
          <p class="command-group-label">
            Recent searches
          </p>

          ${recentMatches
                        .map(
                            (item) =>
                                `<button
                  class="command-item"
                  type="button"
                  data-fill="${GG.esc(item)}"
                >
                  ${GG.icon("search", "muted")}
                  ${GG.esc(item)}
                </button>`,
                        )
                        .join("")}`;
            }

            if (matches.length) {
                html += `
          <p class="command-group-label">
            Services
          </p>

          ${matches
                        .map(
                            (service) =>
                                `<button
                  class="command-item"
                  type="button"
                  data-slug="${service.slug}"
                  data-name="${GG.esc(service.name)}"
                >

                  ${GG.icon(service.icon)}

                  <span class="name">
                    ${GG.esc(service.name)}
                  </span>

                  <span class="hint">
                    ${GG.esc(service.tagline)}
                  </span>

                </button>`,
                        )
                        .join("")}`;
            }

            if (popular.length) {
                html += `
          <p class="command-group-label">
            Popular searches
          </p>

          ${popular
                        .map(
                            (item) =>
                                `<button
                  class="command-item"
                  type="button"
                  data-fill="${GG.esc(item)}"
                >
                  ${GG.icon("search", "muted")}
                  ${GG.esc(item)}
                </button>`,
                        )
                        .join("")}`;
            }
        }

        list.innerHTML = html;

        GG.refreshIcons();
    };

    const open = () => {
        overlay.hidden = false;

        render();

        input.focus();
    };

    const close = () => {
        overlay.hidden = true;
        input.value = "";
    };

    document
        .querySelectorAll("[data-open-search]")
        .forEach((btn) =>
            btn.addEventListener(
                "click",
                open,
            ),
        );

    overlay.addEventListener(
        "click",
        (event) => {
            if (event.target === overlay) {
                close();
            }
        },
    );

    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "k" &&
                (event.metaKey ||
                    event.ctrlKey)
            ) {
                event.preventDefault();

                if (overlay.hidden) {
                    open();
                } else {
                    close();
                }
            }

            if (
                event.key === "Escape" &&
                !overlay.hidden
            ) {
                close();
            }
        },
    );

    input.addEventListener(
        "input",
        render,
    );

    list.addEventListener(
        "click",
        (event) => {
            const item =
                event.target.closest(
                    ".command-item",
                );

            if (!item) return;

            if (item.dataset.slug) {
                GG.store.add(
                    "govguide-recent-searches",
                    item.dataset.name,
                    5,
                );

                window.location.href =
                    `service.html?slug=${item.dataset.slug}`;

                return;
            }

            input.value =
                item.dataset.fill || "";

            render();

            input.focus();
        },
    );
};

/* ------------------------------------------------------------------ *
 * Shared markup
 * ------------------------------------------------------------------ */
GG.serviceCard = function (
    service,
    index,
) {
    const offlineOnly =
        service.mode === "Offline";

    return `
  <div
    class="reveal"
    data-delay="${Math.min(
        (index || 0) * 0.05,
        0.4,
    )}"
    style="height:100%"
  >

    <a
      class="service-card"
      href="service.html?slug=${service.slug}"
    >

      <div
        class="row-between"
        style="align-items:flex-start"
      >

        <span class="icon-tile lg">
          ${GG.icon(service.icon)}
        </span>

        <span
          class="badge ${offlineOnly
            ? "badge-accent"
            : "badge-success"
        }"
        >
          ${GG.icon(
            offlineOnly
                ? "wifi-off"
                : "wifi",
        )}

          ${GG.esc(service.mode)}
        </span>

      </div>

      <h3>
        ${GG.esc(service.name)}
      </h3>

      <p class="desc">
        ${GG.esc(service.description)}
      </p>

      <dl class="service-meta">

        <div>

          <dt>
            ${GG.icon("clock")}
            Est. time
          </dt>

          <dd>
            ${GG.esc(
            service.estimatedTime,
        )}
          </dd>

        </div>

        <div>

          <dt>
            ${GG.icon("indian-rupee")}
            Starting fee
          </dt>

          <dd>
            ${GG.esc(service.fee)}
          </dd>

        </div>

      </dl>

      <span class="card-cta">
        View Tutorial
        ${GG.icon("arrow-right")}
      </span>

    </a>

  </div>`;
};

/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */
GG.boot = function (pageInit) {

    /* Render header */
    document.body.insertAdjacentHTML(
        "afterbegin",
        GG.renderHeader(),
    );

    /* Render footer and other shared components */
    document.body.insertAdjacentHTML(
        "beforeend",
        GG.renderFooter() +
        GG.renderAssistant() +
        GG.renderBottomNav() +
        GG.renderSearchDialog(),
    );

    /* Theme */
    let stored = null;

    try {
        stored =
            window.localStorage.getItem(
                "govguide-theme",
            );
    } catch {
        /* ignore */
    }

    GG.theme.set(
        stored ||
        (window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches
            ? "dark"
            : "light"),
    );

    const themeButton =
        document.querySelector(
            "[data-theme-toggle]",
        );

    if (themeButton) {
        themeButton.addEventListener(
            "click",
            () => GG.theme.toggle(),
        );
    }

    /* Mobile menu */
    const menuToggle =
        document.querySelector(
            "[data-menu-toggle]",
        );

    const menu =
        document.querySelector(
            "[data-mobile-menu]",
        );

    if (menuToggle && menu) {
        menuToggle.addEventListener(
            "click",
            () => {
                const open = menu.hidden;

                menu.hidden = !open;

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(open),
                );

                menuToggle.innerHTML = GG.icon(
                    open ? "x" : "menu",
                );

                menuToggle.setAttribute(
                    "aria-label",
                    open
                        ? "Close menu"
                        : "Open menu",
                );

                GG.refreshIcons();
            },
        );
    }

    /* -------------------------------------------------------------- *
     * Logout buttons
     * -------------------------------------------------------------- */

    document
        .querySelectorAll("[data-logout]")
        .forEach((button) => {
            button.addEventListener(
                "click",
                () => {
                    GG.logout();
                },
            );
        });

    /* Newsletter */
    const newsletter = document.querySelector("[data-newsletter]");

    if (newsletter) {
        newsletter.addEventListener("submit", async (event) => {
            event.preventDefault();

            const emailInput = document.getElementById("newsletter-email");
            const submitBtn = newsletter.querySelector('button[type="submit"]');
            const email = emailInput ? emailInput.value.trim() : "";

            if (!email) return;

            // Optional: disable button while request is in progress
            if (submitBtn) submitBtn.disabled = true;

            try {
                const response = await fetch("/api/subscribe", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    GG.toast(
                        "Subscribed!",
                        data.message || "You have been subscribed successfully."
                    );
                    newsletter.reset();
                } else {
                    GG.toast(
                        "Subscription Failed",
                        data.message || "Unable to complete subscription.",
                        "error"
                    );
                }
            } catch (err) {
                console.error("Subscription request error:", err);
                GG.toast(
                    "Network Error",
                    "Could not connect to the server. Please try again.",
                    "error"
                );
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    /* Assistant */
    GG.initAssistant();

    /* Search */
    GG.initSearchDialog();

    /* Page-specific initialization */
    if (typeof pageInit === "function") {
        pageInit();
    }

    /* Icons */
    GG.refreshIcons();

    /* Reveal animations */
    GG.reveal();

    /* Counters */
    GG.counters();
};