//Default Values
window.onload = function() {
  const date = new Date();
  const dt = createDate(date);
  var startDate = document.getElementById("startDate");
  var endDate = document.getElementById("endDate");
  startDate.value = dt;
  endDate.value = dt;
  endDate.min = startDate.value;

  startDate.onchange = function() {
    endDate.min = startDate.value;
  };

  console.assert((endDate.value >= startDate.value), `end date: ${endDate.value}, start date: ${startDate.value}`);
}

//Date Creator
function createDate (date) {
  let dt = `${date.getFullYear()}-`;
  dt = dt.concat(("0" + (date.getMonth() + 1)).slice(-2) + "-");
  dt = dt.concat(("0" + date.getDate()).slice(-2));
  return dt;
}

//Format Date and Time for .ics files
function createDTSTAMP (date) {
  let dt = `${date.getFullYear()}`;
  dt = dt.concat(("0" + (date.getMonth() + 1)).slice(-2));
  dt = dt.concat(("0" + date.getDate()).slice(-2));
  dt = dt.concat("T");
  dt = dt.concat(("0" + date.getHours()).slice(-2));
  dt = dt.concat(("0" + date.getMinutes()).slice(-2));
  dt = dt.concat("00");
  return dt;
}

//Create Date and Time String for .ics files
function createDT (date, time) {
  let dt = `${date.substring(0, 4)}`;
  dt = dt.concat(date.substring(5, 7));
  dt = dt.concat(date.substring(8, 10));
  dt = dt.concat("T");
  dt = dt.concat(time.substring(0, 2));
  dt = dt.concat(time.substring(3, 5));
  dt = dt.concat("00");
  return dt;
}

//tzid creation using gettimezoneoffset
function createTZid (time){
  let tzos= time.getTimezoneOffset();
  switch (tzos){
    case 720:
      timezone = 'Pacific/Kiritimati';
      break;
    case 660:
      timezone = 'Etc/GMT+11';
      break;
    case 600:
      timezone = 'Pacific/Honolulu';
      break;
    case 570:
      timezone = 'Pacific/Marquesas';
      break;
    case 540:
      timezone = 'America/Alaska';
      break;
    case 480:
      timezone = 'America/Los_Angeles';
      break;
    case 420:
      timezone = 'America/Phoenix';
      break;
    case 360:
      timezone = 'America/Guatemala';
      break;
    case 300:
      timezone = 'America/Cancun';
      break;
    case 240:
      timezone = 'America/Halifax';
      break;
    case 210:
      timezone = 'America/St_Johns';
      break;
    case 180:
      timezone = 'America/Araguaina';
      break;
    case 120:
      timezone = 'Etc/GMT+2';
      break;
    case 60:
      timezone = 'Atlantic/Azores';
      break;
    case 0:
      timezone = 'Africa/Abidjan';
      break;
    case -60:
      timezone = 'Europe/Berlin';
      break;
    case -120:
      timezone = 'Asia/Amman';
      break;
    case -180:
      timezone = 'Europe/Istanbul';
      break;
    case -210:
      timezone = 'Asia/Tehran';
      break;
    case -240:
      timezone = 'Asia/Dubai';
      break;
    case -270:
      timezone = 'Asia/Kabul';
      break;
    case -300:
      timezone = 'Asia/Tashkent';
      break;
    case -330:
      timezone = 'Asia/Colombo';
      break;
    case -345:
      timezone = 'Asia/Katmandu';
      break;
    case -360:
      timezone = 'Asia/Almaty';
      break;
    case -390:
      timezone = 'Asia/Rangoon';
      break;
    case -420:
      timezone = 'Asia/Bangkok';
      break;
    case -480:
      timezone = 'Asia/Shanghai';
      break;
    case -510:
      timezone ='Asia/Pyongyang';
      break;
    case -540:
      timezone = 'Asia/Tokyo';
      break;
    case -570:
      timezone ='Australia/Adelaide';
      break;
    case -600:
      timezone = 'Australia/Brisbane';
      break;
    case -630:
      timezone = 'Australia/Lord_Howe';
      break;
    case -660:
      timezone = 'Pacific/Bougainville';
      break;
    case -720:
      timezone = 'Asia/Kamchatka';
      break;
    case -765:
      timezone = 'Pacific/Chatham';
      break;
    case -780:
      timezone = 'Etc/GMT-13';
      break;
    case -840:
      timezone = 'Pacific/Kiritimati';
      break;
    default:
      timezone = 'Unknown';
      break;
  }
  return timezone;
}





//Vevent Creation
function createVevent() {
  const date = new Date();
  const dtStamp = createDTSTAMP(date);

  let event = `DTSTAMP:${dtStamp}\r\n`;
  event = event.concat(`UID:${dtStamp}-${document.getElementById('start-time').value.substring(3, 5)}@example.com\r\n`);
  event = event.concat(`LOCATION:${document.getElementById('location').value}\r\n`);
  event = event.concat(`CLASS:${document.getElementById('classification').value}\r\n`);
  event = event.concat(`SUMMARY:${document.getElementById('title').value}\r\n`);
  event = event.concat(`TZID:${createTZid(date)}\r\n`);
  event = event.concat(`DTSTART:${createDT(document.getElementById('startDate').value, document.getElementById('start-time').value)}\r\n`);
  if (document.getElementById('repeat').value != 'NONE') {
    event = event.concat(`RRULE:FREQ=${document.getElementById('repeat').value}`);
    if(document.getElementById('numRepeats').value) {
      event = event.concat(`;COUNT=${document.getElementById('numRepeats').value}`);
    }
    event = event.concat(`\r\n`);
  }
  event = event.concat(`DTEND:${createDT(document.getElementById('endDate').value, document.getElementById('end-time').value)}\r\n`);
  event = event.concat(`PRIORITY:${document.getElementById('priority').value}\r\n`);

  return `BEGIN:VEVENT\r\n${event}END:VEVENT\r\n`;
}

//.ics file creator
function createFile() {
  const data = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nCALSCALE:GREGORIAN\r\n${createVevent()}END:VCALENDAR`;
  const file = new Blob([data], { type: 'text/plain;charset=utf-8' });
  saveAs(file, `${document.getElementById('title').value}.ics`);
}

//Validation
function submitForm() {
  //Title Validation
  const title = document.getElementById("title").value;
  if(!title) {
    alert("The title field is empty");
    console.assert(false, 'No title');
    return;
  }
  if (document.getElementById('repeat').value != 'NONE') {
    if ((isNaN(document.getElementById('numRepeats').value) || document.getElementById('numRepeats').value < 0) && document.getElementById('numRepeats').value) {
      alert("Invalid number of recurrences");
      console.assert(isNaN(document.getElementById('numRepeats').value), 'Invalid recurrence');
      return;
    }
  }
  console.log(document.getElementById('numRepeats').value);
  //Date and Time Validation
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;


 var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;


  // check that the inputted date is a valid calendar date
  const startDate = new Date(start);
  const endDate = new Date(end);



  if (!(startDate instanceof Date && !isNaN(startDate))) {
    alert("Invalid Entry. Please check the start date.");
    console.assert(false, 'The start date is invalid.');
    return;
  }
  if (!(endDate instanceof Date && !isNaN(endDate))) {
    alert("Invalid Entry. Please check the end date.");
    console.assert(false, 'The end date is invalid.');
    return;
  }

var todays = new Date();
var currentTime = todays.getHours() + ":" + todays.getMinutes();
const startingTime = document.getElementById("start-time").value;
const endingTime = document.getElementById("end-time").value;


  //Ensure the start date cannot be earlier than the current date
  if (start < today) {
  	alert("Invalid Entry. The start date must not be prior to the current date.");
  	console.assert(false, 'The start date is invalid.');
  	return;
  }

  if (start == today && startingTime < currentTime) {
  	alert("Invalid Entry. The start time must not be prior to the current time today.");
  	console.assert(false, 'The start time is invalid.');
  	return;
  }

  if (start == today && startingTime == endingTime) {
  	alert("Invalid Entry. The start time and end time cannot be the same.");
  	console.assert(false, 'The start time or end time is invalid.');
  	return;
  }


  if( end > start ) {
    createFile();
    return;
  }
  else if( end == start ) {
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    if( endTime >= startTime ) {
      createFile();
      return;
    }
    else {
      alert("Invalid Entry. End Time is before Start Time");
      console.assert((end == start) && (endTime < startTime), 'Invalid alert');
      return;
    }
  }
  else {
    alert("Invalid Entry. End Date is before Start Date");
    console.assert(end < start, 'Invalid Time/Date');
    return;
  }
  const testPriority = document.getElementById('priority').value;
  console.assert(testPriority >= 0 && testPriority <= 9, `Invalid priority, ${testPriority}`)
}
