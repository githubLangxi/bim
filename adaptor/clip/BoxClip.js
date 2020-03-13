let BoxClip = function(){
    this._boxClipHelper = undefined;
    this._dragging = false;
    this._lastPos = [0, 0, 0];
};

Object.assign(BoxClip.prototype, {
    //初始化
    init:function(){
        this._boxClipHelper = new BoxClipHelper();
        this._boxClipHelper.initBox();
        scene.add(this._boxClipHelper._obj);
        //修正模型材质启用clip
        let sceneManager = new SceneManager();
        let modelGroup = sceneManager.getModelGroup();
        sceneManager.enableClip(modelGroup, [this._boxClipHelper._topPlane, this._boxClipHelper._bottomPlane, this._boxClipHelper._frontPlane, this._boxClipHelper._backPlane, this._boxClipHelper._leftPlane, this._boxClipHelper._rightPlane]);
        renderer.localClippingEnabled = true;
        renderer.render(scene, camera);
    },

    destroy:function(){
        let sceneManager = new SceneManager();
        this._boxClipHelper.destoryBox();
        sceneManager.clearNode(scene, this._boxClipHelper._obj.name);
        let modelGroup = sceneManager.getModelGroup();
        sceneManager.disableClip(modelGroup);
        renderer.localClippingEnabled = false;
        renderer.render(scene, camera);
    },

    mouseDown:function(x, y){
        let mouse = new THREE.Vector2();
        let raycaster = new THREE.Raycaster();
        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = - (y / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        //交模型mesh列表
        let sceneManager = new SceneManager();
        let modelMeshes = sceneManager.getMeshesFromCertainGroup("BoxClipGroup");
        let intersects = raycaster.intersectObjects(modelMeshes);
        //交到模型
        if (intersects.length > 0){
            this._dragging = true;
            this._lastPos = [x, y, 0];
            this._boxClipHelper._planeUpdate = intersects[0].object.name;
        }
    },

    mouseMove:function(x, y){
        if(this._dragging){
            let mouse = new THREE.Vector2();
            let raycaster = new THREE.Raycaster();
            mouse.x = (x / window.innerWidth) * 2 - 1;
            mouse.y = - (y / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            //交剖切面
            let sceneManager = new SceneManager();
            sceneManager.findCertainMesh(this._boxClipHelper._obj, this._boxClipHelper._planeUpdate);
            let planeMesh = sceneManager._certainMesh;
            let intersects = raycaster.intersectObject(planeMesh);
            if(intersects.length > 0){//交到剖面
                let currPos = [x, y, 0];
                if(this._boxClipHelper._planeUpdate === "BoxClipTopPlane"){
                    //将y轴向量投影到屏幕上
                    let axisY = this._boxClipHelper.computeScreenYDir();
                    let dragDir = Vector3.new();
                    Vector3.sub(dragDir, currPos, this._lastPos);
                    let angle = Vector3.angle(dragDir, axisY);
                    let distance = Vector3.len(dragDir);
                    distance *= Math.cos(angle);
                    if(distance < 0
                        && this._boxClipHelper._yMax - this._boxClipHelper._yMin + distance <= 0){
                        this._dragging = false;
                        this._lastPos = [0, 0, 0];
                        this._boxClipHelper._planeUpdate = "";
                    }else{
                        this._boxClipHelper.updateBox(distance);
                    }
                }else if(this._boxClipHelper._planeUpdate === "BoxClipBottomPlane"){
                    //将y轴向量投影到屏幕上
                    let axisY = this._boxClipHelper.computeScreenYDir();
                    let dragDir = Vector3.new();
                    Vector3.sub(dragDir, currPos, this._lastPos);
                    let angle = Vector3.angle(dragDir, axisY);
                    let distance = Vector3.len(dragDir);
                    distance *= Math.cos(angle);
                    if(distance > 0
                        && this._boxClipHelper._yMax - this._boxClipHelper._yMin - distance <= 0){
                        this._dragging = false;
                        this._lastPos = [0, 0, 0];
                        this._boxClipHelper._planeUpdate = "";
                    }else{
                        this._boxClipHelper.updateBox(distance);
                    }
                }else if(this._boxClipHelper._planeUpdate === "BoxClipFrontPlane"){
                    //将z轴向量投影到屏幕上
                    let axisZ = this._boxClipHelper.computeScreenZDir();
                    let dragDir = Vector3.new();
                    Vector3.sub(dragDir, currPos, this._lastPos);
                    let angle = Vector3.angle(dragDir, axisZ);
                    let distance = Vector3.len(dragDir);
                    distance *= Math.cos(angle);
                    if(distance < 0
                        && this._boxClipHelper._zMax - this._boxClipHelper._zMin + distance <= 0){
                        this._dragging = false;
                        this._lastPos = [0, 0, 0];
                        this._boxClipHelper._planeUpdate = "";
                    }else{
                        this._boxClipHelper.updateBox(distance);
                    }
                }else if(this._boxClipHelper._planeUpdate === "BoxClipBackPlane"){
                    //将z轴向量投影到屏幕上
                    let axisZ = this._boxClipHelper.computeScreenZDir();
                    let dragDir = Vector3.new();
                    Vector3.sub(dragDir, currPos, this._lastPos);
                    let angle = Vector3.angle(dragDir, axisZ);
                    let distance = Vector3.len(dragDir);
                    distance *= Math.cos(angle);
                    if(distance > 0
                        && this._boxClipHelper._zMax - this._boxClipHelper._zMin - distance <= 0){
                        this._dragging = false;
                        this._lastPos = [0, 0, 0];
                        this._boxClipHelper._planeUpdate = "";
                    }else{
                        this._boxClipHelper.updateBox(distance);
                    }
                }else if(this._boxClipHelper._planeUpdate === "BoxClipLeftPlane"){
                    //将x轴向量投影到屏幕上
                    let axisX = this._boxClipHelper.computeScreenXDir();
                    let dragDir = Vector3.new();
                    Vector3.sub(dragDir, currPos, this._lastPos);
                    let angle = Vector3.angle(dragDir, axisX);
                    let distance = Vector3.len(dragDir);
                    distance *= Math.cos(angle);
                    if(distance > 0
                        && this._boxClipHelper._xMax - this._boxClipHelper._xMin -distance <= 0){
                        this._dragging = false;
                        this._lastPos = [0, 0, 0];
                        this._boxClipHelper._planeUpdate = "";
                    }else{
                        this._boxClipHelper.updateBox(distance);
                    }
                }else if(this._boxClipHelper._planeUpdate === "BoxClipRightPlane"){
                    //将x轴向量投影到屏幕上
                    let axisX = this._boxClipHelper.computeScreenXDir();
                    let dragDir = Vector3.new();
                    Vector3.sub(dragDir, currPos, this._lastPos);
                    let angle = Vector3.angle(dragDir, axisX);
                    let distance = Vector3.len(dragDir);
                    distance *= Math.cos(angle);
                    if(distance < 0
                        && this._boxClipHelper._xMax - this._boxClipHelper._xMin + distance <= 0){
                        this._dragging = false;
                        this._lastPos = [0, 0, 0];
                        this._boxClipHelper._planeUpdate = "";
                    }else{
                        this._boxClipHelper.updateBox(distance);
                    }
                }
                this._lastPos = currPos;
            }else{//没交到剖面
                this._dragging = false;
                this._lastPos = [0, 0, 0];
                this._boxClipHelper._planeUpdate = "";
            }
        }
    },

    mouseUp:function(x, y){
        this._dragging = false;
        this._lastPos = [0, 0, 0];
        this._boxClipHelper._planeUpdate = "";
    }
});

//包围盒剖切开关标记
let boxClipOn = false;
let boxClip = undefined;

document.getElementById('clip-btn').addEventListener('click', function(){
    if(!boxClipOn){//未开启剖切功能
        boxClipOn = true;
        boxClip = new BoxClip();
        document.getElementById('clip-btn').setAttribute('style', 'left:0; background-color:#ffff00;');
        boxClip.init();
        controls = undefined;
    }else if(boxClipOn){//剖切功能已经开启
        boxClipOn = false;
        document.getElementById('clip-btn').setAttribute('style', 'left:0;');
        boxClip.destroy();
        boxClip = undefined;
        let controlManager = new ControlManager();
        controlManager.initControls();
    }
}, false);

document.getElementById('canvas').addEventListener('mousedown', function(){
    if(boxClipOn){
        if(boxClip){
            boxClip.mouseDown(event.offsetX, event.offsetY);
        }
    }
}, false);

document.getElementById('canvas').addEventListener('mousemove', function(){
    if(boxClipOn){
        if(boxClip){
            boxClip.mouseMove(event.offsetX, event.offsetY);
        }
    }
}, false);

document.getElementById('canvas').addEventListener('mouseup', function(){
    if(boxClipOn){
        if(boxClip){
            boxClip.mouseUp(event.offsetX, event.offsetY);
        }
    }
}, false);