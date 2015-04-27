define(['jquery', 'underscore', 'backbone', 'views/pageview'],
function($, _, backbone, PageView){
    'use strict';
    var LoginView = PageView.extend({
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
                Backbone.trigger("url-navigate", "random-walk", {trigger: true});
            });
        },


    });


    return LoginView;

});

