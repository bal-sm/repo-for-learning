//Source: https://www.youtube.com/watch?v=PkZNo7MFNFg
//0:00:00 Introduction
//Hello World
//0:01:24 Running JavaScript
console.log('Running JavaScript')
console.log('__________________')
console.log('Is it running?')
console.log(' ')
//0:04:23 Comment Your Code
//no comment
//0:05:56 Declare Variables
console.log('Declare Variables')
console.log('_________________')
var myName = "Iqbal Syifa Mahmuda";
console.log(myName);
console.log(' ')
//Changing Variables
console.log('Changing Variables')
console.log('__________________')
myName = "Mahdi"
console.log(myName);
//with let
let myHusband = "Muhammad saw."
console.log(myHusband)
//var with no assignment operator
var nothing
console.log(nothing)
console.log(' ')
//undefined
//0:06:15 Storing Values with the Assignment Operator
console.log('Storing Values with the Assignment Operator')
console.log('___________________________________________')
var alreadyDoneThat;
alreadyDoneThat = 'Nope, you haven\'t'
console.log(alreadyDoneThat);
console.log(' ')
//0:11:31 Initializing Variables with the Assignment Operator
console.log('Initializing Variables with the Assignment Operator')
console.log('___________________________________________________')
var alreadyDoneThat2 = "Already Done That 2";
console.log(alreadyDoneThat2);
console.log(' ')
//0:11:58 Uninitialized Variables
console.log('Uninitialized Variables')
console.log('_______________________')

var a = 5
var b = 12
var c = "I'm "

console.log("Before")
console.log(a)
console.log(b)
console.log(c)

a = a + 5
b = b + 7
c = c + "Mahamuda"

console.log("After")
console.log(a)
console.log(b)
console.log(c)
console.log(' ')
//0:12:40 Case Sensitivity in Variables
console.log('Case Sensitivity in Variables')
console.log('_____________________________')

var TaKbIsABeRsAma
try {
    console.log(takbisabersama)
}
catch(err) {
    console.log('pasti bisa sayang, selamanya, don\'t worry')
}
console.log(' ')
//0:14:05 Basic Math
console.log('Basic Math')
console.log('__________')
var a = 5
console.log('a = ' + a)
a += 5
console.log('a = a + 5 atau a += 5')
console.log('a = ' + a)
console.log(' ')
//0:15:30 Increment and Decrement
console.log('Increment and Decrement')
console.log('_______________________')
console.log('~already done incremental operation~')
var b = 10
console.log('b = ' + b)
b -= 3
console.log('b = b - 3 atau b -= 3')
console.log('b = ' + b)
console.log(' ')
//0:16:22 Decimal Numbers
console.log('Decimal Numbers')
console.log('_______________')
var aDecimal = 2.7
console.log(aDecimal)
var tiga_terus = 1/3
console.log(tiga_terus)
//round the numbers
aDecimal = Math.round(aDecimal)
console.log(aDecimal)
tiga_terus = Math.round(tiga_terus)
console.log(tiga_terus)
console.log(' ')
//0:16:48 Multiply Two Decimals
console.log('Multiply Two Decimals')
console.log('_____________________')
var product = 2.5 * 2.0
console.log('product = 2.5 * 2.0')
console.log('product = ' + product)
var tiga_terus = 1/3
console.log('tiga_terus = ' + tiga_terus)
tiga_terus *= 3
console.log('tiga_terus *= 3')
console.log('tiga_terus = ' + tiga_terus)
console.log(' ')
//0:17:18 Divide Decimals
console.log('Divide Decimals')
console.log('_______________')
var tiga_terus = 1
console.log('tiga_terus = 1')
tiga_terus /= 3
console.log('tiga_terus /= 3')
console.log('tiga_terus = ' + tiga_terus)
console.log(' ')
//0:17:33 Finding a Remainder
console.log('Finding a Remainder')
console.log('___________________')
var remainder
remainder = 11 % 3
console.log('remainder = 11 % 3')
console.log('remainder = ' + remainder)
console.log(' ')
//0:18:22 Augmented Math Operations
console.log('Augmented Math Operations')
console.log('_________________________')

console.log(' ')

var a = 1
var b = 1
var c = 1
var d = 1

console.log(' ')

console.log('a = 1')
console.log('b = 1')
console.log('c = 1')
console.log('d = 1')

console.log(' ')

a += 5
b -= 3
c /= 3
d *= 3

console.log(' ')

console.log('a += 5')
console.log('b -= 3')
console.log('c /= 3')
console.log('d *= 3')

console.log(' ')

console.log('a = ' + a)
console.log('b = ' + b)
console.log('c = ' + c)
console.log('d = ' + d)

console.log(' ')
//0:21:19 Declare String Variables
console.log('Declare String Variables')
console.log('________________________')
var myStr = "I'm gonna save the world and people of the akhirat"
console.log(myStr)
console.log(' ')
//0:22:01 Escaping Literal Quotes
console.log('Escaping Literal Quotes')
console.log('_______________________')
var penggalan
penggalan = "\"people\""
console.log(penggalan)
console.log(' ')
//0:23:44 Quoting Strings with Single Quotes
console.log('Quoting Strings with Single Quotes')
console.log('__________________________________')
console.log('Assalamu\'alaikum Warrahmatullaahi Wabarakaatuh')
console.log(' ')
//0:25:18 Escape Sequences
console.log('Escape Sequences')
console.log('________________')
/*
CODE    OUTPUT
 \'  single quote
 \"  double quote
 \\  backslash
 \n  newline
 \r  carriage return
 \t  tab
 \b  backspace
 \f  form feed
*/
console.log('Politeknik Negeri Bandung\nTerbaik')
console.log('Institut Teknologi Bandung\r\nNyesel misah :P')
console.log('\tTeh')
console.log(' ')
//0:26:46 Plus Operator
console.log('Plus Operator')
console.log('_____________')
var first = "The first. "
var last = "The last."
console.log(first + last)
console.log(' ')
//0:27:49 Plus Equals Operator
console.log('Plus Equals Operator')
console.log('____________________')
var someString = "Hello "
someString += "G."
console.log(someString)
console.log(' ')
//0:29:01 Constructing Strings with Variables
console.log('Constructing Strings with Variables')
console.log('___________________________________')
var im = "3"
var what = "IM" + im + " asa jadi lebih mahal. engga beb. oh iya atuh :*"
console.log(what)
console.log(' ')
//0:30:14 Appending Variables to Strings
console.log('Appending Variables to Strings')
console.log('______________________________')
var someAdjective = "worthwhile"
var coding = "Learn to code is "
coding += someAdjective
console.log(coding)
console.log(' ')
//0:31:11 Length of a String