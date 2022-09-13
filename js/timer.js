const preloader = document.querySelector(".lds-roller");
const timerEl = document.querySelector(".timer");

setTimeout(() => {
  preloader.remove();
  timerEl.classList.remove("hide");
}, 2000);

function timer() {
  const targetDate = new Date(2022, 11, 12);
  let currentDate = new Date();
  const gap = targetDate - currentDate;

  let days = Math.floor(gap / 1000 / 60 / 60 / 24);
  let hours = Math.floor(gap / 1000 / 60 / 60) % 24;
  let min = Math.floor(gap / 1000 / 60) % 60;
  let sec = Math.floor(gap / 1000) % 60;

  if (gap < 0) {
    days = days + 7;
    hours = hours + 24;
    min = min + 60;
    sec = sec + 60;
  }

  let d_span = document.getElementById("d");
  let h_span = document.getElementById("h");
  let m_span = document.getElementById("m");
  let s_span = document.getElementById("s");

  d_span.innerText = days < 10 ? "0" + days : days;
  h_span.innerText = hours < 10 ? "0" + hours : hours;
  m_span.innerText = min < 10 ? "0" + min : min;
  s_span.innerText = sec < 10 ? "0" + sec : sec;
}

setInterval(timer, 1000);
