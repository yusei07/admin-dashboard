// feather icon
feather.replace();

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
}


// menu toggle
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#open-btn");
const closeBtn = document.querySelector("#close-btn");

menuBtn.addEventListener('click', () => {
  // hide menu
  menuBtn.classList.add('hidden');
  // display close
  closeBtn.classList.remove('hidden');
  sideMenu.classList.remove('hidden');
  disableScroll();
})

closeBtn.addEventListener('click', () => {
  menuBtn.classList.remove('hidden');
  closeBtn.classList.add('hidden');
  sideMenu.classList.add('hidden');
  enableScroll();
})


// calendar
const currentDate = document.querySelector("#current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
  let firstDateOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // get first day of the month
  let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // get last date of the month
  let lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay(); // get last day of month
  let lastDateOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate(); // get last date of the previous month
  let liTag = "";

  // create li of previous month last days
  for (let i = firstDateOfMonth; i > 0; i--) {
    liTag += `<li class="cal-ul-li cal-day-li cal-day-li-before inactive-day">${lastDateOfPrevMonth - i + 1}</li>`;
  }

  // create li of all days of the current month
  for (let i = 1; i <= lastDateOfMonth; i++) {
    // add active class to li if day, month, year matches
    let isToday = i === date.getDate() && currentMonth === date.getMonth()
                  && currentYear === date.getFullYear() ? "active-day" : "";
    liTag += `<li class="cal-ul-li cal-day-li cal-day-li-before ${isToday}">${i}</li>`;
  }

  // create li of the next month first days
  for (let i = lastDayOfMonth; i < 6; i++) {
    liTag += `<li class="cal-ul-li cal-day-li cal-day-li-before inactive-day">${i - lastDayOfMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currentMonth]} ${currentYear}`; // header
  daysTag.innerHTML = liTag;

}

renderCalendar();

prevNextIcon.forEach(icon => {
  icon.addEventListener("click", () => {
    currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;
    if (currentMonth < 0 || currentMonth > 11) {
      date = new Date(currentYear, currentMonth, new Date().getDate());
      currentYear = date.getFullYear();
      currentMonth = date.getMonth();
    } else {
      date = new Date();
    }

    renderCalendar();
  });
});


// chart js
const ctx = document.getElementById('taskChart').getContext('2d');

const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Specify the labels for the data points
    datasets: [
      {
        label: 'All tasks',
        data: [25, 15, 20, 35, 38, 20, 12, 9, 32, 21, 18, 32],
        backgroundColor: 'rgba(127, 232, 229, 0.2)',
        borderRadius: 20,
        borderSkipped: false,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      },
      {
        label: 'Completed tasks',
        data: [15, 8, 15, 22, 11, 10, 8, 3, 15, 11, 15, 20],
        backgroundColor: 'rgba(72, 99, 224, 0.3)',
        borderRadius: 20,
        borderSkipped: false,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded'
        },
      },
    },
    scales: {
      x: {
        stacked: true, // make them on top of each other
        display: true,
        grid: {
          display: false // hide the x axis grid line
        }
      },
      y: {
        display: true,
        grid: {
          display: true,
        },
        beginAtZero: true, // Specify if the y-axis should start from zero
        ticks: {
          stepSize: 10
        }
      }
    }
  }
});
