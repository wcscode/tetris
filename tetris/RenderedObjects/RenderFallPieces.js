export default function renderFallPieces(game){

    const { canvasWidth } = game.config;

    const xPiece = (canvasWidth - 200) / 4;
    const offset = 10;
    
    const o = (canvas) => {

        const context = canvas.getContext('2d');            

        canvas.width = 120;
        canvas.height = 120;

        context.beginPath();           
        context.strokeStyle = '#ffbbbb';
        context.lineWidth = 10;            
        context.strokeRect(10, 10, 50, 50);
        context.strokeRect(60, 10, 50, 50);
        context.strokeRect(10, 60, 50, 50);
        context.strokeRect(60, 60, 50, 50);            

        return {canvas:canvas, x: xPiece - offset, y: 100, velocity: 10, height: canvas.height};
    }

    const l = (canvas) => {

        const context = canvas.getContext('2d');            

        canvas.width = 120;
        canvas.height = 170;

        context.beginPath();           
        context.lineWidth = 10;            
        context.strokeStyle = '#ffbbbb';
        context.strokeRect(10, 10, 50, 50);
        context.strokeRect(10, 60, 50, 50);            
        context.strokeRect(10, 110, 50, 50);
        context.strokeRect(60, 110, 50, 50);
        
        return {canvas:canvas, x: xPiece * 2 - offset, y: -200, velocity: 6, height: canvas.height };
    }

    const t = (canvas) => {

        const context = canvas.getContext('2d');            

        canvas.width = 120;
        canvas.height = 170;

        context.beginPath();           
        context.lineWidth = 10;            
        context.strokeStyle = '#ffbbbb';
        context.strokeRect(10, 10, 50, 50);
        context.strokeRect(10, 60, 50, 50);            
        context.strokeRect(10, 110, 50, 50);
        context.strokeRect(60, 60, 50, 50);
        
        return {canvas:canvas, x: xPiece * 3 - offset, y: - 100, velocity: 7, height: canvas.height };
    }

    const i = (canvas) => {

        const context = canvas.getContext('2d');            

        canvas.width = 70;
        canvas.height = 220;

        context.beginPath();           
        context.lineWidth = 10;            
        context.strokeStyle = '#ffbbbb';
        context.strokeRect(10, 10, 50, 50);
        context.strokeRect(10, 60, 50, 50);            
        context.strokeRect(10, 110, 50, 50);
        context.strokeRect(10, 160, 50, 50);
        
        return {canvas:canvas, x: xPiece * 4 - offset, y: 0, velocity: 9, height: canvas.height };
    }

    const pieces = [];        
          
    pieces.push(o(document.createElement('canvas')));
    pieces.push(l(document.createElement('canvas')));
    pieces.push(t(document.createElement('canvas')));
    pieces.push(i(document.createElement('canvas')));          

    return pieces;
}