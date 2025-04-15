class Node {
    constructor() {
        this.renderPrimitives = [];
        this.transform = mat4.create();
        this.selectable = false;
    }

    addRenderPrimitive(renderPrimitive) {
        this.renderPrimitives.push(renderPrimitive);
    }

    removeRenderPrimitive(renderPrimitive) {
        const index = this.renderPrimitives.indexOf(renderPrimitive);
        if (index > -1) {
            this.renderPrimitives.splice(index, 1);
        }
    }

    setTransform(transform) {
        this.transform = transform;
    }

    getTransform() {
        return this.transform;
    }

    render(renderer) {
        for (const primitive of this.renderPrimitives) {
            renderer.render(primitive, this.transform);
        }
    }
}