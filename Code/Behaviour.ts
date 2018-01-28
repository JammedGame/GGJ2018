export { Behaviour }

import Engineer from "./Engineer";

import { Actor } from "./Actor";
import { Level } from "./Level";

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

class Behaviour
{
    protected _Sight:number;
    protected _Radius:number;
    protected _Actor:Actor;
    private _Scene:Engineer.Scene2D;
    public constructor(Old?:Behaviour, Scene?:Engineer.Scene2D, Actor?:Actor)
    {
        if(Old != null)
        {
            this._Sight = Old._Sight;
            this._Radius = Old._Radius;
            this._Actor = Old._Actor;
        }
        else
        {
            this._Sight = 800;
            this._Radius = 500;
            this._Actor = Actor;
            this._Scene = Scene;
        }
    }
    public Act() : void
    {
        let TargetLoc = this.ReprojectLocation();
        let SightSat:boolean = Engineer.Vertex.Distance(TargetLoc, this._Actor.Trans.Translation) < this._Sight;
        let RadiusSat:boolean = Engineer.Vertex.Distance(TargetLoc, this._Actor.Trans.Translation) < this._Radius;
        let Zeroed:Engineer.Vertex = new Engineer.Vertex(TargetLoc.X - this._Actor.Trans.Translation.X, TargetLoc.Y - this._Actor.Trans.Translation.Y, 0);
        let Angle:number = Engineer.Vertex.Angle(new Engineer.Vertex(0, 1, 0), Zeroed);
        if(SightSat)
        {
            this._Actor.Trans.Rotation.Z = Angle;
        }
        if(RadiusSat)
        {
            this.RadiusAct(Angle);
        }
        else if(SightSat)
        {
            this.SightAct(Angle);
        }
    }
    public RadiusAct(Angle)
    {
        this._Actor.Weapon.Fire(Angle,this._Actor.Trans.Translation,1);
    }
    public SightAct(Angle)
    {
        let Direction = new Engineer.Vertex(0,this._Actor.Speed,0);
        Direction.RotateZ(Angle - 90);
        Level.Single.CheckCollision(this._Actor);
        if(this._Actor.Data["Collision_Wall"].Top || this._Actor.Data["Collision_Wall"].Bottom)
        {
            Direction.Y = 0;
        }
        if(this._Actor.Data["Collision_Wall"].Left || this._Actor.Data["Collision_Wall"].Right)
        {
            Direction.X = 0;
        }
        this._Actor.Trans.Translation.X += Direction.X;
        this._Actor.Trans.Translation.Y += Direction.Y;
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