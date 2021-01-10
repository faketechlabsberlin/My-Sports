from datetime import datetime
import random as rd
import names
import pandas as pd

# Reminder of all user variables: mail, username, password, name, dob, gender, location, lastName

# set lists
districts = ['Berlin-Mitte', 'Charlottenburg', 'Prenzlauer Berg', 'Friedrichshain', 'Kreuzberg', 'Neukölln']
genders = []
username = []
names_list = []
lastName = []
password = []
dob = []
location = []
heights = []
weights = []
mail = []

# set number of users we want to generate
x = 25
i1, i2, i3, i4, i5, i6, i7, i8 =0, 0, 0, 0, 0, 0, 0, 0

#creating a DataFrame for the userbase
userbase = pd.DataFrame()

#Generate genders for x users
while i1 < x:
    g = rd.randint(0,1)
    if g == 0:
        genders.append("female")
    else:
        genders.append("male")
    i1 += 1
print(genders)

#Generate names based on gender
for gdr in genders:
    names_list.append(names.get_first_name(gdr))
print(names_list)

#Generate Family name

while i2 < x:
    gen=names.get_last_name()
    lastName.append(gen)
    i2+=1
print(lastName)

#Generate e-mail address

while i4 <x:
    email = names_list[i4] + '.' + lastName[i4] + '@email.com'
    mail.append(email)
    i4 += 1
print(mail)

#Generate usernames and passwords

while i5 <x:
    unam = names_list[i5] + lastName[i5] + str(rd.randint(0,2000))
    username.append(unam)
    password.append('12345')
    i5 += 1
print(username)
print(password)

#Generate date of birth

def create_random_datetime(from_date, to_date, rand_type='uniform'):
    delta = to_date - from_date
    if rand_type == 'uniform':
        rand = rd.random()
    else:
        raise NotImplementedError('Unknown random mode \'{}\''
                                  .format(rand_type))
    return from_date + rand * delta

while i6<0:
    dob.append(create_random_datetime(datetime(1950,1,1), datetime(2003,1,1)))
    i6 += 1
print(dob)

#Generate location
while i7<0:
    loca = districts[rd.randint(0,(len(districts-1)))]
    location.append(loca)
    i7 += 1
print(location)

#Generate Heights using gaussian distribution
while i3 < x:
    heights.append(rd.gauss(1.75, 0.25))
    i3 += 1
print(heights)

#Generate Weights using heights and a gaussian distribution of BMI
while i8 < x:
    hgts = heights[i8]
    bmi = rd.gauss(25,5)
    m = hgts**2 * bmi
    weights.append(m)
    i8 += 1
print(weights)

#Unify all list in the DataFrame

# Reminder of all user variables: mail, username, password, name, dob, gender, location, lastName, heights, weights

df = pd.DataFrame({'mail': mail, 'username': username, 'password':password, 'name':names_list, 'dob':dob, 'gender':genders,
                   'location':location, },
                  columns=['mail', 'username', 'password'])
print(df.head(5))

#Export it in csv
