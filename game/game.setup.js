/**
 * # Game setup
 * Copyright(c) 2021 Anca Balietti <anca.balietti@gmail.com>
 * MIT Licensed
 *
 * This file includes settings that are shared amongst all client types
 *
 * Setup settings are passed by reference and can be modified globally
 * by any instance executing on the server (but not by remote instances).
 *
 * http://www.nodegame.org
 * ---
 */

 const path = require('path');
 const NDDB = require('NDDB');
 const J = require('JSUS').JSUS;

 module.exports = function (settings, stages, dir, level) {

    let setup = {};

    setup.debug = true;

    // setup.verbosity = 1;

    setup.window = {
        promptOnleave: !setup.debug
    };

    setup.quotaLimits = {
        Male1824: 1, // originally 246 (1 collected in 1st test, 38 in soft launch)
        Male2534: 254, // originally 318 (5 collected in 1st test, 89 collected in soft launch)
        Male3544: 218, // originally 273 (64 collected in soft launch)
        Male4554: 163, // originally 204 (26 collected in soft launch)
        Male55: 198, // originally 248 (6 collected in soft launch)
        Female1824: 185, // originally 231 (3 collected in 1st test, 25 collected in soft launch)
        Female2534: 239, // originally 299 (4 collected in 1st test, 61 collected in soft launch)
        Female3544: 206, // originally 257 (1 collected in 1st test, 49 collected in soft launch)
        Female4554: 154, // originally 192 (4 collected in soft launch)
        Female55: 186 // originally 232 (4 collected in soft launch)
    };

    setup.quotas = {};

    setup.determineHash = item => {

        if (!item.gender || item.gender.value === "Other" ||
        item.gender.value === "Prefer not to say") return;

        var ageGroup;

        if (item.age.value < 25) {
            ageGroup = 1824
        }
        else if (item.age.value > 24 && item.age.value < 35 ) {
            ageGroup = 2534
        }
        else if (item.age.value > 34 && item.age.value < 45 ) {
            ageGroup = 3544
        }
        else if (item.age.value > 44 && item.age.value < 55) {
            ageGroup = 4554
        }
        else if (item.age.value > 54) {
          ageGroup = 55
        }

    setup.getCountyIdx = (state, county) => {
        return state + '_' + county;
    };

    // Create DB.

    let pollutionDb = NDDB.db();

    // COUNTY = DISTRICT in same place of the code.

    // Create a map of state/counties for convenience.
    setup.counties = {};

    pollutionDb.on('insert', item => {
        let d = setup.counties;
        if (!d[item.state]) d[item.state] = [];
        d[item.state].push(item.district);
    });

    // Creates a list of states for convenience.
    setup.states = [];
    pollutionDb.on('insert', item => {
        let s = setup.states;
        if (!J.inArray(item.state, s)) s.push(item.state);
    });

    // Index every district for faster retrieval.
    // pollutionDb.index('district');

    // Index every county for faster retrieval.
    pollutionDb.index('county', item => {
        return setup.getCountyIdx(item.state, item.district);
    });

    pollutionDb.loadSync(path.join(dir, 'private', 'input_data_Kaggle.csv'), {
        lineBreak: '\r\n'
    });
    console.log("Loaded csv file into database");

    // Store db in setup.
    setup.pollutionDb = pollutionDb;

    return setup;
};
