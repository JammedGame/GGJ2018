export { Weapon }

import Engineer from "./Engineer"

import { Projectile } from "./Projectile";

class Weapon
{
    private _FireRate:number;
    private _Projectile:Projectile;
    private _Projectiles:Projectile[];
    public constructor(FireRate:number, Projectile:Projectile)
    {
        this._FireRate = FireRate;
        this._Projectile = Projectile;
        this._Projectiles = [];
    }
    public Fire(Scene:Engineer.Scene2D, Angle:number, Location:Engineer.Vertex) : void
    {
        let NewProjectile:Projectile = this._Projectile.Copy();
        this._Projectiles.push(NewProjectile);
        NewProjectile.Fire(Angle - 90, Location);
        Scene.AddSceneObject(NewProjectile);
        Scene.Events.TimeTick.push(NewProjectile.Update.bind(NewProjectile));
    }
}