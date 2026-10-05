/* Login / Register Screen */

(function () {
    const mode = document.body.dataset.authMode === "register"
        ? "register"
        : "login";

    const isRegister = mode === "register";

    GG.boot(function () {

        const main = document.getElementById("main");

        main.innerHTML = `
        <div class="auth-wrap">
          <div class="card card-xl shadow-lift">

            <span class="icon-tile">
              ${GG.icon("shield-check")}
            </span>

            <h1 style="margin-top:1.25rem;font-size:1.5rem;font-weight:600">
              ${isRegister ? "Create your free account" : "Welcome back"}
            </h1>

            <p class="small muted" style="margin-top:.5rem">
              ${isRegister
                ? "Save tutorials, track progress and sync bookmarks across devices."
                : "Sign in to pick up your tutorials where you left off."
            }
            </p>

            <form id="authForm" style="margin-top:1.5rem">

              ${isRegister
                ? `
                <div class="field">
                  <label class="label" for="a-name">Full Name</label>
                  <input
                    class="input"
                    id="a-name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                `
                : ""
            }

              <div class="field">
                <label class="label" for="a-email">Email</label>
                <input
                  class="input"
                  id="a-email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div class="field">
                <label class="label" for="a-password">Password</label>
                <input
                  class="input"
                  id="a-password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button class="btn btn-round btn-block" type="submit">
                ${isRegister ? "Create Account" : "Login"}
                ${GG.icon("arrow-right")}
              </button>

            </form>

            <p class="small muted" style="margin-top:1.25rem;text-align:center">
              ${isRegister
                ? `Already have an account?
                       <a href="login.html"
                          style="color:var(--primary);font-weight:600">
                          Login
                       </a>`
                : `Don't have an account?
                       <a href="register.html"
                          style="color:var(--primary);font-weight:600">
                          Register
                       </a>`
            }
            </p>

          </div>
        </div>
        `;

        // ==========================================
        // FORM SUBMIT
        // ==========================================

        document
            .getElementById("authForm")
            .addEventListener("submit", async function (e) {

                e.preventDefault();

                const email =
                    document.getElementById("a-email").value.trim();

                const password =
                    document.getElementById("a-password").value;

                // ==========================================
                // REGISTER
                // ==========================================

                if (isRegister) {

                    const name =
                        document.getElementById("a-name").value.trim();

                    try {

                        const response = await fetch(
                            "http://localhost:3000/api/register",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type": "application/json"
                                },

                                body: JSON.stringify({
                                    name,
                                    email,
                                    password
                                })
                            }
                        );

                        const result = await response.json();

                        console.log("Register response:", result);

                        if (!response.ok) {

                            GG.toast(
                                "Registration Failed",
                                result.message || "Something went wrong.",
                                "error"
                            );

                            return;
                        }

                        // Save user information
                        const user = result.user || {
                            name: name,
                            email: email
                        };

                        localStorage.setItem(
                            "govguide-user",
                            JSON.stringify(user)
                        );

                        localStorage.setItem(
                            "isLoggedIn",
                            "true"
                        );

                        GG.toast(
                            "Account Created",
                            "Welcome to GovGuide India!"
                        );

                        setTimeout(() => {
                            window.location.href = "dashboard.html";
                        }, 1000);

                    } catch (error) {

                        console.error("Register error:", error);

                        GG.toast(
                            "Error",
                            "Unable to connect to server.",
                            "error"
                        );
                    }

                    return;
                }

                // ==========================================
                // LOGIN
                // ==========================================

                try {

                    const response = await fetch(
                        "http://localhost:3000/api/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({
                                email,
                                password
                            })
                        }
                    );

                    const result = await response.json();

                    console.log("Login response:", result);

                    if (!response.ok) {

                        GG.toast(
                            "Login Failed",
                            result.message || "Invalid email or password.",
                            "error"
                        );

                        return;
                    }

                    // ==========================================
                    // SAVE LOGIN INFORMATION
                    // ==========================================

                    localStorage.setItem(
                        "isLoggedIn",
                        "true"
                    );

                    /*
                     * Save the user returned by MongoDB.
                     *
                     * If the server sends result.user,
                     * we save it.
                     *
                     * If it doesn't, we still save the email
                     * so the login state can be recognized.
                     */

                    const user = result.user || {
                        email: email
                    };

                    localStorage.setItem(
                        "govguide-user",
                        JSON.stringify(user)
                    );

                    console.log(
                        "Saved user:",
                        localStorage.getItem("govguide-user")
                    );

                    GG.toast(
                        "Login Successful",
                        result.message || "Welcome back!"
                    );

                    setTimeout(() => {
                        window.location.href = "dashboard.html";
                    }, 1000);

                } catch (error) {

                    console.error("Login error:", error);

                    GG.toast(
                        "Error",
                        "Unable to connect to server.",
                        "error"
                    );
                }

            });
    });

})();