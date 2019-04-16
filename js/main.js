$(document).ready(function(){
    viewer.init();
  });

var viewer = {
    init: function() {
        viewer.sd = new SD('assets');

        viewer.canvas = $(".Canvas");
        viewer.selectCharacter = $(".selectCharacter");
        viewer.selectAnimation = $(".selectAnimation");

        var stringCharacter = "<option>Select</option>";
        for (var value in charData) {
            stringCharacter+= '<option value="' + charData[value] + '">' + value + '</option>';
        }
        viewer.selectCharacter.html(stringCharacter);
        viewer.selectCharacter.change(function() {
            if(this.selectedIndex == 0)
                return;
            var name = $(this).val();
            viewer.sd.load(name, viewer);
        });
        viewer.selectAnimation.change(function() {
            viewer.changeAnimation(this.selectedIndex);
        });

        viewer.app = new PIXI.Application(712, 512, { backgroundColor: 0x1099bb });
        viewer.canvas.html(viewer.app.view);
    },
    changeCanvas : function(skeletonData) {
        viewer.app.stage.removeChildren();

        viewer.spine = new PIXI.spine.Spine(skeletonData);
        var animations = viewer.spine.spineData.animations;
        var stringAnimations = "";
        for(var i = 0; i < animations.length; i++) {
            stringAnimations += "<option value=\"" + animations[i].name + "\">" + animations[i].name + "</option>";
        }
        viewer.selectAnimation.html(stringAnimations);
        viewer.changeAnimation(0);
        viewer.app.stage.addChild(viewer.spine);
        viewer.spine.position.set(viewer.app.view.width * 0.5 , viewer.app.view.height * 0.8);
    },
    changeAnimation : function(num) {
        var name = viewer.spine.spineData.animations[num].name;
        viewer.spine.state.setAnimation(0, name, true);
    }
};
