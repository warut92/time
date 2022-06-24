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

   // countdown
   // let cd = (hm - 470) % 50;
   let cd = 50 - ((hm - 470) % 50);
   console.log(cd);


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
  document.getElementById("msg").innerText = "คาบ " + txt;
  document.getElementById("cd").innerText = cd + " นาที";

  let t = setTimeout(function(){ currentTime() }, 1000);
}

currentTime();
