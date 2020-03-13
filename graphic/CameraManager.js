let CameraManager = function(){
    this._sceneBox = undefined;
};

Object.assign(CameraManager.prototype, {
    initCamera:function(){
        let width = window.innerWidth;
        let height = window.innerHeight;
        let sceneManager = new SceneManager();
        this._sceneBox = sceneManager.getBoundingBox();
        let near = 1;
        let far = this.computeFar();
        camera = new THREE.PerspectiveCamera(30, width/height, near, far);
        this.setCameraPos();
    },

    computeFar:function(){
        let x = this._sceneBox.max.x - this._sceneBox.min.x;
        let y = this._sceneBox.max.y - this._sceneBox.min.y;
        let z = this._sceneBox.max.z - this._sceneBox.min.z;
        return 2 * Math.sqrt(x * x + y * y + z * z);
    },

    setCameraPos:function(){
        let x = this._sceneBox.max.x - this._sceneBox.min.x;
        let y = this._sceneBox.max.y - this._sceneBox.min.y;
        let z = this._sceneBox.max.z - this._sceneBox.min.z;
        let dist = Math.sqrt(x * x + y * y + z * z);
        camera.position.set(0, 0, dist);
    }
});