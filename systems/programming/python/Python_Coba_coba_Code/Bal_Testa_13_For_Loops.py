print('=====================')

for letter in 'Hello':
    print(letter)

print('=====================')

for bal_x in 'Hello':
    print(bal_x)

print('=====================')

bal_list = ['apapun', 'minumnya', 'teh', 'botol', 'sostroamijoyo']
for bwhatever in bal_list:
    print(bwhatever)

print('=====================')

bal_dict = {
    'minumnya' : 'teh botol sostroamijoyo',
    'makannya' : 'nasi goreng',
    'nyemilnya' : 'batagor', #boleh loh ternyata ada , nya
}
for apaaja in bal_dict:
    print(apaaja)

print('=====================')

for bwhatever in bal_list:
    print(bwhatever)
    if bwhatever == 'teh':
        break

print('=====================')

for bwhatever in bal_list:
    if bwhatever == 'teh':
        break
    print(bwhatever)

print('=====================')

for x in range(10):
    print(x)

print('=====================')

for x in range(3,7):
    print(x)

print('=====================')

for x in range(7):
    print(x)
else:
    print('Percobaan Pertama')

print('=====================')

for x in range(3,7):
    print(x)
print("Percobaan kedua")