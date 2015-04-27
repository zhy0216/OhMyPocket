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
         'views/random-walk', 'views/inbox', 'views/mystar',
         // views stuff
         'models/article', 'models/article-collection',  // models
         'domReady!', 'bootstrap'], 
        function($, _, Backbone,
                LoginView, ArticleListItemView, ShowArticle,
                RandomWalk, Inbox, MyStar,
                Article, ArticleCollection
                ) {
    'use strict';
    console.log($);
    console.log(_);
    console.log(Backbone);

    var Page = {};

    Page.login = new LoginView({el: "#login-view"});
    Page.showArticle = new ShowArticle({el: "#article-view"});
    Page.randomWalk = new RandomWalk();
    Page.inbox = new Inbox({el: "#inbox-view"});
    Page.mystar = new MyStar({el: "#star-view"});


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
                Backbone.trigger("user-logout");
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
                    router.navigate("inbox", {trigger: true});
                });
        },

        showInbox: function(){
            console.log("inbox");
            Page.inbox.post("/api/article/inbox/")
                .done(function(data){
                    console.log(data);
                    var articleCollection = new ArticleCollection(data.articles);
                    Page.inbox.setModel(articleCollection);
                    Page.inbox.render();
                    Page.inbox.switchView();
                });
        },

        showStarArticles: function(){
            console.log("star");
            Page.mystar.post("/api/article/star/")
                .done(function(data){
                    console.log(data);
                    var articleCollection = new ArticleCollection(data.articles);
                    Page.mystar.setModel(articleCollection);
                    Page.mystar.render();
                    Page.mystar.switchView();
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

    Backbone.on("user-login", function(){
        $('.unlogin-sidebar').addClass('view-hide');
        $('.login-sidebar').removeClass('view-hide');
    });

    Backbone.on("user-logout", function(){
        $('.login-sidebar').addClass('view-hide');
        $('.unlogin-sidebar').removeClass('view-hide');
    });


    Backbone.history.start();



});
