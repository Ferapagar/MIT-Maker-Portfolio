public final Complex C = new Complex(1);

class Complex{
  
  float re, im;
  
  Complex(float r, float i){
    re = r;
    im = i;
  }
  
  Complex(float r){
    this(r, 0);
  }
  Complex(){
    this(0);
  }
  
  Complex(Complex c){
    this(c.re, c.im);
  }
  
  String toString(){
    return re + " + " + im+"i";
  }
  
  float re(){
    return re;
  }
  
  float im(){
    return im;
  }
  
  float mag(){
    return sqrt(re*re+im*im);
  }
  
  float angle(){
    return atan2(im, re);
  }
  
  
  void add(Complex other){
    re += other.re;
    im += other.im;
  }
  void sub(Complex other){
    re -= other.re;
    im -= other.im;
  }
  
  
  void mult(Complex other){
    float r = re * other.re - im * other.im;
    float i = im * other.re + re * other.im;
    
    re = r;
    im = i;
  }
  
  void divide(float n){
    re/=n;
    im/=n;
  }
  
  void divide(Complex other){
    Complex num = mult(this, other.conj());
    float den = mult(other, other.conj()).re;
    re = num.re;
    im = num.im;
    divide(den);
  }
  
  void pow(){
    float r = exp(re);
    float re_ = r*cos(im);
    float im_ = r*sin(im);
    
    re = re_;
    im = im_;
  }
  
  void pow_b(Complex e){
    pow(mult(ln(this), e));
  }
  
  void ln(){
    float r = log(mag());
    float i = angle();
    
    re = r;
    im = i;
  }
  
  Complex conj(){
    return new Complex(re, -im);
  }
  
  Complex add(Complex a, Complex b){
    Complex ans = new Complex(a);
    ans.add(b);
    return ans;
  }
  
  Complex sub(Complex a, Complex b){
    Complex ans = new Complex(a);
    ans.sub(b);
    return ans;
  }
  
  Complex mult(Complex a, Complex b){
    Complex ans = new Complex(a);
    ans.mult(b);
    return ans;
  }
  
  Complex divide(Complex a, Complex b){
    Complex ans = new Complex(a);
    ans.divide(b);
    return ans;
  }
  
  Complex pow(Complex c){
    Complex ans = new Complex(c);
    ans.pow();
    return ans;
  }
  
  Complex pow_b(Complex b, Complex e){
    Complex ans = new Complex(b);
    ans.pow_b(e);
    return ans;
  }
  
  Complex ln(Complex c){
    Complex ans = new Complex(c);
    ans.ln();
    return ans;
  }
  
  Complex log_b(Complex a, Complex b){
    Complex a_ = new Complex(a);
    a_.ln();
    Complex b_ = new Complex(b);
    b_.ln();
    a_.divide(b_);
    return a_;
  }
}
