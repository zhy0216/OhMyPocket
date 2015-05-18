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
         'views/pageview',
         'views/login-view', 'views/register-view', 'views/article-list-item-view',  'views/show-article',
         'views/random-walk', 'views/inbox', 'views/mystar', 'views/archive', 'views/message',
         // views stuff
         'models/article', 'models/article-collection',  // models
         'domReady!', 'bootstrap'], 
        function($, _, Backbone,
                PageView,
                LoginView, RegisterView, ArticleListItemView, ShowArticle,
                RandomWalk, Inbox, MyStar, Archive, MessageContainerView,
                Article, ArticleCollection
                ) {
    'use strict';
    // console.log($);
    // console.log(_);
    // console.log(Backbone);
    var Page = {};

    var MESSAGEVIEW = new MessageContainerView({el: "#message-container"});

    Page.index = new PageView({el: "#main-view"});
    Page.login = new LoginView({el: "#login-view"});
    Page.register = new RegisterView({el: "#register-view"});
    Page.showArticle = new ShowArticle({el: "#article-view"});
    Page.randomWalk = new RandomWalk();
    Page.inbox = new Inbox({el: "#inbox-view"});
    Page.mystar = new MyStar({el: "#star-view"});
    Page.archive = new Archive({el: "#archive-view"});


    var router = new (Backbone.Router.extend({

        routes: {
            "": "index",
            "login": "login",
            "login-popup": "loginPopup",
            'register': 'register',
            "register-popup": "registerPopup",
            'article/:articleid': 'showArticle',
            'random-walk': 'randomWalk',
            'inbox': 'showInbox',
            'mystar': 'showStarArticles',
            'archive': 'showArchive',
            'logout': 'logout',
        },

        index: function(){
            Page.index.switchView();
        },

        login: function(){
            Page.login.switchView();
        },

        loginPopup: function(){
            var popView = new LoginView({el: "#login-view"});
            popView.success = function(){
                router.navigate("exit", {trigger: false});
            }
            popView.switchView();
        }, 

        register: function(){
            Page.register.switchView();
        },

        registerPopup: function(){
            var popView = new LoginView({el: "#register-view"});
            popView.success = function(){
                router.navigate("exit", {trigger: false});
            }
            popView.switchView();
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
                    router.navigate("article/" + article.get("id"), {trigger: false, replace: true});
                }).error(function(){
                    router.navigate("inbox", {trigger: true});
                    Backbone.trigger("show-alert", "You have read all articles", true);
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
                    if(data.articles.length === 0){
                        Backbone.trigger("show-alert", "You do not have any articles here");
                    }
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
                    if(data.articles.length === 0){
                        Backbone.trigger("show-alert", "You do not have any articles here");
                    }
                });
        },

        showArchive: function(){
            Page.archive.post("/api/article/archive/")
                .done(function(data){
                    console.log(data);
                    
                    var articleCollection = new ArticleCollection(data.articles);
                    Page.archive.setModel(articleCollection);
                    Page.archive.render();
                    Page.archive.switchView();
                    if(data.articles.length === 0){
                        Backbone.trigger("show-alert", "You do not have any articles here");
                    }
                });
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

    Backbone.on("show-alert", function(message, unclear){
        MESSAGEVIEW.collection.addMessage(message);
        MESSAGEVIEW.show(unclear);
    });

    Backbone.on("close-alert", function(){
        MESSAGEVIEW.hide();
    });

    Backbone.on("require-login", function(data){
        if((!data) || (data.status_code === 401)){
            router.navigate("login", {trigger: true});
            Backbone.trigger("show-alert", "You need login first");
        }
    });

    // patch
    if (typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
      };
    }

    // https://github.com/component/regexps/blob/master/index.js#L3
    var linkRex = /^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i

    $(document).on("keydown", ".login-sidebar #nav-search",function(e){
        if (e.which !== 13) {
            return ;
        }
        var $this = $(this);
        var content = $this.val();

        // check if this is a link
        if(linkRex.test(content)){
            $.post("/api/article/add", {
                url: content
            }).done(function(resp) {
                if (resp.ok) {
                    //done
                    
                }
            })
        }


    });


    Backbone.history.start();



});
