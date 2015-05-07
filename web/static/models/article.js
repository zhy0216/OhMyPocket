define(['jquery', 'underscore', 'backbone'],
    function($, _, Backbone) {
        'use strict';
        var Article = Backbone.Model.extend({

            star: function(callback) {
                var url = "/api/article/" + this.get("id") + "/star";
                var self = this;
                $.post(url).done(function(data) {
                    Backbone.trigger("require-login", data);
                    if(data.ok){
                        self.set("is_star", true);
                        callback && callback(data);
                    }
                })
            },

            unstar: function(callback) {
                var url = "/api/article/" + this.get("id") + "/unstar";
                var self = this;
                $.post(url).done(function(data) {
                    Backbone.trigger("require-login", data);
                    if(data.ok){
                        self.set("is_star", false);
                        callback && callback(data);
                    }
                })
            },

            star_class: function() {
                if (this.get("is_star")) {
                    return "star"
                } else {
                    return "unstar"
                }
            },
            archive: function(callback){
                var url = "/api/article/" + this.get("id") + "/archive";
                var self = this;
                $.post(url).done(function(data) {
                    Backbone.trigger("require-login", data);
                    if(data.ok){
                        callback && callback(data);
                    }
                })
            },

            delete: function(callback){
                var url = "/api/article/" + this.get("id") + "/delete";
                var self = this;
                $.post(url).done(function(data) {
                    Backbone.trigger("require-login", data);
                    if(data.ok){
                        callback && callback(data);
                    }
                })
            }

        });

        return Article;

    });