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

var ex1 = '.ex1';
var ex2 = '.ex2';

function displayQuiz1(){
    pauseVideo()
    $('.cover').addClass('active')
    $('.ex1').addClass('active')
}

function displayQuiz2(){
    pauseVideo()
    $('.cover').addClass('active')
    $('.ex2').addClass('active')
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

$('.ex1_btn').click(function(){
    $('.cover').removeClass('active');
    $('.ex1').removeClass('active');
    playVideo;
});

$('.ex2_btn').click(function(){
    $('.ex2').removeClass('active');
    $('.cover').removeClass('active');
    playVideo;
});



//Multiple choice exercise

function choice1(){
    $('.ex1_text').children('ul').children('li').click(function(){
        let answer = $(this).index('li')
        if (answer === 1){
            $('.ex1_feedback').addClass('active');
            $('.ex1_btn.correct').addClass('active')
        }else{
            $('.ex1_feedback').addClass('active');
            $('.ex1_btn.wrong').addClass('active')
        }
    })
}

function choice2(){
    $('.ex2_text').children('ul').children('li').click(function(){
        let answer = $(this).index('li')
        if (answer === 0){
            $('.ex2_feedback').addClass('active');
            $('.ex2_btn.correct').addClass('active')
        }else{
            $('.ex2_feedback').addClass('active');
            $('.ex2_btn.wrong').addClass('active')
        }
    })
}

choice1()
choice2()

