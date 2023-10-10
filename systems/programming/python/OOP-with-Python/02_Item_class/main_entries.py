from classes.main import Item

from pprint import pprint

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
