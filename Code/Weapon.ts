export { Weapon }

import Engineer from "./Engineer"

import { Projectile } from "./Projectile";

class Weapon
{
    private _Scene:Engineer.Scene2D;
    private _Cooldown:number;
    private _FireRate:number;
    private _Projectile:Projectile;
    private _Projectiles:Projectile[];
    public get Projectiles():Projectile[] { return this._Projectiles; }
    public constructor(Scene:Engineer.Scene2D ,FireRate:number, Projectile:Projectile)
    {
        this._Cooldown = 0;
        this._Scene = Scene;
        this._FireRate = FireRate;
        this._Projectile = Projectile;
        this._Projectiles = [];
    }
    public Fire(Angle:number, Location:Engineer.Vertex, Owner:number) : void
    {
        if(this._Cooldown > 0)
        {
            this._Cooldown--;
            return;
        }
        let NewProjectile:Projectile = this._Projectile.Copy();
        NewProjectile.Data["Collision"] = Engineer.CollisionType.Radius2D;
        this._Projectiles.push(NewProjectile);
        NewProjectile.Fire(Angle - 90, Location, Owner);
        this._Scene.AddSceneObject(NewProjectile);
        this._Cooldown = this._FireRate;
    }
    public Update() : void
    {
        for(let i = this._Projectiles.length - 1; i >= 0; i--)
        {
            if(this._Projectiles[i].Duration == 0)
            {
                this._Scene.RemoveSceneObject(this._Projectiles[i]);
                this._Projectiles.splice(i,1);
            }
            else
            {
                this._Projectiles[i].Update();
            }
        }
    }
}