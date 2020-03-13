let MeasureNode = function(){
    this._obj = new THREE.Group();
};

Object.assign(MeasureNode.prototype, {
    setName:function(name){
        this._obj.name = name;
    },

    createPoint:function(position, index){
        let spGeo = new THREE.SphereGeometry(10, 10, 10);
        let spMtl = new THREE.MeshBasicMaterial({
            color:0x000000
        });
        let sp = new THREE.Mesh(spGeo, spMtl);
        sp.name = "MeasurePoint_"+index;
        sp.position.set(position[0], position[1], position[2]);
        this._obj.add(sp);
    },

    createLine:function(lastPos, currPos, index){
        let start = new THREE.Vector3(lastPos[0], lastPos[1], lastPos[2]);
        let end = new THREE.Vector3(currPos[0], currPos[1], currPos[2]);
        let lineGeo = new THREE.Geometry();
        lineGeo.vertices.push(start, end);
        let lineMtl = new THREE.LineBasicMaterial({
            color:0xff0000
        });
        let line = new THREE.Line(lineGeo, lineMtl);
        line.name = "MeasureLine_"+index;
        let sceneManager = new SceneManager();
        sceneManager.clearNode(this._obj, line.name);
        this._obj.add(line);
    },

    //已有顶点数
    getPointNum:function(){
        let pointNum = 0;
        if(this._obj.children.length > 0){
            for(let i=0; i<this._obj.children.length; i++){
                if(this._obj.children[i] instanceof THREE.Mesh){
                    pointNum ++;
                }
            }
        }
        return pointNum;
    },
});