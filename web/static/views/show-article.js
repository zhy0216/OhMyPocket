define(['jquery', 'underscore', 'backbone', 'views/pageview'], function($, _, backbone, PageView) {
    'use strict';

    var ShowArticle = PageView.extend({
        events: {
            'click .toolbar .btn.star': 'unstar',
            'click .toolbar .btn.unstar': 'star',
            'click .toolbar .btn.archieve': 'archieve',
        },
        template: _.template($("#article-shower-template").html()),
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
        render: function(){
            this.$el.html(this.template(this.model));
            this.undelegateEvents();
            this.delegateEvents();
        }
    })

    return ShowArticle;
})