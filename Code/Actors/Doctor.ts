export { Doctor }

import { Actor } from "../Actor";
import { Scene2D, Vertex, SpriteSet } from "engineer-js";
import { Weapon } from "../Weapon";
import { Projectile } from "../Projectile";
import { DoctorBehaviour } from "../DoctorBehaviour";

class Doctor extends Actor {

    public Init(Scene: Scene2D, Location: Vertex)
    {
        super.Init(Scene, Location)
        this._Behaviour = new DoctorBehaviour(null, this._Scene, this);
        this.Health = 10;
        this.MaxHealth = 10;
        this.Weapon = new Weapon(Scene, 0, new Projectile(null, 0, 0, 1), '/Resources/Sounds/sniper_shot.wav');
        if(!Doctor.Sets) Doctor.InitSets();
        this.SpriteSets = Doctor.Sets;
        this.SetSpriteSetByName('idle');  
    }
    private static Sets:Engineer.SpriteSet[];
    private static InitSets()
    {
        let Walking = new SpriteSet(null, 'walking', [
            '/Resources/Textures/Actors/doctor_01.png',
        ])

        Walking.Seed = 5;

        let Idle = new SpriteSet(null, 'idle', [
            '/Resources/Textures/Actors/doctor_01.png',
            ])
        
        Doctor.Sets = [Walking, Idle];
    }
}