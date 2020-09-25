export default class TryMerge {

    static add = (grid, piece, blockSide) => {
       //console.table(grid.blocks);
       //console.log(grid.blocks)
       
        //grid.fillBlock(0,0);
        if(!piece.canFall) {

            const size = piece.size;       
            const length = piece.blocks.length;
          //  console.log(pi)
            for(let y = 0; y < piece.size; ++y) {

                for(let x = 0; x < piece.size; ++x) {
                    
                    let block = piece.blocks[piece.position(piece.direction, length, size, x, y)];
                    let xBlock = (blockSide * x + piece.offsetX) / blockSide;
                    let yBlock = (blockSide * y + piece.offsetY) / blockSide;
                    
                    if(block == 1) {

                        grid.fill(xBlock, yBlock, 'white');    
                       // console.log(grid.blocks)
                    }
                }
            }
           
                
           // });
        }
    }
}