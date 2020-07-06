// Please use event listeners to run functions.
document.addEventListener('onLoad', function(obj) {
	// obj will be empty for chat widget
	// this will fire only once when the widget loads
});

var m = new Map();
document.addEventListener('onEventReceived', function(obj) {
  	var twitchKey = "q6batx0epp608isickayubi39itsckt";
    var twitchAccept = "application/vnd.twitchtv.v5+json"
    var twitchKraken = 'https://api.twitch.tv/kraken'
    $.ajaxSetup({
      headers: {
        'Accept': twitchAccept,
        'Client-ID': twitchKey
      }
    });
    var badges = obj.detail.payload.tags.badges;
    var type = "none";
    badges.split(',').forEach(function(badge) {
    	  if(badges.startsWith("broadcaster")) {
						type = "broadcast";
				}else if(badges.startsWith("moderator") && (type !== "broadcast")) {
						type = "mod";
				}else if(badges.startsWith("vip") && (type !== "broadcast" && type !== "mod")) {
						type = "vip";
				}else if(badges.startsWith("subscriber") && (type !== "broadcast" && type !== "mod" && type !== "vip")) {
						type = "sub";
				}
    })
  	var mesID = obj.detail.messageId;
		if(type === "broadcast"){
        document.getElementById(mesID + "meta").style = "color: #ff0000";
    }else if(type === "mod"){
        document.getElementById(mesID + "meta").style = "color: #144673";
    }else if(type === "vip"){
        document.getElementById(mesID + "meta").style = "color: #00ffff";
    }else if(type === "sub"){
        document.getElementById(mesID + "meta").style = "color: #00ff00";
    }else{
        document.getElementById(mesID + "meta").style = "color: #6e6e6e";
    }
    if(m.has(obj.detail.from)){
      	var logo = m.get(obj.detail.from);
        var elm = document.getElementById(mesID);
				var img = document.createElement("img");
				img.src = logo;
      	img.width = 32;
        img.height = 32;
        img.style = "position:absolute;left:-32px;";
        elm.appendChild(img);
    }else{
      	$.getJSON(twitchKraken + '/users?login=' + obj.detail.from, function (json) {
          var logo = json.users[0].logo;
          var elm = document.getElementById(mesID);

          m.set(obj.detail.from, logo);

          var img = document.createElement("img");
          img.src = logo;
          img.width = 32;
          img.height = 32;
          img.style = "position:absolute;left:-32px;";
          elm.appendChild(img);
        });
    }
});