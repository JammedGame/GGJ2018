export { GameScene };

import Engineer from "./Engineer";

class GameScene extends Engineer.Scene2D
{
    private _Pause:boolean;
    public get Pause():boolean { return this._Pause; }
    public set Pause(value:boolean) { this._Pause = value; }
    public constructor()
    {
        super();
        this.Init();
    }
    public Init(): void
    {
        this.BackColor = Engineer.Color.FromRGBA(0, 0, 0, 255);
        Engineer.Reader.ReadFile("/Assets/Scenes/Game.tsn", this.SceneLoaded.bind(this));
    }
    public SceneLoaded(DataString)
    {
        let Data = JSON.parse(DataString);
        if(Data.Type == "Scene") this.Deserialize(Data.Data);
    }
    private KeyPress(G: any, Args: any): void
    {
        if(this._Pause) return;
        // Key Code here
    }
    private SceneUpdate() : void
    {
        if(this._Pause) return;
        // Update Code here
    }
}