from dataclasses import replace


origin_sentence = input('Enter the original sentence : ')
print('Okay, the original sentence is \"' + origin_sentence + '\"')
wordwhat = input('Now, enter the word to replace : ')
wordwith = input('Then, enter the word to replace it with : ')
new_sentence = origin_sentence.replace(wordwhat, wordwith)
print('Your new sentence now is \"' + new_sentence + '\"')