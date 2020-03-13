/**
 * 四元数工具类
 * */

let Quaternion = function(){

};

Quaternion.prototype.constructor = Quaternion;

Quaternion.new = function () {
    let out = new Float32Array(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

Quaternion.new_d = function () {
    let out = new Float64Array(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

//clone
Quaternion.clone = function (v) {
    let out = new Float32Array(4);
    out[0] = v[0];
    out[1] = v[1];
    out[2] = v[2];
    out[3] = v[3];
    return out;
};
Quaternion.clone_d = function (v) {
    let out = new Float64Array(4);
    out[0] = v[0];
    out[1] = v[1];
    out[2] = v[2];
    out[3] = v[3];
    return out;
};

//create
Quaternion.create = function (x, y, z, w) {
    let out = new Float32Array(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};
Quaternion.create_d = function (x, y, z, w) {
    let out = new Float64Array(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

//copy
Quaternion.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

//set
Quaternion.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

//makeRotate
Quaternion.makeRotate = function(angle, x, y, z, result) {
    let length = Math.sqrt(x * x + y * y + z * z);
    if (length < 0.00001) {
        return this.init(result);
    }

    let inversenorm = 1.0 / length;
    let coshalfangle = Math.cos(0.5 * angle);
    let sinhalfangle = Math.sin(0.5 * angle);
    let value = sinhalfangle * inversenorm;
    result[0] = x * value;
    result[1] = y * value;
    result[2] = z * value;
    result[3] = coshalfangle;
    return result;
};

//multiply
//result不能用a,b复用
Quaternion.multiply = function(a, b, result) {
    // result[0] = a[0] * b[3] - a[1] * b[2] + a[2] * b[1] + a[3] * b[0];
    // result[1] = a[0] * b[2] + a[1] * b[3] - a[2] * b[0] + a[3] * b[1];
    // result[2] = -a[0] * b[1] + a[1] * b[0] + a[2] * b[3] + a[3] * b[2];
    // result[3] = -a[0] * b[0] - a[1] * b[1] - a[2] * b[2] + a[3] * b[3];

    result[0] = a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0];
    result[1] = -a[0] * b[2] + a[1] * b[3] + a[2] * b[0] + a[3] * b[1];
    result[2] = a[0] * b[1] - a[1] * b[0] + a[2] * b[3] + a[3] * b[2];
    result[3] = -a[0] * b[0] - a[1] * b[1] - a[2] * b[2] + a[3] * b[3];
    return result;
};
Quaternion.mul = Quaternion.multiply;

//transformVec3 q-quat a-vec3 result-vec3
Quaternion.transformVec3 = function(q, a, result) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let qx = q[0];
    let qy = q[1];
    let qz = q[2];
    let qw = q[3];
    // calculate quat * vec
    let ix = qw * x + qy * z - qz * y;
    let iy = qw * y + qz * x - qx * z;
    let iz = qw * z + qx * y - qy * x;
    let iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    result[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    result[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    result[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return result;
};

//从四元数里获取转轴转角
Quaternion.toAxisAngle = function(q){
    let axis = new Float32Array(3);
    let angle = 2 * Math.acos(q[3]);
    axis[0] = q[0] / Math.sqrt(1-q[3]*q[3]);
    axis[1] = q[1] / Math.sqrt(1-q[3]*q[3]);
    axis[2] = q[2] / Math.sqrt(1-q[3]*q[3]);
    return {axis:axis, angle:angle};
};

//四元数线性插值
Quaternion.interpolate = function(q1, q2, t){
    let a = new Float32Array(4);
    let b = new Float32Array(4);
    a[0] = q1[0];
    a[1] = q1[1];
    a[2] = q1[2];
    a[3] = q1[3];
    b[0] = q2[0];
    b[1] = q2[1];
    b[2] = q2[2];
    b[3] = q2[3];
    let v = a[0]*b[0] + a[1]*b[1] + a[2]*b[2] + a[3]*b[3];
    let phi = Math.acos(v);
    if(phi > 0.01){
        a[0] = a[0]*(Math.sin(phi*(1-t))/Math.sin(phi));
        a[1] = a[1]*(Math.sin(phi*(1-t))/Math.sin(phi));
        a[2] = a[2]*(Math.sin(phi*(1-t))/Math.sin(phi));
        a[3] = a[3]*(Math.sin(phi*(1-t))/Math.sin(phi));
        b[0] = b[0]*(Math.sin(phi*t)/Math.sin(phi));
        b[1] = b[1]*(Math.sin(phi*t)/Math.sin(phi));
        b[2] = b[2]*(Math.sin(phi*t)/Math.sin(phi));
        b[3] = b[3]*(Math.sin(phi*t)/Math.sin(phi));
    }
    let c = new Float32Array(4);
    c[0] = a[0] + b[0];
    c[1] = a[1] + b[1];
    c[2] = a[2] + b[2];
    c[3] = a[3] + b[3];
    if(v<-0.999){
        let d = t*(1-t);
        if(c[0] === 0){
            c[0] += d;
        }else{
            c[1] += d;
        }
    }
    let len = c[0] * c[0] + c[1] * c[1] + c[2] * c[2] + c[3] * c[3];
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        c[0] = c[0] * len;
        c[1] = c[1] * len;
        c[2] = c[2] * len;
        c[3] = c[3] * len;
    }
    return c;
};