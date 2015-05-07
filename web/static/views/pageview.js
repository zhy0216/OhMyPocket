define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone){
    'use strict';
    var curView = null;
    var PageView = Backbone.View.extend({

        model: null,

        initialize: function() {
            // console.log("init");
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
            $('#alert-bar').hide();


            if(curView){
                curView.hide();
                curView = self.$el;
                curView.show();
            }else{
                curView = self.$el;
                curView.show();
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

