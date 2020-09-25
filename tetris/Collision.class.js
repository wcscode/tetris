export default class Collision{

    static set piece(piece) {
        
        this._piece = piece;
    }

    static set grid(grid) {
        
        this._grid = grid;
    }

    static checkCollision = (blockSide) => {      

        const size = this._piece.size;       
        const length = this._piece.blocks.length;
      //  console.log(this._grid.x + ' ' + this._piece.x)
        for(let y = 0; y < size; ++y){
            
            for(let x = 0; x < size; ++x) {

                let block = this._piece.blocks[this._piece.position(this._piece.direction, length, size, x, y)];
                let xBlock = blockSide * x;
                let yBlock = blockSide * y;

                if(block == 1) {
                   
                    
                    this._piece.lastMovements.forEach( movement => {
                        
                        switch(movement){

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
                    });
                    
                    if(this._piece.canFall){
                       
                        if(this._piece.y + yBlock + blockSide == this._grid.height) {
                         //   this._piece.moveUp();                       
                            this._piece.canFall = false;
                        }
                    }
                    
                }
            }
        } 
        
        this._piece.leaveJustLasMovement();
    }
}