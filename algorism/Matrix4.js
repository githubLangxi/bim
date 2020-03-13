/**
 * 矩阵工具类
 * */

let Matrix4 = function(){

};

Matrix4.prototype.constructor = Matrix4;

Matrix4.new = function () {//创建一个4x4单位矩阵
    let out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

Matrix4.new_d = function () {//创建一个4x4单位矩阵
    let out = new Float64Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

Matrix4.clone = function (a) {
    let out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

Matrix4.clone_d = function (a) {
    let out = new Float64Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

Matrix4.create = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    let out = new Float32Array(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

Matrix4.create_d = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    let out = new Float64Array(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

Matrix4.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

Matrix4.set = function (out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

Matrix4.identity = function (out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

Matrix4.transpose = function (out, a) {
    if (out === a) {
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    return out;
};

//逆矩阵
Matrix4.invert = function (out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = ( a11 * b11 - a12 * b10 + a13 * b09 ) * det;
    out[1] = ( a02 * b10 - a01 * b11 - a03 * b09 ) * det;
    out[2] = ( a31 * b05 - a32 * b04 + a33 * b03 ) * det;
    out[3] = ( a22 * b04 - a21 * b05 - a23 * b03 ) * det;
    out[4] = ( a12 * b08 - a10 * b11 - a13 * b07 ) * det;
    out[5] = ( a00 * b11 - a02 * b08 + a03 * b07 ) * det;
    out[6] = ( a32 * b02 - a30 * b05 - a33 * b01 ) * det;
    out[7] = ( a20 * b05 - a22 * b02 + a23 * b01 ) * det;
    out[8] = ( a10 * b10 - a11 * b08 + a13 * b06 ) * det;
    out[9] = ( a01 * b08 - a00 * b10 - a03 * b06 ) * det;
    out[10] = ( a30 * b04 - a31 * b02 + a33 * b00 ) * det;
    out[11] = ( a21 * b02 - a20 * b04 - a23 * b00 ) * det;
    out[12] = ( a11 * b07 - a10 * b09 - a12 * b06 ) * det;
    out[13] = ( a00 * b09 - a01 * b07 + a02 * b06 ) * det;
    out[14] = ( a31 * b01 - a30 * b03 - a32 * b00 ) * det;
    out[15] = ( a20 * b03 - a21 * b01 + a22 * b00 ) * det;
    return out;
};

//伴随矩阵
Matrix4.adjoint = function (out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0] = ( a11 * ( a22 * a33 - a23 * a32 ) - a21 * ( a12 * a33 - a13 * a32 ) + a31 * ( a12 * a23 - a13 * a22 ) );
    out[1] = -( a01 * ( a22 * a33 - a23 * a32 ) - a21 * ( a02 * a33 - a03 * a32 ) + a31 * ( a02 * a23 - a03 * a22 ) );
    out[2] = ( a01 * ( a12 * a33 - a13 * a32 ) - a11 * ( a02 * a33 - a03 * a32 ) + a31 * ( a02 * a13 - a03 * a12 ) );
    out[3] = -( a01 * ( a12 * a23 - a13 * a22 ) - a11 * ( a02 * a23 - a03 * a22 ) + a21 * ( a02 * a13 - a03 * a12 ) );
    out[4] = -( a10 * ( a22 * a33 - a23 * a32 ) - a20 * ( a12 * a33 - a13 * a32 ) + a30 * ( a12 * a23 - a13 * a22 ) );
    out[5] = ( a00 * ( a22 * a33 - a23 * a32 ) - a20 * ( a02 * a33 - a03 * a32 ) + a30 * ( a02 * a23 - a03 * a22 ) );
    out[6] = -( a00 * ( a12 * a33 - a13 * a32 ) - a10 * ( a02 * a33 - a03 * a32 ) + a30 * ( a02 * a13 - a03 * a12 ) );
    out[7] = ( a00 * ( a12 * a23 - a13 * a22 ) - a10 * ( a02 * a23 - a03 * a22 ) + a20 * ( a02 * a13 - a03 * a12 ) );
    out[8] = ( a10 * ( a21 * a33 - a23 * a31 ) - a20 * ( a11 * a33 - a13 * a31 ) + a30 * ( a11 * a23 - a13 * a21 ) );
    out[9] = -( a00 * ( a21 * a33 - a23 * a31 ) - a20 * ( a01 * a33 - a03 * a31 ) + a30 * ( a01 * a23 - a03 * a21 ) );
    out[10] = ( a00 * ( a11 * a33 - a13 * a31 ) - a10 * ( a01 * a33 - a03 * a31 ) + a30 * ( a01 * a13 - a03 * a11 ) );
    out[11] = -( a00 * ( a11 * a23 - a13 * a21 ) - a10 * ( a01 * a23 - a03 * a21 ) + a20 * ( a01 * a13 - a03 * a11 ) );
    out[12] = -( a10 * ( a21 * a32 - a22 * a31 ) - a20 * ( a11 * a32 - a12 * a31 ) + a30 * ( a11 * a22 - a12 * a21 ) );
    out[13] = ( a00 * ( a21 * a32 - a22 * a31 ) - a20 * ( a01 * a32 - a02 * a31 ) + a30 * ( a01 * a22 - a02 * a21 ) );
    out[14] = -( a00 * ( a11 * a32 - a12 * a31 ) - a10 * ( a01 * a32 - a02 * a31 ) + a30 * ( a01 * a12 - a02 * a11 ) );
    out[15] = ( a00 * ( a11 * a22 - a12 * a21 ) - a10 * ( a01 * a22 - a02 * a21 ) + a20 * ( a01 * a12 - a02 * a11 ) );
    return out;
};

//行列式
Matrix4.determinant = function (a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two Mat4's explicitly not using SIMD
 *
 * @param {Matrix4} out the receiving matrix
 * @param {Matrix4} a the first operand
 * @param {Matrix4} b the second operand
 * @returns {Matrix4} out
 */
Matrix4.multiply = function (out, a, b) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
};
Matrix4.mul = Matrix4.multiply;

/**
 * Translate a Mat4 by the given vector not using SIMD
 *
 * @param {Matrix4} out the receiving matrix
 * @param {Matrix4} a the matrix to translate
 * @param {Vector3} v vector to translate by
 * @returns {Matrix4} out
 */
Matrix4.translate = function (out, a, v) {
    let x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];

        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a03;
        out[4] = a10;
        out[5] = a11;
        out[6] = a12;
        out[7] = a13;
        out[8] = a20;
        out[9] = a21;
        out[10] = a22;
        out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the Mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {Matrix4} out the receiving matrix
 * @param {Matrix4} a the matrix to scale
 * @param {Vector3} v the vec3 to scale the matrix by
 * @returns {Matrix4} out
 **/
Matrix4.scale = function (out, a, v) {
    let x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a Mat4 by the given angle around the given axis
 *
 * @param {Matrix4} out the receiving matrix
 * @param {Matrix4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {Vector3} axis the axis to rotate around
 * @returns {Matrix4} out
 */
Matrix4.rotate = function (out, a, rad, axis) {
    let x = axis[0],
        y = axis[1],
        z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < 0.00001) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis not using SIMD
 *
 * @param {Matrix4} out the receiving matrix
 * @param {Matrix4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Matrix4} out
 */
Matrix4.rotateX = function (out, a, rad) {
    let s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis not using SIMD
 *
 * @param {Matrix4} out the receiving matrix
 * @param {Matrix4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Matrix4} out
 */
Matrix4.rotateY = function (out, a, rad) {
    let s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis not using SIMD
 *
 * @param {Matrix4} out the receiving matrix
 * @param {Matrix4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Matrix4} out
 */
Matrix4.rotateZ = function (out, a, rad) {
    let s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.translate(dest, dest, vec);
 *
 * @param {Matrix4} out Mat4 receiving operation result
 * @param {Vector3} v Translation vector
 * @returns {Matrix4} out
 */
Matrix4.fromTranslation = function (out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.scale(dest, dest, vec);
 *
 * @param {Matrix4} out Mat4 receiving operation result
 * @param {Vector3} v Scaling vector
 * @returns {Matrix4} out
 */
Matrix4.fromScaling = function (out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.rotate(dest, dest, rad, axis);
 *
 * @param {Matrix4} out Mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {Vector3} axis the axis to rotate around
 * @returns {Matrix4} out
 */
Matrix4.fromRotation = function (out, rad, axis) {
    let x = axis[0],
        y = axis[1],
        z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t;

    if (Math.abs(len) < 0.00001) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.rotateX(dest, dest, rad);
 *
 * @param {Matrix4} out Mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Matrix4} out
 */
Matrix4.fromXRotation = function (out, rad) {
    let s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.rotateY(dest, dest, rad);
 *
 * @param {Matrix4} out Mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Matrix4} out
 */
Matrix4.fromYRotation = function (out, rad) {
    let s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.rotateZ(dest, dest, rad);
 *
 * @param {Matrix4} out Mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Matrix4} out
 */
Matrix4.fromZRotation = function (out, rad) {
    let s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.translate(dest, vec);
 *     let quatMat = Mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     Mat4.multiply(dest, quatMat);
 *
 * @param {Matrix4} out Mat4 receiving operation result
 * @param {Quaternion} q Rotation quaternion
 * @param {Vector3} v Translation vector
 * @returns {Matrix4} out
 */
Matrix4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    let x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - ( yy + zz );
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - ( xx + zz );
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - ( xx + yy );
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {Vector3} out Vector to receive translation component
 * @param  {Matrix4} mat Matrix to be decomposed (input)
 * @return {Vector3} out
 */
Matrix4.getTranslation = function (out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];

    return out;
};

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {Quaternion} out Quaternion to receive the rotation component
 * @param {Matrix4} mat Matrix to be decomposed (input)
 * @return {Quaternion} out
 */
Matrix4.getRotation = function (out, mat) {
    let trace = mat[0] + mat[5] + mat[10];
    let S = 0;

    if (trace > 0) {
        S = Math.sqrt(trace + 1.0) * 2;
        out[3] = 0.25 * S;
        out[0] = ( mat[6] - mat[9] ) / S;
        out[1] = ( mat[8] - mat[2] ) / S;
        out[2] = ( mat[1] - mat[4] ) / S;
    } else if (( mat[0] > mat[5] ) & ( mat[0] > mat[10] )) {
        S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
        out[3] = ( mat[6] - mat[9] ) / S;
        out[0] = 0.25 * S;
        out[1] = ( mat[1] + mat[4] ) / S;
        out[2] = ( mat[8] + mat[2] ) / S;
    } else if (mat[5] > mat[10]) {
        S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
        out[3] = ( mat[8] - mat[2] ) / S;
        out[0] = ( mat[1] + mat[4] ) / S;
        out[1] = 0.25 * S;
        out[2] = ( mat[6] + mat[9] ) / S;
    } else {
        S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
        out[3] = ( mat[1] - mat[4] ) / S;
        out[0] = ( mat[8] + mat[2] ) / S;
        out[1] = ( mat[6] + mat[9] ) / S;
        out[2] = 0.25 * S;
    }

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.translate(dest, vec);
 *     let quatMat = Mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     Mat4.multiply(dest, quatMat);
 *     Mat4.scale(dest, scale)
 *
 * @param {Matrix4} out Mat4 receiving operation result
 * @param {Quaternion} q Rotation quaternion
 * @param {Vector3} v Translation vector
 * @param {Vector3} s Scaling vector
 * @returns {Matrix4} out
 */
Matrix4.fromRotationTranslationScale = function (out, q, v, s) {
    // Quaternion math
    let x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2];

    out[0] = ( 1 - ( yy + zz ) ) * sx;
    out[1] = ( xy + wz ) * sx;
    out[2] = ( xz - wy ) * sx;
    out[3] = 0;
    out[4] = ( xy - wz ) * sy;
    out[5] = ( 1 - ( xx + zz ) ) * sy;
    out[6] = ( yz + wx ) * sy;
    out[7] = 0;
    out[8] = ( xz + wy ) * sz;
    out[9] = ( yz - wx ) * sz;
    out[10] = ( 1 - ( xx + yy ) ) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.translate(dest, vec);
 *     Mat4.translate(dest, origin);
 *     let quatMat = Mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     Mat4.multiply(dest, quatMat);
 *     Mat4.scale(dest, scale)
 *     Mat4.translate(dest, negativeOrigin);
 *
 * @param {Matrix4} out Mat4 receiving operation result
 * @param {Quaternion} q Rotation quaternion
 * @param {Vector3} v Translation vector
 * @param {Vector3} s Scaling vector
 * @param {Vector3} o The origin vector around which to scale and rotate
 * @returns {Matrix4} out
 */
Matrix4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
    // Quaternion math
    let x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,

        sx = s[0],
        sy = s[1],
        sz = s[2],

        ox = o[0],
        oy = o[1],
        oz = o[2];

    out[0] = ( 1 - ( yy + zz ) ) * sx;
    out[1] = ( xy + wz ) * sx;
    out[2] = ( xz - wy ) * sx;
    out[3] = 0;
    out[4] = ( xy - wz ) * sy;
    out[5] = ( 1 - ( xx + zz ) ) * sy;
    out[6] = ( yz + wx ) * sy;
    out[7] = 0;
    out[8] = ( xz + wy ) * sz;
    out[9] = ( yz - wx ) * sz;
    out[10] = ( 1 - ( xx + yy ) ) * sz;
    out[11] = 0;
    out[12] = v[0] + ox - ( out[0] * ox + out[4] * oy + out[8] * oz );
    out[13] = v[1] + oy - ( out[1] * ox + out[5] * oy + out[9] * oz );
    out[14] = v[2] + oz - ( out[2] * ox + out[6] * oy + out[10] * oz );
    out[15] = 1;

    return out;
};

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {Matrix4} out Mat4 receiving operation result
 * @param {Quaternion} q Quaternion to create matrix from
 *
 * @returns {Matrix4} out
 */
Matrix4.fromQuat = function (out, q) {
    let x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {Matrix4} out Mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {Matrix4} out
 */
Matrix4.frustum = function (out, left, right, bottom, top, near, far) {
    let rl = 1 / ( right - left ),
        tb = 1 / ( top - bottom ),
        nf = 1 / ( near - far );
    out[0] = ( near * 2 ) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = ( near * 2 ) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = ( right + left ) * rl;
    out[9] = ( top + bottom ) * tb;
    out[10] = ( far + near ) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = ( far * near * 2 ) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {Matrix4} out Mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {Matrix4} out
 */
Matrix4.perspective = function (out, fovy, aspect, near, far) {
    let f = 1.0 / Math.tan(fovy / 2);
    let nf = 1 / ( near - far );
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = ( far + near ) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = ( 2 * far * near ) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {Matrix4} out Mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {Matrix4} out
 */
Matrix4.perspectiveFromFieldOfView = function (out, fov, near, far) {
    let upTan = Math.tan(fov.upDegrees * Math.PI / 180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI / 180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0),
        xScale = 2.0 / ( leftTan + rightTan ),
        yScale = 2.0 / ( upTan + downTan );

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -( ( leftTan - rightTan ) * xScale * 0.5 );
    out[9] = ( ( upTan - downTan ) * yScale * 0.5 );
    out[10] = far / ( near - far );
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = ( far * near ) / ( near - far );
    out[15] = 0.0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {Matrix4} out Mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {Matrix4} out
 */
Matrix4.ortho = function (out, left, right, bottom, top, near, far) {
    let lr = 1 / ( left - right ),
        bt = 1 / ( bottom - top ),
        nf = 1 / ( near - far );
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = ( left + right ) * lr;
    out[13] = ( top + bottom ) * bt;
    out[14] = ( far + near ) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {Matrix4} out Mat4 frustum matrix will be written into
 * @param {Vector3} eye Position of the viewer
 * @param {Vector3} center Point the viewer is looking at
 * @param {Vector3} up vec3 pointing up
 * @returns {Matrix4} out
 */
Matrix4.lookAt = function (out, eye, center, up) {
    let eyex = eye[0], eyey = eye[1], eyez = eye[2],
        upx = up[0], upy = up[1], upz = up[2],
        centerx = center[0], centery = center[1], centerz = center[2];

    if (Math.abs(eyex - centerx) < Algorithm.EPSILON &&
        Math.abs(eyey - centery) < Algorithm.EPSILON &&
        Math.abs(eyez - centerz) < Algorithm.EPSILON) {
        return Mat4.identity(out);
    }

    //z轴方向
    let z0 = eyex - centerx;
    let z1 = eyey - centery;
    let z2 = eyez - centerz;
    let len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    //x轴
    let x0 = upy * z2 - upz * z1;
    let x1 = upz * z0 - upx * z2;
    let x2 = upx * z1 - upy * z0;
    len = 1 / Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    x0 *= len;
    x1 *= len;
    x2 *= len;

    //y轴
    let y0 = z1 * x2 - z2 * x1;
    let y1 = z2 * x0 - z0 * x2;
    let y2 = z0 * x1 - z1 * x0;
    len = 1 / Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    y0 *= len;
    y1 *= len;
    y2 *= len;

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -( x0 * eyex + x1 * eyey + x2 * eyez );
    out[13] = -( y0 * eyex + y1 * eyey + y2 * eyez );
    out[14] = -( z0 * eyex + z1 * eyey + z2 * eyez );
    out[15] = 1;
    return out;
};

/**
 * Returns a string representation of a Mat4
 *
 * @param {Matrix4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
Matrix4.str = function (a) {
    return 'Mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
        a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
        a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
        a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a Mat4
 *
 * @param {Matrix4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
Matrix4.frob = function (a) {
    return ( Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2)) )
};

/**
 * Adds two Matrix4's
 *
 * @param {Matrix4} out the receiving matrix
 * @param {Matrix4} a the first operand
 * @param {Matrix4} b the second operand
 * @returns {Matrix4} out
 */
Matrix4.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {Matrix4} out the receiving matrix
 * @param {Matrix4} a the first operand
 * @param {Matrix4} b the second operand
 * @returns {Matrix4} out
 */
Matrix4.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
};
Matrix4.sub = Matrix4.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {Matrix4} out the receiving matrix
 * @param {Matrix4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {Matrix4} out
 */
Matrix4.multiplyScalar = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
};

/**
 * Adds two Mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {Matrix4} out the receiving vector
 * @param {Matrix4} a the first operand
 * @param {Matrix4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {Matrix4} out
 */
Matrix4.multiplyScalarAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + ( b[0] * scale );
    out[1] = a[1] + ( b[1] * scale );
    out[2] = a[2] + ( b[2] * scale );
    out[3] = a[3] + ( b[3] * scale );
    out[4] = a[4] + ( b[4] * scale );
    out[5] = a[5] + ( b[5] * scale );
    out[6] = a[6] + ( b[6] * scale );
    out[7] = a[7] + ( b[7] * scale );
    out[8] = a[8] + ( b[8] * scale );
    out[9] = a[9] + ( b[9] * scale );
    out[10] = a[10] + ( b[10] * scale );
    out[11] = a[11] + ( b[11] * scale );
    out[12] = a[12] + ( b[12] * scale );
    out[13] = a[13] + ( b[13] * scale );
    out[14] = a[14] + ( b[14] * scale );
    out[15] = a[15] + ( b[15] * scale );
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {Matrix4} a The first matrix.
 * @param {Matrix4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
Matrix4.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] &&
        a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] &&
        a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] &&
        a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {Matrix4} a The first matrix.
 * @param {Matrix4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
Matrix4.equals = function (a, b) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7],
        a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11],
        a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];

    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3],
        b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7],
        b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11],
        b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];

    return ( Math.abs(a0 - b0) <= 0.00001 * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <= 0.00001 * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
        Math.abs(a2 - b2) <= 0.00001 * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
        Math.abs(a3 - b3) <= 0.00001 * Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
        Math.abs(a4 - b4) <= 0.00001 * Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
        Math.abs(a5 - b5) <= 0.00001 * Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
        Math.abs(a6 - b6) <= 0.00001 * Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
        Math.abs(a7 - b7) <= 0.00001 * Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
        Math.abs(a8 - b8) <= 0.00001 * Math.max(1.0, Math.abs(a8), Math.abs(b8)) &&
        Math.abs(a9 - b9) <= 0.00001 * Math.max(1.0, Math.abs(a9), Math.abs(b9)) &&
        Math.abs(a10 - b10) <= 0.00001 * Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
        Math.abs(a11 - b11) <= 0.00001 * Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
        Math.abs(a12 - b12) <= 0.00001 * Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
        Math.abs(a13 - b13) <= 0.00001 * Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
        Math.abs(a14 - b14) <= 0.00001 * Math.max(1.0, Math.abs(a14), Math.abs(b14)) &&
        Math.abs(a15 - b15) <= 0.00001 * Math.max(1.0, Math.abs(a15), Math.abs(b15)) );
};

Matrix4.getScale = function (out, matrix) {
    out[0] = matrix[0];
    out[1] = matrix[4];
    out[2] = matrix[8];
    let x = Vec3.len(out);
    out[0] = matrix[1];
    out[1] = matrix[5];
    out[2] = matrix[9];
    let y = Vec3.len(out);
    out[0] = matrix[2];
    out[1] = matrix[6];
    out[2] = matrix[10];
    let z = Vec3.len(out);
    Vec3.set(out, x, y, z);
    return out;
};

Matrix4.getSqrScale = function (out, matrix) {
    let tempv = new Float32Array(3);
    tempv[0] = matrix[0];
    tempv[1] = matrix[4];
    tempv[2] = matrix[8];
    out[0] = new Float32Array(3);
    tempv[0] = matrix[1];
    tempv[1] = matrix[5];
    tempv[2] = matrix[9];
    out[1] = new Float32Array(3);
    tempv[0] = matrix[2];
    tempv[1] = matrix[6];
    tempv[2] = matrix[10];
    out[2] = new Float32Array(3);
    return out;
};

/**
 * 统一两个矩阵的基
 * mat1:参考矩阵
 * mat2:要变换基的矩阵
 * */
Matrix4.copyBasis = function(mat1, mat2){
    //x轴基向量
    mat2[0] = mat1[0];
    mat2[1] = mat1[1];
    mat2[2] = mat1[2];
    //y轴基向量
    mat2[4] = mat1[4];
    mat2[5] = mat1[5];
    mat2[6] = mat1[6];
    //z轴基向量
    mat2[8] = mat1[8];
    mat2[9] = mat1[9];
    mat2[10] = mat1[10];
};

/**
 * 根据基向量和原点坐标构造坐标系矩阵
 * v1：x轴向量
 * v2：y轴向量
 * v3：z轴向量
 * origin：原点坐标
 * */
Matrix4.coordinateSystem = function(v1, v2, v3, origin){
    let mat = Matrix4.new();
    //x轴基向量
    mat[0] = v1[0];
    mat[1] = v1[1];
    mat[2] = v1[2];
    //y轴基向量
    mat[4] = v2[0];
    mat[5] = v2[1];
    mat[6] = v2[2];
    //z轴基向量
    mat[8] = v3[0];
    mat[9] = v3[1];
    mat[10] = v3[2];
    //坐标原点
    mat[12] = origin[0];
    mat[13] = origin[1];
    mat[14] = origin[2];
    return mat;
};

/**
 * 将坐标转换到某个坐标系下
 * pos：原坐标系下的坐标
 * mat：坐标系矩阵
 * */
Matrix4.transferVectorByMatrix = function(pos, mat){
    let vec4 = new Float32Array(4);
    vec4[0] = pos[0]; vec4[1] = pos[1]; vec4[2] = pos[2]; vec4[3] = pos[3];
    let mat4 = Matrix4.new();
    Matrix4.copy(mat4, mat);

    let a00 = mat4[0], a01 = mat4[1], a02 = mat4[2], a03 = mat4[3],
        a10 = mat4[4], a11 = mat4[5], a12 = mat4[6], a13 = mat4[7],
        a20 = mat4[8], a21 = mat4[9], a22 = mat4[10], a23 = mat4[11],
        a30 = mat4[12], a31 = mat4[13], a32 = mat4[14], a33 = mat4[15];

    let b0 = vec4[0], b1 = vec4[1], b2 = vec4[2], b3 = vec4[3];

    let out = new Float32Array(4);
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    return out;
};

/**
 * 设置坐标系原点
 * mat:要设置的矩阵
 * origin:原点坐标
 * */
Matrix4.setOrigin = function(mat, origin){
    mat[12] = origin[0];
    mat[13] = origin[1];
    mat[14] = origin[2];
};