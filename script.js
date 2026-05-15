//แสดงวันที่หน้าเว็บ
const fullDate = new Date();
const options = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
};
let FULLYEAR = fullDate.getFullYear() + 543
document.getElementById("date").innerHTML = fullDate.toLocaleDateString('th-TH', options) + " พ.ศ. " + FULLYEAR

function runProgram() {
  //ตั้งตัวแปร ชั่วโมง นาที วินาที
  let date = new Date();
  let HOURS = date.getHours();
  let MINUTES = date.getMinutes();
  let SECONDS = date.getSeconds();

  //for test
  // HOURS = 15;
  // MINUTES = 20;

  //แปลงชั่วโมงเป็นนาที
  let HOURS_MINUTES = (HOURS * 60) + MINUTES;
  // console.log(HOURS_MINUTES);

  //เติมเลข 0 ให้กับชั่วโมงที่มีค่าน้อยว่า 9
  HOURS = (HOURS < 10) ? "0" + HOURS : HOURS;
  MINUTES = (MINUTES < 10) ? "0" + MINUTES : MINUTES;
  SECONDS = (SECONDS < 10) ? "0" + SECONDS : SECONDS;

  //เวลาปัจจุบัน รันทุกวินาที
  let CURRENT_TIME = HOURS + ":" + MINUTES + ":" + SECONDS;
  document.getElementById("clock").innerText = CURRENT_TIME;

  //ตั้งตัวแปร วัน
  let DAY = date.getDay();
  // console.log("วัน",DAY);
  //สำหรับตั้งวันเฉพาะ
  // DAY = 5
  //ตั้งตัวแปร TIME_PERIOD สำหรับคาบละ 55 นาที
  // let TIME_PERIOD = 55;
  let TIME_PERIOD = 50;

  // หาลำดับของคาบ 
  // เริ่มนับตั้งแต่เที่ยงคืนถึงคาบที่ 0
  // โดยให้คาบแรก (คาบ 0) เริ่มที่ 7:40 (ซึ่งไม่ตรงกับในความเป็นจริงแต่ใช้ไปก่อน เพราะยังไม่ต้องการแสดงข้อความเฉพาะในช่วงเวลาคาบที่ 0)
  let STARTING_HOUR = 7;
  let STARTING_MINUTE = 40;
  let STARTING_TIME = (STARTING_HOUR * 60) + STARTING_MINUTE;
  //คำนวณหาคาบ
  let period = 0
  period = Math.floor((HOURS_MINUTES - STARTING_TIME) / TIME_PERIOD);
 
  let periodMessage = ""
  //แสดงข้อความในคาบต่าง ๆ ตามเงื่อนไข
  if (period < 1) {
    periodMessage = "อรุณสวัสดิ์";
  } else {
    periodMessage = "คาบ " + period;
  }
  document.getElementById("periodText").innerText = periodMessage;
  // console.log(periodMessage);

  // เมื่อเวลา 15.30 ให้ซ่อนตัวนับถอยหลังและชื่อวิชา
  if (HOURS_MINUTES >= 920) {   // 920 
    document.getElementById("coutDownClock").style.display = "none";
    document.getElementById("subjectName").style.display = "none";
  }

  var coutDownClock = 0;
  if (HOURS_MINUTES >= 1200) {
    document.getElementById("periodText").innerHTML = "🛌💤😴";
  }
  else if (HOURS_MINUTES >= 1080) {
    document.getElementById("periodText").innerHTML = "หมดเวลางาน";
  }
  else if (HOURS_MINUTES >= 1020) {
    document.getElementById("periodText").innerHTML = "หมดเวลาซ้อม<br>นร. กลับบ้าน";
  }
  else if (HOURS_MINUTES >= 920) {   // 920 
    document.getElementById("periodText").innerHTML = "ฝึกซ้อม<br>ดนตรีไทย";
  } else if (period === 8) { // ตั้งค่าตัวแปร เวลาสำหรับคาบที่ 8 โดยเฉพาะ, = 25 นาที
    // นับถอยหลัง 25 นาที จาก เวลาที่จบคาบ 8 ลบด้วยเวลาปัจจุบัน 
    // นับถอยหลังถึง 15.20
    coutDownClock = (15 * 60 + 20) - HOURS_MINUTES;
    // console.log("คาบ 8");
  }  else if (period < 8) {
  // ตัวนับถอยหลัง
  // แล้วตั้งลบด้วย TIME_PERIOD เพื่อต้องการหาเศษ
    coutDownClock = TIME_PERIOD - ((HOURS_MINUTES - STARTING_TIME) % TIME_PERIOD);
  }
  // console.log("TIME_PERIOD", TIME_PERIOD);
  //ตั้งตัวแปรนับเวลาถอยหลัง คิดจากเวลาที่เหลือในคาบนั้น ๆ
  //ตั้งตัวแปรเวลาถอยหลังกับข้อความ
  let coutDownClockText 
  if (periodMessage === "หมดเวลางาน") {
    coutDownClockText = ""
  } else {
    coutDownClockText = "เหลือเวลา " + coutDownClock + " นาที";
  }
  if (HOURS) {
    document.getElementById("coutDownClock").innerText = coutDownClockText;
    //หากเป็นเวลา 22.00 ให้ขึ้นข้อความ "ราตรีสวัสดิ์"
  } else if (HOURS >= 22) {
    document.getElementById("periodText").innerText = "ราตรีสวัสดิ์";
  }

  //หากเกินคาบ 8 ในซ่อนตัวนับเวลาถอยหลัง
  if (period > 8) {
    
  }
  //หากเป็นวันเสาร์-อาทิตย์ให้ซ่อนตัวนับถอยหลัง
  if (DAY === 6 || DAY === 0) {
    document.getElementById("coutDownClock").style.display = "none";
    document.getElementById("periodText").innerHTML = "วันนี้วันหยุด";
  }

  //progress bar
  var elem = document.getElementById("myBar");
  //เวลาที่เหลือ = เวลาในคาบ - เวลาที่เหลือ (เป็นเวลานับถอยหลัง)
  let TIME_PASSED = TIME_PERIOD - coutDownClock
  //คิดเป็นร้อยละ
  let restTimeInPercent = (100 * TIME_PASSED) / 55
  elem.style.width = restTimeInPercent + "%";

  // เปลี่ยนสีตามวัน DAY มาจาก getDay
  // const dayColor = ["Crimson", "Orange", "Pink", "Green", "DarkOrange", "DeepSkyBlue", "BlueViolet"];
  // let color = dayColor[DAY];
  // document.body.style.backgroundColor = color;

  // all_subjects ตัวแปรจาก mySubjects.js
  let all_subjects_arr = all_subjects.split("\n")
  var subjects = ""
  // แสดงข้อความชือวิชาตามวันตามคาบ
  // โดยการเลือกดัชนีของอาร์เรย์ all_subjects_arr
  if (DAY === 1) {
    var subjects = all_subjects_arr[DAY].split(",")
  } else if (DAY === 2) {
    var subjects = all_subjects_arr[DAY].split(",")
  } else if (DAY === 3) {
    var subjects = all_subjects_arr[DAY].split(",")
  } else if (DAY === 4) {
    var subjects = all_subjects_arr[DAY].split(",")
  } else if (DAY === 5) {
    var subjects = all_subjects_arr[DAY].split(",")
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

  //hilight cell
  let id_table = DAY + "" + period
    highlightCell(id_table)

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
const day_name = ["⏲️ ", "จ. ", "อ. ", "พ. ", "พฤ.", "ศ. ", ""]

// looping for create new line on display
for (let i = 0; i < newLineArrLen; i++) {
  HTMLTableOutput += "<tr><td>" + day_name[i] + "</td>\n<td>" + newLineArr[i] + "</td></tr>" + "\n";
}
//replace comma with table tag form
HTMLTableOutput = HTMLTableOutput.replace(/,/g, "</td>\n<td>");

if (HTMLTableOutput !== "<tr><td></td></tr>\n") {
  document.getElementById("output_table").innerHTML = 
    "<table style=&#34width:100%&#34>\n" + HTMLTableOutput + "</table>";
} else {
  alert("empty data!");
}
// random background color
function changeBackground() {
  const hexClr = () =>
    "#" +
    Math.floor(Math.random() * 0xfffff)
      .toString(16)
      .padEnd(6, "8");


  let backgroundColor = hexClr();
  document.body.style.background = backgroundColor;
  // console.log(backgroundColor);
}
changeBackground()

// setInterval(changeBackground, 60000);
// document.body.style.background = "#1c1b22"
// document.body.style.color = "#1d2a35"

  //add id for table
  const table = document.getElementById("output_table");
  const rows = table.getElementsByTagName("tbody")[0].rows;

    for (let r = 1; r < rows.length; r++) { // start from 1 to skip first tbody row
  const cells = rows[r].cells;
    for (let c = 0; c < cells.length; c++) {
        cells[c].id = `${r}${c}`; // +1 since row index starts at 0
      }
    }

    function highlightCell(id) {
      const cell = document.getElementById(id);
      const beforeCell = document.getElementById(id-1);
      if (!cell) {
        return;
      }
      
      let toggle = true;
      setInterval(() => {
        cell.style.backgroundColor = toggle ? "red" : "";
        toggle = !toggle;
        beforeCell.style.backgroundColor = ""
      }, 500);
      // cell.style.backgroundColor = ""
    }
