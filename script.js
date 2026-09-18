/* =========================================================
   🧚 BIBBLE DRAG SYSTEM
   ลากได้จริง + ประกาย + บินเอง
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const bibble =
        document.getElementById("bibbleCharacter");

    const effects =
        document.getElementById("bibbleEffects");


    if (!bibble) {
        console.log("ไม่พบ Bibble");
        return;
    }


    /* =====================================================
       📍 ตัวแปรตำแหน่ง
    ===================================================== */

    let x = 180;
    let y = 250;

    let startMouseX = 0;
    let startMouseY = 0;

    let startX = 0;
    let startY = 0;

    let isDragging = false;

    let lastSpark = 0;


    /* =====================================================
       ✨ ประกาย
    ===================================================== */

    function sparkle(x, y) {

        const now =
            performance.now();

        /* ป้องกันสร้างเยอะเกินไป */

        if (now - lastSpark < 50) {
            return;
        }

        lastSpark = now;


        const spark =
            document.createElement("span");

        spark.className =
            "bibbleSpark";

        const symbols = [
            "✦",
            "✧",
            "⋆",
            "✨",
            "★"
        ];

        spark.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        spark.style.left =
            `${x}px`;

        spark.style.top =
            `${y}px`;


        effects.appendChild(spark);


        setTimeout(function () {

            spark.remove();

        }, 800);

    }


    /* =====================================================
       💥 ระเบิดประกาย
    ===================================================== */

    function burst(x, y) {

        const symbols = [
            "✦",
            "✧",
            "✨",
            "⋆",
            "★"
        ];


        for (let i = 0; i < 8; i++) {

            const spark =
                document.createElement("span");

            spark.className =
                "bibbleBurst";

            spark.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            spark.style.left =
                `${x}px`;

            spark.style.top =
                `${y}px`;


            const angle =
                Math.random() *
                Math.PI * 2;

            const distance =
                25 +
                Math.random() * 45;


            spark.style.setProperty(
                "--bx",
                `${Math.cos(angle) * distance}px`
            );

            spark.style.setProperty(
                "--by",
                `${Math.sin(angle) * distance}px`
            );


            effects.appendChild(spark);


            setTimeout(function () {

                spark.remove();

            }, 700);

        }

    }


    /* =====================================================
       🖱️ เริ่มลาก
    ===================================================== */

    bibble.addEventListener(
        "pointerdown",
        function (event) {

            event.preventDefault();

            isDragging = true;

            bibble.classList.add(
                "dragging"
            );


            startMouseX =
                event.clientX;

            startMouseY =
                event.clientY;


            startX = x;
            startY = y;


            /* ให้จับ pointer ต่อเนื่อง */

            try {

                bibble.setPointerCapture(
                    event.pointerId
                );

            } catch (error) {}


            burst(
                event.clientX,
                event.clientY
            );

        }
    );


    /* =====================================================
       🖱️ ลาก
    ===================================================== */

    bibble.addEventListener(
        "pointermove",
        function (event) {

            if (!isDragging) {
                return;
            }


            event.preventDefault();


            const moveX =
                event.clientX -
                startMouseX;

            const moveY =
                event.clientY -
                startMouseY;


            x =
                startX +
                moveX;

            y =
                startY +
                moveY;


            /* =============================================
               จำกัดไม่ให้ออกนอกหน้าจอ
            ============================================= */

            const maxX =
                window.innerWidth -
                bibble.offsetWidth;

            const maxY =
                window.innerHeight -
                bibble.offsetHeight;


            x =
                Math.max(
                    0,
                    Math.min(x, maxX)
                );


            y =
                Math.max(
                    0,
                    Math.min(y, maxY)
                );


            /* =============================================
               ย้ายตัวละคร
            ============================================= */

            bibble.style.left =
                `${x}px`;

            bibble.style.top =
                `${y}px`;


            /* =============================================
               ✨ ประกายตามหลัง
            ============================================= */

            sparkle(
                x +
                bibble.offsetWidth * 0.5,

                y +
                bibble.offsetHeight * 0.7
            );

        }
    );


    /* =====================================================
       🖱️ ปล่อยเมาส์
    ===================================================== */

    function stopDragging(event) {

        if (!isDragging) {
            return;
        }


        isDragging = false;

        bibble.classList.remove(
            "dragging"
        );


        burst(
            event.clientX,
            event.clientY
        );

    }


    bibble.addEventListener(
        "pointerup",
        stopDragging
    );


    bibble.addEventListener(
        "pointercancel",
        stopDragging
    );


    /* =====================================================
       📱 ป้องกันลากรูปแบบปกติของ Browser
    ===================================================== */

    bibble.addEventListener(
        "dragstart",
        function (event) {

            event.preventDefault();

        }
    );


    /* =====================================================
       ✨ ทดสอบประกายเบา ๆ
    ===================================================== */

    setInterval(function () {

        if (!isDragging) {

            const rect =
                bibble.getBoundingClientRect();

            sparkle(
                rect.left +
                Math.random() *
                rect.width,

                rect.top +
                Math.random() *
                rect.height
            );

        }

    }, 900);


    /* =====================================================
       📐 ปรับเมื่อเปลี่ยนขนาดหน้าจอ
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            const maxX =
                window.innerWidth -
                bibble.offsetWidth;

            const maxY =
                window.innerHeight -
                bibble.offsetHeight;


            x =
                Math.max(
                    0,
                    Math.min(x, maxX)
                );

            y =
                Math.max(
                    0,
                    Math.min(y, maxY)
                );


            bibble.style.left =
                `${x}px`;

            bibble.style.top =
                `${y}px`;

        }
    );


    /* =====================================================
       🚀 แสดงตำแหน่งเริ่มต้น
    ===================================================== */

    bibble.style.left =
        `${x}px`;

    bibble.style.top =
        `${y}px`;


    console.log(
        "🧚 Bibble Drag System พร้อมใช้งาน!"
    );

});

/* =========================================================
   💬 ข้อความถึงคุณครู
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const message =
        document.getElementById("teacherMessage");

    if (!message) return;


    /* ตอนแรกซ่อนไว้ */

    message.style.opacity = "0";


    /* แล้วค่อย ๆ ปรากฏ */

    setTimeout(() => {

        message.style.transition =
            "opacity 1s ease";

        message.style.opacity = "1";

    }, 1800);

});
