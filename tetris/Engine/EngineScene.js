export default class EngineScene{
    
    static get getAll() {

        return this._scenes;
    }

    static active(name) {

        this._name = name;
    }

    static add = (scene) => {
        
        this._scenes = this._scenes == null ? [] : this._scenes;
        this._scenes[scene.name] = scene;
    }

    static get get() {

        return this._name;
    }

    static update = (dt) => {

        this._scenes[this._name].update(dt);
    }

    static render = () => {

        this._scenes[this._name].render();
    }
}