require.config({
    baseUrl: 'static/',
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    paths: {
        jquery: 'libs/jquery',
        underscore: 'libs/underscore', 
        backbone: 'libs/backbone',
        domReady: 'libs/domReady',
        bootstrap: 'libs/bootstrap/js/bootstrap'
    }
});

require(['jquery', 'underscore', 'backbone', 
         'views/login-view', 'views/article-list-item-view',  'views/show-article',
         'views/random-walk',
         // views stuff
         'models/article',   // models
         'domReady!', 'bootstrap'], 
        function($, _, Backbone,
                LoginView, ArticleListItemView, ShowArticle,
                RandomWalk,
                Article
                ) {
    'use strict';
    console.log($);
    console.log(_);
    console.log(Backbone);

    var Page = {};

    Page.login = new LoginView({el: "#login-view"});
    Page.showArticle = new ShowArticle({el: "#article-view"});
    Page.randomWalk = new RandomWalk();


    var router = new (Backbone.Router.extend({

        routes: {
            "": "index",
            "login": "login",
            'register': 'register',
            'article/:articleid': 'showArticle',
            'random-walk': 'randomWalk',
            'inbox': 'showInbox',
            'mystar': 'showStarArticles',
            'archieve': 'showArchieve',
            'logout': 'logout',
        },

        index: function(){

        },

        login: function(){
            Page.login.switchView();
        },

        logout: function(){
            $.post("/api/account/logout")
             .done(function(data){
                console.log(data);
                router.navigate("random-walk", {trigger: true});
            });
        },

        randomWalk: function(){
            Page.randomWalk.post("/api/article/random")
                .done(function(data){
                    var article = new Article(data);
                    Page.showArticle.setModel(article);
                    Page.showArticle.render();
                    Page.showArticle.switchView();
                    router.navigate("article/" + article.get("id"), {trigger: false});
                }).error(function(){
                    console.log('random error catch');
                });
        },

        showInbox: function(){
            console.log("inbox");
            $.post("/api/article/inbox/")
             .done(function(data){
                console.log(data);
                $("#inbox-view .article-container").html("")
                _.each(data.articles, function(articleData){
                    var article = new Article(articleData);
                    var articleListView = new ArticleListItemView({model: article});
                    articleListView.render();
                    $("#inbox-view .article-container").append(articleListView.$el)
                })
                switchView("inbox-view");

            });
        },

        showStarArticles: function(){
            console.log("star");
            $.post("/api/article/star/")
             .done(function(data){
                console.log(data);
                $("#star-view .article-container").html("")
                _.each(data.articles, function(articleData){
                    var article = new Article(articleData);
                    var articleListView = new ArticleListItemView({model: article});
                    articleListView.render();
                    $("#star-view .article-container").append(articleListView.$el)
                })
                switchView("star-view");

            });
        },

        showArchieve: function(){
            console.log("archieve");
        },

        showArticle: function(articleId){

            Page.showArticle.post("/api/article/" + articleId + "/")
                .done(function(data){
                    Page.showArticle.setModel(new Article(data));
                    Page.showArticle.render();
                    Page.showArticle.switchView();
                }).error(function(){
                    console.log('random error catch');
                });
        },


    }));

    Backbone.on("url-navigate", function(url, option){
        router.navigate(url, option);
    })


    Backbone.history.start();



});
