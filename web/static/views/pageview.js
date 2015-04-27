define(['jquery', 'underscore', 'backbone'],
function($, _, backbone){

    var curView = null;
    var PageView = Backbone.View.extend({

        switchView: function(){
            if(curView && curView === this.$el){
                return ;
            }

            function _show(){
                curView = this.$el;
                curView.fadeIn();
            }

            if(curView){
                curView.fadeOut(_show);
            }else{
                _show();
            }
        },


    });

    return PageView;

});

