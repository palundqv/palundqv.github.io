/* global AFRAME */
AFRAME.registerComponent('event-manager', {

  init: function () {
    this.bindMethods();

    this.boxGeometryEl = document.querySelector('#boxGeometry');
    this.bigMacGeometryEl = document.querySelector('#bigMacGeometry');
    this.friesGeometryEl = document.querySelector('#friesGeometry');

    this.boxButtonEl = document.querySelector('#boxButton');
    this.burgerButtonEl = document.querySelector('#burgerButton');
    this.friesButtonEl = document.querySelector('#friesButton');
    this.darkModeButtonEl = document.querySelector('#darkModeButton');

    this.buttonToGeometry = {
      'boxButton': this.boxGeometryEl,
      'burgerButton': this.bigMacGeometryEl,
      'friesButton': this.friesGeometryEl
    };

    this.boxButtonEl.addEventListener('click', this.onClick);
    this.burgerButtonEl.addEventListener('click', this.onClick);
    this.friesButtonEl.addEventListener('click', this.onClick);
    this.darkModeButtonEl.addEventListener('click', this.onClick);
    this.boxButtonEl.addState('pressed');
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    if (targetEl === this.boxButtonEl ||
        targetEl === this.burgerButtonEl ||
        targetEl === this.friesButtonEl) {
      this.boxButtonEl.removeState('pressed');
      this.burgerButtonEl.removeState('pressed');
      this.friesButtonEl.removeState('pressed');
      this.boxGeometryEl.object3D.visible = false;
      this.bigMacGeometryEl.object3D.visible = false;
      this.friesGeometryEl.object3D.visible = false;
      this.buttonToGeometry[targetEl.id].object3D.visible = true;
    }

    if (targetEl === this.darkModeButtonEl) {
      if (this.el.sceneEl.is('starry')) {
        targetEl.setAttribute('button', 'label', 'Dark Mode');
        this.el.sceneEl.setAttribute('environment', {preset: 'default'});
        this.el.sceneEl.removeState('starry');
      } else {
        targetEl.setAttribute('button', 'label', 'Light Mode');
        this.el.sceneEl.setAttribute('environment', {preset: 'starry'});
        this.el.sceneEl.addState('starry');
      }
    } else {
      targetEl.addState('pressed');
    }
  }
});
