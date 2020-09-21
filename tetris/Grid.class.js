export default class Grid{

    constructor(game, blockSide){

        this._game = game;
        this._blockSide = blockSide;

        this._tickFall = 0;
        this._tickFallVelocity = 50;    
    }

    update = (dt) => {

        
    
    }

    render = () => {

        if(this._preRendered == null) {
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const { canvasWidth, canvasHeight } = this._game.config;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            context.fillStyle = 'purple';
            context.strokeStyle = '#ffccdd';
            context.lineWidth = 1;

            for(var y = 0; y < 20; ++y){

                for(var x = 0; x < 10; ++x){
            
                    context.fillRect((canvasWidth / 4) + this._blockSide * x, this._blockSide * y, this._blockSide, this._blockSide);
                    context.strokeRect((canvasWidth / 4) + this._blockSide * x, this._blockSide * y, this._blockSide, this._blockSide);
                }
            }   
            
            this._preRendered = canvas;
        }

        return this._game.context.drawImage(this._preRendered, 0, 0);        
    }

    isTickFall = (dt) =>  {

        this._tickFall += Math.floor(1 * (1 + dt));

        if(this._tickFall % this._tickFallVelocity == 0) {

            this._tickFall = 0;
            return true;
        }

        return false;
    }   
}