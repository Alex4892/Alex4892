// Драг-н-Дроп
let draggableObjects;
let dropPoints;
const startButton = document.getElementById("start");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const dragContainer = document.querySelector(".draggable-objects");
const dropContainer = document.querySelector(".drop-points");
const data = [
  "Буймяк",
  "Древесный кенгуру",
  "Жирабака",
  "Заебушек",
  "Зметух",
  "Козошка",
  "Ламедь",
  "Локака",
  "Лошула",
  "Медвин",
  "Мопилла",
  "Оранда",
  "Осьмирог",
  "Пингвипёс",
  "Пинкот",
  "Полярные курочки",
  "Слоншилла",
  "Слорёл",
  "Совук",
  "Сось",
  "Страяц",
];

let deviceType = "";
let initialX = 0,
  initialY = 0;
let currentElement = "";
let moveElement = false;

const isTouchDevice = () => { // обнаружение сенсорного устройства
  try {
    document.createEvent("TouchEvent"); // создание события касания
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

let count = 0;

const randomValueGenerator = () => { // случайное значение из ранее созданного массива из животных
  return data[Math.floor(Math.random() * data.length)];
};

const stopGame = () => { // отображение выигрышной игры
  controls.classList.remove("hide");
  startButton.classList.remove("hide");
};

function dragStart(e) { // функция драг-н-дропа (перетаскивания объекта)
  if (isTouchDevice()) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
    moveElement = true; // движение при прикосновении объекта
    currentElement = e.target;
  } else {
    e.dataTransfer.setData("text", e.target.id); // для устройств без сенсорного управления установливаем данные для передачи
  }
}

function dragOver(e) { // события, запущенные по цели отбрасывания
  e.preventDefault();
}

const touchMove = (e) => { // для перемещения по сенсорному экрану
  if (moveElement) {
    e.preventDefault();
    let newX = e.touches[0].clientX;
    let newY = e.touches[0].clientY;
    let currentSelectedElement = document.getElementById(e.target.id);
    currentSelectedElement.parentElement.style.top =
      currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";
    currentSelectedElement.parentElement.style.left =
      currentSelectedElement.parentElement.offsetLeft -
      (initialX - newX) +
      "px";
    initialX = newX;
    initialY - newY;
  }
};

const drop = (e) => {
  e.preventDefault(); // для сенсорного экрана
  if (isTouchDevice()) {
    moveElement = false;
    const currentDrop = document.querySelector(`div[data-id='${e.target.id}']`); // выбираем div названия животного, используя пользовательский атрибут
    const currentDropBound = currentDrop.getBoundingClientRect(); // получаем границы div
    if ( // если положение флага выходит за рамки названия животного
      initialX >= currentDropBound.left &&
      initialX <= currentDropBound.right &&
      initialY >= currentDropBound.top &&
      initialY <= currentDropBound.bottom
    ) {
      currentDrop.classList.add("dropped");
      currentElement.classList.add("hide"); // скрываем фактическое изображение
      currentDrop.innerHTML = ``;
      currentDrop.insertAdjacentHTML( // вставляем новый элемент img
        "afterbegin",
        `<img src="img/${currentElement.id}.jpg">`
      );
      count += 1;
    }
  } else {
    const draggedElementData = e.dataTransfer.getData("text"); // доступ к данным
    const droppableElementData = e.target.getAttribute("data-id"); // получаем значение пользовательского атрибута
    if (draggedElementData === droppableElementData) {
      const draggedElement = document.getElementById(draggedElementData);
      e.target.classList.add("dropped"); // пропущенный класс
      draggedElement.classList.add("hide"); // скрываем текущее изображение
      draggedElement.setAttribute("draggable", "false"); // для перетаскиваемого значения установлено значение false
      e.target.innerHTML = ``;
      e.target.insertAdjacentHTML( // вставляем новое изображение
        "afterbegin",
        `<img src="img/${draggedElementData}.jpg">`
      );
      count += 1;
    }
  }
  if (count == 5) {
    result.innerText = `Красавчик! Продолжай в том же духе!`;
    stopGame();
  }
};

const creator = () => { // создаём флаги и животные
  dragContainer.innerHTML = "";
  dropContainer.innerHTML = "";
  let randomData = [];
  for (let i = 1; i <= 5; i++) {
    let randomValue = randomValueGenerator();
    if (!randomData.includes(randomValue)) {
      randomData.push(randomValue);
    } else {
      i -= 1;
    }
  }
  for (let i of randomData) {
    const flagDiv = document.createElement("div");
    flagDiv.classList.add("draggable-image");
    flagDiv.setAttribute("draggable", true);
    if (isTouchDevice()) {
      flagDiv.style.position = "absolute";
    }
    flagDiv.innerHTML = `<img src="img/${i}.jpg" id="${i}">`;
    dragContainer.append(flagDiv);
  }
  randomData = randomData.sort(() => 0.5 - Math.random()); // сортировка массива случайным образом перед созданием div по животным
  for (let i of randomData) {
    const animalsDiv = document.createElement("div");
    animalsDiv.innerHTML = `<div class='animals' data-id='${i}'>
    ${i.charAt(0).toUpperCase() + i.slice(1).replace("-", " ")}
    </div>
    `;
    dropContainer.append(animalsDiv);
  }
};

startButton.addEventListener( // начало игры
  "click",
  (startGame = async () => {
    currentElement = "";
    controls.classList.add("hide");
    startButton.classList.add("hide");
    await creator();
    count = 0;
    dropPoints = document.querySelectorAll(".animals");
    draggableObjects = document.querySelectorAll(".draggable-image");

    draggableObjects.forEach((element) => {
      element.addEventListener("dragstart", dragStart);
      element.addEventListener("touchstart", dragStart);
      element.addEventListener("touchend", drop);
      element.addEventListener("touchmove", touchMove);
    });
    dropPoints.forEach((element) => {
      element.addEventListener("dragover", dragOver);
      element.addEventListener("drop", drop);
    });
  })
);