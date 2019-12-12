export { Projectile }

import * as TBX from "toybox-engine";

import { Level } from "./Level";

class Projectile extends TBX.Tile
{
    private _Owner:number;
    private _Speed:number;
    private _Angle:number;
    private _Damage:number;
    private _Duration:number;
    public get Owner():number { return this._Owner; }
    public get Damage():number { return this._Damage; }
    public get Duration():number { return this._Duration; }
    public set Duration(Value:number) { this._Duration = Value; }
    public constructor(Old?:Projectile, Speed?:number, Damage?:number, Index?:number)
    {
        super(Old);
        if(Old != null)
        {
            this._Owner = Old._Owner;
            this._Speed = Old._Speed;
            this._Angle = Old._Angle;
            this._Damage = Old._Damage;
            this._Duration = Old._Duration;
        }
        else
        {
            this._Owner = 1;
            this._Speed = Speed;
            this._Damage = Damage;
            if(!Index) Index = 0;
            this.Init(Index);
        }
    }
    public Copy() : Projectile
    {
        return new Projectile(this);
    }
    private static Collection = new TBX.ImageCollection(null, ['Resources/Textures/bullet.png', 'Resources/Textures/sniper_bullet.png']);
    public Init(Index) : void
    {
        this.Trans.Scale = new TBX.Vertex(42,42,1);
        this.Data["Collision"] = TBX.CollisionType.Radius;
        this.Collection = Projectile.Collection;
        this.Index = Index;
        if(Index == 0)
        {
            this.Trans.Scale = new TBX.Vertex(20,20,1);
            this.Paint = TBX.Color.Maroon;
        }
        else {
            this.Trans.Scale = new TBX.Vertex(40,80,1);
            this.Paint = TBX.Color.Black;
        }
    }
    public Fire(Angle:number, Location:TBX.Vertex, Owner:number) : void
    {
        this._Angle = Angle;
        this._Owner = Owner;
        this.Trans.Translation = Location.Copy();
        this.Trans.Rotation.Z = Angle;
        this._Duration = Math.floor(1000 / this._Speed);
    }
    public Update() : void
    {
        if(this._Duration == 0) return;
        Level.Single.CheckCollision(this);
        if(this.Data["Collision_Wall"].Top || this.Data["Collision_Wall"].Bottom)
        {
            this._Angle = 180 - this._Angle;
            while(this._Angle < 0) this._Angle += 360;
            this.Trans.Rotation.Z = this._Angle;
        }
        else if(this.Data["Collision_Wall"].Left || this.Data["Collision_Wall"].Right)
        {
            this._Angle = -this._Angle;
            while(this._Angle < 0) this._Angle += 360;
            this.Trans.Rotation.Z = this._Angle;
        }
        let Direction:TBX.Vertex = new TBX.Vertex(0, this._Speed, 0);
        Direction.RotateZ(this._Angle);
        this.Trans.Translation.X += Direction.X;
        this.Trans.Translation.Y += Direction.Y;
        this._Duration--;
    }
}