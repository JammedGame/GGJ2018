export { HealthBar }

import Engineer from "./Engineer";

const BAR_WIDTH = 280;
const CDWN_HEIGHT = 90;

class HealthBar
{
    private _WasFull:boolean;
    private _Bar:Engineer.Tile;
    private _CDWN:Engineer.Tile;
    private _Scene:Engineer.Scene2D;
    public constructor(Scene:Engineer.Scene2D)
    {
        this._Scene = Scene;
        this.Init();
    }
    public Init()
    {
        let Hud = new Engineer.Tile();
        Hud.Collection = new Engineer.ImageCollection(null, ["Resources/Textures/HealthBar.png"]);
        Hud.Index = 0;
        Hud.Fixed = true;
        Hud.Trans.Scale = new Engineer.Vertex(450,150,0);
        Hud.Trans.Translation = new Engineer.Vertex(300,950,1.2);
        this._Scene.AddSceneObject(Hud);
        this._Bar = new Engineer.Tile();
        this._Bar.Fixed = true;
        this._Bar.Paint = Engineer.Color.FromString("#613950");
        this._Bar.Trans.Scale = new Engineer.Vertex(BAR_WIDTH,50,0);
        this._Bar.Trans.Translation = new Engineer.Vertex(350,950,1.1);
        this._Scene.AddSceneObject(this._Bar);
        this._CDWN = new Engineer.Tile();
        this._CDWN.Fixed = true;
        this._CDWN.Paint = Engineer.Color.FromString("#613950");
        this._CDWN.Trans.Scale = new Engineer.Vertex(90,CDWN_HEIGHT,0);
        this._CDWN.Trans.Translation = new Engineer.Vertex(150,950,1.1);
        this._Scene.AddSceneObject(this._CDWN);
    }
    public Update(Percent, Cooldown)
    {
        let Full = Cooldown == 200;
        Cooldown /= 200;
        let Ammount = Percent * BAR_WIDTH;
        let Offset = (1 - Percent) * BAR_WIDTH / 2;
        if(Percent < 0) Ammount = 0;
        this._Bar.Trans.Scale = new Engineer.Vertex(Ammount,50,1);
        this._Bar.Trans.Translation = new Engineer.Vertex(350 - Offset,950,1.1);
        let OffsetCDWN = (1-Cooldown) * CDWN_HEIGHT/2;
        this._CDWN.Trans.Translation = new Engineer.Vertex(150,950+OffsetCDWN,1.1);
        this._CDWN.Trans.Scale = new Engineer.Vertex(90, Cooldown * CDWN_HEIGHT, 1);
        if(Full && !this._WasFull)
        {
            this._CDWN.Paint = Engineer.Color.FromString("#F0E68C");
            this._CDWN.Modified = true;
        }
        else if(!Full && this._WasFull)
        {
            this._CDWN.Paint = Engineer.Color.FromString("#613950");
            this._CDWN.Modified = true;
        }
        this._WasFull = Full;
    }
}