class PbrMaterial {
  constructor() {
    this.baseColorFactor = { value: [1.0, 1.0, 1.0, 1.0] }; // Default white color
    this.metallicFactor = 0.0; // Default metallic factor
    this.roughnessFactor = 1.0; // Default roughness factor
  }

  setBaseColor(r, g, b, a = 1.0) {
    this.baseColorFactor.value = [r, g, b, a];
  }

  setMetallic(metallic) {
    this.metallicFactor = metallic;
  }

  setRoughness(roughness) {
    this.roughnessFactor = roughness;
  }

  getMaterialProperties() {
    return {
      baseColor: this.baseColorFactor.value,
      metallic: this.metallicFactor,
      roughness: this.roughnessFactor,
    };
  }
}

export { PbrMaterial };