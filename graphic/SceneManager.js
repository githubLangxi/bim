let SceneManager = function(){
    this._meshes = [];
    this._certainMesh = undefined;
    this._certainGroup = undefined;
    this._certainLine = undefined;
};

Object.assign(SceneManager.prototype, {
    clear:function(){
        this._meshes = [];
        this._certainMesh = undefined;
        this._certainGroup = undefined;
        this._certainLine = undefined;
    },

    //清空场景
    clearScene:function(node){
        if(node){
            if(node.children.length > 0){
                for(let i=node.children.length-1; i>=0; i--){
                    if(node.children[i] instanceof THREE.Mesh
                        || node.children[i] instanceof THREE.Line){
                        node.children[i].geometry.dispose(); //删除几何体缓存
                        node.children[i].material.dispose(); //删除材质缓存
                        node.remove(node.children[i]);//移除这个mesh
                    }else if(node.children[i] instanceof THREE.Group){
                        if(node.children[i].children.length === 0){
                            node.remove(node.children[i]);//移除这个group
                        }else{
                            this.clearScene(node.children[i]);
                        }
                    }
                }
            }
        }
    },

    //清除某个节点
    clearNode:function(node, name){
        if(node){
            if(node.children.length > 0){
                for(let i=node.children.length-1; i>=0; i--){
                    if(node.children[i] instanceof THREE.Mesh
                        || node.children[i] instanceof THREE.Line){
                        if(node.children[i].name === name){
                            node.children[i].geometry.dispose(); //删除几何体缓存
                            node.children[i].material.dispose(); //删除材质缓存
                            node.remove(node.children[i]);//移除这个mesh
                        }
                    }else if(node.children[i] instanceof THREE.Group){
                        if(node.children[i].children.length === 0){
                            node.remove(node.children[i]);//移除这个group
                        }else{
                            this.clearNode(node.children[i]);
                        }
                    }
                }
            }
        }
    },

    //寻找目标里的所有mesh
    findMeshes:function(node){
        if(node.children.length > 0){
            for(let i=0; i<node.children.length; i++){
                if(node.children[i].type === "Group"){
                    this.findMeshes(node.children[i]);
                }else if(node.children[i].type === "Mesh"){
                    this._meshes.push(node.children[i]);
                }
            }
        }
    },

    //寻找目标里的指定mesh
    findCertainMesh:function(node, name){
        if(node.children.length > 0){
            for(let i=0; i<node.children.length; i++){
                if(node.children[i].type === "Group"){
                    this.findCertainMesh(node.children[i]);
                }else if(node.children[i].type === "Mesh"){
                    if(node.children[i].name === name){
                        this._certainMesh = node.children[i];
                        break;
                    }
                }
            }
        }
    },

    //寻找目标里的指定line
    findCertainLine:function(node, name){
        if(node.children.length > 0){
            for(let i=0; i<node.children.length; i++){
                if(node.children[i].type === "Group"){
                    this.findCertainLine(node.children[i]);
                }else if(node.children[i].type === "Line"){
                    if(node.children[i].name === name){
                        this._certainLine = node.children[i];
                        break;
                    }
                }
            }
        }
    },

    //找到某个group
    findCertainGroup:function(node, name){
        if(node.children.length > 0){
            for(let i=0; i<node.children.length; i++){
                if(node.children[i].type === "Group"){
                    if(node.children[i].name === name){
                        this._certainGroup = node.children[i];
                        break;
                    }else{
                        this.findCertainGroup(node.children[i], name);
                    }
                }
            }
        }
    },

    //找到模型group
    getModelGroup:function(){
        let modelGroup = undefined;
        if(scene.children.length > 0){
            for(let i=0; i<scene.children.length; i++){
                if(scene.children[i] instanceof THREE.Group
                    && scene.children[i].name === ""){
                    modelGroup = scene.children[i];
                    break;
                }
            }
        }
        return modelGroup;
    },

    //找到模型所有mesh
    getModelMeshes:function(){
        let modelGroup = this.getModelGroup();
        this.findMeshes(modelGroup);
        return this._meshes;
    },

    //找到某个group的所有mesh
    getMeshesFromCertainGroup:function(name){
        this.findCertainGroup(scene, name);
        this.findMeshes(this._certainGroup);
        return this._meshes;
    },

    //计算场景包围盒
    getBoundingBox:function(){
        let sceneObj = undefined;
        if(scene.children.length > 0){
            for(let i = 0; i < scene.children.length; i++){
                if(scene.children[i] instanceof THREE.Group){
                    sceneObj = scene.children[i];
                    break;
                }
            }
        }
        let boundingBox = new THREE.Box3().setFromObject(sceneObj);
        return boundingBox;
    },

    //模型初始化居中
    adaptCenter:function(){
        let sceneObj = undefined;
        if(scene.children.length > 0){
            for(let i = 0; i < scene.children.length; i++){
                if(scene.children[i] instanceof THREE.Group){
                    sceneObj = scene.children[i];
                    break;
                }
            }
        }
        let boundingBox = new THREE.Box3().setFromObject(sceneObj);
        let x = (boundingBox.max.x + boundingBox.min.x) / 2;
        let y = (boundingBox.max.y + boundingBox.min.y) / 2;
        let z = (boundingBox.max.z - boundingBox.min.z) / 2;
        sceneObj.translateX(-x);
        sceneObj.translateY(-y);
        sceneObj.translateZ(-z);
    },

    //获取节点包围盒
    getNodeBoundingBox:function(node){
        return new THREE.Box3().setFromObject(node);
    },

    //场景模型材质启用clip
    enableClip:function(modelGroup, clipPlanes){
        if(clipPlanes){
            if(modelGroup){
                if(modelGroup.children.length > 0){
                    for(let i=modelGroup.children.length-1; i>=0; i--){
                        if(modelGroup.children[i] instanceof THREE.Mesh
                            || modelGroup.children[i] instanceof THREE.Line){
                            if(modelGroup.children[i].material instanceof Array){
                                for(let j=0; j<modelGroup.children[i].material.length; j++){
                                    modelGroup.children[i].material[j].clippingPlanes = clipPlanes;
                                    modelGroup.children[i].material[j].clipIntersection = false;
                                }
                            }else{
                                modelGroup.children[i].material.clippingPlanes = clipPlanes;
                                modelGroup.children[i].material.clipIntersection = false;
                            }
                        }else if(modelGroup.children[i] instanceof THREE.Group){
                            this.enableClip(modelGroup.children[i]);
                        }
                    }
                }
            }
        }
    },

    //取消材质剖切
    disableClip:function(modelGroup){
        if(modelGroup){
            if(modelGroup.children.length > 0){
                for(let i=modelGroup.children.length-1; i>=0; i--){
                    if(modelGroup.children[i] instanceof THREE.Mesh
                        || modelGroup.children[i] instanceof THREE.Line){
                        if(modelGroup.children[i].material instanceof Array){
                            for(let j=0; j<modelGroup.children[i].material.length; j++){
                                modelGroup.children[i].material[j].clippingPlanes = [];
                                modelGroup.children[i].material[j].clipIntersection = false;
                            }
                        }else{
                            modelGroup.children[i].material.clippingPlanes = [];
                            modelGroup.children[i].material.clipIntersection = false;
                        }
                    }else if(modelGroup.children[i] instanceof THREE.Group){
                        this.disableClip(modelGroup.children[i]);
                    }
                }
            }
        }
    }
});