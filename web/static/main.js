$(function() {

    var switchView = (function(){
        var curView = null;
        return function(viewId){
            if(curView && curView.attr("id") === viewId){
                return ;
            }

            function _show(){
                curView = $('#' + viewId);
                curView.fadeIn();
            }

            if(curView){
                curView.fadeOut(_show);
            }else{
                _show();
            }
        }
    })();

    var bindLoginEvent = _.once(function(){
        $("#login-view .login-btn").on('click', function(){
            var username = $("#login-view .username").val();
            var password = $("#login-view .password").val();
            $.post("/api/account/login", {
                username: username,
                password: password,
            }).done(function(data){
                console.log(data);
                router.navigate("random-walk", {trigger: true});
            });

        })
    });

    var bindRegisterEvent = _.once(function(){


    });

    var Article = Backbone.Model.extend({

        star: function(callback){
            var url = "/api/article/" + this.get("id") + "/star";
            var self = this;
            $.post(url).done(function(data){
                self.set("is_star", true);
                callback && callback(data);
            })
        },

        unstar: function(callback){
            var url = "/api/article/" + this.get("id") + "/unstar";
            var self = this;
            $.post(url).done(function(data){
                self.set("is_star", false);
                callback && callback(data);

            })
        },

        star_class: function(){
            if(this.get("is_star")){
                return "star"
            }else{
                return "unstar"
            }
        },

    });


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

        star: function(){
            this.model.star();
        },

        unstar: function(){
            this.model.unstar();
        },

        archieve: function(){
            this.model.archieve();
            this.$el.slideUp();
        },

        render: function(){
            var content = this.template({"article": this.model});
            this.$el.html(content);
            this.undelegateEvents();
            this.delegateEvents();
            return this;
        },

    });


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
            switchView('login-view');
            bindLoginEvent();
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