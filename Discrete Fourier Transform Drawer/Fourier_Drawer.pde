class FourierDrawer {

  FourierFunction function;
  PGraphics canvas;
  PVector pos;
  PVector[] points;
  float scale;
  int depth;
  boolean hasPoints;
  boolean hasFunction;
  float time = 0;
  float duration;

  FourierDrawer(int w, int h, float rs, int d, float secs) {
    canvas = createGraphics(w, h);
    scale = rs;
    depth = d;
    hasPoints = false;
    hasFunction = false;
    duration = secs;
  }
  
  FourierDrawer(float rs, int d, float s){
    this(width, height, rs, d, s);
  }

  void setPoints(PVector[] pts) {
    points = new PVector[pts.length];
    for (int i = 0; i < pts.length; i++) {
      points[i] = pts[i].copy();
    }
    hasPoints = true;
  }

  void adjustFourier() {
    function = new FourierFunction(depth, points);
    hasFunction = true;
    time = 0;
    //println(time);
  }

  PVector[] getPoints() {
    PVector[] ans = new PVector[points.length];
    for (int i = 0; i < points.length; i++) {
      ans[i] = points[i].copy();
    }
    return points;
  }

  void update(float timeStep) {
    timeStep /= duration;
    if (hasFunction) {
      time += timeStep;
      PVector currentPos = function.calculateV(time);
      currentPos.mult(scale);
      currentPos.y *= -1;
      currentPos.add(new PVector(canvas.width * 0.5, canvas.height * 0.5));
      if (pos != null) {
        canvas.beginDraw();
        canvas.stroke(255);
        canvas.strokeWeight(3);
        canvas.noFill();
        canvas.line(pos.x, pos.y, currentPos.x, currentPos.y);
        canvas.endDraw();
      }
      pos = currentPos;
    }
  }
  void show() {
    if (hasFunction) {
      pushMatrix();
      image(canvas, 0, 0, width, height);
      popMatrix();
    }
  }
  
  String toString(){
    return function.toString();
  }
}
