//0:32:01 Bracket Notation
console.log('Bracket Notation')
console.log('________________')
var firstName = "Aja";
var firstLetterOfFirstName = "";
firstLetterOfFirstName = firstName[0]
console.log(firstLetterOfFirstName)
console.log(' ')
//0:33:27 Understand String Immutability
console.log('Understand String Immutability')
console.log('______________________________')
var underStr = "Gello World"
console.log(underStr)
try {
    underStr[0] = "H"
}
catch(err) {
    console.log('can\'t but not catched, idky')
}
console.log(' ')
//0:34:23 Find the Nth Character
console.log('Find the Nth Character')
console.log('______________________')
var secondLetterOfFirstName = "";
secondLetterOfFirstName = firstName[1]
console.log(secondLetterOfFirstName)
console.log(' ')
//0:36:28 Word Blanks
console.log('Word Blanks')
console.log('___________')
function wordBlanks(noun, verb, adjective, what, adverb){
    var sentence = "A" + " " + adjective + " " + noun + " " + verb + " " + what + " " + adverb
    return sentence
}

console.log(wordBlanks("cat", "goes", "cute", "to the mall", "meowly"))
console.log(' ')
//0:40:44 Arrays
console.log('Arrays')
console.log('______')
var anArray = [1, 2, 3]
console.log(anArray)
console.log(' ')
//0:41:43 Nest Arrays
console.log('Nest Arrays')
console.log('___________')
var aNestedArray = [1, [1, 2], [1, 2, 3]]
console.log(aNestedArray)
console.log(' ')
//0:42:33 Access Array Data
console.log('Access Array Data')
console.log('_________________')
console.log(anArray[0])
console.log(anArray[1])
console.log(anArray[2])
console.log(' ')
//0:43:34 Modify Array Data
console.log('Modify Array Data')
console.log('_________________')
console.log('Before')
console.log(anArray)
anArray[1] = 5
console.log(' ')
console.log('anArray[1] = 5')
console.log(' ')
console.log('After')
console.log(anArray[1])
console.log(anArray)
console.log(' ')
//0:44:48 Access Multi-Dimensional Arrays
console.log('Access Array Data')
console.log('_________________')
console.log(aNestedArray[1][0])
console.log(aNestedArray[2][1])
console.log(' ')
// tambahan: Modify Multi-Dimensional Arrays
console.log('Modify Multi-Dimensional Arrays')
console.log('_______________________________')
console.log('Before')
console.log(aNestedArray)
aNestedArray[2][1] = 5
console.log(' ')
console.log('aNestedArray[2][1] = 5')
console.log(' ')
console.log('After')
console.log(aNestedArray)
console.log(' ')
//0:46:30 push()
console.log('push()')
console.log('_________________')
anArray.push(99)
console.log(anArray)
console.log(' ')
//0:47:29 pop()
console.log('pop()')
console.log('_________________')
var Kpop = aNestedArray.pop()
console.log(Kpop)
console.log(aNestedArray)
console.log(' ')
//0:48:33 shift()
console.log('shift()')
console.log('_________________')
var Kshift = aNestedArray.shift()
console.log(Kshift)
console.log(aNestedArray)
console.log(' ')
//0:49:23 unshift()