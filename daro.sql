drop table if exists resources;
drop table if exists project_precedents;
drop table if exists investigators_projects;
drop table if exists measures;

drop table if exists projects;
drop table if exists investigators;

drop domain if exists domain_email;
drop domain if exists domain_resource_type;

create domain domain_email as varchar
check(
    value ~ '^\w+@[a-za-z_]+?\.[a-za-z]{2,3}$'
);

create domain domain_resource_type as varchar
check(
    value in ('image','video','pdf','doc')
);

create table investigators (
    id serial primary key,
    name varchar(128) not null,
    email domain_email not null unique
);

create table projects (
    id serial primary key,
    title varchar(255) not null unique,
    descritpion text not null,
    date timestamp not null,
    boss int references investigators(id) not null,
    retults text not null
);

create table project_precedents (
    id serial primary key,
    project int references projects(id) not null,
    antecedent int references projects(id) not null
);

create table investigators_projects (
    id serial primary key,
    investigator int references investigators(id) not null,
    project int references projects(id) not null
);

create table measures (
    id serial primary key,
    project int references projects(id) not null,
    data json not null
);

create table resources (
    id serial primary key,
    project int references projects(id) not null,
    type domain_resource_type not null,
    datadir varchar(1024) not null
);


