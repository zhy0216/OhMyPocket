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

    var router = new (Backbone.Router.extend({

        routes: {
            "": "",
            "login": "login",
            'register': 'register',
            'article/:articleid': 'showArticle',
            'random-walk': 'randomWalk',
        },

        login: function(){
            switchView('login-view');
            bindLoginEvent();
        },


    }));

    Backbone.history.start();

});