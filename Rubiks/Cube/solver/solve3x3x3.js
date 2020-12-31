var edges = [[5, 1], [5, 2], [5, 3], [5, 4], [1, 2], [2, 3], [3, 4], [4, 1], [0, 1], [0, 2], [0, 3], [0, 4]];

var whiteCross = [
    "", "L2U'F2", "B2U2F2", "R2UF2", "D'LD", "D2BD2", "DRD'", "F", "F2", "U'F2", "U2F2", "UF2",
    "FD'LD", "L'F'", "B'D'L'D", "RF", "F'", "D'L'D", "D2B'D2", "DR'D'", "F'D'LD", "LF'L'", "BD'L'DB'", "R'FR"
];

var F2LCorners = ["", "U'", "U2", "U", "FUF'U'", "LU'L'U'", "R'U2R", "RUR'"];
var F2LEdges = ["U'FU'F'U2", "LUL'", "R'URU'", "F'U'F"];
var F2LMoves = [
    "LUFU'F'L'FU'F'", "FU2F'U'FUF'", "L'U2LUL'U'L", "FUF'U2FUF'U'FUF'", "U'L'U2LU'L'UL", "FU'F'U2FUF'", "L'ULU2L'U'L", "UFU2F'UFU'F'",
    "U'FU2F'UL'U'L", "UFU'F'", "UL'ULU'L'U'L", "FUF'U2FU'F'UFU'F'", "L'U'L", "U'FU2F'U2FU'F'", "UL'U'LU'L'U'L", "U'FUF'U'FU2F'",
    "FU'F'U2L'U'L", "U'FU'F'UFUF'", "U'L'UL", "FU'F'UFU'F'U2FU'F'", "UL'U'LU2L'UL", "U'FUF'UFUF'", "UL'U2LU2L'UL", "FUF'"
];

var yellowCross = ["LFUF'U'L'", "LUFU'F'L'", "LFUF'U'L'lFUF'U'l'"];

var OLLCases = [[0, 0, 0, 0], [1, 1, 1, 0], [0, 2, 2, 2], [2, 1, 2, 1], [2, 1, 1, 2], [1, 2, 0, 0], [0, 2, 1, 0], [0, 1, 0, 2]];
var OLL = ["", "L'URU'LUR'", "RU'L'UR'U'L", "R'U'RU'R'URU'R'U2R", "R'U2R2UR2UR2U2R'", "rUR'U'r'FRF'", "R2D'RU2R'DRU2R", "F'rUR'U'r'FR"];

var PLLCases = [
    [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4], [1, 2, 1, 3, 3, 2, 2, 4, 4, 4, 1, 3], [1, 4, 1, 3, 1, 2, 2, 2, 4, 4, 3, 3], [1, 1, 4, 2, 4, 2, 4, 3, 3, 3, 2, 1], [1, 1, 1, 3, 4, 2, 2, 3, 4, 4, 2, 3],
    [1, 2, 3, 4, 3, 2, 3, 4, 1, 2, 1, 4], [1, 1, 1, 2, 4, 2, 3, 2, 3, 4, 3, 4], [1, 1, 1, 2, 3, 2, 3, 4, 3, 4, 2, 4], [1, 3, 1, 2, 4, 2, 3, 1, 3, 4, 2, 4], [1, 2, 1, 2, 1, 2, 3, 4, 3, 4, 3, 4],
    [1, 1, 3, 4, 3, 2, 3, 2, 1, 2, 4, 4], [1, 1, 3, 4, 2, 2, 3, 4, 1, 2, 3, 4], [1, 2, 4, 2, 1, 2, 4, 3, 3, 3, 4, 1], [1, 3, 4, 4, 1, 2, 2, 2, 1, 3, 4, 3], [1, 1, 3, 3, 3, 2, 4, 4, 4, 2, 2, 1],
    [1, 3, 3, 3, 2, 2, 4, 4, 4, 2, 1, 1], [1, 1, 3, 4, 4, 2, 3, 3, 1, 2, 2, 4], [1, 3, 3, 4, 2, 2, 3, 1, 1, 2, 4, 4], [1, 4, 1, 3, 3, 2, 2, 1, 4, 4, 2, 3], [1, 3, 1, 3, 4, 2, 2, 2, 4, 4, 1, 3],
    [1, 3, 1, 3, 1, 2, 2, 4, 4, 4, 2, 3], [1, 2, 1, 3, 4, 2, 2, 1, 4, 4, 3, 3]
];
var PLL = [
    "", "XRU'RD2R'URD2R2X'", "XL'UL'D2LU'L'D2L2X'", "RUR'U'R'FR2U'R'U'RUR'F'", "R'URU'R2F'U'FURFR'F'R2U'", "R'UL'D2LU'RL'UR'D2RU'L", "LU'LULULU'L'U'L2", "R'UR'U'R'U'R'URUR2", "M2UM2U2M2UM2",
    "M2U'M2U'MU2M2U2MU2", "F2DR2UR2D'R'U'RF2R'UR", "R'UR'U'B'R'B2U'B'UB'RBR", "U'R'U2RU2R'FRUR'U'R'F'R2", "ULU2L'U2LF'L'U'LULFL2", "L'UR'U2LU'L'U2LR", "RU'LU2R'URU2R'L'", "L'UR'U2LU'RL'UR'U2LU'R",
    "RU'LU2R'UL'RU'LU2R'UL'", "L'R'U2LRYLU'RU2L'UR'Y'", "LU'RU2L'UR'YL'R'U2LRY'", "R'UL'U2RU'LYLRU2L'R'Y'", "LRU2L'R'Y'R'UL'U2RU'LY"
];

var state3x3x3;
var pllCount = 0;

function solveAs3x3x3(cube, state) {
    if (!cubeOrientated) {
        orientate(cube, U, state3x3x3[1]);
    } else {
        var dim = cube.dim;
        var last = dim - 1;
        var madeSomething = false;
        if (state3x3x3[0] == 0) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 4; j++) {
                    if (!madeSomething) {
                        var goal = [5, state3x3x3[1]];
                        var edge = getEdge(state, [i, j]);
                        if (edge[0] == goal[0] && edge[1] == goal[1]) {
                            decode(cube, whiteCross[4 * i + j]);
                            madeSomething = true;
                        } else if (edge[0] == goal[1] && edge[1] == goal[0]) {
                            decode(cube, whiteCross[12 + 4 * i + j]);
                            madeSomething = true;
                        }
                    }
                }
            }
            if (madeSomething) {
                state3x3x3[1]++;
                cubeOrientated = false;
                if (state3x3x3[1] == 5) {
                    state3x3x3 = [1, 1];
                }
            }
        } else if (state3x3x3[0] == 1) {
            var currentCorner = [5, cube.pos.config.sideColors[L], cube.pos.config.sideColors[F]];
            var currentEdge = [cube.pos.config.sideColors[F], cube.pos.config.sideColors[L]];
            if (currentCorner[0] == getCorner(state, [1, 0])[0] && currentCorner[1] == getCorner(state, [1, 0])[1] && currentCorner[2] == getCorner(state, [1, 0])[2] && currentEdge[1] == getEdge(state, [1, 0])[1] && currentEdge[0] == getEdge(state, [1, 0])[0]) {
                madeSomething = true;
                state3x3x3[1]++;
                if (state3x3x3[1] > 4) {
                    state3x3x3 = [2, 1];
                }
            }
            for (var i = 0; i < 3; i++) {
                var current;
                for (var j = 1; j < 8; j++) {
                    var x = j, y = 0;
                    if (x > 3) {
                        x -= 4;
                        y = 1;
                    }
                    current = getCorner(state, [y, x]);
                    if (current[0] == currentCorner[i] && current[1] == currentCorner[(1 + i) % 3] && current[2] == currentCorner[(i + 2) % 3] && !madeSomething) {
                        decode(cube, F2LCorners[j]);
                        madeSomething = true;
                    }
                }
            }
            for (var i = 0; i < 2; i++) {
                var current;
                for (var j = 0; j < 4; j++) {
                    current = getEdge(state, [1, j]);
                    if (current[0] == currentEdge[i] && current[1] == currentEdge[(1 + i) % 2] && !madeSomething) {
                        decode(cube, F2LEdges[j]);
                        madeSomething = true;
                    }
                }
            }
            for (var cOr = 0; cOr < 3; cOr++) {
                for (var edPos = 0; edPos < 4; edPos++) {
                    for (var edOr = 0; edOr < 2; edOr++) {
                        if (!madeSomething) {
                            var cCor = getCorner(state, [0, 0]);
                            var cEd = getEdge(state, [2, edPos]);
                            if (cCor[0] == currentCorner[cOr] && cCor[1] == currentCorner[(1 + cOr) % 3] && cCor[2] == currentCorner[(cOr + 2) % 3] && cEd[0] == currentEdge[edOr] && cEd[1] == currentEdge[(1 + edOr) % 2] && !madeSomething) {
                                decode(cube, F2LMoves[8 * cOr + 2 * edPos + edOr]);
                                madeSomething = true;
                                cubeOrientated = false;
                                state3x3x3[1]++;
                                if (state3x3x3[1] > 4) {
                                    state3x3x3 = [2, 1];
                                }
                            }
                        }
                    }
                }
            }
        } else if (state3x3x3[0] == 2) {
            var up = state[0][1][0] == 0;
            var down = state[0][1][last] == 0;
            var left = state[0][0][1] == 0;
            var right = state[0][last][1] == 0;
            if (dim % 2 == 0 && ((up) + (down) + (left) + (right)) % 2 == 1) {
                var p = new Array(dim / 2), n = new Array(dim / 2);
                for (var i = 0; i < dim / 2; i++) {
                    p[i] = i;
                    n[i] = dim - i - 1;
                }
                cube.qeue.push(move(2, p, 2));
                decode(cube, "B2U2");
                cube.qeue.push(move(2, n, 1));
                decode(cube, "U2");
                cube.qeue.push(move(2, p, 1));
                decode(cube, "U2");
                cube.qeue.push(move(2, p, 0));
                decode(cube, "U2F2");
                cube.qeue.push(move(2, p, 0));
                decode(cube, "F2");
                cube.qeue.push(move(2, n, 0));
                decode(cube, "B2");
                cube.qeue.push(move(2, p, 2));
                madeSomething = true;
            } else {
                if (up && down && left && right) {
                    state3x3x3 = [3, 1];
                } else if (up && down && !left && !right) {
                    madeSomething = true;
                    decode(cube, yellowCross[0]);
                } else if (up && !down && !left && right) {
                    madeSomething = true;
                    decode(cube, yellowCross[1]);
                } else if (!up && !down && !left && !right) {
                    madeSomething = true;
                    decode(cube, yellowCross[2]);
                } else {
                    madeSomething = true;
                    decode(cube, "U");
                }
            }
        } else if (state3x3x3[0] == 3) {
            var cornerOrientations = new Array(4);
            for (var j = 0; j < 4; j++) {
                var current;
                for (var i = 0; i < 3; i++) {
                    var x = j, y = 0;
                    current = getCorner(state, [y, x]);
                    if (current[i] == 0 && !madeSomething) {
                        cornerOrientations[j] = i;
                    }
                }
            }
            for (var i = 0; i < OLLCases.length; i++) {
                if (cornerOrientations[0] == OLLCases[i][0] && cornerOrientations[1] == OLLCases[i][1] && cornerOrientations[2] == OLLCases[i][2] && cornerOrientations[3] == OLLCases[i][3]) {
                    madeSomething = true;
                    decode(cube, OLL[i]);
                    state3x3x3[0] = 4;
                }
            }
            if (state3x3x3[0] == 3) {
                decode(cube, "U");
            }
        } else/*if (state3x3x3[0] == 4)*/ {
            var layer = getLLStrip(state);
            var currentColor1 = layer[0];
            for (var i = 0; i < layer.length; i++) {
                layer[i] = (layer[i] - 1 + 3 * (currentColor1 - 1)) % 4 + 1;
            }
            var match = false;
            for (var i = 0; i < PLL.length; i++) {
                var stripMatches = true;
                for (var j = 0; j < layer.length; j++) {
                    if (stripMatches) {
                        stripMatches = layer[j] == PLLCases[i][j];
                    }
                }
                if (stripMatches) {
                    match = true;
                    madeSomething = true;
                    decode(cube, PLL[i]);
                    if (i == 0) {
                        if (currentColor1 == 2) {
                            decode(cube, "U");
                        }
                        if (currentColor1 == 3) {
                            decode(cube, "U2");
                        }
                        if (currentColor1 == 4) {
                            decode(cube, "U'");
                        }
                        cube.isSolving = false;
                    }
                }
            }
            if (!match) {
                pllCount++;
                if (pllCount == 4) {
                    pllCount = 0;
                    var p = new Array(dim / 2 - 1), n = new Array(dim / 2);
                    for (var j = 1; j < dim / 2; j++) {
                        p[j - 1] = j;
                        n[j - 1] = j - 1;
                    }
                    n[dim / 2 - 1] = dim / 2 - 1;
                    cube.qeue.push(move(2, p, 2));
                    decode(cube, "U2");
                    cube.qeue.push(move(2, p, 2));
                    cube.qeue.push(move(1, n, 2));
                    cube.qeue.push(move(2, p, 2));
                    cube.qeue.push(move(1, n, 2));
                    madeSomething = true;
                }
            }
            if (!madeSomething) {
                decode(cube, "U");
            }
        }
    }
}

function getLLStrip(state) {
    var dim = state[0].length;
    var last = dim - 1;
    var strip = new Array(12);
    for (var i = 1; i < 5; i++) {
        strip[3 * (i - 1)] = state[i][0][0];
        strip[3 * (i - 1) + 1] = state[i][1][0];
        strip[3 * (i - 1) + 2] = state[i][last][0];
    }


    return strip;
}


function getCorner(state, pos) {
    var dim = state[0].length;
    var last = dim - 1;
    r = [0, 0, 0];
    if (pos[0] == 0) {
        if (pos[1] == 0) {
            r[0] = state[0][0][last];
            r[1] = state[1][0][0];
            r[2] = state[2][last][0];
        } else if (pos[1] == 1) {
            r[0] = state[0][0][0];
            r[1] = state[2][0][0];
            r[2] = state[3][last][0];
        } else if (pos[1] == 2) {
            r[0] = state[0][last][0];
            r[1] = state[3][0][0];
            r[2] = state[4][last][0];
        } else {
            r[0] = state[0][last][last];
            r[1] = state[4][0][0];
            r[2] = state[1][last][0];
        }
    } else {
        if (pos[1] == 0) {
            r[0] = state[5][0][0];
            r[2] = state[1][0][last];
            r[1] = state[2][last][last];
        } else if (pos[1] == 1) {
            r[0] = state[5][0][last];
            r[2] = state[2][0][last];
            r[1] = state[3][last][last];
        } else if (pos[1] == 2) {
            r[0] = state[5][last][last];
            r[2] = state[3][0][last];
            r[1] = state[4][last][last];
        } else {
            r[0] = state[5][last][0];
            r[2] = state[4][0][last];
            r[1] = state[1][last][last];
        }
    }
    return r;
}
function getEdge(state, pos) {
    var dim = state[0].length;
    var last = dim - 1;
    var r = [0, 0];

    if (pos[0] == 0) {
        if (pos[1] == 0) {
            r[0] = state[5][1][0];
            r[1] = state[1][1][last];
        } else if (pos[1] == 1) {
            r[0] = state[5][0][1];
            r[1] = state[2][1][last];
        } else if (pos[1] == 2) {
            r[0] = state[5][1][last];
            r[1] = state[3][1][last];
        } else {
            r[0] = state[5][last][1];
            r[1] = state[4][1][last];
        }
    } else if (pos[0] == 1) {
        if (pos[1] == 0) {
            r[0] = state[1][0][1];
            r[1] = state[2][last][1];
        } else if (pos[1] == 1) {
            r[0] = state[2][0][1];
            r[1] = state[3][last][1];
        } else if (pos[1] == 2) {
            r[0] = state[3][0][1];
            r[1] = state[4][last][1];
        } else {
            r[0] = state[4][0][1];
            r[1] = state[1][last][1];
        }
    } else {
        if (pos[1] == 0) {
            r[0] = state[0][1][last];
            r[1] = state[1][1][0];
        } else if (pos[1] == 1) {
            r[0] = state[0][0][1];
            r[1] = state[2][1][0];
        } else if (pos[1] == 2) {
            r[0] = state[0][1][0];
            r[1] = state[3][1][0];
        } else {
            r[0] = state[0][last][1];
            r[1] = state[4][1][0];
        }
    }
    return r;
}

function decode(cube, notation) {
    var dim = cube.dim;
    var last = dim - 1;
    var codes = notation.split(/(?=[A-Z]|[a-z])/);
    for (var i = 0; i < codes.length; i++) {
        switch (codes[i]) {
            case "L":
                cube.qeue.push(move(2, [0], 1));
                break;
            case "L'":
                cube.qeue.push(move(2, [0], 0));
                break;
            case "L2":
                cube.qeue.push(move(2, [0], 2));
                break;
            case "R":
                cube.qeue.push(move(2, [last], 0));
                break;
            case "R'":
                cube.qeue.push(move(2, [last], 1));
                break;
            case "R2":
                cube.qeue.push(move(2, [last], 2));
                break;
            case "B":
                cube.qeue.push(move(0, [0], 0));
                break;
            case "B'":
                cube.qeue.push(move(0, [0], 1));
                break;
            case "B2":
                cube.qeue.push(move(0, [0], 2));
                break;
            case "F":
                cube.qeue.push(move(0, [last], 1));
                break;
            case "F'":
                cube.qeue.push(move(0, [last], 0));
                break;
            case "F2":
                cube.qeue.push(move(0, [last], 2));
                break;
            case "U":
                cube.qeue.push(move(1, [0], 1));
                break;
            case "U'":
                cube.qeue.push(move(1, [0], 0));
                break;
            case "U2":
                cube.qeue.push(move(1, [0], 2));
                break;
            case "D":
                cube.qeue.push(move(1, [last], 0));
                break;
            case "D'":
                cube.qeue.push(move(1, [last], 1));
                break;
            case "D2":
                cube.qeue.push(move(1, [last], 2));
                break;
            case "l":
                cube.moveX(1);
                cube.qeue.push(move(2, [last], 0));
                break;
            case "l'":
                cube.moveX(0);
                cube.qeue.push(move(2, [last], 1));
                break;
            case "l2":
                cube.moveX(2);
                cube.qeue.push(move(2, [last], 2));
                break;
            case "r":
                cube.moveX(0);
                cube.qeue.push(move(2, [0], 1));
                break;
            case "r'":
                cube.moveX(1);
                cube.qeue.push(move(2, [0], 0));
                break;
            case "r2":
                cube.moveX(2);
                cube.qeue.push(move(2, [0], 2));
                break;
            case "b":
                cube.moveZ(0);
                cube.qeue.push(move(0, [last], 1));
                break;
            case "b'":
                cube.moveZ(1);
                cube.qeue.push(move(0, [last], 0));
                break;
            case "b2":
                cube.moveZ(2);
                cube.qeue.push(move(0, [last], 2));
                break;
            case "f":
                cube.moveZ(1);
                cube.qeue.push(move(0, [0], 0));
                break;
            case "f'":
                cube.moveZ(0);
                cube.qeue.push(move(0, [0], 1));
                break;
            case "f2":
                cube.moveZ(2);
                cube.qeue.push(move(0, [0], 2));
                break;
            case "Y":
                cube.moveY(1);
                break;
            case "Y'":
                cube.moveY(0);
                break;
            case "Y2":
                cube.moveY(2);
                break;
            case "X":
                cube.moveX(1);
                break;
            case "X'":
                cube.moveX(0);
                break;
            case "X2":
                cube.moveX(2);
                break;
            case "Z":
                cube.moveZ(1);
                break;
            case "Z'":
                cube.moveZ(0);
                break;
            case "Z2":
                cube.moveZ(2);
                break;
            case "M":
                cube.qeue.push(move(2, [0], 0));
                cube.qeue.push(move(2, [last], 0));
                cube.moveX(1);
                break;
            case "M'":
                cube.qeue.push(move(2, [0], 1));
                cube.qeue.push(move(2, [last], 1));
                cube.moveX(0);
                break;
            case "M2":
                cube.qeue.push(move(2, [0], 2));
                cube.qeue.push(move(2, [last], 2));
                cube.moveX(2);
                break;
        }
    }
}

var move = Move;