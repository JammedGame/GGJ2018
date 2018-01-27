export { Actor }

import Engineer from "./Engineer";

class Actor extends Engineer.Tile
{
    private _Target:Actor;
    public constructor(Old?:Actor)
    {
        super(Old);
        this.Init();
    }
    public Init()
    {
        this.Index = -1;
        this.Paint = Engineer.Color.Purple;
        this.Trans.Scale = new Engineer.Vertex(50,50,1);
    }
}