var layer = 0;
function keyPressed(key) {
    let dim = cube.dim;
    document.querySelector("#toolsicon").checked = false;

    if (!cube.isScrambling && !cube.isSolving) {
        switch (key) {
            case 's':
                cube.scramble();
                break;
            case 'S':
                solve(cube);
                break;
            case 'f':
                cube.qeue.push(Move(0, [dim - 1 - layer], 1));
                break;
            case 'F':
                cube.qeue.push(Move(0, [dim - 1 - layer], 0));
                break;
            case 'b':
                cube.qeue.push(Move(0, [layer], 1));
                break;
            case 'B':
                cube.qeue.push(Move(0, [layer], 0));
                break;
            case 'u':
                cube.qeue.push(Move(1, [layer], 1));
                break;
            case 'U':
                cube.qeue.push(Move(1, [layer], 0));
                break;
            case 'd':
                cube.qeue.push(Move(1, [dim - 1 - layer], 1));
                break;
            case 'D':
                cube.qeue.push(Move(1, [dim - 1 - layer], 0));
                break;
            case 'l':
                cube.qeue.push(Move(2, [layer], 1));
                break;
            case 'L':
                cube.qeue.push(Move(2, [layer], 0));
                break;
            case 'r':
                cube.qeue.push(Move(2, [dim - 1 - layer], 1));
                break;
            case 'R':
                cube.qeue.push(Move(2, [dim - 1 - layer], 0));
                break;
            case 'c':
                resetCamera();
                break;
            case 'y':
                cube.moveY(1);
                break;
            case 'Y':
                cube.moveY(0);
                break;
            case 'x':
                cube.moveX(1);
                break;
            case 'X':
                cube.moveX(0);
                break;
            case 'z':
                cube.moveZ(1);
                break;
            case 'Z':
                cube.moveZ(0);
                break;
        }
    }
}