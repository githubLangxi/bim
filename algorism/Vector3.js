/**
 * Vector3向量工具类
 * */

let Vector3 = function(){

};

Vector3.prototype.constructor = Vector3;

Vector3.new = function () {
    let out = new Float32Array(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

Vector3.new_d = function () {
    let out = new Float64Array(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

//clone，创建一个value的拷贝
Vector3.clone = function (value) {
    let out = new Float32Array(3);
    out[0] = value[0];
    out[1] = value[1];
    out[2] = value[2];
    return out;
};

Vector3.clone_d = function (value) {
    let out = new Float64Array(3);
    out[0] = value[0];
    out[1] = value[1];
    out[2] = value[2];
    return out;
};

//create
Vector3.create = function (x, y, z) {
    let out = new Float32Array(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

Vector3.create_d = function (x, y, z) {
    let out = new Float64Array(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

//copy
Vector3.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

//set
Vector3.set = function (out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

//add 参数可作为结果复用
Vector3.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

//sub 参数可作为结果复用
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
}
Vector3.subtract = Vector3.sub = subtract;

//multiply out=a*b 参数可作为结果复用
function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
}
Vector3.multiply = Vector3.mul = multiply;

//divide out=a/b 参数可作为结果复用
function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
}
Vector3.divide = Vector3.div = divide;

//ceil 参数可作为结果复用
Vector3.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
};

//floor 参数可作为结果复用
Vector3.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
};

//min 参数可作为结果复用
Vector3.min = function (out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

//max 参数可作为结果复用
Vector3.max = function (out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

//round 参数可作为结果复用
Vector3.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
};

//scale 参数可作为结果复用
Vector3.scale = function (out, a, scale) {
    out[0] = a[0] * scale;
    out[1] = a[1] * scale;
    out[2] = a[2] * scale;
    return out;
};

//scaleAndAdd out=a+b*scale 参数可作为结果复用
Vector3.scaleAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + ( b[0] * scale );
    out[1] = a[1] + ( b[1] * scale );
    out[2] = a[2] + ( b[2] * scale );
    return out;
};

//distance
function distance(a, b) {
    let x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x * x + y * y + z * z);
}
Vector3.distance = Vector3.dist = distance;

//squaredDistance
function squaredDistance(a, b) {
    let x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x * x + y * y + z * z;
}
Vector3.squaredDistance = Vector3.sqrDist = squaredDistance;

//length
function length(a) {
    let x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
}
Vector3.length = Vector3.len = length;

//squaredLength
function squaredLength(a) {
    let x = a[0],
        y = a[1],
        z = a[2];
    return x * x + y * y + z * z;
}
Vector3.squaredLength = Vector3.sqrLen = squaredLength;

//normalize 参数可作为结果复用
Vector3.normalize = function (out, a) {
    let x = a[0],
        y = a[1],
        z = a[2];
    let len = x * x + y * y + z * z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

//negate out=-a 取反 参数可作为结果复用
Vector3.negate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

//inverse out=1/a 倒数 参数可作为结果复用
Vector3.inverse = function (out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    return out;
};

/**
 * Calculates the dot product of two Vec3's
 *
 * @param {Vector3} a the first operand
 * @param {Vector3} b the second operand
 * @returns {Number} dot product of a and b
 */
Vector3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two Vec3's
 *
 * @param {Vector3} out the receiving vector
 * @param {Vector3} a the first operand
 * @param {Vector3} b the second operand
 * @returns {Vector3} out
 */
//参数可作为结果复用
Vector3.cross = function (out, a, b) {
    let ax = a[0],
        ay = a[1],
        az = a[2],
        bx = b[0],
        by = b[1],
        bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two Vec3's
 *
 * @param {Vector3} out the receiving vector
 * @param {Vector3} a the first operand
 * @param {Vector3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {Vector3} out
 */
//参数可作为结果复用
Vector3.lerp = function (out, a, b, t) {
    let ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * ( b[0] - ax );
    out[1] = ay + t * ( b[1] - ay );
    out[2] = az + t * ( b[2] - az );
    return out;
};

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {Vector3} out the receiving vector
 * @param {Vector3} a the first operand
 * @param {Vector3} b the second operand
 * @param {Vector3} c the third operand
 * @param {Vector3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {Vector3} out
 */
Vector3.hermite = function (out, a, b, c, d, t) {
    let factorTimes2 = t * t,
        factor1 = factorTimes2 * ( 2 * t - 3 ) + 1,
        factor2 = factorTimes2 * ( t - 2 ) + t,
        factor3 = factorTimes2 * ( t - 1 ),
        factor4 = factorTimes2 * ( 3 - 2 * t );

    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

    return out;
};

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {Vector3} out the receiving vector
 * @param {Vector3} a the first operand
 * @param {Vector3} b the second operand
 * @param {Vector3} c the third operand
 * @param {Vector3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {Vector3} out
 */
Vector3.bezier = function (out, a, b, c, d, t) {
    let inverseFactor = 1 - t,
        inverseFactorTimesTwo = inverseFactor * inverseFactor,
        factorTimes2 = t * t,
        factor1 = inverseFactorTimesTwo * inverseFactor,
        factor2 = 3 * t * inverseFactorTimesTwo,
        factor3 = 3 * factorTimes2 * inverseFactor,
        factor4 = factorTimes2 * t;

    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {Vector3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {Vector3} out
 */
Vector3.random = function (out, scale) {
    scale = scale || 1.0;

    let r = Math.random() * 2.0 * Math.PI;
    let z = ( Math.random() * 2.0 ) - 1.0;
    let zScale = Math.sqrt(1.0 - z * z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the Vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {Vector3} out the receiving vector
 * @param {Vector3} a the vector to transform
 * @param {Matrix4} m matrix to transform with
 * @returns {Vector3} out
 */
Vector3.transformMat4 = function (out, a, m) {
    let x = a[0],
        y = a[1],
        z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = ( m[0] * x + m[4] * y + m[8] * z + m[12] ) / w;
    out[1] = ( m[1] * x + m[5] * y + m[9] * z + m[13] ) / w;
    out[2] = ( m[2] * x + m[6] * y + m[10] * z + m[14] ) / w;
    return out;
};

/**
 * Transforms the Vec3 with a mat3.
 *
 * @param {Vector3} out the receiving vector
 * @param {Vector3} a the vector to transform
 * @param {Matrix4} m the 3x3 matrix to transform with
 * @returns {Vector3} out
 */
Vector3.transformMat3 = function (out, a, m) {
    let x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the Vec3 with a quat
 *
 * @param {Vector3} out the receiving vector
 * @param {Vector3} a the vector to transform
 * @param {Quaternion} q quaternion to transform with
 * @returns {Vector3} out
 */
Vector3.transformQuat = function (out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-Vec3-implementations

    let x = a[0],
        y = a[1],
        z = a[2],
        qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {Vector3} out The receiving Vec3
 * @param {Vector3} a The Vec3 point to rotate
 * @param {Vector3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {Vector3} out
 */
Vector3.rotateX = function (out, a, b, c) {
    let p = [],
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0];
    r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
    r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {Vector3} out The receiving Vec3
 * @param {Vector3} a The Vec3 point to rotate
 * @param {Vector3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {Vector3} out
 */
Vector3.rotateY = function (out, a, b, c) {
    let p = [],
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {Vector3} out The receiving Vec3
 * @param {Vector3} a The Vec3 point to rotate
 * @param {Vector3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {Vector3} out
 */
Vector3.rotateZ = function (out, a, b, c) {
    let p = [],
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
    r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
    r[2] = p[2];

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each Vec3.prototype. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
Vector3.forEach = function (a, stride, offset, count, fn, arg) {
    let i, l;
    if (!stride) {
        stride = 3;
    }

    if (!offset) {
        offset = 0;
    }

    if (count) {
        l = Math.min(( count * stride ) + offset, a.length);
    } else {
        l = a.length;
    }

    let vec = Vector3.create();
    for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
    }
    return a;
};


/**
 * Get the angle between two 3D vectors
 * @param {Vector3} a The first operand
 * @param {Vector3} b The second operand
 * @returns {Number} The angle in radians
 */
Vector3.angle = function (a, b) {

    let tempA = Vector3.create(a[0], a[1], a[2]);
    let tempB = Vector3.create(b[0], b[1], b[2]);

    Vector3.normalize(tempA, tempA);
    Vector3.normalize(tempB, tempB);

    let cosine = Vector3.dot(tempA, tempB);

    if (cosine > 1.0) {
        return 0;
    } else {
        return Math.acos(cosine);
    }
};

/**
 * Returns a string representation of a vector
 *
 * @param {Vector3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
Vector3.str = function (a) {
    return 'Vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {Vector3} a The first vector.
 * @param {Vector3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
Vector3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {Vector3} a The first vector.
 * @param {Vector3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
Vector3.equals = function (a, b) {
    let a0 = a[0],
        a1 = a[1],
        a2 = a[2];
    let b0 = b[0],
        b1 = b[1],
        b2 = b[2];
    return ( Math.abs(a0 - b0) <= 0.00001 * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <= 0.00001 * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
        Math.abs(a2 - b2) <= 0.00001 * Math.max(1.0, Math.abs(a2), Math.abs(b2)) );
};