export { Actor }

import Engineer from "./Engineer";

class Actor extends Engineer.Sprite
{
    private _Possesed:boolean;
    private _Target:Actor;
    public get Possesed():boolean { return this._Possesed; }
    public set Possesed(Value:boolean) { this._Possesed = Value; }
    public constructor(Old?:Actor)
    {
        super(Old);
        this.Init();
    }
    public Init()
    {
        this.Paint = Engineer.Color.Purple;
        this.Trans.Scale = new Engineer.Vertex(50,50,1);
    }
}