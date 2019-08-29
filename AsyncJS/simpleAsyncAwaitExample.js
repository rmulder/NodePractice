let name1 = m1();
console.log('hi '+name1); //hi undefined
function m1(){
    setTimeout(()=>{
        return 'John';
    },3000);
}

//with async await:
let name2;
async function callM2(){
    name2 = await m2();
    console.log('hi '+name2);  //hi Moris
}
callM2();
function m2(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('Moris');
        },3000);
    });
}