    /* Dashboard: progress, bookmarks, badges + user profile */
(function () {

    // =========================================================
    // Protect Dashboard
    // =========================================================

    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    let main;

    // =========================================================
    // Render Dashboard
    // =========================================================

    function render() {

        // Get logged-in user
        const user = JSON.parse(
            localStorage.getItem("govguide-user") || "null"
        );

        const userName =
            user && user.name
                ? user.name
                : "User";

        const userEmail =
            user && user.email
                ? user.email
                : "";

        // =====================================================
        // Bookmarks
        // =====================================================

        const bookmarks = GG.store.read("govguide-bookmarks");

        // =====================================================
        // Tutorial Progress
        // =====================================================

        const progressRows = services
            .map((service) => {

                const done = GG.store.read(
                    `govguide-progress-${service.slug}`
                ).length;

                return {
                    service,
                    done,
                    percent:
                        service.steps.length > 0
                            ? Math.min(
                                100,
                                Math.round(
                                    (done / service.steps.length) * 100
                                )
                            )
                            : 0,
                };

            })
            .filter((row) => row.done > 0)
            .sort((a, b) => b.percent - a.percent);

        const started = progressRows.length;

        const finished = progressRows.filter(
            (row) => row.percent === 100
        ).length;

        // =====================================================
        // Badges
        // =====================================================

        const badges = [
            {
                label: "First Step",
                earned: started > 0,
                note: "Started a tutorial"
            },
            {
                label: "Explorer",
                earned: bookmarks.length >= 3,
                note: "Bookmarked 3 services"
            },
            {
                label: "Finisher",
                earned: finished > 0,
                note: "Completed a tutorial"
            },
            {
                label: "Power Learner",
                earned: finished >= 3,
                note: "Completed 3 tutorials"
            },
        ];

        // =====================================================
        // Dashboard HTML
        // =====================================================

        main.innerHTML = `

        <div class="container page">

            <!-- ============================================= -->
            <!-- Welcome -->
            <!-- ============================================= -->

            <div class="reveal max-2xl">

                <h1 class="h1">
                    Welcome back, ${GG.esc(userName)}! 👋
                </h1>

                <p class="lead">
                    Progress, bookmarks and badges are saved on this device.
                </p>

            </div>


            <!-- ============================================= -->
            <!-- Profile Card -->
            <!-- ============================================= -->

            <div
                class="card shadow-soft"
                style="margin-top:2rem"
                data-profile-card
              >

                <div class="row-between">

                    <!-- User information -->

                    <div class="row" style="gap:1rem">

                        <span class="icon-tile lg">
                            ${GG.icon("user")}
                        </span>

                        <div>

                            <h2
                                style="
                                    font-size:1.15rem;
                                    font-weight:600
                                "
                            >
                                ${GG.esc(userName)}
                            </h2>

                            <p
                                class="small muted"
                                style="margin-top:.25rem"
                            >
                                ${GG.esc(userEmail)}
                            </p>

                        </div>

                    </div>


                    <!-- Login status + Edit -->

                    <div class="row" style="gap:.5rem">

                        <span class="badge badge-success">
                            ${GG.icon("check-circle")}
                            Logged In
                        </span>

                        <button
                            class="btn btn-outline btn-round btn-sm"
                            type="button"
                            data-edit-profile
                        >
                            ${GG.icon("pencil")}
                            Edit Profile
                        </button>

                    </div>

                </div>

            </div>


            <!-- ============================================= -->
            <!-- Statistics -->
            <!-- ============================================= -->

            <div
                class="grid cols-4"
                style="margin-top:2rem"
            >

                ${[
                {
                    label: "Tutorials started",
                    value: started,
                    icon: "book-open"
                },
                {
                    label: "Tutorials completed",
                    value: finished,
                    icon: "badge-check"
                },
                {
                    label: "Bookmarks",
                    value: bookmarks.length,
                    icon: "bookmark"
                },
                {
                    label: "Badges earned",
                    value: badges.filter(
                        (b) => b.earned
                    ).length,
                    icon: "award"
                },
            ]

                .map(
                    (stat, index) => `

                        <div
                            class="reveal"
                            data-delay="${index * 0.05}"
                        >

                            <div class="card shadow-soft">

                                <span class="icon-tile sm">
                                    ${GG.icon(stat.icon)}
                                </span>

                                <p
                                    class="stat-value"
                                    style="margin-top:1rem"
                                >
                                    ${stat.value}
                                </p>

                                <p class="small muted">
                                    ${stat.label}
                                </p>

                            </div>

                        </div>

                    `
                )
                .join("")}

            </div>


            <!-- ============================================= -->
            <!-- Continue Learning -->
            <!-- ============================================= -->

            <section
                class="reveal"
                style="margin-top:3rem"
                aria-labelledby="progress"
            >

                <h2
                    class="section-title"
                    id="progress"
                >
                    Continue learning
                </h2>

                ${progressRows.length

                ? `

                        <div
                            class="stack"
                            style="margin-top:1.25rem"
                        >

                            ${progressRows

                    .map(
                        (row) => `

                                    <div class="card shadow-soft">

                                        <div class="row-between">

                                            <div
                                                class="row"
                                                style="gap:.75rem"
                                            >

                                                <span class="icon-tile sm">
                                                    ${GG.icon(
                            row.service.icon
                        )}
                                                </span>

                                                <div>

                                                    <h3
                                                        style="
                                                            font-weight:600
                                                        "
                                                    >
                                                        ${GG.esc(
                            row.service.name
                        )}
                                                    </h3>

                                                    <p class="xs muted">
                                                        ${row.done}
                                                        of
                                                        ${row.service.steps.length}
                                                        steps done
                                                    </p>

                                                </div>

                                            </div>


                                            <a
                                                class="btn btn-outline btn-round btn-sm"
                                                href="service.html?slug=${row.service.slug}"
                                            >
                                                Resume
                                            </a>

                                        </div>


                                        <div
                                            class="progress thin"
                                            style="margin-top:1rem"
                                        >
                                            <span
                                                style="
                                                    width:${row.percent}%
                                                "
                                            ></span>
                                        </div>

                                    </div>

                                `
                    )
                    .join("")}

                        </div>

                    `

                : `

                        <div
                            class="dashed"
                            style="margin-top:1.25rem"
                        >

                            <p class="small muted">
                                You have not started a tutorial yet.
                            </p>

                            <a
                                class="btn btn-round"
                                style="margin-top:1rem"
                                href="tutorials.html"
                            >
                                Browse tutorials
                            </a>

                        </div>

                    `
            }

            </section>


            <!-- ============================================= -->
            <!-- Bookmarks -->
            <!-- ============================================= -->

            <section
                class="reveal"
                style="margin-top:3rem"
                aria-labelledby="bookmarks"
            >

                <h2
                    class="section-title"
                    id="bookmarks"
                >
                    Bookmarked services
                </h2>

                ${bookmarks.length

                ? `

                        <div
                            class="grid cols-4"
                            style="margin-top:1.25rem"
                        >

                            ${bookmarks

                    .map((slug) =>
                        services.find(
                            (service) =>
                                service.slug === slug
                        )
                    )

                    .filter(Boolean)

                    .map((service, index) =>
                        GG.serviceCard(
                            service,
                            index
                        )
                    )

                    .join("")}

                        </div>

                    `

                : `

                        <div
                            class="dashed"
                            style="margin-top:1.25rem"
                        >

                            <p class="small muted">
                                No bookmarks yet — tap Bookmark on
                                any tutorial to save it here.
                            </p>

                            <a
                                class="btn btn-round"
                                style="margin-top:1rem"
                                href="services.html"
                            >
                                Explore services
                            </a>

                        </div>

                    `
            }

            </section>


            <!-- ============================================= -->
            <!-- Badges -->
            <!-- ============================================= -->

            <section
                class="reveal"
                style="margin-top:3rem"
                aria-labelledby="badges"
            >

                <h2
                    class="section-title"
                    id="badges"
                >
                    Badges
                </h2>


                <div
                    class="grid cols-4"
                    style="margin-top:1.25rem"
                >

                    ${badges

                .map(
                    (badge) => `

                            <div
                                class="card"
                                style="
                                    ${badge.earned
                            ? ""
                            : "opacity:.6"}
                                "
                            >

                                <span
                                    class="
                                        icon-tile
                                        sm
                                        ${badge.earned
                            ? "success"
                            : ""}
                                    "
                                >
                                    ${GG.icon(
                                badge.earned
                                    ? "award"
                                    : "lock"
                            )}
                                </span>


                                <h3
                                    style="
                                        margin-top:1rem;
                                        font-weight:600
                                    "
                                >
                                    ${badge.label}
                                </h3>


                                <p
                                    class="small muted"
                                    style="margin-top:.25rem"
                                >
                                    ${badge.note}
                                </p>

                            </div>

                        `
                )

                .join("")}

                </div>

            </section>


            <!-- ============================================= -->
            <!-- Reset Progress -->
            <!-- ============================================= -->

            <button
                class="btn btn-outline btn-round"
                style="margin-top:2.5rem"
                type="button"
                data-reset
             >
                ${GG.icon("rotate-ccw")}
                Reset my progress
            </button>

        </div>

        `;
        
        // =====================================================
        // Edit Profile
        // =====================================================

        const editButton =
            main.querySelector("[data-edit-profile]");

        if (editButton) {

            editButton.addEventListener("click", () => {

                const profileCard =
                    main.querySelector("[data-profile-card]");

                if (!profileCard) {
                    return;
                }

                if (profileCard.querySelector("[data-edit-form]")) {
                    return;
                }

                const currentName =
                    user && user.name
                        ? user.name
                        : "";

                const currentEmail =
                    user && user.email
                        ? user.email
                        : "";

                profileCard.insertAdjacentHTML(
                    "beforeend",
                    `
            <div
                data-edit-form
                style="
                    margin-top:1.5rem;
                    padding-top:1.5rem;
                    border-top:1px solid var(--border);
                "
            >

                <div class="field">

                    <label
                        class="label"
                        for="edit-name"
                    >
                        Full Name
                    </label>

                    <input
                        class="input"
                        id="edit-name"
                        type="text"
                        value="${GG.esc(currentName)}"
                        placeholder="Enter your full name"
                    />

                </div>

                <div
                    class="field"
                    style="margin-top:1rem"
                >

                    <label
                        class="label"
                        for="edit-email"
                    >
                        Email
                    </label>

                    <input
                        class="input"
                        id="edit-email"
                        type="email"
                        value="${GG.esc(currentEmail)}"
                        disabled
                    />

                </div>

                <div
                    class="row"
                    style="
                        gap:.75rem;
                        margin-top:1rem;
                    "
                >

                    <button
                        class="btn btn-round"
                        type="button"
                        data-save-profile
                    >
                        ${GG.icon("save")}
                        Save Changes
                    </button>

                    <button
                        class="btn btn-outline btn-round"
                        type="button"
                        data-cancel-profile
                    >
                        Cancel
                    </button>

                </div>

            </div>
            `
                );

                GG.refreshIcons();

                // Cancel

                const cancelButton =
                    profileCard.querySelector(
                        "[data-cancel-profile]"
                    );

                if (cancelButton) {

                    cancelButton.addEventListener(
                        "click",
                        () => {

                            const form =
                                profileCard.querySelector(
                                    "[data-edit-form]"
                                );

                            if (form) {
                                form.remove();
                            }

                        }
                    );

                }

                // Save

                const saveButton =
                    profileCard.querySelector(
                        "[data-save-profile]"
                    );

                if (saveButton) {

                    saveButton.addEventListener(
                        "click",
                        () => {

                            const nameInput =
                                profileCard.querySelector(
                                    "#edit-name"
                                );

                            const newName =
                                nameInput.value.trim();

                            if (!newName) {

                                GG.toast(
                                    "Name Required",
                                    "Please enter your name.",
                                    "error"
                                );

                                nameInput.focus();

                                return;
                            }

                            if (newName.length < 2) {

                                GG.toast(
                                    "Invalid Name",
                                    "Name must contain at least 2 characters.",
                                    "error"
                                );

                                nameInput.focus();

                                return;
                            }

                            const updatedUser = {
                                ...(user || {}),
                                name: newName
                            };

                            localStorage.setItem(
                                "govguide-user",
                                JSON.stringify(updatedUser)
                            );

                            GG.toast(
                                "Profile Updated",
                                "Your name has been updated successfully."
                            );

                            setTimeout(() => {
                                render();
                            }, 500);

                        }
                    );

                }

            });

        }

        const resetButton =
            main.querySelector("[data-reset]");

        if (resetButton) {

            resetButton.addEventListener(
                "click",
                () => {

                    const confirmed =
                        window.confirm(
                            "Are you sure you want to reset all your tutorial progress and bookmarks?"
                        );

                    if (!confirmed) {
                        return;
                    }

                    services.forEach((service) => {

                        GG.store.clear(
                            `govguide-progress-${service.slug}`
                        );

                    });

                    GG.store.clear(
                        "govguide-bookmarks"
                    );

                    GG.toast(
                        "Progress Reset",
                        "All local progress and bookmarks were cleared."
                    );

                    render();

                }
            );

        }


        // =====================================================
        // Refresh Icons & Animations
        // =====================================================

        GG.refreshIcons();
        GG.reveal(main);

    }


    // =========================================================
    // Boot Dashboard
    // =========================================================

    GG.boot(function () {

        main = document.getElementById("main");
        if (!main) {
            console.error("Dashboard: #main was not found.");
            return;
        }

        render();

    });

})();