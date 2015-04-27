define(['jquery', 'underscore', 'backbone'],
    function($, _, backbone) {
        'use strict';
        var Article = Backbone.Model.extend({

            star: function(callback) {
                var url = "/api/article/" + this.get("id") + "/star";
                var self = this;
                $.post(url).done(function(data) {
                    self.set("is_star", true);
                    callback && callback(data);
                })
            },

            unstar: function(callback) {
                var url = "/api/article/" + this.get("id") + "/unstar";
                var self = this;
                $.post(url).done(function(data) {
                    self.set("is_star", false);
                    callback && callback(data);
                })
            },

            star_class: function() {
                if (this.get("is_star")) {
                    return "star"
                } else {
                    return "unstar"
                }
            },

        });

        return Article;

    });