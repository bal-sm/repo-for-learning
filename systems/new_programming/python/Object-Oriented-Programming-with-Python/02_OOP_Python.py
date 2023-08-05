class Item:
    pay_rate = 0.8

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
        # print(
        #     f"An instance created with name as {name}, price as {price}, and quantity as {quantity}"
        # )

    def calculate_total_price(self):
        return self.price * self.quantity

    def wow_apply_discount(self):
        self.price = self.price * self.pay_rate
        # jadi `pay_rate` nya tergantung juga dari instantiation nya
