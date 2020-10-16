export default class Collision{

    static set game(game) {
        
        this._game = game;
    }

    static set piece(piece) {
        
        this._piece = piece;
    }

    static set grid(grid) {
        
        this._grid = grid;
    }

    static check = (blockSide) => {      

        const size = this._piece.size;       
        const length = this._piece.blocks.length;
        this._piece.canFall = true;
      
        for(let y = 0; y < size; ++y){
            
            for(let x = 0; x < size; ++x) {

                let block = this._piece.blocks[this._piece.position(this._piece.direction, length, size, x, y)];
                let xBlock = blockSide * x;
                let yBlock = blockSide * y;

                if(block == 1) {
                   
                    
                    let indexGridX = ((this._piece.x - this._grid.x) / blockSide) + x;
                    let indexGridY = ((this._piece.y - this._grid.y) / blockSide) + y;
                   
                    this._game.control.pressedButtons('PLAYER_1').forEach( command => {
                       
                        switch(command.commandName){
                            
                            case 'LEFT':                            

                               if(!this._grid.hasIndexLeft(indexGridX)) {

                                    this._piece.moveRight();
                                    break;
                                }

                                if(this._grid.blocks[indexGridY][indexGridX] == 1){
                                 
                                    this._piece.moveRight(); 
                                }

                                break;

                            case 'RIGHT':                               

                                if(!this._grid.hasIndexRight(indexGridX)) {

                                    this._piece.moveLeft();
                                    break;
                                }
                              
                                if(this._grid.blocks[indexGridY][indexGridX] == 1){    
                                  
                                    this._piece.moveLeft();
                                }
                                
                                break;
                            

                            case 'DOWN':                              
                              
                                if(!this._grid.hasIndexDown(indexGridY)) {
                                
                                    this._piece.moveUp();
                                    break;
                                }

                                if(this._grid.blocks[indexGridY][indexGridX] == 1){    
                      
                                    this._piece.moveUp();                                    
                                }

                                break;

                            case 'ROTATE':

                                this._game.control.cancelPressed(command.commandName);

                                if(!this._grid.hasIndexDown(indexGridY)) {
                              
                                    this._piece.moveUp();
                                  
                                }

                                if(!this._grid.hasIndexLeft(indexGridX)) {

                                    this._piece.moveRight();
                                  
                                }

                                if(!this._grid.hasIndexRight(indexGridX)) {

                                    this._piece.moveLeft();
                                  
                                }

                               
                            
                               /* if(this._grid.blocks[indexGridY][indexGridX] == 1){    
                                   
                                    if(priorMovement == 'DOWN') this._piece.moveUp();                                    
                                    if(priorMovement == 'LEFT') this._piece.moveRight();                                    
                                    if(priorMovement == 'RIGHT') this._piece.moveLeft();                                    
                                }*/
                                
                                break;
                          
                        }    
                                      
                       
                    });                  
                  
                  

                    if(this._piece.canFall){
                       
                        if(this._piece.y + yBlock + blockSide == this._grid.height) {
                                          
                            this._piece.canFall = false;
                        }
                    }
                    
                }
            }
        } 
    }
}