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

   //period
   let txt = Math.floor((hm - 470) / 50);
   // let txt = 7; 
   if (txt < 1) {
     txt = "อรุณสวัสดิ์";
   } else if (txt > 8) {
     txt = "พักบ้างนะ";
   } else {
     txt = "คาบ " + txt;
   }

   // countdown
   let cd = 50 - ((hm - 470) % 50);
   cd = cd + " นาที";

   // if (cd === 12) {
   //   playBeep();
   // }
   //
   // //audio
   // function playBeep() {
   //   let beep = new Audio('./beep.mp3');
   //   beep.play();
   // }

  document.getElementById("clock").innerText = time;
  document.getElementById("msg").innerText =  txt;
  document.getElementById("cd").innerText = cd;

  let t = setTimeout(function(){ currentTime() }, 1000);
}

currentTime();
