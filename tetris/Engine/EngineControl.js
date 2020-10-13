export default class EngineControl{   

    constructor(window){

        this._window = window;
        this._commands = [];       

        window.addEventListener('keydown', this.keyDown);
        window.addEventListener('keyup', this.keyUp, false);       
    }

    addCommand = (playerName, commandKeyCode, commandName) => {
        
        this._commands.push({
            playerName: playerName,
            commandKeyCode: commandKeyCode, 
            commandName: commandName, 
            pressed: false,
            alreadyPressed: false,
            rateOfUptade: 8,
            timer: 0
        });
    }

    keyDown = (event) => {       
        
        const commandKeyCode = event.which || event.keyCode;
        
        const command = this._commands.find(f => f.commandKeyCode == commandKeyCode && !f.pressed);
       
        if(command) command.pressed = true; 
    }

    keyUp = (event) => {   
         
        const commandKeyCode = event.which || event.keyCode;

        const command = this._commands.find(f => f.commandKeyCode == commandKeyCode && f.pressed);

        if(command) { 

            command.pressed = false;       
            command.alreadyPressed = false;
        }
    }

    isPressed = (playerName, commandName) => {
        
        return this._commands.find(f => f.playerName == playerName && f.commandName == commandName).pressed;
    }

    isPressedOnce = (playerName, commandName) => {
       
        const command = this._commands.find(f => f.playerName == playerName && f.commandName == commandName);
       
        if(command.pressed && !command.alreadyPressed){
            
            command.alreadyPressed = true;
            return true;
        }

        return false;
    }

    isPressedWithRate = (playerName, commandName, rateOfUpdate, dt) => {        
     
        const command = this._commands.find(f => f.playerName == playerName && f.commandName == commandName);
        
        if(rateOfUpdate != null) command.rateOfUpdate = rateOfUpdate;

        return this.rate(command, dt) ? command.pressed : false;
    }

    rate = (command, dt) =>  {

        command.timer += Math.floor(1 * (1 + dt));
               
        if(command.timer % command.rateOfUpdate == 0) {
            
            command.timer = 0;
            return true;
        }

        return false;
    }
}