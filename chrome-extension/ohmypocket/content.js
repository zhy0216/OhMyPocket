var HOST = 'http://chromeapi.ohmypocket.com';



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

    if(data.action === "open-login"){
        var url =HOST + "/#login-popup";
        var newwindow = window.open(url, "_blank", "resizable=no, scrollbars=no, titlebar=no, width=400, height=400, top=50, left=300");
    }
});


