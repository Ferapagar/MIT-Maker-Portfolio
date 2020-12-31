//FourierFunction ff;
//PVector lastPt;
//int first_t;
//float timePerRevolution = 5;
//int nPoints = 40;
//int fr = 120;
//int bgRefreshesPerRev = 80;
//float scale;
//boolean draw = false;
//boolean showPoints = true;
//int type = 2;  // 0 = array ps; 1 = Random points, 2 = drawing mode
//int drawingModeType = 0;
//boolean wasPressed = false;
//int framesSinceStartDraw = 0;
//float ptsPerSec = 10;

//ArrayList<PVector> drawing;

//final float[][] ps = {
//  {0.5, 0}, 
//  {1, 1}, 
//  {0, 0.5}, 
//  {-1, 1}, 
//  {-0.5, 0}, 
//  {-1, -1}, 
//  {0, -0.5}, 
//  {1, -1}
//};

//PVector[] pts;
//void createFourier() {
//  ff = new FourierFunction(20, pts);
//  lastPt = ff.calculateV(0);
//  lastPt.mult(scale);
//  first_t = -1;
//  print(ff.toString());
//  draw = true;
//  print(ff);
//}

//void setup() {
//  size(1000, 1000);
//  frameRate(fr);
//  background(0);
//  scale = 400;

//  if (type == 1) {
//    pts = new PVector[nPoints];
//    for (int i = 0; i < nPoints; i++) {
//      pts[i] = new PVector(random(-1, 1), 0);
//      pts[i].rotate(random(TWO_PI));
//    }
//    createFourier();
//  } else if (type == 0) {
//    pts = new PVector[ps.length];
//    for (int i = 0; i < pts.length; i++) {
//      pts[i] = new PVector(ps[i][0], ps[i][1]);
//    }
//    createFourier();
//  } else {
//    drawing = new ArrayList<PVector>();
//  }
//}
//void draw() {
//  if (draw) {
//    if (first_t < 0) {
//      first_t = millis();
//    }

//    if (frameCount % (timePerRevolution * fr / bgRefreshesPerRev) == 0) {
//      fill(0, 10);
//      noStroke();
//      rect(0, 0, width, height);
//    }

//    pushMatrix();
//    translate(width/2, height / 2);
//    scale(1, -1);

//    if (showPoints) {
//      noStroke();
//      fill(255);
//      for (PVector point : pts) {
//        ellipse(point.x*scale, point.y*scale, 5, 5);
//      }
//    }

//    stroke(255, 255, 255);
//    PVector currentPt = ff.calculateV(0.001 * (millis()-first_t) / timePerRevolution);
//    currentPt.mult(scale);
//    strokeWeight(3);
//    line(lastPt.x, lastPt.y, currentPt.x, currentPt.y);


//    popMatrix();

//    lastPt = currentPt;
//  } else {
//    if (mousePressed) {
//      if (wasPressed == false) {
//        framesSinceStartDraw = 0;
//      }
//      if (framesSinceStartDraw % (fr / ptsPerSec) == 0) {
//        addPointFromMouse();
//      }
//      framesSinceStartDraw ++;
//    }
//    background(0);
//    pushMatrix();
//    translate(width/2, height / 2);
//    scale(1, -1);
//    noStroke();
//    fill(255);
//    for (PVector point : drawing) {
//      ellipse(point.x*scale, point.y*scale, 5, 5);
//    }
//    popMatrix();
//  }
//  wasPressed = mousePressed;
//}
//void mousePressed() {
//  if (type == 2 & !draw && drawingModeType == 0) {
//    int x = mouseX;
//    int y = mouseY;
//    x -= width/2;
//    y -= height/2;
//    drawing.add(new PVector((float)x / scale, (float)y / - scale));
//  }
//}

//void addPointFromMouse() {
//  int x = mouseX;
//  int y = mouseY;
//  x -= width/2;
//  y -= height/2;
//  drawing.add(new PVector((float)x / scale, (float)y / - scale));
//}

//void keyPressed() {
//  if (keyCode == 32) {
//    if (type == 2 && !draw) {
//      pts = new PVector[drawing.size()];
//      for (int i = 0; i < pts.length; i++) {
//        pts[i] = drawing.get(i);
//      }
//      createFourier();
//    }
//  } else if (key =='t') {
//    showPoints = !showPoints;
//  }
//}



DrawingInterface DI;
FourierDrawer FD;
int lastTime;

void setup() {
  size(1000, 1000);
  frameRate(120);
  lastTime = 0;

  DI = new DrawingInterface(400, 12);

  FD = new FourierDrawer(400, 20, 5);
}

void draw() {
  background(0);
  
  int currentTime = millis();

  FD.update(0.001*(currentTime - lastTime));

  DI.show();

  if (!FD.hasPoints)
    DI.update();
  else
    FD.show();

  lastTime = currentTime;
}

void keyPressed() {
  if (keyCode == 32 && !FD.hasPoints) {
    FD.setPoints(DI.getPoints());
    FD.adjustFourier();
    lastTime = millis();
    //println(FD.toString());
  }
}
