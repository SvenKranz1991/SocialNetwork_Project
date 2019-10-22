# Social Network - currently named Hitchhikers Network

## Refactored

The Social Network was my final project at Spiced Academy during the Web Full Stack Development Course.
The foundation of this project was finished within 10 days, with a finished prototype at the end.

Since then, this project serves as a work-in-progress project, where I can add new things that I learned from other projects done. This gives me the oppurtunity to reflect on my progress and rewrite/restructure the existing code in a better way which helps in the learning process.

The basic tech-stack the Social Network was built with:

React.js - with Redux and Redis, Hooks and Promises
CSS3 / HTML, Node.js, Express.js, PostgreSQL, Socket.IO, AWS(S3) and Webpack

This Project is deployed to Heroku:

[Social Network Project](https://thepolitenetwork.herokuapp.com)

![Website Social Network Overview](readme-material/SocialNetwork-Overlook.gif)

The older code can be viewed in the "wo-sass"-branch on this repository.

## Features

-   Registration and Login
-   Creating and editing personal Profile
-   Uploading profile pictures and (to my AWS Bucket)
-   Find Users / Search Users (Components built with Hooks)
-   Viewing Profiles of others
-   Live Public Chat
-   Handling and displaying Friend Requests and Statuses (handled with Redux)

## Features Added Since

-   Redesigned the page, by switching from simple CSS to SASS
    -   used BEM Notation to restructure the CSS Classes into separate reusable Components, which is easier to maintain and also great for adapting the now existing Code into future Projects
    -   also switched from using absolute values like pixels to relative values like rem and vh/vw

## Features to be Added

-   Using the react-spring library for smooth transitions
-   Add media queries for responsiveness
-   integrate GraphQL
-   add Nodemailer for Password Reset
-   private Chat
-   more Columns for profiles

## Built With

### Frontend

-   React.js - with Redux and Redis
-   CSS3 and SASS

### Backend

-   Node.js
-   Express.js
-   PostgreSQL
-   Socket.IO
-   AWS(S3)

## Authors

**Sven Kranz** - [SvenKranz1991](https://github.com/SvenKranz1991) | [LinkedIn](https://www.linkedin.com/in/sven-kranz-a2389318b/) | [Website](www.google.com)
