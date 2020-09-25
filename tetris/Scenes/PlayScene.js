import Piece from "../Pieces.class.js";
import Grid from "../Grid.class.js";
import Collision from "../Collision.class.js";
import TryMerge from "../TryMerge.class.js";

export default class PlayScene{

    constructor(game){

        this._game = game;
       

        this._aggregate = 0;
        this._aggregateRate = .04;      

        this._transitionAlpha = 1;
        this._transitionRate = 0.02;
        this._countDown = 3;
        this._canCountDown = false;

        this._blockSide = 30 //this._game.config.canvasWidth / 20;        

        this._grid = new Grid(game, this._blockSide);
        this._piece = new Piece(game, this._blockSide);
        this._piece.new();        
    }

    get name() { return 'PLAY' }
    
    update = (dt) => {

        switch(this._game.state.get){

            case 'PLAY_SCENE_RUNNING':   

                this._piece.update(dt);

                Collision.grid = this._grid;
                Collision.piece = this._piece;                                
                Collision.checkCollision(this._blockSide);

                TryMerge.add(this._grid, this._piece, this._blockSide);                    
                  
                this._grid.update(dt);                

                break;    

            case 'PLAY_SCENE_TRANSITION_END':

                this.updateTransition(dt);
                break;  
            
            case 'PLAY_SCENE_INTRO_COUNT': 

                this.updateCountDown(dt);
                break;
        }
        
    }

    render = () => {

        this.clear();
        this.preRenderBackground();
        this._grid.render();
        
        switch(this._game.state.get){

            case 'PLAY_SCENE_RUNNING':        

                this._piece.render();
                break;              

            case 'PLAY_SCENE_TRANSITION_END':

                this.renderTransition();
                break;

            case 'PLAY_SCENE_INTRO_COUNT':        

                this.renderCountDown();
                break;          
            
        }      
       
    }

    clear = () => {

        const { canvasWidth, canvasHeight } = this._game.config;

        this._game.context.clearRect(0, 0, canvasWidth, canvasHeight); 
        
        this._game.context.fillStyle = '#ffccdd';
        this._game.context.fillRect(0, 0, canvasWidth, canvasHeight);        
        this._game.context.fill();   
    }

    preRenderBackground = () =>{      

        if(this._preRendered == null){
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const { canvasWidth, canvasHeight } = this._game.config;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            this._game.context.fillStyle = '#ffbbbb';
            this._game.context.fillRect(0, 0, canvasWidth / 4, canvasHeight);        
            this._game.context.fill();

            this._game.context.fillStyle = '#ffbbbb';
            this._game.context.fillRect(canvasWidth - canvasWidth / 4, 0, canvasWidth / 4, canvasHeight);        
            this._game.context.fill();
        
            this._preRendered = canvas;
        }

        return this._game.context.drawImage(this._preRendered, 0, 0);
    }

    updateTransition = (dt) => {

        this._transitionAlpha -= Math.max(0, this._transitionRate);   

        if(this._transitionAlpha <= 0) 
            this._game.state.active('PLAY_SCENE_INTRO_COUNT');

    }

    renderTransition = () => {
        
        const { canvasWidth, canvasHeight } = this._game.config;

        this._game.context.fillStyle = `rgba(255, 255, 255, ${this._transitionAlpha})`;
        this._game.context.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    updateCountDown = (dt) => {

        this._aggregate += this._aggregateRate  * (1 + dt); 

        if (this._aggregate > 2) this._aggregate = 0;

        if((Math.trunc(this._aggregate) % 2 == 0)) {

            if(this._canCountDown){
                
                this._countDown -= 1; 
                this._canCountDown = false;
            }

            if(this._countDown == 0)
                this._game.state.active('PLAY_SCENE_RUNNING');

        } else {

            this._canCountDown = true;
        }        
    }

    renderCountDown = () => {

        const { canvasCenterX, canvasCenterY } = this._game.config;

        this._game.context.beginPath(); 
        this._game.context.font = '120px Tetris';
        this._game.context.fillStyle = 'white';
        this._game.context.textAlign = 'center';
        this._game.context.textBaseline = 'middle';
        this._game.context.fillText(this._countDown, canvasCenterX, canvasCenterY);
    }
}