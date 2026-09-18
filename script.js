/* =========================================================
   🧚 BIBBLE FLYING SYSTEM
   Smooth + Drag + Sparkle
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const bibble = document.getElementById("floatingBibble");
    const sparkleContainer = document.getElementById("bibble-sparkles");

    if (!bibble) return;


    /* =====================================================
       📍 ตำแหน่งเริ่มต้น
    ===================================================== */

    let x = window.innerWidth * 0.20;
    let y = window.innerHeight * 0.35;

    let targetX = x;
    let targetY = y;


    /* =====================================================
       🖱️ ระบบลาก
    ===================================================== */

    let dragging = false;

    let pointerOffsetX = 0;
    let pointerOffsetY = 0;


    /* =====================================================
       🌬️ ระบบบินอัตโนมัติ
    ===================================================== */

    let flying = true;

    let destinationX = randomX();
    let destinationY = randomY();

    let lastSparkTime = 0;


    function randomX() {

        const maxX = window.innerWidth - bibble.offsetWidth;

        return Math.random() * Math.max(50, maxX);

    }


    function randomY() {

        const maxY = window.innerHeight - bibble.offsetHeight;

        return Math.random() * Math.max(50, maxY);

    }


    /* =====================================================
       🎯 เปลี่ยนเป้าหมายการบิน
    ===================================================== */

    function chooseNewDestination() {

        destinationX = randomX();
        destinationY = randomY();

    }


    /* =====================================================
       ✨ สร้างประกาย
    ===================================================== */

    function createSpark(x, y) {

        const spark = document.createElement("span");

        spark.className = "bibble-spark";

        const symbols = [
            "✦",
            "✧",
            "⋆",
            "✩",
            "✨",
            "★"
        ];

        spark.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        const size =
            8 + Math.random() * 12;

        spark.style.fontSize = `${size}px`;

        sparkleContainer.appendChild(spark);

        setTimeout(() => {
            spark.remove();
        }, 800);

    }


    /* =====================================================
       💥 ประกายตอนกด
    ===================================================== */

    function createBurst(x, y) {

        const symbols = [
            "✦",
            "✧",
            "✨",
            "⋆"
        ];

        for (let i = 0; i < 7; i++) {

            const spark =
                document.createElement("span");

            spark.className = "bibble-burst";

            spark.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];

            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;

            const angle =
                Math.random() * Math.PI * 2;

            const distance =
                25 + Math.random() * 35;

            spark.style.setProperty(
                "--move-x",
                `${Math.cos(angle) * distance}px`
            );

            spark.style.setProperty(
                "--move-y",
                `${Math.sin(angle) * distance}px`
            );

            sparkleContainer.appendChild(spark);

            setTimeout(() => {
                spark.remove();
            }, 700);

        }

    }


    /* =====================================================
       🖱️ POINTER DOWN
    ===================================================== */

    bibble.addEventListener("pointerdown", (event) => {

        dragging = true;
        flying = false;

        bibble.classList.add("dragging");

        bibble.setPointerCapture(event.pointerId);

        const rect =
            bibble.getBoundingClientRect();

        pointerOffsetX =
            event.clientX - rect.left;

        pointerOffsetY =
            event.clientY - rect.top;

        targetX = rect.left;
        targetY = rect.top;

        createBurst(
            event.clientX,
            event.clientY
        );

    });


    /* =====================================================
       🖱️ POINTER MOVE
    ===================================================== */

    bibble.addEventListener("pointermove", (event) => {

        if (!dragging) return;


        targetX =
            event.clientX -
            pointerOffsetX;

        targetY =
            event.clientY -
            pointerOffsetY;


        /* จำกัดไม่ให้ออกนอกจอ */

        const maxX =
            window.innerWidth -
            bibble.offsetWidth;

        const maxY =
            window.innerHeight -
            bibble.offsetHeight;

        targetX =
            Math.max(
                0,
                Math.min(targetX, maxX)
            );

        targetY =
            Math.max(
                0,
                Math.min(targetY, maxY)
            );


        /* =================================================
           ✨ สร้างประกายตามการลาก
        ================================================= */

        const now =
            performance.now();

        if (now - lastSparkTime > 55) {

            createSpark(
                event.clientX +
                (Math.random() * 20 - 10),

                event.clientY +
                (Math.random() * 20 - 10)
            );

            lastSparkTime = now;

        }

    });


    /* =====================================================
       🖱️ POINTER UP
    ===================================================== */

    bibble.addEventListener("pointerup", (event) => {

        if (!dragging) return;

        dragging = false;

        bibble.classList.remove("dragging");

        flying = true;

        chooseNewDestination();

        createBurst(
            event.clientX,
            event.clientY
        );

    });


    /* =====================================================
       🖱️ POINTER CANCEL
    ===================================================== */

    bibble.addEventListener("pointercancel", () => {

        dragging = false;

        bibble.classList.remove("dragging");

        flying = true;

        chooseNewDestination();

    });


    /* =====================================================
       🌟 ANIMATION LOOP
    ===================================================== */

    function animate() {

        /* ================================================
           ถ้ากำลังบินเอง
        ================================================ */

        if (flying && !dragging) {

            const dx =
                destinationX - x;

            const dy =
                destinationY - y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            /* ถึงเป้าหมายแล้ว */

            if (distance < 8) {

                chooseNewDestination();

            } else {

                /*
                   ความเร็วแบบ Smooth
                */

                const speed = 0.018;

                x += dx * speed;
                y += dy * speed;


                /* ========================================
                   ✨ ประกายตามท้ายตัวละคร
                ======================================== */

                const now =
                    performance.now();

                if (now - lastSparkTime > 130) {

                    createSpark(
                        x +
                        bibble.offsetWidth *
                        (0.25 + Math.random() * 0.5),

                        y +
                        bibble.offsetHeight *
                        (0.6 + Math.random() * 0.25)
                    );

                    lastSparkTime = now;

                }

            }

        }


        /* ================================================
           ถ้ากำลังลาก
        ================================================ */

        if (dragging) {

            /*
               Smooth ตามเมาส์
            */

            x +=
                (targetX - x) *
                0.28;

            y +=
                (targetY - y) *
                0.28;

        }


        /* ================================================
           จำกัดพื้นที่
        ================================================ */

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


        /* ================================================
           เคลื่อนที่
        ================================================ */

        bibble.style.left =
            `${x}px`;

        bibble.style.top =
            `${y}px`;


        requestAnimationFrame(animate);

    }


    animate();


    /* =====================================================
       📐 เมื่อปรับขนาดหน้าจอ
    ===================================================== */

    window.addEventListener("resize", () => {

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

        targetX = x;
        targetY = y;

        chooseNewDestination();

    });

});
