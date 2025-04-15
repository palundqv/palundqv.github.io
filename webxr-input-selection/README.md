# WebXR Input Selection Project

This project demonstrates the use of WebXR for input selection in immersive environments. It provides a simple interface for users to interact with virtual objects using their hands or controllers.

## Project Structure

```
webxr-input-selection
├── src
│   ├── index.html          # Homepage of the project
│   ├── css
│   │   └── styles.css      # Styles for the project
│   ├── js
│   │   ├── app.js          # Main JavaScript file
│   │   ├── util
│   │   │   └── webxr-button.js # Utility for WebXR button
│   │   ├── render
│   │   │   ├── core
│   │   │   │   ├── node.js          # Node class for scene graph
│   │   │   │   ├── renderer.js      # Renderer class for WebGL
│   │   │   ├── geometry
│   │   │   │   └── box-builder.js   # BoxBuilder class for geometries
│   │   │   ├── materials
│   │   │   │   └── pbr.js           # PbrMaterial class for rendering
│   │   │   ├── math
│   │   │   │   ├── gl-matrix.js     # Math functions for 3D
│   │   │   │   └── ray.js           # Ray class for hit testing
│   │   │   └── scenes
│   │   │       └── scene.js         # Scene class for managing nodes
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd webxr-input-selection
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Open `src/index.html` in a web browser that supports WebXR to see the project in action.

## Usage

- Click the "Enter XR" button to start an immersive session.
- Use your hands or controllers to interact with the virtual objects in the scene.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.