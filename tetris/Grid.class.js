export default class Grid{

    constructor(game, blockSide){

        this._game = game;
        this._blockSide = blockSide;

        const { canvasWidth } = this._game.config;

        this._xblock = 10;
        this._yblock = 20;
        
        this._x = canvasWidth / 4;
        this._y = 0;        
        this._width = this._xblock * this._blockSide;
        this._height = this._yblock * this._blockSide;

        this._tickFall = 0;
        this._tickFallVelocity = 50;    
    }

    get x(){ return this._x; }
    get y(){ return this._y; }
    get width(){ return this._width; }
    get height(){ return this._height; }    

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

            for(var y = 0; y < this._yblock; ++y){

                for(var x = 0; x < this._xblock; ++x){
            
                    context.fillRect(this._x + this._blockSide * x, this._blockSide * y, this._blockSide, this._blockSide);
                    context.strokeRect(this._x + this._blockSide * x, this._blockSide * y, this._blockSide, this._blockSide);
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