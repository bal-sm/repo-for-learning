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
        return (
            f"{self.__class__.__name__}('{self.name}', {self.price}, {self.quantity})"
        )

    # Encapsulation
    # -------------


if __name__ == "__main__":
    pprint(Item.__dict__)
