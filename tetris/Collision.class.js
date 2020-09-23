export default class Collision{

    static set piece(piece) {
        
        this._piece = piece;
    }

    static set grid(grid) {
        
        this._grid = grid;
    }

    static checkCollision = (blockSide) => {      

        const size = this._piece.size;

        let collision = false;

        for(let y = 0; y < size; ++y){
            
            for(let x = 0; x < size; ++x) {

                let block = this._piece.blocks[this._piece.position(this._piece.direction, size, x, y)];
                let xBlock = blockSide * x;

                if(block == 1) {
                    
                    switch(this._piece.lastMove){

                        case 'LEFT':

                            if(xBlock + this._piece.x < this._grid.x) {
                                this._piece.moveRight();                                                        
                            }

                            break;

                        case 'RIGHT':

                            if( xBlock + this._piece.x + blockSide > this._grid.width + this._grid.x)
                                this._piece.moveLeft();                              

                            break;
                        
                        case 'ROTATE':

                            if( xBlock + this._piece.x < this._grid.x || xBlock + this._piece.x + blockSide > this._grid.width + this._grid.x)
                                this._piece.rotate(false);
                            
                            break;
                    }                   
                }
            }
        }       
    }
}