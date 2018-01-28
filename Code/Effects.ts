export { Effects }

import Engineer from "./Engineer";


class Effects
{
    private _Seed:number;
    private _Scene:Engineer.Scene2D;
    public static Single:Effects;
    private _ActiveSplashes:Engineer.Tile[];
    private _ActiveExplosions:Engineer.Sprite[];
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
    public GenerateSplash(Location:Engineer.Vertex)
    {
        let bloodTile = new Engineer.Tile();
        bloodTile.Trans.Translation = new Engineer.Vertex(Location.X, Location.Y, 0.2);
        bloodTile.Collection = new Engineer.TileCollection(null, ["/Resources/Textures/Stains/Blood_1.png"]);
        bloodTile.Trans.Scale = new Engineer.Vertex(100,100,0);
        bloodTile.Index = 0;
        bloodTile.Paint.A = 100;
        this._ActiveSplashes.push(bloodTile);
        this._Scene.AddSceneObject(bloodTile);
    }
    public GenerateExplosion(Location:Engineer.Vertex)
    {
        
    }
}