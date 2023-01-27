//0:50:36 Shopping List
console.log('shoppingList')
console.log('____________')
var shoppingList = [['eggs', 2], ['cabbage', 4], ['tomato', 3]]
console.log(shoppingList)
console.log(' ')
//0:51:41 Write Reusable with Functions
console.log('Write Reusable with Functions')
console.log('_____________________________')
function aReusableFunction() {
    console.log("Hello world.")
}
aReusableFunction()
console.log(' ')

console.log('Arguments')
console.log('_____________________________')
function Muhammad(bin, Abdullah) {
    console.log(bin + Abdullah)
}
Muhammad('I love ', 'Iqbal Syifa Mahmuda')
console.log(' ')
console.log('Global Scope')
console.log('_____________________________')
var myGlobal = 5
function fun1() {
    ourGlobal = 10
}
function fun2() {
    var output = ""
    if (typeof myGlobal != undefined) {
        output += "myGlobal = " + myGlobal + ","
    }
    if (typeof ourGlobal != undefined) {
        output += "ourGlobal = " + ourGlobal + ","
    }
//    if (typeof oopsGlobal != undefined) {
//        output += "oopsGlobal = " + oopsGlobal + ","
//    }
    console.log(output)
}
fun1()
fun2()
console.log(' ')
console.log('Local Scope')
console.log('_____________________________')
function fun13() {
    var oopsGlobal = 13
    console.log(oopsGlobal)
}
fun13()
try {
    console.log(oopsGlobal)
}
catch(err) {
    console.log("can't access var oopsGlobal, because defined with var in a function")
}
console.log(' ')
console.log('Global vs Local Scope in Functions')
console.log('_____________________________')
var outerWear = 'Jeans Jacket'
function wearables() {
    var outerWear = "Kaos Oblong"
    console.log(outerWear)
}
wearables()
console.log(outerWear)
console.log(' ')
console.log('Return a Value from a Function')
console.log('_____________________________')
function timesSix (num) {
    return num * 6
}
console.log(timesSix(3))
function plusFour (num) {
    return num + 4
}
console.log(plusFour(7))
console.log(' ')
console.log('Undefined Value returned')
console.log('_____________________________')
var num = 0
function addFive (num) {
    num = num + 5
}
console.log(addFive(2))
console.log("relationship.. :(")
console.log(' ')
console.log('Assignment with a Returned Value')
console.log('_____________________________')
var changed = 3
function change(num) {
    return num = (num / 3) * 5
}
changed = change(changed)
console.log(changed)
console.log(' ')
console.log('Stand in Line')
console.log('_____________________________')
//Essential for Bless app
theArray = [1,2,3,4,5]
function nextInLine(arr, item) {
    arr.push(item)
    return arr.shift()
}
console.log("Before:\n" + JSON.stringify(theArray))
console.log(nextInLine(theArray, 6))
console.log("After:\n" + JSON.stringify(theArray))
console.log(' ')
console.log('Boolean Values')
console.log('_____________________________')
function welcomeToBoolean() {
    return true //with lowercased "t", and "f" if false
}
console.log(welcomeToBoolean())
console.log(' ')
console.log('If Statements')
console.log('_____________________________')
isItTrueOrFalse = true //TRUE
function trueOrFalse(isItTrueOrFalse) {
    if (isItTrueOrFalse) {
        return "Canon babe"
    }
    return "Impossible"
}
console.log(trueOrFalse(isItTrueOrFalse))
console.log(' ')
console.log('Equality Operators')
console.log('_____________________________')
function isIt13(num) {
    if(num == 13){
        return "Yes, it's 13"
    }
    return "No, it's just a number"
}
console.log(isIt13(134589))
console.log(' ')
console.log('Strict Equality Operators')
console.log('_____________________________')
function isIt3(num) {
    if(num === 3){
        return "Yes, it's Ana, Lo, Gue"
    }
    return "No :("
}
console.log(isIt3("3"))
console.log("hooree")
console.log(' ')
console.log('Inequality Operator with randomness hehe')
console.log('_____________________________')
var num = Math.floor(Math.random() * 10) + 2;
function isItNot1(num) {
    if(num != 1) {
        return "Yes, it's " + num
    }
    return "NO, it's " + num
}
console.log(isItNot1(num))
console.log(' ')
console.log('Strict Inequality Operator')
console.log('_____________________________')
function isItNot13(num) {
    if(num !== 13) {
        return "Yes, it's " + num
    }
    return "No, it's " + num
}
var num = Math.floor(Math.random() * 10) + 4;
console.log(isItNot13(num))
console.log(' ')
console.log('And / Or Operators')
console.log('_____________________________')
console.log('Comparison with the logical \"And\" operator')
console.log('_____________________________')
function testLogicalAnd(val){
    if(val >= 25 && val <= 50){
        return "25<=" + val + "<=50"
    }
}
console.log(testLogicalAnd(27))
console.log(' ')
console.log('_____________________________')
console.log(' ')
console.log('Else Statements')
console.log('_____________________________')
console.log(' ')
console.log('Else If Statements')
console.log('_____________________________')
console.log(' ')
console.log('Logical Order in If Else Statements')
console.log('_____________________________')
console.log(' ')
console.log('Chaining If Else Statements')
console.log('_____________________________')
console.log(' ')
console.log('Golf Code')
console.log('_____________________________')
console.log(' ')