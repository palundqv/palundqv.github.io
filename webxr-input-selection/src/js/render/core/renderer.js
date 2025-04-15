class Renderer {
  constructor(gl) {
    this.gl = gl;
    this.programs = {};
  }

  createRenderPrimitive(primitive, material) {
    const program = this.getProgram(material);
    const renderPrimitive = {
      primitive,
      material,
      program,
    };
    return renderPrimitive;
  }

  getProgram(material) {
    const key = material.constructor.name;
    if (!this.programs[key]) {
      this.programs[key] = this.createProgram(material);
    }
    return this.programs[key];
  }

  createProgram(material) {
    const vertexShaderSource = material.vertexShaderSource;
    const fragmentShaderSource = material.fragmentShaderSource;

    const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
      return null;
    }

    return program;
  }

  compileShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  render(scene) {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    scene.nodes.forEach(node => {
      this.renderNode(node);
    });
  }

  renderNode(node) {
    const { primitive, material } = node.renderPrimitive;
    const program = this.getProgram(material);
    this.gl.useProgram(program);

    // Set up attributes and uniforms here...

    this.gl.drawArrays(this.gl.TRIANGLES, 0, primitive.vertexCount);
  }
}

function createWebGLContext(options = {}) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl', options);

  if (!context) {
    throw new Error('Unable to create WebGL context.');
  }

  return context;
}

export { Renderer, createWebGLContext };