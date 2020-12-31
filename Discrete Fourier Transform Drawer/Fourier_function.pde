

class FourierFunction {

  private class TimeStamp {
    Complex pos;
    float time;

    TimeStamp(Complex p, float t) {
      pos = p;
      time = t;
    }

    TimeStamp(PVector p, float t) {
      this(new Complex(p.x, p.y), t);
    }

    String toString() {
      return "pos = " + pos.toString() + " t = " + time;
    }

    Complex pos() {
      return new Complex(pos);
    }

    void sub(Complex c) {
      pos.sub(c);
    }
  }

  private class Circle {
    Complex radius;
    int speed;

    Circle(int s) {
      speed = s;
    }

    String toString() {
      return '('+radius.toString()+") * e ^ " + speed + 'i';
    }

    Complex f(float t) {
      return C.mult(radius, C.pow(new Complex(0, TWO_PI * speed * t)));
    }

    void bestFit(TimeStamp[] pts) {
      int n = pts.length;
      Complex avg = new Complex();
      for (TimeStamp ts : pts) {
        Complex next = C.mult(ts.pos, new Complex(cos(speed*ts.time*TWO_PI), -sin(speed*ts.time*TWO_PI)));
        avg.add(next);
      }
      avg.divide(n);
      radius = avg;
    }
  }


  TimeStamp[] pts;
  Circle[] circles;
  int iterations, n_pts;

  FourierFunction(int it, PVector[] points) {
    n_pts = points.length;
    iterations = it;
    pts = new TimeStamp[n_pts];
    float step = 1.0 / n_pts;
    for (int i = 0; i < n_pts; i++)
      pts[i] = new TimeStamp(points[i], i*step);

    circles = new Circle[2 * it + 1];
    circles[it] = new Circle(0);
    circles[it].bestFit(pts);

    for (int i = 1; i <= it; i++) {
      circles[it+i] = new Circle(i);
      circles[it-i] = new Circle(-i);
      circles[it+i].bestFit(pts);
      circles[it-i].bestFit(pts);
    }
  }

  String toString() {
    String ans = "";
    for (Circle c : circles) {
      ans += " + " + c.toString();
    }
    return ans.substring(2);
  }

  Complex calculate(float t) {
    Complex ans = new Complex();
    for (Circle c : circles) {
      ans.add(c.f(t));
    }
    return ans;
  }

  PVector calculateV(float t) {
    Complex ans = calculate(t);
    return new PVector(ans.re, ans.im);
  }
}
