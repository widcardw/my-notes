---
title: Intermediate SQL
---

## Relational Languages

用户只需要指出他们想要的答案，不需要指出是如何计算的，DBMS 负责高效的查询。

> 高端系统有一个复杂的==查询优化器 query optimizer==，可以重写查询并搜索最佳执行策略。

- Data Manipulation Language
- Data Definition Language
- Data Control Language

### Example Database

- **student** (<u>sid</u>, name, login, age, gpa)
- **course** (<u>cid</u>, name)
- **enrolled** (<u>sid</u>, <u>cid</u>, grade)

#### Join

```sql mark=/e\.sid = s\.sid/
SELECT s.name
FROM 
  enrolled AS e, student AS s
WHERE
  e.grade = 'A' AND e.cid = '15-721'
  AND e.sid = s.sid;
```

#### Aggregate

```sql mark=/COUNT/
SELECT COUNT(login) AS cnt
FROM student
WHERE login LIKE '%@cs';
```

```sql mark=/GROUP BY/
SELECT AVG(s.gpa), e.cid
FROM
  enrolled AS e, student AS s
WHERE e.sid = s.sid
GROUP BY e.cid;
```

The `GROUP BY` will turn

| e.sid | s.sid | S.gpa | e.cid   |
| ----- | ----- | ----- | ------- |
| 53435 | 53435 | 2.25  | 15-721  |
| 53439 | 53439 | 2.70  | 15-721  |
| 56023 | 56023 | 2.75  | 15-826  |
| 59439 | 59439 | 3.90  | 15-826  |
| 53961 | 53961 | 3.50  | 15-826 |
| 58345 | 58345 | 1.89  | 15-445 |

into

| AVG(s.gpa) | e.cid  |
| ---------- | ------ |
| 2.46       | 15-721 |
| 3.39       | 15-826 |
| 1.89       | 15-445 | 

#### String Operations

```sql
SELECT SUBSTRING(name, 1, 5) AS abbrv_name
FROM student WHERE sid = 53688;
```

```sql
SELECT * FROM student AS s
WHERE UPPER(s.name) LIKE 'KAN%';
```

SQL standard says to use `||` operator to concatenate two or more strings together.

```sql
SELECT name FROM student
WHERE login = LOWER(name) || '@cs';
```

#### Date/Time

```sql title="Postgre SQL"
SELECT NOW();
```

```sql title="SQLite"
SELECT CURRENT_TIMESTAMP;
```

#### Output Redirection

```sql
INSERT INTO CourseIds
(SELECT DISTINCT cid FROM enrolled);
```

#### Output Control

```sql
SELECT * FROM student
WHERE login LIKE '%@cs'
LIMIT 10 OFFSET 20;
```


