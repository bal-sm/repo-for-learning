from classes.main import Item

"""
item1 = Item(name="My Item", price=750)

print(item1.read_only_name)

# try:
#     item1.read_only_name = "Something else"
# except:
#     print("Tuh error cenah")
"""

item1 = Item(name="My Item", price=750)

item1._name = "Something else"  # Masih bisa diubah
print(item1.name)
