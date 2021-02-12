# MySports

MySports is the final group project which was created in order to complete the Berlin TechLabs Bootcamp. The team disciplines included UX/UI design, Web Development, and Data Science. All disciplines were put into practice to develop MySports. MySports is an event creation platform specifically aimed to match users into teams for various sports. Users are matched based on search criteria and filters and then are able to communicate in an integrated event chatroom to discuss details. A deployed version can be found here:

https://blooming-ridge-65166.herokuapp.com/login

### Screenshots
<img width="355" alt="Screenshot 2021-02-01 at 15 34 52" src="https://user-images.githubusercontent.com/70976690/106473151-bd1a5b00-64a3-11eb-9ee6-43b8c622015f.png">
<img width="354" alt="Screenshot 2021-02-01 at 15 38 02" src="https://user-images.githubusercontent.com/70976690/106473217-d15e5800-64a3-11eb-8795-a2b1e7acecb4.png">
<img width="356" alt="Screenshot 2021-02-01 at 15 39 19" src="https://user-images.githubusercontent.com/70976690/106473243-dae7c000-64a3-11eb-88d4-de2141c82b54.png">
<img width="354" alt="Screenshot 2021-02-01 at 15 38 34" src="https://user-images.githubusercontent.com/70976690/106473255-df13dd80-64a3-11eb-8812-487bd311c172.png">
<img width="353" alt="Screenshot 2021-02-01 at 15 39 44" src="https://user-images.githubusercontent.com/70976690/106473285-e89d4580-64a3-11eb-8de1-d09a6b09a2f4.png">

### Project Status

The project is still in production. MVP restrictions include: 
* Event location is restricted to popular Berlin districts.
* Event type list is restricted to Basketball, Volleyball, Football, Running, Yoga, Table-Tennis, and Bouldering.
* Data Science matching and optimization added but not implemented yet.

The aim is to remove all mentioned restrictions as future versions are produced. 

### Installation and Setup Instructions

Clone down this repository. You will need node, and npm/yarn installed globally on your machine.

Installation:

`npm install`
`cd my_sports_front`
`yarn`

Run:

`node index.js`

Open a new terminal tab and then:

`cd my_sports_front`
`yarn start`

Please make sure to have MongoDB installed to run locally. Default local port for mongo is 27017.

To Visit App:

localhost:3000/login

### data_factory
Since the project My-Sports itself is not a traditional Data Science project, some improvisation was required. While help with structuring the Database in the backend was imperative, there were no real usage data to handle. As the app/website would be set up from scratch with no real users or other (external) datasets it was decided  to set up a fake user-database. Based on this you will find python code for imaginary events with the ultimate  goal in mind to have a matching algorithm to match users with the type of (sports)events that would be interesting for them.

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

The third script, stats.py, lets you visualize the distribution of male and female fake users generated as well as their respective height and weight.

### Technologies Used

The technologies implemented in this project include Express, Node, Python, React, Redux, MongoDB, Nodemailer, Socket.io, PassportJS, Axios, MomentJs, Bootstrap, and SCSS. 

### Contributors

* Alex NeuSchafer - UX/UI Design
* Ashneil Sakhrani - Web Development / Project Lead
* Barney Riley - UX/UI Design
* Catia Goncalves - Web Development
* Jan-Henrik Pot - Data Science
* Kwame - Web Development *
* Sam - Data Science
