class Config {
  constructor(gl, sides, rotation = mat4.create(), sideColors = []) {
    this.rotation = rotation;
    this.gl = gl;
    this.sides = sides;
    if (sideColors.length == 0) for (var i = 0; i < this.sides.length; i++) sideColors.push(sides[i] ? i : 6);
    this.sideColors = sideColors;
    this.createIndices();
  }

  createIndices() {

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.
    var gl = this.gl;
    this.faceIndices = [
      0, 1, 2, 0, 2, 3,    // top
      16, 17, 18, 16, 18, 19,   // front
      12, 13, 14, 12, 14, 15,   // left
      20, 21, 22, 20, 22, 23,   // back
      8, 9, 10, 8, 10, 11,   // right
      4, 5, 6, 4, 6, 7,    // bottom
    ];
    let facesID = this.sides[0] + 2 * this.sides[5] + 4 * this.sides[4] + 8 * this.sides[2] + 16 * this.sides[1] + 32 * this.sides[3];
    for (let i = 5; i >= 0; i--) {
      if (!this.sides[i]) {
        this.faceIndices.splice(6 * i, 6);
      }
    }
    this.edgeIndices = [];
    if (facesID & 5) this.edgeIndices.push(2, 3, 27, 2, 27, 26); // Top right
    if (facesID & 9) this.edgeIndices.push(0, 1, 24, 1, 25, 24); // Top left
    if (facesID & 17) this.edgeIndices.push(1, 2, 26, 1, 26, 25); // Top front
    if (facesID & 33) this.edgeIndices.push(0, 3, 27, 0, 27, 24); // Top back
    if (facesID & 18) this.edgeIndices.push(6, 7, 31, 6, 31, 30); // Bottom front
    if (facesID & 34) this.edgeIndices.push(4, 5, 28, 5, 29, 28); // Bottom back
    if (facesID & 6) this.edgeIndices.push(5, 6, 30, 5, 30, 29); // Bottom right
    if (facesID & 10) this.edgeIndices.push(4, 7, 31, 4, 28, 31); // Bottom left
    if (facesID & 20) this.edgeIndices.push(10, 11, 35, 10, 35, 34); // Right front
    if (facesID & 36) this.edgeIndices.push(8, 9, 33, 8, 33, 32); // Right back
    if (facesID & 24) this.edgeIndices.push(13, 14, 38, 13, 38, 37); // Left front
    if (facesID & 40) this.edgeIndices.push(12, 15, 39, 12, 39, 36); // Left back

    // Build the element array buffer; this specifies the indices
    // into the vertex arrays for each face's vertices.

    this.faceIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.faceIndexBuffer);
    // Now send the element array to GL

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.faceIndices), gl.STATIC_DRAW);

    // Same with the edge buffers
    this.edgeIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.edgeIndexBuffer);

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.edgeIndices), gl.STATIC_DRAW);
  }

  hasColor(Color) {
    let colorsLeft = Color.length;
    for (let i = 0; i < sides.length; i++) {
      for (let j = 0; j < Color.length; j++) {
        if (sides[i] == Color[j]) {
          colorsLeft--;
        }
      }
    }
    if (colorsLeft <= 0) {
      return true;
    }
    return false;
  }

  rotateZ(clockwise) {
    mat4.invert(this.rotation, this.rotation);
    mat4.rotateZ(this.rotation, this.rotation, -(clockwise ? 1 : -1) * Math.PI / 2);
    mat4.invert(this.rotation, this.rotation);
    if (!clockwise) {
      var n = this.sideColors[R];
      this.sideColors[R] = this.sideColors[U];
      this.sideColors[U] = this.sideColors[L];
      this.sideColors[L] = this.sideColors[D];
      this.sideColors[D] = n;
    } else {
      var n = this.sideColors[R];
      this.sideColors[R] = this.sideColors[D];
      this.sideColors[D] = this.sideColors[L];
      this.sideColors[L] = this.sideColors[U];
      this.sideColors[U] = n;
    }
  }

  rotateY(clockwise) {
    mat4.invert(this.rotation, this.rotation);
    mat4.rotateY(this.rotation, this.rotation, (clockwise ? 1 : -1) * Math.PI / 2);
    mat4.invert(this.rotation, this.rotation);

    if (clockwise) {
      var n = this.sideColors[R];
      this.sideColors[R] = this.sideColors[B];
      this.sideColors[B] = this.sideColors[L];
      this.sideColors[L] = this.sideColors[F];
      this.sideColors[F] = n;
    } else {
      var n = this.sideColors[R];
      this.sideColors[R] = this.sideColors[F];
      this.sideColors[F] = this.sideColors[L];
      this.sideColors[L] = this.sideColors[B];
      this.sideColors[B] = n;
    }
  }
  rotateX(clockwise) {
    mat4.invert(this.rotation, this.rotation);
    mat4.rotateX(this.rotation, this.rotation, (clockwise ? 1 : -1) * Math.PI / 2);
    mat4.invert(this.rotation, this.rotation);
    if (!clockwise) {
      var n = this.sideColors[U];
      this.sideColors[U] = this.sideColors[B];
      this.sideColors[B] = this.sideColors[D];
      this.sideColors[D] = this.sideColors[F];
      this.sideColors[F] = n;
    } else {
      var n = this.sideColors[U];
      this.sideColors[U] = this.sideColors[F];
      this.sideColors[F] = this.sideColors[D];
      this.sideColors[D] = this.sideColors[B];
      this.sideColors[B] = n;
    }
  }

  copy() {
    return new Config(this.gl, this.sides, this.rotation);
  }

  get(side) {
    return this.sides[side];
  }
}