//I'm still learning :)
//main funtion
function currentTime() {
  //ตั้งตัวแปร ชั่วโมง นาที วินาที
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  //แปลงชั่วโมงเป็นนาที
  let hm = (hh * 60) + mm;
  console.log(hm);

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

  // เปลี่ยนสีตามวัน day มาจาก getDay
  // const dayColor = ["Crimson", "Gold", "DeepPink", "Green", "DarkOrange", "DeepSkyBlue", "BlueViolet"];
  // let color = dayColor[day];
  // document.body.style.backgroundColor = color;

  // ตั้งตัวแปร period สำหรับคาบ คาบละ 50 นาที (ทำซ้ำอีก?)
  let period = Math.floor((hm - 470) / 50);

  // แสดงข้อความชือวิชาตามวันตามคาบ
  if (day === 1) {
    var subjects = ["ขลุ่ย 2 (2/3)", "เตรียมสอน", "กลองยาว (4/6)", "พักเที่ยง", "เตรียมสอน", "ขลุ่ย 2 (2/4)", "ปฏิบัติดนตรีไทย (1/8)", "โฮมรูม (4/4)"]
  } else if (day === 2) {
    var subjects = ["ดนตรี 2 (2/10)", "เตรียมสอน", "เตรียมสอน", "พักเที่ยง", "ขลุ่ย 2 (2/5)", "ขลุ่ย 2 (2/2)", "ดนตรี 2 (2/7)", "โฮมรูม (4/4)"]
  } else if (day === 3) {
    var subjects = ["ดนตรี 2 (2/8)", "เตรียมสอน", "ดนตรี 2 (2/9)", "พักเที่ยง", "ดนตรี 2 (2/6)", "เตรียมสอน", "เตรียมสอน", "ลูกเสือ (2/1)"]
  } else if (day === 4) {
    var subjects = ["เตรียมสอน", "ดนตรี 2 (2/2)", "ดนตรี 2 (2/3)", "พักเที่ยง", "ดนตรี 2 (2/4)", "เตรียมสอน", "เตรียมสอน", "ชุมนุม"]
  } else if (day === 5) {
    var subjects = ["เตรียมสอน", "เตรียมสอน", "ปฏิบัติดนตรีไทย (1/8)", "พักเที่ยง", "เตรียมสอน", "ดนตรี 2 (2/5)", "ดนตรี 2 (2/1)", "อบรมคุณธรรม"]
  } else {
    document.getElementById("subjectName").innerText = "";
  }
  document.getElementById("subjectName").innerText = subjects[period - 1];
  // แสดงข้อความชื่อวิชาคาบต่อไป
  document.getElementById("nextSubjectName").innerText = "คาบต่อไป " + subjects[period];

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

//Calendar
//https://codepen.io/xmark/pen/WQaXdv
var Cal = function(divId) {

  //Store div id
  this.divId = divId;

  // Days of week, starting on Sunday
  this.DaysOfWeek = [
    'อา',
    'จ',
    'อ',
    'พ',
    'พฤ',
    'ศ',
    'ส'
  ];

  // Months, stating on January
  this.Months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

  // Set the current month, year
  var d = new Date();

  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();

};

// Goes to next month
Cal.prototype.nextMonth = function() {
  if (this.currMonth == 11) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  } else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();
};

// Goes to previous month
Cal.prototype.previousMonth = function() {
  if (this.currMonth == 0) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  } else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();
};

// Show current month
Cal.prototype.showcurr = function() {
  this.showMonth(this.currYear, this.currMonth);
};

// Show month (year, month)
Cal.prototype.showMonth = function(y, m) {

  var d = new Date()
    // First day of the week in the selected month
    ,
    firstDayOfMonth = new Date(y, m, 1).getDay()
    // Last day of the selected month
    ,
    lastDateOfMonth = new Date(y, m + 1, 0).getDate()
    // Last day of the previous month
    ,
    lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();


  var html = '<table>';

  // Write selected month and year
  html += '<thead><tr>';
  html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
  html += '</tr></thead>';


  // Write the header of the days of the week
  html += '<tr class="days">';
  for (var i = 0; i < this.DaysOfWeek.length; i++) {
    html += '<td>' + this.DaysOfWeek[i] + '</td>';
  }
  html += '</tr>';

  // Write the days
  var i = 1;
  do {

    var dow = new Date(y, m, i).getDay();

    // If Sunday, start new row
    if (dow == 0) {
      html += '<tr>';
    }
    // If not Sunday but first day of the month
    // it will write the last days from the previous month
    else if (i == 1) {
      html += '<tr>';
      var k = lastDayOfLastMonth - firstDayOfMonth + 1;
      for (var j = 0; j < firstDayOfMonth; j++) {
        html += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }

    // Write the current day in the loop
    var chk = new Date();
    var chkY = chk.getFullYear();
    var chkM = chk.getMonth();
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
      html += '<td class="today">' + i + '</td>';
    } else {
      html += '<td class="normal">' + i + '</td>';
    }
    // If Saturday, closes the row
    if (dow == 6) {
      html += '</tr>';
    }
    // If not Saturday, but last day of the selected month
    // it will write the next few days from the next month
    else if (i == lastDateOfMonth) {
      var k = 1;
      for (dow; dow < 6; dow++) {
        html += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }

    i++;
  } while (i <= lastDateOfMonth);

  // Closes table
  html += '</table>';

  // Write HTML to the div
  document.getElementById(this.divId).innerHTML = html;
};

// On Load of the window
window.onload = function() {

  // Start calendar
  var c = new Cal("divCal");
  c.showcurr();

  // Bind next and previous button clicks
  getId('btnNext').onclick = function() {
    c.nextMonth();
  };
  getId('btnPrev').onclick = function() {
    c.previousMonth();
  };
}

// Get element by id
function getId(id) {
  return document.getElementById(id);
}
