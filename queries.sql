-- Select all from customers
SELECT * from Customer

-- Select id, region, country from customers
select Id, Region, Country   
from Customer

-- Select all customers info from Germany
select *   
from Customer
where Country = 'Germany'

-- sorting 
select *   
from Customer
order by country, city

select *   
from Customer
order by country desc, city

-- controlling number of records returned
select *   
from Customer
order by Id
limit 5

-- pagination
select *   
from Customer
order by Id
limit 5
offset 10

-- adding records
insert into products ('column names')
values('values in order')

-- partial select
select * from products
where productName like '%cake%'

select * from products
where productName like '%cake'

select * from products
where productName like 'cake%'

-- update
update products
set price = 24.99
where productId = 79

-- delete
delete from Products
where productId = 80