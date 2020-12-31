class Cube {
  constructor(dim, gl, ldm, animation_times = {default:.5}) {
    this.gl = gl;
    this.dim = dim;
    this.isMoving = false;
    this.isScrambling = false;
    this.isSolving = false;
    this.fastScramble = false;
    this.fastSolve = false;
    this.animation_time = 0.5;
    this.solve_animation_time = 0.15;
    this.scramble_animation_time = 0.5;
    this.cubieSize = 1 / this.dim;
    var offset = (this.cubieSize * (1 - this.dim)) / 2;
    this.cubies = [];
    this.pos = new Cubie(0, 0, 0, 1, gl, [true, true, true, true, true, true]);
    this.qeue = [];
    this.animation_times = animation_times
    let indices = [0, this.dim - 1];
    for (let i = 0; i < this.dim - 1; i++) indices.push(i);
    for (var i = 0; i < this.dim; i++) {
      let layer = [];
      for (var j = 0; j < this.dim; j++) {
        layer.push(this.generateRow(i, j, offset, gl, ldm));
      }
      this.cubies.push(layer);
    }
  }
  generateRow(x, y, o, gl, ldm) {
    var row = [];
    row.push(this.generateCubie(x, y, 0, o, gl, ldm));
    for (let k = 1; k < this.dim - 1; k++)
      if (x == 0 || x == this.dim - 1 || y == 0 || y == this.dim - 1)
        row.push(this.generateCubie(x, y, k, o, gl, ldm));
      else row.push(undefined);
    row.push(this.generateCubie(x, y, this.dim - 1, o, gl, ldm));
    return row;
  }
  generateCubie(x, y, z, o, gl, ldm) {
    var sides = [
      y == this.dim - 1,
      z == this.dim - 1,
      x == 0,
      z == 0,
      x == this.dim - 1,
      y == 0,
    ];
    return new Cubie(
      o + this.cubieSize * x,
      o + this.cubieSize * y,
      o + this.cubieSize * z,
      this.cubieSize,
      gl,
      sides,
      ldm
    );
  }

  update(timedelta) {
    if (this.isScrambling && this.fastScramble) {
      while (this.qeue.length != 0) {
        this.current_var = this.qeue[0];
        this.Turn();
        this.qeue.shift();
      }
      this.isMoving = false;
    } else if (this.isSolving && this.fastSolve) {
      while (this.isSolving) {
        solve(this);
        while (this.qeue.length != 0) {
          this.current_var = this.qeue[0];
          this.Turn();
          this.qeue.shift();
        }
      }
      this.isMoving = false;
    } else if (this.isMoving) {
      if (this.animation_times.default) this.animation_time = this.animation_times.default;
      else if (this.isScrambling) this.animation_time = this.animation_times.scrambling;
      else if (this.isSolving)
        if (this.animation_times.solving.default) this.animation_time = this.animation_times.solving.default;
        else if (!allCentersSolved) this.animation_time = this.animation_times.solving.centers;
        else if (!edgesSolved) this.animation_time = this.animation_times.solving.edges;
        else if (this.animation_times.solving.threeByThree.default) this.animation_time = this.animation_times.solving.threeByThree.default;
        else switch (state3x3x3[0]) {
          case 0:
            this.animation_time = this.animation_times.solving.threeByThree.Wcross;
            break;
          case 1:
            this.animation_time = this.animation_times.solving.threeByThree.F2L;
            break;
          case 2:
            this.animation_time = this.animation_times.solving.threeByThree.Ycross;
            break;
          case 3:
            this.animation_time = this.animation_times.solving.threeByThree.OLL;
            break;
          case 4:
            this.animation_time = this.animation_times.solving.threeByThree.PLL;
            break;
        }
      else this.animation_time = this.animation_times.normal;

      var total = this.animation_time;

      if (total == 0) {
        this.isMoving = false;
      }
      this.animation_elapsed += timedelta;
      if (
        (this.animation_elapsed >= total && this.current_var.ammount != 2) ||
        this.animation_elapsed >= 2 * total
      ) {
        this.isMoving = false;
      }
    }
    if (!this.isMoving) {
      if (this.isSolving && this.qeue.length == 0) {
        solve(this);
      }
      if (this.qeue.length != 0) {
        this.current_var = this.qeue[0];
        this.Turn();
        this.animation_elapsed = 0;
        this.qeue.shift();
        this.isMoving = true;
      } else if (this.isScrambling) {
        this.isScrambling = false;
      }
    }
  }

  rotateX(amt) {
    this.modelMatrix = mat4.create();
    mat4.rotateX(this.modelMatrix, this.modelMatrix, amt);
  }
  rotateY(amt) {
    this.modelMatrix = mat4.create();
    mat4.rotateY(this.modelMatrix, this.modelMatrix, amt);
  }
  rotateZ(amt) {
    this.modelMatrix = mat4.create();
    mat4.rotateZ(this.modelMatrix, this.modelMatrix, amt);
  }

  show(PI) {
    // Tell WebGL to use our program when drawing

    this.gl.useProgram(PI.program);
    var total = this.animation_time;
    if (this.isMoving) {
      var d = this.current_var.dimension;
      var lrs = this.current_var.layers;
      var a = this.current_var.ammount;
      var indices = [0, 0, 0];

      for (var i = 0; i < this.dim; i++) {
        indices[2 - d] = d == 1 ? this.dim - 1 - i : i;
        if (this.isALayer(i, lrs) && total != 0) {
          if (a == 0) {
            switch (d) {
              case 0:
                this.rotateZ(HALF_PI * (this.animation_elapsed / total - 1));
                break;
              case 1:
                this.rotateY(HALF_PI * (this.animation_elapsed / total - 1));
                break;
              case 2:
                this.rotateX(HALF_PI * (1 - this.animation_elapsed / total));
                break;
            }
          } else if (a == 1) {
            switch (d) {
              case 0:
                this.rotateZ(HALF_PI * (1 - this.animation_elapsed / total));
                break;
              case 1:
                this.rotateY(HALF_PI * (1 - this.animation_elapsed / total));
                break;
              case 2:
                this.rotateX(HALF_PI * (this.animation_elapsed / total - 1));
                break;
            }
          } else {
            switch (d) {
              case 0:
                this.rotateZ(HALF_PI * (this.animation_elapsed / total - 2));
                break;
              case 1:
                this.rotateY(HALF_PI * (2 - this.animation_elapsed / total));
                break;
              case 2:
                this.rotateX(HALF_PI * (2 - this.animation_elapsed / total));
                break;
            }
          }
        } else this.modelMatrix = mat4.create();

        this.gl.uniformMatrix4fv(
          PI.uniformLocations.cubeModelMatrix,
          false,
          this.modelMatrix
        );

        if (
          i != this.dim - 1 &&
          (this.isALayer(i, lrs) || this.isALayer(i + 1, lrs))
        ) {
          var idx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (let n = 0; n < 4; n++) {
            idx[3 * n + 2 - d] =
              d == 1
                ? 0.5 - (i + 1) / this.dim
                : 0.5 - (this.dim - i - 1) / this.dim;
            idx[3 * n + ((2 - d + 1) % 3)] = 0.5 * (n % 2 == 0 ? 1 : -1);
            idx[3 * n + ((2 - d + 2) % 3)] = 0.5 * (n > 1 ? 1 : -1);
          }
          drawSquare(this.gl, PI, idx, [0, 0, 0, 1]);
        }
        if (i != 0 && (this.isALayer(i, lrs) || this.isALayer(i - 1, lrs))) {
          var idx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (let n = 0; n < 4; n++) {
            idx[3 * n + 2 - d] =
              d == 1 ? 0.5 - i / this.dim : 0.5 - (this.dim - i) / this.dim;
            idx[3 * n + ((2 - d + 1) % 3)] = 0.5 * (n % 2 == 0 ? 1 : -1);
            idx[3 * n + ((2 - d + 2) % 3)] = 0.5 * (n > 1 ? 1 : -1);
          }
          drawSquare(this.gl, PI, idx, [0, 0, 0, 1]);
        }

        for (var j = 0; j < this.dim; j++) {
          indices[(2 - d + 1) % 3] = j;
          for (var k = 0; k < this.dim; k++) {
            indices[(2 - d + 2) % 3] = k;
            this.getCubie(indices)?.show(PI);
          }
        }
      }
    } else {
      this.modelMatrix = mat4.create();
      this.gl.uniformMatrix4fv(
        PI.uniformLocations.cubeModelMatrix,
        false,
        this.modelMatrix
      );
      for (var i = 0; i < this.dim; i++) {
        for (var j = 0; j < this.dim; j++) {
          for (var k = 0; k < this.dim; k++) {
            if (
              i == 0 ||
              i == this.dim - 1 ||
              j == 0 ||
              j == this.dim - 1 ||
              k == 0 ||
              k == this.dim - 1
            ) {
              this.cubies[i][j][k]?.show(PI);
            }
          }
        }
      }
    }
  }

  Turn() {
    var indices = [0, 0, 0];
    var lrs = this.current_var.layers;
    var d = 2 - this.current_var.dimension;
    var a = this.current_var.ammount;
    for (var i = 0; i < this.dim; i++) {
      if (this.isALayer(i, lrs)) {
        indices[d % 3] = d != 1 ? i : this.dim - i - 1;
        for (var j = 0; j < this.dim; j++) {
          indices[(d + 1) % 3] = j;
          for (var k = 0; k < this.dim; k++) {
            indices[(d + 2) % 3] = k;
            if (
              i == 0 ||
              j == 0 ||
              k == 0 ||
              i == this.dim - 1 ||
              j == this.dim - 1 ||
              k == this.dim - 1
            )
              this.turnCubie(this.getCubie(indices), this.current_var);
          }
        }
        switch (d) {
          case 0:
            this.turnXSlice(i, a);
            break;
          case 1:
            this.turnYSlice(this.dim - 1 - i, a);
            break;
          case 2:
            this.turnZSlice(i, a);
            break;
        }
      }
    }
  }
  turnXSlice(layer, ammount) {
    if (ammount == 0) {
      for (var i = 0; i < Math.ceil(this.dim / 2); i++) {
        for (var j = 0; j < Math.floor(this.dim / 2); j++) {
          if (i == 0 || j == 0 || layer == 0 || layer == this.dim - 1) {
            [
              this.cubies[layer][this.dim - 1 - j][i].config,
              this.cubies[layer][this.dim - 1 - i][this.dim - 1 - j].config,
              this.cubies[layer][j][this.dim - 1 - i].config,
              this.cubies[layer][i][j].config,
            ] = [
                this.cubies[layer][this.dim - 1 - i][this.dim - 1 - j].config,
                this.cubies[layer][j][this.dim - 1 - i].config,
                this.cubies[layer][i][j].config,
                this.cubies[layer][this.dim - 1 - j][i].config,
              ];
          }
        }
      }
    } else {
      for (var n = 0; n < ammount; n++) {
        for (var i = 0; i < Math.ceil(this.dim / 2); i++) {
          for (var j = 0; j < Math.floor(this.dim / 2); j++) {
            if (i == 0 || j == 0 || layer == 0 || layer == this.dim - 1) {
              [
                this.cubies[layer][this.dim - 1 - j][i].config,
                this.cubies[layer][this.dim - 1 - i][this.dim - 1 - j].config,
                this.cubies[layer][j][this.dim - 1 - i].config,
                this.cubies[layer][i][j].config,
              ] = [
                  this.cubies[layer][i][j].config,
                  this.cubies[layer][this.dim - 1 - j][i].config,
                  this.cubies[layer][this.dim - 1 - i][this.dim - 1 - j].config,
                  this.cubies[layer][j][this.dim - 1 - i].config,
                ];
            }
          }
        }
      }
    }
  }
  turnYSlice(layer, ammount) {
    if (ammount == 0) {
      for (var i = 0; i < Math.ceil(this.dim / 2); i++) {
        for (var j = 0; j < Math.floor(this.dim / 2); j++) {
          if (i == 0 || j == 0 || layer == 0 || layer == this.dim - 1) {
            [
              this.cubies[this.dim - 1 - j][layer][i].config,
              this.cubies[this.dim - 1 - i][layer][this.dim - 1 - j].config,
              this.cubies[j][layer][this.dim - 1 - i].config,
              this.cubies[i][layer][j].config,
            ] = [
                this.cubies[this.dim - 1 - i][layer][this.dim - 1 - j].config,
                this.cubies[j][layer][this.dim - 1 - i].config,
                this.cubies[i][layer][j].config,
                this.cubies[this.dim - 1 - j][layer][i].config,
              ];
          }
        }
      }
    } else {
      for (var n = 0; n < ammount; n++) {
        for (var i = 0; i < Math.ceil(this.dim / 2); i++) {
          for (var j = 0; j < Math.floor(this.dim / 2); j++) {
            if (i == 0 || j == 0 || layer == 0 || layer == this.dim - 1) {
              [
                this.cubies[this.dim - 1 - j][layer][i].config,
                this.cubies[this.dim - 1 - i][layer][this.dim - 1 - j].config,
                this.cubies[j][layer][this.dim - 1 - i].config,
                this.cubies[i][layer][j].config,
              ] = [
                  this.cubies[i][layer][j].config,
                  this.cubies[this.dim - 1 - j][layer][i].config,
                  this.cubies[this.dim - 1 - i][layer][this.dim - 1 - j].config,
                  this.cubies[j][layer][this.dim - 1 - i].config,
                ];
            }
          }
        }
      }
    }
  }
  turnZSlice(layer, ammount) {
    if (ammount == 0) {
      for (var i = 0; i < Math.ceil(this.dim / 2); i++) {
        for (var j = 0; j < Math.floor(this.dim / 2); j++) {
          if (i == 0 || j == 0 || layer == 0 || layer == this.dim - 1) {
            [
              this.cubies[this.dim - 1 - j][i][layer].config,
              this.cubies[this.dim - 1 - i][this.dim - 1 - j][layer].config,
              this.cubies[j][this.dim - 1 - i][layer].config,
              this.cubies[i][j][layer].config,
            ] = [
                this.cubies[i][j][layer].config,
                this.cubies[this.dim - 1 - j][i][layer].config,
                this.cubies[this.dim - 1 - i][this.dim - 1 - j][layer].config,
                this.cubies[j][this.dim - 1 - i][layer].config,
              ];
          }
        }
      }
    } else {
      for (var n = 0; n < ammount; n++) {
        for (var i = 0; i < Math.ceil(this.dim / 2); i++) {
          for (var j = 0; j < Math.floor(this.dim / 2); j++) {
            if (i == 0 || j == 0 || layer == 0 || layer == this.dim - 1) {
              [
                this.cubies[this.dim - 1 - j][i][layer].config,
                this.cubies[this.dim - 1 - i][this.dim - 1 - j][layer].config,
                this.cubies[j][this.dim - 1 - i][layer].config,
                this.cubies[i][j][layer].config,
              ] = [
                  this.cubies[this.dim - 1 - i][this.dim - 1 - j][layer].config,
                  this.cubies[j][this.dim - 1 - i][layer].config,
                  this.cubies[i][j][layer].config,
                  this.cubies[this.dim - 1 - j][i][layer].config,
                ];
            }
          }
        }
      }
    }
  }

  turnCubie(cubie, move) {
    var a = move.ammount;
    switch (move.dimension) {
      case 0:
        cubie.config.rotateZ(a == 0);
        if (a == 2) {
          cubie.config.rotateZ(a == 0);
        }
        break;
      case 1:
        cubie.config.rotateY(a != 0);
        if (a == 2) {
          cubie.config.rotateY(a != 0);
        }
        break;
      case 2:
        cubie.config.rotateX(a == 0);
        if (a == 2) {
          cubie.config.rotateX(a == 0);
        }
        break;
    }
  }

  getCubie(indices) {
    return this.cubies[indices[0]][indices[1]][indices[2]];
  }

  isALayer(l, layers) {
    for (var i = 0; i < layers.length; i++) {
      if (l == layers[i]) {
        return true;
      }
    }

    return false;
  }

  cloneCubies() {
    var new_cubies = [];
    for (var i = 0; i < this.dim; i++) {
      var slice = [];
      for (var j = 0; j < this.dim; j++) {
        var line = [];
        for (var k = 0; k < this.dim; k++) {
          line.push(this.cubies[i][j][k]?.copy());
        }
        slice.push(line);
      }
      new_cubies.push(slice);
    }
    return new_cubies;
  }

  scramble() {
    let prev = 0;
    for (var i = 0; i < this.dim * Math.ceil(Math.sqrt(this.dim)) * 5; i++) {
      var rn = Math.floor(Math.random() * (this.dim - (this.dim % 2) - 1));
      if (rn >= prev) rn++;
      if (this.dim % 2 == 1 && rn >= (this.dim - 1) / 2) rn++;
      this.qeue.push(
        Move(Math.floor(Math.random() * 3), [rn], Math.floor(Math.random() * 3))
      );
      prev = rn;
    }
    this.isScrambling = true;
  }

  moveX(ammount) {
    var numbers = [];
    for (var i = 0; i < this.dim; i++) {
      numbers[i] = i;
    }
    this.qeue.push(Move(2, numbers, ammount));
    this.pos.config.rotateX(ammount == 0);
    if (ammount == 2) {
      this.pos.config.rotateX(ammount == 0);
    }
  }
  moveY(ammount) {
    var numbers = [];
    for (var i = 0; i < this.dim; i++) {
      numbers[i] = i;
    }
    this.qeue.push(Move(1, numbers, ammount));
    this.pos.config.rotateY(ammount != 0);
    if (ammount == 2) {
      this.pos.config.rotateY(ammount != 0);
    }
  }
  moveZ(ammount) {
    var numbers = [];
    for (var i = 0; i < this.dim; i++) {
      numbers[i] = i;
    }
    this.qeue.push(Move(0, numbers, ammount));
    this.pos.config.rotateZ(ammount != 0);
    if (ammount == 2) {
      this.pos.config.rotateZ(ammount != 0);
    }
  }
  getFaces() {
    var sides = [];
    for (let i = 0; i < 6; i++) {
      sides.push([]);
      for (let j = 0; j < this.dim; j++) sides[i].push(new Array(this.dim));
    }
    for (var i = 0; i < this.dim; i++) {
      for (var j = 0; j < this.dim; j++) {
        sides[0][i][j] = this.getCubie([i, this.dim - 1, j]).config.sideColors[U];
        sides[5][i][j] = this.getCubie([i, 0, this.dim - 1 - j]).config.sideColors[D];
        sides[1][i][j] = this.getCubie([i, this.dim - 1 - j, this.dim - 1]).config.sideColors[F];
        sides[3][i][j] = this.getCubie([this.dim - 1 - i, this.dim - 1 - j, 0]).config.sideColors[B];
        sides[2][i][j] = this.getCubie([0, this.dim - 1 - j, i]).config.sideColors[L];
        sides[4][i][j] = this.getCubie([this.dim - 1, this.dim - 1 - j, this.dim - i - 1]).config.sideColors[R];
      }
    }
    return sides;
  }
  dim() {
    return this.dim;
  }
}

const Move = (d, l, dir) => {
  return {
    layers: l,
    dimension: d,
    ammount: dir,
  };
};
