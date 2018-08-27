interface SquareConfig{
    color : string;
    width : number;
    breadth? : number
}
class InterfaceSamples{
    public static createSquare(squareConfig : {color : string}){
        console.log("\n\n--- Inline Interface Defination in Function ---"); 
        console.log("Color of Square is : "+ squareConfig.color);
    }

    public static createSquareByInterface(squareConfig :SquareConfig){
        console.log("\n\n--- Simple use of Interface ---");
        console.log("Color of Square is : "+ squareConfig.color);
        console.log("Width of Square is : "+ squareConfig.width); 
        if(squareConfig.breadth){
            console.log("Breadth of Square is : "+ squareConfig.breadth); 
        }else{
            console.log("Default Breadth of Square is : 0"); 
        }
    }
}

InterfaceSamples.createSquare({color:"Red"}); 

// All the properties defined in interface should be passed unless it is optional
//InterfaceSamples.createSquareByInterface({ color: "Yellow"}); 
InterfaceSamples.createSquareByInterface({ color: "Yellow", width : 10}); 
InterfaceSamples.createSquareByInterface({ color: "Yellow", width : 10, breadth : 5}); 

  