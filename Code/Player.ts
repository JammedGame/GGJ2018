export { Player }

import Engineer from "./Engineer";

import { Actor } from "./Actor";
import { ModelView } from "engineer-js";

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

class Player
{
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
        this._Movement = new Movement();
        this._Scene.Events.KeyDown.push(this.KeyDown.bind(this));
        this._Scene.Events.KeyUp.push(this.KeyUp.bind(this));
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
    private Update() : void
    {
        if(this._Movement.Up) this._Scene.Trans.Translation.Y += 5;
        if(this._Movement.Down) this._Scene.Trans.Translation.Y -= 5;
        if(this._Movement.Left) this._Scene.Trans.Translation.X += 5;
        if(this._Movement.Right) this._Scene.Trans.Translation.X -= 5;
    }
    public ProjectActor(Actor:Actor) : void
    {
        this._Actor.Possesed = true;
        this._Actor.Fixed = true;
        this._Scene.Trans.Translation.X = SCREEN_WIDTH / 2 - this._Actor.Trans.Translation.X;
        this._Scene.Trans.Translation.Y = SCREEN_HEIGHT / 2 - this._Actor.Trans.Translation.Y;
        this._Actor.Trans.Translation.X = SCREEN_WIDTH / 2;
        this._Actor.Trans.Translation.Y = SCREEN_HEIGHT / 2;
    }
    public ReprojectActor(Actor:Actor) : void
    {
        this._Actor.Possesed = false;
        this._Actor.Fixed = false;
        console.log(this._Scene.Trans.Translation);
        this._Actor.Trans.Translation.X = -this._Scene.Trans.Translation.X + SCREEN_WIDTH / 2 ;
        this._Actor.Trans.Translation.Y = -this._Scene.Trans.Translation.Y + SCREEN_HEIGHT / 2 ;
        console.log(this._Actor.Trans.Translation);
    }
}
class Movement
{
    public Up:boolean;
    public Down:boolean;
    public Left:boolean;
    public Right:boolean;
}