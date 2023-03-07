(() => {
  const backGroundChanger = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    bodyBind: document.querySelector('body'),
    cycleTimer: '',
    init: function () {
      this.startBtn.addEventListener(
        'click',
        function () {
          this.startBtnFnc();
        }.bind(this)
      );
      this.stopBtn.addEventListener(
        'click',
        function () {
          this.stopBtnFnc();
        }.bind(this)
      );
      this.stopBtn.disabled = true;
    },
    startBtnFnc: function () {
      this.cycleTimer = setInterval(() => {
        this.bodyBind.style.backgroundColor = `${this.getRandomHexColor()}`;
      }, 1000);
      this.startBtn.disabled = true;
      this.stopBtn.disabled = false;
    },
    stopBtnFnc: function () {
      clearInterval(this.cycleTimer);
      this.startBtn.disabled = false;
      this.stopBtn.disabled = true;
    },
    getRandomHexColor: function () {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    },
  };
  backGroundChanger.init();
})();

// Zadanie 1 - zmiana koloru
// Wykonuj to zadanie w plikach 01-color-switcher.html i 01-color-switcher.js. Obejrzyj wersję demonstracyjną wideo o działaniu zmiany koloru.

// W HTML znajdują się przyciski «Start» i «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Napisz skrypt, który po kliknięciu przycisku «Start», raz na sekundę zmienia kolor tła <body> na wartość losową używając stylu inline. Po kliknięciu przycisku «Stop», kolor tła powinien przestać się zmieniać.

// Zwróć uwagę na to, że przycisk «Start» można klikać w nieskończoność. Zrób tak, żeby przycisk «Start» był nieaktywny, dopóki zmiana tematu jest uruchomiona (disabled).

// Aby wygenerować losowy kolor użyj funkcji getRandomHexColor.

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }
