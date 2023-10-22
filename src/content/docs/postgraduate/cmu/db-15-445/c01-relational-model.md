---
title: Relational Model　
---

## Data Model

- ==Relational==
- NoSQL
	- Key/Value
	- Graph
	- Document
	- Column-family
- Machine Learning
	- Array/Matrix
- Obsolete/Legacy/Rare
	- Hierarchical
	- Network
	- Multi-Value

## Relational Model

- Structure: 数据库关系和内容的定义
- Integrity: 确保数据库内容满足其约束
- Manipulation: 数据库内容增删改查的编程接口

### Relation

 An unordered set that contains the relationship of attributes that represent entries.

$n$-ary relation = Table with $n$ columns

### Tuple

A set of attribute values (also known as **domain**) in the relation.

- Values are (normally) atomic/scalar (原子量/标量)
- The special value `NULL` is a member of every domain

### Primary key

Uniquely identifies a single tuple.

> Some DBMSs automatically create an internal primary key if a table does not define one.
>
> Auto-generation of unique integer primary keys
> 
> - `SEQUENCE`
> - `AUTO_INCREMENT`

### Foreign keys

**Artist** (<u>id</u>, name, year, country)

| id  | name          | year | country |
| --- | ------------- | ---- | ------- |
| 123 | Wu-Tang       | 1992 | USA     |
| 456 | Notorious BIG | 1992 | USA     | 

**Album** (<u>id</u>, name, artist, year)

| id  | name              | ~~artists~~ | year |
| --- | ----------------- | ------- | ---- |
| 11  | Enter the Wu-Tang | ~~123~~     | 1993 |
| 22  | St.Ides Mix Tape  | ~~???~~     | 1994 | 

Create a new Table: **ArtistAlbum** (<u>artist_id</u>, <u>album_id</u>), the ids will be linked to the previous tables.

| artist_id | album_id |
| --------- | -------- |
| 123       | 11       |
| 123       | 22       |
| 456       | 22       | 

## Data Manipulation Languages (DML)

- Procedural
	- The query specifies the (high-level) strategy the DBMS should use to find the desired result.
- Non-Procedural (Declarative)
	- Not how to find it.
	- What data is wanted.


## Relational Algebra

### Select

Choose a subset of the tuples that satisfies a selection predicate. 

Syntax: $sigma_"predict"(R)$

```sql mark={1}
select * from R
where a_id='a2' and b_id>102;
```

### Projection

Generate a relation with tuples that contains only the specified attributes.

Syntax: $Pi_(A_1, A_2, ...,A_n)R()$

```sql mark=/b_id-100, a_id/
select b_id-100, a_id
from R where a_id='a2';
```

$Pi_tt(b_(id)-100, a_(id))(sigma_tt(a_(id)='a2'))(R)$

### Union

Syntax: $(R uu S)$

```sql
(select * from R) union all (select * from S);
```

### Intersection

Syntax: $(R nn S)$

```sql
(select * from R) intersection (select * from S);
```

### Difference

Syntax: $(R-S)$

```sql
(select * from R) exsept (select * from S);
```

### Product

Generate a relation that contains **all possible combinations of tuples** from the input relations.

> 两个表相乘，组成所有可能的组合，Tuple $\times$ Tuple

Syntax: $(R \times S)$

```sql
select * from R cross join S;
select * from R, S;
```

### Join

Generate a relation that contains all tuples that are a combination of two tuples (one from each input relation) with a **common value(s)** for one or more attributes.

Syntax: $(R |><| S)$

**R** (a_id, b_id)

| a_id | b_id |
| ---- | ---- |
| a1   | 101  |
| a2   | 102  |
| a3   | 103  | 

**S** (a_id, b_id)

| a_id | b_id |
| ---- | ---- |
| a3   | 103  |
| a4   | 104  |
| a5   | 105  | 

$R |><| S$

| a_id | b_id |
| ---- | ---- |
| a3   | 103  | 



