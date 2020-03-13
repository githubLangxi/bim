let RenderManager = function(){

};

Object.assign(RenderManager.prototype, {
    initRenderer:function(){
        renderer = new THREE.WebGLRenderer({
            canvas:document.getElementById('canvas'),
            antialias:true,
            alpha:true
        });
        let pixelRatio = window.devicePixelRatio < 1.5 ? 1.5 : window.devicePixelRatio;
        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});