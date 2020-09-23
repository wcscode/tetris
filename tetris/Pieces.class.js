export default class Piece{

    constructor(game, blockSide){
        
        this._game = game;
        this._blockSide = blockSide;      

        const i = { blocks: [

                0, 0, 0, 0,
                1, 1, 1, 1,
                0, 0, 0, 0,
                0, 0, 0, 0
            ],
            
            direction: 'UP',
            x: this._blockSide * 8, 
            y: 0,
            canFall: true,
            size: 4
        }

        const t = { blocks: [

                0, 0, 0,
                1, 1, 1,
                0, 1, 0            
            ],

            direction: 'UP',
            x: this._blockSide * 8, 
            y: 0,
            canFall: true,
            size: 3
        }

        const l = { blocks: [

                0, 0, 0,
                1, 1, 1,
                1, 0, 0           
            ],

            direction: 'UP',
            x: this._blockSide * 8, 
            y: 0,
            canFall: true,
            size: 3
        }

        const j = { blocks: [

                0, 0, 0,
                1, 1, 1,
                0, 0, 1           
            ],

            direction: 'UP',
            x: this._blockSide * 8, 
            y: 0,
            canFall: true,
            size: 3
        }

        const s = { blocks: [

                0, 0, 0,
                0, 1, 1,
                1, 1, 0            
            ],

            direction: 'UP',
            x: this._blockSide * 8, 
            y: 0,
            canFall: true,
            size: 3
        }   


        const z = { blocks: [

                0, 0, 0,
                1, 1, 0,
                0, 1, 1            
            ],

            direction: 'UP',
            x: this._blockSide * 8, 
            y: 0,
            canFall: true,
            size: 3
        }   

        const o =  { blocks: [

                1, 1,
                1, 1            
            ],

            direction: 'UP',
            x: this._blockSide * 9, 
            y: 0,
            canFall: true,
            size: 2
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
    }

    get blocks() { return this._currentPiece.blocks; }
    get x() { return this._currentPiece.x; }
    get y() { return this._currentPiece.y; }
    get size() { return this._currentPiece.size; }
    get lastMove() { return this._lastMove; }  
    get direction() { return this._currentPiece.direction; }
    get side() { return this._blockSide; } 

    new = () => {

       this._currentPiece = this._pieces[Math.floor((Math.random() * 7))];
       /* this._currentPiece = {
            blocks: this._pieces[0], //this._pieces[Math.floor((Math.random() * 4))],
            direction: 'UP',
            x: this._blockSide * 8, 
            y: 0,
            canFall: true
        }*/
    }

    moveDown = () => { this._currentPiece.y += this._blockSide; }
    moveLeft = () => { this._currentPiece.x += -this._blockSide; this._lastMove = 'LEFT'; }
    moveRight = () => { this._currentPiece.x += this._blockSide; this._lastMove = 'RIGHT'; }

    rotate = (clockWise = true) => {
        
        const positions = [

            {key:0, value:'UP'},
            {key:1, value:'LEFT'},
            {key:2, value:'DOWN'},
            {key:3, value:'RIGHT'}
        ];

        const key = (positions.find(f => f.value == this._currentPiece.direction).key + ((clockWise ? -1 : 1) % 4) + 4 ) % 4;       
        this._currentPiece.direction = positions.find(f => f.key == key).value;  
        
        this._lastMove = 'RIGHT';
    }
   
    get canFall() { return this._currentPiece.canFall }
    set canFall(value) { this._currentPiece.canFall = value }

    update = (dt) => {

        if(!this.canFall)
            this.new();              
        
        if (this._game.control.isPressedWithRate('PLAYER_1', 'UP', 8, dt))
            this.rotate();

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

        const size = this._currentPiece.size;

        for(let y = 0; y < size; ++y){
            
            for(let x = 0; x < size; ++x){

                let direction = this._currentPiece.direction;
                let block = this._currentPiece.blocks[this.position(direction, size, x, y)];               

                if(block == 1) {                  
                    this._game.context.fillStyle = 'red';
                    this._game.context.fillRect(this._currentPiece.x + this._blockSide * x, this._currentPiece.y + this._blockSide * y, this._blockSide, this._blockSide);                
                }
                else{
                    this._game.context.fillStyle = 'green';
                    this._game.context.fillRect(this._currentPiece.x + this._blockSide * x, this._currentPiece.y + this._blockSide * y, this._blockSide, this._blockSide);                
                }
            }            
        }
    }

    position = (direction, size, x, y) => {

       
        switch(direction) { 
            case 'RIGHT':
                return  6 + y  - (x * size);
            case 'DOWN':
                return 8 - (y * size) - x;
            case 'LEFT':
                return  2 - y + (x * size)
            default:
                return y * size + x;
        }
    }  
}