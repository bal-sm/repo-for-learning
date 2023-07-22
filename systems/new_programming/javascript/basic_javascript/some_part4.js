//1:32:15 Switch Statements
function caseInSwitch(val){
    var answer = "";
    switch(val) {
        case 1:
            answer = "alpha"
            break
        case 2:
            answer = "beta"
            break
        case 3:
            answer = "delta"
            break
        case 4:
            answer = "gamma"
            break
    }
    return answer
}
valisi = (Math.floor(Math.random() * 4) + 1)
console.log(caseInSwitch(valisi))
//Sequential Sizes
function caseInSwitch(val){
    var answer = "";
    switch(val) {
        case 1:
        case 2:
        case 3:
            answer = "Low"
            break
        case 4:
        case 5:
        case 6:
            answer = "Mid"
            break
        case 7:
        case 8:
        case 9:
            answer = "High"
            break
    }
    return answer
}

console.log(caseInSwitch(8))
//1:41:11 Returning Boolean Values from Functions
function isItTheSame(valA, valB) {
    if (valA, valB){
        return valA == valB
    }
}
console.log(isItTheSame("bacot","bacot"))
//1:42:20 Return Early Pattern for Functions
//skip,
//1:43:38 Counting Cards
//skip,
//1:49:11 Build Objects
console.log("Build Objects")
console.log("_____________")
var Mahdi
var Muhammad = {
    "name": "Prophet Muhammad saw.",
    "sayang/suami": Mahdi,
    "jenis kelamin": "Male",
    "temannya": ["banyak!"],
    "cewenya": ["banyak!"],
    " ": []
}
Mahdi = {
    "name": "Iqbal Syifa Mahmuda",
    "kesayangan/suami": Muhammad,
    "jenis kelamin": "Male",
    "sexuality": "Straight path",
    "babunya": ["banyak!"],
    "cewenya": ["banyak!", "indonesian womans", "american beautifal women", 'all women'],
    " ": []
}
console.log(Mahdi)
console.log(" ")
console.log("1:50:46 Dot Notation")
console.log("____________________")
var namasaya = Mahdi.name
console.log(namasaya)
console.log("1:51:33 Bracket Notation")
console.log("________________________")
var dear = Mahdi["kesayangan/suami"]
console.log(dear)
console.log("1:52:47 Variables")
console.log("____________________")
//Accessing Object Properties with Variables
var soHot = "cewenya"
var cewecewe = Mahdi[soHot]
console.log(cewecewe)
console.log("1:53:34 Updating Object Properties")
console.log("____________________")
Mahdi.cewenya = ["yang cantik", "gadis", "_____", "sholehah", "etc"]
console.log(Mahdi)
console.log("1:54:30 Add New Properties to Object")
console.log("____________________")
Muhammad.peliharaan = ["Mueezza",]
Mahdi.peliharaan = ["Miky", "Kenzo", "Temon", "dan lain-lain"]
console.log(Muhammad)
console.log(Mahdi)
console.log("1:55:19 Delete Properties from Object")
console.log("____________________")
Mahdi.bebas = "bebas"
console.log(Mahdi)
delete Mahdi.bebas
console.log(Mahdi)
console.log("1:55:54 Objects for Lookups")
console.log("____________________")
function LoverAndFriendsLookup(val) {
    var result = "";
    var lookup = {
        "muhammad": "our beloved Prophet Muhammad saw. (mine)",
        "daris": "a friend",
        "aul": "aulia",
        "ah": "siapa ya lupa :(",
        "chyntia": "cans",
        "silviaa": "cans",
        "silviac": "cans",
        "fika": "cans",
        "luvita": "cans",
        "ade": "bacot",
        "aulia2": "dini latifah",
        "linda": "andriani",
        "denda": "a friend 2",
        "iamad": "ahmadi",
        "fahrur": "hmm sut ;), heueuh bae :)",
        "ampa": "cape :( maap",
        "ampb2018": "yessss",
        "kabayan": "asik",
        "polban": "asik",
        "sama friends beda jurusan": "tenang ;)",
    };
    result = lookup[val];
    return result
}
console.log(LoverAndFriendsLookup("muhammad"))
console.log("1:57:43 Testing Objects for Properties")
console.log("____________________")
//who works at sunday babe, cause I want you, Muhammad saw..
var dream = {};

function checkObj(checkProp) {
    if (dream.hasOwnProperty(checkProp)) {
        return dream[checkProp];
    } else {
        return checkProp + " Not Found"
    }
}
console.log(checkObj("Dream"))
console.log("1:59:15 Manipulating Complex Objects")
console.log("____________________")
//skip
console.log("2:01:00 Nested Objects")
console.log("____________________")
var dompet = {
    "dompetA": {
        "dompetB": {
            "dompetC": "sebuah coklat"
        }
    }
}

var isiDalamSebuahDompet = dompet.dompetA.dompetB["dompetC"];
console.log(isiDalamSebuahDompet)
console.log("2:01:53 Nested Arrays")
console.log("____________________")

//skip
console.log("2:03:06 Record Collection")
console.log("____________________")
var collection = {
    "69VF": {
        "album": "Firehouse",
        "artist": "Firehouse",
        "tracks": [
            "Love of a Lifetime",
        ]
    }
}

var collection = JSON.parse(JSON.stringify(collection));

function updateRecords(id, prop, value){
    if (value === "")

    return collection
}

//updateRecords(69VF, "artist", "69VF")
//skip
console.log("2:10:15 While Loops")
console.log("____________________")
var myArray = []

var i = 0
while(i < 5) {
    myArray.push(i);
    i++;
}

console.log(myArray);
console.log("2:11:35 For Loops")
console.log("____________________")

var loops = []

for (var i = 0; i < 101; i++){
    loops.push(i)
}

console.log(loops)
console.log("2:13:56 Odd Numbers With a For Loop")
console.log("____________________")

var loopsGanjil = []

for (var i = 0; i < 101; i++){
    if (i%2 == 1) {
        loopsGanjil.push(i)
    }
}

console.log(loopsGanjil)

var loopsGanjilDua = []

for (var i = 1; i < 101; i += 2){
    loopsGanjilDua.push(i)
}

console.log(loopsGanjilDua)
console.log("2:15:28 Count Backwards With a For Loop")
console.log("____________________")
var loopsGanjilMinus = []

for (var i = 0; i > -99; i--){
    loopsGanjilMinus.push(i)
}

console.log(loopsGanjilMinus)
console.log("2:17:08 Iterate Through an Array with a For Loop")
console.log("____________________")
var ourArr = [9, 10, 11, 12, -42];
var ourTotal = 0;
for (var i = 0; i < ourArr.length; i++){
    ourTotal += ourArr[i]
}

ourTotal = ourTotal * 10

console.log(ourTotal)
console.log("ultimate question of life, the universe, and everything. don't smoke weed. 69 (with you). udah?")
console.log("2:19:43 Nesting For Loops")
console.log("____________________")
function multiplyAll(arr) {
    var product = 1;

    for (var i=0; i < arr.length; i++) {
        for (var j=0; j < arr[i].length; j++) {
            product *= arr[i][j];
        }
    }

    return product;

}

var nestingForLoops = multiplyAll([[1,2],[2,3],[3,4,5]])

console.log(nestingForLoops)
console.log("2:22:45 Do...While Loops")
console.log("____________________")
var myArrayy = [];
var iAr = 10;

while (iAr < 10){
    myArrayy.push(i);
    iAr++;
}
console.log(iAr, myArrayy)
//Do...While Loops
var myArrayy2 = [];
var iH = 10;

do {
    myArrayy2.push(i);
    iH++;
} while (iH < 10)
console.log(myArrayy2)
console.log("2:24:12 Profile Lookup")
console.log("____________________")
var contacts = [
    {
        "firstName": "Iqbal",
        "lastName": "Syifa Mahmuda",
        "number": 1,
        "likes": ["Pizza", "Coding", "Learning", "Have Sex"]
    },
    {
        "firstName": "Muhammad Denda",
        "lastName": "Julianda",
        "number": 2,
        "likes": ["coli", "zina setelah nikah"]
    },
    {
        "firstName": "Daris",
        "lastName": "Azhar",
        "number": 3,
        "likes": []
    },
]

function lookUpProfile(name, prop){
    for (var i = 0; i < contacts.length; i++){
        if (contacts[i].firstName === name) {
            return contacts[i][prop] || "No such property"
        }
    }
    return "No such contact"
}

console.log(lookUpProfile("Iqbal", "likes"))
console.log("2:28:18 Random Fractions and Whole Numbers")
console.log("____________________")
//Generate Random Fractions
function randomFractions() {
    return Math.random()
}
console.log(randomFractions())
//Generate Whole Numbers
function generateWholeNumber() {
    return Math.floor(Math.random() * 10)
}

console.log(generateWholeNumber())
//Generate Random Whole Numbers within a Range
function ourRandomRange(ourMin, ourMax) {
    return Math.floor(Math.random() * (ourMax - ourMin + 1)) + ourMin
}

console.log(ourRandomRange(3, 19))
console.log("2:31:46 parseInt Function")
console.log("____________________")
function convertToInt(num) {
    return parseInt(num)
}

console.log(convertToInt("69"))
//Use the parseInt Function with a Radix
function convertToBinary(num) {
    return parseInt(num, 2)
}

console.log(convertToBinary("111"))
console.log("2:33:29 Ternary Operator")
console.log("____________________")
//Use the conditional ternary operator
function checkEqualA(a, b){
    if(a === b){
        return true
    }
    else{
        return false
    }
}
console.log(checkEqualA(13,13))
function checkEqualB(a, b){
    return a === b ? true : false
}
console.log(checkEqualB(13,13))
function checkEqualC(a, b){
    return a === b
}
console.log(checkEqualC(13,13))
console.log("2:34:57 Multiple Ternary Operators")
console.log("____________________")
console.log("Ternary Operators at home:")
function checkEqualA(a, b){
    if(a === b){
        return true
    }
    else{
        return false
    }
}
console.log("The real Ternary Operators doesn't exist. Ya udah atuh, ilmu.")
// condition ? statement-if-true : statement-if-false;
function checkSign(num) {
    return num > 0 ? "positive" : num < 0 ? "negative" : "zero"
}
console.log(checkSign(0));
console.log("2:36:57 var vs let")
console.log("____________________")
// only use let and const, don't var, 'cause var easily changed while
let maName = "Mahdi"
maName = "Muhammad"
console.log(maName)
// var is uncanon
// use strict biar catch common coding mistake and unsafe actions
// tapi ada JavaScript eh TypeScript ini maksudnya
// kayak gini cenah
function catTalk() {
    "use strict";
    console.log("...");
}
// baca lagi aja, var vs let vs const
function checkScope() {
"use strict";
    var i = "function scope";
    if (true) {
        i = "block scope";
        console.log("Block scope i is: ", i);
    }
    console.log("Function scope i is: ", i);
    return i;
}

checkScope();
// Output:
// Block scope i is: "block scope"
// Function scope i is: "block scope"
function checkScope2() {
"use strict";
    let i = "function scope";
    if (true) {
        let i = "block scope";
        console.log("Block scope i is: ", i);
    }
    console.log("Function scope i is: ", i);
    return i;
}
    
checkScope2();
// Output:
// Block scope i is: "block scope"
// Function scope i is: "function scope"
console.log("2:41:32 const Keyword")
console.log("____________________")
function printManyTimesConstZxz(str) {
    "use strict";

    const SENTENCE = str + " is bad anjing";

    for (let i = 0; i < str.length; i += 2) {
        console.log(SENTENCE);
    }
}
printManyTimesConstZxz("freeCodeCamp");
console.log("2:43:40 Mutate an Array Declared with const")
console.log("____________________")
const NUMBERSSZZSZSZ = [5, 7, 2]
function editInPlacezxzzxzxzxzx() {
    "use strict";

    // NUMBERSSZZSZSZ = [2, 5, 7];
    // di comment, soalnya nanti
    // Syntax Error blablabla
    NUMBERSSZZSZSZ[0] = 2;
    NUMBERSSZZSZSZ[1] = 5;
    NUMBERSSZZSZSZ[2] = 7;

}
editInPlacezxzzxzxzxzx();
console.log(NUMBERSSZZSZSZ);
console.log("2:44:52 Prevent Object Mutation")
console.log("____________________")
// function freezeObj() {
//     "use strict";
//     // const MATH_CONSTANTS = {
//     //     PI: 3,14
//     // };
//     // PLEASE IH APA YANG SALAH SAMA CODE DIATAS, GOBLLOGGGG
// 
//     Object.freeze(MATH_CONSTANTS);
// 
//     try {
//         MATH_CONSTANTS.PI = 99;
//     } catch(ex) {
//         console.log(ex);
//     }
//     return MATH_CONSTANTS.PI;
// }

// const PI = freezeObj();
console.log("2:47:17 Arrow Functions")
console.log("____________________")
var wowOne = function() {
    return new Date();
};
console.log("____________________")
var wowTwo = () => {
    return new Date();
};
console.log("____________________")
var wowThree = () => new Date();
console.log("____________________")
const wowFour = () => new Date();
console.log("____________________")
console.log("Sub = Write Arrow Functions with Parameters")
console.log("____________________")
console.log("2:53:04 Default Parameters")
console.log("____________________")
console.log("2:54:00 Rest Operator")
console.log("____________________")
console.log("2:55:31 Spread Operator")
console.log("____________________")
console.log("2:57:18 Destructuring Assignment")
console.log("____________________")
console.log("3:06:39 Template Literals")
console.log("____________________")
console.log("3:10:43 Simple Fields")
console.log("____________________")
console.log("3:12:24 Declarative Functions")
console.log("____________________")
console.log("3:12:56 class Syntax")
console.log("____________________")
console.log("3:15:11 getters and setters")
console.log("____________________")
console.log("3:20:25 import and export")
console.log("____________________")
