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
console.log(' ')
console.log('Undefined Value returned')
console.log('_____________________________')
console.log(' ')
console.log('Assignment with a Returned Value')
console.log('_____________________________')
console.log(' ')
console.log('Stand in Line')
console.log('_____________________________')
console.log(' ')
console.log('Boolean Values')
console.log('_____________________________')
console.log(' ')
console.log('If Statements')
console.log('_____________________________')
console.log(' ')
console.log('Equality Operators')
console.log('_____________________________')
console.log(' ')
console.log('And / Or Operators')
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