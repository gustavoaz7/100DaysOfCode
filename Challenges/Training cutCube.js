/*
Coding in function ```cutCube```. function accept 2 parameter: ```volume``` and ```n```. ```volume``` is the volume of a cube. 
If we cut the cube into ```n``` block. please determine whether the length of the cube is an integer. return true or false. 

For exmaple: 

volume=27, it can be divided into 27 blocks, each small cube side length is 1
```
cutCube(27,27) should return true
```
volume=512, it can be divided into 8 blocks, each small cube side length is 4
```
cutCube(512,8) should return true
```
volume=512, it can be divided into 64 blocks, each small cube side length is 2
```
cutCube(512,64) should return true
```
If the side length of small cube is not a integer, should return false.
```
cutCube(256,8) should return false
cutCube(27,3) should return false
cutCube(123,456) should return false
```
If it can't be divided evenly into ```n``` small cubes, should return false too.
```
cutCube(50000,50) should return false
cutCube(256,4) should return false
*/


function cutCube(volume,n){
  //coding here...
  var a = Math.round(Math.cbrt(n));
  if (n === a*a*a){
    var b = Math.round(Math.cbrt(volume/n));
    if (b**3 === volume/n) {return true
    } else {return false}
  } else {return false}
}


cutCube(27,27)  
cutCube(512,8)    
cutCube(512,64)   
cutCube(50000,50) 
cutCube(256,4)    
cutCube(432,16)  
cutCube(256,8)   
cutCube(27,3)   
cutCube(123,456)  