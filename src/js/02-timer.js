import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import Notiflix from 'notiflix';

(() => {
  const timeCounter = {
    opBtn: document.querySelector('[data-start]'),
    calanderInput: document.querySelector('input#datetime-picker'),
    calanderInstance: '',
    calanderSelectedDateTime: '',
    timeToGo: '',
    cycleTimer: '',
    timeDisplay: document.querySelector('.timer'),
    options: {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      weekNumbers: true,
      plugins: [new confirmDatePlugin({})],
      locale: {
        firstDayOfWeek: 1,
      },
      onClose: function (selectedDates, dateStr, instance) {
        // onClose: () => {
        //     this.invalidDate = true;
        //  }
        if (selectedDates[0] - new Date() > 0) {
          Notiflix.Notify.success('Press start');
          timeCounter.timeCounterSet();
        } else {
          timeCounter.opBtn.disabled = true;
          //console.log('go to the future');
          //window.alert('Please choose a date in the future');
          Notiflix.Notify.failure('Please choose a date in the future');
        }
      }.bind(this),
    },
    timeCounterSet: function () {
      this.calanderSelectedDateTime = this.calanderInstance.selectedDates[0];
      this.opBtn.disabled = false;
    },
    timeCounterReset: function () {
      clearInterval(this.cycleTimer);
      this.opBtn.textContent = 'Start';
      this.opBtn.disabled = true;
      this.calanderInput.disabled = false;
      this.timeDisplay['children'][0]['children'][0].textContent = '00';
      this.timeDisplay['children'][1]['children'][0].textContent = '00';
      this.timeDisplay['children'][2]['children'][0].textContent = '00';
      this.timeDisplay['children'][3]['children'][0].textContent = '00';
    },
    timeCounterRun: function () {
      if (this.opBtn.textContent === 'Start') {
        this.timeToGo = this.calanderSelectedDateTime - new Date();
        console.log('Selected term: ', this.calanderSelectedDateTime);
        console.log('Time left in ms: ', this.timeToGo);
        console.log('Time left HR: ', this.convertMs(this.timeToGo));
        Notiflix.Notify.info(`Selected term: ${this.calanderSelectedDateTime}`);
        Notiflix.Notify.info(`Time left in ms: ${this.timeToGo}`);
        Notiflix.Notify.info(
          `Time left HR days: ${this.convertMs(this.timeToGo).days} hours: ${
            this.convertMs(this.timeToGo).hours
          } minutes: ${this.convertMs(this.timeToGo).minutes} seconds: ${
            this.convertMs(this.timeToGo).seconds
          }`
        );
        this.opBtn.textContent = 'Stop';
        this.calanderInput.disabled = true;
        this.cycleTimer = setInterval(() => {
          if (this.calanderSelectedDateTime - new Date() >= 0) {
            this.timeToGo = this.calanderSelectedDateTime - new Date();
            this.timeDisplay['children'][0]['children'][0].textContent =
              this.convertMs(this.timeToGo).days;
            this.timeDisplay['children'][1]['children'][0].textContent =
              this.addLeadingZero(`${this.convertMs(this.timeToGo).hours}`);
            this.timeDisplay['children'][2]['children'][0].textContent =
              this.addLeadingZero(`${this.convertMs(this.timeToGo).minutes}`);
            this.timeDisplay['children'][3]['children'][0].textContent =
              this.addLeadingZero(`${this.convertMs(this.timeToGo).seconds}`);
          } else {
            clearInterval(this.cycleTimer);
            this.opBtn.textContent = 'Start';
            this.opBtn.disabled = true;
            this.calanderInput.disabled = false;
            Notiflix.Report.info('Counter', 'Counting down riched end', 'OK');
          }
        }, 1000);
      } else {
        Notiflix.Confirm.show(
          'Counter stop confirm',
          'Do you want to continue?',
          'Yes',
          'No',
          function okCb() {
            Notiflix.Notify.failure('Counter reseted');
            this.timeCounterReset();
          }.bind(this),
          function cancelCb() {
            Notiflix.Notify.info('Counter continues counting');
          },
          {
            width: '320px',
            borderRadius: '8px',
            // etc...
          }
        );
      }
    },
    convertMs: function (ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = Math.floor(ms / day);
      // Remaining hours
      const hours = Math.floor((ms % day) / hour);
      // Remaining minutes
      const minutes = Math.floor(((ms % day) % hour) / minute);
      // Remaining seconds
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);

      return { days, hours, minutes, seconds };
    },
    addLeadingZero: function (value) {
      return value.padStart(2, '0');
    },
    init: function () {
      this.opBtn.disabled = true;
      this.opBtn.addEventListener(
        'click',
        function () {
          this.timeCounterRun();
        }.bind(this)
      );
      this.calanderInstance = flatpickr(this.calanderInput, {
        ...this.options,
      });
    },
  };
  timeCounter.init();
})();

// ---------------------------------------------------------------
// Zadanie 2 - odliczanie czasu
// https://flatpickr.js.org/
// https://flatpickr.js.org/options/
// https://github.com/notiflix/Notiflix#readme

// Wykonuj to zadanie w plikach 02-timer.html i 02-timer.js. Napisz skrypt licznika, który odlicza czas do określonego zdarzenia. Taki licznik można wykorzystywać na blogach czy w sklepach internetowych, stronach z różnymi wydarzeniami, podczas przerwy technicznej itd. Obejrzyj wersję demonstracyjną wideo o działaniu licznika.

// Elementy interfesju
// W HTML znajduje się znacznik licznika, pola wyboru końcowej daty i przycisku, po którego kliknięciu licznik powinien się uruchomić. Popraw wizualnie elementy interfejsu.

// <input type="text" id="datetime-picker" />
// <button type="button" data-start>Start</button>

// <div class="timer">
//   <div class="field">
//     <span class="value" data-days>00</span>
//     <span class="label">Days</span>
//   </div>
//   <div class="field">
//     <span class="value" data-hours>00</span>
//     <span class="label">Hours</span>
//   </div>
//   <div class="field">
//     <span class="value" data-minutes>00</span>
//     <span class="label">Minutes</span>
//   </div>
//   <div class="field">
//     <span class="value" data-seconds>00</span>
//     <span class="label">Seconds</span>
//   </div>
// </div>

// Biblioteka flatpickr
// Używaj biblioteki flatpickr po to, aby pozwolić użytkownikowi wybrać ostateczną datę i godzinę w różnych przeglądarkach w jednym elemencie interfejsu. Aby połączyć kod CSS biblioteki z projektem, należy dodać jeszcze jeden import, oprócz tego opisanego w dokumentacji.

// // Opisany w dokumentacji
// import flatpickr from "flatpickr";
// // Dodatkowy import stylów
// import "flatpickr/dist/flatpickr.min.css";

// Biblioteka czeka na jej inicjalizację w elemencie input[type="text"], dlatego dodaliśmy do HTML input#datetime-picker.

// <input type="text" id="datetime-picker" />

// Drugim argumentem funkcji flatpickr(selector, options) można przekazać nieobowiązkowy obiekt parametrów. Przygotowaliśmy dla Ciebie obiekt, który jest niezbędny do wykonania zadania. Zorientuj się, za co odpowiada każda właściwość w dokumentacji «Options» i użyj jej w swoim kodzie.

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// Wybór daty
// Metoda onClose() z obiektu parametrów pojawia się za każdym razem przy zamknięciu elementu interfejsu, który tworzy flatpickr. To właśnie w nim należy opracować datę wybraną przez użytkownika. Parametr selectedDates to tablica wybranych dat, dlatego bierzemy pierwszy element.

// -Jeśli użytkownik wybrał datę z przeszłości, pokaż window.alert() o treści "Please choose a date in the future".
// -Jeśli użytkownik wybrał odpowiednią datę (z przyszłości), przycisk «Start» staje się aktywny.
// -Przycisk «Start» powinien być nieaktywny dotąd, dopóki użytkownik nie wybierze daty z przyszłości.
// -Po kliknięciu przycisku «Start» zaczyna się odliczanie czasu do wybranej daty od momentu kliknięcia.

// Odliczanie czasu
// -Po kliknięciu na przycisk «Start» skrypt powinien wyliczać raz na sekundę ile czasu pozostało do wskazanej daty i aktualizować interfejs licznika, pokazując cztery liczby: dni, godziny, minuty i sekundy w formacie xx:xx:xx:xx.

// -Liczba dni może się składać z więcej niż dwóch cyfr.
// -Licznik powinien się zatrzymać, po dojściu do daty końcowej, czyli 00:00:00:00.

// NIE BĘDZIEMY KOMPLIKOWAĆ
// Jeśli licznik jest uruchomiony, należy odświeżyć stronę, aby go zrestartować i wybrać nową datę.

// Aby obliczyć wartości użyj gotowej funkcji convertMs, gdzie ms - różnica między końcową i aktualną datą w milisekundach.

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// Formatowanie czasu
// Funkcja convertMs() przywraca obiekt z obliczonym pozostałym czasem do daty końcowej. Zwróć uwagę, że nie formatuje wyniku. To znaczy, że jeśli pozostały 4 minuty czy sekundy, to funkcja przywróci 4, a nie 04. W interfejsie licznika konieczne jest dodanie 0 jeśli liczba zawiera mniej niż dwa symbole. Napisz funkcję addLeadingZero(value), która używa metody padStart() i przed renderowaniem interfejsu sformatuj wartość.

// Biblioteka powiadomień
// UWAGA
// Następna funkcja nie jest obowiązkowa przy oddawaniu zadania, ale będzie dobrą dodatkową praktyką.

// Aby wyświetlić użytkownikowi powiadomienie, zamiast window.alert() użyj biblioteki notiflix.
