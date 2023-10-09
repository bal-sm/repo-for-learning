from main import Item

from decimal import Decimal
from pprint import pprint


class Phone(Item):
    def __init__(
        self, name: str, price: Decimal, quantity: int = 0, broken_phones: int = 0
    ):
        # Call to `super` function to have access to all attributes / methods
        super().__init__(name=name, price=price, quantity=quantity)

        # Run validations to the received arguments
        assert (
            broken_phones >= 0
        ), f"Naha broken_phones = {broken_phones}? Ubah ke plus donk"

        # Assign to self object
        self.broken_phones = broken_phones

        # Append to this class
        Phone.all.append(self)


phone_1 = Phone(name="iPhone 15", price=20_000_000, quantity=5)
phone_1.broken_phones = 2

phone_2 = Phone(name="iPhone 15 Pro max", price=30_000_000, quantity=5)
phone_2.broken_phones = 4

print("Phone.all = ")
pprint(Phone.all)

# 'cause overheating issues.
