// เปลี่ยนสี progress bar ตามเวลาที่เหลือในคาบ
// อ่านตัวเลขจากข้อความ "เหลือเวลา N นาที" ที่ script.js แสดงไว้
(function () {
  const bar = document.getElementById("myBar");
  const countdown = document.getElementById("coutDownClock");
  if (!bar || !countdown) return;

  function update() {
    const match = countdown.textContent.match(/(\d+)/);
    const visible = countdown.style.display !== "none";
    const minutesLeft = match && visible ? parseInt(match[1], 10) : null;

    const active = minutesLeft !== null && minutesLeft > 0;
    bar.classList.toggle("is-last", active && minutesLeft <= 1);
    bar.classList.toggle("is-ending", active && minutesLeft > 1 && minutesLeft <= 5);
  }

  update();
  setInterval(update, 1000);
})();
