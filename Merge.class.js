export default class Merge {

    static add = (grid, piece, blockSide) => {     
      

            const size = piece.size;       
            const length = piece.blocks.length;
        
            for(let y = 0; y < piece.size; ++y) {

                for(let x = 0; x < piece.size; ++x) {
                    
                    let block = piece.blocks[piece.position(piece.direction, length, size, x, y)];
                    let xBlock = (blockSide * x + piece.offsetX) / blockSide;
                    let yBlock = (blockSide * y + piece.offsetY) / blockSide;
                    
                    if(block == 1) {

                        grid.fill(xBlock, yBlock);    
                     
                    }
                }
            }         
      
    }
}