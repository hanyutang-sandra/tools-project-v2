// Youtube Api
// Code modified from https://developers.google.com/youtube/iframe_api_reference#Getting_Started
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '480',
        width: '853',
        playVars:{
            fs: 0,
            autoplay: 0,
            wmode: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            showinfo: 0
        },
        videoId: '9bYyTZLe5Ro',
        events: {
            'onReady': pauseVideo,
            'onStateChange': onPlayStateChange
        }
    });
}

function playVideo(event) {
    event.target.seekTo(0).playVideo();
}

var drag1 = '.drag1';
var drag2 = '.drag2';

function displayQuiz1(){
    pauseVideo()
    $('.cover').addClass('active')
    $('.drag1').addClass('active')
}

function displayQuiz2(){
    pauseVideo()
    $('.cover').addClass('active')
    $('.drag2').addClass('active')
}

let done = false
let interval = setInterval(function(){
    console.log(getTime())
}, 700)

// Modified from http://jsfiddle.net/thirdender/hnkK7/737/
let stopPlayAt1 = 28, stopPlayAt2 = 93, stopPlayTimer;

function onPlayStateChange(event){
    var time, rate, remainingTime;
    clearTimeout(stopPlayTimer);
    if (event.data == YT.PlayerState.PLAYING) {
        time = player.getCurrentTime();
        if (time + .1 < stopPlayAt1) {
            rate = player.getPlaybackRate();
            remainingTime = (stopPlayAt1 - time) / rate;
            stopPlayTimer = setTimeout(displayQuiz1, remainingTime * 1000);

        }else if(time + .1 >=stopPlayAt1 && time + .1 < stopPlayAt2 - .1){
            rate = player.getPlaybackRate();
            remainingTime = (stopPlayAt2 - time) / rate;
            stopPlayTimer = setTimeout(displayQuiz2, remainingTime * 1000);
        }
    }
}

function getTime(){
    return Math.round(player.getCurrentTime());
}

function stopVideo() {
    player.stopVideo();
}

function playVideo(){
    player.playVideo()
}

function pauseVideo() {
    player.pauseVideo();
}


// Basic button actions
$('.front>button').click(function(){
    $('.front').removeClass('active');
    $('.cover').removeClass('active');
});

$('.drag1_btn').click(function(){
    $('.cover').removeClass('active');
    $('.drag1').removeClass('active');
    playVideo;
});

$('.drag2_btn').click(function(){
    $('.drag2').removeClass('active');
    $('.cover').removeClass('active');
    playVideo;
});



//drag and drop
//code modified from https://gist.github.com/catc/a7588f6bae341bbc7c2dbc941e744f18

const displace = window.displacejs;


function sorting1(){

    let displaceInstances;

    try{
        displaceInstances.forEach(d=>d.destroy())
    }catch(e){}

    const dict={
        '#b1a': '#t1b',
        '#b1b': '#t1a',
        '#b1c': '#t1c',
        '#b1d': '#t1d',
    };

    let map = new Map();
    let move = 0;
    let count = 0;

    displaceInstances = ['#b1a', '#b1b', '#b1c', '#b1d'].map(block => {
        const bel = document.querySelector(block);
        return displace(bel, {
            onMouseDown: function(bel){
                bel.className += ' active';
            },
            onMouseUp: function(bel){
                bel.className = bel.className.replace('active', '');
                checkPosition1(bel);
                checkAnswer1(bel, checkPosition1(bel))
            }
            })
        });

    //check moved position
    function checkPosition1(el) {
        let id = '#' + el.id;
        let minDistance = Math.abs($(id).offset().top - $('#t1a').offset().top);
        let minTarget = '#t1a';
        let targetList = ['#t1a', '#t1b', '#t1c', '#t1d'];

        for (var i = 0; i < targetList.length; i++) {
            if (minDistance > Math.abs($(id).offset().top - $(targetList[i]).offset().top)) {
                minDistance = Math.abs($(id).offset().top - $(targetList[i]).offset().top)
                minTarget = targetList[i]
            }
        }
        map.set(id, minTarget);

        let mintop = $(minTarget)[0].offsetTop;
        let minleft = $(minTarget)[0].offsetLeft;
        $(el).css({
            'top': mintop,
            'left': minleft
        });
        move += 1;
        return map
    }

//check right answer
    function checkAnswer1(el, map){
        let id = '#' + el.id;
        if (map.get(id) === dict[id]){
            count += 1
        }
        if(move>=8){
            if(count >= 4){
                $('.drag1_feedback').addClass('active');
                $('.drag1_btn.correct').addClass('active')
            }else{
                $('.drag1_feedback').addClass('active');
                $('.drag1_btn.wrong').addClass('active')
            }
        }
    }

}


function sorting2(){

    let displaceInstances;

    try{
        displaceInstances.forEach(d=>d.destroy())
    }catch(e){}

    const dict={
        '#b2a': '#t2a',
        '#b2b': '#t2b',
        '#b2c': '#t2c',
    };

    let map = new Map();
    let move = 0;
    let count = 0;

    displaceInstances = ['#b2a', '#b2b', '#b2c'].map(block => {
        const bel = document.querySelector(block);
        return displace(bel, {
            onMouseDown: function(bel){
                bel.className += ' active';
            },
            onMouseUp: function(bel){
                bel.className = bel.className.replace('active', '');
                checkPosition2(bel);
                checkAnswer2(bel, checkPosition2(bel))
            }
        })
    });

    //check moved position
    function checkPosition2(el) {
        let id = '#' + el.id;
        let minDistance = Math.abs($(id).offset().top - $('#t2a').offset().top);
        let minTarget = '#t2a';
        let targetList = ['#t2a', '#t2b', '#t2c'];

        for (var i = 0; i < targetList.length; i++) {
            if (minDistance > Math.abs($(id).offset().top - $(targetList[i]).offset().top)) {
                minDistance = Math.abs($(id).offset().top - $(targetList[i]).offset().top)
                minTarget = targetList[i]
            }
        }
        map.set(id, minTarget);

        let mintop = $(minTarget)[0].offsetTop;
        let minleft = $(minTarget)[0].offsetLeft;
        $(el).css({
            'top': mintop,
            'left': minleft
        });
        move += 1;
        return map
    }

//check right answer
    function checkAnswer2(el, map){
        let id = '#' + el.id;
        if (map.get(id) === dict[id]){
            count += 1
        }
        if(move>=6){
            if(count >= 3){
                $('.drag2_feedback').addClass('active');
                $('.drag2_btn.correct').addClass('active')
            }else{
                $('.drag2_feedback').addClass('active');
                $('.drag2_btn.wrong').addClass('active')
            }
        }
    }

}

sorting1();


sorting2();




