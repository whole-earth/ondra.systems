document.addEventListener("DOMContentLoaded", function () {
  youAre__setFolderPosition();
  processTabsAnim();
  imagineAnim();
  getMonthAvail();

  Promise.all([initPeace(), initCDJ()])
    .then(() => {
      if (window.innerWidth >= 768) {
        Promise.all([renderGrid("color-grid_cdj"), renderGrid("color-grid_peace")])
          .then(() => {
            console.log('grids rendered');
            // window.addEventListener('scroll', scrollAnimatesGrid);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
    });

});

window.addEventListener("resize", function () {
  youAre__setFolderPosition();

  const ripples = document.querySelectorAll('.ripplecanvas');
  if (window.innerWidth >= 768) {
    debounceRenderGrid("color-grid_cdj");
    debounceRenderGrid("color-grid_peace");

    ripples.forEach((canvas) => {
      canvas.removeAttribute('style');
    });
  } else {
    ripples.forEach((canvas) => {
      canvas.style.display = "none";
    });
  }
});

window.addEventListener("scroll", youAre__toggleScroll);

// the rest is jamming

const youAreContainer = document.querySelector(".folder-container");
const youAreFolder = document.querySelectorAll(".folder");
const youAreP = document.querySelectorAll(".folder-p");

function youAre__setFolderPosition() {

  if (window.innerWidth >= 768) {
    let folderRowHeight = document.querySelector('.folder-row').offsetHeight;
    let paddingValue = (window.innerHeight - folderRowHeight) + 'px';

    youAreP.forEach(p => {
      p.style.opacity = '0';
    });

  } else {
    youAreContainer.removeAttribute('style');
    youAreP.forEach(p => {
      p.removeAttribute('style');
    });
  }
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function youAre__handleScroll() {
  youAreFolder.forEach((folder) => {

    if (isInViewport(folder)) {
      folder.querySelector('.folder-p').style.opacity = 1;
    } else {
      folder.querySelector('.folder-p').style.opacity = 0;
    }
  });
}

function youAre__toggleScroll() {
  if (!isInViewport(youAreContainer)) {
    window.addEventListener("scroll", youAre__handleScroll);
  } else {
    window.removeEventListener("scroll", youAre__handleScroll);
  }
}

// 'Beginner's Mind' anim (07.15.23)
const beginner = document.querySelector("#beginner");
const circle = document.querySelector(".beginner");
const stem = document.querySelector(".stem");
const leaves = document.querySelectorAll(".leaf-0, .leaf-1");

let timeouts = [];

beginner.addEventListener("mouseenter", function () {

  timeouts.forEach((timeout) => clearTimeout(timeout));
  timeouts = [];

  circle.style.transform = "rotateX(60deg)";
  timeouts.push(
    setTimeout(function () {
      stem.style.opacity = 1;
      stem.style.height = "12em";
      timeouts.push(
        setTimeout(function () {
          leaves[1].style.opacity = 1;
          timeouts.push(
            setTimeout(function () {
              leaves[0].style.opacity = 1;
            }, 200) // delay: leaf opacity
          );
        }, 300) // delay: stem grow
      );
    }, 300) // delay: circle translate
  );
});

beginner.addEventListener("mouseleave", function () {

  stem.style.opacity = 0;
  stem.style.height = 0;
  leaves.forEach((leaf) => { leaf.style.opacity = 0; });
  circle.style.transform = "";

  timeouts.forEach((timeout) => clearTimeout(timeout));
  timeouts = [];

});

// "Imagine" animation
function imagineAnim() {
  const imagineWrap = document.getElementById("imagineWrap");
  const imagineFlat = document.querySelector(".imagine-flat");
  const imagineAnim = document.querySelector(".imagine-anim");

  imagineWrap.addEventListener("mouseenter", function () {
    imagineFlat.style.opacity = 0;
    imagineAnim.style.opacity = 1;
  });

  imagineWrap.addEventListener("mouseleave", function () {
    imagineFlat.style.opacity = "";
    imagineAnim.style.opacity = "";
  });
}

// "My Process" dropdown anims
function processTabsAnim() {
  const processDropdowns = document.querySelectorAll('.process-dropdown');
  const pHeights = [];

  processDropdowns.forEach((dropdown) => {
    const processPWrap = dropdown.querySelector('.process-p-wrap');
    pHeights.push(processPWrap.clientHeight);

    // Overwrites webflow
    processPWrap.classList.add('collapsed');

    dropdown.addEventListener('click', function (event) {
      const isAlreadyOpen = processPWrap.clientHeight !== 0;

      if (isAlreadyOpen) {
        processPWrap.removeAttribute('style');
        const carat = dropdown.querySelector('.process-carat');
        if (carat) {
          carat.classList.remove('carat-expanded');
        }
        return;
      }

      processDropdowns.forEach((dropdown) => {
        dropdown.removeAttribute('style');
      });

      document.querySelectorAll('.process-p-wrap').forEach((p) => {
        p.removeAttribute('style');
      });

      document.querySelectorAll('.process-carat').forEach((carat) => {
        carat.classList.remove('carat-expanded');
      });

      // Get the index of the clicked dropdown
      const index = Array.from(processDropdowns).indexOf(dropdown);

      const p = dropdown.querySelector('.process-p-wrap');
      if (p) {
        p.style.height = pHeights[index] + 'px';
      }

      const carat = dropdown.querySelector('.process-carat');
      if (carat) {
        carat.classList.add('carat-expanded');
      }

      dropdown.style.borderRadius = '2.6rem';
    });
  });

}

let debounceTimerId = null;
function debounceRenderGrid(gridType) {
  clearTimeout(debounceTimerId);

  debounceTimerId = setTimeout(() => {
    renderGrid(gridType);
    console.log('grids rendered');
  }, 100);
}

// Peace bitmap
function initPeace() {
  return new Promise((resolve, reject) => {
    const peaceGrid = document.querySelector(".peace-grid");
    const peaceNumCells = 23;
    const peaceCells = [];

    for (let i = 0; i < peaceNumCells; i++) {
      const row = document.createElement("div");
      row.classList.add("peace-row");
      peaceGrid.appendChild(row);
      peaceCells[i] = [];
      for (let j = 0; j < peaceNumCells; j++) {
        const cell = document.createElement("div");
        cell.classList.add("peace-cell");
        row.appendChild(cell);
        peaceCells[i][j] = false;
      }
    }

    function renderGrid() {
      for (let i = 0; i < peaceNumCells; i++) {
        for (let j = 0; j < peaceNumCells; j++) {
          const cellState = peaceCells[i][j];
          const cell = peaceGrid.children[i].children[j];

          cell.style.backgroundColor = cellState ? "black" : "inherit";
          if (window.innerWidth >= 768) {
            cell.style.borderColor = cellState ? "black" : "#cccccc70";
          } else {
            cell.style.borderColor = cellState ? "black" : "#cccccc70";
          }

        }
      }
    }

    function toggleCellState(event) {
      const cell = event.target;
      const rowIndex = Array.from(cell.parentNode.parentNode.children).indexOf(cell.parentNode);
      const colIndex = Array.from(cell.parentNode.children).indexOf(cell);

      peaceCells[rowIndex][colIndex] = !peaceCells[rowIndex][colIndex];
      renderGrid();
    }

    const cellsList = document.getElementsByClassName("peace-cell");
    for (const cell of cellsList) {
      cell.addEventListener("click", toggleCellState);
    }

    function setInitialConfiguration(coordinates) {
      peaceCells.forEach((row, rowIndex) => {
        row.fill(false);
      });

      coordinates.forEach((coord) => {
        const [row, col] = coord;
        if (row >= 0 && row < peaceNumCells && col >= 0 && col < peaceNumCells) {
          peaceCells[row][col] = true;
        }
      });

      renderGrid();
    }

    const initialCoordinates = [[1, 8], [1, 9], [2, 7], [2, 10], [2, 14], [2, 15], [2, 16], [3, 7], [3, 10], [3, 13], [3, 14], [3, 17], [4, 8], [4, 11], [4, 13], [4, 16], [5, 8], [5, 11], [5, 13], [5, 16], [6, 8], [6, 11], [6, 13], [6, 16], [7, 8], [7, 8], [7, 11], [7, 13], [7, 16], [8, 6], [8, 9], [8, 11], [8, 13], [8, 16], [9, 4], [9, 5], [9, 6], [9, 9], [9, 12], [9, 15], [10, 3], [10, 6], [10, 9], [10, 12], [10, 15], [11, 3], [11, 8], [11, 9], [11, 14], [12, 3], [12, 5], [12, 9], [12, 12], [12, 13], [12, 14], [12, 15], [12, 16], [13, 3], [13, 6], [13, 9], [13, 11], [13, 17], [14, 4], [14, 6], [14, 7], [14, 8], [14, 11], [14, 18], [15, 5], [15, 12], [15, 13], [15, 14], [15, 15], [15, 18], [16, 4], [16, 13], [16, 18], [17, 3], [17, 11], [17, 18], [18, 3], [18, 16], [19, 4], [19, 15], [19, 16], [20, 5], [20, 15], [21, 5], [21, 15]];
    setInitialConfiguration(initialCoordinates);

    peaceGrid.addEventListener("mouseenter", function () {
      document.querySelector(".peace-reset").style.opacity = "1";
    }, { once: true });

    document.querySelector(".peace-reset").addEventListener("click", function () {
      setInitialConfiguration(initialCoordinates);
    });

    resolve();
  });

}

// CDJ bitmap
function initCDJ() {
  return new Promise((resolve, reject) => {
    const cdjGrid = document.querySelector(".cdj-grid");
    const cdjNumCells = 29;
    const cdjNumRows = 25;
    const cdjCells = [];

    for (let i = 0; i < cdjNumRows; i++) {
      const row = document.createElement("div");
      row.classList.add("cdj-row");
      cdjGrid.appendChild(row);
      cdjCells[i] = [];
      for (let j = 0; j < cdjNumCells; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cdj-cell");
        row.appendChild(cell);
        cdjCells[i][j] = false;
      }
    }

    function renderGrid() {
      return new Promise((resolve) => {
        for (let i = 0; i < cdjNumRows; i++) {
          for (let j = 0; j < cdjNumCells; j++) {
            const cellState = cdjCells[i][j];
            const cell = cdjGrid.children[i].children[j];

            cell.style.backgroundColor = cellState ? "black" : "inherit";

            if (window.innerWidth >= 768) {
              cell.style.borderColor = cellState ? "black" : "#cccccc70";
            } else {
              cell.style.borderColor = cellState ? "black" : "#cccccc70";
            }
          }
        }
        resolve();
      });
    }

    function toggleCellState(event) {
      const cell = event.target;
      const rowIndex = Array.from(cell.parentNode.parentNode.children).indexOf(
        cell.parentNode
      );
      const colIndex = Array.from(cell.parentNode.children).indexOf(cell);

      cdjCells[rowIndex][colIndex] = !cdjCells[rowIndex][colIndex];
      renderGrid();
    }

    const cellsList = document.getElementsByClassName("cdj-cell");
    for (const cell of cellsList) {
      cell.addEventListener("click", toggleCellState);
    }

    function setInitialConfiguration(coordinates) {
      cdjCells.forEach((row, rowIndex) => {
        row.fill(false);
      });

      coordinates.forEach((coord) => {
        const [row, col] = coord;
        if (row >= 0 && row < cdjNumCells && col >= 0 && col < cdjNumCells) {
          cdjCells[row][col] = true;
        }
      });

      renderGrid();
    }

    const initialCoordinates = [[1, 5], [1, 12], [1, 19], [2, 5], [2, 12], [2, 18], [2, 19], [3, 5], [3, 12], [3, 17], [3, 18], [3, 19], [3, 20], [3, 21], [3, 22], [3, 23], [3, 24], [3, 26], [4, 5], [4, 12], [4, 18], [4, 19], [5, 4], [5, 13], [5, 19], [5, 25], [6, 4], [6, 14], [6, 25], [6, 26], [7, 4], [7, 14], [7, 18], [7, 20], [7, 21], [7, 22], [7, 23], [7, 24], [7, 25], [7, 26], [7, 27], [8, 3], [8, 15], [8, 25], [8, 26], [9, 3], [9, 16], [9, 25], [10, 2], [10, 5], [10, 17], [11, 1], [11, 4], [11, 14], [11, 17], [12, 2], [12, 3], [12, 5], [12, 9], [12, 12], [12, 15], [12, 18], [13, 6], [13, 10], [13, 13], [13, 16], [13, 19], [14, 7], [14, 11], [14, 14], [14, 17], [14, 20], [15, 8], [15, 12], [15, 15], [15, 18], [15, 19], [16, 5], [16, 6], [16, 7], [16, 9], [16, 10], [16, 13], [16, 16], [16, 18], [16, 20], [16, 21], [16, 22], [17, 2], [17, 3], [17, 4], [17, 11], [17, 14], [17, 17], [17, 23], [17, 24], [18, 1], [18, 12], [18, 13], [18, 15], [18, 16], [18, 25], [18, 26], [19, 1], [19, 26], [20, 1], [20, 2], [20, 3], [20, 26], [21, 4], [21, 24], [21, 25], [22, 5], [22, 6], [22, 7], [22, 8], [22, 21], [22, 22], [22, 23], [23, 9], [23, 10], [23, 11], [23, 12], [23, 13], [23, 14], [23, 15], [23, 16], [23, 17], [23, 18], [23, 19], [23, 20]];

    setInitialConfiguration(initialCoordinates);

    cdjGrid.addEventListener("mouseenter", function () {
      document.querySelector(".cdj-reset").style.opacity = "0.8";
    }, { once: true });

    document.querySelector(".cdj-reset").addEventListener("click", function () {
      setInitialConfiguration(initialCoordinates);
    });

    resolve();
  });
}

// rippleCanvas helpers (rest of script)
function getGridSize(gridId) {
  const columns = Math.floor(document.getElementById(gridId).offsetWidth / 14);
  const rows = Math.floor(document.getElementById(gridId).offsetHeight / 14);

  return { columns, rows };
}

// Replace random colors to match scheme
const colors = [
  "#b2f2ac",
  "#fea3a4",
  "#a3b9fe",
  "#a8f19f",
  "#beb3f5",
  "#f2dc81",
  "#caa9e8",
  "#97eceb",
  "#ecae97",
  "#f3c57b",
  "#878787",
  "#87b8dd",
  "#87dd92",
  "#a2eaba",
  "#a2ead9"
];

function randomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function handleStagger(event, gridId) {
  const { columns, rows } = getGridSize(gridId);
  const el = event.target.id;
  anime({
    targets: `#${gridId} .color-coord`,
    backgroundColor: randomColor(),
    delay: anime.stagger(30, { grid: [columns, rows], from: el })
  });
}

function renderGrid(gridId) {
  const { columns, rows } = getGridSize(gridId);
  const total = rows * columns;
  const gridContainer = document.getElementById(gridId);

  let gridHTML = "";
  for (let i = 0; i < total; i++) {
    gridHTML += `<div class="color-coord" id="${i}" onclick="handleStagger(event, '${gridId}')"></div>`;
  }

  gridContainer.innerHTML = gridHTML;
}

// animate grid on scroll
function scrollAnimatesGrid() {
  const grid = document.querySelector('.cdj');
  const cdjCoord = window.innerWidth > 996 ? document.getElementById("897") : document.getElementById("1500");
  const peaceCoord = document.querySelector('.peace .ripplecanvas')?.childNodes[51] || null;
  const rect = grid.getBoundingClientRect();
  const triggerPoint = window.innerHeight || document.documentElement.clientHeight;

  if (rect.bottom <= triggerPoint) {
    cdjCoord.click();
    peaceCoord.click();
    window.removeEventListener('scroll', scrollAnimatesGrid);
  }
}

function getMonthAvail() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  let nextMonth = currentMonth + 1;
  let nextYear = currentYear;

  if (nextMonth === 12) {
    nextMonth = 0;
    nextYear += 1;
  }

  document.getElementById('availDate').innerHTML = `${months[nextMonth]} ${nextYear}`;
}
