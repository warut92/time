//แสดงวันที่หน้าเว็บ
const fullDate = new Date();
const options = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
};
let fullYear = fullDate.getFullYear() + 543
document.getElementById("date").innerHTML = fullDate.toLocaleDateString('th-TH', options) + " พ.ศ. " + fullYear

function runProgram() {
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

  //เวลาปัจจุบัน รันทุกวินาที
  let time = hh + ":" + mm + ":" + ss;
  document.getElementById("clock").innerText = time;

  //ตั้งตัวแปร วัน
  let day = date.getDay();

  //ตั้งตัวแปร timePeriod สำหรับคาบละ 55 นาที
  let timePeriod = 55
  let timePeriod_8 = 0

  // หาลำดับของคาบ 
  // 470 คือ 470 นาที เริ่มนับตั้งแต่เที่ยงคืนถึง 7:50 = คาบที่ 0
  // console.log(day);
  let startingTime = 7 * 60 + 35
    
    let period = Math.floor((hm - startingTime) / timePeriod);
    let periodTxt = ""
    //แสดงข้อความในคาบต่าง ๆ ตามเงื่อนไข
    //หากเป็นวันหยุด
    if (day == 0 || day == 6) {
      periodTxt = "วันนี้วันหยุด"
    } else if (period < 1) {
      periodTxt = "อรุณสวัสดิ์";
    } else if (period > 10) {
      periodTxt = "หมดเวลางาน";
    } else if (period > 8) {
      periodTxt = "เวลาซ้อม";
    } else {
      periodTxt = "คาบ " + period;
    }
    document.getElementById("periodText").innerText = periodTxt;

    // ตัวนับถอยหลัง
    // แล้วตั้งลบด้วย timePeriod เพื่อต้องการหาเศษ
    var coutDownClock = timePeriod - ((hm - startingTime) % 25);
    // console.log('COUTDOWNCLOCK', coutDownClock)
    //ตั้งค่าตัวแปร เวลาสำหรับคาบที่ 8 = 25 นาที
    if (period === 8) {
      timePeriod_8 = 25
    }
    if (period > 8) {
      timePeriod_8 = 120
    }
    let coutDownClockTxt = "เหลือเวลา " + (coutDownClock - timePeriod_8) + " นาที";
    if (period == "หมดเวลางาน" || period == "อรุณสวัสดิ์") {
      document.getElementById("coutDownClock").innerText = "";
    } else {
      document.getElementById("coutDownClock").innerText = coutDownClockTxt;
    }
    if (hh >= 22) {
      document.getElementById("periodText").innerText = "ราตรีสวัสดิ์";
    }

    //หากเกินคาบ 8 ในซ่อนการจับเวลาถอยหลัง
    if (period > 8) {
      document.getElementById("coutDownClock").style.display = "none";
    }

  //progress bar
      var elem = document.getElementById("myBar");
      //เวลาที่เหลือ = เวลาในคาบ - เวลาที่เหลือ (เป็นเวลานับถอยหลัง)
      let timePassed = timePeriod - coutDownClock
      //คิดเป็นร้อยละ
      let restTimeInPercent = (100 * timePassed) / 55
      elem.style.width = restTimeInPercent + "%";

  // เปลี่ยนสีตามวัน day มาจาก getDay
  // const dayColor = ["Crimson", "Orange", "DeepPink", "Green", "DarkOrange", "DeepSkyBlue", "BlueViolet"];
  // let color = dayColor[day];
  // document.body.style.backgroundColor = color;
 
  // all_subjects ตัวแปรจาก mySubjects.js
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
  document.getElementById("nextSubjectName").innerText = subjects[period] === undefined ? "" : "คาบต่อไป " + subjects[period];

  // ถ้า period มากว่า 7 หรือน้อยกว่า 0 แสดงความว่างเปล่า
  if (period - 1 > 7 || period - 1 < 0) {
    document.getElementById("subjectName").innerText = "";
    document.getElementById("nextSubjectName").innerText = "";
  }

  //เรียกฟังก์ชัน runProgram() ทุก 1 วินาที (มีผลต่อการแสดง เวลาปัจจุบัน)
  setTimeout(() => {
    runProgram()
  }, 1000);
}

//เรียกฟังก์ชัน runProgram() ตอนเปิดเว็บ
runProgram();

//สร้างตารางจาก all_subjects
//แปลงข้อมูลเป็น Array ด้วยการแยก บรรทัด
let newLineArr = all_subjects.split(/\n/g);
//หาความยาวของ Array
let newLineArrLen = newLineArr.length;
//สร้างตัวแปร
let HTMLTableOutput = "";
//Array dayname in a week
const d_name = ["จ. " , "อ. ", "พ. ", "พฤ.", "ศ. ", ""]

// looping for create new line on display
  for (let i = 0; i < newLineArrLen; i++) {
    HTMLTableOutput += "<tr><td>" + d_name[i] + "</td>\n<td>" + newLineArr[i] + "</td></tr>" + "\n";
  }
  //replace comma with table tag form
  HTMLTableOutput = HTMLTableOutput.replace(/,/g, "</td>\n<td>");

  if (HTMLTableOutput !== "<tr><td></td></tr>\n") {
    document.getElementById("output_table").innerHTML =
      "<table style=&#34width:100%&#34>\n" + HTMLTableOutput + "</table>";
  } else {
    alert("empty data!");
  }