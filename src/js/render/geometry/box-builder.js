class BoxBuilder {
  constructor() {
    this.cubes = [];
  }

  pushCube(position, size) {
    const cube = {
      position: position,
      size: size
    };
    this.cubes.push(cube);
  }

  finishPrimitive(renderer) {
    const geometry = this.createGeometry();
    return renderer.createGeometry(geometry);
  }

  createGeometry() {
    // Logic to create geometry from the cubes defined in this.cubes
    // This is a placeholder for actual geometry creation logic
    return {
      vertices: [],
      indices: []
    };
  }
}

export { BoxBuilder };