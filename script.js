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

   //audio
   let sound = new Audio()
   //if else
   let txt = "";

   if (hm == 520) {
     txt = "คาบ 1"

   } else if (hm == 570) {
     txt = "คาบ 2"

   } else if (hm == 620) {
     txt = "คาบ 3"

   } else if (hm == 670) {
     txt = "คาบ 4 \nทานข้าวนะครับ"

   } else if (hm == 720) {
     txt = "คาบ 5"

   } else if (hm == 770) {
     txt = "คาบ 6"

   } else if (hm == 820) {
     txt = "คาบ 7"

   } else if (hm == 870) {
     txt = "คาบ 8"

   } else {
     txt = "พักบ้างนะครับ"
   }
   // countdown
   // let cd = (hm - 470) % 50;
   let cd = (hm - 470) % 50;
   console.log(cd);

  document.getElementById("clock").innerText = time;
  let t = setTimeout(function(){ currentTime() }, 1000);

  document.getElementById("msg").innerText = txt;
  document.getElementById("cd").innerText = 50 - cd + " นาที";

}

currentTime();
