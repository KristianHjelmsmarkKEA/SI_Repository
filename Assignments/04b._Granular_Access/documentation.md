General Connection String: mongodb+srv://<username>@<password>.6l5zk5j.mongodb.net/

Steps:
1. Use powershell, or other cmd along with mongosh.
2. When opening the powershell, write: mongosh "connection string"
3. Enter: show dbs
4. Enter: use School
5. Enter: show collections
6. Enter: db.classes.find(), db.teachers.find() or db.students.find()
7. Try to insert new data: db.classes.insertOne({"class_name": "Data Science"})

-User with read and write access to all collections

Username: read_write_user

Password: read_write_password

Connection String: mongodb+srv://read_write_user:read_write_password@databaseaccessassigneme.6l5zk5j.mongodb.net/

-User with read acccess to all collections

Username: read_only_user

Password: read_only_password

Connection String: mongodb+srv://read_only_user:read_only_password@databaseaccessassigneme.6l5zk5j.mongodb.net/

-User will only be able to see the database, but don't have access to collections

Username: no_read_user

Password: no_read_password

Connection String: mongodb+srv://no_read_user:no_read_password@databaseaccessassigneme.6l5zk5j.mongodb.net/

