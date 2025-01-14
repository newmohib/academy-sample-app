#### Install and Run this Applicaiton 

- Pre Request
 - node >=20
 - npm
 - knext


- copy .env.exmaple file .env file and added you environment value
- install dependency
 - npm i 
- migration database with run script
 - npm run migrate
 - run sampel seed
  - npm run seed
 - run sample 0.1 millions seed 
  - npm run seed:specific 
 - npm run dev (development/local)
 - npm run start (production)
- roleback 
 - npm run migrate:roleback

### provide Docs 



#### provide sql file backup
- src/backup/backup_script.sql

[Documents Details](https://docs.google.com/document/d/1unEIsf00nIk-a1COrs_4esDSD66I0oCilpM1zM0agjA/edit?usp=sharing)

#### for API check Postman Collections Backup 
- import postman collection file from src/backup/postman_collection.json



#### indexing
- run this for indexing test
  - run before indexing

        `EXPLAIN ANALYZE
        SELECT * 
        FROM students 
        WHERE institute_id = 1;
        `
- Create index

  - CREATE INDEX idx_institute_id ON students (institute_id);
  -  `EXPLAIN ANALYZE
        SELECT * 
        FROM students 
        WHE`
- already explain this in docs file
