function SaveGame() {
    this.playerName = "";
    this.musicIndex = 0;
}

SaveGame.prototype.toJSON = function() {
    return { 
        "playerName": this.playerName, 
        "musicIndex": this.musicIndex 
    };
}

SaveGame.prototype.fromJSON = function(json) {
    this.playerName = json.playerName;
    this.musicIndex = parseInt(json.musicIndex);
    if(isNaN(this.musicIndex)) this.musicIndex = 0;
}

SaveGame.prototype.save = function() {
    document.cookie = JSON.stringify(this.toJSON());
}

SaveGame.prototype.load = function() {
    try {
        a = JSON.parse(document.cookie);
        this.fromJSON(a);
    } catch(e) {
        
    }
}

SaveGame.prototype.setPlayerName = function(name) {
    name = name.trim();
    if(name.length > 16)
        name = name.substring(0, 16);

    this.playerName = name;
    this.save();
    updateUsernameUI();
}

SaveGame.prototype.setMusicIndex = function(idx) {
    //if isNumeric
    if(!isNaN(parseFloat(idx)) && isFinite(idx))
        this.musicIndex = idx;
    else
        this.musicIndex = 0;
    this.save();
}

//DATABASE
function updateRank() {
	$.ajax({
		type:'POST',
		url:'php/getRank.php',
		success:function(data){
			var res = JSON.parse(data);
			updateRankUI(res);
		},
		error: function(xhr,status,error) {
			console.log(xhr,status,error);
		}
	});
}

function showGlobalRank() {
	$.ajax({
		type:'POST',
		url:'php/getGlobalRank.php',
		success:function(data){
			var res = JSON.parse(data);
			showGlobalRankUI(res);
		},
		error: function(xhr,status,error) {
			console.log(xhr,status,error);
		}
	});
}

function addRecord(myData) {
	jQuery.ajax({
		type: "POST", // HTTP method POST or GET
		url: "php/addRecord.php", //Where to make Ajax calls
		data:myData, //Form variables
		success:function(response){
            updateRank();
            console.log(response);
		},
		error:function (xhr, ajaxOptions, thrownError){
			alert(thrownError);
		}
	});
}


//load game info
var saveGame = new SaveGame();
saveGame.load();


