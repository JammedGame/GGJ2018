export { Prop, Box, Barrel }

import * as TBX from "toybox-engine";

class Prop extends TBX.Tile
{
    public constructor(Old?:Prop, Location?:TBX.Vertex)
    {
        super(Old);
        if(Old != null)
        {
            
        }
        else
        {
            this.Trans.Translation = Location;
        }
    }
}

class Box extends Prop
{
    private static Collection = new TBX.ImageCollection(null, ["Resources/Textures/box.png"]);
    public constructor(Old?:Box, Location?:TBX.Vertex)
    {
        super(Old, Location);
        if(Old != null)
        {
            
        }
        else
        {
            this.Data["Wall"] = true;
            this.Data["Collision"] = TBX.CollisionType.Rectangular;
            this.Trans.Scale = new TBX.Vertex(150,150,0);
            this.Collection = Box.Collection;
            this.Index = 0;
        }
    }
}

class Barrel extends Prop
{
    private static Collection = new TBX.ImageCollection(null, ["Resources/Textures/bure.png"]);
    public constructor(Old?:Barrel, Location?:TBX.Vertex)
    {
        super(Old, Location);
        if(Old != null)
        {
            
        }
        else
        {
            this.Data["Wall"] = true;
            this.Data["Collision"] = TBX.CollisionType.Radius;
            this.Trans.Scale = new TBX.Vertex(100,100,0);
            this.Collection = Barrel.Collection;
            this.Index = 0;
        }
    }
}

class ExplosiveBarrel extends Barrel
{
    public constructor(Old?:Barrel, Location?:TBX.Vertex)
    {
        super(Old, Location);
        if(Old != null)
        {
            
        }
        else
        {
            this.Data["Wall"] = false;
            this.Paint = TBX.Color.Red;
        }
    }
}