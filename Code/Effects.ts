export { Effects }

import Engineer from "./Engineer";


class Effects
{
    public static Single:Effects;
    private _ActiveSplashes:Engineer.Tile[];
    private _ActiveExplosions:Engineer.Sprite[];
    public constructor()
    {
        this.Init();
    }
    public Init()
    {
        Effects.Single = this;
        this._ActiveSplashes = [];
    }
    public CheckActiveSplashes()
    {
        
        for(let i = this._ActiveSplashes.length - 1;i>=0; i--)
        {
            console.log(1);
            if (this._ActiveSplashes[i].Paint.A > 1)
            {
                this._ActiveSplashes[i].Paint.A -= 1;
            }
            else
            {
                this._ActiveSplashes.splice(i,1);
            }
        }
    }
    public GenerateSplash(Location:Engineer.Vertex, Scene:Engineer.Scene2D)
    {
        let bloodTile = new Engineer.Tile();
        bloodTile.Trans.Translation = new Engineer.Vertex(Location.X, Location.Y, 0);
        
        bloodTile.Collection = new Engineer.TileCollection(null, ["/Resources/Textures/Stains/Blood_1.png"]);
        bloodTile.Trans.Scale = new Engineer.Vertex(100,100,0);
        bloodTile.Index = 0;
        bloodTile.Paint.A = 100;
        this._ActiveSplashes.push(bloodTile);
        Scene.AddSceneObject(bloodTile);
    }
    public GenerateExplosion(Location:Engineer.Vertex)
    {
        
    }
}