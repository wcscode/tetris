export default class EngineControl{   

    constructor(window){

        this._window = window;
        this._commands = [];
      
        window.addEventListener ('keydown', this.keyDown);
        window.addEventListener ('keyup', this.keyUp, false);
    }

    addCommand = (playerName, commandKeyCode, commandName) => {
        
        this._commands.push({
            playerName: playerName,
            commandKeyCode: commandKeyCode, 
            commandName: commandName, 
            pressed: false
        });
    }

    keyDown = (event) => {       
        const commandKeyCode = event.which || event.keyCode;
        
        const command = this._commands.find(f => f.commandKeyCode == commandKeyCode && !f.pressed);

        if(command) command.pressed = true; 

       // this._commands.filter(f => f.pressed).map(m => console.log(m.commandKeyName + ' = ' + m.pressed));
      //  }
    }

    keyUp = (event) => {   
         
        const commandKeyCode = event.which || event.keyCode;

        const command = this._commands.find(f => f.commandKeyCode == commandKeyCode && f.pressed);

        if(command) command.pressed = false; 
        //   this._commands.filter(f => !f.pressed).map(m => console.log(m.commandKeyName + ' = ' + m.pressed));
       // }
    }

    isPressed = (playerName, commandName, canHold = false) => {

        return this._commands.find(f => f.playerName == playerName && f.commandName == commandName).pressed;
    }
}