let branches;
let branchProportion;
let fullAngle;
let iterations;
let maxIterations;

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  a = createSlider(0, 2 * PI, HALF_PI, .01);
  a.position(20, 20);
  p = createSlider(0.1, 1, .67, .01);
  p.position(20, 50);
  b = createSlider(1, 10, 2);
  b.position(20, 80);
  iterations = 0;
}

function draw(){
  background(63);
  stroke(255);
  push();
  translate(width / 2, height);
  rotate(PI);
  branches = b.value();
  branchProportion = p.value();
  fullAngle = a.value();
  maxIterations = log(2000) / log(branches);
  let n = new branch();
  n.show(200);
  pop();
}
class branch{

  branch(){
    //
  }
  show(l){
    if (iterations <= maxIterations && l > 2){
      iterations++;
      push();
      strokeWeight(1 - iterations / 20);
      line(0, 0, 0, l);
      translate(0, l);
      rotate(- fullAngle / 2);
      for (let i = 0; i < branches; i++){
        let n = new branch();
        n.show(l * branchProportion);
        rotate(fullAngle / (branches - 1));
      }
      iterations--;
      pop();
    }
  }
}
