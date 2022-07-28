//I'm still learning :)
//main funtion
function currentTime() {
  //get hours minutes seconds
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  //total hours
  let hm = (hh * 60) + mm;

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
    // 470 is the
    let period = Math.floor((hm - 470) / 50);
    console.log('PERIOD', period)
    if (d == 0 || d == 6) {
      period = "วันนี้วันหยุด"
    } else if (period < 1) {
      period = "อรุณสวัสดิ์";
    } else if (period > 10) {
      period = "หมดเวลางาน";
    } else if (period > 8) {
      period = "เวลาซ้อม";
    } else {
      period = "คาบ " + period;
    }
    document.getElementById("periodText").innerText = period;

    // countdown
    var coutDownClock = 50 - ((hm - 470) % 50);
    coutDownClock = "เหลือเวลา " + coutDownClock + " นาที";
    if (period == "หมดเวลางาน" || period == "อรุณสวัสดิ์") {
      document.getElementById("coutDownClock").innerText = "";
    } else {
      document.getElementById("coutDownClock").innerText = coutDownClock;
    }

    if (hh >= 22) {
      document.getElementById("periodText").innerText = "ราตรีสวัสดิ์";
    }
  }

  //background color for a getDay
  const dayColor = ["Crimson", "Gold", "DeepPink", "Green", "DarkOrange", "DeepSkyBlue", "BlueViolet"];
  let color = dayColor[day];
  document.body.style.backgroundColor = color;

  //show now subject and previous
  let period = Math.floor((hm - 470) / 50);
  console.log('PERIOD', period)
  //for test

  // if th period less then 7 show the current subject on the current period
  console.log('DAY', day)
  if (day === 1) {
    var subjects = ["ตรวจงาน เตรียนสอน", "ตรวจงาน เตรียนสอน", "ตรวจงาน เตรียนสอน", "พักเที่ยง", "ขลุ่ย 1 {2/4}", "ตรวจงาน เตรียนสอน", "ทัศนศิลป์ 1 {1/3}", "โฮมรูม"]
    console.log(subjects[period])
  } else if (day === 2) {
    var subjects = ["ตรวจงาน เตรียนสอน", "ขลุ่ย 1 {2/2}", "ขลุ่ย 1 {2/3}", "พักเที่ยง", "ตรวจงาน เตรียนสอน", "ทัศนศิลป์ 3 {2/8}", "ทัศนศิลป์ 1 {1/8}", "โฮมรูม"]
  } else if (day === 3) {
    var subjects = ["ตรวจงาน เตรียนสอน", "ทัศนศิลป์ 1 {1/2}", "ทัศนศิลป์ 1 {1/1}", "พักเที่ยง", "ขลุ่ย 1 2/5", "IS1", "IS1", "ตรวจงาน เตรียนสอน"]
  } else if (day === 4) {
    var subjects = ["ตรวจงาน เตรียนสอน", "ทัศนศิลป์ 1 {1/5}", "ตรวจงาน เตรียนสอน", "พักเที่ยง", "ตรวจงาน เตรียนสอน", "ทัศนศิลป์ 1 {1/4}", "ทัศนศิลป์ 3 {2/10}", "ชุมนุม"]
  } else if (day === 5) {
    var subjects = ["ทัศนศิลป์ 1 {1/7}", "ทัศนศิลป์ 1 {1/9}", "ตรวจงาน เตรียนสอน", "พักเที่ยง", "ทัศนศิลป์ 3 {2/9}", "ตรวจงาน เตรียนสอน", "ทัศนศิลป์ 1 {1/6}", "อบรมคุณธรรม"]
  } else {
    document.getElementById("subjectName").innerText = "";
  }
  document.getElementById("subjectName").innerText = subjects[period - 1];
  document.getElementById("nextSubjectName").innerText = "คาบต่อไป " + subjects[period];

  // if the period more than 7 or less tha 0 show nothing
  if (period - 1 > 7 || period - 1 < 0) {
    document.getElementById("subjectName").innerText = "";
    document.getElementById("nextSubjectName").innerText = "";

  }

  let t = setTimeout(function() {
    currentTime()
  }, 1000);
}

currentTime();
