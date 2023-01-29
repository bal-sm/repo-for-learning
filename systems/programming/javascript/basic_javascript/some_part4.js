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
console.log("2:11:35 For Loops")
console.log("____________________")
console.log("2:13:56 Odd Numbers With a For Loop")
console.log("____________________")
console.log("2:15:28 Count Backwards With a For Loop")
console.log("____________________")
console.log("2:17:08 Iterate Through an Array with a For Loop")
console.log("____________________")
console.log("2:19:43 Nesting For Loops")
console.log("____________________")
console.log("2:22:45 Do...While Loops")
console.log("____________________")
console.log("2:24:12 Profile Lookup")
console.log("____________________")
console.log("2:28:18 Random Fractions and Whole Numbers")
console.log("____________________")
console.log("2:31:46 parseInt Function")
console.log("____________________")
console.log("2:33:29 Ternary Operator")
console.log("____________________")
console.log("2:34:57 Multiple Ternary Operators")
console.log("____________________")
console.log("2:36:57 var vs let")
console.log("____________________")
console.log("2:41:32 const Keyword")
console.log("____________________")
console.log("2:43:40 Mutate an Array Declared with const")
console.log("____________________")
console.log("2:44:52 Prevent Object Mutation")
console.log("____________________")
console.log("2:47:17 Arrow Functions")
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