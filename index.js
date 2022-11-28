const getMinutes = document.querySelector('#minutes-data');
const getSeconds = document.querySelector('#seconds-data');
const getPomodoroState = document.querySelectorAll('.card_pomodoro_state-container');
const getStartBtn = document.querySelector('#start-btn');
const getBreakBtn = document.querySelector('#break-btn');
const getStopBtn = document.querySelector('#stop-btn');

let pomConfig = {
  workTime: 25, // Reference to workMinutes
  workMinutes: 25,
  workSeconds: 0,
  breakTime: 5,
  breakCouter: 0,
  stopFlag: false,
};
let clockInterval;

window.onload = () => {
  getMinutes.innerHTML = `${pomConfig.workMinutes}`.padStart(2, '0');
  getSeconds.innerHTML = `${pomConfig.workSeconds}`.padStart(2, '0');
};

// Clock Actions
const startClock = () => {
  // Change UI
  getStartBtn.classList.add('d-hidden');
  getStopBtn.classList.remove('d-hidden');
  getBreakBtn.classList.remove('d-hidden');

  // Reset Actions
  clockInterval = undefined;
  pomConfig.stopFlag = false;

  if(clockInterval == undefined && pomConfig.workMinutes == pomConfig.workTime) {
    pomConfig.workMinutes--;
    pomConfig.workSeconds = 59;    
  }

  !pomConfig.stopFlag ? clockInterval = setInterval(updateClock, 1000) : null;

  // Change UI
  if (pomConfig.breakCouter % 2 !== 0) {
    getPomodoroState[1].classList.remove('is-holder');
    getPomodoroState[1].classList.add('is-active');
  }
  if (pomConfig.breakCouter % 2 == 0) {
    getPomodoroState[0].classList.remove('is-holder');
    getPomodoroState[0].classList.add('is-active');
  }
};  
const breakClock = () => {
  // Change UI
  getStopBtn.classList.add('d-hidden');
  getStartBtn.classList.remove('d-hidden');

  if(pomConfig.breakCouter % 2 !== 0) {
    getPomodoroState[1].classList.remove('is-active');
    getPomodoroState[0].classList.add('is-holder');
  }
  if(pomConfig.breakCouter % 2 == 0) {
    getPomodoroState[0].classList.remove('is-active');
    getPomodoroState[0].classList.add('is-holder');
  }
  
  // Reset
  clearInterval(clockInterval);
  pomConfig.workMinutes = pomConfig.workTime;
  pomConfig.breakCouter = 0;
  
  // Add to HTML
  getMinutes.innerHTML = `${pomConfig.workTime}`.padStart(2, '0');
  getSeconds.innerHTML = `0`.padStart(2, '0');
};  
const stopClock = () => {
  // Change UI
  getStopBtn.classList.add('d-hidden');
  getStartBtn.classList.remove('d-hidden');

  if (pomConfig.breakCouter % 2 !== 0) {
    getPomodoroState[1].classList.remove('is-active');
    getPomodoroState[1].classList.add('is-holder');
  }
  if (pomConfig.breakCouter % 2 == 0) {
    getPomodoroState[0].classList.remove('is-active');
    getPomodoroState[0].classList.add('is-holder');
  }

  clearInterval(clockInterval);
  pomConfig.stopFlag = true;
};  

const updateClock = () => {
  if(!pomConfig.stopFlag) {
    getMinutes.innerHTML = `${pomConfig.workMinutes}`.padStart(2, '0');
    getSeconds.innerHTML = `${pomConfig.workSeconds}`.padStart(2, '0');
  
    if(pomConfig.breakCouter < 6) {
      pomConfig.workSeconds--;
    
      if(pomConfig.workSeconds == 0) {
        pomConfig.workMinutes--;
    
        if(pomConfig.workMinutes == -1) {
          pomConfig.breakCouter++;
    
          if(pomConfig.breakCouter % 2 !== 0) {
            pomConfig.workMinutes = pomConfig.breakTime - 1;

            // Change UI
            getPomodoroState[0].classList.remove('is-active');
            getPomodoroState[1].classList.add('is-active');
          }
          if(pomConfig.breakCouter % 2 == 0) {
            pomConfig.workMinutes = pomConfig.workTime - 1;
            
            // Change UI
            getPomodoroState[1].classList.remove('is-active');
            getPomodoroState[0].classList.add('is-active');
          }
        }
  
        pomConfig.workSeconds = 59;
      }
    }
  
    if(pomConfig.breakCouter > 5) {
      // Stop Interval
      clearInterval(clockInterval);
      
      getSeconds.innerHTML = `0`.padStart(2, '0'); // Change UI
      setTimeout(() => alert('Você concluiu sua seção de foco'), 350);
     
      // Reset
      pomConfig.workMinutes = pomConfig.workTime;
      pomConfig.workSeconds = 0;
      pomConfig.breakCouter = 0; 

      // Chnage UI
      getStartBtn.classList.add('d-hidden');
      getStopBtn.classList.add('d-hidden');
    }
  }
};

// Add Actions to HTML
getStartBtn.addEventListener('click', startClock);
getBreakBtn.addEventListener('click', breakClock);
getStopBtn.addEventListener('click', stopClock);