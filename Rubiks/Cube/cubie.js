

class Cubie {

  static posColorBuffers;
  static globalModelViewMatrix;
  static gl;


  static initRendering(gl) {
    this.gl = gl;
    this.initPosColorBuffers();
  }

  static initPosColorBuffers() {
    var gl = this.gl;
    // Create a buffer for the cube's vertex positions.

    const positionBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the cube.

    const positions = [
      // Top face
      -1.0, 1.0, -1.0,
      -1.0, 1.0, 1.0,
      1.0, 1.0, 1.0,
      1.0, 1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0,
      1.0, -1.0, 1.0,
      -1.0, -1.0, 1.0,

      // Right face
      1.0, -1.0, -1.0,
      1.0, 1.0, -1.0,
      1.0, 1.0, 1.0,
      1.0, -1.0, 1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0, 1.0,
      -1.0, 1.0, 1.0,
      -1.0, 1.0, -1.0,

      // Front face
      -1.0, -1.0, 1.0,
      1.0, -1.0, 1.0,
      1.0, 1.0, 1.0,
      -1.0, 1.0, 1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0, 1.0, -1.0,
      1.0, 1.0, -1.0,
      1.0, -1.0, -1.0,

      // Exterior for edge rendering

      // Top face
      -1.1, 1.1, -1.1,
      -1.1, 1.1, 1.1,
      1.1, 1.1, 1.1,
      1.1, 1.1, -1.1,

      // Bottom face
      -1.1, -1.1, -1.1,
      1.1, -1.1, -1.1,
      1.1, -1.1, 1.1,
      -1.1, -1.1, 1.1,

      // Right face
      1.1, -1.1, -1.1,
      1.1, 1.1, -1.1,
      1.1, 1.1, 1.1,
      1.1, -1.1, 1.1,

      // Left face
      -1.1, -1.1, -1.1,
      -1.1, -1.1, 1.1,
      -1.1, 1.1, 1.1,
      -1.1, 1.1, -1.1,

      // Front face
      -1.1, -1.1, 1.1,
      1.1, -1.1, 1.1,
      1.1, 1.1, 1.1,
      -1.1, 1.1, 1.1,

      // Back face
      -1.1, -1.1, -1.1,
      -1.1, 1.1, -1.1,
      1.1, 1.1, -1.1,
      1.1, -1.1, -1.1,

    ];

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Now set up the colors for the faces. We'll use solid colors
    // for each face.

    const faceColors = [
      [1.0, 1.0, 0.0, 1.0],    // Top face: white
      [1.0, 1.0, 1.0, 1.0],    // Bottom face: yellow
      [1.0, 0.647, 0.0, 1.0],    // Right face: orange
      [1.0, 0.0, 0.0, 1.0],    // Left face: red
      [0.0, 1.0, 0.0, 1.0],    // Front face: green
      [0.0, 0.0, 1.0, 1.0],    // Back face: blue
    ];

    const edgeColors = [0, 0, 0, 1];

    // Convert the array of colors into a table for all the vertices.

    var fColors = [];
    var eColors = [];

    for (var j = 0; j < faceColors.length; ++j) {
      const c = faceColors[j];

      // Repeat each color four times for the four vertices of the face
      fColors = fColors.concat(c, c, c, c);
      for (var i = 0; i < 12; i++)
        eColors = eColors.concat(edgeColors);
    }

    const faceColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, faceColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fColors), gl.STATIC_DRAW);

    const edgeColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, edgeColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(eColors), gl.STATIC_DRAW);


    this.posColorBuffers = {
      position: positionBuffer,
      faceColor: faceColorBuffer,
      edgeColor: edgeColorBuffer,
    };
  }

  constructor(x, y, z, len, gl, sides, ldm) {
    this.ldm = ldm;
    this.posMatrix = mat4.create();
    this.len = len;
    this.pos = { x: x, y: y, z: z };
    mat4.translate(this.posMatrix, this.posMatrix, [x, y, z]);
    var s = len / 2.2;
    if (ldm) s *= 1.1
    mat4.scale(this.posMatrix, this.posMatrix, [s, s, s]);
    this.config = new Config(gl, sides);
    this.gl = gl;
  }


  getBuffers() {
    var modelMatrix = mat4.create();
    mat4.multiply(modelMatrix, this.posMatrix, this.config.rotation);
    return {
      position: Cubie.posColorBuffers.position,
      faceColor: Cubie.posColorBuffers.faceColor,
      edgeColor: Cubie.posColorBuffers.edgeColor,
      faceIndices: this.config.faceIndexBuffer,
      edgeIndices: this.config.edgeIndexBuffer,
      faceLen: this.config.faceIndices.length,
      edgeLen: this.config.edgeIndices.length,
      modelMatrix: modelMatrix,
    }
  }

  highlight() {
    this.config.sides = [false, false, false, false, false, false,];
    this.config.createIndices();
  }

  show(PI) {
    renderCubie(this.gl, PI, this.getBuffers(), this.ldm);
  }
}