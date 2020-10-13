export default function renderGrid(game, blockSide, startX, xblock, yblock){
  
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const { canvasWidth, canvasHeight } = game.config;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    context.fillStyle = 'purple';
    context.strokeStyle = '#ffccdd';
    context.lineWidth = 1;

    for(var y = 0; y < yblock; ++y){

        for(var x = 0; x < xblock; ++x){
    
            context.fillRect(startX + blockSide * x, blockSide * y, blockSide, blockSide);
            context.strokeRect(startX + blockSide * x, blockSide * y, blockSide, blockSide);
        }
    }   
    
    return canvas;
}