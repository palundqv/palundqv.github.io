class Scene {
  constructor() {
    this.nodes = [];
    this.renderer = null;
  }

  setRenderer(renderer) {
    this.renderer = renderer;
  }

  addNode(node) {
    this.nodes.push(node);
  }

  removeNode(node) {
    const index = this.nodes.indexOf(node);
    if (index > -1) {
      this.nodes.splice(index, 1);
    }
  }

  startFrame() {
    // Prepare for rendering
  }

  endFrame() {
    // Clean up after rendering
  }

  draw(projectionMatrix, viewTransform) {
    if (this.renderer) {
      for (const node of this.nodes) {
        this.renderer.render(node, projectionMatrix, viewTransform);
      }
    }
  }
}

export { Scene };