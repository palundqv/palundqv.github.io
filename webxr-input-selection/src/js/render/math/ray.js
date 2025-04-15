class Ray {
    constructor(origin, direction) {
        this.origin = origin; // The starting point of the ray
        this.direction = direction; // The direction of the ray
    }

    // Method to compute a point along the ray at a given distance
    getPoint(distance) {
        return {
            x: this.origin.x + this.direction.x * distance,
            y: this.origin.y + this.direction.y * distance,
            z: this.origin.z + this.direction.z * distance
        };
    }

    // Method to check if the ray intersects with a bounding box
    intersectsBox(boxMin, boxMax) {
        let tMin = (boxMin.x - this.origin.x) / this.direction.x;
        let tMax = (boxMax.x - this.origin.x) / this.direction.x;

        if (tMin > tMax) [tMin, tMax] = [tMax, tMin];

        let tyMin = (boxMin.y - this.origin.y) / this.direction.y;
        let tyMax = (boxMax.y - this.origin.y) / this.direction.y;

        if (tyMin > tyMax) [tyMin, tyMax] = [tyMax, tyMin];

        if ((tMin > tyMax) || (tyMin > tMax)) return false;

        if (tyMin > tMin) tMin = tyMin;
        if (tyMax < tMax) tMax = tyMax;

        let tzMin = (boxMin.z - this.origin.z) / this.direction.z;
        let tzMax = (boxMax.z - this.origin.z) / this.direction.z;

        if (tzMin > tzMax) [tzMin, tzMax] = [tzMax, tzMin];

        if ((tMin > tzMax) || (tzMin > tMax)) return false;

        return true; // The ray intersects the box
    }
}

export { Ray };