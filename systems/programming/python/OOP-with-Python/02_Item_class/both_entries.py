from pprint import pprint
from main import Item
from phone import Phone


phone_wow = Phone(name="iPhone 15 Pro max", price=30_000_000, quantity=5)
phone_wow.broken_phones = 4

motorcycle = Item(name="Vario", price=10_000_000, quantity=2_000)

print("Item.all =")
pprint(Item.all)

print("Phone.all =")
pprint(Phone.all)

# * frick Item.all = Phone.all
# ! harusnya beda
# TODO nanti solve ya.
