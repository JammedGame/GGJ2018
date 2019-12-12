export { Behaviour }

import * as TBX from "toybox-engine";

import { Actor } from "./Actor";
import { Level } from "./Level";
import { LevelGenerator } from "./LevelGenerator";

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

class Behaviour
{
    protected _Sight:number;
    protected _Radius:number;
    protected _Actor:Actor;
    private _Scene:TBX.Scene2D;
    public constructor(Old?:Behaviour, Scene?:TBX.Scene2D, Actor?:Actor)
    {
        if(Old != null)
        {
            this._Sight = Old._Sight;
            this._Radius = Old._Radius;
            this._Actor = Old._Actor;
        }
        else
        {

            let Sight = LevelGenerator.Rand(600,1000);
            let Radius = LevelGenerator.Rand(350,650);
            this._Sight = Sight;
            this._Radius = Radius;
            this._Actor = Actor;
            this._Scene = Scene;
        }
    }
    public Act() : void
    {
        let TargetLoc = this.ReprojectLocation();
        let SightSat:boolean = TBX.Vertex.Distance(TargetLoc, this._Actor.Trans.Translation) < this._Sight;
        let RadiusSat:boolean = TBX.Vertex.Distance(TargetLoc, this._Actor.Trans.Translation) < this._Radius;
        let Zeroed:TBX.Vertex = new TBX.Vertex(TargetLoc.X - this._Actor.Trans.Translation.X, TargetLoc.Y - this._Actor.Trans.Translation.Y, 0);
        let Angle:number = TBX.Vertex.Angle(new TBX.Vertex(0, 1, 0), Zeroed);
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
        let Loc = this._Actor.Trans.Translation.Copy();
        let Offset = new TBX.Vertex(15, -40, 0);
        Offset.RotateZ(Angle + 90);
        Loc.Translate(Offset);
        this._Actor.Weapon.Fire(Angle,Loc,1);
    }
    public SightAct(Angle)
    {
        let Direction = new TBX.Vertex(0,this._Actor.Speed,0);
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
    private ReprojectLocation() : TBX.Vertex
    {
        let Reprojected:TBX.Vertex = new TBX.Vertex(0,0,0);
        Reprojected.X = -this._Scene.Trans.Translation.X + SCREEN_WIDTH / 2 ;
        Reprojected.Y = -this._Scene.Trans.Translation.Y + SCREEN_HEIGHT / 2 ;
        Reprojected.Z = this._Actor.Trans.Translation.Z;
        return Reprojected;
    }
}