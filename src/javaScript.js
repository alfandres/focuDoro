document.addEventListener("DOMContentLoaded", () => {
  let timer; // Variable para el intervalo del temporizador
  let isFocusTime = true; // Indica si es tiempo de enfoque
  let isPaused = false; // Indica si el temporizador está pausado
  let remainingTime; // Tiempo restante del temporizador

  // Referencias a los elementos del DOM
  const focusTimeInput = document.getElementById("focusTime");
  const breakTimeInput = document.getElementById("breakTime");
  const timerDisplay = document.getElementById("timerDisplay");
  const startButton = document.getElementById("startButton");
  const pauseButton = document.getElementById("pauseButton");
  const resetButton = document.getElementById("resetButton");
  const timeFocus = document.getElementById("timeFocus");
  const timeRest = document.getElementById("timeRest");
  const timePreparation = document.getElementById("timePreparation");
  const toggleThemeCheckbox = document.getElementById("toggleTheme");
  const themeText = document.getElementById("themeText");

  // Cargar los sonidos
  const notificationSound = new Audio("./assets/sound/notification-sound.mp3");
  const notification2Sound = new Audio("./assets/sound/notification2-sound.mp3");
  const startSound = new Audio("./assets/sound/start-sound.mp3");
  const pauseSound = new Audio("./assets/sound/pause-sound.mp3");
  const resetSound = new Audio("./assets/sound/reset-sound.mp3");

  // Función para actualizar la visualización del temporizador
  function updateDisplay(minutes, seconds) {
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  // Función para actualizar el mensaje del temporizador
  function updateTimerMessage() {
    if (isFocusTime) {
      timeFocus.classList.remove("hidden");
      timeRest.classList.add("hidden");
      timePreparation.classList.add("hidden");
    } else {
      timeRest.classList.remove("hidden");
      timeFocus.classList.add("hidden");
      timePreparation.classList.add("hidden");
    }
  }

  // Función para iniciar el temporizador
  function startTimer(duration, callback) {
    let time = duration * 60; // Convertir minutos a segundos
    timer = setInterval(() => {
      if (!isPaused) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        updateDisplay(minutes, seconds);
        updateTimerMessage();
        if (--time < 0) {
          clearInterval(timer);
          callback(); // Llamar a la función callback cuando el tiempo se agote
        }
      }
    }, 1000);
  }

  // Función para mostrar la cuenta regresiva de preparación
  function showCountdown(seconds, callback) {
    let countdownTime = seconds;
    timeFocus.classList.add("hidden");
    timeRest.classList.add("hidden");
    timePreparation.classList.remove("hidden");

    const countdownTimer = setInterval(() => {
      updateDisplay(0, countdownTime);
      if (--countdownTime < 0) {
        clearInterval(countdownTimer);
        notificationSound.play();
        timePreparation.classList.add("hidden");
        callback(); // Llamar a la función callback cuando la cuenta regresiva termine
      }
    }, 1000);
  }

  // Función para iniciar el ciclo de Pomodoro (enfoque)
  function startPomodoroCycle() {
    isFocusTime = true;
    isPaused = false;
    remainingTime = focusTimeInput.value;
    startTimer(remainingTime, () => {
      notification2Sound.play();
      showCountdown(10, () => {
        isFocusTime = false;
        startBreak(); // Iniciar el descanso después del tiempo de preparación
      });
    });
  }

  // Función para iniciar el descanso
  function startBreak() {
    isPaused = false;
    remainingTime = breakTimeInput.value;
    startTimer(remainingTime, () => {
      notification2Sound.play();
      showCountdown(10, startPomodoroCycle); // Volver a iniciar el ciclo de Pomodoro después del tiempo de preparación
    });
  }

  // Evento para el botón de iniciar
  startButton.addEventListener("click", () => {
    clearInterval(timer); // Limpiar cualquier temporizador previo
    startSound.play();
    startPomodoroCycle(); // Iniciar el ciclo de Pomodoro

    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = true;
  });

  // Evento para el botón de pausar
  pauseButton.addEventListener("click", () => {
    isPaused = !isPaused;
    if (isPaused) {
      pauseSound.play();
      pauseButton.innerHTML =
        '<img src="./assets/icons/start-icon.svg" alt="Continuar" class="inline-block w-5 h-5">';
      resetButton.disabled = false;
    } else {
      pauseSound.play();
      pauseButton.innerHTML =
        '<img src="./assets/icons/pause-icon.svg" alt="Pausar" class="inline-block w-5 h-5">';
      resetButton.disabled = true;
    }
  });

  // Evento para el botón de reiniciar
  resetButton.addEventListener("click", () => {
    resetSound.play();
    clearInterval(timer);
    isFocusTime = true;
    remainingTime = focusTimeInput.value;
    updateDisplay(remainingTime, 0);

    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    pauseButton.innerHTML =
      '<img src="./assets/icons/pause-icon.svg" alt="Pausar" class="inline-block w-5 h-5">';
  });

  // Evento change para alternar entre modos claro y oscuro
  toggleThemeCheckbox.addEventListener("change", () => {
    document.documentElement.classList.toggle("dark");
    themeText.textContent = document.documentElement.classList.contains("dark")
      ? "Modo Claro"
      : "Modo Oscuro";
  });

  // Inicializar la visualización del temporizador
  updateDisplay(focusTimeInput.value, 0);
  startButton.disabled = false;
});
