let MeasureDistance = function(){
    this._objList = undefined;
    this._isMeasuring = false;
    this._isModifying = false;
    this._currNode = undefined;
    this._currSp = undefined;
};

Object.assign(MeasureDistance.prototype, {
    init:function(){
        this._objList = new THREE.Group();
        this._objList.name = "MeasureDistanceGroup";
        scene.add(this._objList);
    },

    destroy:function(){
        let textDiv = new TextDiv();
        textDiv.deleteTextOfMeasureDistanceGroup();
        let sceneManager = new SceneManager();
        if(scene.children.length > 0){
            for(let i = 0; i < scene.children.length; i++){
                if(scene.children[i].name === "MeasureDistanceGroup"){
                    sceneManager.clearScene(scene.children[i]);
                    scene.remove(scene.children[i]);
                    break;
                }
            }
        }
        if(this._currNode){
            sceneManager.clearScene(this._currNode._obj);
        }
        this._currNode = undefined;
    },

    mouseDown:function(x, y){
        //非修改测量
        if(!modifyDistanceOn){
            if(!this._isMeasuring){
                let mouse = new THREE.Vector2();
                let raycaster = new THREE.Raycaster();
                mouse.x = (x / window.innerWidth) * 2 - 1;
                mouse.y = - (y / window.innerHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                //模型数组
                let position = [0, 0, 0];
                //交模型mesh列表
                let sceneManager = new SceneManager();
                let modelMeshes = sceneManager.getModelMeshes();
                let intersects = raycaster.intersectObjects(modelMeshes);
                //交到模型
                if (intersects.length > 0){
                    this._isMeasuring = true;
                    let interset = intersects[0];
                    position = [interset.point.x, interset.point.y, interset.point.z];
                    this._currNode = new MeasureNode();
                    this._currNode.setName("MeasureDistanceNode_"+this._objList.children.length);
                    this._currNode.createPoint(position, 0);
                    this._objList.add(this._currNode._obj);
                }
                //创建文字
                let textDiv = new TextDiv();
                sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_0");
                let screenXY = textDiv.getScreenXY(sceneManager._certainMesh, camera, window.innerWidth, window.innerHeight);
                let distance = 0;
                textDiv.createPop(screenXY, this._currNode._obj.name, document, distance);
            }else{
                let mouse = new THREE.Vector2();
                let raycaster = new THREE.Raycaster();
                mouse.x = (x / window.innerWidth) * 2 - 1;
                mouse.y = - (y / window.innerHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                //模型数组
                let position = [0, 0, 0];
                //交模型mesh列表
                let sceneManager = new SceneManager();
                let modelMeshes = sceneManager.getModelMeshes();
                let intersects = raycaster.intersectObjects(modelMeshes);
                //交到模型
                if (intersects.length > 0){
                    this._isMeasuring = false;
                    let interset = intersects[0];
                    position = [interset.point.x, interset.point.y, interset.point.z];
                    this._currNode.createPoint(position, 1);
                }
                //更新文字
                let textDiv = new TextDiv();
                sceneManager.findCertainLine(this._currNode._obj, "MeasureLine_0");
                let screenXY = textDiv.getScreenXY(sceneManager._certainLine, camera, window.innerWidth, window.innerHeight);
                sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_0");
                let sp0Pos = sceneManager._certainMesh.position;
                sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
                let sp1Pos = sceneManager._certainMesh.position;
                let distance = Vector3.dist([sp0Pos.x, sp0Pos.y, sp0Pos.z], [sp1Pos.x, sp1Pos.y, sp1Pos.z]);
                textDiv.updatePop(screenXY, this._currNode._obj.name, document, distance);
            }
        }else{
            if(!this._isModifying){
                let mouse = new THREE.Vector2();
                let raycaster = new THREE.Raycaster();
                mouse.x = (x / window.innerWidth) * 2 - 1;
                mouse.y = - (y / window.innerHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                //模型数组
                let position = [0, 0, 0];
                //交模型mesh列表
                let sceneManager = new SceneManager();
                let measureMeshes = sceneManager.getMeshesFromCertainGroup("MeasureDistanceGroup");
                let intersects = raycaster.intersectObjects(measureMeshes);
                //交到模型
                if (intersects.length > 0){
                    this._isModifying = true;
                    let interset = intersects[0];
                    position = [interset.point.x, interset.point.y, interset.point.z];
                    let spName = interset.object.name;
                    let parentName = interset.object.parent.name;
                    this._currNode = new MeasureNode();
                    this._currSp = undefined;
                    sceneManager.findCertainGroup(this._objList, parentName);
                    this._currNode._obj = sceneManager._certainGroup;
                    sceneManager.findCertainMesh(this._currNode._obj, spName);
                    this._currSp = sceneManager._certainMesh;
                }
            }else{
                if(this._isModifying && this._currNode && this._currSp){
                    let mouse = new THREE.Vector2();
                    let raycaster = new THREE.Raycaster();
                    mouse.x = (x / window.innerWidth) * 2 - 1;
                    mouse.y = - (y / window.innerHeight) * 2 + 1;
                    raycaster.setFromCamera(mouse, camera);
                    //模型数组
                    let position = [0, 0, 0];
                    //交模型mesh列表
                    let sceneManager = new SceneManager();
                    let modelMeshes = sceneManager.getModelMeshes();
                    let intersects = raycaster.intersectObjects(modelMeshes);
                    //交到模型
                    if (intersects.length > 0){
                        this._isModifying = false;
                        let interset = intersects[0];
                        position = [interset.point.x, interset.point.y, interset.point.z];
                        //重新画点
                        this._currSp.position.set(position[0], position[1], position[2]);
                        //重新画线
                        let spName = (this._currSp.name === "MeasurePoint_0")? "MeasurePoint_1" : "MeasurePoint_0";
                        sceneManager.findCertainMesh(this._currNode._obj, spName);
                        let lastPos = sceneManager._certainMesh.position;
                        lastPos = [lastPos.x, lastPos.y, lastPos.z];
                        sceneManager.clearNode(this._currNode._obj, "MeasureLine_0");
                        this._currNode.createLine(lastPos, position, 0);
                    }
                }
            }
        }
    },

    mouseMove:function(x, y){
        //非修改测量
        if(!modifyDistanceOn){
            if(this._isMeasuring && this._currNode){
                let sceneManager = new SceneManager();
                sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_0");
                let lastPos = sceneManager._certainMesh.position;
                lastPos = [lastPos.x, lastPos.y, lastPos.z];
                //交模型
                let mouse = new THREE.Vector2();
                let raycaster = new THREE.Raycaster();
                mouse.x = (x / window.innerWidth) * 2 - 1;
                mouse.y = - (y / window.innerHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                //模型数组
                let position = [0, 0, 0];
                //交模型mesh列表
                let modelMeshes = sceneManager.getModelMeshes();
                let intersects = raycaster.intersectObjects(modelMeshes);
                //交到模型
                if (intersects.length > 0){
                    let interset = intersects[0];
                    position = [interset.point.x, interset.point.y, interset.point.z];
                    //画线
                    this._currNode.createLine(lastPos, position, 0);
                    renderer.render(scene, camera);
                }
                //更新文字
                let textDiv = new TextDiv();
                sceneManager.findCertainLine(this._currNode._obj, "MeasureLine_0");
                let screenXY = textDiv.getScreenXY(sceneManager._certainLine, camera, window.innerWidth, window.innerHeight);
                sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_0");
                let sp0Pos = sceneManager._certainMesh.position;
                let distance = Vector3.dist([sp0Pos.x, sp0Pos.y, sp0Pos.z], [position[0], position[1], position[2]]);
                textDiv.updatePop(screenXY, this._currNode._obj.name, document, distance);
            }
        }else{
            if(this._isModifying && this._currNode && this._currSp){
                let sceneManager = new SceneManager();
                //交模型
                let mouse = new THREE.Vector2();
                let raycaster = new THREE.Raycaster();
                mouse.x = (x / window.innerWidth) * 2 - 1;
                mouse.y = - (y / window.innerHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                //模型数组
                let position = [0, 0, 0];
                //交模型mesh列表
                let modelMeshes = sceneManager.getModelMeshes();
                let intersects = raycaster.intersectObjects(modelMeshes);
                //交到模型
                if (intersects.length > 0){
                    let interset = intersects[0];
                    position = [interset.point.x, interset.point.y, interset.point.z];
                    //重新画点
                    this._currSp.position.set(position[0], position[1], position[2]);
                    //重新画线
                    let spName = (this._currSp.name === "MeasurePoint_0")? "MeasurePoint_1" : "MeasurePoint_0";
                    sceneManager.findCertainMesh(this._currNode._obj, spName);
                    let lastPos = sceneManager._certainMesh.position;
                    lastPos = [lastPos.x, lastPos.y, lastPos.z];
                    sceneManager.clearNode(this._currNode._obj, "MeasureLine_0");
                    this._currNode.createLine(lastPos, position, 0);
                    renderer.render(scene, camera);
                }
                //更新文字
                let textDiv = new TextDiv();
                sceneManager.findCertainLine(this._currNode._obj, "MeasureLine_0");
                let screenXY = textDiv.getScreenXY(sceneManager._certainLine, camera, window.innerWidth, window.innerHeight);
                sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_0");
                let sp0Pos = sceneManager._certainMesh.position;
                sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
                let sp1Pos = sceneManager._certainMesh.position;
                let distance = Vector3.dist([sp0Pos.x, sp0Pos.y, sp0Pos.z], [sp1Pos.x, sp1Pos.y, sp1Pos.z]);
                textDiv.updatePop(screenXY, this._currNode._obj.name, document, distance);
            }else{

            }
        }
    },
});

let measureDistanceOn = false;
let modifyDistanceOn = false;
let measureDistance = undefined;

document.getElementById('measure-btn1').addEventListener('click', function(){
    if(modifyDistanceOn){
        if(measureDistance._isModifying){
            alert("正在修改不能测量");
        }else{
            modifyDistanceOn = false;
            measureDistance._isModifying = false;
            document.getElementById('modify-measure-btn1').setAttribute('style', 'left:100px;');
            if(!measureDistanceOn){
                measureDistanceOn = true;
                document.getElementById('measure-btn1').setAttribute('style', 'left:0; background-color:#ffff00;');
                if(measureDistance === undefined){
                    measureDistance = new MeasureDistance();
                    measureDistance.init();
                }
                controls = undefined;
            }else{
                measureDistanceOn = false;
                document.getElementById('measure-btn1').setAttribute('style', 'left:0;');
                let controlManager = new ControlManager();
                controlManager.initControls();
            }
        }
    }else{
        if(!measureDistanceOn){
            measureDistanceOn = true;
            document.getElementById('measure-btn1').setAttribute('style', 'left:0; background-color:#ffff00;');
            if(measureDistance === undefined){
                measureDistance = new MeasureDistance();
                measureDistance.init();
            }
            controls = undefined;
        }else{
            measureDistanceOn = false;
            document.getElementById('measure-btn1').setAttribute('style', 'left:0;');
            let controlManager = new ControlManager();
            controlManager.initControls();
        }
    }
}, false);

document.getElementById('modify-measure-btn1').addEventListener('click', function(){
    if(measureDistanceOn){
        if(measureDistance._isMeasuring){
            alert("正在测量不能修改");
        }else{
            measureDistanceOn = false;
            measureDistance._isMeasuring = false;
            document.getElementById('measure-btn1').setAttribute('style', 'left:0;');
            modifyDistanceOn = true;
            document.getElementById('modify-measure-btn1').setAttribute('style', 'left:100px; background-color:#ffff00;');
        }
    }else{
        if(measureDistance){
            measureDistance._isMeasuring = false;
        }
        document.getElementById('measure-btn1').setAttribute('style', 'left:0;');
        if(!modifyDistanceOn){
            modifyDistanceOn = true;
            document.getElementById('modify-measure-btn1').setAttribute('style', 'left:100px; background-color:#ffff00;');
            controls = undefined;
        }else{
            modifyDistanceOn = false;
            document.getElementById('modify-measure-btn1').setAttribute('style', 'left:100px;');
            let controlManager = new ControlManager();
            controlManager.initControls();
        }
    }
}, false);

document.getElementById('destroy-measure-btn1').addEventListener('click', function(){
    measureDistanceOn = false;
    modifyDistanceOn = false;
    if(measureDistance){
        measureDistance._isMeasuring = false;
        measureDistance._isModifying = false;
        measureDistance.destroy();
    }
    measureDistance = undefined;
    document.getElementById('measure-btn1').setAttribute('style', 'left:0;');
    document.getElementById('modify-measure-btn1').setAttribute('style', 'left:100px;');
    let controlManager = new ControlManager();
    controlManager.initControls();
}, false);

document.getElementById('canvas').addEventListener('mousedown', function(){
    if(measureDistanceOn || modifyDistanceOn){
        if(measureDistance){
            measureDistance.mouseDown(event.offsetX, event.offsetY);
        }
    }
}, false);

document.getElementById('canvas').addEventListener('mousemove', function(){
    if(measureDistanceOn || modifyDistanceOn){
        if(measureDistance){
            measureDistance.mouseMove(event.offsetX, event.offsetY);
        }
    }
}, false);