//

function currentTime() {
  //get hours minutes seconds
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  //total hours
  let hm = (hh * 60) + mm;
  // console.log(hm);
  // for test
  // let hm = 820;

  // add 0 before digit less than 10
  hh = (hh < 10) ? "0" + hh : hh;
  mm = (mm < 10) ? "0" + mm : mm;
  ss = (ss < 10) ? "0" + ss : ss;
  //
  let time = hh + ":" + mm + ":" + ss;
  document.getElementById("clock").innerText = time;

  const d = new Date();
  let day = d.getDay();
  if (day == 0 || day == 6) {
    document.getElementById("periodText").innerText = "วันนี้วันหยุด";
  } else {
    //period
    let txt = Math.floor((hm - 470) / 50);
    if (d == 0 || d == 6) {
      txt = "วันนี้วันหยุด"
    } else if (txt < 1) {
      txt = "อรุณสวัสดิ์";
    } else if (txt > 8) {
      // console.log(txt);
      txt = "หมดเวลางาน";
    } else {
      txt = "คาบ " + txt;
    }
    document.getElementById("periodText").innerText = txt;

    // countdown
    let coutDownClock = 50 - ((hm - 470) % 50);
    coutDownClock = "เหลือเวลา " + coutDownClock + " นาที";
    if (txt == "หมดเวลางาน" || txt == "อรุณสวัสดิ์") {
      document.getElementById("coutDownClock").innerText = "";
    } else {
      document.getElementById("coutDownClock").innerText = coutDownClock;
    }

    if (hh >= 22) {
      document.getElementById("periodText").innerText = "ราตรีสวัสดิ์";
    }
  }

  //background color for a getDay
  const dayColor = ["Crimson", "Gold", "Pink", "Green", "DarkOrange", "DeepSkyBlue", "BlueViolet"];
  let color = dayColor[day];
  document.body.style.backgroundColor = color;

  //show now subject and previous
  let period = (Math.floor((hm - 470) / 50));
  //for test
  // let period = 2;

    // if th period less then 7 show the current subject on the current period
    if (day === 1) {
      var subjects = ["-", "-", "-", "พักเที่ยง", "ขลุ่ย 1 {2/4}", "-", "ทัศนศิลป์ 1 {1/3}"]
    } else if (day === 2) {
      var subjects = ["-", "ขลุ่ย 1 {2/2}", "ขลุ่ย 1 {2/3}", "พักเที่ยง", "-","-", "ทัศนศิลป์ 3 {2/8}"]
    } else if (day === 3) {
      var subjects = ["-", "ทัศนศิลป์ 1 {1/2}", "ทัศนศิลป์ 1 {1/1}", "พักเที่ยง", "ขลุ่ย 1 2/5", "IS1", "IS1"]
    } else if (day === 4) {
      var subjects = ["-", "ทัศนศิลป์ 1 {1/5}", "-", "พักเที่ยง", "-", "ทัศนศิลป์ 1 {1/4}", "ทัศนศิลป์ 3 {2/10}","ชุมนุม"]
    } else if (day === 5) {
      var subjects = ["ทัศนศิลป์ 1 {1/7}", "ทัศนศิลป์ 1 {1/9}", "-", "พักเที่ยง", "ทัศนศิลป์ 3 {2/9}", "-", "ทัศนศิลป์ 1 {1/6}"]
    } else {
      document.getElementById("subjectName").innerText = "";
    }
    document.getElementById("subjectName").innerText = subjects[period - 1];
    document.getElementById("nextSubjectName").innerText = "คาบต่อไป " + subjects[period];

    // if the period more than 7 show nothing
    if (period - 1 > 7) {
      document.getElementById("subjectName").innerText = "";
      document.getElementById("nextSubjectName").innerText = "";

    }

let t = setTimeout(function() {
  currentTime()
}, 1000);
}

currentTime();
