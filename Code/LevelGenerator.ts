export { LevelGenerator }

class LevelGenerator
{
    public static Generate(Length:number)
    {
        let LevelObject = { Rooms:[], Enemy:[], Location:0 };
        this.GenerateEndRoom(LevelObject);
        return LevelObject;
    }
    private static GenerateEndRoom(LO:any) : void
    {
        LO.Rooms.push({X:1, Y:0, XS:3, YS:2, WL:[1,1], WR:[1,1], WT:[1,0,1], WB:[0,1,0]});
        LO.Enemy.push({X:1, Y:0});
        LO.Enemy.push({X:3, Y:0});
        LO.Enemy.push({X:2, Y:1});
        let Length = this.Rand(2, 8);
        LO.Rooms.push({X:0, Y:2, XS:2, YS:Length, WL:this.CFW(Length), WR:this.CFW(Length), WT:[1,0], WB:[1,0]});
        LO.Rooms.push({X:3, Y:2, XS:2, YS:Length, WL:this.CFW(Length), WR:this.CFW(Length), WT:[0,1], WB:[0,1]});
        LO.Rooms.push({X:1, Y:Length + 2, XS:3, YS:2, WL:[1,1], WR:[1,1], WT:[0,1,0], WB:[1,0,1]});
        LO.Location += Length + 4;
    }
    private static CFW(Length:number) : number[]
    {
        let Wall = [];
        for(let i = 0; i < Length; i++) Wall.push(1);
        return Wall;
    }
    public static Rand(Min, Max) 
    { 
        Max -= 1; 
        return Math.floor(Math.random() * (Max - Min + 1)) + Min; 
    }
}