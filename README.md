# Q_NodeTest

About Node.JS test Assignment from Q

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
