function sound(src, loop) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    if(loop) {
        this.sound.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

var bgMusic = new sound("snd/t3tr15.mp3", true);