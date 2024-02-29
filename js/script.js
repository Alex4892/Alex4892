//Бургер-меню
function burgerMenu(selector) {
  let menu = document.querySelector(selector); // получаем меню
  let body = document.querySelector('body');
  let button = menu.querySelector('.burger-menu_button'); // создаем класс с ссылкой
  let links = menu.querySelectorAll('.burger-menu_link'); // выбираем все пункты меню
  let overlay = menu.querySelector('.burger-menu_overlay'); // блок, перекрывающий контент

  button.addEventListener('click', e => { // клик по кнопке
    e.preventDefault(); //отмена действия кнопки по умолчанию
    toggleMenu();
  });

  links.forEach(link => link.addEventListener('click', () => toggleMenu())); // клик по любому пункту меню
  overlay.addEventListener('click', () => toggleMenu()); // клик по блоку

  function toggleMenu() { // функция по переключению бургер-меню между состояними активного/неактивного меню
    if (menu.classList.contains('burger-menu_active')) {
      menu.classList.remove('burger-menu_active');
      body.style.overflow = 'visible';
    } else {
      menu.classList.add('burger-menu_active');
      body.style.overflow = 'hidden'; // делаем так, что, когда бургер-меню активно, нельзя прокручивать основную область контента 
    }
  }
}
burgerMenu('.burger-menu'); // вызов бургер-меню


// Счётчик 8 марта
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const currentYear = new Date().getFullYear(); // получаем текущий год
const newYear = new Date(`8 Mar ${currentYear} 00:00:00 `);// узнаём как получить 8 марта

function countTimer() {
  const todayDate = Date.now();
  // разница между новым годом и текущей датой
  const gap = newYear - todayDate;
  const d = Math.floor(gap / 1000 / 60 / 60 / 24);
  const h = Math.floor((gap / 1000 / 60 / 60) % 24);
  const m = Math.floor((gap / 1000 / 60) % 60);
  const s = Math.floor((gap / 1000) % 60);
  days.innerHTML = d < 10 ? "0" + d : d;
  hours.innerHTML = h < 10 ? "0" + h : h;
  minutes.innerHTML = m < 10 ? "0" + m : m;
  seconds.innerHTML = s < 10 ? "0" + s : s;
}
setInterval(countTimer, 1000);

// Проверка валидности на пробелы и русские буквы для полей с именем и фамилии
function checkForm() {
  let n1 = document.getElementById("name1").value;
  let t1 = /^[а-яёА-ЯЁ\s]+$/;
  if (!t1.test(n1)) {
    alert("Разрешено использовать только пробелы и русские буквы");
    return false;
  }
  let n2 = document.getElementById("name2").value;
  if (!t1.test(n2)) {
    alert("Разрешено использовать только пробелы и русские буквы");
    return false;
  }
}
