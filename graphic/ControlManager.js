let ControlManager = function(){

};

Object.assign(ControlManager.prototype, {
    initControls:function(){
        controls = new THREE.TrackballControls(camera, renderer.domElement);
        controls.rotateSpeed = 1.6;// 旋转速度
        controls.zoomSpeed = 1.6;// 缩放速度
        controls.panSpeed = 0.6;// 平controls
        controls.staticMoving = true;// 静止移动，为 true 则没有惯性
        controls.dynamicDampingFactor = 0.2;// 阻尼系数 越小 则滑动越大
        controls.minDistance = camera.near; // 最小视角
        controls.maxDistance = camera.far / 3 * 2;// 最大视角 Infinity 无穷大
    }
});