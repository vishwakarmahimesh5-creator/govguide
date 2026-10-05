/* Services index: search, suggestions, filters */
(function () {
    const params = new URLSearchParams(window.location.search);

    const state = {
        query: params.get("q") || "",
        mode: "all",
        cost: "all",
        stateFilter: "All India",
        showSuggestions: false,
    };

    let main;

    function suggestionsFor(query) {
        if (!query.trim()) return [];
        const lower = query.toLowerCase();
        return [...services.map((s) => s.name), ...popularSearches]
            .filter((item) => item.toLowerCase().includes(lower))
            .slice(0, 5);
    }

    function results() {
        const lower = state.query.trim().toLowerCase();
        return services.filter((service) => {
            const matchesQuery =
                !lower ||
                [service.name, service.tagline, service.description, service.category, ...service.mistakes]
                    .join(" ")
                    .toLowerCase()
                    .includes(lower);
            const matchesMode =
                state.mode === "all" ||
                (state.mode === "online" && service.mode !== "Offline") ||
                (state.mode === "offline" && service.mode !== "Online");
            const matchesCost =
                state.cost === "all" ||
                (state.cost === "free" && service.feeAmount === 0) ||
                (state.cost === "paid" && service.feeAmount > 0);
            const matchesState =
                state.stateFilter === "All India" ||
                service.states.includes("All India") ||
                service.states.includes(state.stateFilter) ||
                service.states.includes("State-specific");
            return matchesQuery && matchesMode && matchesCost && matchesState;
        });
    }

    function segmented(label, key, options) {
        return `<div class="segmented" role="group" aria-label="${label}" data-filter="${key}">
      ${options
                .map(
                    (option) =>
                        `<button type="button" data-value="${option.value}" aria-pressed="${state[key] === option.value}">${option.label}</button>`,
                )
                .join("")}
    </div>`;
    }

    function render() {
        const list = results();
        const activeFilters =
            (state.mode !== "all" ? 1 : 0) +
            (state.cost !== "all" ? 1 : 0) +
            (state.stateFilter !== "All India" ? 1 : 0);
        const recent = GG.store.read("govguide-recent-searches");
        const suggestions = state.showSuggestions ? suggestionsFor(state.query) : [];

        main.innerHTML = `
    <div class="container page">
      <div class="reveal max-2xl">
        <h1 class="h1">All Government Services</h1>
        <p class="lead">
          Search in plain language, filter by what matters to you, and open the tutorial that fits.
        </p>
      </div>

      <div class="card card-xl shadow-soft" style="margin-top:2rem">
        <form style="position:relative" data-search-form>
          <label class="sr-only" for="services-search">Search services</label>
          <span style="position:absolute;left:1rem;top:50%;transform:translateY(-50%);font-size:1.25rem;color:var(--muted-foreground);pointer-events:none">${GG.icon("search")}</span>
          <input class="input input-lg" id="services-search" autocomplete="off"
            placeholder="What do you want to do today?" value="${GG.esc(state.query)}" />
          <button class="btn" type="submit" style="position:absolute;right:.5rem;top:.5rem;height:2.5rem;border-radius:.75rem;padding-inline:1.25rem">Search</button>

          ${suggestions.length
                ? `<ul class="suggestions">${suggestions
                    .map(
                        (item) =>
                            `<li><button type="button" data-suggestion="${GG.esc(item)}">${GG.icon("search", "muted")}${GG.esc(item)}</button></li>`,
                    )
                    .join("")}</ul>`
                : ""
            }
        </form>

        ${recent.length
                ? `<div class="row" style="margin-top:1rem;gap:.5rem" data-recent>
                <span class="xs muted" style="font-weight:600">Recent</span>
                ${recent
                    .map(
                        (item) =>
                            `<button type="button" class="chip chip-muted" data-suggestion="${GG.esc(item)}">${GG.esc(item)}</button>`,
                    )
                    .join("")}
                <button type="button" class="xs muted" data-clear-recent style="background:none;border:0;text-decoration:underline;cursor:pointer">Clear</button>
              </div>`
                : ""
            }

        <div class="row" style="margin-top:1rem;gap:.5rem" data-popular>
          <span class="xs muted" style="font-weight:600">Popular</span>
          ${popularSearches
                .map(
                    (item) =>
                        `<button type="button" class="chip" data-suggestion="${GG.esc(item)}">${GG.esc(item)}</button>`,
                )
                .join("")}
        </div>

        <div class="row" style="margin-top:1.5rem;border-top:1px solid var(--border);padding-top:1.25rem">
          <span class="row small" style="gap:.4rem;font-weight:500">${GG.icon("sliders-horizontal")} Filters</span>

          ${segmented("Mode", "mode", [
                    { value: "all", label: "All" },
                    { value: "online", label: "Online only" },
                    { value: "offline", label: "Offline only" },
                ])}

          ${segmented("Cost", "cost", [
                    { value: "all", label: "Any" },
                    { value: "free", label: "Free" },
                    { value: "paid", label: "Paid" },
                ])}

          <label class="sr-only" for="state-filter">State</label>
          <select class="select" id="state-filter" data-state>
            ${indianStates
                .map(
                    (item) =>
                        `<option value="${GG.esc(item)}"${item === state.stateFilter ? " selected" : ""}>${GG.esc(item)}</option>`,
                )
                .join("")}
          </select>

          ${activeFilters > 0 || state.query
                ? `<button type="button" class="btn btn-ghost btn-round btn-sm" data-reset>${GG.icon("x")} Reset</button>`
                : ""
            }
        </div>
      </div>

      <div class="row-between" style="margin-top:2rem">
        <p class="small muted">
          Showing <span style="font-weight:600;color:var(--foreground)">${list.length}</span> of ${services.length} services
        </p>
        ${activeFilters > 0 ? `<span class="badge">${activeFilters} filter${activeFilters > 1 ? "s" : ""} active</span>` : ""}
      </div>

      ${list.length === 0
                ? `<div class="dashed" style="margin-top:2.5rem">
              <p class="font-display" style="font-size:1.125rem">No service matches that search</p>
              <p class="small muted" style="margin-top:.5rem">Try a broader term such as "Aadhaar", "licence" or "certificate".</p>
            </div>`
                : `<div class="grid cols-4" style="margin-top:1.5rem">${list
                    .map((service, index) => GG.serviceCard(service, index))
                    .join("")}</div>`
            }
    </div>`;

        bind();
        GG.refreshIcons();
        GG.reveal(main);
    }

    function runSearch(value) {
        state.query = value;
        state.showSuggestions = false;
        if (value.trim()) GG.store.add("govguide-recent-searches", value.trim(), 5);
        const url = value.trim()
            ? `services.html?q=${encodeURIComponent(value.trim())}`
            : "services.html";
        window.history.replaceState({}, "", url);
        render();
    }

    function bind() {
        const form = main.querySelector("[data-search-form]");
        const input = form.querySelector("input");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            runSearch(input.value);
        });

        input.addEventListener("input", () => {
            state.query = input.value;
            state.showSuggestions = true;
            render();
            const fresh = main.querySelector("#services-search");
            fresh.focus();
            fresh.setSelectionRange(fresh.value.length, fresh.value.length);
        });

        main.querySelectorAll("[data-suggestion]").forEach((button) =>
            button.addEventListener("click", () => runSearch(button.dataset.suggestion)),
        );

        const clear = main.querySelector("[data-clear-recent]");
        if (clear) {
            clear.addEventListener("click", () => {
                GG.store.clear("govguide-recent-searches");
                render();
            });
        }

        main.querySelectorAll("[data-filter]").forEach((group) => {
            group.addEventListener("click", (event) => {
                const button = event.target.closest("button");
                if (!button) return;
                state[group.dataset.filter] = button.dataset.value;
                render();
            });
        });

        main.querySelector("[data-state]").addEventListener("change", (event) => {
            state.stateFilter = event.target.value;
            render();
        });

        const reset = main.querySelector("[data-reset]");
        if (reset) {
            reset.addEventListener("click", () => {
                state.mode = "all";
                state.cost = "all";
                state.stateFilter = "All India";
                runSearch("");
            });
        }
    }

    GG.boot(function () {
        main = document.getElementById("main");
        render();
    });
})();
