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

// =========================================================
// 🎵 MUSIC BUTTON
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("music-toggle");
    const player = document.getElementById("youtube-player");

    if (!button || !player) return;

    let playing = true;

    button.addEventListener("click", () => {

        if (playing) {

            player.src = player.src.replace(
                "&autoplay=1",
                "&autoplay=0"
            );

            button.textContent = "▶";

            playing = false;

        } else {

            player.src = player.src.replace(
                "&autoplay=0",
                "&autoplay=1"
            );

            button.textContent = "⏸";

            playing = true;
        }

    });

});
