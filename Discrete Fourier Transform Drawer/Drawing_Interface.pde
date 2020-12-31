class DrawingInterface {
  ArrayList<PVector> points;
  PVector center;
  float relW;
  boolean wasDrawing;
  int drawFrames;
  int framesPerPoint;

  DrawingInterface(int x, int y, float rel_w, int fpp) {
    points = new ArrayList<PVector>();
    center = new PVector(x, y);
    framesPerPoint = fpp;
    relW = rel_w;
    wasDrawing = false;
  }

  DrawingInterface(float rel_w, int fpp) {
    this(width/2, height/2, rel_w, fpp);
  }

  void addPoint(int x, int y) {
    PVector newV = new PVector(x, y);
    newV.sub(center);
    newV.mult(1.0 / relW);
    newV.y *= -1;
    points.add(newV);
  }

  void update() {
    if (mousePressed) {
      if (!wasDrawing)
        drawFrames = 0;
      if (drawFrames % framesPerPoint == 0) {
        addPoint(mouseX, mouseY);
      }
      drawFrames++;
    }
    wasDrawing = mousePressed;
  }

  void clearPoints() {
    points = new ArrayList<PVector>();
  }

  PVector[] getPoints() {
    PVector[] ans  = new PVector[points.size()];
    for (int i = 0; i < ans.length; i ++)
      ans[i] = points.get(i).copy();
    return ans;
  }
  void show() {
    noStroke();
    fill(255);
    for (PVector point : points) {
      ellipse(center.x + relW * point.x, center.y - relW * point.y, 3, 3);
    }
  }
}
