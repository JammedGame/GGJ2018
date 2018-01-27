export { Actor }

import Engineer from "./Engineer";

import { Weapon } from "./Weapon";
import { Projectile } from "./Projectile";
import { Behaviour } from "./Behaviour";

class Actor extends Engineer.Sprite
{
    private _Health:number;
    private _Possesed:boolean;
    private _Target:Actor;
    private _Weapon:Weapon;
    private _Behaviour:Behaviour;
    private _Scene:Engineer.Scene2D;
    private _OnActorPossesed:Function[];
    public get Dead():boolean { return this._Health <= 0; }
    public get Health():number { return this._Health; }
    public set Health(Value:number) { this._Health = Value; }
    public get Possesed():boolean { return this._Possesed; }
    public set Possesed(Value:boolean) { this._Possesed = Value; }
    public get Target():Actor { return this._Target; }
    public set Target(Value:Actor) { this._Target = Value; }
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
        this._Health = 100;
        this._Scene = Scene;
        this._OnActorPossesed = [];
        this._Behaviour = new Behaviour(null, Scene, this);
        this.Data["Collision"] = Engineer.CollisionType.Radius2D;
        this.Trans.Scale = new Engineer.Vertex(50,50,1);
        this.Trans.Translation = Location.Copy();
        this._Weapon = new Weapon(Scene, 10, new Projectile(null, 20, 5));
        this.Events.MouseDown.push(this.OnClick.bind(this));
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
    public Update() : void
    {
        if(this._Health <= 0)
        {
            this.Destroy();
            return;
        }
        this._Weapon.Update();
        if(this._Possesed) return;
        this._Behaviour.Act();
        // AI
    }
    private Destroy() : void
    {
        this._Scene.RemoveSceneObject(this);
    }
}