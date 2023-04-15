ar_num = "۰١٢٣٤٥٦٧٨٩"
en_num = "0123456789"

table = str.maketrans(en_num, ar_num)

normalized = "643256284534".translate(table)
print(normalized)
