export { Level }

import Engineer from "./Engineer";

import { Player } from "./Player";
import { LevelGenerator } from "./LevelGenerator";
import { Actor } from "./Actor";
import { Sniper } from "./Actors/Sniper";

const FIELD_SIZE = 500;

class Level
{
    public static Single:Level;
    private _Actors:Actor[];
    private _Scene:Engineer.Scene2D;
    private _Player:Player;
    private _Floors:Engineer.Tile[];
    private _Walls:Engineer.Tile[];
    public get Actors():Actor[] { return this._Actors; }
    public constructor(Scene:Engineer.Scene2D, Player:Player)
    {
        this._Scene = Scene;
        this._Player = Player;
        this.Init();
        Level.Single = this;
    }
    public Init() : void
    {
        this._Floors = [];
        this._Walls = [];
        this._Actors = [];
        let LO = LevelGenerator.Generate(1);
        console.log(LO);
        for(let i = 0; i < LO.Rooms.length; i++)
        {
            this.CreateRoom(LO.Rooms[i]);
        }
        for(let i = 0; i < LO.Enemy.length; i++)
        {
            this.AddActor(new Engineer.Vertex(LO.Enemy[i].X * FIELD_SIZE + FIELD_SIZE / 2, LO.Enemy[i].Y * FIELD_SIZE + FIELD_SIZE / 2,1), Engineer.Color.Purple, "Sniper");
        }
        this._Player.Actor = this._Actors[this._Actors.length - 1];
    }
    private AddActor(Location:Engineer.Vertex, Color:Engineer.Color, ActorClass:String = null) : void
    {
        let NewActor = null;
        if (ActorClass == "Sniper") {
            NewActor = new Sniper(null, this._Scene, Location);
        }
        else {
            NewActor = new Actor(null, this._Scene, Location);
        }
        NewActor.OnActorPossesed.push(this.ActorPossesed.bind(this));
        NewActor.Paint = Color;
        this._Actors.push(NewActor);
        this._Scene.AddSceneObject(NewActor);
    }
    private ActorPossesed(Actor:Actor) : void
    {
        this._Player.Actor = Actor;
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
        this.CreateWall(new Engineer.Vertex(Room.X * FIELD_SIZE,Room.Y * FIELD_SIZE,0), Room.XS,0, Room.WT);
        this.CreateWall(new Engineer.Vertex(Room.X * FIELD_SIZE,Room.Y * FIELD_SIZE,0), Room.YS,1, Room.WL);
        this.CreateWall(new Engineer.Vertex(Room.X * FIELD_SIZE,Room.Y * FIELD_SIZE + Room.YS * FIELD_SIZE,0), Room.XS,0, Room.WB);
        this.CreateWall(new Engineer.Vertex(Room.X * FIELD_SIZE + Room.XS * FIELD_SIZE, Room.Y * FIELD_SIZE,0), Room.YS,1, Room.WR);
    }
    private CreateWall(Location:Engineer.Vertex, Length:number, Orientation:number, Layout:number[]) : void
    {
        let Parts = this.FindParts(Layout);
        for(let i in Parts)
        {
            if(Orientation == 0) this.CreateWallPart(new Engineer.Vertex(Location.X + Parts[i].S * FIELD_SIZE, Location.Y,0), Parts[i].L, Orientation);
            else this.CreateWallPart(new Engineer.Vertex(Location.X, Location.Y + Parts[i].S * FIELD_SIZE, 0), Parts[i].L, Orientation);
        }
    }
    private FindParts(Layout:number[]) : any[]
    {
        let Parts = [];
        let Start = 0;
        let Length = 0;
        for(let i = 0; i < Layout.length; i++)
        {
            if(Layout[i] == 0)
            {
                if(Length > 0)
                {
                    Parts.push({S:Start, L:Length});
                }
                Start = i+1;
                Length = 0;
            }
            else Length++;
        }
        if(Length > 0)
        {
            Parts.push({S:Start, L:Length});
        }
        return Parts;
    }
    private CreateWallPart(Location:Engineer.Vertex, Length:number, Orientation:number) : void
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