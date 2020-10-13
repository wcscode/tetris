export default class EngineState {
 
    static active = (name) => {

        this._name = name;
    }

    static add = (name) => {
        
        this._states = this._states == null ? [] : this._states;
        this._states[name] = name;
    }

    static get get() {

        return this._name;
    }

    static deleteAll = () => this._states = [];

}