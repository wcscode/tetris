import renderFallPieces from '../RenderedObjects/RenderFallPieces.js';

export default class StartScene {

    constructor(game){
        
        this._game = game;       

        this._aggregate = 0;
        this._aggregateRate = 2;

        this._transitionAlpha = 0;
        this._transitionRate = 0.02;      
    }

    get name() { return 'START' }

    update = (dt) => {        
        
        if (this._game.control.isPressed('PLAYER_1', 'START'))
            this._game.state.active('START_SCENE_TRANSITION_BEGIN');

        this.updateBackgroundFallPieces(dt);
        this.updateTexts(dt);

        if(this._game.state.get == 'START_SCENE_TRANSITION_BEGIN')
            this.updateTransition(dt);
    }

    render = () => {
               
        this.clear();     

        this.renderBackground();
        this.preRenderBackgroundFallPieces();
        this.renderTexts();  
        
        if(this._game.state.get == 'START_SCENE_TRANSITION_BEGIN')
            this.renderTransition();
      
    }   
 
    clear = () =>{

        const { canvasWidth, canvasHeight } = this._game.config;        
        this._game.context.clearRect(0, 0, canvasWidth, canvasHeight);                 
    }
    
    updateBackgroundFallPieces = (dt) => {

        if(this._preRendereds != null) {

            this._preRendereds.forEach(piece => {                    
                piece.y += piece.velocity * ( 1 + dt );

                if(piece.y > this._game.config.canvasHeight) piece.y = - piece.height;
            });
        }
    }

    renderBackground = () => {

        const { canvasWidth, canvasHeight } = this._game.config;  

        this._game.context.fillStyle = '#ffccdd';
        this._game.context.fillRect(0, 0, canvasWidth, canvasHeight);        
        this._game.context.fill();      

        this._game.context.fillStyle = '#ffbbbb';
        this._game.context.fillRect(0, 0, canvasWidth / 6, canvasHeight);        
        this._game.context.fill();

        this._game.context.fillStyle = '#ffbbbb';
        this._game.context.fillRect(canvasWidth - canvasWidth / 6, 0, canvasWidth / 6, canvasHeight);        
        this._game.context.fill();
    }

    preRenderBackgroundFallPieces = () => {
             

        if(this._preRendereds == null)
            this._preRendereds = renderFallPieces(this._game);
        
        
        return this._preRendereds.map(piece => {
            this._game.context.drawImage(piece.canvas, piece.x, piece.y);
        });      
    } 
    
    updateTexts = (dt) => {

        this._aggregate += dt * this._aggregateRate; 

        if (this._aggregate > 2) this._aggregate = 0;

        this._blink = Math.trunc(this._aggregate) % 2 == 0;   
    }

    renderTexts = () => {

        const { canvasCenterX, canvasCenterY } = this._game.config;

        this._game.context.beginPath(); 
        this._game.context.font = '70px Tetris';
        this._game.context.fillStyle = '#5F5753';
        this._game.context.textAlign = 'center';
        this._game.context.textBaseline = 'middle';
        this._game.context.fillText('TETRIS', canvasCenterX, canvasCenterY);
        
        if(this._blink){
        
            this._game.context.beginPath();
            this._game.context.font = '30px Arcade';
            this._game.context.fillStyle = '#5F5753';
            this._game.context.textAlign = 'center';
            this._game.context.textBaseline = 'middle';
            this._game.context.fillText('PRESS ENTER', canvasCenterX, canvasCenterY + 50);
        }  

    }

    updateTransition = (dt) => {

        this._transitionAlpha += Math.min(1, this._transitionRate);
        this._blink = true;

        if(this._transitionAlpha >= 1) {

            this._game.state.active('PLAY_SCENE_TRANSITION_END');
            this._game.scene.active('PLAY')
        }
    }

    renderTransition = () => {

        const { canvasWidth, canvasHeight } = this._game.config;

        this._game.context.fillStyle = `rgba(255, 255, 255, ${this._transitionAlpha})`;
        this._game.context.fillRect(0, 0, canvasWidth, canvasHeight);    
    }
  
}