/**
* # Player type implementation of the game stages
* Copyright(c) 2021 Anca <anca.balietti@gmail.com>
* MIT Licensed
*
* Each client type must extend / implement the stages defined in `game.stages`.
* Upon connection each client is assigned a client type and it is automatically
* setup with it.
*
* http://www.nodegame.org
* ---
*/


"use strict";

const ngc = require('nodegame-client');
const J = ngc.JSUS;

//var req = false;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    // Make the player step through the steps without waiting for other players.
    stager.setDefaultStepRule(ngc.stepRules.SOLO);

    stager.setOnInit(function() {

        // Initialize the client.

        var header;

        // Setup page: header + frame.
        header = W.generateHeader();
        W.generateFrame();

        // Add widgets.
        this.visualStage = node.widgets.append('VisualStage', header, {
            next: false
        });

        //this.visualRound = node.widgets.append('VisualRound', header, {
        // displayMode: [
        // 'COUNT_UP_STAGES_TO_TOTAL',
        //'COUNT_UP_STEPS_TO_TOTAL'
        //  ]
        //});

        this.doneButton = node.widgets.append('DoneButton', header, {
            text: 'Next'
        });

        this.discBox = node.widgets.append('DisconnectBox', header, {
            disconnectCb: function() {
                W.init({
                    waitScreen: true
                });
                node.game.pause('Disconnection detected. Please refresh ' +
                'to reconnect.');
                alert('Disconnection detected. Please refresh the page ' +
                'to continue. You might have to use the original link provided on MTurk.');
            },
            connectCb: function() {
                // If the user refresh the page, this is not called, it
                // is a normal (re)connect.
                if (node.game.isPaused()) node.game.resume();
            }
        });

        // No need to show the wait for other players screen in single-player
        // games.
        W.init({ waitScreen: false });

        // Additional debug information while developing the game.
        // this.debugInfo = node.widgets.append('DebugInfo', header)

    });

/////////////////////////////////////////////////////////////////////////////////
    stager.extendStep('consent', {
        donebutton: false,
        widget: 'Consent'
    });

    //////////////////////////////////////////////////////////////////
    stager.extendStep('memory_intro', {
        frame: 'instructions_memory.htm'
    });

    //////////////////////////////////////////////////////////////////
    stager.extendStep('memory_learn', {
        frame: 'memory_learn.htm',
        donebutton: false,
        init: function() {
            this.visualTimer = node.widgets.append('VisualTimer', W.getHeader());
        },
        exit: function() {
            if (node.game.visualTimer) {
                node.game.visualTimer.destroy();
                node.game.visualTimer = null;
            }
        },
    });

    ///Pictures
    ///Positive setup
    // <a href="https://ibb.co/NZh0B2H"><img src="https://i.ibb.co/6ghKC0f/calculator02c.jpg" alt="calculator02c" border="0" /></a>
    // <a href="https://ibb.co/Js3nt8D"><img src="https://i.ibb.co/HHh74R5/candelabra.jpg" alt="candelabra" border="0" /></a>
    // <a href="https://ibb.co/VSNJyVt"><img src="https://i.ibb.co/wWLBHyR/carbattery.jpg" alt="carbattery" border="0" /></a>
    // <a href="https://ibb.co/SBJtJQ1"><img src="https://i.ibb.co/89XrXzR/dice02a.jpg" alt="dice02a" border="0" /></a>
    // <a href="https://ibb.co/h1Lm9pt"><img src="https://i.ibb.co/vvVjq2K/paintbrush03a.jpg" alt="paintbrush03a" border="0" /></a>
    // <a href="https://ibb.co/5Kv6GYQ"><img src="https://i.ibb.co/g4w3mv0/rope02.jpg" alt="rope02" border="0" /></a>
    // <a href="https://ibb.co/TvcHpcM"><img src="https://i.ibb.co/C1BnNBK/sponge02a.jpg" alt="sponge02a" border="0" /></a>
    // <a href="https://ibb.co/86YzD9V"><img src="https://i.ibb.co/NZT16Kz/thumbtack02b.jpg" alt="thumbtack02b" border="0" /></a>

    ///Negative setup
    // <a href="https://ibb.co/FzV0f3z"><img src="https://i.ibb.co/vkYQrqk/boxtruck.jpg" alt="boxtruck" border="0" /></a>
    // <a href="https://ibb.co/QjQVF77"><img src="https://i.ibb.co/G3pDvff/butterfly.jpg" alt="butterfly" border="0" /></a>
    // <a href="https://ibb.co/K54MVf9"><img src="https://i.ibb.co/51pNsS5/envelope02b.jpg" alt="envelope02b" border="0" /></a>
    // <a href="https://ibb.co/PGhMPKc"><img src="https://i.ibb.co/nMcBY97/lighter03b.jpg" alt="lighter03b" border="0" /></a>
    // <a href="https://ibb.co/fkYkhRv"><img src="https://i.ibb.co/y6n6wTS/spatula01.jpg" alt="spatula01" border="0" /></a>
    // <a href="https://ibb.co/V93T77H"><img src="https://i.ibb.co/Pjtg77T/usbcable01b.jpg" alt="usbcable01b" border="0" /></a>
    // <a href="https://ibb.co/CVg22LX"><img src="https://i.ibb.co/xzWHHZc/watermelon02b.jpg" alt="watermelon02b" border="0" /></a>


    stager.extendStep('memory_test1', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory1 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_1',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/V93T77H"><img src="https://i.ibb.co/Pjtg77T/usbcable01b.jpg" alt="usbcable01b" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt1',
                        mainText: '<span style="font-weight: normal;color:gray;">T1</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory1 = 0;
            var q1, q2;
            q1 = node.game.memory1;
            var answer = q1.formsById.mt1.getValues().value
            console.log(answer);

            if (answer === 'No'){
                node.game.bonusMemory1 = 0.02;
            }

            q2 = q1.formsById.mt1;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory1 };
        }
    });

    stager.extendStep('memory_test2', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory2 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_2',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/5Kv6GYQ"><img src="https://i.ibb.co/g4w3mv0/rope02.jpg" alt="rope02" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt2',
                        mainText: '<span style="font-weight: normal;color:gray;">T2</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory2 = 0;
            var q1, q2;
            q1 = node.game.memory2;
            var answer = q1.formsById.mt2.getValues().value
            console.log(answer);

            if (answer === 'Yes'){
                node.game.bonusMemory2 = 0.02;
            }

            q2 = q1.formsById.mt2;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory2 };
        }
    });


    //////////////////////////////////////////////////////////////////

    stager.extendStep('memory_test3', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory3 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_3',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/NZh0B2H"><img src="https://i.ibb.co/6ghKC0f/calculator02c.jpg" alt="calculator02c" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt3',
                        mainText: '<span style="font-weight: normal;color:gray;">T3</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory3 = 0;
            var q1, q2;
            q1 = node.game.memory3;
            var answer = q1.formsById.mt3.getValues().value
            console.log(answer);

            if (answer === 'Yes'){
                node.game.bonusMemory3 = 0.02;
            }

            q2 = q1.formsById.mt3;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory3 };
        }
    });

    stager.extendStep('memory_test4', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory4 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_4',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/K54MVf9"><img src="https://i.ibb.co/51pNsS5/envelope02b.jpg" alt="envelope02b" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt4',
                        mainText: '<span style="font-weight: normal;color:gray;">T4</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory4 = 0;
            var q1, q2;
            q1 = node.game.memory4;
            var answer = q1.formsById.mt4.getValues().value
            console.log(answer);

            if (answer === 'No'){
                node.game.bonusMemory4 = 0.02;
            }

            q2 = q1.formsById.mt4;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory4 };
        }
    });

    stager.extendStep('memory_test5', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory5 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_5',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/SBJtJQ1"><img src="https://i.ibb.co/89XrXzR/dice02a.jpg" alt="dice02a" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt5',
                        mainText: '<span style="font-weight: normal;color:gray;">T5</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory5 = 0;
            var q1, q2;
            q1 = node.game.memory5;
            var answer = q1.formsById.mt5.getValues().value
            console.log(answer);

            if (answer === 'Yes'){
                node.game.bonusMemory5 = 0.02;
            }

            q2 = q1.formsById.mt5;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory5 };
        }
    });

    stager.extendStep('memory_test6', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory6 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_6',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/CVg22LX"><img src="https://i.ibb.co/xzWHHZc/watermelon02b.jpg" alt="watermelon02b" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt6',
                        mainText: '<span style="font-weight: normal;color:gray;">T6</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory6 = 0;
            var q1, q2;
            q1 = node.game.memory6;
            var answer = q1.formsById.mt6.getValues().value
            console.log(answer);

            if (answer === 'No'){
                node.game.bonusMemory6 = 0.02;
            }

            q2 = q1.formsById.mt6;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory6 };
        }
    });

    stager.extendStep('memory_test7', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory7 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_7',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/h1Lm9pt"><img src="https://i.ibb.co/vvVjq2K/paintbrush03a.jpg" alt="paintbrush03a" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt7',
                        mainText: '<span style="font-weight: normal;color:gray;">T7</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory7 = 0;
            var q1, q2;
            q1 = node.game.memory7;
            var answer = q1.formsById.mt7.getValues().value
            console.log(answer);

            if (answer === 'Yes'){
                node.game.bonusMemory7 = 0.02;
            }

            q2 = q1.formsById.mt7;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory7 };
        }
    });

    stager.extendStep('memory_test8', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory8 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_8',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/TvcHpcM"><img src="https://i.ibb.co/C1BnNBK/sponge02a.jpg" alt="sponge02a" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt8',
                        mainText: '<span style="font-weight: normal;color:gray;">T8</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory8 = 0;
            var q1, q2;
            q1 = node.game.memory8;
            var answer = q1.formsById.mt8.getValues().value
            console.log(answer);

            if (answer === 'Yes'){
                node.game.bonusMemory8 = 0.02;
            }

            q2 = q1.formsById.mt8;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory8 };
        }
    });

    stager.extendStep('memory_test9', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory9 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_9',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/PGhMPKc"><img src="https://i.ibb.co/nMcBY97/lighter03b.jpg" alt="lighter03b" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt9',
                        mainText: '<span style="font-weight: normal;color:gray;">T9</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory9 = 0;
            var q1, q2;
            q1 = node.game.memory9;
            var answer = q1.formsById.mt9.getValues().value
            console.log(answer);

            if (answer === 'No'){
                node.game.bonusMemory9 = 0.02;
            }

            q2 = q1.formsById.mt9;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory9 };
        }
    });

    stager.extendStep('memory_test10', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory10 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_10',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/FzV0f3z"><img src="https://i.ibb.co/vkYQrqk/boxtruck.jpg" alt="boxtruck" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt10',
                        mainText: '<span style="font-weight: normal;color:gray;">T10</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory10 = 0;
            var q1, q2;
            q1 = node.game.memory10;
            var answer = q1.formsById.mt10.getValues().value
            console.log(answer);

            if (answer === 'No'){
                node.game.bonusMemory10 = 0.02;
            }

            q2 = q1.formsById.mt10;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory10 };
        }
    });

    stager.extendStep('memory_test11', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory11 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_11',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/Js3nt8D"><img src="https://i.ibb.co/HHh74R5/candelabra.jpg" alt="candelabra" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt11',
                        mainText: '<span style="font-weight: normal;color:gray;">T11</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory11 = 0;
            var q1, q2;
            q1 = node.game.memory11;
            var answer = q1.formsById.mt11.getValues().value
            console.log(answer);

            if (answer === 'Yes'){
                node.game.bonusMemory11 = 0.02;
            }

            q2 = q1.formsById.mt11;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory11 };
        }
    });

    stager.extendStep('memory_test12', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory12 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_12',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/fkYkhRv"><img src="https://i.ibb.co/y6n6wTS/spatula01.jpg" alt="spatula01" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt12',
                        mainText: '<span style="font-weight: normal;color:gray;">T12</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory12 = 0;
            var q1, q2;
            q1 = node.game.memory12;
            var answer = q1.formsById.mt12.getValues().value
            console.log(answer);

            if (answer === 'No'){
                node.game.bonusMemory12 = 0.02;
            }

            q2 = q1.formsById.mt12;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory12 };
        }
    });

    stager.extendStep('memory_test13', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory13 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_13',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/QjQVF77"><img src="https://i.ibb.co/G3pDvff/butterfly.jpg" alt="butterfly" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt13',
                        mainText: '<span style="font-weight: normal;color:gray;">T13</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory13 = 0;
            var q1, q2;
            q1 = node.game.memory13;
            var answer = q1.formsById.mt13.getValues().value
            console.log(answer);

            if (answer === 'No'){
                node.game.bonusMemory13 = 0.02;
            }

            q2 = q1.formsById.mt13;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory13 };
        }
    });

    stager.extendStep('memory_test14', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory14 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_14',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/86YzD9V"><img src="https://i.ibb.co/NZT16Kz/thumbtack02b.jpg" alt="thumbtack02b" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt14',
                        mainText: '<span style="font-weight: normal;color:gray;">T14</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory14 = 0;
            var q1, q2;
            q1 = node.game.memory14;
            var answer = q1.formsById.mt14.getValues().value
            console.log(answer);

            if (answer === 'Yes'){
                node.game.bonusMemory14 = 0.02;
            }

            q2 = q1.formsById.mt14;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory14 };
        }
    });

    stager.extendStep('memory_test15', {
        name: 'Memory Task',
        frame: 'memory.htm',
        cb: function() {
            node.game.memory15 = node.widgets.append('ChoiceManager', "input-div", {
                id: 'memory_test_15',
                // ref: 'controlQuestions',
                mainText: '<div class="aligned"><a href="https://ibb.co/VSNJyVt"><img src="https://i.ibb.co/wWLBHyR/carbattery.jpg" alt="carbattery" border="0" width="500px" /></a></div>',
                simplify: true,
                forms: [
                    {
                        id: 'mt15',
                        mainText: '<span style="font-weight: normal;color:gray;">T15</span> Have you seen this item earlier in the task? (You get $0.02 if you answer correctly.)',
                        choices: ['No', 'Yes'],
                        requiredChoice: true
                    }
                ]
            });
        },
        done: function() {
            node.game.bonusMemory15 = 0;
            var q1, q2;
            q1 = node.game.memory15;
            var answer = q1.formsById.mt15.getValues().value
            console.log(answer);

            if (answer === 'Yes'){
                node.game.bonusMemory15 = 0.02;
            }

            q2 = q1.formsById.mt15;
            if (q2.isHidden()) {
                q2.reset(); // removes error.
                q2.show();
                return false;
            }
            q1.hide();
            return { bonus: node.game.bonusMemory15 };
        }
    });



    //////////////////////////////////////////////////////////////////
    stager.extendStep('Welcome', {
        frame: 'instructions_start.htm'
    });


    //////////////////////////////////////////////////////////////////////////
    // START OF THE SURVEY
    //////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////
    // Page 1. Age and gender
    stager.extendStep('Part_1_q2', {
        name: "Part 1: Survey",
        cb: function() {
            W.cssRule('table.choicetable td { text-align: center !important; ' +
            'font-weight: normal; padding-left: 10px; }');
        },
        // Make a widget step.
        widget: {
            name: 'ChoiceManager',
            id: 'q2',
            options: {
                simplify: true,
                mainText: '',
                forms: [
                    {
                        name: 'CustomInput',
                        id: 'q2_1',
                        mainText: '<span style="font-weight: normal;color:gray;">Q1</span> How old are you?',
                        width: '95%',
                        type: 'int',
                        min: 0,
                        max: 100,
                        requiredChoice: true,
                    },
                    {
                        id: 'q2_2',
                        mainText: '<span style="font-weight: normal;color:gray;">Q2</span> What is your gender?',
                        choices: ['Male', 'Female', 'Other'],
                        requiredChoice: true
                    }
                ]
            }
        }
    });

    //////////////////////////////////////////////////////////////////////////
    // Page 3. LOCATION
    stager.extendStep('Part_1_q3', {
        name: "Part 1: Survey",
        cb: function() {
            W.cssRule('table.choicetable td { text-align: center !important; ' +
            'font-weight: normal; padding-left: 10px; }');
        },
        donebutton: false,
        widget: {
            name: 'ChoiceManager',
            options: {
                forms: [
                    {
                        name: 'Dropdown',
                        id: 'state',
                        mainText: '<span style="font-weight: normal;color:gray;">Q3</span> Select the state in which you currently live.',
                        choices: setup.states,
                        tag: 'select', // 'datalist'
                        placeholder: '--',
                        onchange: function(choice, select, widget) {
                            var w = node.widgets.lastAppended;
                            w = w.formsById.district;
                            w.hide();
                            node.game.doneButton.disable();

                            node.get('districts', function(districts) {
                                w.setChoices(districts, true);
                                w.show();
                                W.adjustFrameHeight();
                            }, 'SERVER', { data: choice });
                        }
                    },
                    {
                        name: 'Dropdown',
                        id: 'district',
                        mainText: '<span style="font-weight: normal;color:gray;">Q4</span> Select the district in which you currently live.',
                        tag: 'select', // 'datalist'
                        // Will be auto-filled later.
                        choices: [ '--' ],
                        hidden: true,
                        placeholder: '--',
                        requiredChoice: true,
                        onchange: function() {
                            node.game.doneButton.enable();
                        }

                    },
                    {
                        id: 'q3_3',
                        // orientation: 'V',
                        mainText: '<span style="font-weight: normal;color:gray;">Q5</span> Do you live in a village or a town/city?',
                        choices: [ 'Village', 'Town/city'],
                        shuffleChoices: true,
                        requiredChoice: true
                    }
                ]
            }
        }
    });

    //////////////////////////////////////////////////////////////////////////
    // Page 4. Nr household members + HH INCOME
    stager.extendStep('Part_1_q4', {
        name: "Part 1: Survey",
        cb: function() {
            W.cssRule('table.choicetable td { text-align: center !important; ' +
            'font-weight: normal; padding-left: 10px; }');
        },
        // Make a widget step.
        widget: {
            name: 'ChoiceManager',
            id: 'q4',
            options: {
                simplify: true,
                mainText: '',
                forms: [
                    {
                        name: 'CustomInput',
                        id: 'q4_1',
                        mainText: '<span style="font-weight: normal;color:gray;">Q6</span> How many people live in your household?<br>',
                        hint: '(Think about everyone that lives at least eight months per year in your house. Answer should include yourself in the count.)',
                        width: '95%',
                        type: 'int',
                        requiredChoice: true,
                        min: 1
                    },
                    {
                        id: 'q4_2',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q7</span> What is the highest educational level that you have completed?',
                        choices: ['No formal education','Primary school','Secondary school','Vocational training','Bachelor degree','Masters degree or higher'],
                        shuffleChoices: false,
                        requiredChoice: true
                    },
                    { // THIS NEEDS TO BE MADE CONDITIONAL ON DISTRICT
                        id: 'q4_3',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q8</span> In 2021, what was the total annual income of your household?<br>' +
                        '<span style="font-weight: normal;"> Please refer to the total income of ALL members living in your household in 2021, ' +
                        'before any taxes or deductions. This includes:<br> '+
                        '- wages and salaries from all jobs <br>' +
                        '- the revenue from self-employment <br>' +
                        '- all income from casual labour.</span>',
                        choices: ['Less than 2,00,000 INR',
                                  '2,00,000 INR – 5,00,000 INR',
                                  '5,00,000 INR – 10,00,000 INR',
                                  '10,00,000 INR – 20,00,000 INR',
                                  '20,00,000 INR or more'],
                        shuffleChoices: false,
                        requiredChoice: true,
                        choicesSetSize: 2
                    }
                ]
            }
        }
    });


    // //////////////////////////////////////////////////////////////////////////
    // // Part1. WORK and Commute
    // stager.extendStep('Part_1_q5', {
    //     name: "Part 1: Survey",
    //     cb: function() {
    //         W.cssRule('table.choicetable td { text-align: left !important; ' +
    //         'font-weight: normal; padding-left: 10px; }');
    //     },
    //     widget: {
    //         name: 'ChoiceManager',
    //         id: 'q5',
    //         options: {
    //             simplify: true,
    //             mainText: '',
    //             forms: [
    //                 {
    //                     name: 'ChoiceTable',
    //                     id: 'q5_1',
    //                     orientation: 'H',
    //                     mainText: '<span style="font-weight: normal;color:gray;">Q12</span> Are you currently employed?',
    //                     choices: [ 'No','Yes'],
    //                     shuffleChoices: false,
    //                     requiredChoice: true,
    //                     onclick: function(value, removed) {
    //                         var w1, w2, forms, len;
    //                         forms = node.widgets.lastAppended.formsById
    //                         len = forms.q5_1.choices.length - 1;
    //                         w1 = forms.q5_2;
    //                         w2 = forms.q5_4;
    //                         if (this.isChoiceCurrent(len)) {
    //                             w1.show();
    //                             w2.show({ scroll: false });
    //                         }
    //                         else {
    //                             w1.hide();
    //                             w2.hide();
    //                         }
    //                         W.adjustFrameHeight();
    //                     }
    //                 },
    //                 {
    //                     name: 'ChoiceTable',
    //                     id: 'q5_2',
    //                     orientation: 'H',
    //                     choicesSetSize: 2,
    //                     mainText: '<span style="font-weight: normal;color:gray;">Q13</span> In which sector do you work?',
    //                     choices: ['Mining',
    //                     'Manufacturing',
    //                     'Electricty/water/gas/waste',
    //                     'Construction',
    //                     'Transportation',
    //                     'Buying and selling',
    //                     'Financial/insurance/real estate services',
    //                     'Personal services',
    //                     'IT',
    //                     'Education',
    //                     'Health',
    //                     'Public administration',
    //                     'Professional/scientific/technical activities',
    //                     'Other'],
    //                     shuffleChoices: false,
    //                     hidden: true,
    //                     requiredChoice: true,
    //                     onclick: function(value, removed) {
    //                         var w, forms, len;
    //                         forms = node.widgets.lastAppended.formsById
    //                         len = forms.q5_2.choices.length - 1;
    //                         w = forms.q5_3;
    //                         if (this.isChoiceCurrent(len)) w.show();
    //                         else w.hide();
    //                     }
    //                 },
    //                 {
    //                     name: 'CustomInput',
    //                     id: 'q5_3',
    //                     mainText: '<span style="font-weight: normal;color:gray;">Q13b</span> Please specify.',
    //                     width: '100%',
    //                     hidden: true,
    //                     requiredChoice: true,
    //                 },
    //                 {
    //                     name: 'ChoiceTable',
    //                     id: 'q5_4',
    //                     orientation: 'V',
    //                     mainText: '<span style="font-weight: normal;color:gray;">Q14</span> During a typical day, how long does it take you to go from home to work?<br>',
    //                     hint: '(Think about the number of minutes you need for a one-way commute.)',
    //                     choices: ['I work at home',
    //                     'Less than 10 minutes',
    //                     '10-30 minutes',
    //                     '30-60 minutes',
    //                     'More than 60 minutes'],
    //                     shuffleChoices: false,
    //                     hidden: true,
    //                     requiredChoice: true
    //                 }
    //             ]
    //         }
    //     }
    // });
    //
    // //////////////////////////////////////////////////////////////////////////
    // // Part 1. HOME environment
    // stager.extendStep('Part_1_q6', {
    //     name: "Part 1: Survey",
    //     cb: function() {
    //         W.cssRule('table.choicetable td { text-align: left !important; ' +
    //         'font-weight: normal; padding-left: 10px; }');
    //     },
    //     // Make a widget step.
    //     widget: {
    //         name: 'ChoiceManager',
    //         id: 'q6',
    //         options: {
    //             simplify: true,
    //             mainText: '',
    //             forms: [
    //                 {
    //                     name: 'ChoiceTable',
    //                     id: 'q6_1',
    //                     orientation: 'H',
    //                     mainText: '<span style="font-weight: normal;color:gray;">Q15</span> What do you use as lighting fuel at home?<br>',
    //                     choices: [ 'Kerosene','Electricity','Gas','Solar lamp','Other'],
    //                     hint: '(Select <em><strong>all</strong></em> that apply.)',
    //                     shuffleChoices: false,
    //                     selectMultiple: 4,
    //                     requiredChoice: true,
    //                     onclick: function(value, removed) {
    //                         var w1, forms, len;
    //                         forms = node.widgets.lastAppended.formsById
    //                         len = forms.q6_1.choices.length - 1;
    //                         w1 = forms.q6_2;
    //                         if (this.isChoiceCurrent(len)) {
    //                             w1.show();
    //                         }
    //                         else {
    //                             w1.hide();
    //                         }
    //                         W.adjustFrameHeight();
    //                     }
    //                 },
    //                 {
    //                     name: 'CustomInput',
    //                     id: 'q6_2',
    //                     mainText: '<span style="font-weight: normal;color:gray;">Q15b</span> Which other?',
    //                     width: '100%',
    //                     hidden: true,
    //                     requiredChoice: true,
    //                 },
    //                 {
    //                     name: 'ChoiceTable',
    //                     id: 'q6_3',
    //                     orientation: 'H',
    //                     mainText: '<span style="font-weight: normal;color:gray;">Q16</span> What do you use for cooking fuel at home?<br>',
    //                     choices: ['Dung cakes','Wood','Coal','Kerosene','Gas','Electric stove','Other'],
    //                     hint: '(Select <em><strong>all</strong></em> that apply.)',
    //                     selectMultiple: 7,
    //                     shuffleChoices: false,
    //                     requiredChoice: true,
    //                     onclick: function(value, removed) {
    //                         var w1, forms, len;
    //                         forms = node.widgets.lastAppended.formsById
    //                         len = forms.q6_3.choices.length - 1;
    //                         w1 = forms.q6_4;
    //                         if (this.isChoiceCurrent(len)) {
    //                             w1.show();
    //                         }
    //                         else {
    //                             w1.hide();
    //                         }
    //                         W.adjustFrameHeight();
    //                     }
    //                 },
    //                 {
    //                     name: 'CustomInput',
    //                     id: 'q6_4',
    //                     mainText: '<span style="font-weight: normal;color:gray;">Q16b</span> Which other?',
    //                     width: '100%',
    //                     hidden: true,
    //                     requiredChoice: true,
    //                 },
    //                 {
    //                     name: 'ChoiceTable',
    //                     id: 'q6_5',
    //                     orientation: 'V',
    //                     mainText: '<span style="font-weight: normal;color:gray;">Q17</span> In your home, in which room is food prepared usually?',
    //                     choices: ['Cooking is done in the main living area.','Cooking is done in a separate kitchen.'],
    //                     shuffleChoices: true,
    //                     requiredChoice: true,
    //                 }
    //             ]
    //         }
    //     }
    // });


    //////////////////////////////////////////////////////////////////////////
    // Part 1. Protection against pollution: HOME
    stager.extendStep('Part_1_q7', {
        name: "Part 1: Survey",
        cb: function() {
            W.cssRule('table.choicetable td { text-align: center !important; ' +
            'font-weight: normal; padding-left: 10px; }');
        },
        // Make a widget step.
        widget: {
            name: 'ChoiceManager',
            id: 'q7',
            options: {
                simplify: true,
                forms: [
                    {
                        id: 'q7_1',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q9</span> Do you own an air conditioner (AC) at home?',
                        choices: ['No','Yes'],
                        shuffleChoices: false,
                        requiredChoice: true,
                        hidden: false,
                    },
                    {
                        id: 'q7_2',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q10</span> Do you own an air purifier or particle filter at home?',
                        choices: ['No','Yes'],
                        shuffleChoices: false,
                        requiredChoice: true,
                        hidden: false,
                        onclick: function(value, removed) {
                            var w1, w2, forms, len;
                            forms = node.widgets.lastAppended.formsById
                            len = forms.q7_2.choices.length - 1;
                            w1 = forms.q7_3;
                            if (this.isChoiceCurrent(len)) {
                                w1.show();
                            }
                            else {
                                w1.hide();
                            }
                            W.adjustFrameHeight();
                        }
                    },
                    {
                        name: 'CustomInput',
                        id: 'q7_3',
                        orientation: 'V',
                        mainText: '<span style="font-weight: normal;color:gray;">Q10b</span> Which year did you purchase your air purifier',
                        width: '95%',
                        hidden: true,
                        type:'int',
                        min: 1900,
                        max: 2021,
                        requiredChoice: true,
                    },
                    {
                        id: 'q7_4',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q11</span> How many people in your circle of family and friends own an air purifier?',
                        choices: ['Nobody','Very few','Less than half','Most of them','Everyone',"I don't know"],
                        shuffleChoices: false,
                        requiredChoice: true,
                        hidden: false,
                    },
                    {
                        id: 'q7_5',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q12</span> When you are home, do you do something to reduce your own exposure to air pollution?',
                        choices:['No','Yes'],
                        shuffleChoices: false,
                        requiredChoice: true,
                        onclick: function(value, removed) {
                            var w1, forms, len;
                            forms = node.widgets.lastAppended.formsById
                            len = forms.q7_5.choices.length - 1;
                            w1 = forms.q7_6;
                            if (this.isChoiceCurrent(len)) {
                                w1.show();
                            }
                            else {
                                w1.hide();
                            }
                            W.adjustFrameHeight();
                        }
                    },
                    {
                        name: 'CustomInput',
                        id: 'q7_6',
                        orientation: 'V',
                        mainText: '<span style="font-weight: normal;color:gray;">Q13</span> What do you do to reduce air pollution in your home?',
                        width: '95%',
                        hidden: true,
                        requiredChoice: true,
                    }
                ]
            }
        }
    });

    //////////////////////////////////////////////////////////////////////////
    // PAST ILLNESSES
    stager.extendStep('Part_1_q8', {
        name: "Part 1: Survey",
        cb: function() {
            W.cssRule('table.choicetable td { text-align: left !important; ' +
            'font-weight: normal; padding-left: 10px; }');
        },
        // Make a widget step.
        widget: {
            name: 'ChoiceManager',
            id: 'q8',
            options: {
                simplify: true,
                mainText: '',
                forms: [
                    {
                        name: 'ChoiceTable',
                        id: 'q8_1',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q14</span> How often do you do physical exercise?<br>',
                        hint:'(Think of when you play sports, go jogging, go to the gym, practice yoga/pilates at home etc.)',
                        choices: [ 'Never','Very rarely','Once a month','Every week','Several times per week'],
                        shuffleChoices: false,
                        requiredChoice: true
                    },
                    {
                        name: 'ChoiceTable',
                        id: 'q8_2',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q15</span> Do you smoke tobacco (cigarettes, hookah, bidi, etc.)?',
                        choices: [ 'Yes','No'],
                        shuffleChoices: false,
                        requiredChoice: true
                    },
                    {
                        name: 'ChoiceTable',
                        id: 'q8_3',
                        orientation: 'V',
                        mainText: '<span style="font-weight: normal;color:gray;">Q16</span> In the past 5 years, did YOU have any of the following health conditions?<br>',
                        hint: '(Select <strong><em>all</strong></em> that apply.)',
                        choices: ["Allergies",'High blood pressure','Heart disease','Lung disease','Diabetes','None','Prefer not to say'],
                        shuffleChoices: false,
                        requiredChoice: true,
                        selectMultiple: true
                    }
                ]
            }
        }
    });



    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    // PART II
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    // Instructions Part II
    stager.extendStep('Instructions_Part_2', {
        name: 'Part 2: Instructions',
        frame: 'instructions_part2.htm'
    });


    //////////////////////////////////////////////////////////////////////////
    // LEAFLET P1
    stager.extendStep('Part2_Air_pollution_and_its_sources', {
        name: 'Part 2: Reading and comprehension',
        frame: 'leaflet_p1.htm',
        // Make a widget step.
        widget: {
            name: 'ChoiceManager',
            id: 'P1_q',
            options: {
                simplify: true,
                mainText: 'Based on the information provided in the box above, find the correct answer to the questions below.<br>' +
                '<span style="color:gray;font-size:14px;">(All your answers need to be correct in order to be able to proceed to the next page.) </span>',
                forms: [
                    {
                        id: 'P1_q1',
                        orientation: 'V',
                        mainText: '<span style="font-weight: normal;color:gray;">Q1</span> Which of the following statements is correct?',
                        choices: ['Air pollution is mostly generated outdoors, but not indoors.',
                        'Air pollution can be generated both indoors and outdoors.',
                        'Air pollution is mostly generated indoors, but not outdoors.'],
                        correctChoice: 1,
                    },
                    {
                        id: 'P1_q2',
                        orientation: 'V',
                        mainText: '<span style="font-weight: normal;color:gray;">Q2</span> Which of the following statements is correct?',
                        choices: ['In India, only industries cause air pollution.',
                        'In India, air pollution is generated by many sources and everyone is responsible to different degrees for the air pollution problem.'],
                        correctChoice: 1,
                    }
                ]
            }
        }
    });

    //////////////////////////////////////////////////////////////////////////
    // LEAFLET P2
    stager.extendStep('Part2_Pollution_and_life_expectancy', {
        name: 'Part 2: Reading and comprehension',
        frame: 'leaflet_p4.htm',
        widget: {
            name: 'ChoiceManager',
            id: 'P2_q',
            options: {
                simplify: true,
                mainText: 'Based on the information provided in the box above, find the correct answer to the questions below.<br>' +
                '<span style="color:gray;font-size:14px;">(All your answers need to be correct in order to be able to proceed to the next page.) </span>',
                forms: [
                    {
                        id: 'P2_q1',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q6</span> How many years of life do we lose on average by being exposed for a long time to air pollution that is 10 &mu;/m<sup>3</sup> higher than the WHO recommended level?<br>',
                        choices: ["0 years", "0.25 years", "0.5 years", "1 year", "2 years"],
                        correctChoice: 3,
                    },
                    {
                        id: 'P2_q2',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q7</span> How many years of life do we lose on average by being exposed for a long time to air pollution that is 30 &mu;/m<sup>3</sup> higher than the WHO recommended level?<br>',
                        choices: ["0 years", "1 year", "2 years", "3 years", "5 years"],
                        correctChoice: 3,
                    }
                ]
            }
        }
    });

////////////////////////////////////////////////////////////////////////////////
// PRIOR LYL
    stager.extendStep('Part2_Prior_LYL_Austria', {
        name: 'Part 2',
        frame: 'prior_LYL.htm',
        donebutton: false,
        cb: function() {
            node.get('districtData', function(data) {

            node.game.Q_impact = node.widgets.append('ChoiceManager', "T_impact", {
                    id: 'T_impact_q',
                    simplify: true,
                    panel: false,
                    forms: [
                        {
                            id: 'T_impact_more_or_less',
                            orientation: 'H',
                            mainText: '<span style="font-weight: normal;color:gray;">Q1</span> ' +
                                      'Think about all people living in your home district: ' + data.district + '.<br><br>' +
                                      'In your opinion, how many years of life do people living in ' +
                                       data.district + ' lose on average because of air pollution?',
                                       choices: ['0','1','2','3','4','5','6','7','8','9','10','11','12'],
                                       requiredChoice: true,
                                       shuffleChoices: false,
                        },
                    ]
                });

                W.show('data', 'flex');
                node.game.doneButton.enable();
            });
        },
        done: function() {
            var w, q1, q2, q3, q4;

            w = node.game.Q_impact;

            // DISPLAY 1
            q1 = w.formsById.T_impact_more_or_less;
            if (q1.isHidden()) {
                q1.reset(); // removes error.
                q1.show();
                return false;
            }

            // DISPLAY 2
            q2 = w.formsById.T_confident;
            if (!q2) {
                node.widgets.last.addForm({
                    id: 'T_confident',
                    orientation: 'H',
                    mainText: '<span style="font-weight: normal;color:gray;">Q2</span> How confident are you about your answer to the previous question?</span>',
                    choices: [
                      ['1', 'Not confident at all'],
                      ['2', 'Not very confident'],
                      ['3', 'Neutral'],
                      ['4', 'Quite confident'],
                      ['5', 'Completely confident']
                    ],
                    shuffleChoices: false,
                    requiredChoice: true,
                });
                return false;
            }

            // DISPLAY 3
            q3 = w.formsById.T_impact_more_or_less_you_Austria;
            if (!q3) {
                if (q3) q3.disable();
                node.widgets.last.addForm({
                    id: 'T_impact_more_or_less_you_Austria',
                    orientation: 'H',
                    mainText: '<span style="font-weight: normal;color:gray;">Q3</span> Now, think about all people living in Austria, a country in central Europe.<br><br>' +
                              'In your opinion, how many years of life do people living in ' +
                               'Austria lose on average because of air pollution?',
                    choices: ['0','1','2','3','4','5','6','7','8','9','10','11','12'],
                    requiredChoice: true,
                    shuffleChoices: false,
                });

                return false;
            }

            // DISPLAY 4 -- How confident?
            q4 = w.formsById.T_confident_Austria;
            if (!q4) {
                node.widgets.last.addForm({
                    id: 'T_confident_Austria',
                    orientation: 'H',
                    mainText: '<span style="font-weight: normal;color:gray;">Q4</span> How confident are you about your answer to the previous question?</span>',
                    choices: [
                      ['1', 'Not confident at all'],
                      ['2', 'Not very confident'],
                      ['3', 'Neutral'],
                      ['4', 'Quite confident'],
                      ['5', 'Completely confident']
                    ],
                    shuffleChoices: false,
                    requiredChoice: true,
                });
                return false;
            }
            return w.getValues();
        }
    });

    ////////////////////////////////////////////////////////////////////////////////
    // PRIOR LYL
        stager.extendStep('Part2_Prior_LYL_Nicaragua', {
            name: 'Part 2',
            frame: 'prior_LYL.htm',
            donebutton: false,
            cb: function() {
                node.get('districtData', function(data) {

                node.game.Q_impact = node.widgets.append('ChoiceManager', "T_impact", {
                        id: 'T_impact_q',
                        simplify: true,
                        panel: false,
                        forms: [
                            {
                                id: 'T_impact_more_or_less',
                                orientation: 'H',
                                mainText: '<span style="font-weight: normal;color:gray;">Q1</span> ' +
                                          'Think about all people living in your home district: ' + data.district + '.<br><br>' +
                                          'In your opinion, how many years of life do people living in ' +
                                           data.district + ' lose on average because of air pollution?',
                                           choices: ['0','1','2','3','4','5','6','7','8','9','10','11','12'],
                                           requiredChoice: true,
                                           shuffleChoices: false,
                            },
                        ]
                    });

                    W.show('data', 'flex');
                    node.game.doneButton.enable();
                });
            },
            done: function() {
                var w, q1, q2, q3, q4;

                w = node.game.Q_impact;

                // DISPLAY 1
                q1 = w.formsById.T_impact_more_or_less;
                if (q1.isHidden()) {
                    q1.reset(); // removes error.
                    q1.show();
                    return false;
                }

                // DISPLAY 2
                q2 = w.formsById.T_confident;
                if (!q2) {
                    node.widgets.last.addForm({
                        id: 'T_confident',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q2</span> How confident are you about your answer to the previous question?</span>',
                        choices: [
                          ['1', 'Not confident at all'],
                          ['2', 'Not very confident'],
                          ['3', 'Neutral'],
                          ['4', 'Quite confident'],
                          ['5', 'Completely confident']
                        ],
                        shuffleChoices: false,
                        requiredChoice: true,
                    });
                    return false;
                }

                // DISPLAY 3
                q3 = w.formsById.T_impact_more_or_less_you_Nicaragua;
                if (!q3) {
                    if (q3) q3.disable();
                    node.widgets.last.addForm({
                        id: 'T_impact_more_or_less_you_Nicaragua',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q3</span> Now, think about all people living in Nicaragua, a country in central America.<br><br>' +
                                  'In your opinion, how many years of life do people living in ' +
                                   'Nicaragua lose on average because of air pollution?',
                        choices: ['0','1','2','3','4','5','6','7','8','9','10','11','12'],
                        requiredChoice: true,
                        shuffleChoices: false,
                    });

                    return false;
                }

                // DISPLAY 4 -- How confident?
                q4 = w.formsById.T_confident_Nicaragua;
                if (!q4) {
                    node.widgets.last.addForm({
                        id: 'T_confident_Nicaragua',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q4</span> How confident are you about your answer to the previous question?</span>',
                        choices: [
                          ['1', 'Not confident at all'],
                          ['2', 'Not very confident'],
                          ['3', 'Neutral'],
                          ['4', 'Quite confident'],
                          ['5', 'Completely confident']
                        ],
                        shuffleChoices: false,
                        requiredChoice: true,
                    });
                    return false;
                }
                return w.getValues();
            }
        });

    //////////////////////////////////////////////////////////////////////////
    // LEAFLET P3
    stager.extendStep('Part2_Air_pollution_damages_your_health', {
        name: 'Part 2: Reading and comprehension',
        frame: 'leaflet_p3.htm',
        widget: {
            name: 'ChoiceManager',
            id: 'P3_q',
            options: {
                simplify: true,
                mainText: 'Based on the information provided in the box above, find the correct answer to the questions below.<br>' +
                '<span style="color:gray;font-size:14px;">(All your answers need to be correct in order to be able to proceed to the next page.) </span>',
                forms: [
                    {
                        id: 'P3_q1',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q5</span> Which of the following health conditions are caused by exposure to air pollution?<br>',
                        hint: '<span style="color:gray;font-size:14px;">(There are several correct answers and you have to find all of them.)</span>',
                        // Number of choices per row/column.
                        choicesSetSize: 6,
                        choices: ["HIV/AIDS", "Hepatitis",
                        "Lung cancer", "Heart disease", "Respiratory infections"],
                        selectMultiple: true,
                        correctChoice: [2,3,4],
                    }
                ]
            }
        }
    });

    //////////////////////////////////////////////////////////////////////////
    // LEAFLET Protection measures ALL
    stager.extendStep('Part2_Protection_measures', {
        name: 'Part 2: Reading and comprehension',
        frame: 'leaflet_protection.htm',
        widget: {
            name: 'ChoiceManager',
            id: 'P4_q',
            options: {
                simplify: true,
                mainText: 'Based on the information provided in the box above, find the correct answer to the questions below.<br>' +
                '<span style="color:gray;font-size:14px;">(All your answers need to be correct in order to be able to proceed to the next page.) </span>',
                forms: [
                    {
                        id: 'P4_q1',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q5</span> Which of the following measures help with protecting your health from air pollution?<br>',
                        hint: '<span style="color:gray;font-size:14px;">(There are several correct answers and you have to find all of them.)</span>',
                        // Number of choices per row/column.
                        choicesSetSize: 5,
                        choices: ["Ventilating the kitchen", "Using clean cooking and heating fuels",
                        "Wearing a face mask while outdoors", "Drinking cold water"],
                        selectMultiple: true,
                        correctChoice: [0,1,2],
                    }
                ]
            }
        }
    });

    //////////////////////////////////////////////////////////////////////////
    // LEAFLET Protection measures Treatment
    stager.extendStep('Part2_Protection_measures_T', {
        name: 'Part 2: Reading and comprehension',
        frame: 'leaflet_protection_T.htm',
        widget: {
            name: 'ChoiceManager',
            id: 'P4_T_q',
            options: {
                simplify: true,
                mainText: 'This time, think about <b>yourself</b> and <b>your opinion</b> on how to protect yourself against air pollution.<br>',
                forms: [
                    {
                        id: 'P4_T_q1',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q5</span> In your opinion, which 3 measures from the leaflet above are the MOST EFFECTIVE to protect yourself against air pollution?<br>',
                        hint: '<span style="color:gray;font-size:14px;">(Select 3 measures.)</span>',
                        // Number of choices per row/column.
                        choicesSetSize: 4,
                        choices: [
                          ['1', '<div class="aligned"><img src="face_mask.png" width="140px"><span>'],
                          ['2', '<div class="aligned"><img src="no_exercise.png" width="140px"><span>'],
                          ['3', '<div class="aligned"><img src="no_congested.png" width="140px"><span>'],
                          ['4', '<div class="aligned"><img src="nature.png" width="120px"><span>'],
                          ['5', '<div class="aligned"><img src="no_dust.png" width="140px"><span>'],
                          ['6', '<div class="aligned"><img src="AP.png" width="140px"><span>'],
                          ['7', '<div class="aligned"><img src="clean_fuels.png" width="120px"><span>'],
                          ['8', '<div class="aligned"><img src="ventilate.png" width="140px"><span>']],
                        selectMultiple: 3,
                        shuffleChoices: false,
                        requiredChoice: 3,
                    },
                    {
                        id: 'P4_T_q2',
                        orientation: 'H',
                        mainText: '<span style="font-weight: normal;color:gray;">Q5</span> Which protective measure(s) from the leaflet above are the MOST CONVENIENT for you to implement?<br>',
                        hint: '<span style="color:gray;font-size:14px;">(Select at least 1.)</span>',
                        // Number of choices per row/column.
                        choicesSetSize: 4,
                        choices: [
                          ['1', '<div class="aligned"><img src="face_mask.png" width="140px"><span>'],
                          ['2', '<div class="aligned"><img src="no_exercise.png" width="140px"><span>'],
                          ['3', '<div class="aligned"><img src="no_congested.png" width="140px"><span>'],
                          ['4', '<div class="aligned"><img src="nature.png" width="120px"><span>'],
                          ['5', '<div class="aligned"><img src="no_dust.png" width="140px"><span>'],
                          ['6', '<div class="aligned"><img src="AP.png" width="140px"><span>'],
                          ['7', '<div class="aligned"><img src="clean_fuels.png" width="120px"><span>'],
                          ['8', '<div class="aligned"><img src="ventilate.png" width="140px"><span>']],
                        // choices: ["Wear a face mask", "Avoid exercising outdoors in congested areas",
                        // "Check the air quality and avoid congested areas", "Spend time in nature",
                        // "Remove dust often", "Use an air purifier", "Use clean cooking and heating fuels", "Ventilate well the kitchen"],
                        selectMultiple: true,
                        shuffleChoices: false
                    },
                    {
                        id: 'P4_T_q3',
                        orientation: 'V',
                        mainText: '<div class="aligned"><img src="Leaflet_images/exclamation-mark.png" width="40px"><span> Read again the leaflet above and try to memorize it.' +
                        ' You will be asked to summarize it on the next page.<br><br>' +
                        'What task will you be required to do on the next page?',
                        choices: [
                          ['1', 'Summarize the leaflet.'],
                          ['2', 'Do a task unrelated to the leaflet.']],
                        correctChoice: 0,
                    }
                ]
            },
        },
    });

    //////////////////////////////////////////////////////////////////////////
    // LEAFLET Protection measures Treatment
    stager.extendStep('Part2_Protection_measures_T2', {
        name: 'Part 2: Reading and comprehension',
        // frame: 'leaflet_protection_T.htm',
        widget: {
            name: 'ChoiceManager',
            id: 'P4_T2_q',
            options: {
                simplify: true,
                mainText: '',
                forms: [
                    {
                        name: 'Feedback',
                        id: 'P4_T_q4',
                        mainText: '<span style="font-weight: normal;color:gray;">Q7</span> Please summarize the information you have read on the previous page.',
                        requiredChoice: true,
                        showSubmit: false,
                        minChars: 50,
                        // width: '95%',
                        // min: 50,
                    },
                    {
                        id: 'P4_T_q5',
                        orientation: 'H',
                        //<a href="https://imgbb.com/"><img src="https://i.ibb.co/88yMk2s/exclamation-mark.png" alt="exclamation-mark" border="0" width="40px"></a>
                        //https://ibb.co/JpH4WYF
                        mainText: '<img src="https://i.ibb.co/3Fcq5xY/remember.png" alt="remember" border="0" width="100px"><div class="aligned"> Try to remember these protection measures and apply them whenever you can! They can help protect your health against air pollution!</div><br><br>' +
                        '<span style="font-weight: normal;color:gray;">Q8</span> How likely do you think you are to remember these protection measures?',
                        choices: ["Very likely", "Likely",
                        "Neutral", "Not very likely", "Very unlikely"],
                        shuffleChoices: false,
                        requiredChoice: true
                    }
                ]
            },
        },
    });


    //////////////////////////////////////////////////////////////////////////
    // Region of CHOICE (Austria)
    stager.extendStep('Part2_Info_Choice_Austria', {
        name: 'Part 2: Reading and comprehension',
        frame: 'choice_region.htm',
        donebutton: false,
        cb: function() {
            node.get('districtData', function(data) {

                //console.log(data);
                W.setInnerHTML('state', data.state);
                W.setInnerHTML('district', data.district);

                node.game.RegionC = node.widgets.append('ChoiceManager', "RegionOfChoice", {
                    id: 'PC_q',
                    // ref: 'controlQuestions',
                    mainText: '<img src="choice.png" width="100px"> <span style="font-weight: bold;font-size:24px;color:#5c30af;">What do you want to read about next?</span><br/><br/>' +
                    'On the next page, you will receive an information leaflet on <b>air pollution levels</b> and its <b>measured impact ' +
                    'on health</b> in a specific region. <br> <br>' +
                    'You have now the opportunity to <b><span style="font-size:25px;color:#ee6933;">choose the region</span></b> that will be presented on the next page. ' +
                    '<br> <br><img src="dices.png" width="40px"> However, your selection will only be implemented with a <b>60% probability</b>.<br> With a 40 % probability, we will show you information on the other option.<br> <br>',
                    simplify: true,
                    forms: [
                      {
                          id: 'PC_q1_austria',
                          orientation: 'V',
                          mainText: '<span style="font-weight: normal;color:gray;font-size:30px;">Q5</span> <span style="font-size:30px;">Which region would you like to read information on air pollution and health impacts about?</span>',
                         // hint: '<span style="color:gray;font-size:14px;">(Attention: Your choice will be implemented with a 60% probability.)</span>',
                          choices: [
                            ['home', data.district  + ' (' + data.state + ')'],
                            ['decoy', "Austria (a country in central Europe)"]
                            // ['home', "<span style="font-size:25px;color:#ee6933;">" + data.district + '</span>' + ' (' + data.state + ')'],
                            // ['decoy', "<span style="font-size:25px;color:#ee6933;">Austria</span> (a country in central Europe)"]
                          ],
                          requiredChoice: true,
                          shuffleChoices: true
                      }
                    ]
                });

                W.show('data', 'flex');
                node.game.doneButton.enable();
            });
        },
        done: function() {
            return node.game.RegionC.getValues();
        }
    });

    //////////////////////////////////////////////////////////////////////////
    // Region of CHOICE (Nicaragua)
    stager.extendStep('Part2_Info_Choice_Nicaragua', {
        name: 'Part 2: Reading and comprehension',
        frame: 'choice_region.htm',
        donebutton: false,
        cb: function() {
            node.get('districtData', function(data) {

                //console.log(data);
                W.setInnerHTML('state', data.state);
                W.setInnerHTML('district', data.district);

                node.game.RegionC = node.widgets.append('ChoiceManager', "RegionOfChoice", {
                    id: 'PC_q',
                    // ref: 'controlQuestions',
                    mainText: '<img src="choice.png" width="100px"> <span style="font-weight: bold;font-size:24px;color:#5c30af;">What do you want to read about next?</span><br/><br/>' +
                    'On the next page, you will receive an information leaflet on <b>air pollution levels</b> and its <b>measured impact ' +
                    'on health</b> in a specific region. <br> <br>' +
                    'You have now the opportunity to <b><span style="font-size:25px;color:#ee6933;">choose the region</span></b> that will be presented on the next page. ' +
                    '<br> <br><img src="dices.png" width="40px"> However, your selection will only be implemented with a <b>60% probability</b>.<br> With a 40 % probability, we will show you information on the other option.<br> <br>',
                    simplify: true,
                    forms: [
                      {
                          id: 'PC_q1_nicaragua',
                          orientation: 'V',
                          mainText: '<span style="font-weight: normal;color:gray;font-size:30px;">Q5</span> <span style="font-size:30px;">Which region would you like to read information on air pollution and health impacts about?</span>',
                         // hint: '<span style="color:gray;font-size:14px;">(Attention: Your choice will be implemented with a 60% probability.)</span>',
                          choices: [
                            ['home',  data.district + ' (' + data.state + ')'],
                            ['decoy', "Nicaragua (a country in Central America)"]
                          ],
                          requiredChoice: true,
                          shuffleChoices: true
                      }
                    ]
                    // formsOptions: {
                    //     requiredChoice: true
                    // }
                });
                W.show('data', 'flex');
                node.game.doneButton.enable();
            });
        },
        done: function() {
            return node.game.RegionC.getValues();
        }
    });

    ////////////////////////////////////////////////////////////////////////////
    stager.extendStep('Part2_choice_outcome', {
        name: 'Part 2: Reading and comprehension',
        frame: 'choice_outcome.htm',
        //donebutton: false,
        cb: function() {
            node.get('districtData2', function(data) {
                if (data.chosen === 'Austria') {
                    W.setInnerHTML('choice', "Austria");
                    W.setInnerHTML('where', ", a country in central Europe");
                }
                else if (data.chosen === 'Nicaragua') {
                    W.setInnerHTML('choice', "Nicaragua");
                    W.setInnerHTML('where', ", a country in central America");
                }
                else {
                    W.setInnerHTML('choice', data.row.district);
                    W.setInnerHTML('where', ", your home district");
                }
                W.show('data', 'flex');
            });
        }
    });

    //////////////////////////////////////////////////////////////////////////
    // Pollution in your district
    stager.extendStep('Part2_Pollution_in_your_district', {
        name: 'Part 2: Reading and comprehension',
        frame: 'leaflet_p5.htm',
        donebutton: false,
        cb: function() {
            node.get('districtData2', function(data) {

                if (data.chosen === 'Austria') {

                    node.game.Choice = 'Austria';
                    W.setInnerHTML('district', "Austria");
                    W.setInnerHTML('districtAgain', "Austria");
                    W.setInnerHTML('districtAgainAgain', "Austria");
                    W.setInnerHTML('districtAgainAgainAgain', "Austria");
                    W.setInnerHTML('pm25', "11.76");
                    W.setInnerHTML('higher', "2");
                    W.setInnerHTML('years', "0.7");
                    W.gid('img').src = "district_maps/AUT.png";
                    W.gid('L5').src = "Leaflet_images/L5_Austria.png";
                    // W.gid('banner').src = "Leaflet_images/banner_PM25_Austria.png";

                    node.game.controlQuestions = node.widgets.append('ChoiceManager', "ComprehquestionsL5", {
                        id: 'p5_q',
                        // ref: 'controlQuestions',
                        mainText: 'Based on the information provided in the box above, find the correct answer to the question below.<br>' +
                        '<span style="color:gray;font-size:14px;">(Your answer needs to be correct in order to be able to proceed to the next page.) </span>',
                        simplify: true,
                        forms: [
                            // {
                            //     id: 'p5_q1',
                            //     orientation: 'H',
                            //     mainText: '<span style="font-weight: normal;color:gray;">Q8</span> What is the WHO recommendation for the annual average PM 2.5 concentrations?<br>',
                            //     choices: [
                            //         ['0', "0 &mu;g/m<sup>3</sup>"],
                            //         ['5', "5 &mu;g/m<sup>3</sup>"],
                            //         ['15', "15 &mu;g/m<sup>3</sup>"],
                            //         ['30', "30 &mu;g/m<sup>3</sup>"],
                            //     ],
                            //     correctChoice: 1,
                            // },
                            {
                                id: 'p5_q1',
                                orientation: 'H',
                                mainText: '<span style="font-weight: normal;color:gray;">Q8</span> On average, how many years of life does a person living in Austria lose because of air pollution?<br>',
                                choices: [
                                    (0.7 * 0.5).toFixed(1) + ' years',
                                    (0.7 * 0.8).toFixed(1) + ' years',
                                    0.7.toFixed(1) + ' years',
                                    (0.7 * 1.2).toFixed(1) + ' years',
                                    (0.7 * 1.5).toFixed(1) + ' years'
                                ],
                                correctChoice: 2,
                            }
                        ]
                        // formsOptions: {
                        //     requiredChoice: true
                        // }
                    });
                }

                else if (data.chosen === 'Nicaragua') {
                    console.log('Nicaragua chosen!')

                    node.game.Choice = 'Nicaragua';

                    W.setInnerHTML('district', "Nicaragua");
                    W.setInnerHTML('districtAgain', "Nicaragua");
                    W.setInnerHTML('districtAgainAgain', "Nicaragua");
                    W.setInnerHTML('districtAgainAgainAgain', "Nicaragua");
                    W.setInnerHTML('pm25', "8.16");
                    W.setInnerHTML('higher', "2");
                    W.setInnerHTML('years', "0.3");
                    W.gid('img').src = "district_maps/NIC.png";
                    W.gid('L5').src = "Leaflet_images/L5_Nicaragua.png";
                    // W.gid('banner').src = "Leaflet_images/banner_PM25_Nicaragua.png";

                    node.game.controlQuestions = node.widgets.append('ChoiceManager', "ComprehquestionsL5", {
                        id: 'p5_q',
                        // ref: 'controlQuestions',
                        mainText: 'Based on the information provided in the box above, find the correct answer to the question below.<br>' +
                        '<span style="color:gray;font-size:14px;">(Your answer needs to be correct in order to be able to proceed to the next page.) </span>',
                        simplify: true,
                        forms: [
                            // {
                            //     id: 'p5_q1',
                            //     orientation: 'H',
                            //     mainText: '<span style="font-weight: normal;color:gray;">Q8</span> What is the WHO recommendation for the annual average PM 2.5 concentrations?<br>',
                            //     choices: [
                            //         ['0', "0 &mu;g/m<sup>3</sup>"],
                            //         ['5', "5 &mu;g/m<sup>3</sup>"],
                            //         ['15', "15 &mu;g/m<sup>3</sup>"],
                            //         ['30', "30 &mu;g/m<sup>3</sup>"],
                            //     ],
                            //     correctChoice: 1,
                            // },
                            {
                                id: 'p5_q1',
                                orientation: 'H',
                                mainText: '<span style="font-weight: normal;color:gray;">Q8</span> On average, how many years of life does a person living in Nicaragua lose because of air pollution?<br>',
                                choices: [
                                    (0.3 * 0.5).toFixed(1) + ' years',
                                    (0.3 * 0.8).toFixed(1) + ' years',
                                    0.3.toFixed(1) + ' years',
                                    (0.3 * 1.2).toFixed(1) + ' years',
                                    (0.3 * 1.6).toFixed(1) + ' years' // small adjustment was necessary
                                ],
                                correctChoice: 2,
                            }
                        ]
                        // formsOptions: {
                        //     requiredChoice: true
                        // }
                    });
                }
                else {
                    console.log('home randomly selected!')

                    node.game.Choice = 'Home';
                    var state_fig = data.row.state.replace(/ /g, '_');
                    state_fig = state_fig.replace(/&/g, 'and');
                    state_fig = state_fig.replace(/-/g, '_');

                    var district_fig = data.row.district.replace(/ /g, '_');
                    district_fig = district_fig.replace(/&/g, 'and');
                    district_fig = district_fig.replace(/-/g, '_');

                    //console.log(data);
                    W.setInnerHTML('district', data.row.district);
                    W.setInnerHTML('districtAgain', data.row.district);
                    W.setInnerHTML('districtAgainAgain', data.row.district);
                    W.setInnerHTML('districtAgainAgainAgain', data.row.district);
                    W.setInnerHTML('pm25', data.row.pm25.toFixed(2));
                    W.setInnerHTML('higher', (data.row.pm25 / 5).toFixed(0));
                    W.setInnerHTML('years', data.row.life_lost.toFixed(1));

                    W.gid('img').src = 'district_maps/' + state_fig + '_' + district_fig + '.png';
                    W.gid('L5').src = "Leaflet_images/L5_your_district.png";
                    // W.gid('banner').src = "Leaflet_images/banner_PM25_comp.png";



                    node.game.controlQuestions = node.widgets.append('ChoiceManager', "ComprehquestionsL5", {
                        id: 'p5_q',
                        // ref: 'controlQuestions',
                        mainText: 'Based on the information provided in the box above, find the correct answer to the question below.<br>' +
                        '<span style="color:gray;font-size:14px;">(Your answer needs to be correct in order to be able to proceed to the next page.) </span>',
                        simplify: true,
                        forms: [
                            // {
                            //     id: 'p5_q1',
                            //     orientation: 'H',
                            //     mainText: '<span style="font-weight: normal;color:gray;">Q8</span> What is the WHO recommendation for the annual average PM 2.5 concentrations?<br>',
                            //     choices: [
                            //         ['0', "0 &mu;g/m<sup>3</sup>"],
                            //         ['5', "5 &mu;g/m<sup>3</sup>"],
                            //         ['15', "15 &mu;g/m<sup>3</sup>"],
                            //         ['30', "30 &mu;g/m<sup>3</sup>"],
                            //     ],
                            //     correctChoice: 1,
                            // },
                            {
                                id: 'p5_q1',
                                orientation: 'H',
                                mainText: '<span style="font-weight: normal;color:gray;">Q8</span> On average, how many years of life does a person living in your district lose because of air pollution?<br>',
                                choices: [
                                    (data.row.life_lost * 0.5).toFixed(1) + ' years',
                                    (data.row.life_lost * 0.8).toFixed(1) + ' years',
                                    data.row.life_lost.toFixed(1) + ' years',
                                    (data.row.life_lost * 1.2).toFixed(1) + ' years',
                                    (data.row.life_lost * 1.5).toFixed(1) + ' years'
                                ],
                                correctChoice: 2,
                            }
                        ]
                        // formsOptions: {
                        //     requiredChoice: true
                        // }
                    });
                }
                W.show('data', 'flex');
                node.game.doneButton.enable();
            });
        },
        done: function() {
            return node.game.controlQuestions.getValues();
        }
    });



    ///////////////////////////////////////////////////////////////////
        // Explanation of counting task
        stager.extendStep('Part_3_Instructions', {
            name: 'Part 3: A fun exercise',
            frame: 'instructions_filler_task.htm',
            cb: function() {
                W.setInnerHTML('bonus', node.game.settings.TASK_2_BONUS);
            }
        });


        /////////////////////////////////////////////////////////////////////////
        // Effort task - Counting zeros
        stager.extendStep('Part_3_Filler_Task', {
            name: 'Part 3: A fun exercise',
            donebutton: false,
            frame: 'effort.html',
            done: function() {
                return { effort_count: node.game.correct };
            },
            init: function() {
                this.visualTimer = node.widgets.append('VisualTimer', W.getHeader());
            },
            exit: function() {
                if (node.game.visualTimer) {
                    node.game.visualTimer.destroy();
                    node.game.visualTimer = null;
                }
            },
            cb: function() {
                var box = W.gid('box');
                // variable to count correct answer
                var correct = 0;
                node.game.correct = correct;


                //show effort task
                // Number of numbers for each line
                var n = 12;
                // Number of lines
                var m = 4;
                // Initialize count of zeros
                var zeros = 0;

                // var Z = '<img src="effort_imgs/0.png" title="zero" name="zero" style="width: 30px"/>';
                var Z = '<img src="effort_imgs/bitcoin-gold-logo.png" title="one" name="one" style="width: 30px"/>';

                var O = '<img src="effort_imgs/1.png" title="one" name="one" style="width: 30px"/>';

                function genrand(n,m) {
                    box.innerHTML = '';
                    zeros = 0;
                    // Build a multidimensional array
                    for (var i = 0; i < m; i++) {
                        // Generate random sequence
                        var rand = Array(n).fill().map(() => Math.floor(Math.random()*2));
                        // Add div
                        var myDiv = document.createElement("div");
                        // Add the sequence to div

                        // Makes numbers as TEXT.
                        // myDiv.innerHTML = rand.join(' ');

                        // Display sequence
                        box.appendChild(myDiv);

                        // number of zeros
                        for (var j = 0; j < n; j++) {
                            if (rand[j] === 0) {
                                myDiv.innerHTML += Z;
                                zeros += 1;
                            }
                            else {
                                myDiv.innerHTML += O;
                            }
                        }
                    }

                    if (!node.game.zero) {
                        node.game.zero = node.widgets.append('CustomInput', 'input-div', {
                            id: 'zero',
                            mainText: 'How many coins are there?',
                            type: 'int',
                            min: 0,
                            max: 60,
                            requiredChoice: true
                        });
                    }
                    else {
                        node.game.zero.reset();
                    }
                }

                genrand(n,m);

                var button;
                button = W.gid('submitAnswer');
                button.onclick = function() {
                    var count = node.game.zero.getValues().value;
                    var message1;
                    var message2;
                    if (count === zeros) {
                        message1 = 'The answer is <strong>correct.</strong>';
                        node.game.correct += 1;
                        message2='So far, you had '+ node.game.correct+ ' correct tables';
                    }
                    else {
                        message1 = 'The answer is <string>wrong.</strong>';
                        message2 = 'So far, you had '+ node.game.correct+ ' correct tables';
                    }
                    //                alert(message);
                    // Hide element with id above.
                    // Show element with id results.
                    // Set innerHTML property of element with id textresult to
                    // the value correct or wrong and how many table done so far.

                    // hint: W.show and W.hide
                    W.hide('above');
                    W.show('results');
                    W.setInnerHTML('CheckAnswer', message1);
                    W.setInnerHTML('TotalPoint', message2);
                    genrand(n,m);
                };

                var button2;
                button2 = W.gid('nextTable');
                button2.onclick = function() {
                    // if (node.game.correct === 2) {
                    //     node.game.zero.destroy();
                    //     node.done();
                    //     return;
                    // }
                    // Hide element with id results.
                    // Show element with id above.
                    W.hide('results');
                    W.show('above');
                }
            },
        });

        stager.extendStep('Part_3_Results', {
            name: 'Part 3: A fun exercise - Your results',
            frame: 'effort_results.htm',
            cb: function() {
                var effort_payoff;
                effort_payoff = node.game.correct * node.game.settings.TASK_2_BONUS;
                effort_payoff = effort_payoff.toFixed(2);
                W.setInnerHTML('bonus', node.game.settings.TASK_2_BONUS);
                W.setInnerHTML('correct', node.game.correct);
                W.setInnerHTML('payoff', effort_payoff);
            }
        });


        ////////////////////////////////////////////////////////////////////////////////
        // PRIOR LYL
        stager.extendStep('Part4_Posterior_LYL', {
            name: 'Part 4',
            frame: 'posterior_LYL.htm',
            donebutton: false,
            cb: function() {
                node.get('districtData', function(data) {

                    var left, right, lifeLost;
                    left = '<span style="font-size: normal; font-style: italic">0 years</span><br><br>';
                    right = '<span style="font-size: normal; font-style: italic">12 years</span><br><br>';

                    //console.log(data);

                    if (node.game.Choice === 'Home') {
                        W.setInnerHTML('district', data.district);
                        W.setInnerHTML('districtAgain', data.district);

                        lifeLost = data.life_lost;
                        lifeLost = Number(lifeLost.toFixed(1));
                        node.game.lifeLost = lifeLost;
                        W.setInnerHTML('correct', lifeLost);

                        node.game.LYL_post = node.widgets.append('ChoiceManager', "T_LYL_post", {
                            id: 'LYL_posterior',
                            simplify: true,
                            panel: false,
                            forms: [
                                {
                                    id: 'LYL_posterior_1',
                                    mainText: '<span style="color:#07aa34;font-size:25px">Bonus question:</span> ' +
                                    '<span style="font-size:25px">How many years of life do people living in ' +
                                    data.district + ' lose on average because of air pollution?</span><br>' +
                                    '<span style="color:gray;font-weight: normal">(Move the slider to the desired position.)</span><br><br><br>',
                                    hint: false,
                                    name: 'Slider',
                                    hidden: true,
                                    requiredChoice: true,
                                    initialValue: 0,
                                    min: 0,
                                    max: 120,
                                    left: left,
                                    right: right,
                                    displayNoChange: false,
                                    type: 'flat',
                                    panel: false,
                                    texts: {
                                        currentValue: function(widget, value) {
                                            let LYL = [
                                                '0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9',
                                                '1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9',
                                                '2.0', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9',
                                                '3.0', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '3.9',
                                                '4.0', '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9',
                                                '5.0', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9',
                                                '6.0', '6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7', '6.8', '6.9',
                                                '7.0', '7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7', '7.8', '7.9',
                                                '8.0', '8.1', '8.2', '8.3', '8.4', '8.5', '8.6', '8.7', '8.8', '8.9',
                                                '9.0', '9.1', '9.2', '9.3', '9.4', '9.5', '9.6', '9.7', '9.8', '9.9',
                                                '10.0', '10.1', '10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8', '10.9',
                                                '11.0', '11.1', '11.2', '11.3', '11.4', '11.5', '11.6', '11.7', '11.8', '11.9',
                                                '12'
                                            ];
                                            node.game.contributionAmount = LYL[(value)];
                                            return '<span style=\'font-size:20px;\'>You think people living in ' +
                                            data.district + ' lose on average ' + LYL[(value)] + ' years of life due to air pollution.</span>';
                                        }
                                    }
                                },
                            ]
                        });
                    }

                    else if (node.game.Choice === 'Austria') {

                        W.setInnerHTML('district', 'Austria');
                        W.setInnerHTML('districtAgain', 'Austria');
                        W.setInnerHTML('correct', 0.7);
                        node.game.lifeLost = 0.7;

                        node.game.LYL_post = node.widgets.append('ChoiceManager', "T_LYL_post", {
                            id: 'LYL_posterior',
                            simplify: true,
                            panel: false,
                            forms: [
                                {
                                    id: 'LYL_posterior_1',
                                    mainText: '<span style="color:#07aa34;font-size:25px">Bonus question:</span> ' +
                                    '<span style="font-size:25px">How many years of life do people living in Austria' +
                                    ' lose on average because of air pollution?</span><br>' +
                                    '<span style="color:gray;font-weight: normal">(Move the slider to the desired position.)</span><br><br><br>',
                                    hint: false,
                                    name: 'Slider',
                                    hidden: true,
                                    requiredChoice: true,
                                    initialValue: 0,
                                    min: 0,
                                    max: 120,
                                    left: left,
                                    right: right,
                                    displayNoChange: false,
                                    type: 'flat',
                                    panel: false,
                                    texts: {
                                        currentValue: function(widget, value) {
                                            let LYL = [
                                                '0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9',
                                                '1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9',
                                                '2.0', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9',
                                                '3.0', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '3.9',
                                                '4.0', '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9',
                                                '5.0', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9',
                                                '6.0', '6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7', '6.8', '6.9',
                                                '7.0', '7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7', '7.8', '7.9',
                                                '8.0', '8.1', '8.2', '8.3', '8.4', '8.5', '8.6', '8.7', '8.8', '8.9',
                                                '9.0', '9.1', '9.2', '9.3', '9.4', '9.5', '9.6', '9.7', '9.8', '9.9',
                                                '10.0', '10.1', '10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8', '10.9',
                                                '11.0', '11.1', '11.2', '11.3', '11.4', '11.5', '11.6', '11.7', '11.8', '11.9',
                                                '12'
                                            ];
                                            node.game.contributionAmount = LYL[(value)];
                                            return '<span style=\'font-size:20px;\'>You think people living in Austria lose on average ' + LYL[(value)] + ' years of life due to air pollution.</span>';
                                        }
                                    }
                                },
                            ]
                        });
                    }

                    else if (node.game.Choice === 'Nicaragua') {

                        W.setInnerHTML('district', 'Nicaragua');
                        W.setInnerHTML('districtAgain', 'Nicaragua');
                        W.setInnerHTML('correct', 0.3);
                        node.game.lifeLost = 0.3;

                        node.game.LYL_post = node.widgets.append('ChoiceManager', "T_LYL_post", {
                            id: 'LYL_posterior',
                            simplify: true,
                            panel: false,
                            forms: [
                                {
                                    id: 'LYL_posterior_1',
                                    mainText: '<span style="color:#07aa34;font-size:25px">Bonus question:</span> ' +
                                    '<span style="font-size:25px">How many years of life do people living in Nicaragua' +
                                    ' lose on average because of air pollution?</span><br>' +
                                    '<span style="color:gray;font-weight: normal">(Move the slider to the desired position.)</span><br><br><br>',
                                    hint: false,
                                    name: 'Slider',
                                    hidden: true,
                                    requiredChoice: true,
                                    initialValue: 0,
                                    min: 0,
                                    max: 120,
                                    left: left,
                                    right: right,
                                    displayNoChange: false,
                                    type: 'flat',
                                    panel: false,
                                    texts: {
                                        currentValue: function(widget, value) {
                                            let LYL = [
                                                '0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9',
                                                '1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9',
                                                '2.0', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9',
                                                '3.0', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '3.9',
                                                '4.0', '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9',
                                                '5.0', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9',
                                                '6.0', '6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7', '6.8', '6.9',
                                                '7.0', '7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7', '7.8', '7.9',
                                                '8.0', '8.1', '8.2', '8.3', '8.4', '8.5', '8.6', '8.7', '8.8', '8.9',
                                                '9.0', '9.1', '9.2', '9.3', '9.4', '9.5', '9.6', '9.7', '9.8', '9.9',
                                                '10.0', '10.1', '10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8', '10.9',
                                                '11.0', '11.1', '11.2', '11.3', '11.4', '11.5', '11.6', '11.7', '11.8', '11.9',
                                                '12'
                                            ];
                                            node.game.contributionAmount = LYL[(value)];
                                            return '<span style=\'font-size:20px;\'>You think people living in Nicaragua lose on average ' + LYL[(value)] + ' years of life due to air pollution.</span>';
                                        }
                                    }
                                },
                            ]
                        });
                    }

                    W.show('data', 'flex');
                    node.game.doneButton.enable();
                });
            },
            done: function() {
                var w, q1, result;

                node.game.gueeBonus = 0;

                w = node.game.LYL_post;

                // DISPLAY 1
                q1 = w.formsById.LYL_posterior_1;
                if (q1.isHidden()) {
                    q1.reset(); // removes error.
                    q1.show();
                    return false;
                }

                if (node.game.contributionAmount == node.game.lifeLost) {
                    node.game.guessBonus = 0.50
                    W.setInnerHTML('payoff', '<img src="success.png" width="50px"> Your answer is <b>correct</b>! You receive a bonus of <b>$0.50</b>.<br>')
                }
                else if ((node.game.contributionAmount != node.game.lifeLost) && (node.game.contributionAmount >= (node.game.lifeLost - 0.5)) && (node.game.contributionAmount<= (node.game.lifeLost + 0.5))) {
                    node.game.guessBonus = 0.20
                    W.setInnerHTML('payoff', '<img src="almost_correct.png" width="50px"> Your answer is within half a year of the correct value! You receive a bonus of <b>$0.20</b>.<br>')
                }
                else {
                    W.setInnerHTML('payoff', '<img src="failure.png" width="50px"> Your answer is <b>not correct</b>. Therefore, you receive no bonus for this question.<br>')
                }
                result = W.gid('result');
                if (result.style.display === 'none') {
                    result.style.display = '';
                    return false;
                }
                return {
                    values: w.getValues(),
                    bonus: node.game.guessBonus
                }
            }
        });



////////////////////////////////////////////////////////////////////////////////
    // PART 4

    // LOCUS of CONTROL 1
        stager.extendStep('Part4_LOC1', {
            name: "Part 4: Your opinion",
            widget: {
                name: 'ChoiceManager',
                id: 'Part4_LOC1',
                options: {
                    simplify: true,
                    mainText: '<br><br>' +
                    'Indicate how much you agree or disagree with the following statements.',
                    forms: [
                        {
                            id: 'LOC_q1',
                            mainText: '<span style="font-weight: normal;color:gray;">Statement 1</span><br>' +
                            '"I have little control of the negative effects of air pollution on my health."',
                            choices: [
                              ['1', 'I strongly agree'],
                              ['2', 'I agree'],
                              ['3', 'I am neutral'],
                              ['4', 'I disagree'],
                              ['5', 'I strongly disagree'],
                            ],
                            requiredChoice: true,
                            shuffleChoices: false,
                        },
                        {
                            id: 'LOC_q2',
                            orientation: 'H',
                            mainText: '<span style="font-weight: normal;color:gray;">Statement 2</span><br>' +
                            '"There is really no way I can avoid negative effects from air pollution on my health."',
                            choices: [
                              ['1', 'I strongly agree'],
                              ['2', 'I agree'],
                              ['3', 'I am neutral'],
                              ['4', 'I disagree'],
                              ['5', 'I strongly disagree'],
                            ],
                            requiredChoice: true,
                            shuffleChoices: false,
                        },
                        {
                            id: 'LOC_q3',
                            orientation: 'H',
                            mainText: '<span style="font-weight: normal;color:gray;">Statement 3</span><br>' +
                            '"There is little I can do to reduce the negative effects from air pollution on my health."',
                            choices: [
                              ['1', 'I strongly agree'],
                              ['2', 'I agree'],
                              ['3', 'I am neutral'],
                              ['4', 'I disagree'],
                              ['5', 'I strongly disagree'],
                            ],
                            requiredChoice: true,
                            shuffleChoices: false,
                        }
                    ]
                }
            }
        });

        ///////////////////////////////////////////////
        // LOCUS of CONTROL 2
            stager.extendStep('Part4_LOC2', {
                name: "Part 4: Your opinion",
                widget: {
                    name: 'ChoiceManager',
                    id: 'Part4_LOC2',
                    options: {
                        simplify: true,
                        mainText: '<br><br>' +
                        'Indicate how much you agree or disagree with the following statements.',
                        forms: [
                            {
                                id: 'LOC_q4',
                                mainText: '<span style="font-weight: normal;color:gray;">Statement 4</span><br>' +
                                '"I often feel helpless when I think about air pollution and its effects on my health."',
                                choices: [
                                  ['1', 'I strongly agree'],
                                  ['2', 'I agree'],
                                  ['3', 'I am neutral'],
                                  ['4', 'I disagree'],
                                  ['5', 'I strongly disagree'],
                                ],
                                requiredChoice: true,
                                shuffleChoices: false,
                            },
                            {
                                id: 'LOC_q5',
                                orientation: 'H',
                                mainText: '<span style="font-weight: normal;color:gray;">Statement 5</span><br>' +
                                '"Sometimes I feel that I’m forced to breathe polluted air."',
                                choices: [
                                  ['1', 'I strongly agree'],
                                  ['2', 'I agree'],
                                  ['3', 'I am neutral'],
                                  ['4', 'I disagree'],
                                  ['5', 'I strongly disagree'],
                                ],
                                requiredChoice: true,
                                shuffleChoices: false,
                            }
                        ]
                    }
                }
            });

            ///////////////////////////////////////////////
            // LOCUS of CONTROL 3
                stager.extendStep('Part4_LOC3', {
                    name: "Part 4: Your opinion",
                    widget: {
                        name: 'ChoiceManager',
                        id: 'Part4_LOC3',
                        options: {
                            simplify: true,
                            mainText: '<br><br>' +
                            'Indicate how much you agree or disagree with the following statements.',
                            forms: [
                                {
                                    id: 'LOC_q6',
                                    mainText: '<span style="font-weight: normal;color:gray;">Statement 6</span><br>' +
                                    '"How much air pollution will affect my health in the future mostly depends on me."',
                                    choices: [
                                      ['1', 'I strongly agree'],
                                      ['2', 'I agree'],
                                      ['3', 'I am neutral'],
                                      ['4', 'I disagree'],
                                      ['5', 'I strongly disagree'],
                                    ],
                                    requiredChoice: true,
                                    shuffleChoices: false,
                                },
                                {
                                    id: 'LOC_q7',
                                    orientation: 'H',
                                    mainText: '<span style="font-weight: normal;color:gray;">Statement 7</span><br>' +
                                    '"I can reduce the negative effect of air pollution on my health as much as I want if I really set my mind to it."',
                                    choices: [
                                      ['1', 'I strongly agree'],
                                      ['2', 'I agree'],
                                      ['3', 'I am neutral'],
                                      ['4', 'I disagree'],
                                      ['5', 'I strongly disagree'],
                                    ],
                                    requiredChoice: true,
                                    shuffleChoices: false,
                                }
                            ]
                        }
                    }
                });


                ///////////////////////////////////////////////
                // Perceived Control
                    stager.extendStep('Part4_PC', {
                        name: "Part 4: Your opinion",
                        widget: {
                            name: 'ChoiceManager',
                            id: 'Part4_PC',
                            options: {
                                simplify: true,
                                mainText: '<br><br>' +
                                'Indicate how much control do you think you have over the impacts of air pollution on your health.',
                                forms: [
                                    {
                                        id: 'LOC_q6',
                                        mainText: '<span style="font-weight: normal;">Please choose the answer that best completes the following sentence:</span><br><br/>' +
                                        '"The impact of air pollution on my own health is ..."',
                                        choices: [
                                          ['1', 'Completely uncontrollable'],
                                          ['2', 'Mostly uncontrollable'],
                                          ['3', 'Neutral'],
                                          ['4', 'Mostly controllable'],
                                          ['5', 'Completely controllable'],
                                        ],
                                        requiredChoice: true,
                                        shuffleChoices: false,
                                    }
                                ]
                            }
                        }
                    });


////////////////////////////////////////////////////////////////////////////////
        // Age and caste
            stager.extendStep('Part4_Age_Caste', {
                name: "Part 4: Your opinion",
                widget: {
                    name: 'ChoiceManager',
                    id: 'Part4_q',
                    options: {
                        simplify: true,
                        mainText: '',
                        forms: [
                            {
                                name: 'CustomInput',
                                id: 'Part4_q1',
                                mainText: '<span style="font-weight: normal;color:gray;">Q9</span> How old are you?',
                                width: '95%',
                                type: 'int',
                                min: 0,
                                max: 100,
                                requiredChoice: true,
                            },
                            {
                                id: 'Part4_q2',
                                orientation: 'V',
                                mainText: '<span style="font-weight: normal;color:gray;">Q10</span> What caste do you belong to?',
                                choices: [ 'Upper caste', 'Lower caste (Scheduled caste / Scheduled tribe)', 'No caste / other'],
                                requiredChoice: true
                            }
                        ]
                    }
                }
            });


        ////////////////////////////////////////////////////////////////////////////
        // FEEDBACK
        stager.extendStep('feedback', {
            widget: {
                name: 'Feedback',
                options: {
                    title: false,
                    panel: false,
                    minChars: 50,
                    showSubmit: false,
                    mainText: 'Thank you for participating. ' +
                    '<br><br>' +
                    "If you want to get in touch with us for questions or suggestions, " +
                    "please write us an email at <em><span style='color:#bf2b42'>pob.heidelberg@gmail.com</span></em>." +
                    '<br><br>' +
                    'We are very interested in ' +
                    'hearing your <strong>feedback</strong> about the ' +
                    'following points:<br/><br/><em><ol>' +
                    '<li>Was the survey too long or too short?</li>' +
                    '<li>Did you find any question unclear or ' +
                    'uncomfortable?</li>' +
                    '<li>Did you experience any technical difficulty?</li>' +
                    '<li>Was the map of the region of your choice loading correctly?</li>' +
                    '<li>How can we improve the study?</li></ol>'
                }
            }
        });


        //////////////////////////////////////////////////////////////////////////////
      // END OF SURVEY
      //////////////////////////////////////////////////////////////////////////////
      stager.extendStep('end', {
          widget: {
              name: 'EndScreen',
              options: {
                  feedback: false,
                  showEmailForm: false
              }
          },
          init: function() {
              node.game.doneButton.destroy();
              node.say('end');
          }
      });
  };
