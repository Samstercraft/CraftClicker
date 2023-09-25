if (typeof CCSE === 'undefined') {
    Game.LoadMod('https://klattmose.github.io/CookieClicker/' + (0 ? 'Beta/' : '') + 'CCSE.js');
}

if (typeof CraftClicker === 'undefined') {
    var CraftClicker = {};
}

CraftClicker.name = 'Craft Clicker';
CraftClicker.version = '1.0';
CraftClicker.GameVersion = '2.052';

CraftClicker.launch = function () {
    if (CCSE.ConfirmGameVersion(CraftClicker.name, CraftClicker.version, CraftClicker.GameVersion)) {

        CraftClicker.isLoaded = true;
    }
};

  // define functions

if (!CraftClicker.isLoaded) {
    if (CCSE && CCSE.isLoaded) {
        CraftClicker.launch();
    } else {
        if (!CCSE) var CCSE = {};
        if (!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
        CCSE.postLoadHooks.push(CraftClicker.launch);
    }
}