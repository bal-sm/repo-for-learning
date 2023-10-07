print('======================')

print('opening coun_files')
coun_files = open("C:/Users/balsemanget/Documents/Bal_Insync/OneDrive_Polban/Polban (Pindah Dari Google Drive)/Semester 8/Belajar Python/Python_Coba_coba_Code/Bal_Testa_18_Reading_Files/countries.txt", 'r')
try:
    print(coun_files.readable())
except:
    print('coun_files is not readable anymore')
else:
    print('coun_files is readable, hooray')

print('======================')

print('closing coun_files')
coun_files.close()
try:
    print(coun_files.readable())
except:
    print('coun_files is not readable anymore')
else:
    print('coun_files is readable, hooray')

print('======================')

print('opening coun_files (again)')
coun_files = open("C:/Users/balsemanget/Documents/Bal_Insync/OneDrive_Polban/Polban (Pindah Dari Google Drive)/Semester 8/Belajar Python/Python_Coba_coba_Code/Bal_Testa_18_Reading_Files/countries.txt", 'r')
try:
    print(coun_files.readable())
except:
    print('coun_files is not readable anymore')
else:
    print('coun_files is readable (again), hooray')

print('======================')

print('print(coun_files.readlines(3))')
print(coun_files.readlines(3))
print('Hmm weird')

print('======================')

print('print(coun_files.readline())')
print(coun_files.readline())
print(coun_files.readline())

print('======================')

print('print(coun_files.readlines())')
print(coun_files.readlines())

print('======================')

print('closing coun_files (again)')
coun_files.close()
try:
    print(coun_files.readable())
except:
    print('coun_files is not readable anymore')
else:
    print('coun_files is readable, hooray')

print('======================')

print('opening coun_files (again) (again)')
coun_files = open("C:/Users/balsemanget/Documents/Bal_Insync/OneDrive_Polban/Polban (Pindah Dari Google Drive)/Semester 8/Belajar Python/Python_Coba_coba_Code/Bal_Testa_18_Reading_Files/countries.txt", 'r')
try:
    print(coun_files.readable())
except:
    print('coun_files is not readable anymore')
else:
    print('coun_files is readable (again) (again), hooray')

print('======================')

print('print(coun_files.readlines(3))')
print(coun_files.readlines(3))
print('Hmm still weird but whatever')

print('======================')

print('closing coun_files (agains)')
coun_files.close()
try:
    print(coun_files.readable())
except:
    print('coun_files is not readable anymore')
else:
    print('coun_files is readable, hooray')

print('======================')

print('opening coun_files (agains)')
coun_files = open("C:/Users/balsemanget/Documents/Bal_Insync/OneDrive_Polban/Polban (Pindah Dari Google Drive)/Semester 8/Belajar Python/Python_Coba_coba_Code/Bal_Testa_18_Reading_Files/countries.txt", 'r')
try:
    print(coun_files.readable())
except:
    print('coun_files is not readable anymore')
else:
    print('coun_files is readable (again) (again), hooray')

print('======================')

print('''
for bal_lines in coun_files:
    print(bal_lines)
''')
for bal_lines in coun_files:
    print(bal_lines)

print('======================')

print('closing coun_files (agains)')
coun_files.close()
try:
    print(coun_files.readable())
except:
    print('coun_files is not readable anymore')
else:
    print('coun_files is readable, hooray')

print('======================')

print('opening coun_files (agains)')
coun_files = open("C:/Users/balsemanget/Documents/Bal_Insync/OneDrive_Polban/Polban (Pindah Dari Google Drive)/Semester 8/Belajar Python/Python_Coba_coba_Code/Bal_Testa_18_Reading_Files/countries.txt", 'r')
try:
    print(coun_files.readable())
except:
    print('coun_files is not readable anymore')
else:
    print('coun_files is readable (again) (again), hooray')

print('======================')

print('''
for new_bal_lines in coun_files.readlines():
    print(new_bal_lines)
''')
for new_bal_lines in coun_files.readlines():
    print(new_bal_lines)

print('======================')
print('reading files course done')