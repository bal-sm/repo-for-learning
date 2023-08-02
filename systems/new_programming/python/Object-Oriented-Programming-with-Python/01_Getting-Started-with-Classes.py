# Getting Started with Classes

print("item1")

item1 = "Phone"
item1_price = 100
item1_quantity = 5
item1_price_total = item1_price * item1_quantity

print(type(item1))
print(type(item1_price))
print(type(item1_quantity))
print(type(item1_price_total))

# The output:
# <class 'str'>
# <class 'int'>
# <class 'int'>
# <class 'int'>

# str and int are classes, guys

print("---")

print("item2")


# class Item:
#     pass

# item2 = Item()
# item2.name = "Phone"
# item2.price = 100
# item2.quantity = 5

# print(type(item2))
# print(type(item2.name))
# print(type(item2.price))
# print(type(item2.quantity))

# The output:
# <class '__main__.Item'>
# <class 'str'>
# <class 'int'>
# <class 'int'>

print("---")

print("some_str, string, and some of its methods")

some_str = "opera"
print(some_str.upper())

# The output:
# OPERA

# `upper` is a method from `str` class

# Back to class Item()

print("---")

print("item2, and updated `Item` class")


class Item:
    # def __init__(self):
    #     print("something")
    def calculate_total_price(self, x, y):
        return x * y


item2 = Item()
item2.name = "Phone"
item2.price = 100
item2.quantity = 5
item2_total = item2.calculate_total_price(item2.price, item2.quantity)
# whthppns?   ^___^ passed in as `self`   ^---^ as `x` ^------^ as `y`
print(item2_total)

print("`__init__` method guys, magic pisan")

print("Tulis what is `__int__` definition...")

print("---")
