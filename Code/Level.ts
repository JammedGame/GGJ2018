export { Level }

import Engineer from "./Engineer";

const FIELD_SIZE = 500;

class Level
{
    public static Single:Level;

    private _Scene:Engineer.Scene2D;
    private _Floors:Engineer.Tile[];
    private _Walls:Engineer.Tile[];
    public constructor(Scene:Engineer.Scene2D)
    {
        this._Scene = Scene;
        this.Init();
        Level.Single = this;
    }
    public Init() : void
    {
        this._Floors = [];
        this._Walls = [];
        this.CreateRoom({X:0, Y:0, XS:5, YS:4});
    }
    public CheckCollision(Item:Engineer.DrawObject) : void
    {
        //Engineer.CollisionUtil.CalculateObjectCollisions("Wall", Item, this._Walls);
        Item.Data["Collision_Wall"] = new Engineer.CollisionValue();
        let Collider1 = new Engineer.ColliderObject();
        Collider1 = Engineer.Convert.DrawObjectToCollider(Item);
        let Colliders = this._Walls;
        for(let i = 0; i < Colliders.length; i++)
        {
            let Collider2 = Engineer.Convert.DrawObjectToCollider(Colliders[i]);
            let CollisionValue = Engineer.Collision.Check(Collider1, Collider2);
            if(CollisionValue.Collision)
            {
                Item.Data["Collision_Wall"] = Engineer.CollisionValue.Combine(Item.Data["Collision_Wall"], CollisionValue);
            }
        }
    }
    public CheckPlayerCollision(Item:Engineer.DrawObject, Location:Engineer.Vertex) : void
    {
        Item.Data["Collision_Wall"] = new Engineer.CollisionValue();
        let Collider1 = new Engineer.ColliderObject();
        Collider1.Position = Location;
        Collider1.Scale = Item.Trans.Scale;
        Collider1.Type = Item.Data["Collision"];
        let Colliders = this._Walls;
        for(let i = 0; i < Colliders.length; i++)
        {
            let Collider2 = Engineer.Convert.DrawObjectToCollider(Colliders[i]);
            let CollisionValue = Engineer.Collision.Check(Collider1, Collider2);
            if(CollisionValue.Collision)
            {
                Item.Data["Collision_Wall"] = Engineer.CollisionValue.Combine(Item.Data["Collision_Wall"], CollisionValue);
            }
        }
    }
    private CreateRoom(Room:any)
    {
        this.CreateFloor(new Engineer.Vertex(Room.X * FIELD_SIZE,Room.Y * FIELD_SIZE,0), Room.XS, Room.YS);
        this.CreateWall(new Engineer.Vertex(Room.X * FIELD_SIZE,Room.Y * FIELD_SIZE,0), Room.XS,0);
        this.CreateWall(new Engineer.Vertex(Room.X * FIELD_SIZE,Room.Y * FIELD_SIZE,0), Room.YS,1);
        this.CreateWall(new Engineer.Vertex(Room.X * FIELD_SIZE,Room.Y * FIELD_SIZE + Room.YS * FIELD_SIZE,0), Room.XS,0);
        this.CreateWall(new Engineer.Vertex(Room.X * FIELD_SIZE + Room.XS * FIELD_SIZE, Room.Y * FIELD_SIZE,0), Room.YS,1);
    }
    private CreateWall(Location:Engineer.Vertex, Length:number, Orientation:number) : void
    {
        let Wall:Engineer.Tile = new Engineer.Tile();
        Wall.Paint = Engineer.Color.FromString("#111111");
        Wall.Data["Collision"] = Engineer.CollisionType.Rectangular2D;
        if(Orientation == 0)
        {
            Wall.Trans.Scale = new Engineer.Vertex(Length * FIELD_SIZE + 50, 50, 1);
            Wall.Trans.Translation = new Engineer.Vertex(Location.X + Length * FIELD_SIZE/2 + 25, Location.Y + 25, 0.5);
        }
        else
        {
            Wall.Trans.Scale = new Engineer.Vertex(50, Length * FIELD_SIZE + 50, 1);
            Wall.Trans.Translation = new Engineer.Vertex(Location.X + 25, Location.Y + Length * FIELD_SIZE/2 + 25, 0.5);
        }
        this._Walls.push(Wall);
        this._Scene.AddSceneObject(Wall);
    }
    private CreateFloor(Location:Engineer.Vertex, XSize:number, YSize:number) : void
    {
        let Floor:Engineer.Tile = new Engineer.Tile();
        Floor.Paint = Engineer.Color.FromString("#F0E68C");
        Floor.Trans.Scale = new Engineer.Vertex(XSize * FIELD_SIZE, YSize * FIELD_SIZE, 1);
        Floor.Trans.Translation = new Engineer.Vertex(Location.X + XSize*FIELD_SIZE/2, Location.Y + YSize*FIELD_SIZE/2, 0.1);
        this._Floors.push(Floor);
        this._Scene.AddSceneObject(Floor);
    }
}