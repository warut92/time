//พิมพ์ข้อมูลวิชา
let all_subjects = `เตรียมสอน, อังกะลุง 1/5, อังกะลุง 1/6, พักกลางวัน, เตรียมสอน, ดนตรีไทย 1/4, ดนตรีไทย 1/7, โฮมรูม
อังกะลุง 1/5,เตรียมสอน,  ดนตรีไทย 1/3,  พักกลางวัน(เวร), เตรียมสอน, ขลุ่ย 2/5, เตรียมสอน, กิจกรรม 5/4
เตรียมสอน, เตรียมสอน, ขลุ่ย 2/2, พักกลางวัน, ดนตรีไทย 1/1, ดนตรีไทย 1/2, ขลุ่ย 2/3, ลูกเสือ
ขลุ่ย 2/1, ดนตรีไทย 1/6, เตรียมสอน, พักกลางวัน, ดนตรีไทย 1/5, ขลุ่ย 2/4, เตรียมสอน, ชุมนุม
เตรียมสอน, เตรียมสอน, อังกะลุง 1/6, พักกลางวัน, เตรียมสอน,  เตรียมสอน, ดนตรีไทย 1/8, คุณธรรม`

function currentTime() {
  //ตั้งตัวแปร ชั่วโมง นาที วินาที
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  //แปลงชั่วโมงเป็นนาที
  let hm = (hh * 60) + mm;
  // console.log(hm);

  //เติมเลข 0 ให้กับชั่วโมงที่มีค่าน้อยว่า 9
  hh = (hh < 10) ? "0" + hh : hh;
  mm = (mm < 10) ? "0" + mm : mm;
  ss = (ss < 10) ? "0" + ss : ss;

  //เวลาปัจจุบัน
  let time = hh + ":" + mm + ":" + ss;
  document.getElementById("clock").innerText = time;

  //ตั้งตัวแปร วัน
  const d = new Date();
  let day = d.getDay();
  //ถ้าเป็นวันเสาร์ อาทิตย์ ให้แสดงข้อความ "วันนี้วันหยุด"
  // day = 0 //for test
  if (day == 0 || day == 6) {
    document.getElementById("periodText").innerText = "วันนี้วันหยุด";
    //เรียกฟังก์ชัน currentTime() ทุก 1 วินาที (มีผลต่อการแสดง เวลาปัจจุบัน)
    let t = setTimeout(function() {
      currentTime()
    }, 1000);
  } else {

    //ตั้งตัวแปร period สำหรับคาบ คาบละ 50 นาที
    //
    // 470 คือ 470 นาที เริ่มนับตั้งแต่เที่ยงคืนถึง 7:50
    let period = Math.floor((hm - 470) / 50);
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

    // ตัวนับถอยหลัง
    var coutDownClock = 50 - ((hm - 470) % 50);
    // console.log('COUTDOWNCLOCK', coutDownClock)
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
  //progress bar
      var elem = document.getElementById("myBar");
      var width = 50 - ((hm - 470) % 50);
      let widthPercent = (50 - width)*100/50;
      // console.log('WIDTH', (50 - width)*100/50);
      elem.style.width = widthPercent + "%";

  // เปลี่ยนสีตามวัน day มาจาก getDay
  // const dayColor = ["Crimson", "Orange", "DeepPink", "Green", "DarkOrange", "DeepSkyBlue", "BlueViolet"];
  // let color = dayColor[day];
  // document.body.style.backgroundColor = color;

  // ตั้งตัวแปร period สำหรับคาบ คาบละ 50 นาที (ทำซ้ำอีก?)
  let period = Math.floor((hm - 470) / 50);

let all_subjects_arr = all_subjects.split("\n")
  var subjects = ""
  // แสดงข้อความชือวิชาตามวันตามคาบ
  if (day === 1) {
    var subjects = all_subjects_arr[day-1].split(",")
  } else if (day === 2) {
    var subjects = all_subjects_arr[day-1].split(",")
  } else if (day === 3) {
    var subjects = all_subjects_arr[day-1].split(",")
  } else if (day === 4) {
    var subjects = all_subjects_arr[day-1].split(",")
  } else if (day === 5) {
    var subjects = all_subjects_arr[day-1].split(",")
  } else {
    //อันนี้ต้องลบทิ้ง แต่ยังก่อน
    document.getElementById("subjectName").innerText = "";
  }
  document.getElementById("subjectName").innerText = subjects[period - 1] === undefined ? "" : subjects[period - 1];
  // แสดงข้อความชื่อวิชาคาบต่อไป
  document.getElementById("nextSubjectName").innerText = subjects[period - 1] === undefined ? "" : "คาบต่อไป " + subjects[period];

  // ถ้า period มากว่า 7 หรือน้อยกว่า 0 แสดงความว่างเปล่า
  if (period - 1 > 7 || period - 1 < 0) {
    document.getElementById("subjectName").innerText = "";
    document.getElementById("nextSubjectName").innerText = "";
  }

  //เรียกฟังก์ชัน currentTime() ทุก 1 วินาที (มีผลต่อการแสดง เวลาปัจจุบัน)
  setTimeout(() => {
    currentTime()
  }, 1000);
}

//เรียกฟังก์ชัน currentTime() ตอนเปิดเว็บ
currentTime();

//สร้างตารางจาก all_subjects
//แปลงข้อมูลเป็น Array ด้วยการแยก บรรทัด
let newLineArr = all_subjects.split(/\n/g);
//หาความยาวของ Array
let newLineArrLen = newLineArr.length;
//สร้างตัวแปร
let HTMLTableOutput = "";

// looping for create new line on display
  for (let i = 0; i < newLineArrLen; i++) {
    HTMLTableOutput += "<tr><td>" + newLineArr[i] + "</td></tr>" + "\n";
  }
  // console.log('HTMLTABLEOUTPUT', HTMLTableOutput)
  //replace comma with table tag form
  HTMLTableOutput = HTMLTableOutput.replace(/,/g, "</td><td>");

  if (HTMLTableOutput !== "<tr><td></td></tr>\n") {
    document.getElementById("output_table").innerHTML =
      "<table style=&#34width:100%&#34>\n" + HTMLTableOutput + "</table>";
  } else {
    alert("empty data!");
  }
