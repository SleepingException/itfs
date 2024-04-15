--liquibase formatted sql
--changeset dkukartsev:init-db


CREATE SEQUENCE authority_seq start with 1 increment by 1;

CREATE TABLE authorities (
    role smallint NOT NULL,
    authority_id bigint primary key default nextval('authority_seq'::regclass)
);

CREATE TABLE employee_skills_link (
                                             employee_id bigint NOT NULL,
                                             skill_id bigint NOT NULL
);


CREATE SEQUENCE employee_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE employees (
      salary double precision,
      employee_id bigint NOT NULL,
      user_id bigint,
      first_name character varying(255),
      last_name character varying(255),
      phone character varying(255),
      "position" character varying(255),
      second_name character varying(255)
);


ALTER TABLE employees OWNER TO postgres;

--
-- Name: project_employees_link; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE project_employees_link (
                                               employee_id bigint NOT NULL,
                                               project_id bigint NOT NULL
);


ALTER TABLE project_employees_link OWNER TO postgres;

--
-- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE project_id_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE project_id_seq OWNER TO postgres;

--
-- Name: project_skills_link; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE project_skills_link (
                                            project_id bigint NOT NULL,
                                            skill_id bigint NOT NULL
);


ALTER TABLE project_skills_link OWNER TO postgres;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE projects (
                                 deadline date,
                                 project_id bigint NOT NULL,
                                 description character varying(255),
                                 name character varying(255)
);


ALTER TABLE projects OWNER TO postgres;

--
-- Name: skill_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE skill_id_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE skill_id_seq OWNER TO postgres;

--
-- Name: skill_level_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE skill_level_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE skill_level_seq OWNER TO postgres;

--
-- Name: skill_levels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE skill_levels (
                                     level smallint NOT NULL,
                                     skill_level_id bigint NOT NULL,
                                     description character varying(255),
                                     CONSTRAINT skill_levels_level_check CHECK (((level >= 0) AND (level <= 5)))
);


ALTER TABLE skill_levels OWNER TO postgres;

--
-- Name: skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE skills (
                               type smallint,
                               skill_id bigint NOT NULL,
                               skill_level_id bigint,
                               description character varying(255),
                               name character varying(255),
                               CONSTRAINT skills_type_check CHECK (((type >= 0) AND (type <= 1)))
);


ALTER TABLE skills OWNER TO postgres;

--
-- Name: user_authorities_link; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_authorities_link (
                                              authority_id bigint NOT NULL,
                                              user_id bigint NOT NULL
);


ALTER TABLE user_authorities_link OWNER TO postgres;

--
-- Name: user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_seq OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
                              enabled boolean,
                              user_id bigint NOT NULL,
                              password character varying(255) NOT NULL,
                              username character varying(255) NOT NULL
);


ALTER TABLE users OWNER TO postgres;

--
-- Data for Name: authorities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO authorities VALUES (0, 1);


--
-- Data for Name: employee_skills_link; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: project_employees_link; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: project_skills_link; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: skill_levels; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_authorities_link; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO user_authorities_link VALUES (1, 1);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO users VALUES (true, 1, '$2a$10$Pty2Cs8DKDCg5OpyiTGA6OVUHSt3eTUMEG0O7mCccsVM6rusRGlia', 'admin');


--
-- Name: authority_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('authority_seq', 1, true);


--
-- Name: employee_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('employee_seq', 1, true);


--
-- Name: project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('project_id_seq', 1, false);


--
-- Name: skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('skill_id_seq', 1, false);


--
-- Name: skill_level_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('skill_level_seq', 1, false);


--
-- Name: user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_seq', 1, true);


--
-- Name: authorities authorities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY authorities
    ADD CONSTRAINT authorities_pkey PRIMARY KEY (authority_id);


--
-- Name: authorities authorities_role_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY authorities
    ADD CONSTRAINT authorities_role_key UNIQUE (role);


--
-- Name: employee_skills_link employee_skills_link_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY employee_skills_link
    ADD CONSTRAINT employee_skills_link_pkey PRIMARY KEY (employee_id, skill_id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (employee_id);


--
-- Name: employees employees_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY employees
    ADD CONSTRAINT employees_user_id_key UNIQUE (user_id);


--
-- Name: project_employees_link project_employees_link_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY project_employees_link
    ADD CONSTRAINT project_employees_link_pkey PRIMARY KEY (employee_id, project_id);


--
-- Name: project_skills_link project_skills_link_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY project_skills_link
    ADD CONSTRAINT project_skills_link_pkey PRIMARY KEY (project_id, skill_id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (project_id);


--
-- Name: skill_levels skill_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY skill_levels
    ADD CONSTRAINT skill_levels_pkey PRIMARY KEY (skill_level_id);


--
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (skill_id);


--
-- Name: user_authorities_link user_authorities_link_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_authorities_link
    ADD CONSTRAINT user_authorities_link_pkey PRIMARY KEY (authority_id, user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: project_employees_link fk24wivpwc44ubpr9jidh95rko8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY project_employees_link
    ADD CONSTRAINT fk24wivpwc44ubpr9jidh95rko8 FOREIGN KEY (employee_id) REFERENCES employees(employee_id);

ALTER TABLE ONLY user_authorities_link
    ADD CONSTRAINT fk66his65pg7ixgm1v0wq6b5nau FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE ONLY employees
    ADD CONSTRAINT fk69x3vjuy1t5p18a5llb8h2fjx FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE ONLY skills
    ADD CONSTRAINT fkbruytu4hptm7t2bbxa1g6iy50 FOREIGN KEY (skill_level_id) REFERENCES skill_levels(skill_level_id);

ALTER TABLE ONLY project_skills_link
    ADD CONSTRAINT fkclyw32pfn0dltnujwu3is2hxl FOREIGN KEY (skill_id) REFERENCES skills(skill_id);

ALTER TABLE ONLY project_skills_link
    ADD CONSTRAINT fkenjy55luojmgyhywm6v4a15pq FOREIGN KEY (project_id) REFERENCES projects(project_id);

ALTER TABLE ONLY project_employees_link
    ADD CONSTRAINT fkg0o77v9g1wiujquh0v9xn3t9o FOREIGN KEY (project_id) REFERENCES projects(project_id);

ALTER TABLE ONLY user_authorities_link
    ADD CONSTRAINT fkolbt0s8pqqunxen614bk11ji0 FOREIGN KEY (authority_id) REFERENCES authorities(authority_id);

ALTER TABLE ONLY employee_skills_link
    ADD CONSTRAINT fkrdwcsp7hn0ygmotevhr3weqo4 FOREIGN KEY (skill_id) REFERENCES skills(skill_id);

ALTER TABLE ONLY employee_skills_link
    ADD CONSTRAINT fkthl1xtc9uvjbtixvaligocgag FOREIGN KEY (employee_id) REFERENCES employees(employee_id);