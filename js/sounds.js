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

var bgMusicSelected = -2;

var bgMusic = [
    new sound("snd/t3tr15.mp3", true), 
    new sound("snd/t3tr15-remix.mp3", true)
];

var loseSounds = [
    new sound("snd/lose-gesu.mp3", false),
    new sound("snd/lose-proprio-merda.mp3", false),
    new sound("snd/lose-mario3.mp3", false)
];

var lineSounds = [
    new sound("snd/line-poggers.mp3", false),
    new sound("snd/line-bam.mp3", false),
    new sound("snd/line-forte.mp3", false),
    new sound("snd/line-fortissimo.mp3", false),
    new sound("snd/line-bravo.mp3", false),
    new sound("snd/line-genio.mp3", false),
    new sound("snd/line-gasato.mp3", false),
    new sound("snd/line-ok.mp3", false),
    new sound("snd/line-forse.mp3", false),
    new sound("snd/line-masterato.mp3", false),
    new sound("snd/line-masterato-grande.mp3", false),
    new sound("snd/line-perfetto.mp3", false),
    new sound("snd/line-complimenti.mp3", false)
];

function setMusic(value) {
    if(bgMusicSelected != value || value == -2) {
        if(value == -2) {
            value = saveGame.musicIndex;
            if(!isNumeric(value)) {
                value = 0;
            }
        }
        if(bgMusicSelected >=0) {
            bgMusic[bgMusicSelected].stop();        
        }
        bgMusicSelected = value;
        if(value >= 0) {
            bgMusic[bgMusicSelected].play();
            bgMusic[bgMusicSelected].sound.currentTime=0;
            bgMusic[bgMusicSelected].sound.volume = 0.7;
        }
    }
    saveGame.setMusicIndex(value);
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

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function playLoseSound() {
    loseSounds[Math.floor(Math.random() * loseSounds.length)].play();
}

function playLineSound() {
    lineSounds[Math.floor(Math.random() * lineSounds.length)].play();
}