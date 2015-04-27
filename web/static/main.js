require.config({
    baseUrl: 'static/',
    paths: {
        jquery: 'libs/jquery',
        underscore: 'libs/underscore', 
        backbone: 'libs/backbone',
        domReady: 'libs/domReady',
        bootstrap: 'libs/bootstrap/js/bootstrap'
    }
});

require(['jquery', 'underscore', 'backbone', 
         'views/login-view', 'views/article-list-item-view',  // views stuff
         'models/article',   // models
         'domReady!', 'bootstrap'], 
        function($, _, Backbone,
                LoginView, ArticleListItemView,
                Article
                ) {

    console.log($);
    console.log(_);
    console.log(Backbone);

    var loginPage = new LoginView({el: $("#login-view")});


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
            loginPage.switchView();
        },

        logout: function(){
            $.post("/api/account/logout")
             .done(function(data){
                console.log(data);
                router.navigate("random-walk", {trigger: true});
            });
        },

        randomWalk: function(){
            var renderEngine = _.template($("#article-shower-template").html());
            $.post("/api/article/random")
             .done(function(data){
                var article = new Article(data);
                $("#article-view .entry").html(renderEngine({"article": article.attributes}))
                switchView("article-view");
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
            var renderEngine = _.template($("#article-shower-template").html());
            $.post("/api/article/" + articleId + "/")
             .done(function(data){
                var article = new Article(data);
                $("#article-view .entry").html(renderEngine({"article": article.attributes}))
                switchView("article-view");
            }).error(function(){
                console.log('random error catch');
            });

        },


    }));

    Backbone.history.start();



});
