# Q_NodeTest

About Node.JS test Assignment from Q

___

# Skill Test Requirements  

### General info  

[ ] - Create a node.js (you can use any framework of your choice) project  
[ ] - Push it to Github/Bitbucket/Gitlab repository  
[ ] - Task consist of two parts, backend and frontend - feel free to ignore frontend looks - dont spend your time on CSS and styling, only functionality is important. Naked HTML is fine too! :D (additional points if you use a templating engine)  
[ ] - When the assignment is done - send us a link or an invite to the repository  
[ ] - Docker is optional - but feel free to show off your docker skills :-)  
[ ] - Document the procedure in README.md  

### Assignment  

[ ] - Create REST api for authors and their books. You can use any database you wish.  
[ ] - Create login ( you can use jwt, passport.js, oAtuh or similar authorization services - it’s up to you :) )  
[ ] - Role Admin:
    + can add, remove, edit authors (basic information - first name, last name, email, etc..)  
[ ] - Role authors (users):
    + after author logs in, on main page should be list of authors and their books (just list without options to delete, edit or add).  
[ ] - On author page should be only author’s books where he/she can add, edit, delete his/her books  
[ ] - Add basic navigation with author’s first and last name and add logout link or button
(redirect to login page)  

### Extra bonus  

[ ] - use Typescript  
[ ] - add Unit Test (Mocha or similar)  
[ ] - use React or Angular  

___  

## Submited Documents

## 🚀 Starting

- Live Mode

      sh run

- Development Mode

      sh run dev

>### ⚠ NOTE
>
> Run this command to deploy/migrate database structure  

    docker exec -it Q_api sh -c 'npm run prisma:deploy'

### Folder Structure

- api - Express.js API using Prisma and JWT  
*[was using SQLite originally and can easily be moved back to it, or MongoDB but I have no experience with it yet so I went with MySQL to show off some docker skills]*  
- app - React+Redux App  
*[Generated using **create-react-app --template redux**, no experience with this yet but trying to manage something]*
- mysql - MySQL Config and Initial SQL File
- nginx - NGINX Configuration  

## Containers

1. NGINX  
  <http://localhost/>  
  <http://localhost:80/>  

2. Express.js API  
  <http://localhost/api/>  
  <http://localhost:2000/>  

3. React.js APP  
  <http://localhost/>  
  <http://localhost:2500/>  

4. MySQL  
  <http://localhost:3306/>  

5. phpMyAdmin  
  <http://localhost:9000/>

> NOTE:
  NGINX is used to proxy requests and provide access to both APP and API.  
  API => <http://localhost/api/>  
  APP => <http://localhost/>  
