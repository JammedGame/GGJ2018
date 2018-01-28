export { Actor }

import Engineer from "./Engineer";

import { Weapon } from "./Weapon";
import { Projectile } from "./Projectile";
import { Behaviour } from "./Behaviour";
import { Sniper } from "./Actors/Sniper";
import { Effects } from "./Effects";

class Actor extends Engineer.Sprite
{
    protected _Terminal:boolean;
    protected _Explosive:boolean;
    private _Speed:number;
    private _Health:number;
    private _MaxHealth:number;
    private _Possesed:boolean;
    private _Target:Actor;
    private _Weapon:Weapon;
    protected _Behaviour:Behaviour;
    protected _Scene:Engineer.Scene2D;
    private _OnActorPossesed:Function[];
    public get Terminal():boolean { return this._Terminal; }
    public get Speed():number { return this._Speed; }
    public set Speed(Value:number) { this._Speed = Value; }
    public get Dead():boolean { return this._Health <= 0; }
    public get Health():number { return this._Health; }
    public set Health(Value:number) { this._Health = Value; }
    public get MaxHealth():number { return this._MaxHealth; }
    public set MaxHealth(Value:number) { this._MaxHealth = Value; }
    public get Possesed():boolean { return this._Possesed; }
    public set Possesed(Value:boolean) { this._Possesed = Value; }
    public get Target():Actor { return this._Target; }
    public set Target(Value:Actor) { this._Target = Value; }
    public get Weapon():Weapon { return this._Weapon; }
    public set Weapon(Value:Weapon) { this._Weapon = Value; }
    public get OnActorPossesed():Function[] { return this._OnActorPossesed; }
    public set OnActorPossesed(Value:Function[]) { this._OnActorPossesed = Value; }
    public constructor(Old?:Actor, Scene?:Engineer.Scene2D, Location?:Engineer.Vertex)
    {
        super(Old);
        this.Init(Scene, Location);
    }
    public Init(Scene:Engineer.Scene2D, Location:Engineer.Vertex)
    {
        this._Terminal = false;
        this._Health = 100;
        this._MaxHealth = 100;
        this._Speed = 3;
        this._Scene = Scene;
        this._Explosive = false;
        this._OnActorPossesed = [];
        this._Behaviour = new Behaviour(null, Scene, this);
        this.Data["Collision"] = Engineer.CollisionType.Radius2D;
        this.Trans.Scale = new Engineer.Vertex(110,110,1);
        this.Trans.Translation = Location.Copy();
        this._Weapon = new Weapon(Scene, 10, new Projectile(null, 5, 5), '/Resources/Sounds/machinegunshot.wav');
        this.Events.MouseDown.push(this.OnClick.bind(this));
    }
    private OnClick(Game:Engineer.Game, Args:any) : boolean
    {
        if(Args.MouseButton == Engineer.MouseButton.Right)
        {
            for(let i in this._OnActorPossesed)
            {
                this._OnActorPossesed[i](this);
            }
        }
        else return false;
    }
    public Update() : void
    {
        if(this._Health <= 0)
        {
            if(this._Explosive) Effects.Single.GenerateExplosion(this.Trans.Translation);
            this.Destroy();
            return;
        }
        if(this._Weapon) this._Weapon.Update();
        if(this._Possesed) return;
        if(this._Behaviour) this._Behaviour.Act();
        // AI
    }
    private Destroy() : void
    {
        this._Scene.RemoveSceneObject(this);
    }
}