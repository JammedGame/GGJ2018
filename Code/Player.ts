export { Player }

import { Actor } from "./Actor";

class Player
{
    private _Actor:Actor;
    public get Actor():Actor { return this._Actor; }
    public set Actor(Value:Actor)
    {
        if(this._Actor != null) this._Actor.Possesed = false;
        this._Actor = Value;
        this._Actor.Possesed = true;
    }
    public constructor()
    {
        this.Init();
    }
    public Init() : void
    {
        
    }
}