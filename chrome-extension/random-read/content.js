



function sendUrl(){
    var url = window.location.href;
    chrome.runtime.sendMessage({action: 'send-url',
        url: url
    });
}


chrome.runtime.onMessage.addListener(function(data) {
    console.log(data)
    if(data.action === "require-url"){
        sendUrl();
    }
});
