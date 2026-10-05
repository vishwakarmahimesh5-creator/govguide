/* About page */
(function () {
    const values = [
        { icon: "shield-check", title: "Never ask for private data", body: "No Aadhaar numbers, no OTPs, no document uploads. Ever." },
        { icon: "book-open", title: "Plain language first", body: "Government wording translated into steps anyone can follow." },
        { icon: "badge-check", title: "Verified monthly", body: "Every fee, timeline and step is checked against official portals." },
        { icon: "users", title: "Free for everyone", body: "No paywalls, no agents, no commission — just guidance." },
    ];

    GG.boot(function () {
        document.getElementById("main").innerHTML = `
    <div class="container page">
      <div class="reveal">
        <p class="eyebrow">About us</p>
        <h1 class="h1">Making government services understandable</h1>
        <p class="lead">
          GovGuide India is an independent learning platform. We explain how official services work,
          then send you to the genuine government portal to finish the job.
        </p>
      </div>

      <div class="grid cols-2" style="margin-top:2.5rem">
        ${values.map((value, index) => `
          <div class="reveal" data-delay="${index * 0.06}" style="height:100%">
            <div class="card card-xl shadow-soft" style="height:100%">
              <span class="icon-tile">${GG.icon(value.icon)}</span>
              <h2 style="margin-top:1.25rem;font-size:1.125rem;font-weight:600">${value.title}</h2>
              <p class="small muted" style="margin-top:.5rem;line-height:1.8">${value.body}</p>
            </div>
          </div>`).join("")}
      </div>

      <section class="reveal" style="margin-top:3rem" aria-labelledby="mission">
        <h2 class="section-title" id="mission">Our mission</h2>
        <p class="muted" style="margin-top:1rem;line-height:1.8">
          Millions of applications are rejected every year over avoidable mistakes — a wrong document
          format, a missed deadline, a field filled the wrong way. We document each service end to end
          so first-time applicants can get it right without paying an agent.
        </p>
      </section>

      <section class="reveal" style="margin-top:2.5rem" aria-labelledby="privacy">
        <h2 class="section-title" id="privacy">Privacy in one line</h2>
        <p class="notice" style="margin-top:1rem">
          We do not collect Aadhaar numbers, OTPs or documents. Progress and bookmarks stay in your
          browser's local storage on this device.
        </p>
      </section>

      <div class="panel-primary" style="margin-top:2.5rem">
        <h2 style="font-size:1.5rem">Spotted something outdated?</h2>
        <p class="small" style="margin-top:.75rem;opacity:.9">Tell us and we usually correct the tutorial within a week.</p>
        <a class="btn btn-secondary btn-round" style="margin-top:1.5rem" href="contact.html">Contact the team</a>
      </div>
    </div>`;
    });
})();
