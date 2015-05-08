define(['jquery', 'underscore', 'backbone'],
    function($, _, Backbone) {
        'use strict';
        var Message = Backbone.Model.extend({

        });

        var MessageCollection = Backbone.Collection.extend({
            model: Message,

            clear: function(){
                this.reset([], {silent: true})
            },

            addMessage: function(content){ // content ==> str
                var message = new Message({content: content});
                this.add(message);
            },

        });
        MessageCollection.prototype.popFirst = MessageCollection.prototype.unshift;



        return {
            "Model": Message,
            "Collection": MessageCollection,
        }

})