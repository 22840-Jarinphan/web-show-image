/* =========================================================
   ✨ FLOATING IMAGE SPARKLES
========================================================= */

const floatingImages =
    document.querySelectorAll(".floating-img");

floatingImages.forEach((image) => {

    setInterval(() => {

        const rect =
            image.getBoundingClientRect();

        const sparkle =
            document.createElement("span");

        sparkle.textContent =
            Math.random() > .5
                ? "✦"
                : "✧";

        sparkle.style.position = "fixed";

        sparkle.style.left =
            `${rect.left + Math.random() * rect.width}px`;

        sparkle.style.top =
            `${rect.top + Math.random() * rect.height}px`;

        sparkle.style.color =
            "#bafff4";

        sparkle.style.fontSize =
            `${Math.random() * 9 + 7}px`;

        sparkle.style.pointerEvents =
            "none";

        sparkle.style.zIndex =
            "999";

        sparkle.style.textShadow =
            "0 0 10px #6ffff0";

        document.body.appendChild(sparkle);

        sparkle.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "scale(.3) translateY(10px)"
                },
                {
                    opacity: 1,
                    transform:
                        "scale(1) translateY(0)"
                },
                {
                    opacity: 0,
                    transform:
                        "scale(.2) translateY(-18px)"
                }
            ],
            {
                duration: 1300,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            sparkle.remove();
        }, 1300);

    }, 900);

});
