export { Actor }

import Engineer from "./Engineer";

import { Weapon } from "./Weapon";
import { Projectile } from "./Projectile";

class Actor extends Engineer.Sprite
{
    private _Possesed:boolean;
    private _Target:Actor;
    private _Weapon:Weapon;
    private _Scene:Engineer.Scene2D;
    private _OnActorPossesed:Function[];
    public get Possesed():boolean { return this._Possesed; }
    public set Possesed(Value:boolean) { this._Possesed = Value; }
    public get Weapon():Weapon { return this._Weapon; }
    public get OnActorPossesed():Function[] { return this._OnActorPossesed; }
    public set OnActorPossesed(Value:Function[]) { this._OnActorPossesed = Value; }
    public constructor(Old?:Actor, Scene?:Engineer.Scene2D, Location?:Engineer.Vertex)
    {
        super(Old);
        this.Init(Scene, Location);
    }
    public Init(Scene:Engineer.Scene2D, Location:Engineer.Vertex)
    {
        this._Scene = Scene;
        this._OnActorPossesed = [];
        this.Trans.Scale = new Engineer.Vertex(50,50,1);
        this.Trans.Translation = Location.Copy();
        this._Weapon = new Weapon(10, new Projectile(null, 10, 10));
        this.Events.MouseDown.push(this.OnClick.bind(this));
        this._Scene.Events.TimeTick.push(this.Update.bind(this));
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
    private Update() : void
    {
        if(this._Possesed) return;
        // AI
    }
}