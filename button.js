/* global AFRAME */
AFRAME.registerComponent('button', {
  schema: {
    label: {default: 'label'},
    width: {default: 0.11},
    model: {default: ''},
    toggleable: {default: false},
    color: {default: '#3a50c5'} // Add a color property to the schema
  },
  init: function () {
    var el = this.el;
    var labelEl = this.labelEl = document.createElement('a-entity');

    this.color = this.data.color;

    // Use the model if provided, otherwise fall back to default geometry
    if (this.data.model) {
      el.setAttribute('gltf-model', this.data.model);
    } else {
      el.setAttribute('geometry', {
        primitive: 'box',
        width: this.data.width,
        height: 0.05,
        depth: 0.04
      });
      el.setAttribute('material', {color: this.color});
    }

    el.setAttribute('pressable', '');

    labelEl.setAttribute('position', '0 0 0.0025');
    labelEl.setAttribute('text', {
      value: this.data.label,
      color: 'white',
      align: 'center'
    });

    labelEl.setAttribute('scale', '0.75 0.75 0.75');
    this.el.appendChild(labelEl);

    this.bindMethods();
    this.el.addEventListener('stateadded', this.stateChanged);
    this.el.addEventListener('stateremoved', this.stateChanged);
    this.el.addEventListener('pressedstarted', this.onPressedStarted);
    this.el.addEventListener('pressedended', this.onPressedEnded);
  },

  bindMethods: function () {
    this.stateChanged = this.stateChanged.bind(this);
    this.onPressedStarted = this.onPressedStarted.bind(this);
    this.onPressedEnded = this.onPressedEnded.bind(this);
  },

  updateModelMaterial: function () {
    const model = this.el.getObject3D('mesh');
    if (model) {
      model.traverse((node) => {
        if (node.isMesh) {
          node.material.color.set(this.color); // Set the material color
        }
      });
    }
  },

  update: function (oldData) {
    if (oldData.label !== this.data.label) {
      this.labelEl.setAttribute('text', 'value', this.data.label);
    }
    if (oldData.model !== this.data.model && this.data.model) {
      this.el.setAttribute('gltf-model', this.data.model);
      this.el.addEventListener('model-loaded', () => {
        this.updateModelMaterial();
      });
    }
    if (oldData.color !== this.data.color) {
      this.color = this.data.color;
      this.updateModelMaterial();
    }
  },

  stateChanged: function () {
    var color = this.el.is('pressed') ? 'green' : this.color;
    this.color = color;
    this.updateModelMaterial();
    this.el.setAttribute('material', {color: color});
  },

  onPressedStarted: function () {
    var el = this.el;
    el.setAttribute('material', {color: 'green'});
    el.emit('click');
    if (this.data.toggleable) {
      if (el.is('pressed')) {
        el.removeState('pressed');
      } else {
        el.addState('pressed');
      }
    }
  },

  onPressedEnded: function () {
    if (this.el.is('pressed')) { return; }
    this.el.setAttribute('material', {color: this.color});
  }
});