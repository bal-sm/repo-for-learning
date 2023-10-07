try:
    x = int(input('Input an integer:'))
    print(x)
except:
    print('Something is wrong')

print('=====================')

try:
    y = int(input('Input an integer:'))
    print(y)
except ValueError:
    print('That is not an integer')

print('=====================')

try:
    z = int(input('Input an integer:'))
except:
    print('Something is wrong')
else:
    print('z is',z,"OK!")

print('=====================')

try:
    a = int(input('Input an integer:'))
except:
    print('Something is wrong')
else:
    print('a =',a,"OK!")
finally:
    print('try except course completed')