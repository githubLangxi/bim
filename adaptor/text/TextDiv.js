let TextDiv = function(){

};

Object.assign(TextDiv.prototype, {
    //获取精灵图在屏幕的XY坐标
    getScreenXY:function(node, camera, screenWidth, screenHeight){
        let sceneManager = new SceneManager();
        let boundingBox = sceneManager.getNodeBoundingBox(node);
        let center = Vector3.new();
        center[0] = (boundingBox.max.x + boundingBox.min.x)/2;
        center[1] = (boundingBox.max.y + boundingBox.min.y)/2;
        center[2] = (boundingBox.max.z + boundingBox.min.z)/2;
        let modelViewMatrix = node.modelViewMatrix.elements;
        Vector3.transformMat4(center, center, modelViewMatrix);
        let screenPos = Vector3.new();
        Vector3.transformMat4(screenPos, center, camera.projectionMatrix.elements);
        screenPos[0] = screenPos[0] * screenWidth / 2 + screenWidth / 2;
        screenPos[1] = - screenPos[1] * screenHeight / 2 + screenHeight / 2;
        return [screenPos[0], screenPos[1]];
    },

    getScreenXYByPosition:function(node, camera, screenWidth, screenHeight){
        let position = Vector3.new();
        position[0] = node.position.x;
        position[1] = node.position.y;
        position[2] = node.position.z;
        let modelViewMatrix = Matrix4.new();
        let sceneManager = new SceneManager();
        sceneManager.findCertainLine(node.parent, "MeasureLine_0");
        if(sceneManager._certainLine){
            modelViewMatrix = sceneManager._certainLine.modelViewMatrix.elements;
        }
        Vector3.transformMat4(position, position, modelViewMatrix);
        let screenPos = Vector3.new();
        Vector3.transformMat4(screenPos, position, camera.projectionMatrix.elements);
        screenPos[0] = screenPos[0] * screenWidth / 2 + screenWidth / 2 + 10;
        screenPos[1] = - screenPos[1] * screenHeight / 2 + screenHeight / 2 + 10;
        return [screenPos[0], screenPos[1]];
    },

    //添加精灵图div
    createPop:function(screenXY, value, document, content){
        let pop = document.createElement("div");
        pop.setAttribute('id', value);
        pop.setAttribute('style', '-webkit-user-select:none; -moz-user-select:none; -ms-user-select:none;user-select:none; position:absolute; width:50px; height:20px; left:'+screenXY[0]+'px; top:'+screenXY[1]+'px; font-size:6px;');
        pop.setAttribute('class', 'sprite');
        pop.innerHTML = content;
        document.body.appendChild(pop);
    },

    //更新精灵图坐标位置
    updatePop:function(screenXY, value, document, content){
        let pop = document.getElementById(value);
        pop.setAttribute('style', '-webkit-user-select:none; -moz-user-select:none; -ms-user-select:none;user-select:none; position:absolute; width:50px; height:20px; left:'+screenXY[0]+'px; top:'+screenXY[1]+'px; font-size:6px;');
        if(content){
            pop.innerHTML = content;
        }
    },

    //删除精灵图div
    deletePop:function(document, id){
        let pop = document.getElementById(id);
        document.body.removeChild(pop);
    },

    //更新相机
    updateCamera:function(){
        let sceneManager = new SceneManager();
        sceneManager.findCertainGroup(scene, "MeasureDistanceGroup");
        let distanceGroup = sceneManager._certainGroup;
        if(distanceGroup){
            if(distanceGroup.children.length > 0){
                for(let i=0; i<distanceGroup.children.length; i++){
                    let name = distanceGroup.children[i].name;
                    sceneManager.findCertainLine(distanceGroup.children[i], "MeasureLine_0");
                    let line = sceneManager._certainLine;
                    let screenXY = this.getScreenXY(line, camera, window.innerWidth, window.innerHeight);
                    let content = document.getElementById(name).innerHTML;
                    this.updatePop(screenXY, name, document, content);
                }
            }
        }
        sceneManager.clear();
        sceneManager.findCertainGroup(scene, "MeasureAngleGroup");
        let angleGroup = sceneManager._certainGroup;
        if(angleGroup){
            if(angleGroup.children.length > 0){
                for(let i=0; i<angleGroup.children.length; i++){
                    let name = angleGroup.children[i].name;
                    sceneManager.findCertainMesh(angleGroup.children[i], "MeasurePoint_1");
                    let screenXY = this.getScreenXYByPosition(sceneManager._certainMesh, camera, window.innerWidth, window.innerHeight);
                    let content = document.getElementById(name).innerHTML;
                    this.updatePop(screenXY, name, document, content);
                }
            }
        }
    },

    //删除距离测量文字
    deleteTextOfMeasureDistanceGroup:function(){
        let sceneManager = new SceneManager();
        sceneManager.findCertainGroup(scene, "MeasureDistanceGroup");
        let distanceGroup = sceneManager._certainGroup;
        if(distanceGroup){
            if(distanceGroup.children.length > 0){
                for(let i=0; i<distanceGroup.children.length; i++){
                    let name = distanceGroup.children[i].name;
                    this.deletePop(document, name);
                }
            }
        }
    },

    //删除角度测量文字
    deleteTextOfMeasureAngleGroup:function(){
        let sceneManager = new SceneManager();
        sceneManager.findCertainGroup(scene, "MeasureAngleGroup");
        let angleGroup = sceneManager._certainGroup;
        if(angleGroup){
            if(angleGroup.children.length > 0){
                for(let i=0; i<angleGroup.children.length; i++){
                    let name = angleGroup.children[i].name;
                    this.deletePop(document, name);
                }
            }
        }
    },
});