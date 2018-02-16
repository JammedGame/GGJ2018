export { Effects }

import Engineer from "./Engineer";
import { Actor } from "./Actor";
import { ImageCollection, SpriteSet, Sprite, Vertex } from "engineer-js";


class Effects
{
    private _Seed:number;
    private _Scene:Engineer.Scene2D;
    public static Single:Effects;
    private _ActiveSplashes:Engineer.Tile[];
    private _ActiveExplosions:Engineer.Sprite[];
    private _ExplosionSet:SpriteSet;
    private _ImageCollection:ImageCollection;
    public constructor(Scene:Engineer.Scene2D)
    {
        this._Scene = Scene;
        this.Init();
    }
    public Init()
    {
        this._Seed = 0;
        Effects.Single = this;
        this._ActiveSplashes = [];
        this._ImageCollection = new Engineer.ImageCollection(null, [
            "Resources/Textures/Stains/Blood_1.png",
            "Resources/Textures/Stains/Blood_2.png",
            "Resources/Textures/Stains/Blood_5.png",
        ]);

        this._ExplosionSet = new SpriteSet(null, [
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

        this._ExplosionSet.Seed = 15;
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
                this._Scene.RemoveSceneObject(this._ActiveSplashes[i]);
                this._ActiveSplashes.splice(i,1);
            }
        }
    }
    public GenerateSplash(actor:Actor, Location:Engineer.Vertex)
    {
        let bloodTile = new Engineer.Tile();
        bloodTile.Trans.Translation = new Engineer.Vertex(Location.X, Location.Y, 0.2);
        bloodTile.Collection = this._ImageCollection;
        let size = (100 - actor.Health) * 3 
        bloodTile.Trans.Scale = new Engineer.Vertex(size, size, 0);
        bloodTile.Index = Math.round(2 * Math.random());
        bloodTile.Paint.A = 100;
        this._ActiveSplashes.push(bloodTile);
        this._Scene.AddSceneObject(bloodTile);
    }
    public GenerateExplosion(Location:Engineer.Vertex)
    {
        let explosion = new Sprite();
        explosion.SpriteSets.push(this._ExplosionSet);
        explosion.SetSpriteSet(0);
        explosion.Trans.Translation = new Engineer.Vertex(Location.X, Location.Y, 0.2);
        explosion.Events.SpriteSetAnimationComplete.push(() => {
            this._Scene.RemoveSceneObject(explosion);
        });

        explosion.Trans.Scale = new Engineer.Vertex(450, 450, 3);
        this._Scene.AddSceneObject(explosion);
    }
    public Clear()
    {
        for(let i in this._ActiveSplashes)
        {
            this._Scene.RemoveSceneObject(this._ActiveSplashes[i]);
        }
    }
}