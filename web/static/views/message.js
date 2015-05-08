define(['jquery', 'underscore', 'backbone'],
    function($, _, backbone) {
        'use strict';
        var MessageView = Backbone.View.extend({

            initialize: function() {
                this.listenTo(this.collection, "add", this.render);
            },

            hide: function(){
                this.$el.hide();
            },

            show: function(){
                this.$el.show();
            },

            template: _.template($("#alert-message-template").html()),

        });


        return MessageView;



})