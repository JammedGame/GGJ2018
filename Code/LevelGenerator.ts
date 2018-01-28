export { LevelGenerator }

class LevelGenerator
{
    public static Generate(Length:number)
    {
        let LevelObject = { Rooms:[], Enemy:[], Props:[], Location:0 };
        this.GenerateEndRoom(LevelObject);
        for(let i = 0; i < Length; i++)
        {
            this.GenerateRoom(LevelObject);
        }
        this.GenerateBeginRoom(LevelObject);
        return LevelObject;
    }
    private static GenerateEndRoom(LO:any) : void
    {
        LO.Rooms.push({X:1, Y:0, XS:3, YS:2, WL:[1,1], WR:[1,1], WT:[1,1,1], WB:[0,1,0]});
        LO.Enemy.push({X:1, Y:0});
        LO.Enemy.push({X:3, Y:0});
        LO.Enemy.push({X:2, Y:1});
        LO.Enemy.push({X:2, Y:0, Type:"Terminal"});
        let Length = this.Rand(2, 8);
        for(let i = 0; i < Length; i++)
        {
            if(i%2==0)
            {
                LO.Enemy.push({X:0, Y:2 + i});
                LO.Enemy.push({X:4, Y:2 + i});
                LO.Props.push({X:1, Y:2 + i});
                LO.Props.push({X:3, Y:2 + i});
            }
            else
            {
                LO.Enemy.push({X:1, Y:2 + i});
                LO.Enemy.push({X:3, Y:2 + i});
                LO.Props.push({X:0, Y:2 + i});
                LO.Props.push({X:4, Y:2 + i});
            }
        }
        LO.Rooms.push({X:0, Y:2, XS:2, YS:Length, WL:this.CFW(Length), WR:this.CFW(Length), WT:[1,0], WB:[1,0]});
        LO.Rooms.push({X:3, Y:2, XS:2, YS:Length, WL:this.CFW(Length), WR:this.CFW(Length), WT:[0,1], WB:[0,1]});
        LO.Rooms.push({X:1, Y:Length + 2, XS:3, YS:2, WL:[1,1], WR:[1,1], WT:[0,1,0], WB:[1,0,1]});
        LO.Props.push({X:1, Y:Length + 2});
        LO.Props.push({X:3, Y:Length + 2});
        LO.Location += Length + 4;
    }
    private static GenerateBeginRoom(LO:any) : void
    {
        LO.Rooms.push({X:1, Y:LO.Location, XS:3, YS:1, WL:[1], WR:[1], WT:[1,0,1], WB:[1,0,1]});
        LO.Rooms.push({X:2, Y:LO.Location+1, XS:1, YS:1, WL:[1], WR:[1], WT:[0], WB:[1]});
        LO.Props.push({X:1, Y:LO.Location});
        LO.Props.push({X:3, Y:LO.Location});
        LO.Enemy.push({X:2, Y:LO.Location+1});
    }
    private static GenerateRoom(LO:any)
    {
        let Type = this.Rand(1, 5);
        if(Type == 1) this.GenerateType1Room(LO);
        if(Type == 2) this.GenerateType2Room(LO);
        if(Type == 3) this.GenerateType3Room(LO);
        if(Type == 4) this.GenerateType4Room(LO);
    }
    private static GenerateType1Room(LO:any)
    {
        let Length = this.Rand(3, 8);
        LO.Rooms.push({X:1, Y:LO.Location, XS:3, YS:Length, WL:this.CFW(Length), WR:this.CFW(Length), WT:[1,0,1], WB:[1,0,1]});
        for(let i = 0; i < Length; i++)
        {
            if(i%2==0)
            {
                LO.Enemy.push({X:1, Y:LO.Location + i});
                LO.Enemy.push({X:3, Y:LO.Location + i});
                LO.Props.push({X:2, Y:LO.Location + i});
            }
            else
            {
                LO.Enemy.push({X:2, Y:LO.Location + i});
                LO.Props.push({X:1, Y:LO.Location + i});
                LO.Props.push({X:3, Y:LO.Location + i})
            }
        }
        LO.Location += Length;
    }
    private static GenerateType2Room(LO:any)
    {
        LO.Rooms.push({X:1, Y:LO.Location, XS:3, YS:1, WL:[1], WR:[1], WT:[1,0,1], WB:[0,1,0]});
        LO.Enemy.push({X:1, Y:LO.Location});
        LO.Enemy.push({X:3, Y:LO.Location});
        let Length = this.Rand(2, 8);
        for(let i = 0; i < Length; i++)
        {
            if(i%2==0)
            {
                LO.Enemy.push({X:1, Y:LO.Location + 1 + i});
                LO.Props.push({X:3, Y:LO.Location + 1 + i});
            }
            else
            {
                LO.Enemy.push({X:3, Y:LO.Location + 1 + i});
                LO.Props.push({X:1, Y:LO.Location + 1 + i});
            }
        }
        LO.Enemy.push({X:1, Y:LO.Location + Length + 1});
        LO.Enemy.push({X:3, Y:LO.Location + Length + 1});
        LO.Rooms.push({X:1, Y:LO.Location + 1, XS:1, YS:Length, WL:this.CFW(Length), WR:this.CFW(Length), WT:[0], WB:[0]});
        LO.Rooms.push({X:3, Y:LO.Location + 1, XS:1, YS:Length, WL:this.CFW(Length), WR:this.CFW(Length), WT:[0], WB:[0]});
        LO.Rooms.push({X:1, Y:LO.Location + Length + 1, XS:3, YS:1, WL:[1], WR:[1], WT:[0,1,0], WB:[1,0,1]});
        LO.Props.push({X:1, Y:Length + 1});
        LO.Props.push({X:3, Y:Length + 1});
        LO.Location += Length + 2;
    }
    private static GenerateType3Room(LO:any)
    {
        LO.Rooms.push({X:1, Y:LO.Location, XS:3, YS:1, WL:[1], WR:[1], WT:[1,0,1], WB:[1,0,1]});
        LO.Enemy.push({X:1, Y:LO.Location});
        LO.Enemy.push({X:3, Y:LO.Location});
        let Length = this.Rand(2, 8);
        for(let i = 0; i < Length; i++)
        {
            if(i%2==0)
            {
                LO.Enemy.push({X:2, Y:LO.Location + 1 + i});
            }
            else LO.Props.push({X:2, Y:LO.Location + 1 + i});
        }
        LO.Enemy.push({X:1, Y:LO.Location + Length + 1});
        LO.Enemy.push({X:3, Y:LO.Location + Length + 1});
        LO.Rooms.push({X:2, Y:LO.Location + 1, XS:1, YS:Length, WL:this.CFW(Length), WR:this.CFW(Length), WT:[0], WB:[0]});
        LO.Rooms.push({X:1, Y:LO.Location + Length + 1, XS:3, YS:1, WL:[1], WR:[1], WT:[1,0,1], WB:[1,0,1]});
        LO.Props.push({X:1, Y:Length + 1});
        LO.Props.push({X:3, Y:Length + 1});
        LO.Location += Length + 2;
    }
    private static GenerateType4Room(LO:any)
    {
        let Length = this.Rand(5, 12);
        let WLR = this.CFW(Length);
        WLR[1] = 0;
        WLR[Length - 2] = 0;
        LO.Rooms.push({X:2, Y:LO.Location, XS:1, YS:Length, WL:WLR , WR:WLR, WT:[0], WB:[0]});
        LO.Rooms.push({X:-1, Y:LO.Location, XS:3, YS:Length, WL:this.CFW(Length) , WR:WLR, WT:[1,1,1], WB:[1,1,1]});
        LO.Rooms.push({X:3, Y:LO.Location, XS:3, YS:Length, WL:WLR, WR:this.CFW(Length), WT:[1,1,1], WB:[1,1,1]});
        for(let i = 0; i < Length; i++)
        {
            LO.Enemy.push({X:2, Y:LO.Location + i});
            if(i%2==0)
            {
                LO.Enemy.push({X:-1, Y:LO.Location + i});
                LO.Enemy.push({X:5, Y:LO.Location + i});
                LO.Props.push({X:1, Y:LO.Location + i});
                LO.Props.push({X:3, Y:LO.Location + i});
            }
            else
            {
                LO.Enemy.push({X:1, Y:LO.Location + i});
                LO.Enemy.push({X:3, Y:LO.Location + i});
                LO.Props.push({X:-1, Y:LO.Location + i});
                LO.Props.push({X:5, Y:LO.Location + i});
            }
        }
        LO.Location += Length;
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