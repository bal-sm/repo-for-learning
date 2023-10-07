num1 = input('Enter a number:\n')
op = input('Enter an operator (+, -, x (literally letter x), /, %):\n'+str(num1)+' ')
num2 = input('Enter another number:\n'+str(num1)+' '+str(op)+' ')

if op == '+':
    print('The result:',int(num1)+int(num2))
elif op == '-':
    print('The result:',int(num1)-int(num2))
elif op == 'x':
    print('The result:',int(num1)*int(num2))
elif op == '/':
    print('The result:',int(num1)/int(num2))
elif op == '%':
    print('The result:',int(num1)%int(num2))
else:
    print('The operator is invalid')