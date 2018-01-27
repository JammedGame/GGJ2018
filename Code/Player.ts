export { Player }

import Engineer from "./Engineer";

import { Actor } from "./Actor";

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

class Player
{
    private _Shoot:boolean;
    private _Angle:number;
    private _Actor:Actor;
    private _Movement:Movement;
    private _Scene:Engineer.Scene2D;
    public get Actor():Actor { return this._Actor; }
    public set Actor(Value:Actor)
    {
        if(this._Actor != null) this.ReprojectActor(this._Actor);
        this._Actor = Value;
        this.ProjectActor(this._Actor);
    }
    public constructor(Scene:Engineer.Scene2D)
    {
        this._Scene = Scene;
        this.Init();
    }
    public Init() : void
    {
        this._Shoot = false;
        this._Movement = new Movement();
        this._Scene.Events.KeyDown.push(this.KeyDown.bind(this));
        this._Scene.Events.KeyUp.push(this.KeyUp.bind(this));
        this._Scene.Events.MouseDown.push(this.MouseDown.bind(this));
        this._Scene.Events.MouseUp.push(this.MouseUp.bind(this));
        this._Scene.Events.MouseMove.push(this.MouseMove.bind(this));
        this._Scene.Events.TimeTick.push(this.Update.bind(this));
    }
    private KeyDown(Game:Engineer.Game, Args:any) : void
    {
        if(Args.KeyCode == 87) this._Movement.Up = true;
        if(Args.KeyCode == 83) this._Movement.Down = true;
        if(Args.KeyCode == 65) this._Movement.Left = true;
        if(Args.KeyCode == 68) this._Movement.Right = true;
    }
    private KeyUp(Game:Engineer.Game, Args:any) : void
    {
        if(Args.KeyCode == 87) this._Movement.Up = false;
        if(Args.KeyCode == 83) this._Movement.Down = false;
        if(Args.KeyCode == 65) this._Movement.Left = false;
        if(Args.KeyCode == 68) this._Movement.Right = false;
    }
    private MouseDown(Game:Engineer.Game, Args:any) : void
    {
        this._Shoot = true;
    }
    private MouseUp(Game:Engineer.Game, Args:any) : void
    {
        this._Shoot = false;
    }  
    private MouseMove(Game:Engineer.Game, Args:any) : void
    {
        let Zeroed = new Engineer.Vertex(Args.Location.X - SCREEN_WIDTH / 2, Args.Location.Y - SCREEN_HEIGHT / 2, 0);
        this._Angle = Engineer.Vertex.Angle(new Engineer.Vertex(0, 1, 0), Zeroed);
        this._Actor.Trans.Rotation.Z = this._Angle;;
    }   
    private Update() : void
    {
        if(this._Movement.Up) this._Scene.Trans.Translation.Y += 5;
        if(this._Movement.Down) this._Scene.Trans.Translation.Y -= 5;
        if(this._Movement.Left) this._Scene.Trans.Translation.X += 5;
        if(this._Movement.Right) this._Scene.Trans.Translation.X -= 5;
        if(!!this._Shoot) this._Actor.Weapon.Fire(this._Angle, this.ReprojectLocation());
    }
    private ProjectActor(Actor:Actor) : void
    {
        this._Actor.Possesed = true;
        this._Actor.Fixed = true;
        this._Scene.Trans.Translation.X = SCREEN_WIDTH / 2 - this._Actor.Trans.Translation.X;
        this._Scene.Trans.Translation.Y = SCREEN_HEIGHT / 2 - this._Actor.Trans.Translation.Y;
        this._Actor.Trans.Translation.X = SCREEN_WIDTH / 2;
        this._Actor.Trans.Translation.Y = SCREEN_HEIGHT / 2;
    }
    private ReprojectActor(Actor:Actor) : void
    {
        this._Actor.Possesed = false;
        this._Actor.Fixed = false;
        this._Actor.Trans.Translation.X = -this._Scene.Trans.Translation.X + SCREEN_WIDTH / 2 ;
        this._Actor.Trans.Translation.Y = -this._Scene.Trans.Translation.Y + SCREEN_HEIGHT / 2 ;
    }
    private ReprojectLocation() : Engineer.Vertex
    {
        let Reprojected:Engineer.Vertex = new Engineer.Vertex(0,0,0);
        Reprojected.X = -this._Scene.Trans.Translation.X + SCREEN_WIDTH / 2 ;
        Reprojected.Y = -this._Scene.Trans.Translation.Y + SCREEN_HEIGHT / 2 ;
        Reprojected.Z = this._Actor.Trans.Translation.Z;
        return Reprojected;
    }
}
class Movement
{
    public Up:boolean;
    public Down:boolean;
    public Left:boolean;
    public Right:boolean;
}