define(['jquery', 'underscore', 'backbone'],
function($, _, backbone){
    'use strict';
    var curView = null;
    var PageView = Backbone.View.extend({

        switchView: function(){
            var self = this;
            if(curView && curView === this.$el){
                return ;
            }

            function _show(){
                curView = self.$el;
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

