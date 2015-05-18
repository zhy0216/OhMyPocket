define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone){
    'use strict';
    var curView = null;
    var PageView = Backbone.View.extend({

        model: null,

        initialize: function() {
            // console.log("init");
            this.undelegateEvents();
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

        hide: function(){
            this.undelegateEvents();
            this.$el.hide();
        },

        show: function(){
            this.delegateEvents();
            this.$el.show();
        },

        switchView: function(){
            var self = this;
            if(curView && curView === this){
                Backbone.trigger("close-alert");
                return ;
            }

            Backbone.trigger("close-alert");

            if(curView){
                curView.hide();
                curView = self;
                curView.show();
            }else{
                curView = self;
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

