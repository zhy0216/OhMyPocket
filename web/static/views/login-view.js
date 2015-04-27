define(['jquery', 'underscore', 'backbone', 'pageview'],
function($, _, backbone, PageView){

    var LoginView = Backbone.View.extend({
        events: {
            'click .login-btn': 'login',
        },

        login: function(){
            var username = $("#login-view .username").val();
            var password = $("#login-view .password").val();
            $.post("/api/account/login", {
                username: username,
                password: password,
            }).done(function(data){
                console.log(data);
                // router.navigate("random-walk", {trigger: true});
            });
        },


    });


    return LoginView;

});

