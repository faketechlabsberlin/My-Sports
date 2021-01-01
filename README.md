# My-Sports

Once you pull the file please follow the instructions below to be able to run the prototype.

1 - You will first need to have Mongo DB installed on your computer. If you do not please follow the instructions listed here:
    https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials

    Once you have installed mongo please make sure it works by opening a terminal window and running the command:
    'mongo'

    If the db starts successfully please ignore the next step:
        If it does not work you may have to complete an extra step of running Mongod. Do so by running the following command:
        'brew services start mongodb-community@4.4'

2 - Open a terminal window and cd into the MY-SPORTS directory. Once in, run the following command:
    'npm install'

3 - Step 2 will take a while to complete. While that runs open another terminal window and cd into MY-SPORTS/my_sports_front.
    Once in, run the following command:
    'yarn'

4 - Go back to the previous terminal where you ran 'npm install'. Once the installation process is complete, run command:
    'node index.js'
    If everything is functioning properly you should see:
    'Server listening on 5000'
    'Mongoose connectino open'

5 - Go to the terminal where you ran 'yarn'. Once that is complete, run the command:
    'yarn start'
    If everything is functioning properly you will be redirected to your default browser with the app running. 
