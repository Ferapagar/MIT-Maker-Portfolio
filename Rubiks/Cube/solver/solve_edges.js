var edgesLeft;

function getEdges( layout) {
  var dim = layout[0].length;
  var edges = [];
  for (var i = 0; i < 12; i++) edges.push([new Array(dim-2), new Array(dim-2)]);
  for (var i = 1; i < dim-1; i++) {
    edges[0][0][i - 1] = layout[0][i][dim-1];
    edges[0][1][i - 1] = layout[1][i][0];

    edges[1][0][i - 1] = layout[4][0][i];
    edges[1][1][i - 1] = layout[1][dim-1][i];

    edges[2][0][i - 1] = layout[5][dim - 1 - i][0];
    edges[2][1][i - 1] = layout[1][dim - 1 - i][dim - 1];

    edges[3][0][i - 1] = layout[2][dim-1][i];
    edges[3][1][i - 1] = layout[1][0][i];

    edges[4][0][i - 1] = layout[0][0][i];
    edges[4][1][i - 1] = layout[2][i][0];

    edges[5][0][i - 1] = layout[0][dim - 1][dim - 1 - i];
    edges[5][1][i - 1] = layout[4][i][0];

    edges[6][0][i - 1] = layout[5][0][i];
    edges[6][1][i - 1] = layout[2][dim - 1 - i][dim - 1];

    edges[7][0][i - 1] = layout[5][dim - 1][dim - 1 - i];
    edges[7][1][i - 1] = layout[4][dim - 1 - i][dim - 1];

    edges[8][0][i - 1] = layout[3][dim - 1 - i][0];
    edges[8][1][i - 1] = layout[0][i][0];

    edges[9][0][i - 1] = layout[4][dim - 1][i];
    edges[9][1][i - 1] = layout[3][0][i];

    edges[10][0][i - 1] = layout[5][dim - 1 - i][dim -  1];
    edges[10][1][i - 1] = layout[3][i][dim - 1];

    edges[11][0][i - 1] = layout[2][0][i];
    edges[11][1][i - 1] = layout[3][dim - 1][i];
  }
  return edges;
}


function solve_edges(cube,  state) {
  var edges = getEdges(state);
  var dim = cube.dim;
  var madeSomething = false;
  calculateEdgesLeft(edges);
  if (!edgeIsSolved(edges[0])) {
    var edge = edges[0];
    var currentColor = 6 * edge[0][Math.floor((dim-3)/2)] + edge[1][Math.floor((dim-3)/2)];
    var reverseColor = edge[0][Math.floor((dim-3)/2)] + 6 * edge[1][Math.floor((dim-3)/2)];
    if (hasColor(currentColor, edges[8])) {
      var where = whereAreTheColors(currentColor, edges[8]);
      if (edgesLeft == 2) {
        var w = dim - 1 - where[0];
        madeSomething = true;
        decode(cube, "BU'LUY2");
        cube.qeue.push(move(2, [w], 1));
        decode(cube, "U'R'UF'UFU'");
        cube.qeue.push(move(2, [w], 0));
        decode(cube, "Y2");
      } else {
        if (!edgeIsSolved(edges[4])) {
          madeSomething = true;
          cube.qeue.push(move(2, where, 1));
          decode(cube, "F'LF");
          cube.qeue.push(move(2, where, 0));
          decode(cube, "L'F");
        } else {
          for (var i = 1; i < 12; i++) {
            if (!madeSomething && i != 8 && !edgeIsSolved(edges[i])) {
              moveEdgeToSide(i, cube);
              madeSomething = true;
            }
          }
        }
      }
    } else if (hasColor(reverseColor, edges[8])) {
      madeSomething = true;
      decode(cube, "BU'LU");
    } else if (hasColor(reverseColor, edges[0])) {
      madeSomething = true;
      var p = whereAreTheColors(reverseColor, edges[0])[0];
      var n = dim - 1 - p;
      cube.qeue.push(move(2, [p], 2));
      decode(cube, "B2U2");
      cube.qeue.push(move(2, [n], 1));
      decode(cube, "U2");
      cube.qeue.push(move(2, [p], 1));
      decode(cube, "U2");
      cube.qeue.push(move(2, [p], 0));
      decode(cube, "U2F2");
      cube.qeue.push(move(2, [p], 0));
      decode(cube, "F2");
      cube.qeue.push(move(2, [n], 0));
      decode(cube, "B2");
      cube.qeue.push(move(2, [p], 2));
    } else {
      for (var i = 1; i < 12; i++) {
        if (!madeSomething && hasColor(currentColor, edges[i])) {
          moveReverseEdgeToBack(i, cube);
          madeSomething = true;
        }
        if (!madeSomething && hasColor(reverseColor, edges[i])) {
          moveEdgeToBack(i, cube);
          madeSomething = true;
        }
      }
    }
  } else {
    for (var i = 1; i < 12; i++) {
      if (!madeSomething && !edgeIsSolved(edges[i])) {
        madeSomething = true;
        moveEdgeToFront(i, cube);
      }
    }
  }
  if (!madeSomething) {
    edgesSolved = true;
  }
}

function calculateEdgesLeft(edges) {
  edgesLeft = 12;
  for (var i = 0; i < 12; i++) {
    edgesLeft -= edgeIsSolved(edges[i]);
  }
}
function moveEdgeToFront( id,  cube) {
  switch (id) {
    case(1):
    decode(cube, "F'");
    break;
    case(2):
    decode(cube, "F2");
    break;
    case(3):
    decode(cube, "F");
    break;
    case(4):
    decode(cube, "U'");
    break;
    case(5):
    decode(cube, "U");
    break;
    case(6):
    decode(cube, "L'F");
    break;
    case(7):
    decode(cube, "RF'");
    break;
    case(8):
    decode(cube, "U2");
    break;
    case(9):
    decode(cube, "R2F'");
    break;
    case(10):
    decode(cube, "D2F2");
    break;
    case(11):
    decode(cube, "L2F");
    break;
  }
}
function moveEdgeToSide( id,  cube) {
  switch (id) {
    case(1):
    decode(cube, "R'D2L2");
    break;
    case(2):
    decode(cube, "D'L2");
    break;
    case(3):
    decode(cube, "L'");
    break;
    case(5):
    decode(cube, "R2D2L2");
    break;
    case(6):
    decode(cube, "L2");
    break;
    case(7):
    decode(cube, "D2L2");
    break;
    case(9):
    decode(cube, "RD2L2");
    break;
    case(10):
    decode(cube, "DL2");
    break;
    case(11):
    decode(cube, "L");
    break;
  }
}

function moveEdgeToBack( id,  cube) {
  switch (id) {
    case(0):
    decode(cube, "FRU'");
    break;
    case(1):
    decode(cube, "R2B");
    break;
    case(2):
    decode(cube, "D2B2");
    break;
    case(3):
    decode(cube, "L2B'");
    break;
    case(4):
    decode(cube, "LUL'U'");
    break;
    case(5):
    decode(cube, "RU'R'U");
    break;
    case(6):
    decode(cube, "D'B2");
    break;
    case(7):
    decode(cube, "DB2");
    break;
    case(9):
    decode(cube, "B");
    break;
    case(10):
    decode(cube, "B2");
    break;
    case(11):
    decode(cube, "B'");
    break;
  }
}
function moveReverseEdgeToBack( id,  cube) {
  switch (id) {
    case(0):
    decode(cube, "U2");
    break;
    case(1):
    decode(cube, "R'DB2");
    break;
    case(2):
    decode(cube, "DR'B");
    break;
    case(3):
    decode(cube, "LD'B2");
    break;
    case(4):
    decode(cube, "L'B'");
    break;
    case(5):
    decode(cube, "RB");
    break;
    case(6):
    decode(cube, "LB'");
    break;
    case(7):
    decode(cube, "R'B");
    break;
    case(9):
    decode(cube, "UR'U'");
    break;
    case(10):
    decode(cube, "BUR'U'");
    break;
    case(11):
    decode(cube, "U'LU");
    break;
  }
}


function hasColor( c,  edge) {
  var dim = edge[0].length;
  for (var i = 0; i < dim; i++) {
    var cc = 6 * edge[0][i] + edge[1][i];
    if (c == cc) {
      return true;
    }
  }

  return false;
}
function whereAreTheColors( c,  edge) {
  var dim = edge[0].length;
  var where = [];
  for (var i = 0; i < dim; i++) {
    var cc = 6 * edge[0][i] + edge[1][i];
    if (c == cc) {
      var w = new Array(where.length+1);
      w[w.length - 1] = i+1;
      for (var j = 0; j < where.length; j++) {
        w[j] = where[j];
      }
      where = w;
    }
  }

  return where;
}

function edgeIsSolved( edge) {
  var a = edge[0][0], b = edge[1][0];
  for (var i = 1; i < edge[0].length; i++) {
    if (a!= edge[0][i] || b != edge[1][i]) {
      return false;
    }
  }
  return true;
}