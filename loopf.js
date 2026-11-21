let stu=[12,13,14];
//for loop
for(let i=0;i<3;i++){
    console.log(stu[i]);
}
//for of with array
console.log("Array using for of:");
for(let x of stu){
    console.log(x);
}
//for in loop with objects
let obj={name:"Alice", age:25, city:"New York"};
console.log("Object using for in:");
for(let key in obj){
    console.log(key + ": " + obj[key]);
}
//callback or HDF
fuction sum(a,b){
    console.log("sum:",a+b);
}

