export default class Piece{

    constructor(game, blockSide){
        
        this._game = game;
        this._blockSide = blockSide;

        const o =  [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0
        ];

        const i =  [
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0
        ];

        const z =  [
            0, 0, 1, 0,
            0, 1, 1, 0,
            0, 1, 0, 0,
            0, 0, 0, 0
        ];

        const t =  [
            0, 0, 1, 0,
            0, 1, 1, 0,
            0, 0, 1, 0,
            0, 0, 0, 0
        ];

        const l =  [
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0
        ];
             
        this._pieces = [];

        this._pieces.push(o);
        this._pieces.push(i);
        this._pieces.push(z);
        this._pieces.push(t);
        this._pieces.push(l); 

        this._tickMovement = 0;
    }

    new = () => {

        this._currentPiece = {
            blocks: this._pieces[Math.floor((Math.random() * 4))],
            direction: 'UP',
            x: this._blockSide * 8, 
            y: 0,
            canFall: true
        }
    }

    moveDown = () => { this._currentPiece.y += this._blockSide; }
    moveLeft = () => { this._currentPiece.x += -this._blockSide; }
    moveRight = () => { this._currentPiece.x += this._blockSide; }
    rotate = () => {

        const positions = ['UP', 'LEFT', 'DOWN', 'RIGHT'];

        const direction = this._currentPiece.direction;
    }

    get canFall() { return this._currentPiece.canFall }
    set canFall(value) { this._currentPiece.canFall = value }

    update = (dt) => {

        if(!this.canFall)
            this.new();              
        
        if (this._game.control.isPressedWithRate('PLAYER_1', 'RIGHT', 2, dt))
            this.rotate();

        if (this._game.control.isPressedWithRate('PLAYER_1', 'RIGHT', 2, dt))
            this.moveRight();

        if (this._game.control.isPressedWithRate('PLAYER_1', 'LEFT', 2, dt))
            this.moveLeft();      
        
    }

    render = () => {
        
        this._game.context.beginPath();
        this._game.context.fillStyle = 'red';

        for(let y = 0; y < 4; ++y){

            for(let x = 0; x < 4; ++x){

                let direction = this._currentPiece.direction;
                let block = this._currentPiece.blocks[this.position(direction, {x, y})];
                if(block == 1)
                    this._game.context.fillRect(this._currentPiece.x + this._blockSide * x, this._currentPiece.y + this._blockSide * y, this._blockSide, this._blockSide);
            }
        }
       

    }


    //0  i = y * w + x
    //90 i = 12 + y - (x * 4)
    //180 i = 15 - ( x * 4) - x
    //270 i = 13 + y  *(x * 4)
    position = (direction, vectorPosition) => {

        const { x, y } = vectorPosition;

        switch(direction) { 
            case 'LEFT':
                return 12 + y - (x * 4)
            case 'DOWN':
                return 15 - ( x * 4) - x;
            case 'RIGHT':
                return 13 + y  *(x * 4);
            default:
                return y * 4 + x;
        }
    }  
}