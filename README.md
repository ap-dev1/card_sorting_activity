# personal_values

Overview
This version of the Personal Values app was build is meant to highlight technical skills. It was inspired by the Personal Values Card Sorting technique - used in interviews and therapeutic settings. 

The activity is centered around values one finds important for themselves, like competence, honesty, etc., and specific strategies for enhancing those values in oneself. The names of 92 values are written on separate cards and the client is supposed to sort them by importance - hence the name of the app. These choices serve as foundation for the next steps of the activity.

This version of the app allows users to create accounts and log in securelly, choose a number of cards from 92 available, and save the choices for future use. 


Screenshots


Technical aspects

It is a React app, with an Express back end, that communicate via Axios. 

The cards, user emails, hashed passwords, and completed sessions are stored in DynamoDB and RDS (Postgres) - a redundancy included for practice purposes.

The front-end was enhanced using Styled Components, Semantic-ui-react, and Tachyos.

This version was deployed with AWS and is available at: 
