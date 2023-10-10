from phone import Phone

from pprint import pprint

phone_1 = Phone(name="iPhone 15", price=20_000_000, quantity=5)
phone_1.broken_phones = 2

phone_2 = Phone(name="iPhone 15 Pro max", price=30_000_000, quantity=5)
phone_2.broken_phones = 4

print("Phone.all = ")
pprint(Phone.all)

# 'cause overheating issues.
