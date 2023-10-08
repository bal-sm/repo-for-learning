from main import Item


class Phone(Item):
    pass


phone_1 = Phone(name="iPhone 15", price=20_000_000, quantity=5)
phone_1.have_overheating_issues = 2

phone_2 = Phone(name="iPhone 15 Pro max", price=30_000_000, quantity=5)
phone_2.have_overheating_issues = 4
