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