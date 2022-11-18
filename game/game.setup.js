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
        Male1824: 166, // 197
        Male2534: 204, // 254
        Male3544: 190, // 218
        Male4554: 151, // 163
        Male55: 195, // 198
        Female1824: 165, // 185
        Female2534: 204, // 239
        Female3544: 182, // 206
        Female4554: 153, // 154
        Female55: 186 // 186
    };

    setup.quotas = {};

    setup.determineHash = item => {

        if (!item.q2_2 || item.q2_2.value === "Other" ||
        item.q2_2.value === "Prefer not to say") return;

        var ageGroup;

        if (item.q2_1.value < 25) {
            ageGroup = 1824
        }
        else if (item.q2_1.value > 24 && item.q2_1.value < 35 ) {
            ageGroup = 2534
        }
        else if (item.q2_1.value > 34 && item.q2_1.value < 45 ) {
            ageGroup = 3544
        }
        else if (item.q2_1.value > 44 && item.q2_1.value < 55) {
            ageGroup = 4554
        }
        else if (item.q2_1.value > 54) {
            ageGroup = 55
        }

        // Generate simple hash for gender and ageGroup. (actual value from users need to be adjusted

      let hash = item.q2_2.value + '' + ageGroup;
      console.log(hash);

      return hash;
  };

  setup.increaseQuota = item => {
      console.log('Prompting quota increase..');
      let hash = setup.determineHash(item);
      let limit = setup.quotaLimits[hash];
      //console.log(limit, hash);

      // Increment quota or add first entry.
      setup.quotas[hash] = setup.quotas[hash] ? ++setup.quotas[hash] : 1;

      console.log(setup.quotas[hash]);

      // Check if the quota is met.
      return setup.quotas[hash] > limit;
  };

  // Assumes increaseQuota was called at least once per hash.
  setup.decreaseQuota = item => {
      let hash = setup.determineHash(item);
      setup.quotas[hash] -= 1;
      console.log(setup.quotas[hash]);
  };

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
