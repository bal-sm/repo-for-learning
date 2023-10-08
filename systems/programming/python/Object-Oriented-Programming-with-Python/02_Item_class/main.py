import csv

from decimal import Decimal
from pprint import pprint


class Item:
    pay_rate = 0.8

    all = []

    def __init__(self, name: str, price: Decimal, quantity: int = 0):
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
        # print(
        #     f"An instance created with name as {name}, price as {price}, and quantity as {quantity}"
        # )

        # Actions to execute
        Item.all.append(self)

    def calculate_total_price(self):
        return self.price * self.quantity

    def apply_discount(self):
        self.price = self.price * self.pay_rate
        # jadi `pay_rate` nya tergantung juga dari instantiation nya

    # this is a class method soalnya bisa muncul tanpa harus ada instatiation nhya
    @classmethod
    def instantiate_from_csv(cls):
        with open("some_item_examples.csv", "r") as f:
            reader = csv.DictReader(f)
            items = list(reader)

        for item in items:
            # print(item)
            # ?: `Item` vs `cls`? HM?
            cls(  # ! Aku ganti jadi `cls` dari `Item` soalnya jadi sama aja.
                name=item.get("name"),
                price=Decimal(
                    item.get("price")
                ),  # soalnya di detect nya str, terus float soalnya bisa koma koma
                quantity=int(item.get("quantity")),
            )

    @staticmethod
    def is_integer(num):
        # We will count out the floats that are point zero
        # For i.e: 5.0, 10.0
        if isinstance(num, float):
            # Count out the floats that are point zero, like 5.0, 10.0.
            return num.is_integer()
        elif isinstance(num, int):
            # Kalau 5 dan 10 ya udah we.
            return True
        else:
            # ya udah we.
            return False

    # https://www.youtube.com/watch?v=FIaPZXaePhw&t=0s
    def __repr__(self):
        return f"Item('{self.name}', {self.price}, {self.quantity})"

    # hhmm how to escape " character on f strings


# item1 = Item("iPhone 15", 20000000, 1)
# item2 = Item("MacBook Pro M3 Max", 99000000, 2)
# item3 = Item("Framework Laptop 16 Inch AMD 7000 sekian", 40000000, 1)
# item4 = Item("Mouse", 30000000, 1)
# item5 = Item("Keyboard", 63424, 1)

# /b/bin/python /var/home/d/Documents/d_project/repo-for-learning/systems/new_programming/python/Object-Oriented-Programming-with-Python/02_OOP_Python.py
# [<__main__.Item object at 0x7f8467728a50>, <__main__.Item object at 0x7f8467728a90>, <__main__.Item object at 0x7f8467728ad0>, <__main__.Item object at 0x7f8467728b10>, <__main__.Item object at 0x7f8467728b50>]
# tuh five element guys

# print nya ~~dicomment dulu aja~~ dibuka lagi guys.

# for instance in Item.all:
#     print(instance.name)

Item.instantiate_from_csv()
# note that you need open terminal directly in this directory

# ditampung disini guys, setiap instantiation nya
print("Item.all =")
pprint(Item.all)
