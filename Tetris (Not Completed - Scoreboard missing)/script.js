class Game {
  constructor() {}
  static pieces = [
    [
      [1, 0],
      [0, 0],
      [-1, 1],
      [0, 1]
    ],
    [
      [-1, 0],
      [0, 0],
      [1, 0],
      [1, 1]
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1]
    ],
    [
      [-1, 0],
      [0, 0],
      [1, 1],
      [0, 1]
    ],
    [
      [-1, 0],
      [0, 0],
      [1, 0],
      [2, 0]
    ],
    [
      [-1, 1],
      [-1, 0],
      [0, 0],
      [1, 0]
    ],
    [
      [-1, 0],
      [0, 0],
      [1, 0],
      [0, 1]
    ]
  ];

  choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  randint(n) {
    return Math.floor(n * Math.random());
  }

  Launch() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("Gamefield-out").style.display = "block";
    document.getElementById("Scoreboard-out").style.display = "block";
    let image = document.getElementById("tetrimios");
    this.images = this.screen_ratio = 3 / 2;
    this.GameField = document.getElementById("grid");
    this.level = 1;
    this.grid = [];
    this.linesBroken = [false, [], 0];
    this.score = 0;
    this.gameStarted = false;
    for (let i = 0; i < 20; i++) {
      let newRow = [];
      let currentRow = this.GameField.rows[19 - i];
      for (let j = 0; j < 10; j++) {
        newRow.push(new Game.Cell(currentRow.cells.item(j), i, j));
      }
      this.grid.push(newRow);
    }
    this.addRandomPiece();
    let r = this.randint(7);
    this.piece = { box: Game.pieces[r], pos: [5, 18], id: r };
    this.count = 3;
    this.Countdown(3);
  }
  addRandomPiece() {
    this.addPiece(this.randint(7));
  }
  addPiece(i) {
    this.next = { box: Game.pieces[i], pos: [5, 18], id: i };
  }
  Countdown() {
    document.getElementById("count-p").style.display = "block";
    document.getElementById("count-p").innerHTML = this.count;
    this.count--;
    if (this.count == 0) {
      setTimeout(
        function() {
          this.Update();
          document.getElementById("count-p").style.display = "none";
        }.bind(this),
        1000
      );
    } else {
      setTimeout(this.Countdown.bind(this), 1000);
    }
  }
  bottom(p) {
    let reached = false;
    let ans = p;
    while (!reached) {
      let current = this.down(ans);
      reached = !this.possible(current);
      if (!reached) {
        ans = current;
      }
    }
    return ans;
  }
  Update() {
    this.nextTurn = setTimeout(this.Update.bind(this), 750);
    this.gameLost = false;
    if (this.gameStarted) {
      let nextPiece = this.down(this.piece);
      if (this.possible(nextPiece)) {
        this.setMovingPiece(nextPiece);
      } else {
        this.refreshPiece(this.piece);
      }
    } else {
      this.gameStarted = true;
      this.setMovingPiece(this.piece);
    }
    this.repaint();
    if (this.gameLost) {
      clearTimeout(this.nextTurn);
      this.gameOver();
    }
  }
  checkBrokenLines() {
    let lb = [false, [], 0];
    lb[1] = [];
    lb[0] = false;
    for (let i = 0; i < 20; i++) {
      let row = this.grid[i];
      let lineBroken = true;
      for (let j = 0; j < 10; j++) {
        if (row[j].type != 1) {
          lineBroken = false;
          break;
        }
      }
      if (lineBroken) {
        lb[0] = true;
        lb[2] = 0;
        lb[1].push(i);
      }
    }
    return lb;
  }
  breakLine() {
    for (let i = 0; i < this.linesBroken[1].length; i++) {
      let y = this.linesBroken[1][i];
      let x = this.linesBroken[2];
      this.grid[y][4 - x].type = 0;
      this.grid[y][5 + x].type = 0;
    }
    this.linesBroken[2]++;
    this.setMovingPiece({ pos: [0, 0], id: 0, box: [] });
    this.repaint();
    if (this.linesBroken[2] == 5) {
      this.linesBroken[0] = false;
      this.nextTurn = setTimeout(this.Update.bind(this), 200);
      let count = 0;
      for (let i = 0; i < this.linesBroken[1].length; i++) {
        let l = this.linesBroken[1][i];
        for (let j = l + 1 - count; j < 20; j++) {
          let row = this.grid[j];
          let pRow = this.grid[j - 1];
          for (let k = 0; k < 10; k++) {
            row[k].move(pRow[k]);
          }
        }
        for (let k = 0; k < 10; k++) {
          this.grid[19][k].type = 0;
        }
        count++;
      }
      this.piece = this.next;
      this.addRandomPiece();
    } else {
      this.nextTurn = setTimeout(this.breakLine.bind(this), 100);
    }
  }
  moveLines(prev, post) {
    for (let i = 0; i < 20; i++) {
      this.grid[post][i].move(this.grid[prev][i]);
    }
  }
  refreshPiece(p) {
    this.setPiece(p, 1);
    this.piece = this.next;
    let lines = this.checkBrokenLines(p);
    if (lines[0] == true) {
      clearTimeout(this.nextTurn);
      this.linesBroken = lines;
      this.nextTurn = setTimeout(this.breakLine.bind(this), 500);
    }
    if (this.possible(this.piece)) {
      this.setPiece(this.piece, 2);
    } else {
      this.gameLost = true;
    }
    this.addRandomPiece();
  }
  gameOver() {
    document.querySelector("body").innerHTML = "Game Over!";
  }
  repaint() {
    for (let i = 0; i < 20; i++) {
      let row = this.grid[i];
      for (let j = 0; j < 10; j++) {
        row[j].paint();
      }
    }
  }
  possible(p) {
    for (let i = 0; i < p.box.length; i++) {
      let cell = this.add(p.pos, p.box[i]);
      let x = cell[0];
      let y = cell[1];
      if (x < 0 || y < 0 || x >= 10 || y >= 20 || this.grid[y][x].type == 1) {
        return false;
      }
    }
    return true;
  }
  left(p) {
    return { box: p.box, pos: this.add(p.pos, [-1, 0]), id: p.id };
  }
  right(p) {
    return { box: p.box, pos: this.add(p.pos, [1, 0]), id: p.id };
  }
  down(p) {
    return { box: p.box, pos: this.add(p.pos, [0, -1]), id: p.id };
  }
  clockwise(p) {
    if (p.id != 2) {
      let newBox = [];
      for (let i = 0; i < p.box.length; i++) {
        let current = p.box[i];
        let nx = current[1];
        let ny = -current[0];
        newBox.push([nx, ny]);
      }
      return { box: newBox, pos: p.pos, id: p.id };
    } else {
      return p;
    }
  }

  cclockwise(p) {
    if (p.id != 2) {
      let newBox = [];
      for (let i = 0; i < p.box.length; i++) {
        let current = p.box[i];
        let nx = -current[1];
        let ny = current[0];
        newBox.push([nx, ny]);
      }
      return { box: newBox, pos: p.pos, id: p.id };
    } else {
      return p;
    }
  }
  add(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
  }
  static Cell = class {
    static blocks = [
      "red.png",
      "orange.png",
      "yellow.png",
      "green.png",
      "cyan.png",
      "blue.png",
      "purple.png"
    ];
    static colors = [
      "rgb(251, 0, 0)",
      "rgb(251, 177, 0)",
      "rgb(251, 232, 0)",
      "rgb(0, 251, 77)",
      "rgb(0, 228, 251)",
      "rgb(0, 146, 251)",
      "rgb(213, 0, 251)"
    ];
    constructor(c, row, col) {
      this.elmt = c;
      this.row = row;
      this.col = col;
      this.color = null;
      this.type = 0;
    }
    isEmpty() {
      return this.type == 0 || this.type == 3;
    }
    isPrediction() {
      return this.type == 3;
    }
    isFixed() {
      return this.type == 1;
    }
    fill(color) {
      this.color = color;
    }
    move(cell) {
      cell.type = this.type + 0;
      cell.color = this.color + 0;
    }
    empty() {
      this.color = null;
      this.type = 0;
    }
    paint() {
      if (!this.isEmpty()) {
        this.elmt.style.backgroundImage =
          'url("src/' + Game.Cell.blocks[this.color] + '")';
        this.elmt.style.backgroundSize = "100% 100%";
      } else {
        this.elmt.style.background = "black";
        this.elmt.style.backgroundImage = "none";
      }
      if (this.type == 3) {
        this.elmt.style.border = "2px solid " + Game.Cell.colors[this.color];
      } else {
        this.elmt.style.border = "1px rgb(75, 74, 74)";
      }
    }
  };
  setPiece(p, type) {
    for (let i = 0; i < p.box.length; i++) {
      let current = this.add(p.box[i], p.pos);
      let x = current[0];
      let y = current[1];
      this.grid[y][x].type = type;
      this.grid[y][x].color = p.id;
    }
  }
  setMovingPiece(p) {
    if (this.possible(p)) {
      if (this.piece.box.length > 0) {
        this.setPiece(this.bottom(this.piece), 0);
      }
      this.setPiece(this.piece, 0);
      if (p.box.length > 0) {
        this.setPiece(this.bottom(p), 3);
      }
      this.piece = p;
      this.setPiece(this.piece, 2);
      this.repaint();
    }
  }
  handleMovement(e) {
    let n = null;
    if (this.gameStarted && this.linesBroken[0] == false) {
      switch (e.key) {
        case "ArrowUp":
          n = this.clockwise(this.piece);
          this.setMovingPiece(n);
          break;
        case "ArrowDown":
          n = this.down(this.piece);
          this.setMovingPiece(n);
          break;
        case "ArrowRight":
          n = this.right(this.piece);
          this.setMovingPiece(n);
          break;
        case "ArrowLeft":
          n = this.left(this.piece);
          this.setMovingPiece(n);
          break;
        case "z":
          n = this.cclockwise(this.piece);
          this.setMovingPiece(n);
          break;
        case "c":
          console.log("save");
          break;
        case " ":
          let b = this.bottom(this.piece);
          this.setMovingPiece(b);
          clearTimeout(this.nextTurn);
          this.nextTurn = setTimeout(this.Update.bind(this), 750);
          this.refreshPiece(b);
          break;
        case "escape":
          console.log("pause");
          break;
      }
    }
  }
}

let game = new Game();
window.onkeydown = game.handleMovement.bind(game);
