from datetime import datetime
import random as rd
import pandas as pd

i1, i2, i3, i4, i5, i6, i7, i8 = 0, 0, 0, 0, 0, 0, 0, 0

#recover userbase and generated events
events= pd.read_csv('generated_events.csv')
userbase=pd.read_csv('generated_userbase.csv')

list_users=userbase['username'].tolist()
print(list_users)
foot_games=events.loc[events['sport'] == 'football']
list_pos=foot_games.index.tolist()
print(userbase)

#find the best football game
def best_foot(user):
    #skill based
    skl_dist=[]
    u_skl=userbase.loc[user]['skills_football']
    for i in list_pos:
        skl_dist.append(foot_games.loc[i]['skill']-u_skl)
    print(skl_dist)
f
best_foot(25)