// This file provides functionality for creating a WebXR button that allows users to enter XR sessions.

class WebXRButton {
    constructor(options) {
        this.options = options;
        this.domElement = this.createButton();
        this.enabled = false;
        this.session = null;
    }

    createButton() {
        const button = document.getElementById('enter-xr') || document.createElement('button');
        if (!document.getElementById('enter-xr')) {
            button.textContent = 'Enter XR';
            document.body.appendChild(button);
        }
        button.onclick = () => this.onClick();
        return button;
    }

    onClick() {
        if (this.enabled) {
            this.options.onRequestSession();
        }
    }

    setSession(session) {
        this.session = session;
        this.domElement.textContent = session ? 'Exit XR' : 'Enter XR';
    }
}

// Export the WebXRButton class
export { WebXRButton };