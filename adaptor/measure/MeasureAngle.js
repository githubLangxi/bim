let MeasureAngle = function(){
    this._objList = undefined;
    this._isMeasuring = false;
    this._isModifying = false;
    this._currNode = undefined;
    this._currSp = undefined;
};

Object.assign(MeasureAngle.prototype, {
    init:function(){
        this._objList = new THREE.Group();
        this._objList.name = "MeasureAngleGroup";
        scene.add(this._objList);
    },

    destroy:function(){
        let textDiv = new TextDiv();
        textDiv.deleteTextOfMeasureAngleGroup();
        let sceneManager = new SceneManager();
        if(scene.children.length > 0){
            for(let i = 0; i < scene.children.length; i++){
                if(scene.children[i].name === "MeasureAngleGroup"){
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
        if(!modifyAngleOn){//测量角度
            if(!this._isMeasuring){//还未开启一次测量
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
                    this._currNode.setName("MeasureAngleNode_"+this._objList.children.length);
                    this._currNode.createPoint(position, 0);
                    this._objList.add(this._currNode._obj);
                }
            }else if(this._isMeasuring){//正在进行一次测量
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
                    //判断是第二个sp还是第三个sp
                    if(this._currNode.getPointNum() === 1){
                        let interset = intersects[0];
                        position = [interset.point.x, interset.point.y, interset.point.z];
                        this._currNode.createPoint(position, 1);
                        //创建文字
                        let textDiv = new TextDiv();
                        sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
                        let screenXY = textDiv.getScreenXYByPosition(sceneManager._certainMesh, camera, window.innerWidth, window.innerHeight);
                        let angle = 0;
                        textDiv.createPop(screenXY, this._currNode._obj.name, document, angle);
                    }else if(this._currNode.getPointNum() === 2){
                        this._isMeasuring = false;
                        let interset = intersects[0];
                        position = [interset.point.x, interset.point.y, interset.point.z];
                        this._currNode.createPoint(position, 2);
                        //更新文字
                        let textDiv = new TextDiv();
                        sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
                        let screenXY = textDiv.getScreenXYByPosition(sceneManager._certainMesh, camera, window.innerWidth, window.innerHeight);
                        sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_0");
                        let sp0Pos = sceneManager._certainMesh.position;
                        sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
                        let sp1Pos = sceneManager._certainMesh.position;
                        sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_2");
                        let sp2Pos = sceneManager._certainMesh.position;
                        let v1 = [0, 0, 0];
                        Vector3.sub(v1, [sp0Pos.x, sp0Pos.y, sp0Pos.z], [sp1Pos.x, sp1Pos.y, sp1Pos.z]);
                        let v2 = [0, 0, 0];
                        Vector3.sub(v2, [sp2Pos.x, sp2Pos.y, sp2Pos.z], [sp1Pos.x, sp1Pos.y, sp1Pos.z]);
                        let angle = Vector3.angle(v1, v2);
                        angle = angle / Math.PI * 180;
                        textDiv.updatePop(screenXY, this._currNode._obj.name, document, angle);
                    }
                }
            }
        }else if(modifyAngleOn){//修改角度
            if(!this._isModifying){//还未开启一次修改
                let mouse = new THREE.Vector2();
                let raycaster = new THREE.Raycaster();
                mouse.x = (x / window.innerWidth) * 2 - 1;
                mouse.y = - (y / window.innerHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                //模型数组
                let position = [0, 0, 0];
                //交模型mesh列表
                let sceneManager = new SceneManager();
                let measureMeshes = sceneManager.getMeshesFromCertainGroup("MeasureAngleGroup");
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
            }else if(this._isModifying){//正在进行一次修改
                if(this._currNode && this._currSp){
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
                        if(this._currSp.name === "MeasurePoint_0"){
                            sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
                            let sp1Pos = sceneManager._certainMesh.position;
                            sp1Pos = [sp1Pos.x, sp1Pos.y, sp1Pos.z];
                            sceneManager.clearNode(this._currNode._obj, "MeasureLine_0");
                            this._currNode.createLine(sp1Pos, position, 0);
                        }else if(this._currSp.name === "MeasurePoint_1"){
                            sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_0");
                            let sp0Pos = sceneManager._certainMesh.position;
                            sp0Pos = [sp0Pos.x, sp0Pos.y, sp0Pos.z];
                            sceneManager.clearNode(this._currNode._obj, "MeasureLine_0");
                            this._currNode.createLine(sp0Pos, position, 0);
                            sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_2");
                            let sp2Pos = sceneManager._certainMesh.position;
                            sp2Pos = [sp2Pos.x, sp2Pos.y, sp2Pos.z];
                            sceneManager.clearNode(this._currNode._obj, "MeasureLine_1");
                            this._currNode.createLine(sp2Pos, position, 1);
                        }else if(this._currSp.name === "MeasurePoint_2"){
                            sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
                            let sp1Pos = sceneManager._certainMesh.position;
                            sp1Pos = [sp1Pos.x, sp1Pos.y, sp1Pos.z];
                            sceneManager.clearNode(this._currNode._obj, "MeasureLine_1");
                            this._currNode.createLine(sp1Pos, position, 1);
                        }
                    }
                }
            }
        }
    },

    mouseMove:function(x, y){
        if(!modifyAngleOn){//测量角度
            if(this._isMeasuring && this._currNode){//正在测量角度
                if(this._currNode.getPointNum() === 1){//只有一个点
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
                }else if(this._currNode.getPointNum() === 2){//已经两个点
                    let sceneManager = new SceneManager();
                    sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
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
                        this._currNode.createLine(lastPos, position, 1);
                        renderer.render(scene, camera);
                    }
                    //更新文字
                    let textDiv = new TextDiv();
                    sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
                    let screenXY = textDiv.getScreenXYByPosition(sceneManager._certainMesh, camera, window.innerWidth, window.innerHeight);
                    sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_0");
                    let sp0Pos = sceneManager._certainMesh.position;
                    sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
                    let sp1Pos = sceneManager._certainMesh.position;
                    let v1 = [0, 0, 0];
                    Vector3.sub(v1, [sp0Pos.x, sp0Pos.y, sp0Pos.z], [sp1Pos.x, sp1Pos.y, sp1Pos.z]);
                    let v2 = [0, 0, 0];
                    Vector3.sub(v2, [position[0], position[1], position[2]], [sp1Pos.x, sp1Pos.y, sp1Pos.z]);
                    let angle = Vector3.angle(v1, v2);
                    angle = angle / Math.PI * 180;
                    textDiv.updatePop(screenXY, this._currNode._obj.name, document, angle);
                }
            }
        }else if(modifyAngleOn){//修改角度
            if(this._isModifying && this._currNode && this._currSp){//正在修改角度
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
                    if(this._currSp.name === "MeasurePoint_0"){
                        sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
                        let sp1Pos = sceneManager._certainMesh.position;
                        sp1Pos = [sp1Pos.x, sp1Pos.y, sp1Pos.z];
                        sceneManager.clearNode(this._currNode._obj, "MeasureLine_0");
                        this._currNode.createLine(sp1Pos, position, 0);
                    }else if(this._currSp.name === "MeasurePoint_1"){
                        sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_0");
                        let sp0Pos = sceneManager._certainMesh.position;
                        sp0Pos = [sp0Pos.x, sp0Pos.y, sp0Pos.z];
                        sceneManager.clearNode(this._currNode._obj, "MeasureLine_0");
                        this._currNode.createLine(sp0Pos, position, 0);
                        sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_2");
                        let sp2Pos = sceneManager._certainMesh.position;
                        sp2Pos = [sp2Pos.x, sp2Pos.y, sp2Pos.z];
                        sceneManager.clearNode(this._currNode._obj, "MeasureLine_1");
                        this._currNode.createLine(sp2Pos, position, 1);
                    }else if(this._currSp.name === "MeasurePoint_2"){
                        sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
                        let sp1Pos = sceneManager._certainMesh.position;
                        sp1Pos = [sp1Pos.x, sp1Pos.y, sp1Pos.z];
                        sceneManager.clearNode(this._currNode._obj, "MeasureLine_1");
                        this._currNode.createLine(sp1Pos, position, 1);
                    }
                    renderer.render(scene, camera);
                }
                //更新文字
                let textDiv = new TextDiv();
                sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
                let screenXY = textDiv.getScreenXYByPosition(sceneManager._certainMesh, camera, window.innerWidth, window.innerHeight);
                sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_0");
                let sp0Pos = sceneManager._certainMesh.position;
                sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_1");
                let sp1Pos = sceneManager._certainMesh.position;
                sceneManager.findCertainMesh(this._currNode._obj, "MeasurePoint_2");
                let sp2Pos = sceneManager._certainMesh.position;
                let v1 = [0, 0, 0];
                Vector3.sub(v1, [sp0Pos.x, sp0Pos.y, sp0Pos.z], [sp1Pos.x, sp1Pos.y, sp1Pos.z]);
                let v2 = [0, 0, 0];
                Vector3.sub(v2, [sp2Pos.x, sp2Pos.y, sp2Pos.z], [sp1Pos.x, sp1Pos.y, sp1Pos.z]);
                let angle = Vector3.angle(v1, v2);
                angle = angle / Math.PI * 180;
                textDiv.updatePop(screenXY, this._currNode._obj.name, document, angle);
            }
        }
    },
});

let measureAngleOn = false;
let modifyAngleOn = false;
let measureAngle = undefined;

document.getElementById('measure-btn2').addEventListener('click', function(){
    if(modifyAngleOn){
        if(measureAngle._isModifying){
            alert("正在修改不能测量");
        }else{
            modifyAngleOn = false;
            measureAngle._isModifying = false;
            document.getElementById('modify-measure-btn2').setAttribute('style', 'left:400px;');
            if(!measureAngleOn){
                measureAngleOn = true;
                document.getElementById('measure-btn2').setAttribute('style', 'left:300px; background-color:#ffff00;');
                if(measureAngle === undefined){
                    measureAngle = new MeasureAngle();
                    measureAngle.init();
                }
                controls = undefined;
            }else{
                measureAngleOn = false;
                document.getElementById('measure-btn2').setAttribute('style', 'left:300px;');
                let controlManager = new ControlManager();
                controlManager.initControls();
            }
        }
    }else{
        if(!measureAngleOn){
            measureAngleOn = true;
            document.getElementById('measure-btn2').setAttribute('style', 'left:300px; background-color:#ffff00;');
            if(measureAngle === undefined){
                measureAngle = new MeasureAngle();
                measureAngle.init();
            }
            controls = undefined;
        }else{
            measureAngleOn = false;
            document.getElementById('measure-btn2').setAttribute('style', 'left:300px;');
            let controlManager = new ControlManager();
            controlManager.initControls();
        }
    }
}, false);

document.getElementById('modify-measure-btn2').addEventListener('click', function(){
    if(measureAngleOn){
        if(measureAngle._isMeasuring){
            alert("正在测量不能修改");
        }else{
            measureAngleOn = false;
            measureAngle._isMeasuring = false;
            document.getElementById('measure-btn2').setAttribute('style', 'left:300px;');
            modifyAngleOn = true;
            document.getElementById('modify-measure-btn2').setAttribute('style', 'left:400px; background-color:#ffff00;');
        }
    }else{
        if(measureAngle){
            measureAngle._isMeasuring = false;
        }
        document.getElementById('measure-btn2').setAttribute('style', 'left:300px;');
        if(!modifyAngleOn){
            modifyAngleOn = true;
            document.getElementById('modify-measure-btn2').setAttribute('style', 'left:400px; background-color:#ffff00;');
            controls = undefined;
        }else{
            modifyAngleOn = false;
            document.getElementById('modify-measure-btn2').setAttribute('style', 'left:400px;');
            let controlManager = new ControlManager();
            controlManager.initControls();
        }
    }
}, false);

document.getElementById('destroy-measure-btn2').addEventListener('click', function(){
    measureAngleOn = false;
    modifyAngleOn = false;
    if(measureAngle){
        measureAngle._isMeasuring = false;
        measureAngle._isModifying = false;
        measureAngle.destroy();
    }
    measureAngle = undefined;
    document.getElementById('measure-btn2').setAttribute('style', 'left:300px;');
    document.getElementById('modify-measure-btn2').setAttribute('style', 'left:400px;');
    let controlManager = new ControlManager();
    controlManager.initControls();
}, false);

document.getElementById('canvas').addEventListener('mousedown', function(){
    if(measureAngleOn || modifyAngleOn){
        if(measureAngle){
            measureAngle.mouseDown(event.offsetX, event.offsetY);
        }
    }
}, false);

document.getElementById('canvas').addEventListener('mousemove', function(){
    if(measureAngleOn || modifyAngleOn){
        if(measureAngle){
            measureAngle.mouseMove(event.offsetX, event.offsetY);
        }
    }
}, false);