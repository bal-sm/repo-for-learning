def greetingsfunction():
    print ('Welcome User')

greetingsfunction()

def greetings_name(name):
    print ('Welcome '+name)

greetings_name('Bal')

def greetings_name_age(name, age):
    print ('Welcome '+str(name)+str(age))

greetings_name_age("Maman", 32)

def greetings_name_age2(name, age):
    print ('Welcome '+str(name)+' '+str(age))

greetings_name_age2("Maman", 32)

def greetings_name_age3(name, age):
    print ('Welcome ',name,' ',age)

greetings_name_age3("Maman", 32)

def greetings_name_age3baru(name, age):
    print ('Welcome',name,age)

greetings_name_age3baru("Maman", 32)

def greetings_and_names(*names):
    print ('Welcome',names)

greetings_and_names('Jajang', 'Maman', 'Green')

def greetings_name_age4(name, age):
    print ('Welcome',name,age)

greetings_name_age4(name = 'Maman', age = 32)