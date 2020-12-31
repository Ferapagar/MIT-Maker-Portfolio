const U = 0, D = 5, R = 4, L = 2, F = 1, B = 3;
const HALF_PI = Math.PI / 2;
let colors = [];

const canvas = document.querySelector("#glcanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var cube_title, cube;
window.setTimeout(() => { document.querySelector('#whiteScreen').style.display = "none" }, 1500)

window.onload = App;


// {
//   default: undefined,
//   normal: 1,
//   scrambling: .1,
//   solving: {
//     default: 0,
//     centers: .0,
//     edges: .1,
//     threeByThree: {
//       default: undefined,
//       Wcross: .5,
//       F2L: .1,
//       Ycross: .3,
//       OLL: .2,
//       PLL: .5,
//     }
//   }
// }

//
// Start here
//
function App () {
  var then;
  resetCamera();

  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  canvas.onmousedown = (e) => {
    mouseDown = true;
  };
  canvas.onmouseup = (e) => {
    mouseDown = false;
  };
  canvas.onmousemove = (e) => {
    if (mouseDown) {
      moveCamera(e);
    }
  };
  document.onkeydown = e => { keyPressed(e.key); };

  // If we don't have a GL context, give up now
  if (!gl) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  const programInfo = getProgramInfo(gl);


  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  Cubie.initRendering(gl);
  cube_title = new Cube(3, gl, false);

  drawScene(gl);
  var velX = 3;
  var velY = 3;
  var titleAnimationRequest;
  var appAnimationRequest;

  // Draw the scene repeatedly
  function title() {
    drawScene(gl);
    if (!cube_title.isScrambling)
      cube_title.scramble();
    moveCamera({ movementX: velX, movementY: velY });
    cube_title.update(1 / 60);
    cube_title.show(programInfo);
    titleAnimationRequest = requestAnimationFrame(title);
  }
  titleAnimationRequest = setTimeout(title,500);

  function appRender() {
    drawScene(gl);
    var now = new Date().getTime();
    cube.update((now - then) / 1000);
    cube.show(programInfo);
    appAnimationRequest = requestAnimationFrame(appRender);
    then = now;
  }


  this.start = () => {
    var dim = document.querySelector('.slider').value;
    var ldm = document.querySelector('#ldm_checkbox').checked;
    cube = new Cube(dim, gl, ldm);
    document.querySelector("#layerToMove").max = Math.floor(dim/2);
    document.querySelector('#whiteScreen').style.display = "block";
    document.querySelector('#whiteScreen').style.animation = "animate 1s linear";
    window.setTimeout(() => {
      document.querySelector('#whiteScreen').style.display = "none";
      document.querySelector('#tools').style.display = "block";
      document.querySelector('#TitleScreen').style.display = "none";
      cancelAnimationFrame(titleAnimationRequest);
      resetCamera();
      appAnimationRequest = requestAnimationFrame(appRender);
      then = new Date().getTime();
    }, 1000);
  };
}


// Rotate global view Camera as in a drag
function moveCamera(e) {
  mat4.rotate(
    globalModelMatrix, // destination matrix
    globalModelMatrix, // matrix to rotate
    (-e.movementY * Math.PI) / 400, // amount to rotate in radians
    [1, 0, 0]
  ); // axis to rotate around (Z)
  mat4.rotate(
    globalModelMatrix, // destination matrix
    globalModelMatrix, // matrix to rotate
    (-e.movementX * Math.PI) / 400, // amount to rotate in radians
    [0, 1, 0]
  );
}
function resetCamera() {
  globalModelMatrix = mat4.create();
  mat4.rotateY(globalModelMatrix, globalModelMatrix, -Math.PI / 4);
  mat4.rotateX(globalModelMatrix, globalModelMatrix, -Math.PI / 4);
}