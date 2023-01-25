try:
    num1 = int(input('Enter a number:\n'))
except ValueError:
    print('That is not an integer')

try:
    op = input('Enter an operator (+, -, x (literally letter x), /, %):\n'+str(num1)+' ')
except:
    print('Something is wrong')

try:
    num2 = int(input('Enter another number:\n'+str(num1)+' '+str(op)+' '))
except ValueError:
    print('That is not an integer')

if op == '+':
    print('The result:',num1+num2)
elif op == '-':
    print('The result:',int(num1)-int(num2))
elif op == 'x':
    print('The result:',int(num1)*int(num2))
elif op == '/':
    print('The result:',int(num1)/int(num2))
elif op == '%':
    print('The result:',int(num1)%int(num2))
else:
    print('Invalid operator')