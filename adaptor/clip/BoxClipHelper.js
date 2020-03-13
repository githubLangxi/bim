let BoxClipHelper = function(){
    this._clipType = "BoxClip";
    //顶部剖切面
    this._topPlane = undefined;
    this._topPlaneMesh = undefined;
    this._yMax = 0;
    //底部剖切面
    this._bottomPlane = undefined;
    this._bottomPlaneMesh = undefined;
    this._yMin = 0;
    //左侧剖切面
    this._leftPlane = undefined;
    this._leftPlaneMesh = undefined;
    this._xMin = 0;
    //右侧剖切面
    this._rightPlane = undefined;
    this._rightPlaneMesh = undefined;
    this._xMax = 0;
    //前方剖切面
    this._frontPlane = undefined;
    this._frontPlaneMesh = undefined;
    this._zMax = 0;
    //后方剖切面
    this._backPlane = undefined;
    this._backPlaneMesh = undefined;
    this._zMin = 0;

    this._obj = undefined;
    this._planeUpdate = "";//用户正在拖动的剖切面
    this._planeMeshShow = true;//显示或隐藏剖切面
};

Object.assign(BoxClipHelper.prototype, {
    //初始化剖切盒
    initBox:function(){
        this._obj = new THREE.Group();
        this._obj.name = "BoxClipGroup";
        let sceneManager = new SceneManager();
        let boundingBox = sceneManager.getBoundingBox();
        this._xMax = boundingBox.max.x;
        this._xMin = boundingBox.min.x;
        this._yMax = boundingBox.max.y;
        this._yMin = boundingBox.min.y;
        this._zMax = boundingBox.max.z;
        this._zMin = boundingBox.min.z;
        //初始化top
        this.initTop();
        //初始化bottom
        this.initBottom();
        //初始化front
        this.initFront();
        //初始化back
        this.initBack();
        //初始化left
        this.initLeft();
        //初始化right
        this.initRight();
    },

    destoryBox:function(){
        let sceneManager = new SceneManager();
        if(this._obj){
            sceneManager.clearNode(this._obj, "BoxClipTopPlane");
            sceneManager.clearNode(this._obj, "BoxClipBottomPlane");
            sceneManager.clearNode(this._obj, "BoxClipFrontPlane");
            sceneManager.clearNode(this._obj, "BoxClipBackPlane");
            sceneManager.clearNode(this._obj, "BoxClipLeftPlane");
            sceneManager.clearNode(this._obj, "BoxClipRightPlane");
        }
    },

    //初始化top
    initTop:function(){
        let top = this._xMax - 0;
        this._topPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), top);
        let geometry = new THREE.BufferGeometry();
        let vertices = [this._xMax, this._yMax, this._zMax, this._xMax, this._yMax, this._zMin, this._xMin, this._yMax, this._zMax, this._xMin, this._yMax, this._zMin];
        let faces = [0, 1, 2, 2, 1, 3];
        let positions = Float32Array.from(vertices);
        geometry.setIndex(faces);//拓扑索引
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        let material = new THREE.MeshBasicMaterial({
            transparent:true,
            side:THREE.DoubleSide,
            opacity:0.1,
            color:0xffff00
        });
        this._topPlaneMesh = new THREE.Mesh(geometry, material);
        this._topPlaneMesh.name = "BoxClipTopPlane";
        this._obj.add(this._topPlaneMesh);
    },

    //初始化bottom
    initBottom:function(){
        let bottom = 0 - this._xMin;
        this._bottomPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), bottom);
        //底面平面mesh
        let geometry = new THREE.BufferGeometry();
        let vertices = [this._xMax, this._yMin, this._zMax, this._xMax, this._yMin, this._zMin, this._xMin, this._yMin, this._zMax, this._xMin, this._yMin, this._zMin];
        let faces = [1, 0, 2, 1, 2, 3];
        let positions = Float32Array.from(vertices);
        geometry.setIndex(faces);//拓扑索引
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        let material = new THREE.MeshBasicMaterial({
            transparent:true,
            side:THREE.DoubleSide,
            opacity:0.1,
            color:0xffff00
        });
        this._bottomPlaneMesh = new THREE.Mesh(geometry, material);
        this._bottomPlaneMesh.name = "BoxClipBottomPlane";
        this._obj.add(this._bottomPlaneMesh);
    },

    //初始化front
    initFront:function(){
        let front = this._zMax - 0;
        this._frontPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), front);
        //底面平面mesh
        let geometry = new THREE.BufferGeometry();
        let vertices = [this._xMax, this._yMax, this._zMax, this._xMax, this._yMin, this._zMax, this._xMin, this._yMax, this._zMax, this._xMin, this._yMin, this._zMax];
        let faces = [1, 0, 2, 1, 2, 3];
        let positions = Float32Array.from(vertices);
        geometry.setIndex(faces);//拓扑索引
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        let material = new THREE.MeshBasicMaterial({
            transparent:true,
            side:THREE.DoubleSide,
            opacity:0.1,
            color:0xffaa00
        });
        this._frontPlaneMesh = new THREE.Mesh(geometry, material);
        this._frontPlaneMesh.name = "BoxClipFrontPlane";
        this._obj.add(this._frontPlaneMesh);
    },

    //初始化back
    initBack:function(){
        let back = 0 - this._zMin;
        this._backPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), back);
        //底面平面mesh
        let geometry = new THREE.BufferGeometry();
        let vertices = [this._xMax, this._yMax, this._zMin, this._xMax, this._yMin, this._zMin, this._xMin, this._yMax, this._zMin, this._xMin, this._yMin, this._zMin];
        let faces = [0, 1, 2, 2, 1, 3];
        let positions = Float32Array.from(vertices);
        geometry.setIndex(faces);//拓扑索引
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        let material = new THREE.MeshBasicMaterial({
            transparent:true,
            side:THREE.DoubleSide,
            opacity:0.1,
            color:0xffaa00
        });
        this._backPlaneMesh = new THREE.Mesh(geometry, material);
        this._backPlaneMesh.name = "BoxClipBackPlane";
        this._obj.add(this._backPlaneMesh);
    },

    //初始化left
    initLeft:function(){
        let left = 0 - this._xMin;
        this._leftPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), left);
        //底面平面mesh
        let geometry = new THREE.BufferGeometry();
        let vertices = [this._xMin, this._yMax, this._zMin, this._xMin, this._yMin, this._zMin, this._xMin, this._yMax, this._zMax, this._xMin, this._yMin, this._zMax];
        let faces = [0, 1, 2, 2, 1, 3];
        let positions = Float32Array.from(vertices);
        geometry.setIndex(faces);//拓扑索引
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        let material = new THREE.MeshBasicMaterial({
            transparent:true,
            side:THREE.DoubleSide,
            opacity:0.1,
            color:0xff6600
        });
        this._leftPlaneMesh = new THREE.Mesh(geometry, material);
        this._leftPlaneMesh.name = "BoxClipLeftPlane";
        this._obj.add(this._leftPlaneMesh);
    },

    //初始化right
    initRight:function(){
        let right = this._xMax - 0;
        this._rightPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), right);
        //底面平面mesh
        let geometry = new THREE.BufferGeometry();
        let vertices = [this._xMax, this._yMax, this._zMin, this._xMax, this._yMin, this._zMin, this._xMax, this._yMax, this._zMax, this._xMax, this._yMin, this._zMax];
        let faces = [1, 0, 2, 1, 2, 3];
        let positions = Float32Array.from(vertices);
        geometry.setIndex(faces);//拓扑索引
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        let material = new THREE.MeshBasicMaterial({
            transparent:true,
            side:THREE.DoubleSide,
            opacity:0.1,
            color:0xff6600
        });
        this._rightPlaneMesh = new THREE.Mesh(geometry, material);
        this._rightPlaneMesh.name = "BoxClipRightPlane";
        this._obj.add(this._rightPlaneMesh);
    },

    //更新剖切盒
    updateBox:function(distance){
        if(this._planeUpdate === "BoxClipTopPlane"){
            this._yMax += distance;
            this.modifyFrontPlaneMesh();
            this.modifyBackPlaneMesh();
            this.modifyLeftPlaneMesh();
            this.modifyRightPlaneMesh();
            this.translateTopPlane(distance);
        }else if(this._planeUpdate === "BoxClipBottomPlane"){
            this._yMin += distance;
            this.modifyFrontPlaneMesh();
            this.modifyBackPlaneMesh();
            this.modifyLeftPlaneMesh();
            this.modifyRightPlaneMesh();
            this.translateBottomPlane(distance);
        }else if(this._planeUpdate === "BoxClipFrontPlane"){
            this._zMax += distance;
            this.modifyTopPlaneMesh();
            this.modifyBottomPlaneMesh();
            this.modifyLeftPlaneMesh();
            this.modifyRightPlaneMesh();
            this.translateFrontPlane(distance);
        }else if(this._planeUpdate === "BoxClipBackPlane"){
            this._zMin += distance;
            this.modifyTopPlaneMesh();
            this.modifyBottomPlaneMesh();
            this.modifyLeftPlaneMesh();
            this.modifyRightPlaneMesh();
            this.translateBackPlane(distance);
        }else if(this._planeUpdate === "BoxClipLeftPlane"){
            this._xMin += distance;
            this.modifyTopPlaneMesh();
            this.modifyBottomPlaneMesh();
            this.modifyFrontPlaneMesh();
            this.modifyBackPlaneMesh();
            this.translateLeftPlane(distance);
        }else if(this._planeUpdate === "BoxClipRightPlane"){
            this._xMax += distance;
            this.modifyTopPlaneMesh();
            this.modifyBottomPlaneMesh();
            this.modifyFrontPlaneMesh();
            this.modifyBackPlaneMesh();
            this.translateRightPlane(distance);
        }
        //修正模型材质启用clip
        let sceneManager = new SceneManager();
        let modelGroup = sceneManager.getModelGroup();
        sceneManager.enableClip(modelGroup, [this._topPlane, this._bottomPlane, this._frontPlane, this._backPlane, this._leftPlane, this._rightPlane]);
    },

    //更新topPlaneMesh
    modifyTopPlaneMesh:function(){
        //清除原先mesh
        let sceneManager = new SceneManager();
        sceneManager.clearNode(this._obj, "BoxClipTopPlane");
        this._topPlaneMesh = undefined;
        //重新构造mesh
        let geometry = new THREE.BufferGeometry();
        let vertices = [this._xMax, this._yMax, this._zMax, this._xMax, this._yMax, this._zMin, this._xMin, this._yMax, this._zMax, this._xMin, this._yMax, this._zMin];
        let faces = [0, 1, 2, 2, 1, 3];
        let positions = Float32Array.from(vertices);
        geometry.setIndex(faces);//拓扑索引
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        let material = new THREE.MeshBasicMaterial({
            transparent:true,
            side:THREE.DoubleSide,
            opacity:0.1,
            color:0xffff00
        });
        this._topPlaneMesh = new THREE.Mesh(geometry, material);
        this._topPlaneMesh.name = "BoxClipTopPlane";
        this._obj.add(this._topPlaneMesh);
    },

    //更新bottomPlaneMesh
    modifyBottomPlaneMesh:function(){
        //清除原先mesh
        let sceneManager = new SceneManager();
        sceneManager.clearNode(this._obj, "BoxClipBottomPlane");
        this._bottomPlaneMesh = undefined;
        //重新构造mesh
        let geometry = new THREE.BufferGeometry();
        let vertices = [this._xMax, this._yMin, this._zMax, this._xMax, this._yMin, this._zMin, this._xMin, this._yMin, this._zMax, this._xMin, this._yMin, this._zMin];
        let faces = [1, 0, 2, 1, 2, 3];
        let positions = Float32Array.from(vertices);
        geometry.setIndex(faces);//拓扑索引
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        let material = new THREE.MeshBasicMaterial({
            transparent:true,
            side:THREE.DoubleSide,
            opacity:0.1,
            color:0xffff00
        });
        this._bottomPlaneMesh = new THREE.Mesh(geometry, material);
        this._bottomPlaneMesh.name = "BoxClipBottomPlane";
        this._obj.add(this._bottomPlaneMesh);
    },

    modifyFrontPlaneMesh:function(){
        //清除原先mesh
        let sceneManager = new SceneManager();
        sceneManager.clearNode(this._obj, "BoxClipFrontPlane");
        this._frontPlaneMesh = undefined;
        //重新构造mesh
        let geometry = new THREE.BufferGeometry();
        let vertices = [this._xMax, this._yMax, this._zMax, this._xMax, this._yMin, this._zMax, this._xMin, this._yMax, this._zMax, this._xMin, this._yMin, this._zMax];
        let faces = [1, 0, 2, 1, 2, 3];
        let positions = Float32Array.from(vertices);
        geometry.setIndex(faces);//拓扑索引
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        let material = new THREE.MeshBasicMaterial({
            transparent:true,
            side:THREE.DoubleSide,
            opacity:0.1,
            color:0xffaa00
        });
        this._frontPlaneMesh = new THREE.Mesh(geometry, material);
        this._frontPlaneMesh.name = "BoxClipFrontPlane";
        this._obj.add(this._frontPlaneMesh);
    },

    modifyBackPlaneMesh:function(){
        //清除原先mesh
        let sceneManager = new SceneManager();
        sceneManager.clearNode(this._obj, "BoxClipBackPlane");
        this._backPlaneMesh = undefined;
        //重新构造mesh
        let geometry = new THREE.BufferGeometry();
        let vertices = [this._xMax, this._yMax, this._zMin, this._xMax, this._yMin, this._zMin, this._xMin, this._yMax, this._zMin, this._xMin, this._yMin, this._zMin];
        let faces = [0, 1, 2, 2, 1, 3];
        let positions = Float32Array.from(vertices);
        geometry.setIndex(faces);//拓扑索引
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        let material = new THREE.MeshBasicMaterial({
            transparent:true,
            side:THREE.DoubleSide,
            opacity:0.1,
            color:0xffaa00
        });
        this._backPlaneMesh = new THREE.Mesh(geometry, material);
        this._backPlaneMesh.name = "BoxClipBackPlane";
        this._obj.add(this._backPlaneMesh);
    },

    modifyLeftPlaneMesh:function(){
        //清除原先mesh
        let sceneManager = new SceneManager();
        sceneManager.clearNode(this._obj, "BoxClipLeftPlane");
        this._leftPlaneMesh = undefined;
        //重新构造mesh
        let geometry = new THREE.BufferGeometry();
        let vertices = [this._xMin, this._yMax, this._zMin, this._xMin, this._yMin, this._zMin, this._xMin, this._yMax, this._zMax, this._xMin, this._yMin, this._zMax];
        let faces = [0, 1, 2, 2, 1, 3];
        let positions = Float32Array.from(vertices);
        geometry.setIndex(faces);//拓扑索引
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        let material = new THREE.MeshBasicMaterial({
            transparent:true,
            side:THREE.DoubleSide,
            opacity:0.1,
            color:0xff6600
        });
        this._leftPlaneMesh = new THREE.Mesh(geometry, material);
        this._leftPlaneMesh.name = "BoxClipLeftPlane";
        this._obj.add(this._leftPlaneMesh);
    },

    modifyRightPlaneMesh:function(){
        //清除原先mesh
        let sceneManager = new SceneManager();
        sceneManager.clearNode(this._obj, "BoxClipRightPlane");
        this._rightPlaneMesh = undefined;
        //重新构造mesh
        let geometry = new THREE.BufferGeometry();
        let vertices = [this._xMax, this._yMax, this._zMin, this._xMax, this._yMin, this._zMin, this._xMax, this._yMax, this._zMax, this._xMax, this._yMin, this._zMax];
        let faces = [1, 0, 2, 1, 2, 3];
        let positions = Float32Array.from(vertices);
        geometry.setIndex(faces);//拓扑索引
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        let material = new THREE.MeshBasicMaterial({
            transparent:true,
            side:THREE.DoubleSide,
            opacity:0.1,
            color:0xff6600
        });
        this._rightPlaneMesh = new THREE.Mesh(geometry, material);
        this._rightPlaneMesh.name = "BoxClipRightPlane";
        this._obj.add(this._rightPlaneMesh);
    },

    translateTopPlane:function(distance){
        let top = this._yMax - 0;
        this._topPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), top);
        this._topPlaneMesh.translateY(distance);
    },

    translateBottomPlane:function(distance){
        let bottom = 0 - this._yMin;
        this._bottomPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), bottom);
        this._bottomPlaneMesh.translateY(distance);
    },

    translateFrontPlane:function(distance){
        let front = this._zMax - 0;
        this._frontPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), front);
        this._frontPlaneMesh.translateZ(distance);
    },

    translateBackPlane:function(distance){
        let back = 0 - this._zMin;
        this._backPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), back);
        this._backPlaneMesh.translateZ(distance);
    },

    translateLeftPlane:function(distance){
        let left = 0 - this._xMin;
        this._leftPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), left);
        this._leftPlaneMesh.translateX(distance);
    },

    translateRightPlane:function(distance){
        let right = this._xMax - 0;
        this._rightPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), right);
        this._rightPlaneMesh.translateX(distance);
    },

    //空间坐标转屏幕坐标
    modelSpaceToScreenSpace:function(pos){
        let viewPos = Matrix4.transferVectorByMatrix(pos, camera.matrixWorldInverse.elements);
        viewPos[3] = 1;
        let clipPos = Matrix4.transferVectorByMatrix(viewPos, camera.projectionMatrix.elements);
        //转ndc
        let ndcPos = [clipPos[0] / clipPos[3], clipPos[1] / clipPos[3], clipPos[2] / clipPos[3]];
        let fragCoord = [0, 0, 0, 1];
        fragCoord[0] = (ndcPos[0] + 1.0) / 2.0;
        fragCoord[1] = (-ndcPos[1] + 1.0) / 2.0;
        fragCoord[2] = (ndcPos[2] + 1.0) / 2.0;
        fragCoord[0] *= window.innerWidth;
        fragCoord[1] *= window.innerHeight;
        return [fragCoord[0], fragCoord[1], 0];
    },

    //计算y轴在屏幕上的投影向量
    computeScreenYDir:function(){
        let y0 = [0, 0, 0, 1];
        let y1 = [0, 1, 0, 1];
        let screen0 = this.modelSpaceToScreenSpace(y0);
        let screen1 = this.modelSpaceToScreenSpace(y1);
        let screenYDir = Vector3.new();
        Vector3.sub(screenYDir, screen1, screen0);
        return screenYDir;
    },

    //计算x轴在屏幕上的投影向量
    computeScreenXDir:function(){
        let x0 = [0, 0, 0, 1];
        let x1 = [1, 0, 0, 1];
        let screen0 = this.modelSpaceToScreenSpace(x0);
        let screen1 = this.modelSpaceToScreenSpace(x1);
        let screenXDir = Vector3.new();
        Vector3.sub(screenXDir, screen1, screen0);
        return screenXDir;
    },

    //计算z轴在屏幕上的投影向量
    computeScreenZDir:function(){
        let z0 = [0, 0, 0, 1];
        let z1 = [0, 0, 1, 1];
        let screen0 = this.modelSpaceToScreenSpace(z0);
        let screen1 = this.modelSpaceToScreenSpace(z1);
        let screenZDir = Vector3.new();
        Vector3.sub(screenZDir, screen1, screen0);
        return screenZDir;
    }
});