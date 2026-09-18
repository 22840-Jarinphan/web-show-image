/* =========================================================
   🧛 SERVAMP SMOOTH FANTASY ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ⏳ LOADER
    ===================================================== */

    const loader = document.getElementById("loader");

    setTimeout(() => {
        if (loader) {
            loader.classList.add("hide");
        }
    }, 2800);


    /* =====================================================
       🖱️ MAGIC STAR CURSOR
    ===================================================== */

    const cursor = document.getElementById("cursorStar");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        createMouseSpark(
            event.clientX,
            event.clientY
        );
    });


    function animateCursor() {

        cursorX += (mouseX - cursorX) * 0.18;
        cursorY += (mouseY - cursorY) * 0.18;

        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    function createMouseSpark(x, y) {

        if (Math.random() > 0.35) return;

        const spark = document.createElement("span");

        spark.className = "mouse-spark";

        spark.textContent =
            Math.random() > .5 ? "✦" : "✧";

        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        spark.style.fontSize =
            `${Math.random() * 10 + 8}px`;

        document.body.appendChild(spark);

        setTimeout(() => {
            spark.remove();
        }, 800);
    }


    /* =====================================================
       💥 CLICK MAGIC
    ===================================================== */

    document.addEventListener("click", (event) => {

        const effects = [
            "✦",
            "✧",
            "⋆",
            "✨",
            "💠"
        ];

        for (let i = 0; i < 7; i++) {

            const effect = document.createElement("span");

            effect.className = "mouse-spark";

            effect.textContent =
                effects[
                    Math.floor(
                        Math.random() * effects.length
                    )
                ];

            effect.style.left =
                `${event.clientX}px`;

            effect.style.top =
                `${event.clientY}px`;

            const angle =
                Math.random() * Math.PI * 2;

            const distance =
                Math.random() * 60 + 20;

            effect.animate(
                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(1)",
                        opacity: 1
                    },

                    {
                        transform:
                            `translate(
                                ${Math.cos(angle) * distance}px,
                                ${Math.sin(angle) * distance}px
                            )
                            scale(.1)`,
                        opacity: 0
                    }
                ],
                {
                    duration:
                        700 + Math.random() * 300,
                    easing:
                        "cubic-bezier(.2,.8,.2,1)"
                }
            );

            document.body.appendChild(effect);

            setTimeout(() => {
                effect.remove();
            }, 1000);
        }
    });


    /* =====================================================
       ✨ FLOATING PARTICLES
    ===================================================== */

    const particleContainer =
        document.getElementById("particles");

    const particleSymbols = [
        "✦",
        "✧",
        "⋆",
        "✦",
        "·"
    ];

    function createParticle() {

        if (!particleContainer) return;

        const particle =
            document.createElement("span");

        particle.className = "particle";

        particle.textContent =
            particleSymbols[
                Math.floor(
                    Math.random() *
                    particleSymbols.length
                )
            ];

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.bottom =
            "-20px";

        particle.style.fontSize =
            `${Math.random() * 10 + 8}px`;

        const duration =
            Math.random() * 8 + 10;

        particle.style.animationDuration =
            `${duration}s`;

        particleContainer.appendChild(
            particle
        );

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    setInterval(
        createParticle,
        900
    );


    /* =====================================================
       🖼️ SCROLL REVEAL
    ===================================================== */

    const cards =
        document.querySelectorAll(".card");

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

    cards.forEach(card => {
        observer.observe(card);
    });


    /* =====================================================
       🪄 SMOOTH 3D CARD TILT
    ===================================================== */

    cards.forEach(card => {

        let targetRotateX = 0;
        let targetRotateY = 0;

        let currentRotateX = 0;
        let currentRotateY = 0;

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                targetRotateY =
                    ((x - centerX) /
                        centerX) * 4;

                targetRotateX =
                    -((y - centerY) /
                        centerY) * 4;
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                targetRotateX = 0;
                targetRotateY = 0;
            }
        );


        function animateCard() {

            currentRotateX +=
                (targetRotateX -
                    currentRotateX) * 0.08;

            currentRotateY +=
                (targetRotateY -
                    currentRotateY) * 0.08;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${currentRotateX}deg)
                 rotateY(${currentRotateY}deg)
                 translateY(0)`;

            requestAnimationFrame(
                animateCard
            );
        }

        animateCard();
    });


    /* =====================================================
       🎵 MUSIC
    ===================================================== */

    const youtubeMusic =
        document.getElementById(
            "youtubeMusic"
        );

    const playMusic =
        document.getElementById(
            "playMusic"
        );

    const stopMusic =
        document.getElementById(
            "stopMusic"
        );

    function musicCommand(
        command,
        args = []
    ) {

        if (!youtubeMusic) return;

        youtubeMusic.contentWindow.postMessage(
            JSON.stringify({
                event: "command",
                func: command,
                args: args
            }),
            "*"
        );
    }


    if (playMusic) {

        playMusic.addEventListener(
            "click",
            () => {

                musicCommand(
                    "playVideo"
                );
            }
        );
    }


    if (stopMusic) {

        stopMusic.addEventListener(
            "click",
            () => {

                musicCommand(
                    "pauseVideo"
                );

                setTimeout(() => {

                    musicCommand(
                        "seekTo",
                        [0, true]
                    );

                }, 100);
            }
        );
    }


    /* =====================================================
       🔝 BACK TO TOP
    ===================================================== */

    const topButton =
        document.getElementById(
            "topButton"
        );

    window.addEventListener(
        "scroll",
        () => {

            if (!topButton) return;

            if (window.scrollY > 500) {

                topButton.classList.add(
                    "show"
                );

            } else {

                topButton.classList.remove(
                    "show"
                );
            }
        },
        {
            passive: true
        }
    );


    if (topButton) {

        topButton.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    /* =====================================================
       🌟 IMAGE PARALLAX
    ===================================================== */

    document.querySelectorAll(
        ".image-box"
    ).forEach(box => {

        box.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    box.getBoundingClientRect();

                const x =
                    ((event.clientX -
                        rect.left) /
                        rect.width - .5) * 8;

                const y =
                    ((event.clientY -
                        rect.top) /
                        rect.height - .5) * 8;

                const image =
                    box.querySelector("img");

                if (image) {

                    image.style.transform =
                        `scale(1.055)
                         translate(${x}px, ${y}px)`;
                }
            }
        );

        box.addEventListener(
            "mouseleave",
            () => {

                const image =
                    box.querySelector("img");

                if (image) {

                    image.style.transform =
                        "";
                }
            }
        );
    });

});
