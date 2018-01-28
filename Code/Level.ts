export { Level }

import Engineer from "./Engineer";

import { Player } from "./Player";
import { LevelGenerator } from "./LevelGenerator";
import { Actor } from "./Actor";
import { Sniper } from "./Actors/Sniper";
import { Heavy } from "./Actors/Heavy";
import { Weapon } from "./Weapon";
import { Prop, Box, Barrel } from "./Prop";
import { SoundObject } from "engineer-js";
import { TileCollection } from "engineer-js";
import { Effects } from "./Effects"

const FIELD_SIZE = 500;

class Level
{
    public static Single:Level;
    private _Actors:Actor[];
    private _Orphans:Weapon[];
    private _Scene:Engineer.Scene2D;
    private _Player:Player;
    private _Floors:Engineer.Tile[];
    private _Walls:Engineer.Tile[];
    private _Props:Prop[];
    private _Effects:Effects;
    private _UpdateTarget:boolean;
    private _FloorColl:TileCollection;
    private _WallColl:TileCollection;
    public get Actors():Actor[] { return this._Actors; }

    private _Sounds: SoundObject[];

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
        this._Orphans = [];
        this._Props = [];
        this._Effects = new Effects();
        let Back = new Engineer.Tile();
        Back.Collection = new Engineer.TileCollection(null, ["/Resources/Textures/Cosmos_2.png"]);
        this._FloorColl = new Engineer.TileCollection(null, ["/Resources/Textures/floor1.png"]);
        this._WallColl = new Engineer.TileCollection(null, ["/Resources/Textures/wall1.png"]);
        Back.Index = 0;
        Back.Trans.Translation = new Engineer.Vertex(960,540,0);
        Back.Trans.Scale = new Engineer.Vertex(1920,1080,0);
        Back.Fixed = true;
        this._Scene.AddSceneObject(Back);
        let LO = LevelGenerator.Generate(5);
        for(let i = 0; i < LO.Rooms.length; i++)
        {
            this.CreateRoom(LO.Rooms[i]);
        }
        for(let i = 0; i < LO.Enemy.length; i++)
        {
            this.AddActor(new Engineer.Vertex(LO.Enemy[i].X * FIELD_SIZE + FIELD_SIZE / 2, LO.Enemy[i].Y * FIELD_SIZE + FIELD_SIZE / 2,1), Engineer.Color.White);
        }
        for(let i = 0; i < LO.Props.length; i++)
        {
            this.AddProp(new Engineer.Vertex(LO.Props[i].X * FIELD_SIZE + FIELD_SIZE / 2, LO.Props[i].Y * FIELD_SIZE + FIELD_SIZE / 2,1), Engineer.Color.White);
        }
        this._Player.Actor = this._Actors[this._Actors.length - 1];
        this._UpdateTarget = true;
        this._Walls = this._Scene.GetObjectsWithData("Wall", true);

        this.InitSounds();
    }

    public InitSounds() : void
    {
        let sounds = [
            '/Resources/Sounds/fightpreparebassloop.mp3',
            '/Resources/Sounds/fightdrumloop.mp3',
        ].map(sound => new SoundObject(sound));
        

        sounds.forEach(sound => {
            sound.Looped = true;
            sound.Play();
        });

        sounds[0].Volume = 0.4;


        this._Sounds = sounds;

    }

    private AdjustSound() : void {
        let sounds = this._Sounds;

        sounds[0].Volume = 0.8;
        if (sounds[0]['_Sound'].seek() - sounds[1]['_Sound'].seek() > 0.05) {
            console.log('correcting seek');
            sounds[1]['_Sound'].seek(sounds[0]['_Sound'].seek());
        }
        let totalProjectiles = this._Actors.filter(actor => actor != this._Player.Actor).reduce((c, actor) => actor.Weapon.Projectiles.length + c, 0);
        let myProjectiles = this._Player.Actor.Weapon.Projectiles.length;
        sounds[0].Volume = Math.min(1, (totalProjectiles / 20));
        sounds[1].Volume = Math.min(sounds[0].Volume, (myProjectiles / 20));
    }

    public Update() : void
    {
        this._Effects.CheckActiveSplashes();
        this.AdjustSound();
        for(let i = this._Orphans.length - 1; i >= 0; i--)
        {
            this._Orphans[i].Update();
            if(this._Orphans[i].Done)
            {
                this._Orphans.splice(i,1);
            }
        }
        this.CheckProjectilesPlayer();
        for(let i = this._Actors.length - 1; i >= 0; i--)
        {
            if(this._UpdateTarget) this._Actors[i].Target = this._Player.Actor;
            this.CheckProjectiles(this._Actors[i]);
            this._Actors[i].Update();
            if(this._Actors[i].Dead)
            {
                if(!this._Actors[i].Weapon.Done) this._Orphans.push(this._Actors[i].Weapon);
                this._Actors.splice(i,1);
            }
        }
    }
    private CheckProjectiles(Actor:Actor) : void
    {
        if(Actor == this._Player.Actor) return;
        for(let i in this._Actors)
        {
            for(let j in this._Actors[i].Weapon.Projectiles)
            {
                let Projectile = this._Actors[i].Weapon.Projectiles[j];
                if(Engineer.Vertex.Distance(Actor.Trans.Translation, Projectile.Trans.Translation) < 40)
                {
                    if(Projectile.Owner == 0)
                    {
                        Actor.Health -= Projectile.Damage;
                        Projectile.Duration = 0;
                        this._Effects.GenerateSplash(Actor.Trans.Translation, this._Scene);
                    }
                }
            }
        }
    }
    private CheckProjectilesPlayer() : void
    {
        for(let i in this._Actors)
        {
            for(let j in this._Actors[i].Weapon.Projectiles)
            {
                let PlayerLoc = this._Player.ReprojectLocation();
                let Projectile = this._Actors[i].Weapon.Projectiles[j];
                if(Engineer.Vertex.Distance(PlayerLoc, Projectile.Trans.Translation) < 40)
                {
                    if(Projectile.Owner != 0)
                    {
                        this._Player.Actor.Health -= Projectile.Damage / 5;
                        Projectile.Duration = 0;
                        
                        this._Effects.GenerateSplash(this._Player.ReprojectLocation(), this._Scene);
                    }
                }
            }
        }
    }
    private AddActor(Location:Engineer.Vertex, Color:Engineer.Color, ActorClass?:String) : void
    {
        let NewActor = null;
        let Index = LevelGenerator.Rand(1,3);
        if(ActorClass == "Sniper") Index = 1;
        if(ActorClass == "Heavy") Index = 2;
        if (Index == 1)
        {
            NewActor = new Sniper(null, this._Scene, Location);
        }
        else
        {
            NewActor = new Heavy(null, this._Scene, Location);
        }
        NewActor.OnActorPossesed.push(this.ActorPossesed.bind(this));
        NewActor.Paint = Color;
        this._Actors.push(NewActor);
        this._Scene.AddSceneObject(NewActor);
    }
    private AddProp(Location:Engineer.Vertex, Color:Engineer.Color, PropClass?:String) : void
    {
        let Chance = LevelGenerator.Rand(1,4);
        if(Chance != 1) return;
        let NewProp = null;
        let Index = LevelGenerator.Rand(1,3);
        if(PropClass == "Barrel") Index = 1;
        if(PropClass == "Box") Index = 2;
        if (Index == 1)
        {
            NewProp = new Barrel(null, Location);
        }
        else
        {
            NewProp = new Box(null, Location);
        }
        NewProp.Paint = Color;
        this._Props.push(NewProp);
        this._Scene.AddSceneObject(NewProp);
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
        //Wall.Paint = Engineer.Color.FromString("#111111");
        Wall.Collection = this._WallColl;
        Wall.Index = 0;
        console.log(Length);
        if(Orientation == 0)
        {
            Wall.RepeatX = Length * 10;
        }
        else
        {
            Wall.RepeatY = Length * 10;
        }
        Wall.Data["Wall"] = true;
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
        Floor.Collection = this._FloorColl;
        Floor.RepeatX = XSize;
        Floor.RepeatY = YSize;
        Floor.Index = 0;
        //Floor.Paint = Engineer.Color.FromString("#F0E68C");
        Floor.Trans.Scale = new Engineer.Vertex(XSize * FIELD_SIZE, YSize * FIELD_SIZE, 1);
        Floor.Trans.Translation = new Engineer.Vertex(Location.X + XSize*FIELD_SIZE/2, Location.Y + YSize*FIELD_SIZE/2, 0.1);
        this._Floors.push(Floor);
        this._Scene.AddSceneObject(Floor);
    }
}