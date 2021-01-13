import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

data = pd.read_csv('generated_userbase.csv')
print(data.head(5))

sns.lmplot(x='heights', y='weights', data=data, hue='gender')
plt.show()