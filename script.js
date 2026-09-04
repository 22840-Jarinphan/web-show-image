/* =========================================================
   🌸 SERVAMP FLOATING PARTICLES
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.createElement("div");

    container.className = "gallery-particles";

    document.body.appendChild(container);


    const particles = [
        "🌸",
        "🌸",
        "💗",
        "♡",
        "♥",
        "✦",
        "✧",
        "⋆",
        "✨"
    ];


    for (let i = 0; i < 35; i++) {

        const particle = document.createElement("span");

        particle.className = "gallery-particle";

        particle.textContent =
            particles[
                Math.floor(
                    Math.random() * particles.length
                )
            ];


        particle.style.left =
            Math.random() * 100 + "%";


        particle.style.fontSize =
            (12 + Math.random() * 18) + "px";


        particle.style.animationDuration =
            (8 + Math.random() * 10) + "s";


        particle.style.animationDelay =
            Math.random() * 10 + "s";


        container.appendChild(particle);
    }

});
