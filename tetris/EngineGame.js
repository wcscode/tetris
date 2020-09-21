'use strict';

export default class EngineGame {
    
    static set enableScene(scene) { this._scene = scene }
    static set enableState(state) { this._state = state }
    static set enableControl(control) { this._control = control }

    static get context() { return this._context; }
    static get config() { return this._config }
    static get scene() { return this._scene }
    static get state() { return this._state }
    static get control() { return this._control }

    static load = () => {}
    static update = (dt) => {}
    static render = (dt) => {}

    static loop = (timestamp) =>{

        this._deltaTime = (timestamp - this._lastFrameTime) / 1000;
        this._lastFrameTime = timestamp;
        
        this.update(this._deltaTime);
        this.render();
        requestAnimationFrame(this.loop);
    }

    static setConfig = (config) => { this._config = config; }    

    static start = () => { 
                
        this._config.canvasElementId = this._config.canvasElementId == null ? 'canvas' : this._config.canvasElementId;
        this._config.canvasWidth = this._config.canvasWidth == null ? '800' : this._config.canvasWidth;
        this._config.canvasHeight = this._config.canvasHeight == null ? '600' : this._config.canvasHeight;
        
        this._config.canvasCenterX = this._config.canvasWidth / 2;
        this._config.canvasCenterY = this._config.canvasHeight / 2;

        const canvas = document.getElementById(this._config.canvasElementId);

        this._context = canvas.getContext('2d');

        this._context.fillStyle = 'black';
        this._context.fillRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);
        
        this._lastFrameTime = 0;
        
        this.load();
        this.loop(0); 
    }     
        
}

