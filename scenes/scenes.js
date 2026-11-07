// ฉากภาพ SVG สำหรับพื้นหลัง
// แต่ละฉากเป็นฟังก์ชันที่คืนค่าเป็นข้อความ SVG (ขนาด viewBox 1920x1080)
// สุ่มตำแหน่งใหม่ทุกครั้งที่เรียก ทำให้ภาพไม่ซ้ำเดิม

(function () {
  const W = 1920;
  const H = 1080;

  const rand = (min, max) => Math.random() * (max - min) + min;
  const randInt = (min, max) => Math.floor(rand(min, max + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const times = (n, fn) => Array.from({ length: n }, (_, i) => fn(i)).join("");
  const f = (n) => n.toFixed(1);

  const svg = (content) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${content}</svg>`;

  // เคลื่อนที่จากล่างขึ้นบน (หรือบนลงล่าง) วนซ้ำ
  const moveY = (dist, dur, delay) =>
    `<animateTransform attributeName="transform" type="translate" from="0 0" to="0 ${dist}" dur="${f(dur)}s" begin="-${f(delay)}s" repeatCount="indefinite"/>`;

  const moveX = (dist, dur, delay) =>
    `<animateTransform attributeName="transform" type="translate" from="0 0" to="${dist} 0" dur="${f(dur)}s" begin="-${f(delay)}s" repeatCount="indefinite"/>`;

  // แกว่งไปมา (หมุนรอบจุด cx, cy)
  const sway = (deg, cx, cy, dur) =>
    `<animateTransform attributeName="transform" type="rotate" values="${-deg} ${cx} ${cy};${deg} ${cx} ${cy};${-deg} ${cx} ${cy}" dur="${f(dur)}s" begin="-${f(rand(0, dur))}s" repeatCount="indefinite"/>`;

  const spin = (cx, cy, dur, reverse) =>
    `<animateTransform attributeName="transform" type="rotate" from="${reverse ? 360 : 0} ${cx} ${cy}" to="${reverse ? 0 : 360} ${cx} ${cy}" dur="${f(dur)}s" repeatCount="indefinite"/>`;

  const twinkle = (dur) =>
    `<animate attributeName="opacity" values="1;0.2;1" dur="${f(dur)}s" begin="-${f(rand(0, dur))}s" repeatCount="indefinite"/>`;

  const bob = (amp, dur) =>
    `<animateTransform attributeName="transform" type="translate" values="0 0;0 ${amp};0 0" dur="${f(dur)}s" begin="-${f(rand(0, dur))}s" repeatCount="indefinite"/>`;

  const stars = (n, maxY) =>
    times(n, () => {
      const r = rand(1.5, 4);
      return `<circle cx="${f(rand(0, W))}" cy="${f(rand(0, maxY))}" r="${f(r)}" fill="#fff">${twinkle(rand(2, 6))}</circle>`;
    });

  const cloud = (x, y, s) =>
    `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})" fill="#fff" opacity="0.8">
      <ellipse cx="0" cy="0" rx="90" ry="40"/><ellipse cx="-55" cy="10" rx="60" ry="32"/>
      <ellipse cx="60" cy="12" rx="65" ry="30"/><ellipse cx="10" cy="-30" rx="55" ry="40"/>
    </g>`;

  const driftingClouds = (n, maxY) =>
    times(n, () => {
      const dur = rand(80, 160);
      return `<g>${moveX(W + 600, dur, rand(0, dur))}${cloud(rand(-400, -150), rand(60, maxY), rand(0.6, 1.4))}</g>`;
    });

  const SCENES = [
    // 1. ท้องฟ้ายามค่ำคืน
    {
      name: "ท้องฟ้ายามค่ำคืน",
      draw: () =>
        svg(`
          ${stars(140, H)}
          <g fill="#fff8d6">
            <circle cx="1560" cy="230" r="110"/>
            <circle cx="1610" cy="195" r="100" fill="#000" opacity="0.35"/>
          </g>
          <g opacity="0">
            <line x1="300" y1="120" x2="520" y2="230" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
            <animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.9;0.95;1" dur="9s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 0;500 250" keyTimes="0;0.9;1" dur="9s" repeatCount="indefinite"/>
          </g>
          <path d="M0 980 Q 300 900 600 960 T 1200 950 T 1920 930 V1080 H0 Z" fill="#000" opacity="0.35"/>
        `),
    },

    // 2. ฟองสบู่
    {
      name: "ฟองสบู่",
      draw: () =>
        svg(
          times(40, () => {
            const r = rand(15, 70);
            const dur = rand(12, 30);
            const x = rand(0, W);
            return `<g>${moveY(-(H + 200), dur, rand(0, dur))}
              <g>${sway(6, x, H + 100, rand(3, 6))}
                <circle cx="${f(x)}" cy="${H + 100}" r="${f(r)}" fill="#fff" fill-opacity="0.12" stroke="#fff" stroke-opacity="0.7" stroke-width="3"/>
                <circle cx="${f(x - r * 0.35)}" cy="${f(H + 100 - r * 0.35)}" r="${f(r * 0.2)}" fill="#fff" opacity="0.8"/>
              </g></g>`;
          })
        ),
    },

    // 3. ภูเขาและพระอาทิตย์
    {
      name: "ภูเขา",
      draw: () =>
        svg(`
          <g>
            ${spin(960, 700, 90)}
            ${times(16, (i) => `<rect x="955" y="250" width="10" height="160" rx="5" fill="#ffe08a" opacity="0.6" transform="rotate(${i * 22.5} 960 700)"/>`)}
          </g>
          <circle cx="960" cy="700" r="200" fill="#ffd34d"/>
          ${driftingClouds(5, 400)}
          <path d="M0 800 L300 520 L520 720 L820 420 L1100 760 L1380 480 L1700 740 L1920 560 V1080 H0 Z" fill="#000" opacity="0.25"/>
          <path d="M0 900 L250 700 L560 880 L900 640 L1250 900 L1550 680 L1920 880 V1080 H0 Z" fill="#000" opacity="0.35"/>
          <path d="M820 420 L740 515 L790 500 L820 530 L860 495 L900 515 Z M1380 480 L1310 560 L1350 550 L1385 575 L1420 545 L1450 560 Z" fill="#fff" opacity="0.85"/>
        `),
    },

    // 4. คลื่นทะเล
    {
      name: "ทะเล",
      draw: () => {
        const wave = (y, amp, color, op, dur) => {
          let d = `M0 ${y}`;
          for (let x = 0; x <= W * 2; x += 240) {
            d += ` Q ${x + 60} ${y - amp} ${x + 120} ${y} T ${x + 240} ${y}`;
          }
          d += ` V${H} H0 Z`;
          return `<path d="${d}" fill="${color}" opacity="${op}">${moveX(-480, dur, 0)}</path>`;
        };
        return svg(`
          <circle cx="1500" cy="300" r="140" fill="#ffd34d"/>
          ${driftingClouds(4, 350)}
          <g>${bob(18, 4)}
            <g transform="translate(600 760)">
              <path d="M-120 0 H120 L80 50 H-80 Z" fill="#fff"/>
              <path d="M0 -10 V-190 L110 -10 Z" fill="#fff" opacity="0.9"/>
              <path d="M-10 -10 V-160 L-90 -10 Z" fill="#fff" opacity="0.7"/>
            </g>
          </g>
          ${wave(800, 40, "#fff", 0.25, 6)}
          ${wave(870, 35, "#000", 0.2, 8)}
          ${wave(950, 30, "#fff", 0.3, 5)}
        `);
      },
    },

    // 5. ลูกโป่ง
    {
      name: "ลูกโป่ง",
      draw: () =>
        svg(
          times(18, () => {
            const x = rand(50, W - 50);
            const s = rand(0.6, 1.3);
            const dur = rand(18, 35);
            const color = pick(["#ff5e7e", "#ffd34d", "#5ee0ff", "#9dff7a", "#c78bff", "#ff9f43", "#fff"]);
            return `<g>${moveY(-(H + 400), dur, rand(0, dur))}
              <g transform="translate(${f(x)} ${H + 150}) scale(${f(s)})">
                <g>${sway(8, 0, 120, rand(3, 6))}
                  <path d="M0 80 Q -10 120 8 160 T 0 230" stroke="#fff" stroke-width="2" fill="none" opacity="0.8"/>
                  <ellipse cx="0" cy="0" rx="60" ry="75" fill="${color}" opacity="0.85"/>
                  <path d="M-8 74 L8 74 L0 86 Z" fill="${color}"/>
                  <ellipse cx="-22" cy="-28" rx="12" ry="20" fill="#fff" opacity="0.5"/>
                </g>
              </g></g>`;
          })
        ),
    },

    // 6. ใบไม้ร่วง
    {
      name: "ใบไม้ร่วง",
      draw: () =>
        svg(
          times(35, () => {
            const x = rand(0, W);
            const s = rand(0.5, 1.4);
            const dur = rand(12, 25);
            const color = pick(["#ffb347", "#ff7043", "#ffd54f", "#e57373", "#c0ca33"]);
            return `<g>${moveY(H + 300, dur, rand(0, dur))}
              <g>${sway(25, x, -100, rand(3, 5))}
                <g transform="translate(${f(x)} -150) scale(${f(s)}) rotate(${randInt(0, 360)})">
                  <g>${spin(0, 0, rand(6, 14), Math.random() < 0.5)}
                    <path d="M0 -40 C 30 -30 35 10 0 40 C -35 10 -30 -30 0 -40 Z" fill="${color}" opacity="0.9"/>
                    <path d="M0 -35 V40" stroke="#000" stroke-opacity="0.25" stroke-width="2"/>
                  </g>
                </g>
              </g></g>`;
          })
        ),
    },

    // 7. เมืองยามค่ำ
    {
      name: "เมือง",
      draw: () => {
        let buildings = "";
        let x = -20;
        while (x < W) {
          const w = rand(90, 190);
          const h = rand(200, 560);
          const top = H - h;
          let windows = "";
          for (let wy = top + 30; wy < H - 40; wy += 45) {
            for (let wx = x + 18; wx < x + w - 30; wx += 35) {
              if (Math.random() < 0.55) {
                windows += `<rect x="${f(wx)}" y="${f(wy)}" width="16" height="22" fill="#ffe08a">${Math.random() < 0.15 ? twinkle(rand(4, 10)) : ""}</rect>`;
              }
            }
          }
          buildings += `<rect x="${f(x)}" y="${f(top)}" width="${f(w)}" height="${f(h)}" fill="#000" opacity="0.45"/>${windows}`;
          x += w + rand(5, 25);
        }
        return svg(`${stars(70, 500)}<circle cx="300" cy="200" r="70" fill="#fff8d6"/>${buildings}`);
      },
    },

    // 8. ทุ่งดอกไม้กับผีเสื้อ
    {
      name: "ทุ่งดอกไม้",
      draw: () => {
        const flowers = times(40, () => {
          const x = rand(0, W);
          const h = rand(120, 320);
          const top = H - h;
          const color = pick(["#ff5e7e", "#ffd34d", "#fff", "#c78bff", "#ff9f43"]);
          const r = rand(14, 24);
          const petals = times(6, (i) => `<ellipse cx="${f(x)}" cy="${f(top - r)}" rx="${f(r * 0.6)}" ry="${f(r)}" fill="${color}" transform="rotate(${i * 60} ${f(x)} ${f(top)})"/>`);
          return `<g>${sway(5, x, H, rand(3, 6))}
            <path d="M${f(x)} ${H} Q ${f(x + rand(-30, 30))} ${f(top + h / 2)} ${f(x)} ${f(top)}" stroke="#2e7d32" stroke-width="5" fill="none" opacity="0.8"/>
            ${petals}<circle cx="${f(x)}" cy="${f(top)}" r="${f(r * 0.5)}" fill="#ffb300"/>
          </g>`;
        });
        const butterflies = times(5, () => {
          const color = pick(["#ffd34d", "#5ee0ff", "#ff5e7e", "#fff"]);
          const dur = rand(25, 45);
          const y = rand(150, 600);
          return `<g>${moveX(W + 400, dur, rand(0, dur))}
            <g transform="translate(-200 ${f(y)})"><g>${bob(rand(40, 90), rand(3, 5))}
              <g>
                <ellipse cx="-18" cy="-10" rx="20" ry="26" fill="${color}"/>
                <ellipse cx="18" cy="-10" rx="20" ry="26" fill="${color}"/>
                <ellipse cx="-14" cy="18" rx="13" ry="16" fill="${color}"/>
                <ellipse cx="14" cy="18" rx="13" ry="16" fill="${color}"/>
                <animateTransform attributeName="transform" type="scale" values="1 1;0.3 1;1 1" dur="0.4s" repeatCount="indefinite"/>
              </g>
              <rect x="-3" y="-25" width="6" height="55" rx="3" fill="#333"/>
            </g></g></g>`;
        });
        return svg(`<circle cx="250" cy="220" r="110" fill="#ffd34d"/>${driftingClouds(3, 300)}${flowers}${butterflies}`);
      },
    },

    // 9. รูปทรงเรขาคณิต
    {
      name: "เรขาคณิต",
      draw: () =>
        svg(
          times(30, () => {
            const x = rand(0, W);
            const y = rand(0, H);
            const s = rand(30, 110);
            const color = pick(["#fff", "#ffd34d", "#5ee0ff", "#ff5e7e"]);
            const shape = pick([
              `<rect x="${f(x - s / 2)}" y="${f(y - s / 2)}" width="${f(s)}" height="${f(s)}" rx="8"/>`,
              `<polygon points="${f(x)},${f(y - s / 1.5)} ${f(x + s / 1.6)},${f(y + s / 2.5)} ${f(x - s / 1.6)},${f(y + s / 2.5)}"/>`,
              `<circle cx="${f(x)}" cy="${f(y)}" r="${f(s / 2)}"/>`,
              `<path d="M${f(x - s / 2)} ${f(y)} H${f(x + s / 2)} M${f(x)} ${f(y - s / 2)} V${f(y + s / 2)}" stroke-width="12" stroke-linecap="round"/>`,
            ]);
            const filled = Math.random() < 0.5;
            return `<g fill="${filled ? color : "none"}" stroke="${color}" stroke-width="5" opacity="${f(rand(0.4, 0.9))}">
              <g>${bob(rand(-60, 60), rand(6, 12))}<g>${spin(x, y, rand(15, 40), Math.random() < 0.5)}${shape}</g></g>
            </g>`;
          })
        ),
    },

    // 10. อวกาศ
    {
      name: "อวกาศ",
      draw: () =>
        svg(`
          ${stars(160, H)}
          <g transform="translate(1450 330)">
            <circle r="150" fill="#ff9f43"/>
            <path d="M-150 0 Q 0 40 150 0" stroke="#000" stroke-opacity="0.2" stroke-width="20" fill="none"/>
            <path d="M-130 -60 Q 0 -30 130 -60" stroke="#000" stroke-opacity="0.15" stroke-width="16" fill="none"/>
            <ellipse rx="260" ry="50" fill="none" stroke="#ffe08a" stroke-width="14" transform="rotate(-18)"/>
          </g>
          <circle cx="350" cy="850" r="60" fill="#5ee0ff" opacity="0.8"/>
          <g>${moveY(-(H + 600), 22, 0)}
            <g transform="translate(700 ${H + 250})"><g>${sway(6, 0, 0, 3)}
              <path d="M0 -120 C 40 -80 45 0 40 60 H-40 C -45 0 -40 -80 0 -120 Z" fill="#fff"/>
              <circle cy="-30" r="18" fill="#5ee0ff"/>
              <path d="M-40 20 L-75 80 H-40 Z M40 20 L75 80 H40 Z" fill="#ff5e7e"/>
              <path d="M-25 60 Q 0 160 25 60 Z" fill="#ffd34d">
                <animate attributeName="d" values="M-25 60 Q 0 160 25 60 Z;M-25 60 Q 0 120 25 60 Z;M-25 60 Q 0 160 25 60 Z" dur="0.3s" repeatCount="indefinite"/>
              </path>
            </g></g>
          </g>
        `),
    },

    // 11. ตัวโน้ตดนตรี
    {
      name: "ตัวโน้ต",
      draw: () =>
        svg(
          `${times(5, (i) => `<path d="M0 ${780 + i * 30} Q 480 ${740 + i * 30} 960 ${780 + i * 30} T 1920 ${780 + i * 30}" stroke="#fff" stroke-width="3" fill="none" opacity="0.5"/>`)}` +
            times(24, () => {
              const x = rand(0, W);
              const s = rand(0.6, 1.5);
              const dur = rand(14, 28);
              const color = pick(["#fff", "#ffd34d", "#5ee0ff", "#ff5e7e"]);
              const note = pick([
                `<ellipse cx="0" cy="0" rx="22" ry="16" transform="rotate(-20)"/><rect x="16" y="-90" width="6" height="90"/>`,
                `<ellipse cx="0" cy="0" rx="22" ry="16" transform="rotate(-20)"/><rect x="16" y="-90" width="6" height="90"/><path d="M22 -90 Q 50 -60 40 -30 Q 45 -60 22 -65 Z"/>`,
                `<ellipse cx="0" cy="0" rx="22" ry="16" transform="rotate(-20)"/><ellipse cx="80" cy="-15" rx="22" ry="16" transform="rotate(-20 80 -15)"/><rect x="16" y="-100" width="6" height="100"/><rect x="96" y="-115" width="6" height="100"/><path d="M16 -100 L102 -115 V-95 L16 -80 Z"/>`,
              ]);
              return `<g>${moveY(-(H + 300), dur, rand(0, dur))}
                <g transform="translate(${f(x)} ${H + 150}) scale(${f(s)})" fill="${color}"><g>${sway(15, 0, 0, rand(3, 6))}${note}</g></g>
              </g>`;
            })
        ),
    },

    // 12. หิมะตก
    {
      name: "หิมะ",
      draw: () => {
        const flake = (s) =>
          `<g stroke="#fff" stroke-width="${f(3 / s)}" stroke-linecap="round">${times(3, (i) => `<path d="M0 -20 V20 M-6 -14 L0 -8 L6 -14 M-6 14 L0 8 L6 14" transform="rotate(${i * 60})"/>`)}</g>`;
        return svg(
          times(60, () => {
            const x = rand(0, W);
            const s = rand(0.4, 1.6);
            const dur = rand(10, 25);
            const shape = Math.random() < 0.5 ? flake(s) : `<circle r="8" fill="#fff"/>`;
            return `<g>${moveY(H + 200, dur, rand(0, dur))}
              <g>${sway(10, x, -100, rand(4, 7))}
                <g transform="translate(${f(x)} -80) scale(${f(s)})" opacity="${f(rand(0.5, 1))}">${shape}</g>
              </g></g>`;
          }) +
            `<path d="M0 1000 Q 480 950 960 1000 T 1920 990 V1080 H0 Z" fill="#fff" opacity="0.8"/>`
        );
      },
    },
  ];

  window.SVG_SCENES = SCENES;
})();
