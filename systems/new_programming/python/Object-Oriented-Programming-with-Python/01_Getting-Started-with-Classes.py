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


class OldItemKlass:
    def __init__(self):
        print("`Item` class created.")

    def calculate_total_price(self, x, y):
        return x * y


item2 = OldItemKlass()
item2.name = "Phone"
item2.price = 100
item2.quantity = 5
item2_total = item2.calculate_total_price(item2.price, item2.quantity)
# whthppns?   ^___^ passed in as `self`   ^---^ as `x` ^------^ as `y`
print(item2_total)

print("`__init__` method guys, magic pisan")

print("Tulis what is `__int__` definition...")

print("---")

print(" ")

print("BTW guys, `__init__` dari `Item` class itu kepanggil setelah instantiation")

print(" ")

print("tuh kalo mari kita instantiate ke `item3`")

item3 = OldItemKlass()

print("tuh kan nongol lagi")

print(" ")

print("---------------------------------------")

print(" ")

print("`item4` and `NewItemWithInit` class")
print("-----------------------------------")
print(" ")


class Item:
    pay_rate = 0.8  # kalo mau bikin angka yang mutlak buat class ini, maksudnya harga didiskon 20%
    THE_PAY_RATE = 0.78  # ini kalo misalnya dibikin as constant, bakal work gak yaaa

    def __init__(self, name: str, price: float, quantity: int = 0):
        # in order, to type checking work you need additional apa sih, pokoknya
        # yang ngecek error gitu, soalnya, python nerima nerima aja.

        # Run validations to the received arguments
        assert price >= 0, f"Naha price = {price}? Ubah ke plus donk"
        assert quantity >= 0, f"Naha quantity = {quantity}? Ubah ke plus donk"

        # Assign to self object
        self.name = name
        self.price = price
        self.quantity = quantity
        # quantity will be defaulted to 0, if it's not specified

        # Print the created instance prop and status
        print(
            f"An instance created with name as {name}, price as {price}, and quantity as {quantity}"
        )

    def updated_calculate_total_price(self):
        return self.price * self.quantity


item4 = Item("MacBook Pro", 100000000, 1)

print(item4.name)
print(item4.price)
print(item4.quantity)

item5 = Item("Chuwi HiBook Pro", 3000000)

print(item5.name)
print(item5.price)
print(item5.quantity)

# You still can add another attributes(sic?) to existing class with `__init__` method defined.

item5.has_robot_keyboard = True

print(item5.has_robot_keyboard)

print(" ")

print("item4&5 total")

print(" ")

item4_total = item4.updated_calculate_total_price()

print(item4_total)

item5_total = item5.updated_calculate_total_price()

print(item5_total)

# kalau misal item6 = NewItemWithInit("WTF", -999, -666)
# then the interpreter will produce AssertionError, and its detailed

print(" ")
print("-----------------------------")
print(" ")

print(Item.pay_rate)
print(Item.THE_PAY_RATE)

print(" ")
print("-----------------------------")
print(" ")
print("Instantiation terus apa kebawa juga gak sih `pay_rate` and `THE_PAY_RATE`")
print(" ")

print(item4.pay_rate)
print(item5.THE_PAY_RATE)

print("tuh guys bisa guys")
