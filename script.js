(() => {
    const cursor = document.getElementById('customCursor');
    const label = cursor.querySelector('.cursor-label');

    // Smooth follow
    let mx = innerWidth / 2, my = innerHeight / 2; // mouse
    let x = mx, y = my;                        // follower
    const ease = 0.18;

    window.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
    }, { passive: true });

    function raf() {
        x += (mx - x) * ease;
        y += (my - y) * ease;
        cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ====== HOVER STATES ======

    // 1) Headings -> active glass effect
    function bindHeadingHover(root = document) {
        root.querySelectorAll('.heading').forEach(el => {
            if (el.__cursorHeadingBound) return;
            el.__cursorHeadingBound = true;
            el.addEventListener('pointerenter', () => cursor.classList.add('active'));
            el.addEventListener('pointerleave', () => cursor.classList.remove('active'));
        });
    }
    bindHeadingHover();

    // 2) DRAG/Swiper targets -> show "Drag" label
    // Add/adjust selectors as per your project:
    const DRAG_SELECTOR = [
        '[draggable="true"]',
        '.draggable',
        '.swiper', '.swiper-container', '.swiper-wrapper', '.swiper-slide',
        '.splide', '.slick-slider',
        '[data-cursor="drag"]'
    ].join(',');

    function bindDragHover(root = document) {
        root.querySelectorAll(DRAG_SELECTOR).forEach(el => {
            if (el.__cursorDragBound) return;
            el.__cursorDragBound = true;

            el.addEventListener('pointerenter', () => {
                label.textContent = 'Drag';
                cursor.classList.add('drag');
            });

            el.addEventListener('pointerleave', () => {
                cursor.classList.remove('drag');
                // If heading se bahar aa rahe ho to label ko clear hi rehne do
                label.textContent = '';
            });

            // optional: while actually dragging, keep it active
            el.addEventListener('pointerdown', () => cursor.classList.add('drag'));
            el.addEventListener('pointerup', () => cursor.classList.remove('drag'));
        });
    }
    bindDragHover();

    // Observe DOM for SPA/lazy content
    const mo = new MutationObserver(muts => {
        for (const m of muts) {
            m.addedNodes && m.addedNodes.forEach(n => {
                if (n.nodeType === 1) {
                    bindHeadingHover(n);
                    bindDragHover(n);
                }
            });
        }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });

    // Optional polish: hide on window blur
    window.addEventListener('blur', () => cursor.style.opacity = '0');
    window.addEventListener('focus', () => cursor.style.opacity = '1');
})();

  AOS.init();


$(document).ready(function(){
	$('.slick-slider').slick({
	  dots: false, // Shows navigation dots
	  infinite: true, // Infinite looping
	  speed: 500, // Slide transition speed
	  slidesToShow: 1, // Number of slides to show at once
	  slidesToScroll: 1, // Number of slides to scroll
	  autoplay: true, // Enables autoplay
	  autoplaySpeed: 3000, // Autoplay speed
	  arrows: false, // Show next/prev arrows
	  adaptiveHeight: true
	});
  });
