define(['jquery', 'underscore', 'backbone', 'views/pageview'],
function($, _, backbone, PageView){
    'use strict';
    var RegisterView = PageView.extend({
        events: {
            'click .register-btn': 'register',
        },

        success: function(){},

        register: function(){
            var username = $("#register-view .username").val();
            var password = $("#register-view .password").val();
            var self = this;
            $.post("/api/account/register", {
                username: username,
                password: password,
            }).done(function(data){
                console.log(data);
                if(data.ok){
                    self.success();
                    Backbone.trigger("user-login");
                    Backbone.trigger("url-navigate", "random-walk", {trigger: true});
                }else{
                    Backbone.trigger("show-alert", data.detail);
                }
            });
        },


    });


    return RegisterView;

});

