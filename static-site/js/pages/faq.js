/* FAQ page: general FAQs + per-service FAQ groups */
(function () {
    GG.boot(function () {
        const main = document.getElementById("main");

        main.innerHTML = `
    <div class="container page">
      <div class="reveal">
        <h1 class="h1">Frequently Asked Questions</h1>
        <p class="lead">How GovGuide India works, plus the questions people ask most about each service.</p>
      </div>

      <section class="reveal" style="margin-top:2.5rem" aria-labelledby="general">
        <h2 class="section-title" id="general">About GovGuide India</h2>
        ${GG.accordionMarkup(generalFaqs)}
      </section>

      ${services
                .map(
                    (service) => `
        <section class="reveal faq-group" aria-labelledby="faq-${service.slug}">
          <div class="row" style="gap:.75rem">
            <span class="icon-tile sm">${GG.icon(service.icon)}</span>
            <h2 id="faq-${service.slug}" style="font-size:1.125rem;font-weight:600">${GG.esc(service.name)}</h2>
          </div>
          ${GG.accordionMarkup(service.faqs)}
          <a class="btn btn-ghost btn-round btn-sm" style="margin-top:.75rem" href="service.html?slug=${service.slug}">
            Open ${GG.esc(service.name)} tutorial ${GG.icon("arrow-right")}
          </a>
        </section>`,
                )
                .join("")}

      <div class="panel-soft" style="margin-top:2.5rem">
        <h2 class="font-display" style="font-size:1.125rem;font-weight:600;color:var(--primary)">Still stuck?</h2>
        <p class="small" style="margin-top:.5rem">Send us your question and we will add it to the right tutorial.</p>
        <a class="btn btn-round" style="margin-top:1rem" href="contact.html">Contact us</a>
      </div>
    </div>`;

        main.querySelectorAll(".accordion").forEach((node) => GG.accordion(node));
    });
})();
