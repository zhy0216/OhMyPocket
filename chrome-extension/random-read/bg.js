var HOST = 'http://localhost:8000';

var is_login = false;

$.post(HOST + "/api/account/check-user-login")
 .done(function(data){
    is_login = data.is_login;
 })

// add the href directly 
// if add the article not exsist
// then login 
// we do not need to check whether we login or not


chrome.browserAction.onClicked.addListener(function(tab) {
    if(!is_login){
        chrome.browserAction.setPopup({popup: "popup.html"});
        return ;
    }
    // console.log("is_login: " + is_login);
});