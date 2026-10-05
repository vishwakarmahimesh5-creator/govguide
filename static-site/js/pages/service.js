/* Service detail / tutorial page (slug from ?slug=) */
(function () {
    const slug = new URLSearchParams(window.location.search).get("slug") || "aadhaar";
    const service = services.find((item) => item.slug === slug);

    let main;

    function callout(tone, label, text) {
        const icons = { info: "info", tip: "lightbulb", warn: "alert-triangle" };
        return `<div class="callout callout-${tone}">
      ${GG.icon(icons[tone])}
      <p class="small"><span style="font-weight:600">${label}: </span><span style="color:color-mix(in oklab, var(--foreground) 80%, transparent)">${GG.esc(text)}</span></p>
    </div>`;
    }

    function sidebarRow(icon, label, value) {
        return `<div class="sidebar-row">
      <span class="icon-tile sm">${GG.icon(icon)}</span>
      <div>
        <dt class="xs muted">${label}</dt>
        <dd style="font-weight:500">${GG.esc(value)}</dd>
      </div>
    </div>`;
    }

    function render() {
        const completed = GG.store.read(`govguide-progress-${slug}`);
        const bookmarked = GG.store.read("govguide-bookmarks").includes(slug);
        const progress = Math.round((completed.length / service.steps.length) * 100);
        const related = service.related
            .map((item) => services.find((s) => s.slug === item))
            .filter(Boolean);

        main.innerHTML = `
    <article>
      <header class="surface-gradient" style="border-bottom:1px solid var(--border)">
        <div class="container" style="padding-block:3rem">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="index.html">Home</a><span>/</span><a href="services.html">Services</a><span>/</span>
            <span style="color:var(--foreground)">${GG.esc(service.name)}</span>
          </nav>

          <div class="row" style="margin-top:1.5rem;gap:1.5rem;align-items:flex-start">
            <span class="icon-tile xl shadow-lift">${GG.icon(service.icon)}</span>
            <div style="min-width:0;flex:1">
              <div class="row" style="gap:.5rem">
                <span class="badge badge-primary">${GG.esc(service.category)}</span>
                <span class="badge badge-success">${GG.esc(service.mode)}</span>
                <span class="badge">${GG.esc(service.learners)} learners</span>
              </div>
              <h1 class="h1" style="margin-top:1rem">${GG.esc(service.name)}</h1>
              <p class="muted max-2xl" style="margin-top:.5rem">${GG.esc(service.tagline)}</p>
              <p class="row small muted" style="margin-top:.75rem;gap:.4rem">${GG.icon("building-2")} ${GG.esc(service.ministry)}</p>
            </div>
          </div>

          <div class="row" style="margin-top:2rem;gap:.75rem">
            <a class="btn btn-lg btn-round" href="${GG.esc(service.portal)}" target="_blank" rel="noreferrer noopener">
              Official ${GG.esc(service.portalName)} Portal ${GG.icon("external-link")}
            </a>
            <button class="btn btn-lg btn-outline btn-round" data-pdf>${GG.icon("download")} Download PDF Guide</button>
            <button class="btn btn-lg btn-outline btn-round" data-share>${GG.icon("share-2")} Share</button>
            <button class="btn btn-lg btn-round ${bookmarked ? "btn-secondary" : "btn-outline"}" data-bookmark aria-pressed="${bookmarked}">
              ${GG.icon(bookmarked ? "bookmark-check" : "bookmark")} ${bookmarked ? "Bookmarked" : "Bookmark"}
            </button>
          </div>
        </div>
      </header>

      <div class="container detail-grid">
        <div class="detail-main">
          <section class="reveal" aria-labelledby="overview">
            <h2 class="section-title" id="overview">Overview</h2>
            <p class="muted" style="margin-top:1rem;line-height:1.8">${GG.esc(service.overview)}</p>
          </section>

          <section class="reveal" aria-labelledby="eligibility">
            <h2 class="section-title" id="eligibility">Eligibility</h2>
            <ul class="list-plain" style="margin-top:1rem">
              ${service.eligibility
                .map(
                    (item) =>
                        `<li>${GG.icon("check-circle-2", "ok")}<span class="small">${GG.esc(item)}</span></li>`,
                )
                .join("")}
            </ul>
          </section>

          <section class="reveal" aria-labelledby="documents">
            <h2 class="section-title" id="documents">Required Documents</h2>
            <p class="small muted" style="margin-top:.5rem">
              Keep these ready before you start — most rejections are caused by document issues.
            </p>
            <div class="grid cols-2" style="margin-top:1.25rem">
              ${service.documents
                .map(
                    (doc) => `
                <div class="card hover-lift-sm">
                  <div class="row" style="gap:.75rem;align-items:flex-start">
                    <span class="icon-tile accent">${GG.icon("file-text")}</span>
                    <div>
                      <h3 style="font-weight:600">${GG.esc(doc.name)}</h3>
                      <p class="xs" style="margin-top:.25rem;font-weight:500;color:var(--primary)">${GG.esc(doc.formats)}</p>
                      <p class="small muted" style="margin-top:.5rem">${GG.esc(doc.note)}</p>
                    </div>
                  </div>
                </div>`,
                )
                .join("")}
            </div>
          </section>

          <section class="reveal" aria-labelledby="steps">
            <div class="row-between" style="align-items:flex-end">
              <div>
                <h2 class="section-title" id="steps">Step-by-Step Guide</h2>
                <p class="small muted" style="margin-top:.5rem">
                  Tick each step as you go — your progress is saved on this device.
                </p>
              </div>
              <div style="width:12rem">
                <div class="row-between xs muted">
                  <span>Progress</span>
                  <span style="font-weight:600;color:var(--foreground)">${progress}%</span>
                </div>
                <div class="progress thin" style="margin-top:.5rem"><span style="width:${progress}%"></span></div>
              </div>
            </div>

            <ol class="steps-list">
              ${service.steps
                .map((step, index) => {
                    const done = completed.includes(String(index));
                    return `
                <li>
                  ${index < service.steps.length - 1 ? '<span class="step-line" aria-hidden="true"></span>' : ""}
                  <button class="step-toggle ${done ? "done" : ""}" data-step="${index}" aria-pressed="${done}"
                    aria-label="Mark step ${index + 1} as ${done ? "not done" : "done"}">
                    ${done ? GG.icon("check-circle-2") : index + 1}
                  </button>
                  <div class="card shadow-soft">
                    <h3 style="font-size:1.125rem;font-weight:600">${GG.esc(step.title)}</h3>
                    ${step.image
                            ? `<img class="step-shot" src="${GG.esc(step.image)}" alt="Screenshot of step ${index + 1} — ${GG.esc(step.title)}" loading="lazy">`
                            : `<div class="step-shot">Screenshot coming soon</div>`
                    }
                    <p class="small muted" style="margin-top:1rem;line-height:1.8">${GG.esc(step.description)}</p>
                    ${step.note ? callout("info", "Note", step.note) : ""}
                    ${step.tip ? callout("tip", "Tip", step.tip) : ""}
                    ${step.warning ? callout("warn", "Warning", step.warning) : ""}
                    ${index < service.steps.length - 1
                            ? `<button class="btn btn-ghost btn-round" style="margin-top:1.25rem" data-step="${index}">
                            ${done ? "Mark as not done" : "Done — next step"} ${GG.icon("arrow-right")}
                          </button>`
                            : ""
                        }
                  </div>
                </li>`;
                })
                .join("")}
            </ol>
          </section>

          <section class="reveal" aria-labelledby="video">
              <h2 class="section-title" id="video">Video Tutorial</h2>

              <div class="video-panel" style="margin-top:1rem;overflow:hidden;padding:0;">
                <div style="position:relative;width:100%;aspect-ratio:16/9;">
                  <iframe
                    src="${GG.esc(service.videoUrl)}"
                    title="${GG.esc(service.name)} Video Tutorial"
                    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                  </iframe>
                </div>
              </div>

              <p class="small muted" style="margin-top:.75rem;text-align:center;">
                Watch the complete ${GG.esc(service.name)} walkthrough before starting your application.
              </p>
          </section>

          <section class="reveal" aria-labelledby="mistakes">
            <h2 class="section-title" id="mistakes">Common Mistakes</h2>
            <ul class="list-danger" style="margin-top:1rem">
              ${service.mistakes
                .map(
                    (mistake) =>
                        `<li>${GG.icon("alert-triangle")}<span class="small">${GG.esc(mistake)}</span></li>`,
                )
                .join("")}
            </ul>
          </section>

          <section class="reveal" aria-labelledby="faqs">
            <h2 class="section-title" id="faqs">Frequently Asked Questions</h2>
            ${GG.accordionMarkup(service.faqs)}
          </section>

          <section class="reveal" aria-labelledby="related">
            <h2 class="section-title" id="related">Related Services</h2>
            <div class="grid cols-3" style="margin-top:1rem">
              ${related
                .map(
                    (item) => `
                <a class="card hoverable" href="service.html?slug=${item.slug}">
                  ${GG.icon(item.icon, "primary")}
                  <h3 style="margin-top:.75rem;font-weight:600">${GG.esc(item.name)}</h3>
                  <p class="small muted" style="margin-top:.25rem">${GG.esc(item.tagline)}</p>
                </a>`,
                )
                .join("")}
            </div>
          </section>
        </div>

        <aside class="sidebar">
          <div class="card card-xl shadow-soft">
            <h2 class="font-display" style="font-size:1.125rem;font-weight:600">Charges &amp; Timeline</h2>
            <dl class="stack small" style="margin-top:1.25rem">
              ${sidebarRow("indian-rupee", "Government fee", service.fee)}
              ${sidebarRow("wallet", "Service charge", service.serviceCharge)}
              ${sidebarRow("clock", "Processing time", service.processingTime)}
              ${sidebarRow("info", "Mode", service.mode)}
            </dl>
            <div style="margin-top:1.25rem;border-top:1px solid var(--border);padding-top:1rem">
              <p class="xs muted" style="font-weight:600">Payment methods</p>
              <div class="row" style="margin-top:.5rem;gap:.4rem">
                ${service.paymentMethods.map((method) => `<span class="badge">${GG.esc(method)}</span>`).join("")}
              </div>
            </div>
            <a class="btn btn-round btn-block" style="margin-top:1.5rem" href="${GG.esc(service.portal)}" target="_blank" rel="noreferrer noopener">
              Start on official portal
            </a>
          </div>

          <div class="panel-soft">
            <h2 class="font-display" style="font-size:1rem;font-weight:600;color:var(--primary)">Prefer in person?</h2>
            <p class="small" style="margin-top:.5rem;color:color-mix(in oklab, var(--primary) 80%, transparent)">
              Find a nearby centre with opening hours and directions.
            </p>
            <a class="btn btn-outline btn-round btn-block" style="margin-top:1rem;background:var(--card)" href="centres.html">Find centres</a>
          </div>
        </aside>
      </div>

      <div class="container" style="padding-bottom:1.5rem">
        <p class="notice">
          GovGuide India is an independent learning platform. Always complete your application on the
          official ${GG.esc(service.portalName)} portal. We never ask for Aadhaar numbers, OTPs or documents.
        </p>
      </div>
    </article>`;

        bind();
        GG.refreshIcons();
        GG.reveal(main);
        GG.accordion(main.querySelector(".accordion"));
    }

    function downloadPDF() {
        const { jsPDF } = window.jspdf;

        const doc = new jsPDF({
            unit: "mm",
            format: "a4",
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const margin = 18;
        const contentWidth = pageWidth - margin * 2;

        let y = 20;

        function checkPageSpace(height = 10) {
            if (y + height > pageHeight - 18) {
                doc.addPage();
                y = 20;
            }
        }

        function addTitle(text) {
            checkPageSpace(12);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            doc.text(text, margin, y);

            y += 11;
        }

        function addHeading(text) {
            checkPageSpace(12);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(13);
            doc.text(text, margin, y);

            y += 8;
        }

        function addText(text, size = 10) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(size);

            const lines = doc.splitTextToSize(
                String(text || ""),
                contentWidth
            );

            const lineHeight = size * 0.45;

            checkPageSpace(lines.length * lineHeight + 4);

            doc.text(lines, margin, y);

            y += lines.length * lineHeight + 5;
        }

        function addBullet(text) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);

            const lines = doc.splitTextToSize(
                String(text || ""),
                contentWidth - 7
            );

            const lineHeight = 4.5;

            checkPageSpace(lines.length * lineHeight + 5);

            doc.text("•", margin, y);
            doc.text(lines, margin + 5, y);

            y += lines.length * lineHeight + 3;
        }

        // Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("GovGuide India", margin, y);

        y += 10;

        addTitle(service.name + " Tutorial");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(
            `${service.category} • ${service.mode} • Estimated time: ${service.estimatedTime}`,
            margin,
            y
        );

        y += 10;

        // Overview
        addHeading("Overview");
        addText(service.overview);

        // Eligibility
        addHeading("Eligibility");

        service.eligibility.forEach((item) => {
            addBullet(item);
        });

        y += 3;

        // Documents
        addHeading("Required Documents");

        service.documents.forEach((docItem) => {
            addBullet(
                `${docItem.name} — ${docItem.formats}. ${docItem.note}`
            );
        });

        y += 3;

        // Charges
        addHeading("Charges & Timeline");

        addText(`Government fee: ${service.fee}`);
        addText(`Service charge: ${service.serviceCharge}`);
        addText(`Processing time: ${service.processingTime}`);
        addText(`Payment methods: ${service.paymentMethods.join(", ")}`);

        // Steps
        addHeading("Step-by-Step Guide");

        service.steps.forEach((step, index) => {
            checkPageSpace(20);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text(
                `Step ${index + 1}: ${step.title}`,
                margin,
                y
            );

            y += 6;

            addText(step.description);

            if (step.note) {
                addText(`Note: ${step.note}`);
            }

            if (step.tip) {
                addText(`Tip: ${step.tip}`);
            }

            if (step.warning) {
                addText(`Warning: ${step.warning}`);
            }

            y += 2;
        });

        // Common mistakes
        addHeading("Common Mistakes");

        service.mistakes.forEach((mistake) => {
            addBullet(mistake);
        });

        y += 3;

        // FAQs
        addHeading("Frequently Asked Questions");

        service.faqs.forEach((faq) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);

            const questionLines = doc.splitTextToSize(
                faq.question,
                contentWidth
            );

            checkPageSpace(questionLines.length * 4.5 + 8);

            doc.text(questionLines, margin, y);

            y += questionLines.length * 4.5 + 2;

            addText(faq.answer);

            y += 2;
        });

        // Official portal
        addHeading("Official Portal");

        addText(service.portal);

        // Disclaimer
        checkPageSpace(25);

        y += 5;

        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);

        const disclaimer =
            "GovGuide India is an independent learning platform. " +
            "Always complete your application on the official government portal. " +
            "We never ask for Aadhaar numbers, OTPs or documents.";

        const disclaimerLines = doc.splitTextToSize(
            disclaimer,
            contentWidth
        );

        doc.text(disclaimerLines, margin, y);

        // Footer on every page
        const totalPages = doc.getNumberOfPages();

        for (let page = 1; page <= totalPages; page++) {
            doc.setPage(page);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);

            doc.text(
                `GovGuide India • ${service.name}`,
                margin,
                pageHeight - 10
            );

            doc.text(
                `Page ${page} of ${totalPages}`,
                pageWidth - margin,
                pageHeight - 10,
                { align: "right" }
            );
        }

        const fileName =
            service.slug.replace(/[^a-z0-9-]/gi, "-") +
            "-govguide-tutorial.pdf";

        doc.save(fileName);

        GG.toast(
            "PDF downloaded",
            `${service.name} guide has been downloaded.`
        );
    }
    function bind() {
        main.querySelectorAll("[data-step]").forEach((button) =>
            button.addEventListener("click", () => {
                GG.store.toggle(`govguide-progress-${slug}`, button.dataset.step);
                render();
            }),
        );

        main.querySelector("[data-bookmark]").addEventListener("click", () => {
            const was = GG.store.read("govguide-bookmarks").includes(slug);
            GG.store.toggle("govguide-bookmarks", slug);
            GG.toast(was ? "Bookmark removed" : "Saved to your bookmarks");
            render();
        });

        main.querySelector("[data-pdf]").addEventListener("click", () => {
            if (!service.pdf) {
                GG.toast("PDF guide not available", "This guide is not available yet.", "error");
                return;
            }

            const link = document.createElement("a");
            link.href = service.pdf;
            link.download = "";
            document.body.appendChild(link);
            link.click();
            link.remove();

            GG.toast("PDF download started", `${service.name} guide is downloading.`);
        });

        main.querySelector("[data-share]").addEventListener("click", async () => {
            const url = window.location.href;
            try {
                if (navigator.share) {
                    await navigator.share({ title: `${service.name} tutorial`, url });
                    return;
                }
                await navigator.clipboard.writeText(url);
                GG.toast("Link copied to clipboard");
            } catch {
                GG.toast("Could not share this tutorial", "", "error");
            }
        });
    }

    GG.boot(function () {
        main = document.getElementById("main");

        if (!service) {
            main.innerHTML = `<div class="container page">
        <div class="dashed">
          <p class="font-display" style="font-size:1.125rem">Tutorial not found</p>
          <p class="small muted" style="margin-top:.5rem">That service does not exist yet.</p>
          <a class="btn btn-round" style="margin-top:1.25rem" href="services.html">Browse all services</a>
        </div>
      </div>`;
            GG.refreshIcons();
            return;
        }

        document.title = `${service.name} Tutorial — GovGuide India`;
        const description = document.querySelector('meta[name="description"]');
        if (description) description.setAttribute("content", service.description);

        render();
    });
})();
