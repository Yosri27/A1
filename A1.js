
// // ## 1
// function one(){
// let x = "123"
// console.log(Number(x) + 7);
// }

// // ## 2
// function two(){
// let x = 0
// if ((+Boolean(x)) == false)
//     {
//         console.log("invalid");
        

//     } 
// }

// // ##3

// function three(){
// for (let x = 1; x < 10; x+=2)
//     {
    
//         console.log(x);
        


//     }
// }
//     // #4
// function four(){
// x = [1,2,3,4,5] 
// even = x.filter(slash)

//  function slash(value)
// {
 
// if (value % 2 == 0) {
//     console.log(value);
    
// }
    
// }


// }







//     #5

// function five(){
// x = [1,2,3] 
// y = [4,5,6]

// console.log(...x,...y);
// }
// // #6 
// function six(){
// let date= 9;
// switch (date) {
//     case 1:
//         console.log("Sunday");
//         break;
//    case 2:
//         console.log("Monday");
//         break;
//     case 3:
//         console.log("Tuesday");
//         break;
//     case 4:
//         console.log("Wednesday");
//         break;
//     case 5:
//         console.log("Thursday");
//         break;        
//     case 6:
//         console.log("Friday");
//         break;    
//     case 7:
//         console.log("Saturday");
//         break;                
//     default:
//         console.log("error");
        
//         break;
// }
// }

// // ##7
// function seven(){
// x = ["a","ab","abc"]
// l = []
// for (let i = 0; i < x.length; i++) {
    
//     l.push(x[i].length);
    
// }
// console.log(l);
// }

// // ## 8

// function eight(){
// x = 125;
// switch (true) {
//      case x % 3 == 0 && x % 5 ==0:
//         console.log("divisible by both");    
//         break;    
//     case x % 3 == 0:
//         console.log("divisible by 3");
//         break;
//     case x % 5 == 0:
//         console.log("divisible by 5");    
//         break;
   
//     default:console.log("Error");
    
//         break;
// }
// }
// // ##9
// function nine(){
// x = 5 ;

//  let power = (x) => {return Math.pow(x,2)}
// console.log(power());
// }
// // ##10

// function ten(){
// const person ={name:"john", age:25}
// result = Object.keys(person);
// for (let i = 0; i < result.length; i++) {

//     console.log(person[result[i]]);
    
    
// }
// }


// // ##11
// function elven(){
// arr=[1,2,3,4,5,6];
// let result = 0;

// function Sum(x)
// {   
//     for (let i = 0; i < x.length; i++)
//     {
        
//         result += x[i];
//     }
//     return result;
    
// }
// console.log(Sum(arr));
// }
// // ## 12
// function twelve(){
// function call(age)
// {
//     return new Promise((resolve , reject)=>
//         {
//             setTimeout(()=>{
//             if (age > 18) {
//                 resolve("success");
//             }else
//                 {
//                     reject("la");
//                 }
//         },3000)
//         })

// }
// call(25).then((message)=>
//     {
//         console.log(message);
        

//     }).catch((err)=>
//         {
//             console.log(err);
            

//         })
// }

// // ##13
// function thrtieen(){
// arr=[1,3,7,2,4];
// let k = 0;

// function Max(x)
// {   
//    result = x.filter((ele,index,arr)=>
//         {

//            if (k < ele)
//             {
//                 k = ele;
//             }

//         })
//         return k;
    
// }
// console.log(Max(arr));
// }


// // ##14
// function fourteen(){
// person ={name:"john", age:25}
// result = Object.keys(person);
// function solve(obj)
// {
//     return Object.keys(obj);   
// }
// console.log(solve(person));

// }




