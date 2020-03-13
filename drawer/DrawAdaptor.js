let camera, scene, renderer, controls;

init();

function init(){
    scene = new THREE.Scene();
    let ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    let loadManager = new LoadManager();
    loadManager.load();

    let renderManager = new RenderManager();
    renderManager.initRenderer();

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}