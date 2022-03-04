/**
* # Logic type implementation of the game stages
* Copyright(c) 2021 Anca Balietti <anca.balietti@gmail.com>
* MIT Licensed
*
* http://www.nodegame.org
* ---
*/

"use strict";

const ngc = require('nodegame-client');
const J = ngc.JSUS;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    let node = gameRoom.node;
    let channel = gameRoom.channel;
    let memory = node.game.memory;

    // Make the logic independent from players position in the game.
    stager.setDefaultStepRule(ngc.stepRules.SOLO);

    // Must implement the stages here.

    stager.setOnInit(function() {

        memory.stream();

        // Feedback.
        memory.view('feedback').stream({
            format: 'csv',
            header: [ 'time', 'timestamp', 'player', 'feedback' ]
        });

        // Email.
        memory.view('email').stream({
            format: 'csv',
            header: [ 'timestamp', 'player', 'email' ]
        });

        memory.index('district_player', item => {
            if (item.stepId === 'Part_1_q3') return item.player;
        });

        memory.index('income_decile', item => {
            if (item.stepId === 'Part_1_q4') return item.player;
        });

        memory.index('choice_austria', item => {
            if (item.stepId === 'Part2_Info_Choice_Austria') return item.player;
        });

        memory.index('choice_nicaragua', item => {
            if (item.stepId === 'Part2_Info_Choice_Nicaragua') return item.player;
        });

        node.on.data('done', function(msg) {

            let id = msg.from;
            let step = node.game.getStepId(msg.stage);


            // if (step === 'task_1_-_Slider') {
            //     let bonus = msg.data.effort_slider * settings.TASK_1_BONUS;
            //     gameRoom.updateWin(id, bonus);
            // }
            if (step === 'Part_3_Filler_Task') {
                let bonus = msg.data.effort_count * settings.TASK_2_BONUS;
                gameRoom.updateWin(id, bonus);
            }


            else if (step === 'feedback') {

                // Saves bonus file, and notifies player.
                //gameRoom.updateWin(id,settings.WIN);

                let db = memory.player[id];

                // Select all 'done' items and save its time.
                db.save('times.csv', {
                    header: [
                        'session', 'player', 'stage', 'step', 'round',
                        'time', 'timeup'
                    ],
                    append: true
                });

                db.save('survey.csv', {
                    header: 'all',
                    append: true,
                    flatten: true,
                    objectLevel: 3
                });
            }
        });

        node.on.data('end',function(message) {
            let id = message.from;
            gameRoom.computeBonus({
                append: true,
                clients: [ id ],
                amt: true
            });
        });

        node.on('get.districts', function(msg) {
            let state = msg.data;
            return setup.districts[state];
        });

        node.on('get.districtData', function(msg) {

            let district = memory.district_player.get(msg.from);

            console.log(district);
            district = district.forms.district.value;

            return setup.pollutionDb.district.get(district)
        });


        node.on('get.districtData2', function(msg) {
            if (treatmentName === 'info_once_austria' || treatmentName === 'info_twice_austria') {
                let choice = memory.choice_austria.get(msg.from);
                console.log(choice);
                choice = choice.PC_q1_austria.value;

                let district = memory.district_player.get(msg.from);

                console.log(district);
                district = district.forms.district.value;

                return {
                    row: setup.pollutionDb.district.get(district),
                    rChoice: choice
                };
            }
            else if (treatmentName === 'info_once_nicaragua' || treatmentName === 'info_twice_nicaragua') {
                let choice = memory.choice_nicaragua.get(msg.from);
                console.log(choice);
                choice = choice.PC_q1_nicaragua.value;

                let district = memory.district_player.get(msg.from);

                console.log(district);
                district = district.forms.district.value;

                return {
                    row: setup.pollutionDb.district.get(district),
                    rChoice: choice
                };
            }
        });
    });

    stager.setOnGameOver(function() {
        // Something to do.
    });
};
