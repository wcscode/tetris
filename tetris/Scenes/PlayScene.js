export default class PlayScene{

    constructor(game){

        this._game = game;
        this._context = game.context;
        this._config = game.config; 

        this._aggregate = 0;
        this._aggregateRate = 2;

        this._transitionAlpha = 1;
        this._transitionRate = 0.01;
        this._countDown = 30;
        this._canCountDown = true;
    }

    get name() { return 'PLAY' }
    
    update = (dt) => {

        switch(this._game.state.get){

            case 'PLAY_SCENE_RUNNING':        ;   
                break;    

            case 'PLAY_SCENE_TRANSITION_END':

                this._transitionAlpha -= Math.max(0, this._transitionRate);           
    
                if(this._transitionAlpha <= 0) this._game.state.active('PLAY_SCENE_INTRO_COUNT')

                break;  
            
            case 'PLAY_SCENE_INTRO_COUNT': 

                
                this._aggregate += this._aggregateRate  * (1 + dt); 

                if (this._aggregate > 100) this._aggregate = 0;
    
                if((Math.trunc(this._aggregate) % 2 == 0) && this._canCountDown) {

                    this._countDown -= 1;                    
                    this._canCountDown = false;

                    if(this._countDown == 0)
                        this._game.state.active('PLAY_SCENE_RUNNING');

                } else {

                    this._canCountDown = true;
                }

              

              this._countDown = Math.trunc(this._aggregate)  % 2 == 0;

                break;
        }
        
    }

    render = () => {

        this._context.clearRect(0, 0, this._config.canvasWidth, this._config.canvasHeight); 
        
        this._context.fillStyle = '#ffccdd';
        this._context.fillRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);        
        this._context.fill();         
        
        switch(this._game.state.get){

            case 'PLAY_SCENE_RUNNING':        

                this._context.beginPath(); 
                this._context.font = '60px Tetris';
                this._context.fillStyle = '#5F5753';
                this._context.textAlign = 'center';
                this._context.textBaseline = 'middle';
                this._context.fillText('Running', this._config.canvasCenterX, this._config.canvasCenterY);

                break;              

            case 'PLAY_SCENE_TRANSITION_END':

                this._context.fillStyle = `rgba(255, 255, 255, ${this._transitionAlpha})`;
                this._context.fillRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);

                break;

            case 'PLAY_SCENE_INTRO_COUNT':        

                this._context.beginPath(); 
                this._context.font = '120px Tetris';
                this._context.fillStyle = '#5F5753';
                this._context.textAlign = 'center';
                this._context.textBaseline = 'middle';
                this._context.fillText(this._countDown, this._config.canvasCenterX, this._config.canvasCenterY);

                break;            
            
        }
       
    }
}