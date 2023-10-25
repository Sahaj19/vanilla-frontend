const hour_hand = document.querySelector("#hour");
const minute_hand = document.querySelector("#minute");
const second_hand = document.querySelector("#second");

// +++++++++++++++++++++++(clock logic)+++++++++++++++++++++++++++++
//hour hand logic
// 12hrs = 360deg
// 1hr = 30deg + (m/2)deg

// also
// 60min = 30deg
// 1min = 1/2 deg  (this will gradually impact our hour hand)
// m min = (m/2)deg

//also
// 3600sec = 30deg
// 1sec = 30/3600 ~ we can neglect it

//minute hand logic
// 60mins = 360deg
// 1min = 6deg
//m min = 6m deg

//second hand logic
// 60secs = 360deg
// 1sec = 6deg
//s sec = 6s deg

function displayTime() {
  let currentDate = new Date();

  //current hour , min , sec
  let currentHour = currentDate.getHours();
  let currentMinute = currentDate.getMinutes();
  let currentSecond = currentDate.getSeconds();

  //calculating our rotation
  let hour_rotation = currentHour * 30 + currentMinute / 2;
  let minute_rotation = currentMinute * 6;
  let second_rotation = currentSecond * 6;

  //actual clock working
  hour_hand.style.transform = `rotate(${hour_rotation}deg)`;
  minute_hand.style.transform = `rotate(${minute_rotation}deg)`;
  second_hand.style.transform = `rotate(${second_rotation}deg)`;
}

setInterval(displayTime, 1000);
