$(function() {

    var switchView = (function(){
        var curView = null;
        return function(viewId){
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
    });



    var router = new (Backbone.Router.extend({

        routes: {
            "": "",
            "login": "login",
            'register': 'register',
            'article/:articleid': 'showArticle',
            'random-walk': 'randomWalk',
            'logout': 'logout',
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
                $("#content").html(renderEngine({"article": article.attributes}))
                router.navigate("article/" + article.get("id"), {trigger: false});
            }).error(function(){
                console.log('random error catch');
            });
        },

        showArticle: function(articleId){
            var renderEngine = _.template($("#article-shower-template").html());
            $.post("/api/article/" + articleId + "/")
             .done(function(data){
                var article = new Article(data);
                $("#content").html(renderEngine({"article": article.attributes}))
                router.navigate("article/" + article.get("id"), {trigger: false});
            }).error(function(){
                console.log('random error catch');
            });

        },


    }));

    Backbone.history.start();

});