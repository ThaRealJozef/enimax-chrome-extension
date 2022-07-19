
let frameHistory = [];

document.getElementById("frame").onload = function () {
    if (frameHistory.length === 0) {
        frameHistory.push(document.getElementById("frame").contentWindow.location.href);
    }
    else if (frameHistory[frameHistory.length - 1] != document.getElementById("frame").contentWindow.location.href) {
        frameHistory.push(document.getElementById("frame").contentWindow.location.href);

    }
};
async function MakeCusReq(url, options) {
    return new Promise(function (resolve, reject) {
        cordova.plugin.http.sendRequest(url, options, function (response) {
            resolve(response.data);
        }, function (response) {
            reject(response.error);
        });
    });
}

async function MakeFetch(url, options) {
    return new Promise(function (resolve, reject) {
        fetch(url, options).then(response => response.text()).then((response) => {
            resolve(response);
        }).catch(function (err) {
            reject(err);
        });
    });
}

if (config.chrome) {

    document.getElementById("player").onload = function () {
        if (document.getElementById("player").contentWindow.location.href.includes("www/fallback.html")) {
            document.getElementById("player").style.display = "none";
            document.getElementById("frame").style.height = "100%";
            document.getElementById("frame").style.display = "block";
        }
    };
} else {

}

function exec_action(x, reqSource) {

    if (x.action == 1) {

        screen.orientation.lock(x.data).then(function () {


        }).catch(function (error) {

        });


    } else if (x.action == 2) {

        downloadFile(x);
    } else if (x.action == 3) {
        window.location = x.data;
    } else if (x.action == 5) {

        var currentEngine;
        let temp3 = x.data.split("&engine=");
        if (temp3.length == 1) {
            currentEngine = wco;
        } else {
            currentEngine = parseInt(temp3[1]);
            if (currentEngine == 0) {
                currentEngine = extensionList[0];
            } else {
                currentEngine = extensionList[currentEngine];
            }
        }
        currentEngine.getLinkFromUrl(temp3[0]).then(function (x) {
            x.action = 1;
            reqSource.postMessage(x, "*");

        }).catch(function (x) {
            x.action = 1;
            console.error(x);
            reqSource.postMessage(x, "*");

        });
    } else if (x.action == 11) {

        PictureInPicture.enter(480, 270, function (success) {

        });
    } else if (x.action == 15) {
        if (!config.chrome) {
            MusicControls.updateIsPlaying(true);
        }

    } else if (x.action == 400) {
        screen.orientation.lock("any").then(function () {

        }).catch(function (error) {

        });



        document.getElementById("player").classList.add("pop");
        document.getElementById("frame").style.height = "calc(100% - 200px)";

        document.getElementById("frame").style.display = "block";
        document.getElementById("player").style.display = "block";

    }

    else if (x.action == 401) {
        screen.orientation.lock("landscape").then(function () {

        }).catch(function (error) {

        });



        document.getElementById("player").classList.remove("pop");
        document.getElementById("frame").style.height = "100%";

        document.getElementById("frame").style.display = "none";
        document.getElementById("player").style.display = "block";

    } else if (x.action == 16) {
        if (!config.chrome) {
            MusicControls.updateIsPlaying(false);
        }
    } else if (x.action == 20) {

        let toSend;

        if (config.chrome) {
            toSend = "";
        } else {
            toSend = cordova.plugin.http.getCookieString(config.remoteWOport);
        }
        reqSource.postMessage(
            { "action": 200, "data": toSend }
            , "*");



    } else if (x.action == 21) {
        window.location = "login.html";



    } else if (x.action == 22) {
        window.location = "reset.html";



    } else if (x.action == 26) {
        window.location = "settings.html";



    } else if (x.action == 12) {
        if (!config.chrome) {

            var showName = x.nameShow.split("-");

            for (var i = 0; i < showName.length; i++) {
                let temp = showName[i];
                temp = temp.charAt(0).toUpperCase() + temp.slice(1);
                showName[i] = temp;

            }

            x.nameShow = showName.join(" ");

            MusicControls.create({
                track: x.nameShow,
                artist: "Episode " + x.episode,
                cover: 'anime.png',

                isPlaying: true,							// optional, default : true
                dismissable: true,							// optional, default : false


                hasPrev: x.prev,
                hasNext: x.next,
                hasClose: true,



                playIcon: 'media_play',
                pauseIcon: 'media_pause',
                prevIcon: 'media_prev',
                nextIcon: 'media_next',
                closeIcon: 'media_close',
                notificationIcon: 'notification'
            }, function () { }, function () { });




            function events(action) {

                const message = JSON.parse(action).message;
                switch (message) {
                    case 'music-controls-next':
                        document.getElementById("player").contentWindow.postMessage({ "action": "next" }, "*");

                        break;
                    case 'music-controls-previous':
                        document.getElementById("player").contentWindow.postMessage({ "action": "previous" }, "*");

                        break;
                    case 'music-controls-pause':
                        document.getElementById("player").contentWindow.postMessage({ "action": "pause" }, "*");

                        break;
                    case 'music-controls-play':
                        document.getElementById("player").contentWindow.postMessage({ "action": "play" }, "*");

                        break;
                    case 'music-controls-destroy':

                        break;
                    case 'music-controls-toggle-play-pause':
                        document.getElementById("player").contentWindow.postMessage({ "action": "toggle" }, "*");

                        break;

                    case 'music-controls-media-button':

                        break;
                    case 'music-controls-headset-unplugged':
                        document.getElementById("player").contentWindow.postMessage({ "action": "pause" }, "*");


                        break;
                    case 'music-controls-headset-plugged':

                        break;
                    default:
                        break;
                }
            }

            MusicControls.subscribe(events);

            MusicControls.listen();

            MusicControls.updateIsPlaying(true);
        }
    } else if (x.action == 4) {

        if  (config.chrome && document.getElementById("player").contentWindow.location.href.includes("/www/fallback.html")) {

            document.getElementById("player").contentWindow.location = ("pages/player/index.html" + x.data);

        } else {
            document.getElementById("player").contentWindow.location.replace("pages/player/index.html" + x.data);

        }




        document.getElementById("frame").style.display = "none";
        document.getElementById("frame").style.height = "100%";
        document.getElementById("player").style.display = "block";


        document.getElementById("player").classList.remove("pop");



    }

}




window.addEventListener('message', function (x) {
    exec_action(x.data, x.source);
});




document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {


    document.getElementById("frame").src = "pages/homepage/index.html";



    function onBackKeyDown() {
        let frameLocation = document.getElementById("frame").contentWindow.location.pathname;
        if (frameLocation.indexOf("www/pages/homepage/index.html") > -1 || (document.getElementById("player").className.indexOf("pop") == -1 && document.getElementById("player").contentWindow.location.pathname.indexOf("www/pages/player/index.html") > -1)) {
            console.log("BACK1");
            document.getElementById("player").contentWindow.location.replace("fallback.html");
            document.getElementById("player").classList.remove("pop");

            document.getElementById("player").style.display = "none";
            document.getElementById("frame").style.display = "block";

            if (frameLocation.indexOf("www/pages/homepage/index.html") > -1) {
                document.getElementById("frame").contentWindow.location.reload();
            }

            document.getElementById("frame").style.height = "100%";
            MusicControls.destroy();


            screen.orientation.lock("any").then(function () {

            }).catch(function (error) {

            });




        } else {
            console.log("BACK2");

            if (frameHistory.length > 1) {
                frameHistory.pop();
                document.getElementById("frame").contentWindow.location = frameHistory[frameHistory.length - 1];
            }

        }
        // document.getElementById("frame").src = "pages/homepage/index.html";
        // document.getElementById("player").src = "";
        // document.getElementById("frame").style.display = "block";
        // document.getElementById("player").style.display = "none";
    }




    if (cordova.plugin.http.getCookieString(config.remoteWOport).indexOf("connect.sid") == -1 && config.local == false) {
        window.location = "login.html";
    }

    document.addEventListener("backbutton", onBackKeyDown, false);


    function nope() {

    }
    window.BackgroundService.start(
        function (fn) { nope(), fn && fn() },
        function () { console.log('err') }
    )

    cordova.plugins.backgroundMode.enable();

}

if (config.chrome) {
    document.getElementById("frame").src = "pages/homepage/index.html";
}


