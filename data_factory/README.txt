My-Sports
Since the project My-Sports itself is not a traditional Data Science project, we had to improvise quite a bit.
While our help with structuring the Database in the backend was imperative, there were no real usage data for us
to handle. As the app/website how we envisioned it would be set up from scratch with no real users or other
(external) datasets we decided to set up a fake user-database ourselves. Based on this we then began to also write
a python code for imaginary events having the ultimate goal in mind to have some sort of matching algorithm to match
users with the type of (sports)events that would be interesting for them.

Prerequisites

Before you continue, ensure you have met the following requirements:

* You have installed the latest version of Python.
* You have installed the necessary modules datetime, random, names, pandas, Any, matplotlib.pyplot and seaborn.
* You have a program for displaying the generated csv files.

There are three runnable python scripts, namely user_gen.py, event_gen.py and stats.py.

The first one to execute is user_gen.py, as it serves as basis for the other two scripts.
Its output is a dataframe of fake users which is dependent on the number you type in and confirm as the programme asks:
Select a number of fake user you want to generate:
Do enter a number and confirm with enter.
The output is created in csv and json format within the same folder.

The second script event_gen.py reads the csv file created by user_gen.py.
It works quite similar to the first script. You will again have to type in the number of events you want to generate.
Note: The input can not extend the number you typed in for user_gen.py.
The output is again a dataframe which is exported in csv and json format (same folder).

The third script stats.py lets you visualize the distribution of male and female fake users generated
as well as their respective height and weight.

