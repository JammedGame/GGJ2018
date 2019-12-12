export { Effects }

import * as TBX from "toybox-engine";
import { Actor } from "./Actor";


class Effects
{
    private _Seed:number;
    private _Scene:TBX.Scene2D;
    public static Single:Effects;
    private _ActiveSplashes:TBX.Tile[];
    private _ActiveExplosions:TBX.Sprite[];
    private _ExplosionSet:TBX.SpriteSet;
    private _ImageCollection:TBX.ImageCollection;
    public constructor(Scene:TBX.Scene2D)
    {
        this._Scene = Scene;
        this.Init();
    }
    public Init()
    {
        this._Seed = 0;
        Effects.Single = this;
        this._ActiveSplashes = [];
        this._ImageCollection = new TBX.ImageCollection(null, [
            "Resources/Textures/Stains/Blood_1.png",
            "Resources/Textures/Stains/Blood_2.png",
            "Resources/Textures/Stains/Blood_5.png",
        ]);

        this._ExplosionSet = new TBX.SpriteSet(null, [
            'Resources/Textures/Explosion/Explosion_1.png',
            'Resources/Textures/Explosion/Explosion_2.png',
            'Resources/Textures/Explosion/Explosion_3.png',
            'Resources/Textures/Explosion/Explosion_4.png',
            'Resources/Textures/Explosion/Explosion_5.png',
            'Resources/Textures/Explosion/Explosion_6.png',
            'Resources/Textures/Explosion/Explosion_7.png',
            'Resources/Textures/Explosion/Explosion_8.png',
            'Resources/Textures/Explosion/Explosion_9.png',
            'Resources/Textures/Explosion/Explosion_10.png',
        ], 'walking')

        this._ExplosionSet.Seed = 7;
    }
    public CheckActiveSplashes()
    {
        this._Seed++;
        if(this._Seed != 10) return;
        this._Seed = 0;
        for(let i = this._ActiveSplashes.length - 1; i>=0; i--)
        {
            if (this._ActiveSplashes[i].Paint.A > 1)
            {
                this._ActiveSplashes[i].Paint.A -= 1;
            }
            else
            {
                this._Scene.Remove(this._ActiveSplashes[i]);
                this._ActiveSplashes.splice(i,1);
            }
        }
    }
    public GenerateSplash(actor:Actor, Location:TBX.Vertex)
    {
        let bloodTile = new TBX.Tile();
        bloodTile.Trans.Translation = new TBX.Vertex(Location.X, Location.Y, 0.2);
        bloodTile.Collection = this._ImageCollection;
        let size = (100 - actor.Health) * 3 
        bloodTile.Trans.Scale = new TBX.Vertex(size, size, 0);
        bloodTile.Index = Math.round(2 * Math.random());
        bloodTile.Paint.A = 100;
        this._ActiveSplashes.push(bloodTile);
        this._Scene.Attach(bloodTile);
    }
    public GenerateExplosion(Location:TBX.Vertex)
    {
        let explosion = new TBX.Sprite();
        explosion.SpriteSets.push(this._ExplosionSet);
        explosion.SetSpriteSet(0);
        explosion.Trans.Translation = new TBX.Vertex(Location.X, Location.Y, 0.2);
        explosion.Events.SetComplete.push(() => {
            this._Scene.Remove(explosion);
        });

        explosion.Trans.Scale = new TBX.Vertex(450, 450, 3);
        this._Scene.Attach(explosion);
    }
    public Clear()
    {
        for(let i in this._ActiveSplashes)
        {
            this._Scene.Remove(this._ActiveSplashes[i]);
        }
    }
}