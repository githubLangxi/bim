let DrawManager = function(){

};

Object.assign(DrawManager.prototype, {
    startLoop:function(){
        loop();
    }
});

function loop(){
    requestAnimationFrame(loop);
    if(controls){
        controls.update();
    }
    renderer.render(scene, camera);
    if(!measureDistanceOn && !modifyDistanceOn &&
        !measureAngleOn && !modifyAngleOn){
        //更新textDiv
        let textDiv = new TextDiv();
        textDiv.updateCamera();
    }
}