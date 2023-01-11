### Useful Postgres Shell command

To login in the shell command
```bash
sudo -u postgres psql
```

## Listing Database
```
postgres=# \l
                                  List of databases
    Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges
------------+----------+----------+-------------+-------------+-----------------------
 documentor | postgres | UTF8     | en_IN.UTF-8 | en_IN.UTF-8 | =Tc/postgres         +
            |          |          |             |             | postgres=CTc/postgres+
            |          |          |             |             | root=CTc/postgres
 postgres   | postgres | UTF8     | en_IN.UTF-8 | en_IN.UTF-8 |
 template0  | postgres | UTF8     | en_IN.UTF-8 | en_IN.UTF-8 | =c/postgres          +
            |          |          |             |             | postgres=CTc/postgres
 template1  | postgres | UTF8     | en_IN.UTF-8 | en_IN.UTF-8 | =c/postgres          +
            |          |          |             |             | postgres=CTc/postgres
(4 rows)
```

## Switching Databases
```
postgres=# \c documentor
You are now connected to database "documentor" as user "postgres".
```

## Listing Tables

```
documentor=# \dt
         List of relations
 Schema |   Name    | Type  | Owner
--------+-----------+-------+-------
 public | documents | table | root
 public | users     | table | root
(2 rows)
```

## Describe table

```
documentor=# \dt users
       List of relations
 Schema | Name  | Type  | Owner
--------+-------+-------+-------
 public | users | table | root
(1 row)
```

***or***

```
documentor=# \dt+ users
                                    List of relations
 Schema | Name  | Type  | Owner | Persistence | Access method |    Size    | Description
--------+-------+-------+-------+-------------+---------------+------------+-------------
 public | users | table | root  | permanent   | heap          | 8192 bytes |
(1 row)
```
