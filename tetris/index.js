'use strict';

import * as c from '../const.js';
import Game  from './EngineGame.js';
import Scene from './EngineScene.js';
import State from './EngineState.js';
import Control from './EngineControl.js';
import StartScene from './Scenes/StartScene.js';
import PlayScene from './Scenes/PlayScene.js';

Game.setConfig({ 
    canvasWidth: 800,
    canvasHeigth: 600,
    debugMode: true
})

Game.load = () => {    
   
    //Enable resources
    Game.enableScene = Scene;  
    Game.enableState = State; 
    Game.enableControl = new Control(window); 

    Game.control.addCommand('PLAYER_1', c.PLAYER_1_COMMAND_ENTER, 'START');
    Game.control.addCommand('PLAYER_1', c.PLAYER_1_COMMAND_LEFT, 'LEFT');
    Game.control.addCommand('PLAYER_1', c.PLAYER_1_COMMAND_UP, 'UP');
    Game.control.addCommand('PLAYER_1', c.PLAYER_1_COMMAND_RIGHT, 'RIGHT');
    Game.control.addCommand('PLAYER_1', c.PLAYER_1_COMMAND_DOWN, 'DOWN');
    Game.control.addCommand('PLAYER_1', c.PLAYER_1_COMMAND_SPACE, 'SPIN');        
    
    Game.state.add('START_SCENE_TRANSITION_BEGIN');
    Game.state.add('START_SCENE_TRANSITION_END');
    Game.state.add('PLAY_SCENE_INTRO_COUNT');
    Game.state.add('PLAY_SCENE_RUNNING');
    Game.state.add('PLAY_SCENE_PAUSE');
    Game.state.add('PLAY_SCENE_GAME_OVER');

    Game.state.active('START_SCENE_LOAD');

    Game.scene.add(new StartScene(Game));
    Game.scene.add(new PlayScene(Game));

    Game.scene.active('START');
   //retirar
    Game.scene.active('PLAY');  
    Game.state.active('PLAY_SCENE_RUNNING'); 
}

Game.update = (dt) =>{

   Game.scene.update(dt);
}

Game.render = () =>{

    Game.scene.render();
}

Game.start();




