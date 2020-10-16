export default class Piece{

    constructor(game, blockSide){
        
        this._game = game;
        this._blockSide = blockSide;
        
        const { canvasWidth } = this._game.config;
        const offsetInitialX = (canvasWidth / 5);

        const i = { blocks: [

                0, 0, 0, 0,
                1, 1, 1, 1,
                0, 0, 0, 0,
                0, 0, 0, 0
            ],
            
            direction: 'UP',
            x: offsetInitialX + this._blockSide * 6, 
            y: 0,
            canFall: true,
            size: 4,
            allowedPosition: 2,
            offsetX: offsetInitialX + this._blockSide * 3,
            offsetY: 0,
            color: '#59564F'
        };

        const t = { blocks: [

                0, 0, 0,
                1, 1, 1,
                0, 1, 0            
            ],

            direction: 'UP',
            x: offsetInitialX + this._blockSide * 6, 
            y: 0,
            canFall: true,
            size: 3,
            allowedPosition: 4,
            offsetX: offsetInitialX + this._blockSide * 3,
            offsetY: 0
        };

        const l = { blocks: [

                0, 0, 0,
                1, 1, 1,
                1, 0, 0           
            ],

            direction: 'UP',
            x: offsetInitialX + this._blockSide * 6, 
            y: 0,
            canFall: true,
            size: 3,
            allowedPosition: 4,
            offsetX: offsetInitialX + this._blockSide * 3,
            offsetY: 0
        };

        const j = { blocks: [

                0, 0, 0,
                1, 1, 1,
                0, 0, 1           
            ],

            direction: 'UP',
            x: offsetInitialX + this._blockSide * 6, 
            y: 0,
            canFall: true,
            size: 3,
            allowedPosition: 4,
            offsetX: offsetInitialX + this._blockSide * 3,
            offsetY: 0
        };

        const s = { blocks: [

                0, 0, 0,
                0, 1, 1,
                1, 1, 0            
            ],

            direction: 'UP',
            x: offsetInitialX + this._blockSide * 6, 
            y: 0,
            canFall: true,
            size: 3,
            allowedPosition: 2,
            offsetX: offsetInitialX + this._blockSide * 3,
            offsetY: 0
        };   


        const z = { blocks: [

                0, 0, 0,
                1, 1, 0,
                0, 1, 1            
            ],

            direction: 'UP',
            x: offsetInitialX + this._blockSide * 6, 
            y: 0,
            canFall: true,
            size: 3,
            allowedPosition: 2,
            offsetX: offsetInitialX + this._blockSide * 3,
            offsetY: 0
        };   

        const o =  { blocks: [

                1, 1,
                1, 1            
            ],

            direction: 'UP',
            x: offsetInitialX + this._blockSide * 7, 
            y: 0,
            canFall: true,
            size: 2,
            allowedPosition: 1,
            offsetX: offsetInitialX + this._blockSide * 3,
            offsetY: 0
        };
             
        this._pieces = [];
        
        this._pieces.push(i);
        this._pieces.push(t);
        this._pieces.push(l); 
        this._pieces.push(j); 
        this._pieces.push(s); 
        this._pieces.push(z);
        this._pieces.push(o);

        this._tickMovement = 0;
        this._lastMovements = this._game.control;// new Set();
    }

    get blocks() { return this._currentPiece.blocks; }    
    get x() { return this._currentPiece.x; }
    get y() { return this._currentPiece.y; }
    get size() { return this._currentPiece.size; }   
    get lastMovements() { return this._lastMovements; }  
    get direction() { return this._currentPiece.direction; }
    get side() { return this._blockSide; } 
    get offsetX() { return this._currentPiece.x - this._currentPiece.offsetX; }
    get offsetY() { return this._currentPiece.y - this._currentPiece.offsetY; }

    new = () => {
        
        this._currentPiece = Object.assign({}, this._pieces[0]);
      // this._currentPiece = this._pieces[Math.floor((Math.random() * 7))];
       
    }

    moveUp = () => { this._currentPiece.y -= this._blockSide; }
    moveDown = () => { if(this._currentPiece.canFall) this._currentPiece.y += this._blockSide; }
    moveLeft = () => { this._currentPiece.x += -this._blockSide; }
    moveRight = () => { this._currentPiece.x += this._blockSide; }

    rotate = (clockWise = true, keep = false) => {
        
        //if(!this._currentPiece.canFall)
        //    return;

        const positions = [

            {key:0, value:'UP'},
            {key:1, value:'LEFT'},
            {key:2, value:'DOWN'},
            {key:3, value:'RIGHT'}
        ];

        const { allowedPosition, direction } = this._currentPiece;
        
        const key = (positions.find(f => f.value == direction).key + ((clockWise ? -1 : 1) % allowedPosition) + allowedPosition ) % allowedPosition;       
        this._currentPiece.direction = positions.find(f => f.key == key).value;  
        
  
    }
   
    get canFall() { return this._currentPiece.canFall }
    set canFall(value) { this._currentPiece.canFall = value }

    update = (dt) => {

        //if(!this.canFall)
        //    this.new();              
        
        if (this._game.control.isPressedOnce('PLAYER_1', 'ROTATE'))
            this.rotate(true);

        if (this._game.control.isPressedWithRate('PLAYER_1', 'RIGHT', 4, dt))
            this.moveRight();

        if (this._game.control.isPressedWithRate('PLAYER_1', 'LEFT', 4, dt))
            this.moveLeft(); 
            
        if (this._game.control.isPressedWithRate('PLAYER_1', 'DOWN', 4, dt))
            this.moveDown();     
        
    }

    render = () => {
        
        this._game.context.beginPath();
        this._game.context.fillStyle = 'red';

        const { size, direction, blocks } = this._currentPiece;
        const length =  blocks.length;

        for(let y = 0; y < size; ++y){
            
            for(let x = 0; x < size; ++x){

               
                let block = this._currentPiece.blocks[this.position(direction, length, size, x, y)];               

                if(this._game.config.debugMode) {
                    this._game.context.fillStyle = 'white';
                    this._game.context.fillRect(this._currentPiece.x + this._blockSide * x, this._currentPiece.y + this._blockSide * y, this._blockSide, this._blockSide);                
                }

                if(block == 1) {                  
                    this._game.context.fillStyle = 'red';
                    this._game.context.fillRect(this._currentPiece.x + this._blockSide * x, this._currentPiece.y + this._blockSide * y, this._blockSide, this._blockSide);                
                }
               
              
            }            
        }
    }

    position = (direction, length, size, x, y) => {

       
        switch(direction) { 
            case 'RIGHT':
                return  (length - size) + y  - (x * size);
            case 'DOWN':
                return (length - 1) - (y * size) - x;
            case 'LEFT':
                return  (size - 1) - y + (x * size)
            default:
                return y * size + x;
        }
    } 
}