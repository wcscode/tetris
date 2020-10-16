import renderGrid from '../RenderedObjects/RenderGrid.js';

export default class Grid{

    constructor(game, blockSide){

        this._game = game;
        this._blockSide = blockSide;

        const { canvasWidth } = this._game.config;

        this._xblock = 10;
        this._yblock = 20;
           
        this._width = this._xblock * this._blockSide;
        this._height = this._yblock * this._blockSide;

        this._x = (canvasWidth / 2) - (this._width / 2);
        this._y = 0;    
                
        this._blocks = new Array(20).fill(0);
        
        for(let y = 0; y < this._blocks.length; ++y) 
            this._blocks[y] = new Array(10).fill(0);  
          
    }

    get x() { return this._x; }
    get y() { return this._y; }
    get width() { return this._width; }
    get height() { return this._height; }    
    get blocks() { return this._blocks; }
   // get xBlock() { return this.xBlock; }
   // get yBlock() { return this.yBlock; }

    fill(x, y) { this._blocks[y][x] = 1; }

    update = (dt) => {

        
    
    }

    render = () => {

        if(this._preRendered == null)
            this._preRendered = renderGrid(this._game, this._blockSide, this._x, this._xblock, this._yblock);        

        this._game.context.drawImage(this._preRendered, 0, 0);   
        
        this._game.context.fillStyle = 'green';
        this._game.context.strokeStyle = '#ffccdd';
        this._game.context.lineWidth = 1;

        for(var y = 0; y < this._yblock; ++y){

            for(var x = 0; x < this._xblock; ++x){
                
                if(this._blocks[y][x] == 1){

                    this._game.context.fillRect(this._x + this._blockSide * x, this._blockSide * y, this._blockSide, this._blockSide);
                    this._game.context.strokeRect(this._x + this._blockSide * x, this._blockSide * y, this._blockSide, this._blockSide);
                }
            }
        }   
    }

    //hasIndex = (indexGridX, indexGridY) => indexGridX > -1 && indexGridX < this._xblock && indexGridY > -1 && indexGridY < this._yblock;
    hasIndexLeft = (indexGridX) => indexGridX > -1;
    hasIndexRight = (indexGridX) => indexGridX < this._xblock;
    hasIndexDown = (indexGridY) => indexGridY < this._yblock;
}