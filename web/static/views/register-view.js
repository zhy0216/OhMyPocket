define(['jquery', 'underscore', 'backbone', 'views/pageview'],
function($, _, backbone, PageView){
    'use strict';
    var RegisterView = PageView.extend({
        events: {
            'click .register-btn': 'register',
        },

        register: function(){
            var username = $("#register-view .username").val();
            var password = $("#register-view .password").val();
            $.post("/api/account/register", {
                username: username,
                password: password,
            }).done(function(data){
                console.log(data);
                if(data.ok){
                    Backbone.trigger("user-login");
                    Backbone.trigger("url-navigate", "random-walk", {trigger: true});
                }
            });
        },


    });


    return RegisterView;

});

