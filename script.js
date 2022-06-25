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

  const d = new Date();
  let day = d.getDay();
  // day = 1
  if (day === 0 || day === 6) {
    document.getElementById("msg").innerText = "พักผ่อนบ้างนะครับ";
  } else {
    //period
    let txt = Math.floor((hm - 470) / 50);
    // let txt = 1;
    if (txt < 1) {
      txt = "อรุณสวัสดิ์";
    } else if (txt > 8) {
      // console.log(txt);
      txt = "พักผ่อนบ้างนะครับ";
    } else {
      txt = "คาบ " + txt;
    }
    document.getElementById("msg").innerText = txt;

    // countdown
    let cd = 50 - ((hm - 470) % 50);
    cd = cd + " นาที";
    if (txt == "พักผ่อนบ้างนะครับ" || txt == "อรุณสวัสดิ์") {
      document.getElementById("cd").innerText = "";
    } else {
      document.getElementById("cd").innerText = cd;
    }
  }

  document.getElementById("clock").innerText = time;

  let t = setTimeout(function() {
    currentTime()
  }, 1000);
}

currentTime();
