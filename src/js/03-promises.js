import Notiflix from 'notiflix';
(() => {
  const promisesGenerator = {
    formBind: document.querySelector('.form'),
    createPromise: function (position, delay) {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        Notiflix.Notify.success(
          `✅ Fulfilled promise function ${position} in ${delay}ms`
        );
      } else {
        // Reject/
        Notiflix.Notify.failure(
          `❌ Rejected promise function ${position} in ${delay}ms`
        );
      }
    },
    createPromiseDelaied: function (position, delay) {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          // Fulfill
          Notiflix.Notify.success(
            `✅ Fulfilled promise delaied function ${position} in ${delay}ms`
          );
        } else {
          // Reject/
          Notiflix.Notify.failure(
            `❌ Rejected promise delaied function ${position} in ${delay}ms`
          );
        }
      }, delay);
    },
    createPromiseRealOne: function (position, delay) {
      return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;
        setTimeout(() => {
          if (shouldResolve) {
            // Fulfill
            resolve({ position, delay });
          } else {
            // Reject/
            reject({ position, delay });
          }
        }, delay);
      });
    },
    formSubmit: function (event) {
      event.preventDefault();
      const { delay, step, amount } = event.currentTarget;
      Notiflix.Notify.info(`Delay of first promise: ${delay.value}ms`);
      Notiflix.Notify.info(`Added delay to next each promise: ${step.value}ms`);
      Notiflix.Notify.info(`Promises, to generate: ${amount.value}`);
      // for (let i = 0; i < amount.value; i++) {
      //   this.createPromise(i + 1, +delay.value + +step.value * i);
      // }
      // for (let i = 0; i < amount.value; i++) {
      //   this.createPromiseDelaied(i + 1, +delay.value + +step.value * i);
      // }
      for (let i = 0; i < amount.value; i++) {
        this.createPromiseRealOne(i + 1, +delay.value + +step.value * i)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(
              `✅ Fulfilled promise ${position} in ${delay}ms`
            );
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.failure(
              `❌ Rejected promise ${position} in ${delay}ms`
            );
          });
      }
    },
    init: function () {
      Notiflix.Notify.success('Promises generator init succed');
      this.formBind.addEventListener(
        'submit',
        function (event) {
          this.formSubmit(event);
        }.bind(this)
      );
    },
  };
  promisesGenerator.init();
})();

// Zadanie 3 - generator obietnic
// Wykonuj to zadanie w plikach 03-promises.html i 03-promises.js. Obejrzyj wersję demonstracyjną wideo o działaniu generatora obietnic.

// W HTML znajduje się znacznik formularza, w którego pola użytkownik będzie wprowadzał pierwsze opóźnienie w milisekundach, stopień zwiększenia opóźnienia dla każdej kolejnej obietnicy i liczbę obietnic, które należy utworzyć.

// <form class="form">
//   <label>
//     First delay (ms)
//     <input type="number" name="delay" required />
//   </label>
//   <label>
//     Delay step (ms)
//     <input type="number" name="step" required />
//   </label>
//   <label>
//     Amount
//     <input type="number" name="amount" required />
//   </label>
//   <button type="submit">Create promises</button>
// </form>

// Napisz skrypt, który po wysłaniu formularza wywoła funkcję createPromise(position, delay) tyle razy, ile wprowadzono w pole amount. Po każdym wywołaniu przekaż jej numer utworzonej obietnicy (position) i opóźnienie, uwzględniając wprowadzone przez użytkownika pierwsze opóźnienie (delay) i stopień (step).

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

// Uzupełnij kod funkcji createPromise tak, aby przywracała jedną obietnicę, którą realizuje się lub odkłada poprzez delay czasu. Wartością obietnicy powinien być obiekt, w którym będą właściwości position i delay z wartościami parametrów o tej samej nazwie. Użyj kodu początkowego funkcji, aby wybrać to, co należy zrobić z obietnicą - zrealizować lub odłożyć.

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

//   Biblioteka powiadomień
// UWAGA
// Następna funkcja nie jest obowiązkowa przy oddawaniu zadania, ale będzie dobrą dodatkową praktyką.

// Aby wyświetlić użytkownikowi powiadomienie, zamiast console.log() użyj biblioteki notiflix.
