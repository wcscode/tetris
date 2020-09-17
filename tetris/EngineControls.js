class EngineControl{

    static enableControls = () => document.addEventListener ('keypress', this.keyPress, false);
    static disbleControls = () => document.removeEventListener ('keypress', this.keyPress, false);   

    static keyPress = (event) => {

        return event.key;
    }
}