define(['jquery', 'underscore', 'backbone', 'models/message'],
    function($, _, backbone, Message) {
        'use strict';
        var MessageContainerView = Backbone.View.extend({
            collection: new Message.Collection(),

            initialize: function() {
                this.listenTo(this.collection, "add", this.render);
            },

            hide: function(){
                if(this.collection.length === 0){
                    this.$el.hide();
                }
            },

            show: function(unclear){
                this.$el.show();
                if(!unclear){
                    this.collection.clear();
                }
            },

            render: function(){
                this.$el.html(this.template(this.collection));
            },

            template: _.template($("#alert-message-template").html()),

        });

        return MessageContainerView;

})




