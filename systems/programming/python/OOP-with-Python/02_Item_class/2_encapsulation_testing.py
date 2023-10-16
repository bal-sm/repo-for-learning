from classes.main import Item

item1 = Item(name="My Item", price=750)

print(item1.read_only_name)

# try:
#     item1.read_only_name = "Something else"
# except:
#     print("Tuh error cenah")
