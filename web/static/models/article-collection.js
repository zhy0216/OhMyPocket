define(['jquery', 'underscore', 'backbone', 'models/article'],
    function($, _, backbone, Article) {
        'use strict';
        var ArticleCollection = Backbone.Collection.extend({
            model: Article,
        })


        return ArticleCollection;
    });