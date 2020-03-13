let LoadManager = function(){

};

Object.assign(LoadManager.prototype, {
    load:function(){
        //进度条
        let onProgress = function(xhr){
            if(xhr.lengthComputable){
                let percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round( percentComplete, 2 ) + '% downloaded');
            }
        };
        //报错回调
        let onError = function(xhr){};
        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
        new THREE.MTLLoader()
            .setPath('./models/')
            .load('fgh7.mtl', function(materials){
                materials.preload();
                new THREE.OBJLoader()
                    .setMaterials(materials)
                    .setPath('./models/')
                    .load('fgh7.obj', function(object){
                        scene.add(object);
                        let cameraManager = new CameraManager();
                        cameraManager.initCamera();
                        let pointLight = new THREE.PointLight(0xffffff, 0.8);
                        camera.add(pointLight);
                        scene.add(camera);
                        let controlManager = new ControlManager();
                        controlManager.initControls();
                        let drawManager = new DrawManager();
                        drawManager.startLoop();
                    }, onProgress, onError);
            });
    }
});