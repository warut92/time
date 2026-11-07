// สลับภาพพื้นหลัง SVG ทุก 5 นาที (ต้องโหลด scenes.js ก่อนไฟล์นี้)
//
// ทดสอบในหน้าเว็บ:
//   index.html?scene=3   -> แสดงฉากที่ 3 ตลอด (นับจาก 1)
//   SvgScenes.next()     -> เปลี่ยนฉากทันที (พิมพ์ใน Console)

(function () {
  const INTERVAL_MS = 5 * 60 * 1000; // 5 นาที
  const FADE_MS = 2000;

  const scenes = window.SVG_SCENES || [];
  if (!scenes.length) return;

  const layer = document.createElement("div");
  layer.id = "sceneLayer";
  document.body.prepend(layer);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = -1;

  function show(index) {
    current = index;
    const frame = document.createElement("div");
    frame.className = "scene-frame";
    frame.dataset.scene = scenes[index].name;
    frame.innerHTML = scenes[index].draw();
    layer.appendChild(frame);

    if (reduceMotion) {
      const svgEl = frame.querySelector("svg");
      if (svgEl && svgEl.pauseAnimations) svgEl.pauseAnimations();
    }

    // เฟดภาพใหม่เข้า แล้วลบภาพเก่าออก
    requestAnimationFrame(() => {
      requestAnimationFrame(() => frame.classList.add("is-visible"));
    });
    const old = Array.from(layer.children).filter((el) => el !== frame);
    old.forEach((el) => el.classList.remove("is-visible"));
    setTimeout(() => old.forEach((el) => el.remove()), FADE_MS);
  }

  function next() {
    if (scenes.length === 1) return show(0);
    let i;
    do {
      i = Math.floor(Math.random() * scenes.length);
    } while (i === current);
    show(i);
  }

  const fixed = parseInt(new URLSearchParams(location.search).get("scene"), 10);
  if (fixed >= 1 && fixed <= scenes.length) {
    show(fixed - 1);
  } else {
    next();
    setInterval(next, INTERVAL_MS);
  }

  window.SvgScenes = { next, show: (n) => show((n - 1 + scenes.length) % scenes.length) };
})();
