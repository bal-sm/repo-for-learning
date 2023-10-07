boy = True
short = False

if boy == True and short == True:
    print("It's a boy and he is short")
elif boy == True or short == True:
    print("It's a boy or it's short")
else:
    print("It's a none of the two")

x = int(input("Enter number: "))
if x%2 == 0:
    print(x,"is an even number")
elif x%2 == 1:
    print(x,"is an odd number")
else:
    print("We don't know what is",x)