// This file initializes the application, sets up event listeners, and manages the input selection logic.

import { WebXRButton } from './util/webxr-button.js';
import { Scene } from './render/scenes/scene.js';
import { Renderer, createWebGLContext } from './render/core/renderer.js';

let xrButton = null;
let gl = null;
let renderer = null;
let scene = new Scene();

function initXR() {
  xrButton = new WebXRButton({
    onRequestSession: onRequestSession,
    onEndSession: onEndSession
  });
  document.body.appendChild(xrButton.domElement);

  if (navigator.xr) {
    navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
      xrButton.enabled = supported;
    });
  }
}

function onRequestSession() {
  return navigator.xr.requestSession('immersive-vr', { optionalFeatures: ['local-floor', 'bounded-floor'] })
    .then(onSessionStarted);
}

function onSessionStarted(session) {
  xrButton.setSession(session);
  session.addEventListener('end', onSessionEnded);

  gl = createWebGLContext({ xrCompatible: true });
  renderer = new Renderer(gl);
  scene.setRenderer(renderer);

  session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) });
  session.requestReferenceSpace('local').then((refSpace) => {
    session.requestAnimationFrame(onXRFrame);
  });
}

function onEndSession(session) {
  session.end();
}

function onSessionEnded() {
  xrButton.setSession(null);
  renderer = null;
}

function onXRFrame(t, frame) {
  let session = frame.session;
  session.requestAnimationFrame(onXRFrame);
  let pose = frame.getViewerPose(session.renderState.baseLayer);

  if (pose) {
    let glLayer = session.renderState.baseLayer;
    gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    for (let view of pose.views) {
      let viewport = glLayer.getViewport(view);
      gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
      scene.draw(view.projectionMatrix, view.transform);
    }
  }
}

// Add event listener for the #enter-xr button
document.getElementById('enter-xr').addEventListener('click', () => {
  if (xrButton && xrButton.enabled) {
    onRequestSession();
  } else {
    alert('WebXR is not supported or the session is not enabled.');
  }
});

initXR();