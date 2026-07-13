// ===============================
// Part 1: Loop (Odd Numbers)
// ===============================

 for (let i = 1; i <= 10; i++) {
     if (i % 2 == 1) {
         console.log(i);
     }
 }


// ===============================
// Part 2: Creating an Array
// ===============================

 const myArr = ["I Love RP!", true];

 console.log(myArr[0]);
 console.log(myArr[1]);


// ===============================
// Part 3: Accessing Array Elements
// ===============================

 const myArr = ["I Love RP!", true, 5];

 for (let i = 0; i < myArr.length; i++) {
     console.log(myArr[i]);
 }


// ===============================
// Part 4: Functions (CURRENT)
// ===============================

function multiplyTen(num)
{
    return num * 10;
}

console.log("Answer is: " + multiplyTen(5));