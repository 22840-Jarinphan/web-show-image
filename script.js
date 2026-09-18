/* =========================================================
   🌸 SERVAMP FLOATING PARTICLES (MINT & SKY BAT/LEAF THEME)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {

    // สร้าง คอนเทนเนอร์สำหรับใส่เอฟเฟกต์อนุภาค ลอย
    const container = document.createElement("div");
    container.className = "gallery-particles";
    document.body.appendChild(container);

    // รายการอิโมจิธีมใบไม้ แวมไพร์ และสีเขียวฟ้าสุดอลังการ
    const particles = [
        "🍃", "🌿", "☘️", "🌱", 
        "🦇", "🩸", 
        "✦", "✧", "⋆", "✨", 
        "💎", "💧"
    ];

    // สร้างอนุภาคจำนวน 40 ชิ้น
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("span");
        particle.className = "gallery-particle";

        // สุ่มสัญลักษณ์จาก Array
        particle.textContent = particles[
            Math.floor(Math.random() * particles.length)
        ];

        // สุ่มตำแหน่งแนวนอน (0% - 100%)
        particle.style.left = Math.random() * 100 + "%";

        // สุ่มขนาดฟอนต์ (14px - 32px)
        particle.style.fontSize = (14 + Math.random() * 18) + "px";

        // สุ่มระยะเวลาลอยตัว (7s - 17s)
        particle.style.animationDuration = (7 + Math.random() * 10) + "s";

        // สุ่มความล่าช้าเริ่มต้น (0s - 10s)
        particle.style.animationDelay = (Math.random() * 10) + "s";

        container.appendChild(particle);
    }
});


/* =========================================================
   CUSTOM MINT CURSOR & MOUSE TRAIL
========================================================= */
const cursor = document.getElementById("customCursor");
let lastTrail = 0;

document.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;

    // เคลื่อนที่ตามเมาส์
    if (cursor) {
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
    }

    // สร้างร่องรอยเมาส์ (Trail) ทุกๆ 80ms
    const now = Date.now();
    if (now - lastTrail > 80) {
        lastTrail = now;

        const trail = document.createElement("span");
        trail.className = "trail-particle";

        const trailSymbols = ["🍃", "💧", "✦", "🌿", "✨", "🦇"];
        trail.textContent = trailSymbols[Math.floor(Math.random() * trailSymbols.length)];

        trail.style.left = x + "px";
        trail.style.top = y + "px";

        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 900);
    }
});


/* =========================================================
   CLICK BURST EFFECT (เอฟเฟกต์เมื่อคลิกเมาส์)
========================================================= */
document.addEventListener("click", (event) => {
    const particles = ["🍃", "🌿", "☘️", "🦇", "🩸", "✨", "💎", "💧", "✦"];

    for (let i = 0; i < 16; i++) {
        const particle = document.createElement("span");
        particle.className = "click-particle";
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];

        particle.style.left = event.clientX + "px";
        particle.style.top = event.clientY + "px";

        const angle = Math.random() * Math.PI * 2;
        const distance = 70 + Math.random() * 130;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.setProperty("--x", x + "px");
        particle.style.setProperty("--y", y + "px");
        particle.style.animationDelay = (Math.random() * 0.12) + "s";

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1200);
    }
});


/* =========================================================
   CARD CLICK ANIMATION
========================================================= */
document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
        card.style.transform = "translateY(-16px) scale(1.02)";
        setTimeout(() => {
            card.style.transform = "";
        }, 350);
    });
});

/* =========================================================
   🎵 SERVAMP MUSIC
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("musicBtn");
    const frame = document.getElementById("musicFrame");

    if (!btn || !frame) return;

    let playing = false;

    btn.addEventListener("click", () => {

        if (!playing) {

            frame.src =
                "https://www.youtube.com/embed/9-WagXIJZo4?autoplay=1&controls=0&enablejsapi=1";

            btn.textContent = "⏸";

            playing = true;

        } else {

            frame.src =
                "https://www.youtube.com/embed/9-WagXIJZo4?controls=0&enablejsapi=1";

            btn.textContent = "▶";

            playing = false;
        }

    });

});

/* =========================================================
   🌌 SERVAMP AURORA EXTRA EFFECTS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ✨ RANDOM MAGIC STARS
    ===================================================== */

    const starContainer = document.createElement("div");

    starContainer.className = "magic-stars";

    document.body.appendChild(starContainer);


    const starSymbols = [
        "✦",
        "✧",
        "⋆",
        "✶",
        "◇",
        "✹"
    ];


    for (let i = 0; i < 28; i++) {

        const star = document.createElement("span");

        star.className = "magic-star";

        star.textContent =
            starSymbols[
                Math.floor(Math.random() * starSymbols.length)
            ];

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.fontSize =
            (8 + Math.random() * 18) + "px";

        star.style.animationDelay =
            (Math.random() * 5) + "s";

        star.style.animationDuration =
            (3 + Math.random() * 5) + "s";

        starContainer.appendChild(star);
    }


    /* =====================================================
       🍃 FLOATING LEAVES
    ===================================================== */

    const leafContainer = document.createElement("div");

    leafContainer.className = "floating-leaves";

    document.body.appendChild(leafContainer);


    const leaves = [
        "🍃",
        "🌿",
        "☘️",
        "🌱"
    ];


    for (let i = 0; i < 18; i++) {

        const leaf = document.createElement("span");

        leaf.className = "floating-leaf";

        leaf.textContent =
            leaves[
                Math.floor(Math.random() * leaves.length)
            ];

        leaf.style.left =
            Math.random() * 100 + "%";

        leaf.style.fontSize =
            (14 + Math.random() * 20) + "px";

        leaf.style.animationDuration =
            (8 + Math.random() * 10) + "s";

        leaf.style.animationDelay =
            (Math.random() * 8) + "s";

        leafContainer.appendChild(leaf);
    }


    /* =====================================================
       💎 LIGHT DUST
    ===================================================== */

    const dustContainer = document.createElement("div");

    dustContainer.className = "light-dust";

    document.body.appendChild(dustContainer);


    for (let i = 0; i < 35; i++) {

        const dust = document.createElement("span");

        dust.className = "dust";

        dust.style.left =
            Math.random() * 100 + "%";

        dust.style.top =
            Math.random() * 100 + "%";

        dust.style.animationDelay =
            Math.random() * 5 + "s";

        dust.style.animationDuration =
            (2 + Math.random() * 4) + "s";

        dustContainer.appendChild(dust);
    }


    /* =====================================================
       🃏 3D CARD TILT
    ===================================================== */

    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("mousemove", event => {

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

            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;

            card.style.transform =
                `perspective(900px)
                 translateY(-12px)
                 scale(1.03)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

});
