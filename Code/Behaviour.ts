export { Behaviour }

import Engineer from "./Engineer";

import { Actor } from "./Actor";

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

class Behaviour
{
    private _Sight:number;
    private _Radius:number;
    private _Actor:Actor;
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
            this._Actor.Weapon.Fire(Angle,this._Actor.Trans.Translation,1);
        }
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