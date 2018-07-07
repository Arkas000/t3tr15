function sound(src, loop) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    if(loop) {
        /*this.sound.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);*/
        this.sound.loop = true;
    }
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
        this.sound.see
    }
}

var bgMusicSelected = 0;

var bgMusic = [new sound("snd/t3tr15.mp3", true), new sound("snd/t3tr15-remix.mp3", true)];

function setMusic(value) {
    if(bgMusicSelected != value) {
        if(bgMusicSelected >=0) {
            bgMusic[bgMusicSelected].stop();        
        }
        bgMusicSelected = value;
        if(value >= 0) {
            bgMusic[bgMusicSelected].play();
            bgMusic[bgMusicSelected].sound.currentTime=0;
        }
    }
}

$("#musicABtn").click(function() {
    setMusic(0);
})
$("#musicBBtn").click(function() {
    setMusic(1);
})
$("#noMusicBtn").click(function() {
    setMusic(-1);
})