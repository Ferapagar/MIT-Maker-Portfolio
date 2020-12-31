var centersSolved;
var allCentersSolved;
var centersState;
var rowDown;
var whichRowDown;
var centersLeft;
var canGoOn = true;

function solveCenters(cube, state) {
    var L = X, U = Y, F = Z;
    var dim = cube.dim;
    // Solve Centers
    if (!cubeOrientated) {
        orientate(cube, centersState[0], centersState[0] + 1);
    } else {
        canGoOn = true;
        checkUpperCenter(state);
        if (rowDown && whichRowDown != centersState[1] && centersLeft > 2) {
            L(cube, whichRowDown, 0);
            rowDown = false;
        }
        if (!rowDown && canGoOn && centersLeft > 2) {
            L(cube, centersState[1], 1);
            rowDown = true;
            whichRowDown = centersState[1];
        } else if (canGoOn && centersLeft > 2) {
            var last = dim - 1;
            var Xpos = centersState[1];
            var Xneg = dim - 1 - Xpos;
            var Ypos = centersState[2];
            var Yneg = dim - 1 - Ypos;
            var current = centersState[0];
            var change = (Xpos > dim / 2 - 1 || Ypos > dim / 2 - 1) && !(Xpos > dim / 2 - 1 && Ypos > dim / 2 - 1);
            if (state[2][Xpos][Ypos] == current) {
                U(cube, Ypos, 0);
                if (change) {
                    F(cube, last, 1);
                    U(cube, Ypos, 1);
                    F(cube, last, 0);
                } else {
                    F(cube, last, 0);
                    U(cube, Ypos, 1);
                    F(cube, last, 1);
                }
            } else if (state[4][Xpos][Ypos] == current) {
                U(cube, Ypos, 1);
                if (change) {
                    F(cube, last, 1);
                    U(cube, Ypos, 0);
                    F(cube, last, 0);
                } else {
                    F(cube, last, 0);
                    U(cube, Ypos, 0);
                    F(cube, last, 1);
                }
            } else if (state[2][Yneg][Xpos] == current) {
                L(cube, 0, 0);
            } else if (state[2][Ypos][Xneg] == current) {
                L(cube, 0, 1);
            } else if (state[2][Xneg][Yneg] == current) {
                L(cube, 0, 2);
            } else if (state[4][Yneg][Xpos] == current) {
                L(cube, last, 1);
            } else if (state[4][Ypos][Xneg] == current) {
                L(cube, last, 0);
            } else if (state[4][Xneg][Yneg] == current) {
                L(cube, last, 2);
            } else if (state[3][Xpos][Ypos] == current && !centersSolved[cube.pos.config.sideColors[3]]) {
                U(cube, Ypos, 2);
                if (change) {
                    F(cube, last, 1);
                    U(cube, Ypos, 2);
                    F(cube, last, 0);
                } else {
                    F(cube, last, 0);
                    U(cube, Ypos, 2);
                    F(cube, last, 1);
                }
            } else if (state[3][Yneg][Xpos] == current && !centersSolved[cube.pos.config.sideColors[3]]) {
                F(cube, 0, 1);
            } else if (state[3][Ypos][Xneg] == current && !centersSolved[cube.pos.config.sideColors[3]]) {
                F(cube, 0, 0);
            } else if (state[3][Xneg][Yneg] == current && !centersSolved[cube.pos.config.sideColors[3]]) {
                F(cube, 0, 2);
            } else if (state[5][Yneg][Xpos] == current && !centersSolved[cube.pos.config.sideColors[5]]) {
                F(cube, last, 1);
                L(cube, Yneg, 0);
                if (change) {
                    F(cube, last, 1);
                    L(cube, Yneg, 1);
                    F(cube, last, 2);
                } else {
                    F(cube, last, 0);
                    L(cube, Yneg, 1);
                }
            } else if (state[5][Xpos][Ypos] == current && !centersSolved[cube.pos.config.sideColors[5]]) {
                U(cube, last, 1);
            } else if (state[5][Ypos][Xneg] == current && !centersSolved[cube.pos.config.sideColors[5]]) {
                U(cube, last, 2);
            } else if (state[5][Xneg][Yneg] == current && !centersSolved[cube.pos.config.sideColors[5]]) {
                U(cube, last, 0);
            } else if (state[1][Ypos][Xneg] == current && Xpos != Ypos) {
                if (!centersSolved[cube.pos.config.sideColors[5]]) {
                    L(cube, Ypos, 1);
                    U(cube, last, 1);
                    L(cube, Ypos, 0);
                } else {
                    F(cube, last, 0);
                    U(cube, Yneg, 0);
                    L(cube, last, 1);
                    U(cube, Yneg, 1);
                    F(cube, last, 1);
                }
            } else if (state[1][Yneg][Xpos] == current && Xpos != Yneg) {
                if (!centersSolved[cube.pos.config.sideColors[5]]) {
                    L(cube, Yneg, 1);
                    U(cube, last, 1);
                    L(cube, Yneg, 0);
                } else {
                    F(cube, last, 1);
                    U(cube, Yneg, 0);
                    L(cube, last, 1);
                    U(cube, Yneg, 1);
                    F(cube, last, 0);
                }
            } else if (state[1][Xneg][Yneg] == current && Xpos != Xneg) {
                if (!centersSolved[cube.pos.config.sideColors[5]]) {
                    L(cube, Xneg, 1);
                    U(cube, last, 1);
                    L(cube, Xneg, 0);
                } else {
                    F(cube, last, 0);
                    U(cube, Xpos, 0);
                    L(cube, last, 1);
                    U(cube, Xpos, 1);
                    F(cube, last, 1);
                }
            } else if (state[0][Xpos][Ypos] == current) {
                if (!centersSolved[cube.pos.config.sideColors[5]]) {
                    L(cube, Xpos, 2);
                    U(cube, last, 1);
                    L(cube, Xpos, 2);
                } else {
                    U(cube, 0, 0);
                    F(cube, Xneg, 2);
                    L(cube, last, 1);
                    F(cube, Xneg, 2);
                    U(cube, 0, 1);
                }
            } else if (state[0][Xneg][Yneg] == current && Xpos <= Xneg) {
                if (!centersSolved[cube.pos.config.sideColors[5]]) {
                    L(cube, Xneg, 2);
                    U(cube, last, 1);
                    L(cube, Xneg, 2);
                } else {
                    U(cube, 0, 0);
                    F(cube, Xpos, 1);
                    L(cube, last, 1);
                    F(cube, Xpos, 0);
                    U(cube, 0, 1);
                }
            } else if (state[0][Yneg][Xpos] == current && Xpos <= Yneg) {
                if (!centersSolved[cube.pos.config.sideColors[5]]) {
                    L(cube, Yneg, 2);
                    U(cube, last, 1);
                    L(cube, Yneg, 2);
                } else {
                    U(cube, 0, 0);
                    F(cube, Ypos, 1);
                    L(cube, last, 1);
                    F(cube, Ypos, 0);
                    U(cube, 0, 1);
                }
            } else if (state[0][Ypos][Xneg] == current && Xpos <= Ypos) {
                if (!centersSolved[cube.pos.config.sideColors[5]]) {
                    L(cube, Ypos, 2);
                    U(cube, last, 1);
                    L(cube, Ypos, 2);
                } else {
                    U(cube, 0, 0);
                    F(cube, Yneg, 1);
                    L(cube, last, 1);
                    F(cube, Yneg, 0);
                    U(cube, 0, 1);
                }
            } else if (state[3][Xneg][Yneg] == current) {
                if (!centersSolved[cube.pos.config.sideColors[5]]) {
                    L(cube, Xpos, 0);
                    U(cube, last, 1);
                    L(cube, Xpos, 1);
                } else {
                    F(cube, 0, 1);
                    U(cube, Xneg, 1);
                    L(cube, last, 0);
                    U(cube, Xneg, 0);
                    F(cube, 0, 0);
                }
            } else if (state[3][Yneg][Xpos] == current) {
                if (!centersSolved[cube.pos.config.sideColors[5]]) {
                    L(cube, Ypos, 0);
                    U(cube, last, 2);
                    L(cube, Ypos, 1);
                } else {
                    F(cube, 0, 1);
                    U(cube, Yneg, 0);
                    L(cube, last, 0);
                    U(cube, Yneg, 1);
                    F(cube, 0, 0);
                }
            } else if (state[3][Ypos][Xneg] == current) {
                if (!centersSolved[cube.pos.config.sideColors[5]]) {
                    L(cube, Yneg, 0);
                    U(cube, last, 2);
                    L(cube, Yneg, 1);
                } else {
                    F(cube, 0, 1);
                    U(cube, Ypos, 1);
                    L(cube, last, 0);
                    U(cube, Ypos, 0);
                    F(cube, 0, 0);
                }
            } else if (state[5][Xpos][Ypos] == current) {
                U(cube, last, 1);
                F(cube, Xpos, 0);
                L(cube, last, 0);
                F(cube, Xpos, 1);
                U(cube, last, 0);
            } else if (state[5][Ypos][Xneg] == current) {
                U(cube, last, 1);
                F(cube, Xpos, 0);
                L(cube, last, 0);
                F(cube, Xpos, 1);
                U(cube, last, 0);
            } else if (state[5][Yneg][Xpos] == current) {
                U(cube, last, 1);
                F(cube, Xpos, 0);
                L(cube, last, 0);
                F(cube, Xpos, 1);
                U(cube, last, 0);
            } else {
                cubeOrientated = false;
            }
        } else if (centersLeft <= 2 && canGoOn && cubeOrientated) {
            var madeSomething = false;
            for (var i = Math.floor((cube.dim - 1) / 2); i > 0; i--) {
                for (var j = Math.floor((cube.dim - 1) / 2); j >= i; j--) {
                    for (var k = 0; k < 1 + (i != j); k++) {
                        if (!madeSomething) {
                            var Xpos = i;
                            var Ypos = cube.dim-1- j;
                            if (k == 1) [Xpos, Ypos] = [Ypos, Xpos];
                            var Xneg = dim - 1 - Xpos;
                            var Yneg = dim - 1 - Ypos;
                            var last = cube.dim - 1;
                            if (state[1][Xpos][Ypos] != cube.pos.config.sideColors[1]) {
                                if (state[0][Yneg][Xpos] == cube.pos.config.sideColors[1]) {
                                    F(cube, last, 1);
                                    L(cube, Yneg, 1);
                                    F(cube, last, 1);
                                    L(cube, Xneg, 1);
                                    F(cube, last, 0);
                                    L(cube, Yneg, 0);
                                    F(cube, last, 1);
                                    L(cube, Xneg, 0);
                                    F(cube, last, 0);
                                    madeSomething = true;
                                } else if (state[0][Xpos][Ypos] == cube.pos.config.sideColors[1]) {
                                    madeSomething = true;
                                    U(cube, 0, 1);
                                } else if (state[0][Xneg][Yneg] == cube.pos.config.sideColors[1]) {
                                    madeSomething = true;
                                    U(cube, 0, 0);
                                } else if (state[0][Ypos][Xneg] == cube.pos.config.sideColors[1]) {
                                    madeSomething = true;
                                    U(cube, 0, 2);
                                }
                            } else if (state[1][Yneg][Xpos] != cube.pos.config.sideColors[1]) {
                                madeSomething = true;
                                F(cube, last, 0);
                            } else if (state[1][Xneg][Yneg] != cube.pos.config.sideColors[1]) {
                                madeSomething = true;
                                F(cube, last, 2);
                            } else if (state[1][Ypos][Xneg] != cube.pos.config.sideColors[1]) {
                                madeSomething = true;
                                F(cube, last, 1);
                            }
                        }
                    }
                }
            }
            if (!madeSomething) {
                allCentersSolved = true;
                centersLeft = 0;
                centersSolved = [true, true, true, true, true, true];
            }
        }
    }
}

function checkUpperCenter(state) {
    var dim = state[0].length;
    var current = true;
    for (var i = 1; i < dim - 1; i++) {
        for (var j = 1; j < dim - 1; j++) {
            if (current) {
                if (rowDown && i == centersState[1]) {
                    current = state[1][i][j] == cube.pos.config.sideColors[U];
                    if (!current) {
                        centersState = [cube.pos.config.sideColors[U], i, j];
                    }
                } else {
                    current = state[0][i][j] == cube.pos.config.sideColors[U];
                    if (!current) {
                        centersState = [cube.pos.config.sideColors[U], i, j];
                    }
                }
            }
        }
    }
    if (current) {
        if (rowDown) {
            centersLeft--;
            X(cube, whichRowDown, 0);
            centersState = [cube.pos.config.sideColors[U] + 1, 0, 0];
            cubeOrientated = false;
            rowDown = false;
            centersSolved[cube.pos.config.sideColors[U]] = true;
        }
    }
}

function checkCentersSolved(state) {
    var dim = state[0].length;
    var current = true;
    for (var s = 0; s < 6; s++) {
        for (var i = 1; i < dim - 1; i++) {
            for (var j = 1; j < dim - 1; j++) {
                if (current) {
                    current = state[s][i][j] == cube.pos.config.sideColors[s];
                    if (!current) {
                        centersState = [s, i, j];
                    }
                }
            }
        }
        centersSolved[cube.pos.config.sideColors[s]] = current;
        if (current) {
            centersLeft--;
        }
    }
    if (current) {
        allCentersSolved = true;
    }
}