var cubeOrientated;
var edgesSolved;
var edgesState;

function solve(cube) {
  const state = cube.getFaces();
  if (!cube.isSolving) {
    centersLeft = 6;
    centersState = [0, 0];
    rowDown = false;
    cube.isSolving = true;
    centersSolved = [false, false, false, false, false, false,];
    allCentersSolved = false;
    state3x3x3 = [0, 1];
    edgesSolved = false;
    edgesState = [0, 0];
    edgesLeft = 12;
    cubeOrientated = false;
    checkCentersSolved(state);
    pllCount = 0;
  }
  if (!allCentersSolved) {
    solveCenters(cube, state);
  } else if (!edgesSolved) {
    // Solve edges
    solve_edges(cube, state);
    cubeOrientated = false;
  } else {
    //Solve as 3x3x3
    solveAs3x3x3(cube, state);
    // cube.solve_animation_time = 0;
  }
}

function X(cube, layer, direction) {
  cube.qeue.push(Move(2, [layer], direction));
}
function Y(cube, layer, direction) {
  cube.qeue.push(Move(1, [layer], direction));
}
function Z(cube, layer, direction) {
  cube.qeue.push(Move(0, [layer], direction));
}



function orientate(cube, u, f) {
  if (whereIsTheCenter(cube, u) == 1) {
    cube.moveX(0);
  } else if (whereIsTheCenter(cube, u) == 2) {
    cube.moveZ(1);
  } else if (whereIsTheCenter(cube, u) == 3) {
    cube.moveX(1);
  } else if (whereIsTheCenter(cube, u) == 4) {
    cube.moveZ(0);
  } else if (whereIsTheCenter(cube, u) == 5) {
    cube.moveX(2);
  } else {
    if (whereIsTheCenter(cube, f) == 2) {
      cube.moveY(0);
    } else if (whereIsTheCenter(cube, f) == 3) {
      cube.moveY(2);
    } else if (whereIsTheCenter(cube, f) == 4) {
      cube.moveY(1);
    } else {
      cubeOrientated = true;
    }
  }
}
function whereIsTheCenter(cube, col) {
  var r = 0;
  for (let i = 0; i < 6; i++) {
    if (col == cube.pos.config.sideColors[i]) {
      r = i;
    }
  }
  return r;
}