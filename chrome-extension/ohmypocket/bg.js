var HOST = 'http://ohmypocket.lazyang.com';


// add the href directly 
// if add the article not exsist
// then login 
// we do not need to check whether we login or not


// chrome.browserAction.setPopup({popup: "popup.html"});

function sendToContent(action, callback){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: action}, function(response) {
        // console.log(response);
      });
    });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // console.log("changeInfo::");
    // console.log(changeInfo);
    if(changeInfo.status == "loading") {
        if(tab.url == HOST + "/#exit") {
            chrome.tabs.remove(tabId);
        }
        chrome.browserAction.setIcon({
            path: {
                38: "mypocket-inactive.png"
            }
        });

    }
});

chrome.browserAction.onClicked.addListener(function(tab) {
    sendToContent("require-url");
});


chrome.runtime.onMessage.addListener(function(data) {
    if (data.action == "send-url") {
        $.post(HOST + "/api/article/add", {
            url: data.url
        }).done(function(resp) {
            if (resp.ok) {
                //done
                chrome.browserAction.setIcon({
                    path: {
                        38: "mypocket-active.png"
                    }
                });
            } else {
                if (resp.status_code === 401) {
                    // require login
                    sendToContent("open-login");
                }
            }

        })
    }
});






