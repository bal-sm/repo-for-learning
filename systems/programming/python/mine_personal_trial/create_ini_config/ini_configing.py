import configparser

config = configparser.ConfigParser()

config.add_section("dquran")

config.set("dquran", "font_size", "16")

with open("bless-qt_config.ini", "w") as example:
    config.write(example)
