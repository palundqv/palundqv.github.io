// This file contains mathematical functions and classes for handling vectors and matrices, essential for 3D transformations.

class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    subtract(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }

    scale(scalar) {
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const len = this.length();
        return len > 0 ? this.scale(1 / len) : new Vec2();
    }
}

class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v) {
        return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    subtract(v) {
        return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    scale(scalar) {
        return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v) {
        return new Vec3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize() {
        const len = this.length();
        return len > 0 ? this.scale(1 / len) : new Vec3();
    }
}

class Mat4 {
    constructor() {
        this.m = new Float32Array(16);
        this.identity();
    }

    identity() {
        this.m.set([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        return this;
    }

    multiply(mat) {
        const a = this.m;
        const b = mat.m;
        const result = new Mat4();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result.m[i * 4 + j] =
                    a[i * 4 + 0] * b[0 * 4 + j] +
                    a[i * 4 + 1] * b[1 * 4 + j] +
                    a[i * 4 + 2] * b[2 * 4 + j] +
                    a[i * 4 + 3] * b[3 * 4 + j];
            }
        }
        return result;
    }

    translate(v) {
        const m = this.m;
        m[12] += v.x;
        m[13] += v.y;
        m[14] += v.z;
        return this;
    }

    rotateX(angle) {
        const m = this.m;
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const m1 = m.slice();
        m[4] = m1[4] * c + m1[8] * s;
        m[5] = m1[5] * c + m1[9] * s;
        m[6] = m1[6] * c + m1[10] * s;
        m[7] = m1[7] * c + m1[11] * s;
        m[8] = m1[4] * -s + m1[8] * c;
        m[9] = m1[5] * -s + m1[9] * c;
        m[10] = m1[6] * -s + m1[10] * c;
        m[11] = m1[7] * -s + m1[11] * c;
        return this;
    }

    rotateY(angle) {
        const m = this.m;
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const m1 = m.slice();
        m[0] = m1[0] * c + m1[8] * -s;
        m[1] = m1[1] * c + m1[9] * -s;
        m[2] = m1[2] * c + m1[10] * -s;
        m[3] = m1[3] * c + m1[11] * -s;
        m[8] = m1[0] * s + m1[8] * c;
        m[9] = m1[1] * s + m1[9] * c;
        m[10] = m1[2] * s + m1[10] * c;
        m[11] = m1[3] * s + m1[11] * c;
        return this;
    }

    rotateZ(angle) {
        const m = this.m;
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const m1 = m.slice();
        m[0] = m1[0] * c + m1[4] * s;
        m[1] = m1[1] * c + m1[5] * s;
        m[2] = m1[2] * c + m1[6] * s;
        m[3] = m1[3] * c + m1[7] * s;
        m[4] = m1[0] * -s + m1[4] * c;
        m[5] = m1[1] * -s + m1[5] * c;
        m[6] = m1[2] * -s + m1[6] * c;
        m[7] = m1[3] * -s + m1[7] * c;
        return this;
    }
}

export { Vec2, Vec3, Mat4 };