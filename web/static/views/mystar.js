define(['jquery', 'underscore', 'backbone', 
        'views/inbox', 'views/article-list-item-view'],
function($, _, backbone, Inbox, ArticleListItemView){
    'use strict';
    var _event =_.extend({}, Backbone.Events);
    var MyArticleListItemView = ArticleListItemView.extend({
        
    });

    var MyStar = Inbox.extend({

        bindEvent: function(){
            var self = this;
            Inbox.prototype.bindEvent.call(self);
            _event.on("MyArticleListItemView.unstar", function(article){
                self.model.remove(article);
            })
        },

        render:  function(){
            var self = this;
            self.$(".article-container").html('');
            _.each(self.model.models, function(article){
                var articleListView = new MyArticleListItemView({model: article});
                articleListView.render();
                self.$(".article-container").append(articleListView.$el)
            })
        }
    });

    return MyStar;

})