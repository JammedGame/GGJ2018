export { Prop, Box, Barrel }

import Engineer from "./Engineer"

class Prop extends Engineer.Tile
{
    public constructor(Old?:Prop, Location?:Engineer.Vertex)
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
    private static Collection = new Engineer.TileCollection(null, ["/Resources/Textures/box.png"]);
    public constructor(Old?:Box, Location?:Engineer.Vertex)
    {
        super(Old, Location);
        if(Old != null)
        {
            
        }
        else
        {
            this.Data["Wall"] = true;
            this.Data["Collision"] = Engineer.CollisionType.Rectangular2D;
            this.Trans.Scale = new Engineer.Vertex(150,150,0);
            this.Collection = Box.Collection;
            this.Index = 0;
        }
    }
}

class Barrel extends Prop
{
    private static Collection = new Engineer.TileCollection(null, ["/Resources/Textures/bure.png"]);
    public constructor(Old?:Barrel, Location?:Engineer.Vertex)
    {
        super(Old, Location);
        if(Old != null)
        {
            
        }
        else
        {
            this.Data["Wall"] = true;
            this.Data["Collision"] = Engineer.CollisionType.Radius2D;
            this.Trans.Scale = new Engineer.Vertex(100,100,0);
            this.Collection = Barrel.Collection;
            this.Index = 0;
        }
    }
}

class ExplosiveBarrel extends Barrel
{
    public constructor(Old?:Barrel, Location?:Engineer.Vertex)
    {
        super(Old, Location);
        if(Old != null)
        {
            
        }
        else
        {
            this.Data["Wall"] = false;
            this.Paint = Engineer.Color.Red;
        }
    }
}