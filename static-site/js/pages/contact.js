/* Contact page script with live backend submission */
(function () {
    GG.boot(function () {
        const main = document.getElementById("main");

        main.innerHTML = `
    <div class="container page">
      <div class="reveal max-2xl">
        <h1 class="h1">Contact GovGuide India</h1>
        <p class="lead">Report an outdated step, request a new tutorial or send general feedback.</p>
      </div>

      <div class="two-col" style="margin-top:2.5rem">
        <form class="card card-xl shadow-soft" data-contact>
          <div class="field">
            <label class="label" for="c-name">Your name</label>
            <input class="input" id="c-name" required placeholder="Aarti Sharma" />
          </div>
          <div class="field">
            <label class="label" for="c-email">Email</label>
            <input class="input" id="c-email" type="email" required placeholder="you@example.com" />
          </div>
          <div class="field">
            <label class="label" for="c-subject">Subject</label>
            <input class="input" id="c-subject" required placeholder="Aadhaar tutorial — step 4 changed" />
          </div>
          <div class="field">
            <label class="label" for="c-message">Message</label>
            <textarea class="textarea" id="c-message" required rows="5" placeholder="Tell us what you noticed…"></textarea>
          </div>
          <button class="btn btn-round btn-block" type="submit">Send message ${GG.icon("send")}</button>
          <p class="xs muted" style="margin-top:.75rem">Never share Aadhaar numbers, OTPs or document scans with us.</p>
        </form>

        <aside class="stack">
          <div class="card card-xl shadow-soft">
            <h2 class="font-display" style="font-size:1.125rem;font-weight:600">Reach us</h2>
            <p class="row small muted" style="margin-top:1rem;gap:.5rem">${GG.icon("mail")} hello@govguideindia.in</p>
            <p class="row small muted" style="margin-top:.5rem;gap:.5rem">${GG.icon("clock")} Replies within 2 working days</p>
            <p class="row small muted" style="margin-top:.5rem;gap:.5rem">${GG.icon("map-pin")} New Delhi, India</p>
          </div>
          <div class="panel-soft">
            <h2 class="font-display" style="font-size:1rem;font-weight:600;color:var(--primary)">Looking for an answer now?</h2>
            <p class="small" style="margin-top:.5rem">The FAQ covers fees, timelines and document rules for every service.</p>
            <a class="btn btn-outline btn-round btn-block" style="margin-top:1rem;background:var(--card)" href="faq.html">Read the FAQ</a>
          </div>
        </aside>
      </div>
    </div>`;

        const form = main.querySelector("[data-contact]");
        if (!form) return;

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const nameInput = document.getElementById("c-name");
            const emailInput = document.getElementById("c-email");
            const subjectInput = document.getElementById("c-subject");
            const messageInput = document.getElementById("c-message");
            const submitBtn = form.querySelector('button[type="submit"]');

            const payload = {
                name: nameInput ? nameInput.value.trim() : "",
                email: emailInput ? emailInput.value.trim() : "",
                subject: subjectInput ? subjectInput.value.trim() : "",
                message: messageInput ? messageInput.value.trim() : ""
            };

            if (!payload.name || !payload.email || !payload.subject || !payload.message) {
                GG.toast("Missing Details", "Please fill in all required fields.", "error");
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `Sending... ${GG.icon("send")}`;
                GG.refreshIcons();
            }

            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.ok) {
                    GG.toast("Message Sent", data.message || "Thanks — our team will get back to you shortly.");
                    form.reset();
                } else {
                    GG.toast("Submission Error", data.message || "Failed to send message.", "error");
                }
            } catch (error) {
                console.error("Contact submission error:", error);
                GG.toast("Network Error", "Unable to connect to the server. Please try again.", "error");
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `Send message ${GG.icon("send")}`;
                    GG.refreshIcons();
                }
            }
        });
    });
})();