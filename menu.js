/* global AFRAME */
AFRAME.registerComponent('menu', {
  schema: {
    model: {default: ''}
  },
  init: function () {
    var el = this.el;
    var menuBackGroundEl = document.createElement('a-entity');

    if (this.data.model) {
      menuBackGroundEl.setAttribute('gltf-model', this.data.model);
    } else {
      menuBackGroundEl.setAttribute('geometry', {
        primitive: 'box',
        width: 0.6,
        height: 0.40,
        depth: 0.01
      });
      menuBackGroundEl.setAttribute('material', {
        color: 'gray'
      });
    }
    menuBackGroundEl.setAttribute('position', '0 0 -0.025');
    el.appendChild(menuBackGroundEl);
  }
});
