var HOST = 'http://localhost:8000';


// add the href directly 
// if add the article not exsist
// then login 
// we do not need to check whether we login or not


// chrome.browserAction.setPopup({popup: "popup.html"});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "require-url"}, function(response) {
        console.log("response");
        console.log(response);
      });
    });
});


chrome.runtime.onMessage.addListener(function(data){
    if(data.action == "send-url"){
        $.post(HOST + "/api/article/add", {
            url: data.url
        }).done(function(resp){
            console.log("add article done");
            console.log(resp);
         })
    }
});








