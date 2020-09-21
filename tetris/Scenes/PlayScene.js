import Piece from "../Pieces.class.js";

export default class PlayScene{

    constructor(game){

        this._game = game;
       

        this._aggregate = 0;
        this._aggregateRate = .04;

        

        this._transitionAlpha = 1;
        this._transitionRate = 0.02;
        this._countDown = 3;
        this._canCountDown = false;

        this._blockSide = this._game.config.canvasWidth / 20;
        this._preRenderedBackground = this.preRenderBackground();

        this._piece = new Piece(game, this._blockSide);
        this._piece.new();


        this._tickFall = 0;
        this._tickFallVelocity = 50;
        this._tickMovement = 0;
    }

    get name() { return 'PLAY' }
    
    update = (dt) => {

        switch(this._game.state.get){

            case 'PLAY_SCENE_RUNNING':  
            
                if(!this._piece.canFall)
                    this._piece.new(); 

                if(this.isTickFall(dt)) {                   
                    this._piece.moveDown();
                }

                if(this.isTickMovement(dt)){
                    if (this._game.control.isPressed('PLAYER_1', 'LEFT'))
                        this._piece.moveLeft();
                    
                    if (this._game.control.isPressed('PLAYER_1', 'RIGHT'))
                        this._piece.moveRight();
                }
                
            

                break;    

            case 'PLAY_SCENE_TRANSITION_END':

                this._transitionAlpha -= Math.max(0, this._transitionRate);           
    
                if(this._transitionAlpha <= 0) this._game.state.active('PLAY_SCENE_INTRO_COUNT')

                break;  
            
            case 'PLAY_SCENE_INTRO_COUNT': 

                
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

              

              //this._countDown = Math.trunc(this._aggregate)  % 2 == 0;

                break;
        }
        
    }

    render = () => {

        const { canvasWidth, canvasHeight, canvasCenterX, canvasCenterY } = this._game.config;

        this._game.context.clearRect(0, 0, canvasWidth, canvasHeight); 
        
        this._game.context.fillStyle = '#ffccdd';
        this._game.context.fillRect(0, 0, canvasWidth, canvasHeight);        
        this._game.context.fill();         
        
 
        this._game.context.drawImage(this._preRenderedBackground, 0, 0)
        
        switch(this._game.state.get){

            case 'PLAY_SCENE_RUNNING':        

                this._piece.render();

                break;              

            case 'PLAY_SCENE_TRANSITION_END':

                this._game.context.fillStyle = `rgba(255, 255, 255, ${this._transitionAlpha})`;
                this._game.context.fillRect(0, 0, canvasWidth, canvasHeight);

                break;

            case 'PLAY_SCENE_INTRO_COUNT':        

                this._game.context.beginPath(); 
                this._game.context.font = '120px Tetris';
                this._game.context.fillStyle = 'white';
                this._game.context.textAlign = 'center';
                this._game.context.textBaseline = 'middle';
                this._game.context.fillText(this._countDown, canvasCenterX, canvasCenterY);

                break;            
            
        }      
       
    }

    isTickFall = (dt) =>  {

        this._tickFall += Math.floor(1 * (1 + dt));

        if(this._tickFall % this._tickFallVelocity == 0) {

            this._tickFall = 0;
            return true;

        }

        return false;
    }

    isTickMovement = (dt) =>  {

        this._tickMovement += Math.floor(1 * (1 + dt));

        if(this._tickMovement % 12 == 0) {

            this._tickMovement = 0;
            return true;
        }

        return false;
    }

    preRenderBackground = () =>{

        const { canvasWidth, canvasHeight } = this._game.config;
          
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        this._game.context.fillStyle = '#ffbbbb';
        this._game.context.fillRect(0, 0, canvasWidth / 4, canvasHeight);        
        this._game.context.fill();

        this._game.context.fillStyle = '#ffbbbb';
        this._game.context.fillRect(canvasWidth - canvasWidth / 4, 0, canvasWidth / 4, canvasHeight);        
        this._game.context.fill();

        context.fillStyle = 'purple';
        context.strokeStyle = '#ffccdd';
        context.lineWidth = 1;

        for(var y = 0; y < 20; ++y){

            for(var x = 0; x < 10; ++x){
            
                context.fillRect((canvasWidth / 4) + this._blockSide * x, this._blockSide * y, this._blockSide, this._blockSide);
                context.strokeRect((canvasWidth / 4) + this._blockSide * x, this._blockSide * y, this._blockSide, this._blockSide);
            }

        }
        
        return canvas;
    }


}