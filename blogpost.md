
### Blog Text

**Introduction** \
 \
MySports is a social platform with the goal of maximising human connectivity across the spectrum of sports, fitness, dance and well-being activities. \
Whether you are looking for a well matched training partner, a chatty friend to take evening jogs with or you want to organise the grandest and most ferocious Table Tennis tournament your town has ever seen: MySports is your tool to find like-minded individuals and be your one-stop portal to create, discover and manage your sporting programme. \
 \
The initial idea of MySports came from Ashneil Sakhrani, web developer on the team; who as a skilled Volleyball and Basketball player had the problem of finding equally-skilled training partners. He needed a product that helped him create competitive games with well-balanced teams. He pitched this idea and attracted a group that had a range of experiences with similar problems- some looking for more challenging martial arts partners, some wanting to finally have full teams for their 5-a-side football games, and some extroverts who just like being out and doing new things with new people. From our early meetings we decided that MySports was going to be flexible and adaptable to the goals of those using it, and cater for the wide range of aerobic activities that we all know are good for us no matter what level you are at. \
 \
Brainstorming the development within the team was bittersweet, as while we were not short of ideas that could make this product truly thrive, we had to negotiate with the project timetable in mind and limit the features to a core MVP. 

This was also not a small list as at a minimum our users should be able to register an account, build a profile, create events, find events, join events, and then further communicate with the other matched users. Our database would have to record user data, event data and relational matching data. Our web build would have to divide this functionality into multiple different sections and our UI options at operating and viewing the matching process were numerous. 

![feature list](blogpost_images/image14.jpg "Compiled advanced feature list")


We also had to prioritise a phone-based web version as the most practical to achieve and the most functional to our goals of spontaneous and easy use. 

We would later adapt the display simultaneously for desktop and even incorporate further version 1.1 ideas, like we Compiled advanced feature list had hoped! The most notable feature being algorithmic suggestion capabilities, devised by the data science team to measure user and event parameters and make informed proposals in the interest of the user.



---


**UX**

The ux team started by storyboarding the usage scenarios and getting into the minds of profiling our potential users. 

Time constraints didn´t allow for extensive user reseach, so we determined a target demographic from letting each team member interview their circle of friends and family.

![persona 1](blogpost_images/Person1.png "Personas")
![persona 2](blogpost_images/Persona2.png)

The demographic we determined from this was mostly young individuals, professionals and students from the ages of roughly 18 to 45; mostly with a pragmatic affinity towards tech; they would prefer using mobile tech solutions for their problems. This would have to be validated in later research, but this also helped us think of and prioritize which features we wanted to include in our first prototype, and which would be for later development. 

For now, it was simultaneously important this wasn’t exclusive and that those both younger and older than these estimations would not be estranged from its use. 

Likewise we discovered that MySports should work in equal favour to those who would be routine and regular in its use and those of spontaneous and irregular nature. 

We did an [extensive analysis](https://www.notion.so/competitor-analysis-39dbe780041049c9a56513d72656dc27) (Link to notion.so) of other sport apps that target a similar demographic 

We wanted to find out where the pain points lie in those sites: where could we offer sth. new and where would be possible points to be improved, regarding functionality, easy flow of use, UI decisions.

After determining the key features, we went on drafting an optimal flow of use.

![use flow](blogpost_images/use_flow2.png "User flow diagrams")
![use flow 2](blogpost_images/use_flow.png "User flow diagrams")

The goal here was to define the “roads to success” for the use; defining the key functions and the way the user reaches the desired goal. Here, the main routes are for finding and signing up for a sport event; or creating your own event. It was equally important that the user had an overview of the other functionality our site offered at all timesk, when needed. 

This led to first ideas about the UI and the site map with the navigation structure; starting with hand-drawn drafts and moving to Lo-fi Wireframes:

![lo-fi wireframe screens](blogpost_images/lofi_screens.png "lo-fi wireframe screens")

We made this clickable for the main use routes we determined before. This process was at times a bit exhausting, since it required us to learn and get familiar with the prototyping tool Figm,  and also getting results quickly because the team needed UX decisions fast in order to start working developing the functionality.   

After numerous testing within the team we were able to further narrow down the site nav structure and do the most important UI decisions:

**UI**

We agreed here to display the events as expandable cards going along with Google´s material design guidelines. We aimed to have a compact scrollable list with the option to get more information about an event on the same screen, with the possibility to explore further. There would be different versions of those cards depending on the type of event (i.e.an event you created, an event you played in the past, etc..). 

Due to the site being a mobile first, we settled to separate filtering menu and page navigation into side drawer menus that could easily be opened and closed with a flick of the thumb. That way we could keep the limited screen estate free for displaying of events.

We also decided we wanted to keep a clean look and feel. So in the main use routes we divided the necessary input into step-by-step processes with multiple screens, with a summary of the user´s input and the option to go back to each input step.

The UI structure of the filter search system was difficult for us. We needed to display lots and lots of filter options in a compact way that´s easy to navigate, while staying consistent with the UI decisions of the rest of the site. We then settled for a list-style filter menu where all filter options could be viewed at one glance. Together with the web developers we determined the filter options we were able to implement for the MVP and which would have to wait for further development (i.e. a GMaps integration for easy location filtering)

![event card final](blogpost_images/event_card1.png)
![event card draft](blogpost_images/event_card2.png)
![hi fi prototype screens](blogpost_images/hifi_proto.png)

Most UI decisions after that happened while creating our Hi-fi Prototype. Choosing Icons, button design and creating a design library with all UI components to speed up the prototype creation and ease the workflow within the UX Team.

One other interesting specificity was that of the chat feature and the dynamics that occur in a group conversation. We opted to rather have the newest message pinned at the top (that made sense with our event display) than at the bottom (like we are familiar with message services.) Choosing to hide older parts of the conversation rather than newer with the keyboard overlay.

![chat function 1](blogpost_images/chat1.png)
![chat function 2](blogpost_images/chat2.png)

Another thing that had to discussed in depth with the team was the design of user profiles, and the amount of info displayed there. We agreed on not showing user profile photos in the MVP as well as having only the most basic info displayed, and making the display optional for some profile information, to allow for some degree of control about what the user reveals or not.

The techlabs presentation marks the finished development of the MVP. With more time, this would be the time to conduct in-depth testing of the design with sample users. A usability interview has already been created. If the development continues after the techlabs semester, testing would be crucial for the further design process.

**Web Development**

As for web development. The back end was created to perform basic functionality (eg. user auth) whilst UX/UI delivered the first prototype. The technology used for the back end was NodeJS, Express, and MongoDB. Basic database structures were created for users and events which would later be tweaked to match UX and Data Science needs. PassportJS was used for user auth and socket.io was used to integrate the in app chat. For the front end React was used. A small debate was had between using bootstrap and material UI which eventually settled on bootstrap. Redux was used for state management which stored user data, events, chat messages, error and success handling. The project moved along quite quickly towards the MVP and was able to be deployed on Heroku with over a week to spare. This allowed users to test and try to break the app and allowed us to create a list of 44 bugs to fix. Over the next week the majority of those bugs were squashed. 

**Data Science**

As data scientists, our goal was to make the app functioning smarter by automating the game matching in the most relevant way possible.
To do so we worked with the backend to ensure that the structure of the database would be optimal for both the web development and the data science needs.
To achieve our final goal we would need to have actual data from users to train a model and extract a model. 

Considering our context and options we decided to go forward following this roadmap:

- step 1: establish the database structure and workflows with the backend team
- step 2: generate fake users and events to have content to work with. Considering the nature of the data we knew that we wouldn't be able to use an ML algorithm on them to identify patterns and extract a model. However, we made all possible to make the data realistic possible (ex: heights and weights data follow a Gaussian distribution with the real-life average for german males and females heights and BMI). 
- step 3 (current step): create a first recommendation scoring algorithm program that generates a matrix of best events for each sport and for each user. The early algorithm would be a polynomial model with different parameters (ex: the distance between the football skill level of the player to the average of the event participants for each game) and weights for these parameters. And the matrix would have for each player the event with the higher score for each sport.
Those weights which represent the importance for each parameter and which could be negative or positive (skill distance is negative as we want to have players with the closer level as possible) were decided for the first version by UX/UI team and DS team.
- step 4: connect our recommendation algorithm to the actual database using APIs
- step 5: once the site has real user data use ML algorithms to create a new model that will challenge the first recommendation algorithm based on human insight with a model based on actual user behavioral data and then tweak this new algorithm over time.




---


 

**Features for further development**

For later versions we as a team thought of a lot of additional features that would greatly benefit the user experience and usefulness. 

First and foremost, decreasing the possibilities of misusing the system and making it more secure. This would be achieved e.g. with a possibility to flag or report users, or a possibility to rate other users or leave openly displayed comments. We feel this is an important but also sensible topic which has to be addressed and thoroughly discussed.

Other features we thought of:



*   A social media- functionality, with the possibility of following another user, or even liking his events.You get notified when a user who you are following creates a new event.
*   Implementing an option for competitive games; i.e. team creation, track and display of game results. An option to save a team for later games ( the users in the team would get notified when you create a new team event)
*   Option to set an exercising goal, or personal goal of a sport event. This could be e.g. competitive, cardio, weight loss or maybe just casual sport to meet new people.



---

