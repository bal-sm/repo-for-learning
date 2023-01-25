bal_list = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print("""
print(bal_list)
print(bal_list[0])
print(bal_list[0][1])
""")
print('=====================')
print(bal_list)
print(bal_list[0])
print(bal_list[0][1])

for rows in bal_list:
    for each in rows:
        print(each)

print('=====================')

for rows in bal_list:
    print(rows)
    print(',')
    for each in rows:
        print(each)
        print(',,')

print('=====================')