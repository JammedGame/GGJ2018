export { HealthBar }

import * as TBX from "toybox-engine";

const BAR_WIDTH = 280;
const CDWN_HEIGHT = 90;

class HealthBar
{
    private _BarLocation:number;
    private _WasFull:boolean;
    private _Bar:TBX.Tile;
    private _CDWN:TBX.Tile;
    private _Scene:TBX.Scene2D;
    public constructor(Scene:TBX.Scene2D)
    {
        if(TBX.Runner.Current.TouchscreenDevice()) this._BarLocation = 600;
        else this._BarLocation = 300;
        this._Scene = Scene;
        this.Init();
    }
    public Init()
    {
        let Hud = new TBX.Tile();
        Hud.Collection = new TBX.ImageCollection(null, ["Resources/Textures/HealthBar.png"]);
        Hud.Index = 0;
        Hud.Fixed = true;
        Hud.Trans.Scale = new TBX.Vertex(450,150,0);
        Hud.Trans.Translation = new TBX.Vertex(this._BarLocation,950,1.2);
        this._Scene.Attach(Hud);
        this._Bar = new TBX.Tile();
        this._Bar.Fixed = true;
        this._Bar.Paint = TBX.Color.FromString("#613950");
        this._Bar.Trans.Scale = new TBX.Vertex(BAR_WIDTH,50,0);
        this._Bar.Trans.Translation = new TBX.Vertex(this._BarLocation + 50,950,1.1);
        this._Scene.Attach(this._Bar);
        this._CDWN = new TBX.Tile();
        this._CDWN.Fixed = true;
        this._CDWN.Paint = TBX.Color.FromString("#613950");
        this._CDWN.Trans.Scale = new TBX.Vertex(90,CDWN_HEIGHT,0);
        this._CDWN.Trans.Translation = new TBX.Vertex(this._BarLocation - 150,950,1.1);
        this._Scene.Attach(this._CDWN);
    }
    public Update(Percent, Cooldown)
    {
        let Full = Cooldown == 200;
        Cooldown /= 200;
        let Ammount = Percent * BAR_WIDTH;
        let Offset = (1 - Percent) * BAR_WIDTH / 2;
        if(Percent < 0) Ammount = 0;
        this._Bar.Trans.Scale = new TBX.Vertex(Ammount,50,1);
        this._Bar.Trans.Translation = new TBX.Vertex(this._BarLocation + 50 - Offset,950,1.1);
        let OffsetCDWN = (1-Cooldown) * CDWN_HEIGHT/2;
        this._CDWN.Trans.Translation = new TBX.Vertex(this._BarLocation - 150,950+OffsetCDWN,1.1);
        this._CDWN.Trans.Scale = new TBX.Vertex(90, Cooldown * CDWN_HEIGHT, 1);
        if(Full && !this._WasFull)
        {
            this._CDWN.Paint = TBX.Color.FromString("#F0E68C");
            this._CDWN.Modified = true;
        }
        else if(!Full && this._WasFull)
        {
            this._CDWN.Paint = TBX.Color.FromString("#613950");
            this._CDWN.Modified = true;
        }
        this._WasFull = Full;
    }
}