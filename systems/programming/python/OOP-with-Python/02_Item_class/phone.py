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


if __name__ == "__main__":
    pprint(Phone.__dict__)
