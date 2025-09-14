const puzzleContainer = document.getElementById('puzzle');
let puzzle = [];

// Función que crea el puzzle en orden correcto (resuelto)
function crearPuzzleResuelto() {
  puzzle = [];
  for (let i = 0; i < 15; i++) puzzle.push(i + 1);
  puzzle.push(0); // espacio vacío
}

// Mezcla el puzzle realizando movimientos válidos
function mezclarPuzzle(movimientos = 50) {
  let zeroIndex = puzzle.indexOf(0);
  for (let i = 0; i < movimientos; i++) {
    let fila = Math.floor(zeroIndex / 4);
    let col = zeroIndex % 4;

    let vecinos = [];
    if (fila > 0) vecinos.push(zeroIndex - 4);
    if (fila < 3) vecinos.push(zeroIndex + 4);
    if (col > 0) vecinos.push(zeroIndex - 1);
    if (col < 3) vecinos.push(zeroIndex + 1);

    let destino = vecinos[Math.floor(Math.random() * vecinos.length)];

    [puzzle[zeroIndex], puzzle[destino]] = [puzzle[destino], puzzle[zeroIndex]];
    zeroIndex = destino;
  }
}

// Función que dibuja el puzzle en pantalla según el arreglo
function renderPuzzle() {
  puzzle.forEach((valor, index) => {
    let tile = document.getElementById(`tile-${index}`);
    if (!tile) {
      tile = document.createElement('div');
      tile.id = `tile-${index}`;
      tile.className = 'tile';
      puzzleContainer.appendChild(tile);
    }

    if (valor === 0) {
      tile.classList.add('empty');
      tile.style.backgroundPosition = '';
      tile.onclick = null;
    } else {
      tile.classList.remove('empty');
      const valorFila = Math.floor((valor - 1) / 4);
      const valorCol = (valor - 1) % 4;
      tile.style.backgroundPosition = `-${valorCol * 100}px -${valorFila * 100}px`;
      tile.onclick = () => mover(index);
    }
  });
}

// Mueve una casilla si está al lado del espacio vacío
function mover(index) {
  const zeroIndex = puzzle.indexOf(0);
  const dif = Math.abs(index - zeroIndex);
  const sonAdyacentes =
    (dif === 1 && Math.floor(index / 4) === Math.floor(zeroIndex / 4)) ||
    dif === 4;

  if (sonAdyacentes) {
    [puzzle[zeroIndex], puzzle[index]] = [puzzle[index], puzzle[zeroIndex]];
    renderPuzzle();
  }
}

// Reinicia el puzzle y lo revuelve
function revolverPuzzle() {
  crearPuzzleResuelto();
  mezclarPuzzle(50);
  renderPuzzle();
}

// Al cargar la página, se muestra el puzzle ordenado
crearPuzzleResuelto();
renderPuzzle();
