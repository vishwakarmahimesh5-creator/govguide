/* Tutorial library grouped by category */
(function () {
    GG.boot(function () {
        const categories = [...new Set(services.map((service) => service.category))];

        document.getElementById("main").innerHTML = `
    <div class="container page">
      <div class="reveal max-2xl">
        <h1 class="h1">Tutorial Library</h1>
        <p class="lead">
          ${services.length} tutorials across ${categories.length} categories, each with documents,
          fees, screenshots and warnings.
        </p>
      </div>

      <div class="stack" style="margin-top:3rem;gap:3.5rem">
        ${categories
                .map((category) => {
                    const list = services.filter((service) => service.category === category);
                    return `
          <section aria-labelledby="cat-${GG.esc(category)}">
            <div class="row" style="gap:.75rem">
              <h2 id="cat-${GG.esc(category)}" style="font-size:1.25rem;font-weight:600">${GG.esc(category)}</h2>
              <span class="badge">${list.length}</span>
            </div>

            <div class="grid cols-2" style="margin-top:1.25rem">
              ${list
                            .map(
                                (service, index) => `
                <div class="reveal" data-delay="${index * 0.05}" style="height:100%">
                  <div class="card card-xl shadow-soft hover-lift-sm" style="display:flex;height:100%;flex-direction:column">
                    <div class="row" style="gap:.75rem">
                      <span class="icon-tile">${GG.icon(service.icon)}</span>
                      <div>
                        <h3 style="font-weight:600">${GG.esc(service.name)}</h3>
                        <p class="small muted">${GG.esc(service.tagline)}</p>
                      </div>
                    </div>

                    <div class="row xs muted" style="margin-top:1.25rem;gap:1rem">
                      <span class="row" style="gap:.4rem">${GG.icon("list-checks")} ${service.steps.length} steps</span>
                      <span class="row" style="gap:.4rem">${GG.icon("clock")} ${GG.esc(service.estimatedTime)}</span>
                      <span class="row" style="gap:.4rem">${GG.icon("book-open")} ${service.documents.length} documents</span>
                    </div>

                    <a class="btn btn-round" style="margin-top:1.5rem;align-self:flex-start" href="service.html?slug=${service.slug}">
                      Start tutorial
                    </a>
                  </div>
                </div>`,
                            )
                            .join("")}
            </div>
          </section>`;
                })
                .join("")}
      </div>
    </div>`;
    });
})();
