print('Bal Simple Calculator')
num1 = input('Enter a number:\n')
op = input('Enter an operator (+, -, x, /, %):\n'+str(num1)+' ')
num2 = input('Enter another number:\n'+str(num1)+' '+str(op)+' ')

try:
    num1 = int(num1)
    num2 = int(num2)
except ValueError:
    print('Sorry, those aren\'t numbers')
else:
    if op == '+':
        print('Here\'s the result:\n'+str(num1)+' '+str(op)+' '+str(num2)+' =',num1 + num2)
    elif op == '-':
        print('Here\'s the result:\n'+str(num1)+' '+str(op)+' '+str(num2)+' =',num1 - num2)
    elif op == 'x':
        print('Here\'s the result:\n'+str(num1)+' '+str(op)+' '+str(num2)+' =',num1 * num2)
    elif op == '/':
        print('Here\'s the result:\n'+str(num1)+' '+str(op)+' '+str(num2)+' =',num1 / num2)
    elif op == '%':
        print('Here\'s the result:\n'+str(num1)+' '+str(op)+' '+str(num2)+' =',num1 % num2)
    else:
        print('Sorry, the operator is invalid')