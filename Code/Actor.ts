export { Actor }

import Engineer from "./Engineer";

class Actor extends Engineer.Sprite
{
    private _Possesed:boolean;
    private _Target:Actor;
    private _OnActorPossesed:Function[];
    public get Possesed():boolean { return this._Possesed; }
    public set Possesed(Value:boolean) { this._Possesed = Value; }
    public get OnActorPossesed():Function[] { return this._OnActorPossesed; }
    public set OnActorPossesed(Value:Function[]) { this._OnActorPossesed = Value; }
    public constructor(Old?:Actor, Location?:Engineer.Vertex)
    {
        super(Old);
        this.Init(Location);
    }
    public Init(Location:Engineer.Vertex)
    {
        this._OnActorPossesed = [];
        this.Trans.Scale = new Engineer.Vertex(50,50,1);
        this.Events.MouseDown.push(this.OnClick.bind(this));
        if(Location) this.Trans.Translation = Location.Copy();
    }
    private OnClick(Game:Engineer.Game, Args:any) : void
    {
        if(Args.MouseButton == Engineer.MouseButton.Right)
        {
            for(let i in this._OnActorPossesed)
            {
                this._OnActorPossesed[i](this);
            }
        }
    }
}