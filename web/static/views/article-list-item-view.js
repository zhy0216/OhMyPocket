define(['jquery', 'underscore', 'backbone'],
    function($, _, backbone) {
        'use strict';
        var ArticleListItemView = Backbone.View.extend({
            className: "article-list-item",
            template: _.template($("#article-list-item-template").html()),

            events: {
                'click .toolbar .btn.star': 'unstar',
                'click .toolbar .btn.unstar': 'star',
                'click .toolbar .btn.archieve': 'archieve',
            },

            initialize: function() {
                console.log("init");
                this.listenTo(this.model, "change", this.render);
            },

            star: function() {
                this.model.star();
            },

            unstar: function() {
                this.model.unstar();
            },

            archieve: function() {
                this.model.archieve();
                this.$el.slideUp();
            },

            render: function() {
                var content = this.template({
                    "article": this.model
                });
                this.$el.html(content);
                this.undelegateEvents();
                this.delegateEvents();
                return this;
            },

        });

        return ArticleListItemView;

    });