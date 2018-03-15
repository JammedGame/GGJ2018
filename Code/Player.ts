export { Player }

import Engineer from "./Engineer";

import { Actor } from "./Actor";
import { Level } from "./Level";
import { HealthBar } from "./HealthBar";
import { SoundObject } from "engineer-js";

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

class Player
{
    private _Shoot:boolean;
    private _Angle:number;
    private _Actor:Actor;
    private _Speed:number;
    private _HealthBar:HealthBar;
    private _Movement:Movement;
    private _Scene:Engineer.Scene2D;
    private _Cooldown:number;
    private _TransmissionSound:SoundObject;
    private _LevelComplete:Function;
    private _GameOver:Function;
    public get Actor():Actor { return this._Actor; }
    public set Actor(Value:Actor)
    {
        if(this._Cooldown != 0) return;
        if(this._Actor != null) this.ReprojectActor(this._Actor);
        this._Actor = Value;
        this._Cooldown = 200;
        this._TransmissionSound.Play();
        this.ProjectActor(this._Actor);
        if(Value.Terminal) this._LevelComplete()
    }
    public constructor(Scene:Engineer.Scene2D, LevelComplete:Function, GameOver:Function)
    {
        this._Scene = Scene;
        this._LevelComplete = LevelComplete;
        this._GameOver = GameOver;
        this.Init();
        this._TransmissionSound = new SoundObject('Resources/Sounds/transmission.wav');
        this._HealthBar = new HealthBar(this._Scene);
    }
    public Init() : void
    {
        this._Angle = 0;
        this._Shoot = false;
        this._Speed = 10;
        this._Cooldown = 0;
        this._Movement = new Movement();
        this._Scene.Events.KeyDown.push(this.KeyDown.bind(this));
        this._Scene.Events.KeyUp.push(this.KeyUp.bind(this));
        this._Scene.Events.MouseDown.push(this.MouseDown.bind(this));
        this._Scene.Events.MouseUp.push(this.MouseUp.bind(this));
        this._Scene.Events.MouseMove.push(this.MouseMove.bind(this));
        this._Scene.Events.TimeTick.push(this.Update.bind(this));
        if(Engineer.Runner.Current.TouchscreenDevice())
        {
            Engineer.DPad.All[0].Press.push(this.DPadPress.bind(this));
            Engineer.Analog.All[0].Press.push(this.AnalogPress.bind(this));
        }
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
        this._Actor.Trans.Rotation.Z = this._Angle;
    }
    private DPadPress(Directions:any) : void
    {
        this._Movement.Up = !!Directions.Up;
        this._Movement.Down = !!Directions.Down;
        this._Movement.Left = !!Directions.Left;
        this._Movement.Right = !!Directions.Right;
    }
    private AnalogPress(Args:any) : void
    {
        if(!Args.Pressed)
        {
            this._Shoot = false;
            return;
        }
        this._Angle = Args.Angle;
        this._Actor.Trans.Rotation.Z = this._Angle;
        this._Shoot = true;
    }
    public Reset()
    {
        this._Shoot = false;
        this._Speed = 10;
        this._Cooldown = 0;
        this._Movement = new Movement();
        this._Actor = null;
    }
    private Update() : void
    {
        if(this._Cooldown > 0) this._Cooldown--;
        if(this._Actor.Health <= 0)
        {
            this._GameOver();
            return;
        }
        this._HealthBar.Update(this._Actor.Health / this._Actor.MaxHealth, 200 - this._Cooldown);
        Level.Single.CheckPlayerCollision(this._Actor, this.ReprojectLocation());
        if(this._Movement.Up && !this._Actor.Data["Collision_Wall"].Top) this._Scene.Trans.Translation.Y += this._Speed;
        if(this._Movement.Down && !this._Actor.Data["Collision_Wall"].Bottom) this._Scene.Trans.Translation.Y -= this._Speed;
        if(this._Movement.Left && !this._Actor.Data["Collision_Wall"].Left) this._Scene.Trans.Translation.X += this._Speed;
        if(this._Movement.Right && !this._Actor.Data["Collision_Wall"].Right) this._Scene.Trans.Translation.X -= this._Speed;
        if(!!this._Shoot)
        {
            let Loc = this.ReprojectLocation();
            let Offset = new Engineer.Vertex(15, -40, 0);
            Offset.RotateZ(this._Angle + 90);
            Loc.Translate(Offset);
            if(this._Actor.Weapon) this._Actor.Weapon.Fire(this._Angle, Loc, 0);
        }
        if (this._Movement.IsMoving()) {
            this._Actor.UpdateSpriteSetByName('walking');
        }
        else {
            this._Actor.UpdateSpriteSetByName('idle');
        }
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
    public ReprojectLocation() : Engineer.Vertex
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

    public IsMoving() : boolean {
        return (this.Up || this.Down || this.Left || this.Right);
    }
}