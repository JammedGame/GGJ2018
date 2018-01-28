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
            this.Trans.Scale = new Engineer.Vertex(200,200,0);
            this.Collection = new Engineer.TileCollection(null, ["/Resources/Textures/box.png"]);
            this.Index = 0;
        }
    }
}

class Barrel extends Prop
{
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
            this.Trans.Scale = new Engineer.Vertex(150,150,0);
            this.Collection = new Engineer.TileCollection(null, ["/Resources/Textures/bure.png"]);
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