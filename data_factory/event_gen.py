from datetime import datetime
import random as rd
import pandas as pd

userlist = pd.read_csv('generated_userbase.csv')
sport_list = ['football', 'yoga', 'volley', 'basketball', 'rugby']
ucount = len(userlist.index)
i1, i2, i3, i4, i5, i6, i7, i8 = 0, 0, 0, 0, 0, 0, 0, 0

print(str(ucount) + ' users available to generate events')

x = int(input('how many even should we generate ?'))

# host: type: String,
hosts = []
hostnames = []
while i1 < x:
    g = rd.randint(0,ucount)
    hosts.append(g)
    hostnames.append(userlist.iat[g,2])
    i1 += 1
print(hosts)
print(hostnames)

#sport: type: String,
sports=[]
while i2 < x:
    sp = rd.randint(0,4)
    sports.append(sport_list[sp])
    i2 += 1
print(sports)

# title: type: String,

# size: type: Number,
size=[]
while i3 < x:
    if sports[i3] == 'football' or 'rugby' or 'basket' or 'volleyball':
        sz = rd.randint(8,22)
    else:
        sz = rd.randint(2, 6)
    size.append(sz)
    i3 += 1
print(size)

#time:       type: String,
# date  type: Date,

# location: {
location = []
while i4 < x:
    location.append(userlist.iat[i4,7])
    i4 += 1
print(location)

# teammates: type: mongoose.Schema.Types.ObjectId, required: 'Teammate is required', ref: 'User'
team_lists = []
def playerlist(pl):
    sgame = []
    sco = 0
    while sco < size[pl]:
        player= rd.randint(0,ucount)
        if sgame.count(player) == 1:
            continue
        sgame.append(player)
        sco += 1
    return sgame

while i5 < x:
    team_lists.append(playerlist(i5))
    i5 += 1
print(team_lists)

# skill: {type: Number default},
# equipment : type: Boolean,
# active :type: Boolean,
# about: