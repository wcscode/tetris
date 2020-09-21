export default class StartScene{

    constructor(game){
        
        this._game = game;
        this._context = game.context;
        this._config = game.config;

        this._aggregate = 0;
        this._aggregateRate = 2;

        this._transitionAlpha = 0;
        this._transitionRate = 0.02;
     
       // this._preRenderPieces = this.preRenderPieces(this._pieces);   
       this._preRenderBackgroundPieces = this.preRenderBackgroundPieces();      
    }

    get name() { return 'START' }

    update = (dt) => {        
        
        if (this._game.control.isPressed('PLAYER_1', 'START'))
            this._game.state.active('START_SCENE_TRANSITION_BEGIN');

        this._aggregate += dt * this._aggregateRate; 

        if (this._aggregate > 2) this._aggregate = 0;

        this._blink = Math.trunc(this._aggregate) % 2 == 0;               
    
        if (this._angle >= Math.PI * 2) this._angle = this._speed;
    

        this._preRenderBackgroundPieces.forEach(piece => {                    
            piece.y += piece.velocity * ( 1 + dt);

            if(piece.y > this._game.config.canvasHeight) piece.y = - piece.height;
        });

        if(this._game.state.get == 'START_SCENE_TRANSITION_BEGIN'){

            this._transitionAlpha += Math.min(1, this._transitionRate);
            this._blink = true;

            if(this._transitionAlpha >= 1) {

                this._game.state.active('PLAY_SCENE_TRANSITION_END');
                this._game.scene.active('PLAY')
            }
        }   

    }

    render = () => {
        
        
        this._context.clearRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);   
        
       
        this._context.fillStyle = '#ffccdd';
        this._context.fillRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);        
        this._context.fill();      

        this._context.fillStyle = '#ffbbbb';
        this._context.fillRect(0, 0, this._config.canvasWidth / 6, this._config.canvasHeight);        
        this._context.fill();

        this._context.fillStyle = '#ffbbbb';
        this._context.fillRect(this._config.canvasWidth - this._config.canvasWidth / 6, 0, this._config.canvasWidth / 6, this._config.canvasHeight);        
        this._context.fill();

        this._preRenderBackgroundPieces.forEach(piece => {

            this._context.drawImage(piece.image, piece.x, piece.y);
        });

        this._context.beginPath(); 
        this._context.font = '70px Tetris';
        this._context.fillStyle = '#5F5753';
        this._context.textAlign = 'center';
        this._context.textBaseline = 'middle';
        this._context.fillText('TETRIS', this._config.canvasCenterX, this._config.canvasCenterY);
        
        if(this._blink){
        
            this._context.beginPath();
            this._context.font = '30px Arcade';
            this._context.fillStyle = '#5F5753';
            this._context.textAlign = 'center';
            this._context.textBaseline = 'middle';
            this._context.fillText('PRESS ENTER', this._config.canvasCenterX, this._config.canvasCenterY + 50);
        }  

        this._context.fillStyle = `rgba(255, 255, 255, ${this._transitionAlpha})`;
        this._context.fillRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);    
    }   
 
    preRenderBackgroundPieces = () => {
        
        const { canvasWidth } = this._game.config        
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

            return {image:canvas, x: xPiece - offset, y: 100, velocity: 10, height: canvas.height};
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
            
            return {image:canvas, x: xPiece * 2 - offset, y: -200, velocity: 6, height: canvas.height };
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
            
            return {image:canvas, x: xPiece * 3 - offset, y: - 100, velocity: 7, height: canvas.height };
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
            
            return {image:canvas, x: xPiece * 4 - offset, y: 0, velocity: 9, height: canvas.height };
        }

        const pieces = [];
    
        //let canvas = document.createElement('canvas');        
        pieces.push(o(document.createElement('canvas')));
        pieces.push(l(document.createElement('canvas')));
        pieces.push(t(document.createElement('canvas')));
        pieces.push(i(document.createElement('canvas')));

        
        return pieces;
    }
    
   /* preRenderPieces = () => {
       
        this._pieces = [
            {
                angle:0,
                fillStyle: '#32AE5B',
                strokeStyle: '#32AE5B',
                coord: {x:0, y:0},
                blocks:[
                    {x:0, y:0},
                    {x:20, y:0},
                    {x:40, y:0},
                    {x:20, y:20}
            ]},
            {
                angle:Math.PI / 2,
                fillStyle: '#009DB8',
                strokeStyle: '#009DB8',
                coord: {x:10, y:10},
                blocks:[
                    {x:0, y:0},
                    {x:0, y:20},
                    {x:0, y:40},
                    {x:20, y:40}
            ]},
            {
                angle:Math.PI,
                fillStyle: '#AF1F07',
                strokeStyle: '#AF1F07',
                coord: {x:10, y:10},
                blocks:[
                    {x:0, y:0},
                    {x:0, y:20},
                    {x:0, y:40},
                    {x:0, y:60}
            ]},
            {
                angle:Math.PI + (Math.PI / 2),
                fillStyle: '#D6AD05',
                strokeStyle: '#D6AD05',
                coord: {x:10, y:10},
                blocks:[
                    {x:40, y:0},
                    {x:20, y:0},
                    {x:20, y:20},
                    {x:0, y:20}
                    
            ]}
        ];            
        

        const preRenderedPieces = [];

        this._pieces.forEach(piece => {
           
            //this._context.translate(-300, -20); 

            let canvasPiece = document.createElement('canvas');

            canvasPiece.width = 64;
            canvasPiece.height = 64; 

            let contextPiece = canvasPiece.getContext('2d');

            contextPiece.fillStyle = piece.fillStyle;
            contextPiece.strokeStyle = piece.strokeStyle;
            

            piece.blocks.forEach(block => {   

                contextPiece.beginPath();
                contextPiece.fillRect(block.x, block.y, 20, 20);            
                contextPiece.strokeRect(block.x, block.y, 20, 20);            
                this._context.closePath();

            });

            preRenderedPieces.push({image:canvasPiece, piece});

        });  

        return preRenderedPieces;
    }*/
}