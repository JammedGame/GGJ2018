export { DoctorBehaviour }

import Engineer from "./Engineer";

import { Actor } from "./Actor";
import { Level } from "./Level";
import { Behaviour } from "./Behaviour";
import { LevelGenerator } from "./LevelGenerator";

class DoctorBehaviour extends Behaviour
{
    public constructor(Old?:DoctorBehaviour, Scene?:Engineer.Scene2D, Actor?:Actor)
    {
        super(Old, Scene, Actor);
        if(Old != null)
        {
        }
        else
        {
            let Sight = LevelGenerator.Rand(800,1200);
            let Radius = LevelGenerator.Rand(350,550);
            this._Sight = Sight;
            this._Radius = Radius;
        }
    }
    public RadiusAct(Angle)
    {
        let Direction = new Engineer.Vertex(0,-this._Actor.Speed,0);
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
    public SightAct(Angle)
    {
        this.RadiusAct(Angle);
    }
}