USE daily_dog;

CREATE TABLE Dog_Intelligence (
item_id Int(11) auto_increment not null,
breed varchar(255) not null,
classification varchar(255) not null,
obey varchar(255) not null, 
reps_lower Int(11) not null,
reps_upper Int(11) not null,
primary key (item_id)
);