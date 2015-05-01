define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone){
    'use strict';
    var curView = null;
    var PageView = Backbone.View.extend({

        model: null,

        initialize: function() {
            console.log("init");
            if(this.model){
                this.bindEvent();
            }
        },

        bindEvent: function(){
            this.listenTo(this.model, "change", this.render);
        },

        setModel: function(model){
            this.model = model; // consider event bind
            this.stopListening();
            this.bindEvent();
        },

        switchView: function(){
            var self = this;
            if(curView && curView === this.$el){
                return ;
            }

            function _show(){
                curView = self.$el;
                curView.fadeIn('fast');
            }

            if(curView){
                curView.fadeOut('fast', _show);
            }else{
                _show();
            }
        },

        render: function(){
            this.$el.html(this.template(this.model));
        },

        get: function(url, data){
            var data = data || {};
            return $.get(url, data)
        },

        post: function(url, data){
            var data = data || {};
            return $.post(url, data)
        },



    });

    return PageView;

});

