/* Nearby centres: search + type filter */
(function () {
    const state = { query: "", type: "All" };
    let main;

    function results() {
        const lower = state.query.trim().toLowerCase();
        return centres
            .filter((centre) => {
                const matchesQuery =
                    !lower ||
                    [centre.name, centre.city, centre.state, centre.pincode, centre.address]
                        .join(" ")
                        .toLowerCase()
                        .includes(lower);
                return matchesQuery && (state.type === "All" || centre.type === state.type);
            })
            .sort((a, b) => a.distanceKm - b.distanceKm);
    }

    function renderList() {
        const list = results();
        main.querySelector("[data-count]").textContent =
            `${list.length} centre${list.length === 1 ? "" : "s"} found`;
        main.querySelector("[data-list]").innerHTML = list
            .map(
                (centre, index) => `
      <div class="reveal" data-delay="${Math.min(index * 0.04, 0.3)}" style="height:100%">
        <div class="card card-xl shadow-soft hover-lift-sm" style="display:flex;height:100%;flex-direction:column">
          <div class="row-between" style="align-items:flex-start">
            <span class="badge">${GG.esc(centre.type)}</span>
            <span class="badge ${centre.open ? "badge-success" : "badge-muted"}">${centre.open ? "Open now" : "Closed"}</span>
          </div>

          <h2 style="margin-top:.75rem;font-weight:600">${GG.esc(centre.name)}</h2>
          <p class="row small muted" style="margin-top:.5rem;gap:.5rem;align-items:flex-start">
            ${GG.icon("map-pin")}<span>${GG.esc(centre.address)}, ${GG.esc(centre.city)}, ${GG.esc(centre.state)} — ${GG.esc(centre.pincode)}</span>
          </p>
          <p class="row small muted" style="margin-top:.5rem;gap:.5rem">${GG.icon("clock")} ${GG.esc(centre.hours)}</p>
          <p class="row small muted" style="margin-top:.5rem;gap:.5rem">${GG.icon("phone")} ${GG.esc(centre.phone)}</p>

          <div class="row-between" style="margin-top:1.25rem;border-top:1px solid var(--border);padding-top:1rem">
            <span class="small" style="font-weight:600;color:var(--primary)">${centre.distanceKm} km away</span>
            <a class="btn btn-outline btn-round btn-sm" target="_blank" rel="noreferrer noopener"
              href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centre.name + " " + centre.city)}">
              ${GG.icon("navigation")} Directions
            </a>
          </div>
        </div>
      </div>`,
            )
            .join("");

        GG.refreshIcons();
        GG.reveal(main);
    }

    GG.boot(function () {
        main = document.getElementById("main");

        main.innerHTML = `
    <div class="container page">
      <div class="reveal max-2xl">
        <h1 class="h1">Nearby Government Centres</h1>
        <p class="lead">
          Search by PIN code, city or state to find the right counter — with opening hours and phone
          numbers before you travel.
        </p>
      </div>

      <div class="centres-grid">
        <div>
          <div class="card card-xl shadow-soft">
            <div style="position:relative">
              <label class="sr-only" for="centre-search">Search by PIN code, city or state</label>
              <span style="position:absolute;left:1rem;top:50%;transform:translateY(-50%);color:var(--muted-foreground);pointer-events:none">${GG.icon("search")}</span>
              <input class="input input-lg" id="centre-search" data-search
                placeholder="PIN code, city or state — e.g. 110001 or Mumbai" />
            </div>

            <div class="row" style="margin-top:1rem;gap:.5rem" role="group" aria-label="Centre type" data-types>
              ${["All", ...centreTypes]
                .map(
                    (option) =>
                        `<button type="button" class="chip${option === state.type ? " active" : ""}" data-type="${GG.esc(option)}" aria-pressed="${option === state.type}">${GG.esc(option)}</button>`,
                )
                .join("")}
            </div>
          </div>

          <p class="small muted" style="margin-top:1.5rem" data-count></p>
          <div class="grid cols-2" style="margin-top:1rem" data-list></div>
        </div>

        <aside class="sidebar">
          <div class="card" style="overflow:hidden;padding:0">
            <div class="map-panel surface-gradient">
              <div class="map-grid-lines" aria-hidden="true"></div>
              <div style="position:relative;text-align:center">
                <span class="icon-tile" style="margin-inline:auto;border-radius:9999px">${GG.icon("map-pin")}</span>
                <p class="font-display small" style="margin-top:.75rem;font-weight:600">Interactive map</p>
                <p class="xs muted" style="margin-top:.25rem">Map view coming soon — results are listed alongside</p>
              </div>
            </div>
            <div style="padding:1.25rem">
              <h2 class="font-display small" style="font-weight:600">Before you visit</h2>
              <ul class="stack small muted" style="margin-top:.75rem;gap:.5rem;list-style:none;padding:0">
                <li>Carry original documents, not just photocopies.</li>
                <li>Call ahead — timings change on government holidays.</li>
                <li>Government fees are fixed; ask for a receipt.</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>`;

        main.querySelector("[data-search]").addEventListener("input", (event) => {
            state.query = event.target.value;
            renderList();
        });

        main.querySelector("[data-types]").addEventListener("click", (event) => {
            const button = event.target.closest("[data-type]");
            if (!button) return;
            state.type = button.dataset.type;
            main.querySelectorAll("[data-type]").forEach((chip) => {
                const active = chip.dataset.type === state.type;
                chip.classList.toggle("active", active);
                chip.setAttribute("aria-pressed", String(active));
            });
            renderList();
        });

        renderList();
    });
})();
