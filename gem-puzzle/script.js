const threeField = document.querySelector(".three-field");
const sixField = document.querySelector(".six-field");
const fourField = document.querySelector(".four-field");

const body = document.querySelector("body");

const info = document.createElement("div");
info.className = "info";

const field = document.createElement("div");
field.className = "field";

const counterMove = document.createElement("div");
counterMove.className = "counter-move";
counterMove.innerHTML = "Move: 0";
info.append(counterMove);

const counterTime = document.createElement("div");
counterTime.className = "counter-time";
counterTime.innerHTML = "00:00:00";
info.append(counterTime);

const newGame = document.createElement("button");
newGame.className = "new-game";
newGame.innerHTML = "New Game";
info.append(newGame);

body.append(info);
body.append(field);

const cellSize = 100;

let empty = {
  value: 0,
  top: 0,
  left: 0,
};

let cells = [];
cells.push(empty);

let count = 1;
alert(
  "Привет! Для проверки вывода сообщения в конце игры, через f12 закомментируй строку номер 86 в файле script.js"
);
function move(index) {
  const cell = cells[index];
  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);

  if (leftDiff + topDiff > 1) {
    return;
  }

  cell.element.style.left = `${empty.left * cellSize}px`;
  cell.element.style.top = `${empty.top * cellSize}px`;

  const emptyLeft = empty.left;
  const emptyTop = empty.top;
  empty.left = cell.left;
  empty.top = cell.top;
  cell.left = emptyLeft;
  cell.top = emptyTop;

  counterMove.innerHTML = `Move: ${count++}`;

  document.getElementById("sound").play();

  const isFinished = cells.every((cell) => {
    return cell.value === cell.top * counterOfField + cell.left;
  });

  if (isFinished) {
    alert(
      `Ура! Вы решили головоломку за ${min} минут ${sec} секунд и за ${
        count - 1
      } хода`
    );
  }
}
let numOfField = 15;
let counterOfField = 4;
function game() {
  const numbers = [...Array(numOfField).keys()]
    // ЗАКОММЕНТИРУЙ СТРОКУ НИЖЕ ДЛЯ ПРОВЕРКИ)
    .sort(() => Math.random() - 0.5);
  // *************************************

  for (let i = 1; i <= numOfField; i++) {
    const cell = document.createElement("div");
    const value = numbers[i - 1] + 1;
    let bg;
    if (numOfField === 15) {
      bg = `./assets/4x4/image_part_${value + 1}.jpg`;
    } else if (numOfField === 8) {
      bg = `./assets/3x3/image_part_${value + 1}.jpg`;
    } else if (numOfField === 35) {
      bg = `./assets/6x6/image_part_${value + 1}.jpg`;
    }
    cell.className = "cell";
    //cell.innerHTML = value;
    cell.style.backgroundImage = `url(${bg})`;

    const left = i % counterOfField;
    const top = (i - left) / counterOfField;

    cells.push({
      bg: bg,
      value: value,
      left: left,
      top: top,
      element: cell,
    });
    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    field.append(cell);

    cell.addEventListener("click", () => {
      move(i);
    });
  }
  console.log(cells);
}
//TIMER

let min = 0;
let hour = 0;
let sec = 0;

function init() {
  setInterval(tick, 1000);
}

function tick() {
  sec++;
  if (sec >= 60) {
    min++;
    sec = sec - 60;
  }
  if (min >= 60) {
    hour++;
    min = min - 60;
  }
  if (sec < 10) {
    if (min < 10) {
      if (hour < 10) {
        document.querySelector(".counter-time").innerHTML =
          "0" + hour + ":0" + min + ":0" + sec;
      } else {
        document.querySelector(".counter-time").innerHTML =
          hour + ":0" + min + ":0" + sec;
      }
    } else {
      if (hour < 10) {
        document.querySelector(".counter-time").innerHTML =
          "0" + hour + ":" + min + ":0" + sec;
      } else {
        document.querySelector(".counter-time").innerHTML =
          hour + ":" + min + ":0" + sec;
      }
    }
  } else {
    if (min < 10) {
      if (hour < 10) {
        document.querySelector(".counter-time").innerHTML =
          "0" + hour + ":0" + min + ":" + sec;
      } else {
        document.querySelector(".counter-time").innerHTML =
          hour + ":0" + min + ":" + sec;
      }
    } else {
      if (hour < 10) {
        document.querySelector(".counter-time").innerHTML =
          "0" + hour + ":" + min + ":" + sec;
      } else {
        document.querySelector(".counter-time").innerHTML =
          hour + ":" + min + ":" + sec;
      }
    }
  }
}

function newTime() {
  hour = 0;
  sec = 0;
  min = 0;
  counterTime.innerHTML = "00:00:00";
}

game();
init();

newGame.addEventListener("click", () => {
  counterMove.innerHTML = `Move: 0`;
  count = 1;
  // for (let i = 1; i <= 15; i++) {
  //   field.querySelector(".cell").remove();
  // }
  field.innerHTML = "";
  cells = [];
  empty = {
    value: 0,
    top: 0,
    left: 0,
  };
  cells.push(empty);
  game();
  newTime();
  console.log(cells);
});

threeField.addEventListener("click", () => {
  counterMove.innerHTML = `Move: 0`;
  count = 1;
  numOfField = 8;
  counterOfField = 3;
  field.innerHTML = "";
  field.style.width = "300px";
  field.style.height = "300px";
  cells = [];
  empty = {
    value: 0,
    top: 0,
    left: 0,
  };
  cells.push(empty);
  game();
  newTime();
});

sixField.addEventListener("click", () => {
  counterMove.innerHTML = `Move: 0`;
  count = 1;
  numOfField = 35;
  counterOfField = 6;
  field.innerHTML = "";
  field.style.width = "600px";
  field.style.height = "600px";
  cells = [];
  empty = {
    value: 0,
    top: 0,
    left: 0,
  };
  cells.push(empty);
  game();
  newTime();
});

fourField.addEventListener("click", () => {
  counterMove.innerHTML = `Move: 0`;
  count = 1;
  numOfField = 15;
  counterOfField = 4;
  field.innerHTML = "";
  field.style.width = "400px";
  field.style.height = "400px";
  cells = [];
  empty = {
    value: 0,
    top: 0,
    left: 0,
  };
  cells.push(empty);
  game();
  newTime();
});
