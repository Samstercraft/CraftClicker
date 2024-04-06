if (typeof CCSE === 'undefined') {
    Game.LoadMod('https://klattmose.github.io/CookieClicker/' + (0 ? 'Beta/' : '') + 'CCSE.js');
}

if (typeof CraftClicker === 'undefined') {
    var CraftClicker = {};
}

CraftClicker.name = 'Craft Clicker';
CraftClicker.version = '1.0';
CraftClicker.GameVersion = '2.052';

// define functions

CraftClicker.onBuyTestUpgrade = function(){
    console.log("User bought test upgrade");
}

CraftClicker.getTestUpgradePrice = function(){
    return 1;
}

CraftClicker.hideCursorAndGrandma = function() {
    Game.Objects['Cursor'].l.className = 'product toggledOff';
    Game.Objects['Grandma'].l.className = 'product toggledOff';
}

CraftClicker.removeVanillaContent = function() {
    for(var i in Game.Objects) {
        Game.Objects[i].basePrice = NaN;
    }

    Game.customMenu.push(CraftClicker.hideCursorAndGrandma);
}

CraftClicker.launch = function () {
    if (CCSE.ConfirmGameVersion(CraftClicker.name, CraftClicker.version, CraftClicker.GameVersion)) {
        console.log("Started loading CraftClicker");

        //Change this to false to use github urls
        CraftClicker.HOST_LOCALLY = true;
        CraftClicker.LOCAL_ADDRESS = "http://127.0.0.1:8080";
        CraftClicker.GLOBAL_ADDRESS = ""; // Replace with actual GitHub URL
        
        CraftClicker.relativePath = "";
        if (CraftClicker.HOST_LOCALLY) {
            CraftClicker.relativePath = CraftClicker.LOCAL_ADDRESS;
        } else {
            CraftClicker.relativePath = CraftClicker.GLOBAL_ADDRESS;
        }
        CraftClicker.relativePath += "/assets/images";

        CraftClicker.images = {
            testImg: "testerIcns.png",
        };

        var maxVanillaBuildingID = Game.ObjectsById.length - 1;
        CraftClicker.removeVanillaContent(); // this deleting an object used elsewhere is causing the game to hang

        for(var key in CraftClicker.images) {
            if (CraftClicker.images.hasOwnProperty(key)) {
                CraftClicker.images[key] = CraftClicker.relativePath + "/" + CraftClicker.images[key];
            }
        }

        // CCSE creators building copied

        CCSE.NewBuilding('Tester',
			'tester|testers|extracted|[X]% larger sleep deprivation units|[X]% pain',
			'When can I go home?',
			1,
			2,
			{
				base: CraftClicker.images.testImg,
				customBuildingPic: CraftClicker.images.testImg,
				customIconsPic: CraftClicker.images.testImg,
			},
			"doesn't matter what you put here",
			function(me){
				var mult = 1;
				mult *= Game.GetTieredCpsMult(me);
				mult *= Game.magicCpS(me.name);
				//return me.baseCps * mult;
                return 1;
			},
			function(){
				Game.UnlockTiered(this);
				if(this.amount >= Game.SpecialGrandmaUnlock && Game.Objects['Grandma'].amount > 0) Game.Unlock(this.grandma.name);
			},
		);

        // my stuff again

        Game.Objects['Tester'].bought = 1 //force show building

        var moddedBuildingsCount = Game.ObjectsById.length - 1 - maxVanillaBuildingID;

        /*this is bugged, remove it to remove hang on buy tower & hidden tester name. this doesn't work but has the right idea
        for(var i = 0; i < Game.ObjectsById.length; i++) {
            Game.ObjectsById[i].id += moddedBuildingsCount;
            if(i >= moddedBuildingsCount) { //double check this logic later (and next line too)
                Game.ObjectsById[i].id = i - moddedBuildingsCount;
            }
        }*/

        //for()Game.Objects[i].id 

        //Game.Objects['Grandma'] = null;
        

        CraftClicker.isLoaded = true;
        console.log("Finished loading CraftClicker!");
    }
};

if (!CraftClicker.isLoaded) {
    if (CCSE && CCSE.isLoaded) {
        CraftClicker.launch();
    } else {
        if (!CCSE) var CCSE = {};
        if (!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
        CCSE.postLoadHooks.push(CraftClicker.launch);
    }
}