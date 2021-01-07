import random2 as rd
import names as nm
import pandas as pd

#Reminder of all mail, username, password, name, dob, gender, location, lastName

#set lists
genders = []
username = []
names = []
lastName = []
username = []
password = []
dob = []
location = []
heights = []
weights = []

#set number of users we want to generate
x = 25
i=0

#creating a DataFrame for the userbase
userbase = pd.DataFrame()

#Generate genders for x users
while i < x:
    g = rd.randint(0,1)
    if g == 0:
        genders.append("female")
    else:
        genders.append("male")
    i=i+1
print(genders)

#Generate names based on gender
i = 0
while i < x

#Generate Family name

#Generate e-mail address

#Generate username

#Generate password

#Generate date of birth

#Generate location

# Generate Heights

#Generate Weights

#Unify all list in the DataFrame

#Export it in csv