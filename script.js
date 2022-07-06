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
    document.getElementById("msg").innerText = "วันนี้วันหยุด";
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
    document.getElementById("msg").innerText = txt;

    // countdown
    let cd = 50 - ((hm - 470) % 50);
    cd = "เหลือเวลา " + cd + " นาที";
    if (txt == "หมดเวลางาน" || txt == "อรุณสวัสดิ์") {
      document.getElementById("cd").innerText = "";
    } else {
      document.getElementById("cd").innerText = cd;
    }

    if (hh >= 22) {
      document.getElementById("msg").innerText = "ราตรีสวัสดิ์";
    }
  }

  //background color for a getDay
  const dayColor = ["Crimson","Gold","Pink","Green","DarkOrange","DeepSkyBlue","BlueViolet"];
  let color  = dayColor[day];
  document.body.style.backgroundColor = color;

  let t = setTimeout(function() {
    currentTime()
  }, 1000);
}

currentTime();
