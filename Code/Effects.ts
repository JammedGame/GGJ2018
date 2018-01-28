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
    }
    public GenerateSplash(Location:Engineer.Vertex)
    {

    }
    public GenerateExplosion(Location:Engineer.Vertex)
    {
        
    }
}