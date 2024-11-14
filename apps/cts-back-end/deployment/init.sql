--
-- PostgreSQL database cluster dump
--

-- Started on 2024-11-10 21:38:30 UTC

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--


DO $$
BEGIN
    IF NOT EXISTS (
        SELECT *
        FROM pg_roles
        WHERE rolname = 'ctsb') THEN
        CREATE ROLE ctsb LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:A8snLTeH360I+YwbAFBoIg==$rnum19f5RR92vAmfstuUBJPWTPBi4DgPEZbAm7+ywEc=:hRIIPO3ui1mR4TI29BOPMT6xYxPpwGWUlsh/dGOEGPM=';
    END IF;
END $$;

ALTER ROLE ctsb WITH SUPERUSER INHERIT CREATEROLE CREATEDB REPLICATION BYPASSRLS;

-- CREATE ROLE ctsb;
-- ALTER ROLE ctsb WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:A8snLTeH360I+YwbAFBoIg==$rnum19f5RR92vAmfstuUBJPWTPBi4DgPEZbAm7+ywEc=:hRIIPO3ui1mR4TI29BOPMT6xYxPpwGWUlsh/dGOEGPM=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+2)
-- Dumped by pg_dump version 16.4

-- Started on 2024-11-10 21:38:30 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2024-11-10 21:38:30 UTC

--
-- PostgreSQL database dump complete
--

--
-- Database "ctsb" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+2)
-- Dumped by pg_dump version 16.4

-- Started on 2024-11-10 21:38:30 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3489 (class 1262 OID 16384)
-- Name: ctsb; Type: DATABASE; Schema: -; Owner: ctsb
--

-- CREATE DATABASE ctsb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ctsb') THEN
        CREATE DATABASE ctsb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    END IF;
END$$;


ALTER DATABASE ctsb OWNER TO ctsb;

\connect ctsb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 17045)
-- Name: public; Type: SCHEMA; Schema: -; Owner: ctsb
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO ctsb;

--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: ctsb
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 2 (class 3079 OID 17072)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 241 (class 1255 OID 17071)
-- Name: nanoid(integer); Type: FUNCTION; Schema: public; Owner: ctsb
--

CREATE FUNCTION public.nanoid(length integer) RETURNS character varying
    LANGUAGE plpgsql
    AS $$
DECLARE
  result VARCHAR(100);
BEGIN
  SELECT array_to_string(
    array(
      SELECT substr('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', (random() * 62 + 1)::int, 1)
      FROM generate_series(1, length)
    ), ''
  ) INTO result;

  RETURN result;
END;
$$;


ALTER FUNCTION public.nanoid(length integer) OWNER TO ctsb;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 17046)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: ctsb
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO ctsb;

--
-- TOC entry 217 (class 1259 OID 17109)
-- Name: about_info; Type: TABLE; Schema: public; Owner: ctsb
--

CREATE TABLE public.about_info (
    visual character varying,
    slogan character varying,
    philosophy text,
    quote text,
    epilogue text,
    about_id integer NOT NULL
);


ALTER TABLE public.about_info OWNER TO ctsb;

--
-- TOC entry 218 (class 1259 OID 17114)
-- Name: about_info_about_id_seq; Type: SEQUENCE; Schema: public; Owner: ctsb
--

CREATE SEQUENCE public.about_info_about_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.about_info_about_id_seq OWNER TO ctsb;

--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 218
-- Name: about_info_about_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctsb
--

ALTER SEQUENCE public.about_info_about_id_seq OWNED BY public.about_info.about_id;


--
-- TOC entry 219 (class 1259 OID 17115)
-- Name: facilities_list; Type: TABLE; Schema: public; Owner: ctsb
--

CREATE TABLE public.facilities_list (
    facilities_orderid integer NOT NULL,
    facilities_title character varying,
    facilities_description text,
    facilities_image character varying,
    facilities_link character varying,
    published boolean,
    "facilitiesNanoId" character varying(10) DEFAULT public.nanoid(10) NOT NULL
);


ALTER TABLE public.facilities_list OWNER TO ctsb;

--
-- TOC entry 220 (class 1259 OID 17121)
-- Name: facilities_list_facilities_orderid_seq; Type: SEQUENCE; Schema: public; Owner: ctsb
--

CREATE SEQUENCE public.facilities_list_facilities_orderid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.facilities_list_facilities_orderid_seq OWNER TO ctsb;

--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 220
-- Name: facilities_list_facilities_orderid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctsb
--

ALTER SEQUENCE public.facilities_list_facilities_orderid_seq OWNED BY public.facilities_list.facilities_orderid;


--
-- TOC entry 221 (class 1259 OID 17122)
-- Name: observatories_list; Type: TABLE; Schema: public; Owner: ctsb
--

CREATE TABLE public.observatories_list (
    "observatoryNanoId" character varying(10) DEFAULT public.nanoid(10) NOT NULL,
    observatory_orderid integer NOT NULL,
    observatory_category_name character varying,
    observatory_category_id character varying,
    observatory_post_content text,
    published boolean
);


ALTER TABLE public.observatories_list OWNER TO ctsb;

--
-- TOC entry 222 (class 1259 OID 17128)
-- Name: observatories_list_observatory_orderid_seq; Type: SEQUENCE; Schema: public; Owner: ctsb
--

CREATE SEQUENCE public.observatories_list_observatory_orderid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.observatories_list_observatory_orderid_seq OWNER TO ctsb;

--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 222
-- Name: observatories_list_observatory_orderid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctsb
--

ALTER SEQUENCE public.observatories_list_observatory_orderid_seq OWNED BY public.observatories_list.observatory_orderid;


--
-- TOC entry 223 (class 1259 OID 17129)
-- Name: page_info; Type: TABLE; Schema: public; Owner: ctsb
--

CREATE TABLE public.page_info (
    page_title character varying,
    sub_page_title character varying,
    page_route character varying,
    page_id integer NOT NULL,
    "pageNanoId" character varying(10) DEFAULT public.nanoid(10) NOT NULL
);


ALTER TABLE public.page_info OWNER TO ctsb;

--
-- TOC entry 224 (class 1259 OID 17135)
-- Name: page_info_page_id_seq; Type: SEQUENCE; Schema: public; Owner: ctsb
--

CREATE SEQUENCE public.page_info_page_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.page_info_page_id_seq OWNER TO ctsb;

--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 224
-- Name: page_info_page_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctsb
--

ALTER SEQUENCE public.page_info_page_id_seq OWNED BY public.page_info.page_id;


--
-- TOC entry 225 (class 1259 OID 17136)
-- Name: post_categories; Type: TABLE; Schema: public; Owner: ctsb
--

CREATE TABLE public.post_categories (
    post_category_orderid integer NOT NULL,
    post_category_name character varying,
    post_category_id character varying,
    published boolean,
    post_category_nanoid character varying(10) DEFAULT public.nanoid(10) NOT NULL
);


ALTER TABLE public.post_categories OWNER TO ctsb;

--
-- TOC entry 226 (class 1259 OID 17142)
-- Name: post_categories_post_category_orderid_seq; Type: SEQUENCE; Schema: public; Owner: ctsb
--

CREATE SEQUENCE public.post_categories_post_category_orderid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.post_categories_post_category_orderid_seq OWNER TO ctsb;

--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 226
-- Name: post_categories_post_category_orderid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctsb
--

ALTER SEQUENCE public.post_categories_post_category_orderid_seq OWNED BY public.post_categories.post_category_orderid;


--
-- TOC entry 227 (class 1259 OID 17143)
-- Name: science; Type: TABLE; Schema: public; Owner: ctsb
--

CREATE TABLE public.science (
    orderid integer NOT NULL,
    title character varying,
    updatetime date,
    content text,
    image character varying,
    published boolean,
    "postNanoId" character varying(10) DEFAULT public.nanoid(10) NOT NULL,
    post_category_nanoid character varying(10)
);


ALTER TABLE public.science OWNER TO ctsb;

--
-- TOC entry 228 (class 1259 OID 17149)
-- Name: science_orderid_seq; Type: SEQUENCE; Schema: public; Owner: ctsb
--

CREATE SEQUENCE public.science_orderid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.science_orderid_seq OWNER TO ctsb;

--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 228
-- Name: science_orderid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctsb
--

ALTER SEQUENCE public.science_orderid_seq OWNED BY public.science.orderid;


--
-- TOC entry 229 (class 1259 OID 17150)
-- Name: stargazing_list; Type: TABLE; Schema: public; Owner: ctsb
--

CREATE TABLE public.stargazing_list (
    stargazing_orderid integer NOT NULL,
    stargazing_title character varying,
    stargazing_latitude numeric(18,15),
    stargazing_longitude numeric(18,15),
    stargazing_image character varying,
    stargazing_description text,
    stargazing_address character varying,
    published boolean,
    "stargazingNanoId" character varying(10) DEFAULT public.nanoid(10) NOT NULL
);


ALTER TABLE public.stargazing_list OWNER TO ctsb;

--
-- TOC entry 230 (class 1259 OID 17156)
-- Name: stargazing_list_stargazing_orderid_seq; Type: SEQUENCE; Schema: public; Owner: ctsb
--

CREATE SEQUENCE public.stargazing_list_stargazing_orderid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stargazing_list_stargazing_orderid_seq OWNER TO ctsb;

--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 230
-- Name: stargazing_list_stargazing_orderid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctsb
--

ALTER SEQUENCE public.stargazing_list_stargazing_orderid_seq OWNED BY public.stargazing_list.stargazing_orderid;


--
-- TOC entry 231 (class 1259 OID 17157)
-- Name: users; Type: TABLE; Schema: public; Owner: ctsb
--

CREATE TABLE public.users (
    orderid integer NOT NULL,
    name character varying,
    email character varying,
    password character varying,
    "nanoId" character varying(10) DEFAULT public.nanoid(10) NOT NULL
);


ALTER TABLE public.users OWNER TO ctsb;

--
-- TOC entry 232 (class 1259 OID 17163)
-- Name: users_orderid_seq; Type: SEQUENCE; Schema: public; Owner: ctsb
--

CREATE SEQUENCE public.users_orderid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_orderid_seq OWNER TO ctsb;

--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 232
-- Name: users_orderid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctsb
--

ALTER SEQUENCE public.users_orderid_seq OWNED BY public.users.orderid;


--
-- TOC entry 3282 (class 2604 OID 17164)
-- Name: about_info about_id; Type: DEFAULT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.about_info ALTER COLUMN about_id SET DEFAULT nextval('public.about_info_about_id_seq'::regclass);


--
-- TOC entry 3283 (class 2604 OID 17165)
-- Name: facilities_list facilities_orderid; Type: DEFAULT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.facilities_list ALTER COLUMN facilities_orderid SET DEFAULT nextval('public.facilities_list_facilities_orderid_seq'::regclass);


--
-- TOC entry 3286 (class 2604 OID 17166)
-- Name: observatories_list observatory_orderid; Type: DEFAULT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.observatories_list ALTER COLUMN observatory_orderid SET DEFAULT nextval('public.observatories_list_observatory_orderid_seq'::regclass);


--
-- TOC entry 3287 (class 2604 OID 17167)
-- Name: page_info page_id; Type: DEFAULT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.page_info ALTER COLUMN page_id SET DEFAULT nextval('public.page_info_page_id_seq'::regclass);


--
-- TOC entry 3289 (class 2604 OID 17168)
-- Name: post_categories post_category_orderid; Type: DEFAULT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.post_categories ALTER COLUMN post_category_orderid SET DEFAULT nextval('public.post_categories_post_category_orderid_seq'::regclass);


--
-- TOC entry 3291 (class 2604 OID 17169)
-- Name: science orderid; Type: DEFAULT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.science ALTER COLUMN orderid SET DEFAULT nextval('public.science_orderid_seq'::regclass);


--
-- TOC entry 3293 (class 2604 OID 17170)
-- Name: stargazing_list stargazing_orderid; Type: DEFAULT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.stargazing_list ALTER COLUMN stargazing_orderid SET DEFAULT nextval('public.stargazing_list_stargazing_orderid_seq'::regclass);


--
-- TOC entry 3295 (class 2604 OID 17171)
-- Name: users orderid; Type: DEFAULT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.users ALTER COLUMN orderid SET DEFAULT nextval('public.users_orderid_seq'::regclass);


--
-- TOC entry 3467 (class 0 OID 17046)
-- Dependencies: 216
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: ctsb
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
4b5c3223-e782-4dd4-94fa-2e7450e55fbc	e5b039d8dd7f82b3012fa5f90c63e8b68f4fa7cb2b2642cc17f459c4613dedf8	\N	20241108182338_recovered_migration	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20241108182338_recovered_migration\n\nDatabase error code: 42883\n\nDatabase error:\nERROR: function nanoid(integer) does not exist\nHINT: No function matches the given name and argument types. You might need to add explicit type casts.\n\nPosition:\n[1m 15[0m     "facilities_title" VARCHAR,\n[1m 16[0m     "facilities_description" TEXT,\n[1m 17[0m     "facilities_image" VARCHAR,\n[1m 18[0m     "facilities_link" VARCHAR,\n[1m 19[0m     "published" BOOLEAN,\n[1m 20[1;31m     "facilitiesNanoId" VARCHAR(10) NOT NULL DEFAULT nanoid(10),[0m\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E42883), message: "function nanoid(integer) does not exist", detail: None, hint: Some("No function matches the given name and argument types. You might need to add explicit type casts."), position: Some(Original(500)), where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("parse_func.c"), line: Some(629), routine: Some("ParseFuncOrColumn") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20241108182338_recovered_migration"\n             at schema-engine/connectors/sql-schema-connector/src/apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name="20241108182338_recovered_migration"\n             at schema-engine/core/src/commands/apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine/core/src/state.rs:226	\N	2024-11-08 18:23:38.285224+00	0
1b98c150-16cd-4261-ba38-c42150ceb440	b6690e696af46b8e6564708208f7461c0d2d9982e61eee8244192fa37bc46d12	2024-10-11 19:37:33.872347+00	20241011080000_create_nanoid_function	\N	\N	2024-10-11 19:37:33.863595+00	1
c03d43ec-bc30-4378-893c-78567b43bfca	4cd77bfda0d471ccf7b475aad0fddf19162ae3955b72f0c4481aa1a160a667b4	2024-10-11 19:37:33.902321+00	20241011080001_create_tables	\N	\N	2024-10-11 19:37:33.872953+00	1
33b4290c-1911-4f8c-8a6e-bcd5a1115f62	d21e5da0908e2dd980f5cf60c7c389d44a5e3aa3e5c19309fab21d5292a4ac78	2024-10-11 19:37:33.923322+00	20241011104457_all_table_add_nanoid_rm_other_id	\N	\N	2024-10-11 19:37:33.902922+00	1
86156aba-5aa7-4d83-841b-dd6bbc056c21	d6bd0d76a7136654a528cc9fcee3cfeab00d8b6202920219bd104cd0f607ff70	2024-10-11 19:37:33.926271+00	20241011172514_add_category_science_relation	\N	\N	2024-10-11 19:37:33.92385+00	1
0b655638-8812-4a43-92b4-01415c5fd5eb	c27a758e43b30bb114a74cdc1ddeb917920ee916b45c994c4a03f23e157f8a00	2024-10-11 19:37:33.932167+00	20241011182705_sync_cat_nanoid	\N	\N	2024-10-11 19:37:33.926731+00	1
56745454-9bec-4105-83ef-10d38f00ec99	c4a57d59417aea99f9afd2ad2cdc08632ebb70d1eb84d0acee0d363d789601d4	2024-10-12 22:25:18.491993+00	20241012222518_ctsb_drop_categoryid	\N	\N	2024-10-12 22:25:18.489978+00	1
46f293eb-5bf9-481d-a60c-8c8a10058831	9adf8891c009aeae178e428954477c735656823a0e3a31fe28ea3c7a2dc22167	2024-10-13 03:00:46.340894+00	20241013030046_ctsb_drop_stargazing_lid_link_col	\N	\N	2024-10-13 03:00:46.338952+00	1
\.


--
-- TOC entry 3468 (class 0 OID 17109)
-- Dependencies: 217
-- Data for Name: about_info; Type: TABLE DATA; Schema: public; Owner: ctsb
--

COPY public.about_info (visual, slogan, philosophy, quote, epilogue, about_id) FROM stdin;
/img/kenny-logo.png	我們是「雲上的小貓」，致力於寫下故事、留下故事。	人是被賦予豐富情感的動物，會笑、會哭、會憤怒、會感動，所以有溫度的故事是能夠觸動人心的，甚至能夠在心中種下一顆希望的種子，在未來成長為茁壯的大樹。<br />\n正因凡走過必留下痕跡，可以是歷史？也可以是虛構的童話？\n不管它是什麼？<br />\n總會能夠會帶給我們些什麼？對吧？<br />\n無論是虛無飄渺的疑問？還是膽戰心驚的恐懼？又或著肯定的勇氣？每個人都有故事，因為這是我們自己開啟的故事——。	「我和他就好像天上的星星，遠看好像距離很近，但實際上卻是相當遙遠的。」<br />\n「這片夜空中，只有一顆星星在微弱的閃鑠著，好像很孤單一樣？但是我們每個人只要一抬頭就能看見它，<br />\n所以即使身在遠方，星星也能夠獨自努力發光了。」<br /><br />\n——《虎與龍》	『打從地球誕生的那一刻起，天空就已經用這樣的姿態為我們在夜晚蓋上滿天星斗的布幕了。』<br />\n在這宏觀的世界，世人們將星座和神話故事相互結合，把夜空中同一個區域的星星，分為一個個的星座，每一個星座都有屬於它們自己的故事，令人嚮往和好奇。<br />\n而製造這浪漫的舞台，究竟是什麼構造？它們的由來又什麼？是否是我們能夠觸手可及的呢？\n它們一直都存在我們的身旁，只是我們一直都沒注意到而已。<br />\n<strong class='text-sp-color-light'>這次讓我們來好好記下它們的存在的軌跡。</strong>	1
\.


--
-- TOC entry 3470 (class 0 OID 17115)
-- Dependencies: 219
-- Data for Name: facilities_list; Type: TABLE DATA; Schema: public; Owner: ctsb
--

COPY public.facilities_list (facilities_orderid, facilities_title, facilities_description, facilities_image, facilities_link, published, "facilitiesNanoId") FROM stdin;
1	台北市天文科學教育館	位於臺灣臺北市士林區的臺北科學藝術園區內，為臺北市政府教育局所屬之社會教育機構，成立於1996年11月7日。	/img/facilities-bg-01.jpg	https://www.tam.gov.taipei/	t	0ApUBqhDRT
2	南瀛天文教育館	位於台南市大內區的天文教育館，原為台南縣政府以天文推廣教育為主要目的而設立的「南瀛天文教育園區」。	/img/facilities-bg-02.jpg	https://taea.tn.edu.tw/	t	sG7_EBNryv
3	國立臺中自然科學博物館	簡稱科博館，是位於臺灣臺中市北區的公立科學博物館，是中華民國國家十二項建設文化建設項下興建的首座科學博物館。	/img/facilities-bg-03.jpg	https://www.nmns.edu.tw/ch/	t	ObtwZeLhTq
\.


--
-- TOC entry 3472 (class 0 OID 17122)
-- Dependencies: 221
-- Data for Name: observatories_list; Type: TABLE DATA; Schema: public; Owner: ctsb
--

COPY public.observatories_list ("observatoryNanoId", observatory_orderid, observatory_category_name, observatory_category_id, observatory_post_content, published) FROM stdin;
O5BHHxWI9K	1	研究及學術	research	| 名稱               | 口徑                | 廠牌                                                                       | 赤道儀                            | 圓頂直徑              |\n|------------------|-------------------|--------------------------------------------------------------------------|--------------------------------|-------------------|\n| 國立中央大學天文台        | 61.0 cm           | Perkin-Elmer 蓋賽格林鏡                                                       | 德式赤道儀                          | 6.5 m             |\n| 國立中央大學天文台        | 40.0 cm           | Meade-16                                                                 | 電腦經緯儀                          | 6.0 m 八角頂         |\n| 國立中央大學鹿林天文台      | 100.0 cm          | APM蓋賽格林鏡                                                                 | 叉式赤道儀                          | 10.0 m 八角頂        |\n| 國立中央大學鹿林天文台      | 50.0 cm (x4)      | Torus Precision Optics                                                   | 叉式赤道儀(x4)                      | 平頂式(x4)           |\n| 國立中央大學鹿林天文台      | 40.0 cm           | RCOS                                                                     | 德式赤道儀                          | 6.0 m 八角頂         |\n| 國立中央大學鹿林天文台      | 35.0 cm           | Celestron (C-14)                                                         | 德式赤道儀                          | 3.0 m             |\n| 國立中央大學鹿林天文台      | 200 cm(計劃取消)      | 西村RC                                                                     | 電腦經緯儀                          |                   |\n| 國立台灣大學墾丁天文台      | 30.0 cm           | Officina StellareRH Veloce 300                                           | ASA DDM85 Premium              | Sirius 3.5m       |\n| 國立台灣大學墾丁天文台      | 35.0 cm           | Celestron 14"" CGE                                                        | Software BisqueParamount ME II | Astro Heaven 3.5m |\n| 國立台灣大學鳳凰山天文台     | 63.5 cm           | PGS                                                                      | 叉式赤道儀                          | 5.0 m             |\n| 國立台灣師範大學地球科學系天文台 | 40.0 cm           | Torus CC40                                                               | 叉式赤道儀                          | 4.0 m             |\n| 國立台灣師範大學地球科學系天文台 | 40.0 cm           | RCOS RC-16                                                               | Paramount ME                   | 平頂式               |\n| 國立台灣師範大學地球科學系天文台 | 36.0 cm           | Celestron (C-14)                                                         | Losmandy Gemini                | 平頂式               |\n| 國立台灣師範大學地球科學系天文台 | 10.2 cm           | TAKAHASHI FS-102                                                         | TAKAHASHI EM200                | 平頂式               |\n| 國立台灣師範大學地球科學系天文台 | 15.0 cm           | GOTO+Hα濾鏡                                                                | 德式赤道儀                          | 4.0 m             |\n| 中正理工學院中正天文台      | 30.0 cm           | NIKON                                                                    | 德式赤道儀                          | 6.0 m             |\n| 國立清華大學物理系        | 25.0 cm           | SHOWA                                                                    | 德式赤道儀                          |                   |\n| 國立清華大學物理系        |                   | QUASTAR                                                                  | NJP赤道儀                         |                   |\n| 私立修平科技大學太陽觀測站HSO | 35.56 cm          | Meade LX200GPS 14"" (Fail operating due to 2017 Nesat Damage (Code 1709)) | 電腦經緯儀                          | 2.1 m             |\n| 國立成功大學天文台        | 35.0 cm           | Celestron                                                                | Astrophysics EQ1200赤道儀         | 平頂式               |\n| 國立成功大學天文台        | 10.5 cm           | William Optics FLT                                                       |                                |                   |\n| 私立中原大學天文台        | 30.0 cm + 10.3 cm | Meade + William Optics Zenithstar                                        | iOptron CEM120EC               | 6.0 m             |\n| 私立中原大學天文台        | 10.5 cm           | William Optics FLT                                                       | Losmandy GM-8                  |                   |\n| 交通部中央氣象局天文台      | 15.0 cm           | GOTO                                                                     | 德式赤道儀                          | 4.5 m             |	t
3EqRzS98RD	2	教育單位	education	| 名稱             | 口徑      | 廠牌                | 赤道儀                              | 圓頂直徑  |\n|----------------|---------|-------------------|----------------------------------|-------|\n| 嘉義市蘭潭國民小學      | 20.0 cm | 南京天儀中心            | 德式赤道儀                            | 6.0 m |\n| 彰化縣立彰興國民中學     | 18.0 cm | Astrophysics EDT  | SHOWA德式赤道儀                       | 3.0 m |\n| 彰化縣彰化市平和國民小學   | 12.5 cm | TAKAHASHI         | 德式赤道儀                            | 3.0 m |\n| 臺中市立惠文高級中學天文台  | 43.2 cm | PlaneWave CDK 17"" | 德式赤道儀 Paramount ME II            | 6.5m  |\n| 臺中市私立明道高級中學天文館 | 31.8 cm | Meade LX200       | 叉式赤道儀                            | 4.0 m |\n| 臺中市潭子區潭陽國民小學   | 12.8 cm | TAKAHASHI         | 德式赤道儀                            | 3.0 m |\n| 臺北市內湖區南湖國民小學   | 30.0 cm | 高橋μ300            | EM500赤道儀                         | 3.0 m |\n| 臺北市立中崙高級中學     | 15.2 cm | Meade LXD55       | Meade赤道儀                         |       |\n| 臺北市立天文科學教育館    | 45.0 cm | GOTO蓋賽格林鏡         | 德式赤道儀                            | 6.0 m |\n| 臺北市立天文科學教育館    | 20.0 cm | GOTO 庫德鏡          | 德式赤道儀                            | 6.0 m |\n| 臺北市立天文科學教育館    | 15.0 cm | SHOWA 折射鏡         | 德式赤道儀                            |       |\n| 臺北市立天文科學教育館    | 12.5 cm | GOTO MX II        | 德式赤道儀                            |       |\n| 臺北市立南湖高級中學     | 30.5 cm | Meade 史密特·蓋賽格林鏡   | 經緯儀含Autostar, 自動導入系統與, GPS全球定位系統 |       |\n| 臺北市立桃源國民中學     | 12.5 cm | TAKAHASHI         | 德式赤道儀                            | 3.0 m |\n| 臺北市立第一女子高級中學   | 10.0 cm | 高橋 EM-500         | 四管太陽鏡                            | 3.0 m |\n| 臺北市立麗山高級中學     | 15.2 cm | 高橋 FS152          | 德式赤道儀                            | 3.0 m |\n| 臺北城市科技大學       | 20.0 cm | Celestron(C-8)    | 赤道儀                              | 2.5 m |\n| 臺南市南瀛天文教育園區    | 76.2 cm | Astronomical      | 叉式赤道儀                            | 8.0m  |\n| 臺南市南瀛天文教育園區    | 30.0 cm | Meade-12          |                                  |       |\n| 臺南市南瀛天文教育園區    | 25.0 cm | BRC-250           |                                  |       |\n| 澎湖縣立文化中心       | 15.0 cm | GOTO              | 德式赤道儀                            | 4.0 m |	t
QppxJ0FK12	3	其他單位	otherunit	| 名稱               | 口徑                | 廠牌                                                                       | 赤道儀                            | 圓頂直徑              |\n|------------------|-------------------|--------------------------------------------------------------------------|--------------------------------|-------------------|\n| 國立中央大學天文台        | 61.0 cm           | Perkin-Elmer 蓋賽格林鏡                                                       | 德式赤道儀                          | 6.5 m             |\n| 國立中央大學天文台        | 40.0 cm           | Meade-16                                                                 | 電腦經緯儀                          | 6.0 m 八角頂         |\n| 國立中央大學鹿林天文台      | 100.0 cm          | APM蓋賽格林鏡                                                                 | 叉式赤道儀                          | 10.0 m 八角頂        |\n| 國立中央大學鹿林天文台      | 50.0 cm (x4)      | Torus Precision Optics                                                   | 叉式赤道儀(x4)                      | 平頂式(x4)           |\n| 國立中央大學鹿林天文台      | 40.0 cm           | RCOS                                                                     | 德式赤道儀                          | 6.0 m 八角頂         |\n| 國立中央大學鹿林天文台      | 35.0 cm           | Celestron (C-14)                                                         | 德式赤道儀                          | 3.0 m             |\n| 國立中央大學鹿林天文台      | 200 cm(計劃取消)      | 西村RC                                                                     | 電腦經緯儀                          |                   |\n| 國立台灣大學墾丁天文台      | 30.0 cm           | Officina StellareRH Veloce 300                                           | ASA DDM85 Premium              | Sirius 3.5m       |\n| 國立台灣大學墾丁天文台      | 35.0 cm           | Celestron 14"" CGE                                                        | Software BisqueParamount ME II | Astro Heaven 3.5m |\n| 國立台灣大學鳳凰山天文台     | 63.5 cm           | PGS                                                                      | 叉式赤道儀                          | 5.0 m             |\n| 國立台灣師範大學地球科學系天文台 | 40.0 cm           | Torus CC40                                                               | 叉式赤道儀                          | 4.0 m             |\n| 國立台灣師範大學地球科學系天文台 | 40.0 cm           | RCOS RC-16                                                               | Paramount ME                   | 平頂式               |\n| 國立台灣師範大學地球科學系天文台 | 36.0 cm           | Celestron (C-14)                                                         | Losmandy Gemini                | 平頂式               |\n| 國立台灣師範大學地球科學系天文台 | 10.2 cm           | TAKAHASHI FS-102                                                         | TAKAHASHI EM200                | 平頂式               |\n| 國立台灣師範大學地球科學系天文台 | 15.0 cm           | GOTO+Hα濾鏡                                                                | 德式赤道儀                          | 4.0 m             |\n| 中正理工學院中正天文台      | 30.0 cm           | NIKON                                                                    | 德式赤道儀                          | 6.0 m             |\n| 國立清華大學物理系        | 25.0 cm           | SHOWA                                                                    | 德式赤道儀                          |                   |\n| 國立清華大學物理系        |                   | QUASTAR                                                                  | NJP赤道儀                         |                   |\n| 私立修平科技大學太陽觀測站HSO | 35.56 cm          | Meade LX200GPS 14"" (Fail operating due to 2017 Nesat Damage (Code 1709)) | 電腦經緯儀                          | 2.1 m             |\n| 國立成功大學天文台        | 35.0 cm           | Celestron                                                                | Astrophysics EQ1200赤道儀         | 平頂式               |\n| 國立成功大學天文台        | 10.5 cm           | William Optics FLT                                                       |                                |                   |\n| 私立中原大學天文台        | 30.0 cm + 10.3 cm | Meade + William Optics Zenithstar                                        | iOptron CEM120EC               | 6.0 m             |\n| 私立中原大學天文台        | 10.5 cm           | William Optics FLT                                                       | Losmandy GM-8                  |                   |\n| 交通部中央氣象局天文台      | 15.0 cm           | GOTO                                                                     | 德式赤道儀                          | 4.5 m             |	t
\.


--
-- TOC entry 3474 (class 0 OID 17129)
-- Dependencies: 223
-- Data for Name: page_info; Type: TABLE DATA; Schema: public; Owner: ctsb
--

COPY public.page_info (page_title, sub_page_title, page_route, page_id, "pageNanoId") FROM stdin;
關於我們	about	About	1	SKsK7iVNRh
天文科普	science	Science	2	vk6Dsd3nvs
天文科普	science	SingleScience	3	R8z6saHCvU
星星物語	story	Story	4	bu8NqtTb8w
星星物語	story	SingleStory	5	l6bEk-mB8a
天文設施	facilities	Facilities	6	j8OvVGnMc6
觀星地點	stargazing	Stargazing	7	VlOuhiNbRu
標籤彙整	tag	Archive	8	EHrHRzgCTy
搜尋頁面	search	Search	9	XNFSmU86fU
Catch the stars	誰能數得清天上的星星？誰能說出它們對世界的影響？——詹·湯姆遜	Home	10	7H7WpBGe46
\.


--
-- TOC entry 3476 (class 0 OID 17136)
-- Dependencies: 225
-- Data for Name: post_categories; Type: TABLE DATA; Schema: public; Owner: ctsb
--

COPY public.post_categories (post_category_orderid, post_category_name, post_category_id, published, post_category_nanoid) FROM stdin;
1	全部分類	all	t	OyUqdsEEUY
2	太陽系和恆星	solar	t	4TsWgIrSqM
3	宇宙	universe	t	EPjv62EBE2
4	特殊天象	phenomena	t	KrkQnuNx_1
5	天文觀測	observation	t	q_131k3EGK
6	科學家	scientist	t	fGVkq0tONG
7	曆法	calendar	t	wI0aS3tQ0c
8	其他	other	t	TXoGaQ-iE0
9	星星故事	story	t	o1oMVyShBR
\.


--
-- TOC entry 3478 (class 0 OID 17143)
-- Dependencies: 227
-- Data for Name: science; Type: TABLE DATA; Schema: public; Owner: ctsb
--

COPY public.science (orderid, title, updatetime, content, image, published, "postNanoId", post_category_nanoid) FROM stdin;
78	講義氣且『異氣』的好夥伴——巨蟹座	2022-04-07	每個人的一生不全然都具有主角光環，大多數的一般人都是戲份不重的配角，我們今天介紹的巨蟹座，是黃道星座中最不顯眼的一個。\n\n<br>\n\n> 雖毫不起眼卻是最講義氣的好夥伴。\n\n---\n\n### 神話中\n\n巨蟹座就位在獅子座頭部的西方，希臘神話中牠只在大英雄──海克力士(Hercules)大戰九頭蛇海德拉（Hydra）時出現了一下，身為海德拉的好友，在朋友危難之際義氣相挺，用大螯偷偷地夾了海克力士的腳，大英雄在吃痛之下用木棒狠狠地敲碎了蟹殼，導致蟹膏、蟹黃佈滿了整個天空。\n\n<br>\n\n這個「蟹黃」就位於腹部中間，呈現的是一團白白的霧影，如果透過望遠鏡就會看到是由許多小星點聚集而成，中國稱其為「鬼宿星團」。「鬼宿星團」隱晦閃爍，有如鬼影幢幢、鬼火飄蕩之感，認為該處陰氣很重因此得名「積屍氣」。\n\n<br>\n\n### M44\n\n此星團在梅西爾深空天體編碼為M44，外觀類似蜂巢，屬疏散星團。古希臘人將此處認為是人將要誕生之際，投胎靈魂的出口處，古代的中國人或希臘人都把這裡當做「靈異」的象徵。\n\n```\n綜觀以上的種種巧合\n如果您是巨蟹座的朋友是否覺得......\n自己擁有很強的第六感呢?\n```	/img/story-bg-05.jpg	t	emd4gvAdWM	o1oMVyShBR
79	最璀璨明星——天狼星	2022-04-07	> 明亮的星星在寒冷的夜晚閃著孤寂的寒光\n\n冬天是亮星最多的季節，有別於夏季星空的繁星密度，冬夜星空中的星斗稀疏得多，相較之下星座卻格外壯麗，是ㄧ個適合新手觀賞星空的季節。\n\n---\n\n### 神話中\n\n晚上約8點鐘可以觀察到素有王者星座的獵戶座輝映在正南方的天空。希臘神話中獵戶座原來是個獵人名叫奧利翁，是位神射手，與同樣喜歡狩獵的月亮女神是ㄧ對戀人，卻因為月亮女神的哥哥阿波羅神從中作梗，讓這段戀情以傷心告終。獵戶座是由亮度相當的七顆亮星所組成，其中肩膀上的是ㄧ顆紅巨星參宿四，透過獵戶座可以找到其它的亮星跟星座。\n\n<br>\n\n### 大犬座\n\n獵人狩獵總會帶上大犬跟小犬，天空中的大犬座、小犬座就排列在獵人身邊，而在大犬座鼻子上可以找到全天空最亮的天狼星，它距離地球8.6光年，在中國古代被視為災星，天狼星代表入侵的異族，它的明暗變化預示了邊疆的安危;而在J.K羅琳筆下的天狼星則化身為哈利波特的教父，是位化獸師而且會變成狗狗的模樣，碰巧的是天狼星就位在大犬座之上。\n\n<br>\n\n### 當季的幾何\n\n小犬座最亮的就屬南河三，剛剛提到的參宿四、天狼星、南河三這三顆亮星可以連線成冬季大三角，一年四季都有屬於的當季的幾何圖形，可以藉由這些幾何圖形來認星星。\n\n<br>\n\n冬夜的夜空中仍有許多瑰麗的星團及造型獨特的天體等待您去發掘讚賞。\n\n```\n讓我們相邀到南瀛天文館觀星去吧！\n```	/img/story-bg-06.jpg	t	ecBppobmcd	o1oMVyShBR
80	皇族英雄救美花美男——英仙座	2022-04-07	> 東西方神話故事如出一轍。\n\n英雄身旁總有白馬相伴，希臘神話英仙座大英雄柏修斯身旁也有匹俊秀的白駒──飛馬座，其身體就是有名的秋季四邊形。\n\n<br />\n\n天空中的英仙座位於仙后座的東方，他的形象為一手持寶劍，一手抓著蛇髮女妖梅杜莎的首級。任何生物與女妖四目相對都會被石化，而大陵五這顆亮度會忽明忽暗的變星則被想像成是蛇髮女妖的雙眼。\n\n---\n\n### 神話故事\n\n秋天的亮星不多但卻延伸出英雄救美的神話故事，男主角英仙─柏修斯，原是一個手無扶雞之力的美男子，與夏季的武仙座都是仙字輩的大英雄，兩兄弟都擁有天神宙斯的優良基因，希臘神話詳載著他們轟轟烈烈事蹟。武仙完成十二項不可能的任務，而柏修斯最引人津津樂道的事蹟，就是由路人甲搖身一變成為衣索比亞王國的乘龍快婿。\n\n<br />\n\n故事的展開是柏修斯在砍殺蛇髮女妖梅杜莎後，手裡拿著蛇髮女妖的頭顱，身上騎著從女妖頸部幻化出白馬，剛好路過即將被大海怪吃掉安卓美達公主的案發現場，千鈞一髮時刻，柏修斯拿著梅杜莎的頭朝著大海怪一照，大海怪就變成石頭石沉大海成為鯨魚座，因此搭救了美麗的安卓美達公主──仙女座，贏得仙王龍心大悅，從此王子與公主就過著快樂的日子。附帶說到仙女座中有一個美麗的螺旋星系，編號M31的仙女座星系，同時也是肉眼可觀測最遠的深空天體。\n\n```\n引人入勝的神話故事，\n讓平凡的生活增添許多的色彩！\n```\n\n也讓心靈生活更為充實愉悅，偶爾放下俗事牽絆讓我們到南瀛天文館觀星去吧!	/img/story-bg-07.jpg	t	iXHhCNc8yW	o1oMVyShBR
81	夏季天空中的阿湯哥——武仙座	2022-04-07	> 武仙座以不凡之姿態頭下腳上倒掛在夏季星空中\n\n這個大型星座就位在北冕座與天琴座中間，希臘神話中他可是大名鼎鼎的海克力士(Hercules)，因為宿命受到天后赫拉的詛咒誤殺了自己的妻兒，抱著贖罪的心情必須獨力完成十二項不可能完成的任務，儼然是天空中的阿湯哥。\n\n---\n\n### 神話中\n\n電影中的阿湯哥饒勇善戰，謀略雙全，神話中的海克力士也不遑多讓，在嬰兒時期就有驚人之舉把天后赫拉放在搖籃的兩條毒蛇輕鬆擺平，他是如何得罪天后赫拉的呢?問題就出在喜歡處處留情的天神宙斯身上，相傳海克力士是宙斯的兒子，耳語傳至赫拉耳裡，就精心策劃惡毒詭計──需要冒著生命危險方能完成的任務，譬如大家熟知的是大力士與涅米亞食人獅搏鬥，還將戰利品獅皮披掛在身上炫耀，他如處在當今就等著被動保團體提告了，獅子雖然被打敗了但卻又被升到天空中變成了十二星座中的獅子座，也算是雖敗猶榮囉!\n\n<br />\n\n另外一則，就是海克力士降伏九頭蛇海德拉，蛇怪有九個頭，而且每個頭都會噴出毒液，恐怖的是被砍掉的頭都會再長出來，這讓海克力士必須再度發揮神力，將蛇頭砍下並用巨石將斷頭壓住，讓蛇怪不能復活。\n\n<br />\n\n精彩的神話故事，可以讓我們在夏夜徐徐地涼風中，邊欣賞星空邊讓我們想像力自由馳騁吧!	/img/story-bg-08.jpg	t	8G0AgrfIsH	o1oMVyShBR
82	最悲情的一對母子——大小熊座	2022-04-07	> 星空在希臘神話是眾神救贖萬物生靈的場域\n\n會何會這麼一說呢?\n\n<br />\n\n因為在希臘神話中眾神與東方聖潔的神祇是極為不同，西方的神具有凡人的性格，譬如說喜、怒、哀、樂及愛恨情仇等。\n\n<br />\n\n今天我們來說說大熊與小熊星座的故事，天空中的北斗七星杓柄是大熊座長長的尾巴，杓斗則是大熊座的身體;天空中有另一個小北斗是屬於小熊座，北極星則正好位在小熊座的尾端。\n\n<br />\n\n希臘神話裡大熊是位美貌與技藝兼具的女神卡列斯托(Callisto)，女神被幻化成不同樣子的宙斯迷惑，介入了他的家庭，並且懷有了小阿卡斯(Arcas)，消息傳到全宇宙中最善妒的天后赫拉耳裡，女神就變成了苦主。赫拉把卡列斯托變成一隻醜陋的大熊並迫使母子分離，卡列斯托為了躲避獵人追捕，只能藏身在森林深處。\n\n<br />\n\n光陰似箭，阿卡斯長大成人且遺傳到母親優良的血統，某天母子森林中相遇，遠遠地卡列斯托就認出少年是她親愛的兒子，但她忘記自己已是大熊的模樣忘情地朝向少年走去，但在阿卡斯眼裡卻只見一隻大熊朝著自己奔來，本能的他拿起手中的弓箭要射殺眼前的這頭熊。這幕剛好被宙斯看見，就颳起一陣風吹掉少年手中的弓箭，同時也把少年變成一頭小熊，為了保護這對母子，宙斯把他們放到天上去，這就是春季大小熊星座的由來。	/img/story-bg-09.jpg	t	wjNUpIqzNj	o1oMVyShBR
83	春夜星空中的皇冠——北冕座	2022-04-07	在春季夜空的星座中，有一個由七顆閃亮寶石所組成的美麗皇冠﹣北冕座。\n\n<br />\n\n它位於牧夫座和武仙座之間，位置大約落在牧夫座的大角星和天琴座的織女星兩顆亮星之間。\n\n> 這個皇冠是酒神送給他的妻子阿里阿德涅公主的結婚禮物\n\n今天就來跟大家分享這個神話故事吧！\n\n---\n\n### 彌諾陶洛斯\n\n北冕座的故事要從怪物彌諾陶洛斯(Minotaur)開始說起，牠是一個半人半牛的怪物，被關在克里特島上的一個巨大的迷宮中，雅典每年都被迫進貢七對童男童女以供彌諾陶洛斯食用。而雅典的英雄忒修斯(Theseus)則自告奮勇要前去殺死那頭可怕的怪物，克里特島上的公主阿里阿德涅(Ariadne)看到英俊的忒修斯為了無辜的孩童而挺身而出，於是給了他一團線團，讓忒修斯可以標記出迷宮的出路。\n\n<br />\n\n而在彌諾陶洛斯被殺死後，忒修斯駕船帶著阿里阿德涅返回雅典的途中做了一個夢，夢中命運女神告訴他，阿里阿德涅命中注定是酒神的妻子，忒修斯心知無法與命運對抗，於是趁著阿里阿德涅在熟睡時離開了她。\n\n<br />\n\n<br />\n\n### 酒神\n\n公主醒來後發現自己被拋棄，在悲痛欲絕時恰好遇上了路過的英俊酒神戴歐尼修斯(Dionysus)，酒神溫柔的安慰贏得了公主的芳心，從此兩人結為連理，酒神送給阿里阿德涅的皇冠則高掛在天空上，化為閃亮美麗的北冕座，以此見證他們的愛情。\n\n<br />\n\n在這段故事中，可以發現就是因為命運女神的話語，才導致了後來阿里阿德涅嫁給酒神的結局，是否有感受到命運的絲線彷彿早已在命運女神的紡車下編織而成呢？	/img/story-bg-10.jpg	t	RNO5ABXmwZ	o1oMVyShBR
84	北極星之秘	2022-04-07	韓劇冬季戀歌中，男主角曾說過這麼一段話﹕\n\n> 在山上迷路的時候，只要找到北極星就可以了。因為季節變換，其他的星星位置都會改變，只有北極星永遠在原地不動。\n\n北極星的位置是否真的永恆不動呢?\n\n<br />\n\n一般人會有這種感覺是因為地球自轉所造成的。\n\n<br />\n\n地球自轉軸的正北端與北極星相當接近（相距約40角分），所以我們從地面上看過去北極星幾乎不會動。\n\n---\n\n正因為北極星如此特殊，所以祂又被中國人喻為玄天上帝的化身。\n\n<br />\n\n相傳玄天上帝的前世是位屠夫，為了贖罪他曾到武當山修行，得道升天後還收服了龜、蛇二妖，為百姓除害。這就是為什麼在廟宇中，玄天上帝的神像總是手拿長劍，赤腳踏著龜蛇。\n\n<br />\n\n更有趣的是，聽說當初玄天上帝收服龜、蛇二妖時誤入石榴林被它的尖刺刺得哇哇大叫，所以相當討厭石榴，因此信徒們祭祀玄天上帝時都會避免準備石榴這項水果呢！	/img/story-bg-11.jpg	t	M2Rw09gCdI	o1oMVyShBR
85	獵戶座的傳說	2022-04-07	> 今天想跟大家談談冬天中的星空-獵戶座。\n\n在冬天的夜空裡，我們抬頭仰望南方，可以看到三顆整齊排列的二級星，以這三顆星為中心向外延伸可以找到參宿四星、參宿七星以及其他星體連成一個大四角形。\n\n<br />\n\n這個大四角便是大家所熟悉的，希臘神話中獵人奧利翁（Orion）的身體。\n\n---\n\n### 1500光年\n\n除此之外，使獵戶座揚名立萬的應該要屬M42火鳥星雲了，如果以望遠鏡觀察M42，它看起來像是一片廣大的氣體狀，但若從彩色照片中觀察則會看到一大片紅色星雲，像極了展翅高飛的火鳥。這片星雲距離地球約1500光年，它的面積約等於30光年x26光年，也就是說從星雲的一端坐上噴射機，即使飛一輩子也飛不出星雲的另一端。\n\n<br />\n\nM42中心有一堆「歪方形四重星」，它是讓整片火鳥星雲呈現火紅色的重要關鍵。由於歪方形四重星溫度很高，會放射出強烈的紫外線，此時散佈在星雲中的氫原子在接收到這些紫外線時，便會放射出氫原子獨有的光線，使整個星雲放出美麗的紅色光芒。年輕的歪方形四重星都是在獵戶座中誕生的，據說現在還在不停的產生新星，獵戶座真可以說的上是星星的故鄉啊。\n\n<br />\n\n<br />\n\n### 冬季星座之王\n\n綜上的描述，世人們給予獵戶座「冬季星座之王」的美稱，但其實獵戶座有個淒美的故事：傳說中，巨人獵師奧利恩是海神波賽頓與亞馬遜女王歐里亞蕾的兒子。奧利翁長得非常魁梧而英俊，不只喜歡狩獵也擅於獵取女人的心。另外，奧利翁還從他的父親海神波賽頓那裡，獲得了一項驚人的特技，那就是可以自由的在水面上行走。\n\n<br />\n\n某天，奧利翁使用這個神奇的力量渡過大海，來到地中海上的克勒第島狩獵。當他在島上漫步時，遇到了月亮和狩獵的女神阿爾蒂蜜絲。此後，這兩人每天都一起在島上的森林裡尋找獵物，享受狩獵的樂趣。隨著兩人的相處時間愈久，阿爾蒂蜜絲就愈喜歡奧利翁，彼此也都有了想跟對方結婚的念頭，於是謠言在希臘眾神間傳開了。\n\n<br />\n\n當然，這件事情也傳到阿爾蒂蜜絲的哥哥-阿波羅的耳中，引發了他的忌妒心，於是他放出毒蠍子想把奧利翁毒殺。某個夜裡，奧利翁發現了毒蠍子，也明白自己不是它的對手，於是急忙跳進海裡，向外海逃去。阿波羅知道這件事情後怒火中燒，在忌妒心的誘使之下，他利用了妹妹阿爾蒂蜜絲，讓她用箭錯手射殺奧利翁。\n\n<br />\n\n阿爾蒂蜜絲明白哥哥的陰謀後，大錯已經鑄成無法挽回，她只好把奧利恩的屍體從海底撈起，並且為他的死悲傷不已。\n\n<br />\n\n最後，阿爾蒂蜜絲向天神宙斯請求，讓奧利翁升入天空成為獵戶座，繼續在天上打獵，也好讓自己在駕銀車奔馳於天空時，可以見到心愛的奧利翁。	/img/story-bg-01.jpg	t	fYMj8oP8_z	o1oMVyShBR
86	有趣的神祇——摩羯座	2022-04-07	> 主角人物是一位有著人類的軀幹，但卻有山羊的腿、角、鬍子與耳朵的牧羊神潘恩(Pan)。\n\n<br />\n\n### 眾神傳信者\n\n希臘神話裡提到，相貌醜陋的潘恩(Pan**)**是「眾神傳信者」赫耳墨斯(Hermes)與仙女潘妮羅珀(Penelope)的兒子，負責替天神宙斯掌管樹林、田地和牛羊，但由於潘的樣貌怪異，森林中的仙子都很害怕，常常遠遠地避開潘恩，於是潘恩常年獨自居住在阿卡地亞 (Arcadia)山林的洞穴中，十分寂寞。儘管如此，潘恩還是喜歡躲在叢林間，突然跳出來追逐常在河岸邊嬉戲的仙女們，讓她們受到驚嚇，據說「恐慌」(panic) 此一詞就是這樣來的。\n\n<br />\n\n<br />\n\n### 排笛\n\n有一天，潘恩遇見了仙女西琳克絲(Syrinx)，對她一見鍾情，但西琳克絲熱愛打獵，對男人毫無興趣，立誓終生不嫁，更何況是長相其醜無比、怪模獸樣的潘恩。潘恩仍舊對她愛得發狂，用華麗的言詞讚美她，希望西琳克絲可以了解他的愛意，可是西琳克絲聽到潘恩向她求愛的時候，反而卻慌張了起來，決定走為上策。於是，她乘潘恩沒有留意的時候，便拔腿逃走。但潘恩仍舊在後面緊追不捨，眼看就要追上她了。西琳克絲便向眾神祈禱，請求神保護她。前方一條大河的河神聽到仙女的祈禱，在潘恩即將抱住西琳克絲時，便將她變成了一棵柔韌的蘆葦，蘆葦發出輕微的沙沙聲，悲傷的潘恩於是砍下幾根蘆葦，用蠟將長短不一的葦節固定住，製成了一隻蘆笛，為了紀念西琳克絲，便將這隻蘆笛以她的名字命名 (Syrinx)，這也就是現在我們稱的排笛的由來。\n\n\n<br />\n\n<br />\n\n### 上半身下半身\n\n為了表達對西琳克絲的思念，潘恩時常吹奏蘆笛，並到奧林匹斯聖山，在眾神的盛宴上吹奏他的蘆笛，只要潘恩吹起它，諸神往往情不自禁地唱起歌，跳起舞，使聖山上的宴會氣氛更加熱烈。有天在河邊設宴的眾神正聆聽潘恩吹奏時，突然「百頭巨妖」泰風（Typhon）出現，把場面搞得一片凌亂，眾神馬上化身為各種動物逃跑。慌忙的潘恩也化成魚跳至水中，可是卻變得不成功，只有下半身變成了魚，上半身卻還是山羊的滑稽模樣，宙斯覺得這個模樣實在太有趣了，便將他升到天空變成了摩羯座。	/img/story-bg-12.jpg	t	nxG6o8ueUp	o1oMVyShBR
87	秋夜中的水族星座	2022-04-07	上回說完了秋季星空北天的「皇族星座」故事，讓我們將視野轉向南天，來看一看秋天夜晚在南天「水族星座」的有趣故事吧！\n\n> 南天的「水族星座」主要成員有南魚座、摩羯座、寶瓶座、雙魚座！我們挑幾個來看看吧。\n\n一切都要從一場「逃跑之宴」說起……\n\n---\n\n### 逃跑之宴\n\n宙斯(Zeus)非常喜歡熱鬧，所以在眾神所居住的奧林帕斯山經常舉行盛大的宴會。有一天，天氣十分晴朗，也是一個適合舉行宴會的好日子，宙斯邀請了所有神明在幼發拉底河舉行盛大宴會，其中「愛與美之神」阿芙洛狄忒(Aphrodite)帶著小兒子「愛神」愛洛斯(Eros)也出席了這場宴會。\n\n<br />\n\n正當宙斯和他的妻子赫拉(Hera)興高采烈地與眾神推杯換盞，大廳中央半人半羊模樣的潘恩(Pan)正用自製的蘆笛吹奏著動人的曲調，文藝女神們隨著曲調舞動，一片和諧融洽、太平盛世景象時，突然狂風大作、黃沙遍起，「百頭巨妖」泰風(Typhon)乍然現身，伸出他的巨大雙手，胡亂拍打著山丘，拔起樹木，踐踏房屋，把場面搞得一片凌亂。\n\n<br />\n\n面對突然而來的災難，眾神紛紛變成動物逃跑，天后赫拉變為白色母牛、太陽神阿波羅（Apollo)變為老鷹，神使赫耳墨斯（Hermes）變為朱鷺，酒神狄俄倪索斯(Dionysus)變為山羊，阿芙洛狄忒則化身為魚逃走，但逃了一會才發現寶貝兒子愛洛斯沒有跟上，於是找到了愛洛斯後，為了防止再度與她走散，於是便將兩人的腳綁在一起，然後再變成魚兒逃走。\n\n<br />\n\n當眾神紛紛逃命去時，潘恩太專心演奏蘆笛了，來不及應變，驚慌中急忙跳進水中，怎料他的變身並不成功，只有下半身變成了魚，上半身卻還是山羊模樣…...\n\n<br />\n\n後來，宙斯為了紀念這場逃跑之宴，便把許多神變成的動物放上天空，其中，阿芙洛狄忒化身的魚成為了南魚座，而她和她兒子愛洛斯綁在一起的兩條魚則成為了雙魚座，而潘恩化身的羊身魚尾則成了魔羯座，連為諸神斟酒的美少男甘尼梅德(Ganymede)都成了寶瓶座。	/img/story-bg-13.jpg	t	gXWwimozdU	o1oMVyShBR
88	秋夜星空之皇族星座	2022-04-07	秋季星空雖然是四季中亮星最少的一個季節，可是關於秋天的星座傳說故事卻一點也不輸其他季節喔！\n\n> 主要可分為北天的「皇族星座」與南天的「水族星座」兩大脈絡哦！\n\n首先要介紹的北天「皇族星座」中主要會提到的角色有仙女座、仙王座、仙后座、英仙座，飛馬座及鯨魚座。\n\n---\n\n### 希臘神話中\n\n古代衣索比亞王國的皇后卡西歐佩亞（Cassiopeia）和女兒安德洛美達（Andromeda）長得非常美麗，為此皇后經常誇口說她們的美貌比海中的諸位女神還漂亮。女神們得知後十分不悅，於是求海神波賽頓（Poseidon）為她們主持公道。波賽頓因而派出大海怪凱圖斯（Cetus），使衣索比亞附近海域不得安寧，並揮動三叉戟招來海嘯淹沒良田、把百姓吞沒，甚至還逼迫國王克甫斯（Cepheus）將自己美麗的女兒安德洛美達獻給大海怪當祭品，換取百姓平安。\n\n<br />\n\n國王克甫斯別無選擇下便把女兒安德洛美達綁在海岸旁的岩石上。正巧，騎著飛馬（Pegasus）、剛斬除完蛇髮女妖梅杜莎（Medusa）的大英雄柏修斯（Perseus）剛好路過，他很驚訝的問了公主原因。此時，大海怪驟然現身，柏修斯趕緊拔劍迎戰，並取出梅杜莎的首級向大海怪一照，大海怪變成了一個巨大的石頭，立即沉入海底，公主也順利地被救了出來。\n\n<br />\n\n後來，柏修斯迎娶了公主安德洛美達為妻，一起回到衣索比亞。在他們死後，宙斯把他們升到天空成為秋季的星座之一。國王克甫斯成為仙王座，皇后卡西歐佩亞成為仙后座，公主安德洛美達成為仙女座，大英雄柏修斯成為英仙座，連他的坐騎也成為飛馬座，而大海怪凱圖斯則成為鯨魚座。	/img/story-bg-14.jpg	t	8k7bRnk8p7	o1oMVyShBR
89	仁心仁術的弄蛇人——蛇夫座和巨蛇座	2022-04-07	在夏季南方的夜空，有許多星星排成一個巨大無比的鐘形，左右還各突出兩條弧形星星連線，古希臘人把這個形狀想像成一個大力士抓著一條巨蛇，這就是蛇夫座和巨蛇座，看起來像不像一頂超巨大的墨西哥帽呢？\n\n---\n\n### 阿斯克勒庇俄斯\n\n蛇夫座有個非常饒舌的名字－阿斯克勒庇俄斯（Asclepius），他是太陽神阿波羅的兒子，從小就拜人馬族的長老－凱龍（Chiron）為師。有一次凱龍帶他的學生們去市集，發現有人在鬥蛇，同學們都興高采高烈地加油喧叫，只有阿斯克勒庇俄斯擔心受傷的蛇會不會死掉，不停詢問凱龍老師怎麼救牠們。凱龍大受感動，便將自己的醫術全都傳授給他。阿斯克勒庇俄斯不僅馬上將蛇救活，而且不負神之子的名號，長大後成為一位受人敬重的醫生，並且青出於藍，連死人都有辦法救活！\n\n<br />\n\n漸漸地由於冥府的靈魂越來越少，人間與冥府漸漸失衡，破壞大自然的規律，搞得連天神宙斯都要出面拜託阿斯克勒庇俄斯不要再將死人救活。誰知固執的他仍堅持醫生不能見死不救，宙斯不得已只好將用一道閃電將他劈死，但為了感念他的仁心仁術，把他和小時候救活以後就跟他身邊的巨蛇一起升上天空，成為萬人瞻仰的星座。\n\n> 時至今日，許多國家的醫院圖騰上都跟蛇有關。\n\n我國衛生福利部的圖徽中心也有一條蜷曲向上的蛇，都是為了紀念他喔！	/img/story-bg-15.jpg	t	WmUDwQ8nRm	o1oMVyShBR
90	頂天立地的巨人——牧夫座	2022-04-07	在春季及夏季的夜空中，順著北斗七星的斗柄曲線延伸過去，可以看到一顆火紅耀眼的紅巨星－大角。從大角星再往北方延伸，可以拉出一個冰淇淋的圓筒狀，又像一面長尾巴的風箏，這就是牧夫座。\n\n---\n\n### 在希獵神話中\n\n遠古時期的神族分為兩派：泰坦巨神族和奧林帕斯神族，最後由宙斯所領導的奧林帕斯神族獲勝，而泰坦巨神族的領導者－阿特拉斯，則被宙斯處以背負頂天的苦刑。沒錯！就像中國神話的盤古一樣，需要腳踩著地、手頂起天，人類才能在天地之間生活無虞。頂天的任務對於身強體壯的泰坦巨神來說並非難事，但神是長生不死的，永久背負天空實在相當苦悶難熬。\n\n<br />\n\n話說當時有個蛇髮女妖梅杜莎，只要和她四目相接的生物都會馬上變成石頭，後來被人類英雄柏修斯給斬殺。有一天柏修斯騎著飛馬經過奧林帕斯山，阿特拉斯再也受不了頂天的苦刑，遂請求柏修斯的協助。善良的柏修斯緩緩拿出梅杜莎的頭顱，阿特拉斯定睛一看，馬上變成一尊石像，但在變成石像前，臉上已露出一抹淺淺的微笑。\n\n<br />\n\n雖然他曾經是宙斯的敵人，但宙斯仍感念他的功勞，便將他頂天立地的模樣，升到天上成為牧夫座，表彰其功績。\n\n> 在希臘神話裡，不管是人、神還是妖，都有相當人性化的一面，是不是很有趣呢？	/img/story-bg-16.jpg	t	-MI4hEPmd2	o1oMVyShBR
91	超麻吉的雙胞胎——雙子座	2022-04-07	> 冬季的夜晚有一年之中最燦爛的星空\n\n在東北方可以找到兩顆很靠近的一等星，往西南方延伸下來幾個星點，構成一個「北」字形，這就是雙子座。\n\n<br />\n\n### 在神話故事中\n\n他們是由斯巴達王妃莉妲所生一對可愛的雙胞胎。不過他們的父親卻不同，哥哥波勒克斯(Pollux)是天神宙斯之子，而弟弟卡斯特(Castor)卻是凡人巴斯特王的後代。\n\n<br />\n\n雖然有著神與人不同的血源，使得哥哥擁有長生不死之身，弟弟只有有限的壽命，但兩人從出生以來就如膠似漆，鮮少分離，遇到困難都能互助合作，是一對超級好兄弟。\n\n<br />\n\n哥哥波勒克斯的拳法精湛，弟弟卡斯特善於駕車，兩人都勇於冒險，曾經參與過著名的亞戈號遠征奪取金羊毛的行動。不幸的是，某年希臘遭受一頭巨大的山豬肆虐攻擊，他們與同為雙胞胎的堂兄弟凱倫烏斯與伊達斯共同接受希臘王子的請託追捕大山豬。\n\n<br />\n\n在費盡千辛萬苦成功捕獲山豬之後，他們竟然遭受到想搶功勞的堂兄弟構陷而受到重傷。波勒克斯因為擁有天神血統而免於一死，但卡斯特卻一命嗚呼。波勒克斯傷痛欲絕，遂請求父神宙斯，將自己的不死之身分一半給弟弟，代價是自己有一半時間要留在冥府，另一半時間才能和弟弟一起在人間生活，宙斯被兄弟倆的真情感動，不但完成哥哥的心願，還把他們昇到天空成為星座，讓世人都能見證他們珍貴的手足情誼。	/img/story-bg-17.jpg	t	jSoPSPIz9X	o1oMVyShBR
2	太陽	2022-04-06	## 太陽是位於我們太陽系中心的一顆恆星\\n\\n質量佔整個太陽系總質量的99.86%，從元素組成來看，約有73%氫、25%氦，重的元素如氧、碳、鐵、氖等則不到2%。\\n\\n<br />\\n\\n![Untitled](https://i.imgur.com/l1FhLW2.png)\\n\\n<br />\\n\\n(太陽，取自SDO/AIA 波長304Å的假色影像)\\n\\n<br />\\n\\n太陽直徑約為1.4×106 km，若以直徑來比較的話，太陽的直徑大約可以排下10顆木星，或109顆地球。\\n\\n<br />\\n\\n![Untitled](https://i.imgur.com/pgMU7Qq.png)\\n\\n<br />\\n\\n(太陽與八大行星大小比較，取自[!https://ilovetheuniverse.com/how-big-is-sun-compared-to-earth](https://ilovetheuniverse.com/how-big-is-sun-compared-to-earth))\\n\\n<br />\\n\\n太陽的結構由內而外依序為:\\n\\n<br />\\n\\n核心:\\n\\n<br />\\n\\n核心是太陽最中心的區域(約0.25太陽半徑以內)，經由核融合將氫融合成氦，並放出大量的熱能，估計核心的溫度為1500萬K，在核心以外的部分，只是被傳出的能量加熱，能量經過層層傳遞到太陽表層，化為光或是加熱粒子最後逸散至宇宙之中。\\n\\n<br />\\n\\n輻射層:\\n\\n<br />\\n\\n輻射層在核心以外，約0.25至0.7太陽半徑的區域，在這裡能量主要依靠輻射傳遞，也就是透過光子的發射、吸收將能量傳出。\\n\\n<br />\\n\\n對流層:\\n\\n<br />\\n\\n對流層在輻射層外，約0.7太陽半徑至太陽表層的區域，在這裡能量主要依靠熱對流的方式，透過炙熱的電漿流動將能量傳至表層。\\n\\n<br />\\n\\n光球層:\\n\\n<br />\\n\\n光球層也就是一般所說的太陽表面，在光球層之下，可見光是不透明的，也就是說無法透過可見光看見光球層以下的區域，這裡的溫度已經下降至大約6000K。再往外，就一般稱為太陽的大氣層。\\n\\n<br />\\n\\n色球層:\\n\\n<br />\\n\\n在光球層之上，主導著光譜的吸收與發射，可以從譜線的特徵判斷太陽表面的元素成分。\\n\\n<br />\\n\\n日冕層:\\n\\n<br />\\n\\n日冕是太陽最外層的部分，向外擴展的日冕持續延伸至太陽系的邊緣、日球層頂。日冕的溫度雖然很高(100萬K以上)，但密度很低，因此實際上所具有的熱量很少。\\n\\n<br />\\n\\n![Untitled](https://i.imgur.com/yf3tWOp.png)\\n\\n<br />\\n\\n(太陽的結構，取自[!https://www.cogitania.com/news/2018/1/15/the-suns-structure-and-nature](https://www.cogitania.com/news/2018/1/15/the-suns-structure-and-nature))\\n\\n<br />\\n\\n使用適當的濾鏡，可以觀察到太陽表面的太陽黑子，位於光球層。由於太陽表面強烈的磁場活動，有部分區域溫度較低(約3000~4500K)，看起來的光線較弱，因此與周圍相比是「黑」的。\\n\\n<br />\\n\\n![Untitled](https://i.imgur.com/30WRhRm.png)\\n\\n<br />\\n\\n(太陽黑子，2020/11/25攝於南瀛天文館)\\n\\n<br />\\n\\n太陽黑子，或者說太陽的磁場活動與其他一系列的太陽活動有關，例如日珥、太陽閃焰、日冕物質拋射等。主要影響太空天氣，可能會干擾人造衛星、地球磁場、電離層通訊等。\\n\\n<br />\\n\\n太陽黑子的數量並不是長久不變的，其多寡呈現週期性的變化，平均11年為一個週期，但在歷史上也曾記錄過有一段長時間(1645~1715)幾乎沒有太陽黑子，該時段稱為蒙德極小期，地球進入小冰河時間。	/assets/bg/default-image-438x438.gif	t	lY4K0_icUD	4TsWgIrSqM
3	行星定義	2022-04-06	## 究竟什麼才算是行星?\\n\\n> 其實自幾千年前一直以來都沒有一個明確的定義\\n\\n直到2006年國際天文聯合會才正式定義「行星」，也是自此，原本大家很熟悉的第九行星冥王星被剔除在行星的行列外，目前太陽系只剩下八大行星─水星、金星、地球、火星、木星、土星、天王星、海王星。\\n\\n<br />\\n\\n行星的定義要從其歷史脈絡來探究，最早的時候(古希臘/古中國)，天文學家觀察天空就發現有5顆位置會移動的天體，因此稱為「行」星，與其他為數眾多不會移動的「恆」星相對應，這也是傳統的「五行」─金木水火土的由來。\\n\\n<br />\\n\\n直到望遠鏡發明100多年以後，1781年英國的天文學家[赫歇爾](https://taea.tn.edu.tw/astro_news/book_detail/53618246-683c-11eb-89b7-59cce5f7d8f4)發現一顆同樣會移動的天體，也就是天王星。這時對於天王星的行星地位是很確定的，雖然他看起來很小顆，幾乎就如同一個恆星一樣是個黯淡的小光點，但因為他在天空中會持續移動，所以可以明確的區別它是行星。\\n\\n<br />\\n\\n但在1801年至1807年接連發現許多同樣「會移動的天體」，穀神星、智神星、婚神星、灶神星，此時開始了混亂，因為這四個天體軌道非常類似，跟太陽的距離都差不多，所以雖然最開始的時候仍有許多人都將它們稱為行星，但後來由於這類天體發現越來越多，慢慢地就出現了一個新分類─「小」行星，表示它們都類似行星會在天空中移動，但是體積卻很小顆的天體。\\n\\n<br />\\n\\n接著由於當時發現天王星的軌道與理論預測的不符，猜測可能有一個大質量的天體，其重力在干擾天王星，法國的天文學家[勒維耶](https://taea.tn.edu.tw/astro_news/book_detail/a31c446c-82e3-11eb-b021-17ad805218d6)利用數學去推算該未知天體的位置，1846年成功發現海王星。此時海王星也是無庸置疑的確保行星的地位，因為他是距離在天王星外的獨立軌道，附近沒有其他天體，質量也足夠大顆。\\n\\n<br />\\n\\n最後是重頭戲，冥王星的發現有點類似海王星，當時也認為海王星的軌道有異常，認為有其他天體在干擾海王星，在1930年美國的天文學家湯伯成功發現冥王星，但是冥王星有許多特性與其他行星不同：軌道傾角非常大、橢圓軌道的離心率較大，甚至會進入海王星軌道的內側，但由於當時對冥王星質量的估計較大(最早認為有1地球質量)，且冥王星的距離遙遠，附近沒有發現其他天體，因此持續佔據第九行星的地位好幾十年。\\n\\n<br />\\n\\n隨著觀測技術進步，冥王星的質量持續下修(0.2%地球質量)，後來也驗證當時海王星的軌道異常只是因為對海王星的質量估計錯誤，並且也持續發現更多的小天體位於冥王星軌道附近，壓垮駱駝的最後一根稻草是鬩神星的發現，因為鬩神星看起來比冥王星還大，若依照質量大小的量級來看，鬩神星會變成第十行星，同時也可能會有許多天體排上第十一、第十二、第十三.....的頭銜。\\n\\n<br />\\n\\n![Untitled](https://i.imgur.com/NGXwxVJ.png)\\n\\n<br />\\n\\n(冥王星與其他天體的大小比較，取自[https://astrocometal.blogspot.com/2016/05/jplames-2007-or10-largest-unnamed-world.html](https://astrocometal.blogspot.com/2016/05/jplames-2007-or10-largest-unnamed-world.html))\\n\\n<br />\\n\\n國際天文聯合會在2006年8月24日投票表決通過符合下列定義者為行星：\\n\\n- 圍繞恆星公轉\\n\\n- 質量足夠大，可產生足夠的引力使其保持接近球體\\n\\n- 能夠清除軌道附近的天體\\n\\n而如果不符合第3點，也就是無法清除軌道附近天體，也不是衛星的天體，則為「矮行星」，其他所有圍繞太陽的天體則為「太陽系小天體」。\\n\\n<br />\\n\\n 依照此定義，由於冥王星的軌道附近還有鬩神星、鳥神星、妊神星等相似的天體，因此冥王星被降級為矮行星(鬩神星、鳥神星、妊神星也因為質量夠大，形狀接近球體而符合矮行星之定義)，同時原本是小行星的穀神星，雖然它位於小行星帶，軌道附近有眾多小天體沒有清除，但穀神星的質量也因為夠大而保持球體，故歸類成矮行星。	/assets/bg/default-image-438x438.gif	t	5J4ES9e76v	4TsWgIrSqM
6	地球	2022-04-06	## 軌道特性:\n\n> 地球是太陽系由內往外數第三顆行星\n\n<br />\n\n軌道半長軸約為1億5000萬公里(1AU)，繞行太陽公轉一圈365.25日，自轉一圈則為1日，自轉軸傾角23.5°。\n\n<br />\n\n從地球的公轉與自轉的變化，衍生出自古以來各式曆法的制定，如每4年就有一次閏年要多1天，即是從公轉的365.25日而來，小數點後的0.25日累積4年就變成要多1日才行。\n\n<br />\n\n另一個常被搞混的則是1日的長短，一般所稱的1日是指地球的「太陽日」(24小時/86400秒)，計算的是太陽在天空中移動至相同位置的時間(例如從中午的天頂位置，至隔天的中午)，但若以其他恆星作為基準，則稱為「恆星日」，約為23小時56分，比較能表示地球在宇宙空間中自轉的時間。\n\n<br />\n\n![Untitled](https://i.imgur.com/Of0ZVTx.png)\n\n<br />\n\n(地球同時公轉與自轉，從1至3是太陽日，從1至2是恆星日，可以發現恆星日略短於太陽日，取自[https://en.wikipedia.org/wiki/Solar_time](https://en.wikipedia.org/wiki/Solar_time))\n\n<br />\n\n(若是搞懂了恆星日與太陽日的區別，就可以再去看看水星、金星這種公轉與自轉周期差不多的行星，思考看看在他們上面所看到的「太陽日」究竟是多久?)\n\n<br />\n\n物理特性:\n\n<br />\n\n地球主要是由岩石與金屬組成，化學元素依照豐度依序為鐵、氧、矽、鎂等，由於地球在早期剛形成時，熔融態的狀況下讓密度高的元素沉至中心，密度低的元素留在外層，因此不同深度的元素含量並不相同，也形成了地核、地函、地殼的構造。\n\n<br />\n\n表面特徵:\n\n<br />\n\n地球是唯一表面具有大量液態水的行星，表面積約有70%被水覆蓋，受到水的侵蝕與板塊作用，地球的表面地質相當年輕，少有大型的隕石坑。\n\n<br />\n\n磁場與大氣層:\n\n<br />\n\n地球具有全球性的磁場，具有保護地球大氣層不受太陽風直接吹襲的作用，來自太陽的帶電粒子會受到地球磁場而偏折，少部分能夠沿著磁場進入南北極，從而產生極光。\n\n<br />\n\n![Untitled](https://i.imgur.com/5yAZVOk.png)\n\n<br />\n\n(地球磁場的結構，取自[https://en.wikipedia.org/wiki/Magnetosphere](https://en.wikipedia.org/wiki/Magnetosphere))\n\n<br />\n\n地球具有大氣層，主要成分為氮氣、氧氣、氬氣、二氧化碳、水氣等，其中最特別的是氧氣，是由於生物經光合作用才產生如此高含量的氧氣，且一部分的氧氣轉化為臭氧，阻擋了太陽的紫外線，這才使得地表適宜現在的生物生存。\n\n<br />\n\n觀測:\n\n<br />\n\n在天文館有個笑話: 地球是最容易觀測的行星，為什麼呢? 往你的腳下方看就是了!\n\n<br />\n\n自古以來，人們就對於地球到底長怎樣有多種想像，像是以前所說天圓地方，認為地球是方的、平的，而公元前6世紀的古希臘學者畢達哥拉斯則透過觀察地平面遠方、月食時地球的影子，認為地球是圓的，直到20世紀太空科技迅速進展，才得以真的從太空來觀察地球，現今也有數千顆人造衛星在地球周圍進行大氣、海洋、地表、重力等等的探測任務。\n\n<br />\n\n![Untitled](https://i.imgur.com/gffPGe4.png)\n\n<br />\n\n(1968年阿波羅8號在月球軌道上所拍攝的地球，取自[https://en.wikipedia.org/wiki/Earth](https://en.wikipedia.org/wiki/Earth))\n\n<br />\n\n![Untitled](https://i.imgur.com/QCevxxH.png)\n\n<br />\n\n(航海家1號從64億公里外拍攝的地球，在宇宙中只是一個微弱的暗淡藍點，取自[https://www.universetoday.com/49091/pale-blue-dot/](https://www.universetoday.com/49091/pale-blue-dot/))	/assets/bg/default-image-438x438.gif	t	wAyjUYSPIX	4TsWgIrSqM
12	潮汐現象	2022-04-06	## 潮汐現象\n\n月球是除了太陽以外，對地球造成重大引力影響的天體，而地球上的海水受到太陽及月球引力的拉扯，會產生週期性的升降漲退現象，稱為潮汐。\n\n<br />\n\n當海水漲潮至極大值，我們稱之為滿潮；同樣地，當海水退潮退至最低點，稱之為乾潮。滿潮與乾潮之間的水位差，我們稱之為潮差，其對應到的海岸線，我們稱之為潮間帶。潮間帶因為位處生態交會區，所以各種環境因子的變化非常劇烈，足以影響到生物生存的條件，但也因為如此，潮間帶具有非常多的生物，各自具有高度的適應力，在此地生生不息。\n\n<br />\n\n![3522](https://i.imgur.com/5Hkf4TM.png)\n\n<br />\n\n(滿潮乾潮示意圖，取自中央氣象局)\n\n<br />\n\n由於月球每天公轉約12度，所以當地球自轉一圈回到原地後，需再額外多轉12度，月亮才會再度出現於中天，而地球自轉12度約需花費50分鐘，因此每天漲潮(退潮)時間會延後50分鐘，潮汐週期約12小時25分鐘。\n\n<br />\n\n![3523](https://i.imgur.com/l7yYtpe.png)\n\n<br />\n\n(潮汐週期示意圖，取自SlidePlayer)\n\n<br />\n\n根據日地月之間的相對位置，海水的漲退幅度也有所差異。當日-月-地(新月)或日-地-月(滿月)排成一直線，來自太陽及來自月球的潮汐力效果會有加成效應，因此潮汐現象會出現大潮，同時潮差較大；而若月相是上弦月及下弦月時，潮汐現象會有抵消的效應，因此會出現小潮，同時潮差較小。若颱風發生在大潮的期間，則海邊會相對更加危險，應慎防長浪。\n\n<br />\n\n![3524](https://i.imgur.com/RIhpwdi.png)\n\n<br />\n\n(大潮和小潮示意圖，取自中央氣象局數位科普網)\n\n<br />\n\n那潮汐究竟是如何產生的呢？引發潮汐的力量稱為潮汐力，又稱引潮力。眾所周知，天體之間具有萬有引力，而天體互繞時會產生離心力，兩者的合力即為潮汐力，由此可知，潮汐力≠萬有引力。根據計算，潮汐力的大小和距離的三次方成反比，比距離對重力的影響更明顯，所以雖然太陽對地球的引力比月球對地球的引力大得多，然而地球所受到月球產生的潮汐力卻是比來自太陽的潮汐力大得多，月球對地球的潮汐力，大約是太陽的2.2倍。\n\n<br />\n\n潮汐力也會引發另一個奇特現象，當兩個天體互繞時，其中一方會受到另一方的潮汐力影響，而逐漸降低自轉的速率，直到最後其自轉的週期與公轉的週期一致，這時稱為潮汐鎖定。以地月系統為例子，當地月系統剛形成時，月球的自轉速率比現在還快，因此月球會變成橢球體，此時月球的長軸將會沿著自轉方向偏移，而不是指向地球中心，因此長軸兩端受到的地球引力將不共線，此合力會形成一個扭矩，方向和月球自轉方向相反，導致月球的自轉受到阻礙，加上因為潮汐力的影響，月球內部的岩石結構也會互相摩擦生熱而消耗動能，因此長久下來，月球的自轉速率便逐漸趨近於公轉速率，直到兩者相等，月球便被地球鎖定了。\n\n<br />\n\n事實上，月球對地球的潮汐力也會讓地球的自轉速率變慢，只是因為地球體積較大，質量也較重，所以受影響的程度較輕微，但地球的自轉速率確實有在變慢，只是根據計算，若地球要被月球潮汐鎖定的話，那時太陽早已毀滅，人類可能也已經不復存在了。\n\n<br />\n\n![3530](https://i.imgur.com/cW407gr.png)\n\n<br />\n\n(潮汐鎖定，取自Smurrayinchester, CC BY-SA 3.0 , via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	tnQpBMeRKl	4TsWgIrSqM
19	木星	2022-04-06	## 軌道特性:\n\n> 木星的軌道半長軸為5.2AU，繞行太陽需花11.86年\n\n<br />\n\n因其週期接近12年，在中國古代將木星與「地支」聯想在一起，而稱木星為「歲星」。\n\n<br />\n\n相較於其巨大的體積，木星自轉的速度非常快，只要9.9小時就轉一圈，是所有行星中自轉週期最短的。\n\n<br />\n\n物理特性:\n\n<br />\n\n木星的平均半徑約為11個地球半徑，質量則為317.8個地球質量，是所有行星之中最大的，甚至因為木星巨大的質量，整個太陽系的質心實際上是落在太陽表面之外。\n\n<br />\n\n![8842](https://i.imgur.com/z0B2hlr.png)\n\n<br />\n\n(太陽系質心示意圖，取自[https://curiosmos.com/jupiter-the-only-planet-in-our-solar-system-that-doesnt-orbit-the-sun/](https://curiosmos.com/jupiter-the-only-planet-in-our-solar-system-that-doesnt-orbit-the-sun/))\n\n<br />\n\n木星是一顆巨型氣體行星，估計75%的質量是氫、24%氦以及1%其他的元素組成，內部結構缺乏直接的探測方法而有較大的不確定性，一般認為有一個緻密的核心，而由於巨大的壓力，內層的氫被壓縮成液態、甚至成金屬態氫。\n\n<br />\n\n![8843](https://i.imgur.com/OApi80K.png)\n\n<br />\n\n(木星內部結構，取自[https://www.britannica.com/place/Jupiter-planet/The-interior](https://www.britannica.com/place/Jupiter-planet/The-interior))\n\n<br />\n\n表面特徵:\n\n<br />\n\n木星的表面有著明顯的條紋雲帶特徵，在木星的大氣層頂端，不同的化合物經由對流湧升，形成豐富多彩的橙色、棕色雲層(但確切的構成仍缺乏探測)。\n\n<br />\n\n在南赤道帶邊緣有著最著名的「大紅斑」，大小約為2-3個地球大，且自望遠鏡發明以來已被持續觀測了350年，是一個穩定的反氣旋漩渦。\n\n<br />\n\n![8844](https://i.imgur.com/OApi80K.png)\n\n<br />\n\n(木星，攝於2021/8/26，可觀察到表面的雲帶及大紅斑)\n\n<br />\n\n磁場:\n\n<br />\n\n木星磁場比地球強14倍，具有所有行星中最強的磁場，磁場產生的機制推測是由木星內部的金屬氫旋轉運動而產生的，由於強烈的磁場，木星的兩極也有極光，而且由於部分衛星也包含在木星的磁層以內，衛星上逸散的稀微大氣也經由磁場而在對應的位置產生極光。\n\n<br />\n\n![8845](https://i.imgur.com/9hEY6zV.png)\n\n<br />\n\n(哈伯太空望遠鏡拍攝的紫外線極光影像，取自[https://esahubble.org/images/heic0009a/](https://esahubble.org/images/heic0009a/))\n\n<br />\n\n觀測:\n\n<br />\n\n木星的視星等最亮可至-2.9等，依據木星、地球、太陽三者的相對位置，亮度及視直徑也會有所變化，若利用小型天文望遠鏡，可觀察到木星的條紋狀雲帶、大紅斑、最大的四顆「伽利略衛星」。\n\n<br />\n\n![8846](https://i.imgur.com/mksJ9m5.png)\n\n<br />\n\n(木星，攝於2021/11/2，可見2顆衛星-Io、Ganymede從木星前方經過，其影子落在木星表面)\n\n<br />\n\n除地球上的望遠鏡外，也有許多艘太空船飛掠或繞行木星，如航海家號、伽利略號、卡西尼號、以及最新的朱諾號，為我們帶來許多精彩的資料。\n\n<br />\n\n![8847](https://i.imgur.com/OdxwVMX.png)\n\n<br />\n\n(卡西尼號所拍攝的木星與木衛一Io，取自[https://solarsystem.nasa.gov/resources/111/io-in-front-of-jupiter/?category=planets_jupiter](https://solarsystem.nasa.gov/resources/111/io-in-front-of-jupiter/?category=planets_jupiter))	/assets/bg/default-image-438x438.gif	t	wfD4Ut1c3u	4TsWgIrSqM
27	量距離的方法	2022-04-06	詳見下圖說明 <br />illustration shows the three steps astronomers used to measure the universe is expansion rate to an unprecedented accuracy, reducing the total uncertainty to 2.4 percent.<p></p><img src=https://i.imgur.com/6wGzmKE.png style=max-width: 100%><br />***Credit: NASA, ESA, A. Feild (STScI), and A. Riess (STScI/JHU)***	/assets/bg/default-image-438x438.gif	t	qdE3kRNHAo	EPjv62EBE2
39	伽利略‧伽利萊 Galileo Galilei	2022-04-06	## 科學家介紹\n\n義大利物理學家、數學家、天文學家、工程學家及哲學家，在近代的科學史上占有非常重要的地位，伽利略不只改良望遠鏡、進行天文觀測、支持地動說理論，同時也透過實驗證明，當物體受到引力作用時，會進行加速度運動；而當物體不受外力作用時，會保持其原本的靜止狀態或是均勻速度運動狀態。伽利略被稱為「現代觀測學之父」、「現代科學之父」。\n\n<br />\n\n早期的伽利略攻讀醫學，1581年時，他觀察到教堂裡的吊燈被風吹拂而來回擺動，他利用自己的脈搏來計算時間，發現儘管吊燈的擺動距離越來越小，但來回往返一次的時間(周期)都相同，伽利略進一步發現，吊燈擺動的周期僅和擺繩的長度有關，和吊燈重量、擺動的角度大小均無關，這就是有名的「鐘擺的等時性」。\n\n<br />\n\n據傳伽利略為了推翻亞里斯多德所謂的「重物比較早落地」的說法，而在比薩斜塔頂端做實驗。不過根據歷史記載，伽利略並未做過此實驗，而且他也不可能做此實驗，因為地球表面有大氣，空氣對不同的物體會有不同的阻力。儘管如此，伽利略早先已經透過一個自由落體思想實驗，證明兩個物體會同時落地，無論它們的質量究竟是否相同。而當真空技術發展成熟時，自由落體實驗證明伽利略的想法是正確的。\n\n<br />\n\n另外，亞里斯多德也提出，當物體不受外力作用時，物體必定靜止，而人們也廣泛地接受這種看法。但伽利略透過斜面運動實驗，提出了慣性定律，否定了亞里斯多德的看法。他的實驗，不僅為牛頓的運動定律打下根基，他將物體的運動拆解為水平運動與垂直運動的方法，更是為往後的物理學研究打開了一道大門。\n\n<br />\n\n除了以上的成果之外，伽利略也力挺哥白尼的日心說，挑戰自從亞里斯多德、托勒密約1500年以來，被基督教會奉為圭臬的地心說。1609年，伽利略透過望遠鏡觀測星空，成為歷史上窺見天體面貌的第一人。他發現到月球表面凹凸不平、太陽表面具有黑點，代表天體並非完美的球體；他也發現到木星的四顆衛星(伽利略衛星)、金星的盈虧現象，這些現象表明了地球並非宇宙的中心，證明了地心說是錯誤的。\n\n<br />\n\n伽利略將他的觀測發現記錄下來，並在1610年出版了《星際信使》一書，想當然耳，教會馬上視伽利略為眼中釘，並重新申明哥白尼的學說是異端，不得公開談論，伽利略只好暫時作罷。但之後伽利略的好友─烏爾班八世─擔任教宗後，伽利略於1632年出版《關於托勒密和哥白尼兩大世界體系的對話》，宣揚日心說。但因為內容對於亞里斯多德學派的攻擊，使得伽利略最後被押到宗教法庭接受審判，教會並脅迫他收回觀點。迫於壓力，伽利略不得不撤回主張，但據傳他退下時，曾自己喃喃自語道：「但是，地球依然在轉啊。」\n\n<br />\n\n伽利略從此被軟禁，在佛羅倫斯度過了餘生，這段期間內，他寫了一本新書：《兩種新科學》，總結了他過去40年來所做的研究。1992年，教宗若望‧保祿二世發表聲明，承認教會的錯誤，同年12月，教宗本篤十六世讚揚了伽利略對天文學的重大貢獻。儘管遲來的道歉無法彌補過去的遺憾，但伽利略的歷史定位早已獲得肯定，屹立不搖，備受後人的推崇，成為名副其實的「現代科學之父」。\n\n<br />\n\n![986](https://i.imgur.com/3KPnnuU.png)\n\n(伽利略肖像，Credit：Justus Sustermans, Public domain, via Wikimedia Commons)\n\n<br />\n\n![987](https://i.imgur.com/YUYE0UA.png)\n\n(伽利略手稿，Credit：Galileo Galilei, Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	ibSEPiMOP9	fGVkq0tONG
41	約翰尼斯‧克卜勒 Johannes Kepler	2022-04-06	## 科學家介紹\n\n> 德國人，著名的天文學家、數學家，為天文學家第谷的助手。\n\n<br>\n\n### 宇宙的神祕——\n\n克卜勒相信日心說，認為太陽是宇宙的中心，在其著作《宇宙的神秘》一書中，克卜勒提出了自己的太陽系模型，首先最外面是土星天球，接著土星天球內部放置一個正6面體和天球相接，然後再放上木星天球和正6面體相接。\n\n<br />\n\n#### 以下遵循相同的順序：\n\n<br />\n\n- 依次放入正4面體\n- 火星天球\n- 正12面體\n- 地球天球\n- 正20面體\n- 金星天球\n- 正8面體\n- 水星天球。\n\n```\n// planetary orbit\n由於在當時，人們認為天體的運行是完美的，是一個完整的圓，所以在模型當中，天球是圓的，代表著行星運行的軌道。\n  ```\n\n為了驗證自己的理論究竟是否正確，克卜勒需要天文觀測數據來佐證，但因為他本身的視力薄弱，限制了他的天文觀察能力，於是在1600年，克卜勒成為第谷的助手，並且在第谷死後，開始處理他所遺留下來的大量觀測資料。\n\n<br />\n\n克卜勒最先處理火星的軌道數據，但初期並不順利，後來克卜勒決定先計算出地球的軌道，由於火星繞日周期為1.88年，所以若只觀看每1.88年的數值，火星便好像固定在天空中一樣，而地球繞日周期為1年，因此每1.88年都會出現在不同的位置，將這些位置連接起來，便是地球的軌道。而在計算的過程當中，克卜勒發現一件事情：「當地球繞太陽運轉時，若經過相同的時間，則地球和太陽的連線所形成的扇形面積會相同。」根據這個定律，當地球靠近太陽時速度較快，遠離時則較慢，這就是克卜勒第二運動定律。\n\n<br />\n\n闡明地球的軌道之後，克卜勒把心力放回一開始的目標─求出火星的軌道，由於已經知道地球的軌道，因此，若從某個時刻(位置)觀察火星，以及1.88年後地球所在的位置，這兩個位置往火星的方向便會有一個交叉，此交叉點便是火星在軌道上的一點，以此方法反覆進行，便能夠得到火星的軌道。最後得到的結果，顯示出火星的軌道為橢圓，這可說是非常大的震撼彈，雖然[哥白尼](https://taea.tn.edu.tw/taea/astro_news/book_detail/5fb53e40-0917-11eb-b691-562538ac20d1)提出了日心說，但他仍然相信軌道是圓的，克卜勒的這項發現可說是再度推翻天文學的「常識」。現在我們也知道，行星是以橢圓軌道環繞太陽公轉，太陽位在橢圓的其中一個焦點上，這就是克卜勒第一運動定律。\n\n<br />\n\n發現第一、第二運動定律之後，克卜勒想知道太陽系中的所有行星在公轉時是否有共同的規律可遵循，便重新審視了觀察資料，而最後他發現：「行星公轉軌道平均半徑(半長軸)的立方，和公轉周期的平方，其比值為一個定值。」這就是克卜勒第三運動定律。\n\n<br />\n\n克卜勒將他發現的三大定律收錄在1609年出版的《新天文學》中，但在當時並沒有受到眾人的重視。除了行星運動之外，由於在1604年，剛好發生一次超新星爆炸(克卜勒超新星，位於蛇夫座足部)，所以克卜勒也對此現象做了深入的研究。\n\n<br />\n\n雖然我們現在用牛頓定律便可直接導出克卜勒運動定律，但在當時，克卜勒只憑藉觀察和計算，便能發現令人震驚的星空秘密，可說是非常不簡單。直到現在，我們仍然會使用到克卜勒定律，包括衛星的軌道變動、太空船的對接、前往其他星球的太空探測船等，克卜勒的貢獻可說是居功厥偉。\n\n<br />\n\n![990](https://i.imgur.com/IAr6TPo.png)\n\n(克卜勒的太陽系模型，Credit：Johannes Kepler, Public domain, via Wikimedia Commons)\n\n<br />\n\n![991](https://i.imgur.com/kQaC9MB.png)\n\n(克卜勒超新星，Credit：NASA/ESA/JHU/R.Sankrit & W.Blair, Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	6a8on75_TB	fGVkq0tONG
42	艾薩克‧牛頓 Isaac Newton	2022-04-06	## 科學家介紹\n\n> 英國人，著名的物理學家、數學家、天文學家、煉金術士。\n\n不只提出萬有引力及三大運動定律，也發明了反射望遠鏡，研究光譜的組成，同時在數學上也提出微積分、二項式定理，為後世的科學發展建立了堅實的基礎。\n\n<br />\n\n牛頓在1642年的聖誕節出生在英國的林肯郡烏爾索普村莊，父親在其出生前3個月過世，而牛頓因為早產，所以較為瘦弱。牛頓3歲時，母親安娜改嫁給史密斯牧師，將牛頓託付給他的外婆，牛頓有時因為思念母親，會偷偷地跑出去，往往需要外婆去把他找回來。\n\n<br />\n\n可能因為缺乏母愛，讓牛頓常常悶悶不樂，加上牛頓生性內向，使得牛頓在國小學校裡表現較為孤僻，這也使得他沒有什麼朋友。不過儘管如此，牛頓對很多事物依然充滿了好奇心，同時因為受到舅舅的影響，也對木工感興趣，會自己製造一些木製模型、四輪車等。\n\n<br />\n\n當時的小學主要教導寫字、算術，剛開始，牛頓因為醉心於木工，所以成績很差。後來有一次，牛頓無緣無故被一位魁梧的同學欺侮，牛頓忍無可忍之下開始反擊，結果竟然將對方打敗了，至此，牛頓領會到：「只要我想做，我就一定做得到。」從此，牛頓開始發憤苦讀，成績突飛猛進，最後，牛頓以優異的成績畢業。\n\n<br />\n\n之後牛頓進入了格蘭瑟姆的國王中學就讀，寄宿在藥劑師克拉克家中，在校時依舊維持良好的成績。牛頓期許自己能創造豐功偉業，留芳萬世，到現在仍然可以發現他留在學校裡的字跡。1658年，母親因為史密斯牧師過世而回到家中，且希望牛頓回到家裡幫忙農事，所以牛頓只好休學。不過牛頓並不擅長農事，老是把事情搞砸，而國王中學的校長也來家中請託，認為牛頓應該回到學校完成學業，最後母親被說服了，牛頓得以回到國王中學繼續就讀。\n\n<br />\n\n1661年，牛頓進入劍橋大學的三一學院，由於牛頓是以公費生的身分進入，所以牛頓需要幫忙處理一些雜事，而牛頓為了不浪費時間，往往邊做事邊思考，卻也鬧出了不少笑話。在那個時候，學校主要教導的課程是拉丁文，牛頓喜歡的數學、天文及哲學等領域則很少提及，所以牛頓只能通過自學的方式來精進自己。1665年，倫敦鼠疫爆發，牛頓只好回到鄉下，而在鄉下的這兩年間，牛頓發現了萬有引力，同時繼續研究微積分、光學，可以說牛頓重要的科學貢獻幾乎都是在此時完成的。\n\n<br />\n\n1667年，牛頓成為了劍橋大學三一學院的研究生，在1669年畢業之後透過申請成為了劍橋大學的教授，負責教授數學、光學，而牛頓為了得到更好的觀測成果，發明了反射式望遠鏡，改進了折射式望遠鏡的缺點，後來在哈雷的鼓勵下，於1687年出版了《自然哲學的數學原理》，該書闡述了許多牛頓的想法、發現、定理，成為科學史上非常重要的一本著作。\n\n<br />\n\n1703年，牛頓擔任皇家學會會長，1705年，牛頓被安妮女王賜予爵士，儘管在科學上有非常高的成就及貢獻，但牛頓為人處世卻非常地謙虛。1727年，牛頓於睡夢中過世，英國人為了紀念他，為他舉行了國葬，將他埋葬在西敏寺，成為史上第一個獲得國葬的科學家。\n\n<br />\n\n牛頓的發明及發現，不只推動了科學研究的風氣，也是當今科學昌明的原動力。\n\n<br />\n\n![992](https://i.imgur.com/G3aFogY.png)\n\n(牛頓肖像，Credit：After Godfrey Kneller, Public domain, via Wikimedia Commons)\n\n<br />\n\n![993](https://i.imgur.com/ANvnAhv.png)\n\n(自然哲學的數學原理，Credit：The original uploader was Zhaladshar at English Wikisource., Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	4kOxux45pn	fGVkq0tONG
43	威廉·赫歇爾 Frederick William Herschel	2022-04-06	## 科學家介紹\\n\\n> 英國人，著名的音樂家、天文學家。\\n\\n透過自己製作的望遠鏡，獲得許多天文發現，更被後世譽為「恆星天文學之父」。\\n\\n<br />\\n\\n赫歇爾出生於漢諾威，長大後於軍樂隊裡吹奏雙簧管，後來被派往英國，更成為一名音樂教師。也許是受到父親的影響，赫歇爾後來對星空產生了興趣，並且自行製造反射望遠鏡，多虧了妹妹卡羅琳‧赫歇爾的幫忙，威廉前前後後共製作了四百多支望遠鏡，最大的一具口徑126公分，鏡筒長度12公尺，觀測時還必須爬上鷹架，才可透過目鏡進行觀察。\\n\\n<br />\\n\\n赫歇爾一開始是觀測月球及雙星，1781年，在他觀測雙星時，發現了一個異常明亮的星，這顆星的直徑會隨著放大率增加而變大，威廉憑藉豐富的觀測經驗，認為此星絕非恆星，後來也確認此顆星為新的行星，即為太陽系的第七顆行星─天王星。赫歇爾一開始為了感謝英王喬治三世，將新行星命名為喬治星，但這個提議不被其他天文學家所接受。\\n\\n<br />\\n\\n因為發現了天王星，赫歇爾後來獲選成為英國皇家學會會員，並被任命為皇家天文官。除了天王星之外，赫歇爾也發現了土衛一、土衛二、天衛三、天衛四，同時也編製了星雲列表，其數目約為2500個；他根據恆星的移動、分布，推測銀河系呈現圓盤狀；太陽並非宇宙中心，而是繞著銀河中心移動。\\n\\n<br />\\n\\n赫歇爾能有如此多的研究成果，除了自身的勤奮努力及理性思維外，妹妹卡羅琳的協助也是功不可沒。卡羅琳作為哥哥的助理，負責幫他觀測及計算，她自己也透過望遠鏡發現了星雲、彗星，赫歇爾-利哥萊彗星(35P/Herschel–Rigollet)更是首顆被女性發現的彗星。\\n\\n<br />\\n\\n1822年，赫歇爾逝世於斯勞的觀測樓內，而他的兒子約翰‧赫歇爾日後也成為著名的天文學家。\\n\\n<br />\\n\\n![1186](https://i.imgur.com/PNtcvtO.png)\\n\\n(威廉‧赫歇爾及卡羅琳‧赫歇爾，Credit：CC BY 2.0 , via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	Lnqx3NzL66	fGVkq0tONG
75	為淒美的愛情故事搭起橋樑——天鵝座	2022-04-07	> 翱翔於銀河當中美麗的天鵝\n\n<br>\n\n天鵝座在天空中是一個大十字，主星天津四就沉浸在銀河中(夏季大三角之一)，結合了東方淒美七夕的愛情故事，古代相傳牛郎織女因耽於遊樂，不認真耕作織布，而被迫分隔於銀河東西兩岸，每年七夕才得以於鵲橋相會，另一說則認為要渡過銀河必須從天津搭船過去，所以「天津」又有天上銀河渡口的意思，因此位在北半球天鵝座與南半球的南十字星對稱，也被稱為北十字座。\n\n<br>\n\n### 浪漫情懷——\n\n我們如果想抒發自己的浪漫情懷，也可以將之想像成一隻伸長脖子翱翔於銀河當中美麗的天鵝。另外，希臘神話中天神宙斯為了把妹所變的種種化身，稱他為化身大王應該是當之無愧吧!\n\n此次事件的苦主是斯巴達(Sparta)的王妃麗妲(Leda)，宙斯為了讓任務更有戲劇性及張力，還找來搭檔配合演出，他將自己變身天鵝，命愛神阿弗洛狄忒變成一隻鷹追捕自己，幾番轉折終得美人芳心，宙斯為紀念此事，將天鵝和鷹一同升上天空，成為天鵝座和天鷹座。麗妲後來生下兩顆蛋，他們就是冬季的雙子座。\n\n<br>\n\n#### 值得一提的是\n\n天文學家估計距今八千年後，地球的自轉軸將指向天津四附近，屆時天津四就成為了北極星；還有我們透過望遠鏡在天鵝的頭部附近可觀測到極為罕見的黃藍雙星──[輦道增七](https://bit.ly/3JKyKAb)。當然天鵝座還有一些著名的星團及星雲，如M39的疏散星團，及北美洲星雲(NGC7000)等值得我們好好地欣賞。	/img/story-bg-02.jpg	t	1MHhSRDeL4	o1oMVyShBR
76	醫者的代言人——巨蛇座	2022-04-07	> 我們夜晚仰望星斗訴說著人神之間交流的故事\n\n而全天空之中卻有一個星座超級大，大到著名的天文學家托勒密不得不把它拆開來變成兩個星座，它就是我們今天要聊的蛇夫座與巨蛇座，其中最特別的是被蛇夫座硬生生拆成兩半的巨蛇座，成為天空中唯一一個被其他星座分開的星座。\n\n<br>\n\n蛇夫座在希臘羅馬神話故事中是名叫阿斯克勒庇俄斯（Asclepius）的醫生，有別於東方華陀書生模樣，外型是個氣勢威猛的巨人，雙手孔武有力的抓住巨蛇，巨蛇被蛇夫座分成蛇頭跟蛇尾兩部分，缺少亮星的巨蛇雖不顯眼卻很特別。\n\n<br>\n\n傳說在西元前293年時羅馬出現嚴重的傳染疾病，仁心仁術的阿斯克勒庇俄斯就化身成一條巨蛇來提供草藥給民眾治療，讓人起死回生。在不同文化中也都有信仰蛇神的傳說例如女媧、魯凱族的百步蛇等；西方文化中則以蛇會蛻皮而獲得新生的形象，把蛇作為醫療的象徵，如WHO的標誌即是脫胎自阿斯克勒庇俄斯的蛇杖。\n\n<br>\n\n巨蛇座中也有幾個特別的深空天體，例如蛇頭附近的M5的球狀星團，是歷史最悠久的星團之一，推估有130億年；蛇尾是一片活躍的恆星形成區域，外型類似老鷹展翅的模樣其別名老鷹星雲的M16。\n\n```\n著名的哈伯太空望遠鏡所拍攝的「創生之柱」\n即位於老鷹星雲的中央，\n顧名思義代表著星星誕生的地方。\n```	/img/story-bg-03.jpg	t	R5A4WZRbN8	o1oMVyShBR
74	哈伯序列	2022-04-06	## 哈伯在1926年針對星系的外觀——\n\n將星系大致分為三類：\n- 橢圓星系\n- 透鏡星系\n- 螺旋星系\n\n<br />\n\n第四類則是呈現不規則形狀的不規則星系。\n\n<br />\n\n此分類法稱為哈伯序列，由於其圖表看起來很像音叉，所以也稱為哈伯音叉圖。\n\n<br />\n\n在哈伯序列的左側為橢圓星系，依照扁平程度予以分類，從差不多成球狀的星系(E0)到最扁平的星系(E7)，皆未有圓盤部分。數字部分的算法為10(1-(b/a))，其中a、b為橢圓的半長軸及半短軸。\n\n<br />\n\n哈伯序列中間的為透鏡狀星系(S0)，這類星系沒有旋臂，只有中央的核球及扁平的圓盤。\n\n<br />\n\n哈伯序列最右邊的為螺旋星系，又分成上下兩個部分。上半部為典型的螺旋星系，下半部的星系除了有螺旋結構外，星系中央還有明顯的棒狀結構，故又稱為棒旋星系。螺旋星系依據旋臂的緊繞程度，從緊到鬆依序為a、b、c，甚至還有d及e。\n\n<br />\n\n不規則星系並沒有列在哈伯序列裡，主要是一些外觀比較奇特的星系。\n\n<br />\n\n根據研究，科學家們認為，在宇宙的演化過程中，螺旋星系或是不規則星系會發生大規模碰撞，最後形成橢圓星系。\n\n> 也就是說——螺旋星系和不規則星系為早期的天體，而橢圓星系屬於晚期的天體。\n\n螺旋星系的圓盤部分會往相同方向旋轉，同時在盤面及旋臂的地方，恆星形成較為活躍；而橢圓星系不會朝相同方向旋轉，各恆星的運動有很強的隨機傾向，而且也因為屬於老年天體，不容易有恆星的誕生。\n\n<br />\n\n<img src=https://i.imgur.com/EQ7LJMd.png style=max-width: 100% />\n\n(哈伯序列，Credit：The original uploader was Cosmo0 at English Wikipedia, Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	6j7fZK4eBg	TXoGaQ-iE0
77	橫跨天際的銀河	2022-04-07	> 隨著夏季的步伐到來，想必大家時不時就在網路上看到各種銀河炫耀照。\n\n如夢似幻就像假的一樣，不過只要掌握好幾個原則，想看到/拍到銀河其實並不難喔!\n\n<br>\n\n首先需要掌握好銀河出現的時間、方位，可以下載一些免費的星圖軟體(如Stellarium等)，並試著尋找幾個好辨認的星座來幫助我們判斷銀河的位置: 夏季大三角(牛郎、織女、天津四)、天蠍座，銀河從牛郎與織女的中間劃過，延伸到天蠍座的方向，在這個季節(6-8月)，銀河大約於晚上8-10點從東-東南方升起，銀河的中心大約在天蠍座、人馬座的位置，亮度比較高較容易觀察。\n\n<br>\n\n以肉眼觀看銀河，並不會像照片那樣顯眼，大部分時候受到環境光害、天氣因素影響，只會隱約看到一條淡淡的、略白色的不規則帶狀，有點像是一條或一片薄雲飄在天上，不過看久了就會發現雲會動，但是銀河不會動! (精準地來說銀河還是會動，因為地球自轉而緩慢的東升西落)\n\n<br>\n\n世界各地的文化當中，對銀河有著許多不同的神話傳說，像在中國最有名的就是牛郎織女的故事，他們被銀河分隔在兩岸，只有七夕時才能通過喜鵲搭建的鵲橋在銀河中間相會，夏季大三角的三顆亮星就代表著故事的主角: 牛郎星(河鼓二)、織女星、天津四，其中天津四位於天鵝座的尾巴，這隻天鵝就是中國的喜鵲~橫躺在銀河中央遨遊!\n\n<br>\n\n當然最後還要提醒，想看到銀河記得要找個光害少的地方，並挑個沒有月光的日子(農曆初一附近)，才不會「月明星稀」喔!	/img/story-bg-04.jpg	t	jMPQn9gyiD	o1oMVyShBR
14	恆星日及太陽日	2022-04-06	## 恆星日及太陽日\n\n> 地球的自轉和公轉一樣，方向均為由西向東，若從北極上方往下看，兩者均呈現逆時針轉動。\n\n<br />\n\n地球的自轉形成天體的周日運動，也產生晝夜交替變化。自轉軸約略指向北極星，故對地球上的觀測者而言，北極星幾乎固定在天空中永遠不動，其仰角大致等於觀察者所在緯度，而其他天體則會東升西落。夜晚時，若用相機對著北極星進行長時間曝光拍攝，便可記錄到群星繞著北極星旋轉的圓弧形軌跡。\n\n<br />\n\n若以遠方的一顆恆星為基準，當恆星連續兩次通過中天，即地球繞著自轉軸旋轉一圈360度所需的時間定義為一個恆星日；若以太陽為基準，當太陽連續兩次通過中天所需的時間定義為一個太陽日。由於地球在自轉的同時也會繞著太陽公轉，每天大約繞太陽公轉1度，因此每天需要多花4分鐘的時間才能再次正對太陽，這也導致太陽日的長度要比恆星日來的長。平均太陽日為24小時，這是因為地球的軌道為橢圓形，每天的太陽日長度並不一致，而恆星日約23小時56分鐘，也就是說恆星每天會提早4分鐘到達相同位置，一年後會提早24小時升起，即相同星空於同一時刻再現的週期為一年，故稱為周年運動。\n\n<br />\n\n![4673](https://i.imgur.com/hAiTYMi.png)\n\n<br />\n\n(恆星日與太陽日，取自維基百科)	/assets/bg/default-image-438x438.gif	t	nW7ON1KL9T	4TsWgIrSqM
46	阿爾伯特‧愛因斯坦 Albert Einstein	2022-04-06	## 科學家介紹\n\n猶太人，出生於德國，1933年移民至美國，他創立了現代物理學兩大支柱之一的相對論，也提出質能等價公式。除此之外，他也提出光量子假說(光電效應)，促成量子力學的發展；也發表論文，解釋布朗運動，證實原子的存在；和其他領域的科學家合作，提出相關的科學理論。愛因斯坦是近代非常重要的一位理論物理學家之一，被人稱之為「現代物理學之父」。\n\n<br />\n\n愛因斯坦早年便對物理學產生濃厚興趣，1896年，他進入蘇黎世聯邦理工學院就讀，認識了未來的第一任妻子米列娃‧馬利奇；1900年，愛因斯坦畢業，並於1902年進入伯恩瑞士專利局工作。由於工作上常常接觸到電磁信號傳遞、機電時間同步等專利技術問題，因此這也成為日後愛因斯坦思想實驗的內容之一，進而推導出光的性質與時空之間的關聯性。\n\n<br />\n\n> 1905年，愛因斯坦發表了博士論文《決定分子大小的新方法》\n\n<br />\n\n同年，他在《物理年鑑》發表了4篇論文，分別和光量子假說(光電效應)、布朗運動理論、狹義相對論、質能等價相關，每篇論文都對物理學產生重大的影響及貢獻，因此這一年也被稱為「愛因斯坦奇蹟年」。\n\n<br />\n\n光電效應證實了光的粒子說，即光可被視為一個粒子，其能量和光的頻率有關，且呈現量子化，不是古典物理學所認為的連續變化，而這也促成了量子力學的發展；布朗運動是指微小粒子在流體中呈現的無規則運動，最早由英國植物學家羅伯特‧布朗發現，布朗運動現象證實了原子的存在，也可用來測量其大小；狹義相對論改變了世人對於時間和空間的觀念，解決了古典力學和電磁學的矛盾之處，也證明時間和空間都是相對的；質能等價則證明了質量和能量是相同的，兩者只是對同一個東西的不同表述，而這也成為日後核能發展的理論基礎。\n\n<br />\n\n1915年，愛因斯坦將相對論和重力理論結合，提出了廣義相對論，在該理論中，重力的本質為時空的曲率，而時空的曲率可透過愛因斯坦方程式與能量及動量結合在一起。根據該理論，當天體的質量越大時，其周圍的時空曲率就越大，光線就越容易偏折。1916年，德國天文學家史瓦西根據愛因斯坦方程式，預測了黑洞的存在；同年，愛因斯坦預測了重力波的存在；1919年，英國天文學家愛丁頓在日全食時，發現了光的偏折，證實了廣義相對論，愛因斯坦也從此成為家喻戶曉的物理學者。\n\n<br />\n\n```\n愛因斯坦於1921年獲得諾貝爾物理學獎，但卻是因為光電效應而獲獎，因為受限於當時的科學技術，相對論很多預言無法被證明而受到質疑。\n```\n\n<br />\n\n1933年，因為希特勒鼓吹反猶太人主義，愛因斯坦只好遷居美國，1939年二戰前夕，愛因斯坦和其他科學家聯手致信給美國總統羅斯福，希望美國政府注重並發展核武器研究，即後來的曼哈頓計畫。曼哈頓計畫非常成功，美國也利用核彈終結了第二次世界大戰，但愛因斯坦其實非常痛恨核武，當時支持核武研究，只是為了避免希特勒搶先一步製造出來而危害世界，因此在1955年，愛因斯坦和其他學者共同發表了羅素─愛因斯坦宣言，主旨即呼籲世界各國領導人通過和平方式解決爭端，避免使用核武器。\n\n<br />\n\n雖然提到愛因斯坦，大家就會馬上聯想到相對論或是質能等價，但其實愛因斯坦也在其他領域和其他科學家有所合作，例如統計學、電磁學、宇宙學、量子力學等。在他職涯後期，愛因斯坦一直致力於發展統一場理論，希望用一個理論便可以詮釋當時已知的所有種類的基本粒子之間的交互作用，也就是重力和電磁力，只是在那個年代，強交互作用和弱交互作用的概念尚未完備，因此愛因斯坦最終並未成功。\n\n<br />\n\n1955年，愛因斯坦因腹主動脈瘤破裂引起內出血而過世，家人遵照他的遺願，將屍體火化後，骨灰撒在德拉威爾河。戲劇性地，在驗屍過程中，未經過愛因斯坦家人的同意，病理學家哈維醫生就把愛因斯坦的大腦取了下來並自行保存，事後更將大腦切成眾多小塊，以便做科學研究。\n\n<br />\n\n大家都認為愛因斯坦是個天才，但他卻說：「我沒有什麼天份，只是充滿了好奇心。」他也曾說過：「想像力比知識重要。」觀看愛因斯坦的求學過程，可以發現他從來都不是一個成績出色、循規蹈矩的好學生，相反的，他叛逆，不願被傳統所束縛，但也正因為如此，他才有辦法突破先人思維，開創出一個全新的時空概念，引領我們探究宇宙更深層的奧秘。\n\n<br />\n\n![3090](https://i.imgur.com/HUjpukC.png)\n\n(阿爾伯特·愛因斯坦，Credit：John D. Schiff, Public domain, via Wikimedia Commons)\n\n<br />\n\n![3092](https://i.imgur.com/MJk95yO.png)\n\n(1919年日全食光線偏折，Credit：Frank Watson Dyson, Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	wXqJzRy4PS	fGVkq0tONG
47	史蒂芬‧霍金 Stephen Hawking	2022-04-06	## 科學家介紹\n\n> 英國人，近代著名的理論物理學家、宇宙學家，被公認為愛因斯坦之後最傑出的物理學天才。\n\n他不只提出黑洞會因輻射能量、而逐漸蒸發的霍金輻射，也和數學家羅傑‧潘洛斯合作提出潘洛斯─霍金奇點定理，更結合廣義相對論及量子力學來解釋宇宙學現象，同時也致力於研究萬有理論(Theory of Everything)。儘管霍金在大學時代便已經患有運動神經細胞疾病(俗稱漸凍症)，使得後來身體逐漸癱瘓，但他不被病痛所打倒，仍然在學術上努力鑽研並且取得成功。\n\n<br />\n\n霍金大學時在牛津主修物理，後來到劍橋大學攻讀博士，並專攻宇宙學。在那個年代，已經知道宇宙在膨脹，而關於宇宙的狀態有兩個主流理論：大爆炸理論與穩恆態理論。大爆炸理論(The Big Bang)由喬治‧勒梅特於1927年提出，他通過計算得到愛因斯坦方程式的一個解，並由此指出宇宙在膨脹，後來該理論由喬治‧伽莫夫所完善，認為宇宙最初是由一個點爆炸後，逐漸膨脹而演化至今的，因此預言了宇宙微波背景輻射的存在；穩恆態理論則由英國天文學家霍伊爾等人提出，認為宇宙在膨脹的同時，其空缺會由新的物質所填補，故無論從任何地方或任何時刻看宇宙，宇宙看起來都是不變的。諷刺的是，大爆炸理論這個詞彙還是由霍伊爾首先命名的。\n\n<br />\n\n```\n在之後的許多年，這兩個理論並存於科學界，但是隨著觀測技術的進步，越來越多的觀測證據表明大爆炸理論才是正確的。\n1965年，彭齊亞斯和威爾森測量到宇宙微波背景輻射，成為壓垮穩恆態理論的最後一根稻草。\n從此科學界確定，大爆炸是解釋宇宙起源和發展的最佳理論。\n```\n\n<br />\n\n大爆炸理論指出宇宙起源於一個點，也就是奇點，廣義相對論預言黑洞的中心也是一個奇點，在愛因斯坦方程式的各種解裡面，奇點似乎是無可避免的。1965年，英國數學家潘洛斯證明，任何質量夠大的天體，在引力塌縮後必然會形成奇點，不需要任何特殊的初始條件。霍金了解之後，把這個想法應用到宇宙學中，並且將時間反轉，由塌縮改為膨脹，則所有宇宙膨脹過程必定都始於一個奇點。1970年，潘洛斯和霍金共同發表論文證明，假如宇宙遵守廣義相對論，且宇宙中包含足夠多的物質，則它必定起始於大爆炸奇點。\n\n<br />\n\n之後霍金開始研究黑洞，不只提出原初黑洞的概念、證明了決定黑洞性質的因素只有三個：質量、旋轉(角動量)、電荷，也闡明黑洞的事件視界表面積永遠不會減少。最初他認為，因為沒有任何物質能從黑洞中逃脫，所以黑洞的質量只會增加，不會減少；而黑洞的事件視界表面積取決於它的質量，所以表面積也只會增加，不會減少。\n\n<br />\n\n事實上，除了研究黑洞之外，霍金也開始研究量子重力，希望能把量子力學和廣義相對論統合在一起，直到目前這還是科學界的一道難題。俄國物理學家澤爾多維奇等人利用不確定性原理推論出旋轉中的黑洞會發射出粒子，霍金對此很有興趣，便和基普‧索恩前往拜訪。會談之後，霍金有了新的想法，他利用數學仔細地計算，推導出一個驚人的結果。根據量子漲落，在宇宙空間當中，會不斷發生粒子成對產生(能量轉成質量)、成對消滅(質量轉成能量)，因此在黑洞事件視界的邊界區域也會出現很多虛粒子對，每一對虛粒子由正能量粒子和負能量粒子組成。如果兩個粒子在湮滅之前，負能量粒子落入事件視界內部，則正能量粒子便可以逃離至無窮遠處，換句話說，粒子帶走了一部份的黑洞能量，看起來就好像是黑洞輻射出能量，因此黑洞的質量會逐漸減少，這就是黑洞輻射的機制。只是黑洞輻射率和質量成反比，且容易受到宇宙微波背景輻射的干擾，因此到目前為止，都還未觀測到這種被稱為霍金輻射的現象。\n\n<br />\n\n1981年，霍金提出黑洞悖論，認為黑洞因為霍金輻射而消失之時，其攜帶的資訊也會一併消失，但這個違反了量子力學的基本原則，即「資訊守恆定律」，而這也引起了科學界多年的辯論。1982年，維蘭金和霍金共同提出宇宙創生理論，認為宇宙是由「無」中誕生，所謂「無」，是指時間、空間、物質、光等都不存在的一種狀態。\n\n<br />\n\n除了科學研究之外，霍金也致力於發展科普教育，他曾撰寫過科普書籍及童書，例如：《時間簡史》、《胡桃裡的宇宙》、《大設計》、《勇闖宇宙三部曲》等，也出現在諸多影視作品當中，例如：《Red Dwarf》、《宅男行不行》等。霍金因為他的研究貢獻而獲得許多榮譽及獎章，可惜的是，因為他的理論還無法被證實，所以無法獲得諾貝爾獎。霍金也笑說，若能找到一個迷你黑洞來證實他的理論，他就能獲得諾貝爾獎了。\n\n<br />\n\n2018年3月14日，霍金與世長辭，骨灰被安置在倫敦西敏寺，和牛頓、達爾文為鄰，上千人在教堂外送他最後一程。儘管他一生當中深受漸凍症所苦，但他始終樂觀看待，不因身體的障礙而受限。和愛因斯坦一樣，霍金的科學理論已經在科學史上立下一道重要的指標，為人類的發展帶來永恆的貢獻。\n\n<br />\n\n![3112](https://i.imgur.com/bGcddby.png)\n\n(史蒂芬‧霍金，Credit：NASA/Paul E. Alers, Public domain, via Wikimedia Commons)\n\n<br />\n\n![3113](https://i.imgur.com/wM3EqT2.png)\n\n(胡桃裡的宇宙英文版封面)	/assets/bg/default-image-438x438.gif	t	rCROiQXhL1	fGVkq0tONG
29	大氣視窗	2022-04-06	## 我們的大氣層——\n\n> 並不允許所有電磁波都能夠穿透\n\n因此只有某些特定波段的電磁波能進到地球的表面。\n\n<br />\n\n允許在地面進行觀測，如：\n\n<br />\n\n- 可見光\n- 部份紅外線\n- 微波及電波\n\n<br />\n\n<img src=https://i.imgur.com/1DwSB52.png style=max-width: 100% />	/assets/bg/default-image-438x438.gif	t	vUhUT9_-vx	q_131k3EGK
15	二十四節氣	2022-04-06	## 二十四節氣\n\n> 吃完湯圓為什麼會多一歲? 這完全是24節氣規定所致！\n\n<br />\n\n發源於中國華北地區的24節氣，主要是為了讓人民能夠知寒暑而決定農事的進展、甚至在生活上有個參考的依據，因此就按太陽在黃道上的位置，訂出了節氣。但是這樣的設計，並不適用台灣的氣候與農作，因為台灣位於中低緯度，屬於亞熱帶及熱帶季風氣候。\n\n<br />\n\n我們日復一日、年復一年，看著太陽東升西落，而它在天空中行經的路線，我們稱之為黃道。由於地球自轉軸相對於公轉軌道，存在23.5度的夾角，因此有著春夏秋冬四季的變化。在《淮南子天文訓》一書中記載著24節氣的次序和名稱。從地球上觀察，太陽每天約在天空中行走1度，環繞一圈則稱為一個回歸年。在中國古代，冬至是新的一年的開始，這也是為什麼吃完湯圓多一歲的由來。\n\n<br />\n\n由於一年的長度是用太陽的運行訂出，24節氣也是按照太陽的位置設計，基本上，每一節氣在每年中的日期變動不大。然而，一個回歸年實際長度為365.2422天，曆法上的一年長度則為365天，這樣的差距，我們則是透過閏年的設計來修正，也因此有時候節氣不會都固定在某一個日期。	/assets/bg/default-image-438x438.gif	t	U2Y-wI9ow7	4TsWgIrSqM
57	滿月是不是都在農曆十五日出現？	2022-04-06	## 曆法相關\n\n> 月球繞地球公轉時，當它運行至與太陽經度相差180度時稱為滿月(望)。\n\n此時月球受光面對著地球，可見到一輪滿月。\n\n<br />\n\n然而，望的日期並非都在農曆十五日，依統計發現，於西元1951年至2050年百年間，望在農曆十四日有7次，十五日有465次，十六日有578次，十七日有187次。\n\n<br />\n\n可見望大都在農曆的十五日及十六日，在十四日時最少，在2020年8月23日為農曆六月十四之後，最近會再見到農曆十四滿月的日期依序是民國126年（西元2037年）農曆五月十四日及民國138年（西元2049年）農曆閏十月十四日。	/assets/bg/default-image-438x438.gif	t	Y-JX3ZmxS3	wI0aS3tQ0c
18	類木行星	2022-04-06	## 類木行星\n\n也稱氣體巨行星，早期是指太陽系中的木星、土星、天王星、海王星，具有行星環的結構且整體密度較低，但因為天王星和海王星的內部及大氣組成和木星及土星有所差異，主要由冰(水、甲烷、氨)組成，所以後來科學家將其稱為冰巨行星。\n\n<br />\n\n![4802](https://i.imgur.com/8xXQV2Z.png)\n\n<br />\n\n(太陽系中的類木行星，取自網路)\n\n<br />\n\n雖然木星和土星的大氣主要由氫和氦所組成，比例約占90%以上，但因為體積非常巨大，在內部的氫會被高壓液化而成為金屬氫，因此可以導電。中心可能有岩石和冰形成的核，也可能沒有，因為行星體積大，壓力高，而內部的氫在高溫、高壓下無法測得正確的值，所以目前還沒有辦法仔細地研究其內部結構。\n\n<br />\n\n當天文學家開始搜尋系外行星時，最早是採用凌日法，因此發現的都是體積較大的氣體行星，加上這些行星和母恆星的距離都非常近，所以稱它們為熱木星。也因為這些系外行星的發現，讓天文學家重新檢視「行星會停留在誕生處」的傳統固定觀念，最終提出了行星遷徙的理論。	/assets/bg/default-image-438x438.gif	t	9_nUYTqNWl	4TsWgIrSqM
58	何謂二十四節氣？	2022-04-06	## 曆法相關\n\n> 古代曆法家取冬至為1年的開始，將冬至到次1年冬至整個回歸年的時間平分為12等分。\n\n每個分點稱為中氣，再將2個中氣間長度等分，其分點稱為節氣，12個中氣加12個節氣，俗名統稱二十四節氣，它們分別是冬至、小寒、大寒、立春、雨水、驚蟄、春分、清明、穀雨、立夏、小滿、芒種、夏至、小暑、大暑、立秋、處暑、白露、秋分、寒露、霜降、立冬、小雪、大雪。\n\n<br />\n\n由於中國各朝代領域大都在中原附近，亦即大抵位於黃河流域，節氣名稱因此也是依該地區氣候寒暑變化及耕耘播種之農時等命名。\n\n<br />\n\n從清初時憲曆（西元1645年）起，節氣的推算由前述1年平分24等分所得的平節氣，改為定節氣，所謂定節氣是由春分點開始，將太陽在黃道上視行每15度定1節氣，1周360度共有24個節氣，如此可反映出地球實際運行到的位置，當地球到了某1節氣時，因受陽光照射量的不同，而有不同的氣候。\n\n<br />\n\n古人為了便於記憶二十四節氣的名稱及順序，將每個節氣名稱各取1個字按著次序組成歌訣如下：「春雨驚春清穀天、夏滿芒夏暑相連、秋處露秋寒霜降、冬雪雪冬小大寒。」	/assets/bg/default-image-438x438.gif	t	pucF7wkuGl	wI0aS3tQ0c
20	大霹靂	2022-04-06	## 大霹靂\n\n大霹靂(Big Bang)是描述宇宙的源起與演化的宇宙學模型，宇宙是在過去有限的時間之前，由一個密度極大且溫度極高的太初狀態演變而來的，這一狀態被稱為奇異點。根據2015年普朗克衛星所得到的最佳觀測結果，宇宙大爆炸距今約138億年，並經過不斷的膨脹到達今天的狀態。大爆炸理論的建立基於了兩個基本假設：物理定律的普適性和宇宙學原理。宇宙學原理是指在大尺度上宇宙是均勻且各向同性的。支持大霹靂理論的觀測證據包括宇宙微波背景輻射、Ia型超新星爆炸、宇宙間輕元素的豐度、大尺度結構和星系演化。\n\n<br />\n\n![193](https://i.imgur.com/P4CfROy.png)\n\n[https://commons.wikimedia.org/wiki/File:Universe_expansion_cn.png](https://commons.wikimedia.org/wiki/File:Universe_expansion_cn.png)\n\n<br />\n\n一般相信宇宙在大霹靂之後很短的時間（小於1秒）內發生了宇宙暴漲，宇宙的大小膨脹了約1050倍。宇宙起初極高溫，隨著膨脹而逐漸降溫，直到宇宙誕生後38萬年左右，宇宙的溫度降到3,000K，這時候電子跟質子偶合，形成了中性氫原子，光子才能走出這團原始的電漿狀態，宇宙才開始成為透明狀態。宇宙持續膨脹，時至今日，這道最初的光子的黑體輻射溫度降至3K，成為我們所周知的宇宙微波背景輻射。\n\n<br />\n\n![206](https://i.imgur.com/OScPjQP.png)\n\n[https://commons.wikimedia.org/w/index.php?curid=10990183](https://commons.wikimedia.org/w/index.php?curid=10990183)	/assets/bg/default-image-438x438.gif	t	tbO-82mOfv	EPjv62EBE2
21	哈伯–勒梅特定律	2022-04-06	## 哈伯–勒梅特定律\n\n哈伯–勒梅特定律（Hubble-Lemaître law）指遙遠星系的退行速度與它們和地球的距離成正比，即距離地球越遠的星系退行速度越快。哈伯-勒梅特定律成為宇宙膨脹理論的基礎，以線性方程式表示：ｖ＝Ｈ０Ｄ其中，ｖ是由紅移現象測得的星系遠離速率， Ｈ０是哈伯常數，Ｄ是星系與觀察者之間的距離。哈伯常數的值通常經由遙遠星系的紅移來測量，但是在用來測量這些距離的物理假設上的不確定，造成哈伯常數的值有不同的結果。在20世紀的後半期，多數的哈伯常數值Ｈ０都被估計在50和90 km/s/Mpc之間。\n\n<br />\n\n2012年12月20日，NASA的威爾金森微波各向異性探測器 (WMAP) 實驗團隊宣布，哈伯常數為69.32 ± 0.80 km/s/Mpc。\n\n<br />\n\n2013年3月21日，從普朗克衛星觀測獲得的數據，哈伯常數為67.80 ± 0.77  km/s/Mpc。\n\n<br />\n\n2018年7月，利用哈伯望遠鏡和蓋亞任務，測得哈伯常數值為 73.52 ± 1.62 km/s/Mpc。\n\n<br />\n\n![194](https://i.imgur.com/aiQBSqp.png)\n\nBy Brews ohare - Own work, CC BY-SA 3.0, [https://commons.wikimedia.org/w/index.php?curid=6042242](https://commons.wikimedia.org/w/index.php?curid=6042242)	/assets/bg/default-image-438x438.gif	t	UEPu5b9yLD	EPjv62EBE2
22	宇宙微波背景輻射	2022-04-06	## 宇宙微波背景輻射\n\n宇宙微波背景（Cosmic Microwave Background，簡稱CMB，又稱3K背景輻射）是宇宙學中「大霹靂」遺留下來的熱輻射，是一種充滿整個宇宙的電磁輻射，其特徵和絕對溫標2.725K的黑體輻射相同，頻率屬於微波範圍。\n\n<br />\n\n宇宙微波背景是宇宙背景輻射之一，為觀測宇宙學的基礎，因其為宇宙中最古老的光，可追溯至再復合（Recombination）時期。利用傳統的光學望遠鏡，恆星和星系之間的空間是一片漆黑。然而，利用靈敏的背景輻射望遠鏡可發現微弱的背景輝光，且在各個方向上幾乎一模一樣，與任何恆星、星系或其他天體都毫無關係。這種光的電磁波譜在微波區域最強。1964年美國天文學家阿諾·彭齊亞斯和羅伯特·威爾遜偶然發現宇宙微波背景，這一發現是基於1940年代開始的研究，並於1978年獲得諾貝爾獎。\n\n<br />\n\n「宇宙微波背景是我們宇宙中最古老的光，當宇宙剛剛38萬歲時瀰漫在天空上。它顯示出微小的溫度起伏，對應著局部密度的細微差異，代表著所有未來的結構，是當今的恆星與星系的種子」\n\n<br />\n\n![201](https://i.imgur.com/EH6CGZm.png)\n\n[https://commons.wikimedia.org/w/index.php?curid=52875](https://commons.wikimedia.org/w/index.php?curid=52875)	/assets/bg/default-image-438x438.gif	t	jhwuSUHSwH	EPjv62EBE2
23	星系	2022-04-06	## 星系由恆星及恆星系、星際塵埃組成的運行系統。\n\n> 星系平均有數百億顆恆星，全都環繞著質量中心運轉，是構成宇宙的基本單位。\n\n<br />\n\n星系的直徑介於3,000光年至50萬光年之間，多數的星系會組織成更大的集團，成為星系群或星系團，它們又會聚集成更大的超星系團。\n\n<br />\n\n大部份星系都有一個超大質量黑洞存在於星系的核心，一般相信活躍星系即是黑洞吸積物質釋放出大量輻射能量而形成的。\n\n<br />\n\n星系根據它的外觀形狀主要分為三類：橢圓星系、螺旋星系和不規則星系。我們的銀河系是一個有巨大星系盤的棒旋星系，包含恆星、星團、星雲、星際物質、宇宙塵和暗物質，並且受到重力束縛的大質量系統。\n\n<br />\n\n直徑大約十萬光年，厚度則約為三千光年，擁有約三千億顆恆星。在大部份的星系中，暗物質約佔有90%的質量。\n\n<br />\n\n![204](https://i.imgur.com/h51M8ug.png)\n\n[https://commons.wikimedia.org/w/index.php?curid=127019](https://commons.wikimedia.org/w/index.php?curid=127019)	/assets/bg/default-image-438x438.gif	t	Lk3S-ioFHC	EPjv62EBE2
24	Ia 型超新星爆炸	2022-04-06	## Ia 型超新星爆炸的原型是一對雙星\n\n其中質量高的一顆恆星（白色）演化速度較快，先演化進入紅巨星階段，紅巨星的外層氣體被吸入伴星（黃色）的洛希半徑並慢慢散開，留下核心成為一顆白矮星。\n\n<br />\n\n隨著時間過去，黃色伴星也進入演化末期的紅巨星階段，外層氣體也隨著膨脹進入伴星白矮星的洛希半徑，當被吸附上白矮星的氣體質量累積超過白矮星所能承受的質量上限，白矮星承受不住壓力即會爆發，形成超新星爆炸，而此種超新星爆炸則被稱為Ia型的超新星爆炸。\n\n<br />\n\n![Untitled](https://i.imgur.com/kAUM68O.png)	/assets/bg/default-image-438x438.gif	t	ObsZxqJkY8	EPjv62EBE2
25	暗能量	2022-04-06	## 天文學家推測宇宙——\n\n大約在60億年前開始加速膨脹，而加速膨脹的原因則來自於暗能量的貢獻。\n\n<br />\n\n目前還沒有人知道暗能量是什麼，而是根據理論推測，宇宙中存在著一股對抗重力塌縮的力量，也就是使宇宙膨脹的負壓力。\n\n<br />\n\n![949](https://i.imgur.com/IK6JDdw.png)\n\nAnn Feild (STScI), Public domain, via Wikimedia Commons	/assets/bg/default-image-438x438.gif	t	nbprYmdcek	EPjv62EBE2
26	暗物質	2022-04-06	## 在宇宙學中——\n\n暗物質（英語：Dark matter），是指不與電磁力產生作用的物質。人們目前只能透過重力產生的效應得知，而且已經發現宇宙中有大量暗物質的存在。\n\n<br />\n\n現代天文學經由重力透鏡、宇宙中大尺度結構的形成、微波背景輻射等方法和理論來探測暗物質。而根據ΛCDM模型，由普朗克衛星探測的數據得到：\n\n<br />\n\n整個宇宙的構成中，常規物質（即重子物質）占4.9%，而暗物質則占26.8%，還有68.3%是暗能量。對暗物質（和暗能量）的研究是現代宇宙學和粒子物理的重要課題。\n\n<br />\n\n1975年，美國天文學家薇拉·魯賓觀測星系轉速時，發現星系外側的旋轉速度較牛頓重力預期的快，故推測是有數量龐大的暗物質存在，因而維持星系外側物質的高速旋轉速度。\n\n<br />\n\n2006年，美國天文學家利用錢德拉X射線望遠鏡對星系團1E 0657-558進行觀測，無意間觀測到星系碰撞的過程，星系團碰撞威力之猛，使得暗物質與正常物質分開，因此發現了暗物質存在的直接證據。\n\n<br />\n\n雖然暗物質在宇宙中大量存在是一個普遍的看法，但是科學家們也有發現螺旋星系NGC 4736的旋轉能完全依靠可見物質的重力來解釋，也就是說這個星系沒有暗物質或者物質很少。\n\n<br />\n\n![950](https://i.imgur.com/dQITElW.png)\n\nMario De Leo, CC BY-SA 4.0 , via Wikimedia Commons	/assets/bg/default-image-438x438.gif	t	TTtdgBuYyW	EPjv62EBE2
28	日食	2022-04-06	## 當月球運行至地球與太陽中間——\n\n> 月球的「影子」落在地球上，此時地球上該區域即可看到日食。\n\n<br />\n\n![356](https://i.imgur.com/qzM2qih.png)\n\n<br />\n\n在月球的「本影」處，可以看到日全食；而在「半影」處，則只能看到日偏食。\n\n<br />\n\n月球繞地球的軌道並非正圓形，而是橢圓形，月球距離地球的遠近並不一樣，當月球比較遠時，在地球上看起來比較小顆，此時月球若無法把太陽整顆遮住，就會看到日環食。\n\n<br />\n\n![361](https://i.imgur.com/iRVsPLp.png)\n\n<br />\n\n![362](https://i.imgur.com/k6Jyeyg.png)\n\n<br />\n\n![360](https://i.imgur.com/GeaBptd.png)\n\n<br />\n\n(依序為日全食、日偏食、日環食，取自[https://en.wikipedia.org/wiki/Solar_eclipse[(https://en.wikipedia.org/wiki/Solar_eclipse))\n\n<br />\n\n雖然就全地球而言，平均每18個月就會有某個地方發生日全食，但由於月球落在地球的本影區很小，就同一個地點來說，平均要300~400年才會看到一次日全食，每次日全食完全遮住的時間也只有持續不到幾分鐘而已。\n\n<br />\n\n從日食的開始到結束，以日全食來說共有5個重要階段：\n\n<br />\n\n![358](https://i.imgur.com/KvJXT1W.png)\n\n> 由上而下，分別是:\n\n- 初虧(太陽、月球第一次外切，太陽被咬第一口)\n- 食既(太陽、月球第一次內切，太陽完全被遮住)\n- 食甚(太陽、月球中心最接近的時刻)\n- 生光(太陽、月球第二次內切，太陽開始恢復)\n- 復圓(太陽、月球第二次外切，太陽完全恢復圓形)\n\n<br />\n\n從初虧至復圓，可以持續3小時左右，大部分時間可以慢慢地觀賞(不過食既-食甚-復圓只有幾分鐘，很短)，只是一定要注意使用安全的裝置來觀看太陽，例如太陽濾鏡、日食專用觀測眼鏡等，否則強烈的太陽光將造成視力永久性的損害!	/assets/bg/default-image-438x438.gif	t	f-oR2s90eU	KrkQnuNx_1
30	可見光天文學	2022-04-06	## 由於可見光可穿透大氣層——\n\n可見光天文學是最古老的天文學，起初人們只能用肉眼觀測，並用手繪紀錄天體的形象及位置。\n\n<br />\n\n後來發展出底片攝影，留下大量天文攝影底片資料，近代則被數位攝影儀器(CCDs)所取代。\n\n<br />\n\n可見光波段大約為400nm~700nm，通常設計用來觀測可見光的儀器亦可能拍攝到近紅外線或近紫外線。\n\n<br />\n\n![887](https://i.imgur.com/lzL0px9.png)\n\nNational Library of Wales, CC0, via Wikimedia Commons	/assets/bg/default-image-438x438.gif	t	jpattkgzQy	q_131k3EGK
31	電波天文學	2022-04-06	## 電波天文學（Radio Astronomy\n\n指的是使用無線電波的波段記錄到來自天體的輻射而發展出的天文學，最早是由1932年卡爾簡斯基探測到來自銀河系中心的電波訊號。\n\n<br />\n\n由於電波波長較可見光長，通常觀測用的天線也需要相對較大，並利用２座以上天線進行干涉技術來提高觀測的解析度，因此天線相對距離（稱為基線）相當重要。\n\n<br />\n目前地面上較長基線的電波望遠鏡即為事件視界望遠鏡（Event Horizon Telescope, EHT），主要用來觀測星系中心的巨大質量黑洞。\n\n<br />\n\n![896](https://i.imgur.com/D8egpGd.png)\n\nuser:Hajor, CC BY-SA 2.0 , via Wikimedia Commons	/assets/bg/default-image-438x438.gif	t	Lht4cvbGFf	q_131k3EGK
32	紅外線天文學	2022-04-06	## 紅外線波段的波長——\n\n> 是介於可見光及次毫米波段之間\n\n<br />\n\n由於大部份紅外線都無法穿透大氣層，因此紅外線天文學以太空望遠鏡貢獻較大。\n\n<br />\n\n由於波長較可見光長，因此紅外線常被用來觀測被灰塵遮閉之可見光天體。且紅外線可探測灰塵和雲氣所發出之黑體輻射，因此常用來觀測恆星形成區域。\n\n<br />\n\n<img src=https://i.imgur.com/iB2VoTq.png style=max-width: 100%>	/assets/bg/default-image-438x438.gif	t	Q9SVOdk48O	q_131k3EGK
33	紫外線天文學	2022-04-06	## 紫外線天文學觀測電磁波——\\n\\n波長大約在100到3200埃之間 。因為這個範圍波長的輻射無法穿透地球大氣層，必須以太空望遠鏡觀測。\\n\\n<br />\\n\\n天體的紫外線光譜可用來了解星際介質的化學成分、密度以及高溫年輕恆星的溫度與組成。星系演化的訊息也可從紫外線觀測得知。\\n\\n<br />\\n\\n以紫外線觀測天體的結果會與光學觀測有很大的差異。許多在光學觀測上相對溫度較低的恆星在紫外線觀測時卻顯示是高溫天體，尤其是在演化階段早期或晚期恆星。如果人眼可看到紫外線，我們所看到的夜空大部分的天體將會比現在黯淡許多。我們將能看到年輕的巨大恆星或年老恆星與星系。且許多銀河系中的分子雲和塵埃將阻擋許多天體。\\n\\n<br />\\n\\n![924](https://i.imgur.com/SJN2UJB.png)\\n\\n<br />\\n\\n圖示：星系演化探測器（Galaxy Evolution Explorer，GALEX）拍攝M81螺旋星系的紫外線影像。 Credit:GALEX/NASA/JPL-Caltech.	/assets/bg/default-image-438x438.gif	t	eGeT0kQTbe	q_131k3EGK
59	農曆為何要有閏月的安排？	2022-04-06	## 曆法相關\n\n> 中國古代所行的曆法是屬陰陽合曆，月份是配合月象的圓缺。\n\n而年要配合四季寒暑的變換，可是12個陰曆月（朔望月）不過約354日左右，而氣候周而復始的1個回歸年卻有365.2422日，兩者相差11日左右，因此大約每3年須加1個閏月，農曆也才能與氣候配合，較精確地說19年須加7個閏月，其計算方法：\n\n```\n// 19個回歸年\n365.2422日 × 19 ＝ 6939.6018日\n\n12個朔望月 × 19 ＋ 7個朔望月\n＝ 29.53059日 × 235\n＝ 6939.6887日\n```\n\n以上19個回歸年和235個朔望月的日數相當接近，亦即農曆和陽曆日期大約每19年會相遇1次，亦即今天兩者的日期和19年前或19年後的今天日期大多相同，即使有不同亦不過相差1天而已。	/assets/bg/default-image-438x438.gif	t	5IeyqNpC9O	wI0aS3tQ0c
34	X射線天文學	2022-04-06	## X射線天文學中——\n\n> 常以電子伏特（eV）表示光子的能量，觀測對象為0.1keV到100keV的X射線。\n\n<br />\n\n其中又將0.1keV-10keV的X射線稱為軟X射線，10keV-100keV稱為硬X射線。\n\n<br />\n\n由於X射線屬於電磁波譜的高能端，因此X射線天文學與伽瑪射線天文學同稱為高能天體物理學。\n\n<br />\n\n宇宙中輻射X射線的天體包括X射線雙星、脈衝星、伽瑪射線暴、超新星爆炸遺骸、活躍星系核、太陽活動區，以及星系團周圍的高溫氣體等等。由於地球大氣層對於X射線是不透明的，只能在高空或者大氣層以外觀測天體的X射線輻射，因此太空望遠鏡是X射線天文學的主要工具。\n\n<br />\n\n![908](https://i.imgur.com/2tJ03CE.png)\n\n圖示：陽光衛星（Soft X-Ray Telescope，SXT）拍攝的軟X射線波段太陽照片，顯示出北極附近區域巨大的冕洞。NASA Goddard Laboratory for Atmospheres and  Yohkoh Legacy data Archive, Public domain, via Wikimedia Commons	/assets/bg/default-image-438x438.gif	t	t-LghtBZEN	q_131k3EGK
35	伽瑪射線天文學	2022-04-06	## 伽瑪射線是可穿透——\n\n整個宇宙的電磁波中最高能量的波段，也是電磁波譜中波長最短的部分。\n\n<br />\n\n伽瑪射線可由太空中的超新星、正電子湮滅、黑洞形成、甚至是放射衰變產生。\n\n<br />\n\n大多數天體釋放的伽瑪射線一般認為並非來自放射衰變，而是和X射線天文學一樣來自加速的電子、電子和正電子作用（但因為能量較高而產生伽瑪射線）。\n\n<br />\n\n![909](https://i.imgur.com/xbojuuQ.png)\n\n圖示：CGRO（Compton Gamma Ray Observatory）衛星上乘載的EGRET（Energetic Gamma Ray Experiment Telescope）望遠鏡拍攝到的全天超過100 MeV 的天體。NASA, Public domain, via Wikimedia Commons	/assets/bg/default-image-438x438.gif	t	Qnwbl74cY_	q_131k3EGK
36	亞里斯多德 Aristotle	2022-04-06	## 科學家介紹\n\n著名的古希臘哲學家，柏拉圖的學生、亞歷山大大帝的老師。涉獵領域廣泛，著作包含物理學、自然哲學、形上學、倫理學、生物學、邏輯學、美學、經濟學…等等，同時在政治上也有其獨特的見解。和蘇格拉底、柏拉圖(蘇格拉底的學生)一起被稱為古希臘三哲，被後人視為是西方哲學的奠基者。\n\n<br />\n\n亞里斯多德透過天體觀測，認為宇宙是以地球為中心，地球靜止不動，月亮、太陽、五大行星和其他恆星則環繞地球運轉。此外，他認為整個世界主要由五種元素所構成，其中四種：土(earth)、水、氣(air)、火組成了地球上的物質，不同的物質，其內在的元素比例就會有所不同，而宇宙中充斥著第五種物質：乙太(ether)，乙太無所不在，沒有質量，絕對靜止，同時也象徵著永恆，在歐洲中世紀時期，乙太更是具有神聖的至高無上地位。\n\n<br />\n\n到了西元2世紀，亞里斯多德的宇宙觀念被[托勒密](https://taea.tn.edu.tw/taea/astro_news/book_detail/6b891cf8-0798-11eb-ab84-034f524b8813)(Ptolemy)加以重新整理後，形成了「地心說」理論，因為基督教盛行的關係，地心說在西方世界流行了1500年以上，直到哥白尼對它提出質疑，加上後續科學家的努力，地心說最後終於退出了歷史舞台，由「日心說」理論取而代之。\n\n<br />\n\n![981](https://i.imgur.com/0jiOPCp.png)\n\n(亞里斯多德雕像，Credit：After Lysippos, Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	LTRfuIv9PT	fGVkq0tONG
37	克勞狄烏斯‧托勒密 Claudius Ptolemy	2022-04-06	## 科學家介紹\n\n> 著名的學者，同時也是數學家、天文學家、地理學家、占星家。\n\n<br />\n\n托勒密最有名的便是他根據亞里斯多德的宇宙論，重新整理後提出的「地心說」。該理論認為，地球位於宇宙中心，其他天體則鑲嵌於天球上，繞著地球作完美的圓周運動，整個宇宙就是一個層層球殼所組成的集合體。為了解釋行星的運動，托勒密還提出了本輪(epicycle)和均輪(deferent)的概念，本輪是行星本身繞著某個定點所運行的圓軌跡，而此定點又繞著地球公轉，其走過的圓軌跡就稱為均輪。本輪和均輪的使用可以解釋一些奇特的天文現象，例如：行星的逆行。\n\n<br />\n\n雖然在地心說理論中，地球位於中心點，但事實上，關於模型中地球所在的位置，托勒密有做些微調整。在實際觀測中，行星的運動速率會因場所而有所不同，而在當時的天文學觀念中，天球的數目是可以增加的，但是每個圓的旋轉速度是固定的。因此，托勒密便將地球的位置從中心稍微挪了一下，他認為從稍微偏離中心位置的地球來看，就算實際上以相同速率運行的行星，也會因位置的不同，看起來而有所差異。\n\n<br />\n\n托勒密著有許多科學著作，例如：天文學大成、占星四書、元素論等等，對於光學、地理學也有所研究。\n\n<br />\n\n![982](https://i.imgur.com/TZ2y25r.png)\n\n(托勒密圖像，取自Wikiwand)\n\n<br />\n\n![983](https://i.imgur.com/fHaEYax.png)\n\n(托勒密的宇宙體系，Credit：Jan van Loon, Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	hUnRJ5JyDm	fGVkq0tONG
38	尼古拉‧哥白尼 Nicolaus Copernicus	2022-04-06	## 科學家介紹\n\n> 波蘭人，文藝復興時期的數學家、天文學家。\n\n其日心說理論掀起了天文學界的大革命，被視為是近代科學的前驅，對近代科學革命有著重大的貢獻。\n\n<br />\n\n在當時，大家普遍接受托勒密的地心說理論，認為地球是宇宙的中心，其他天體均繞著地球，沿著圓形軌道運轉，而且所有天體都是完美的球體。除此之外，托勒密為了使理論符合觀測數據，創造出「本輪」和「均輪」的概念，由於理論和觀測數據大致上都吻合，加上符合基督教的教義，因此被教會大力支持及推廣，所以人們深信不疑。\n\n<br />\n\n但哥白尼對此產生了懷疑，他認為地心說過於複雜，自然規律應該要更加簡潔才對。由於地心說理論允許本輪和均輪可互相對調，哥白尼實際測試之後，發現若將太陽擺在中心的話，整個模型就可以變得相當有條理，同時也能解釋行星的怪異路徑。哥白尼將他的研究成果整理在《天體運行論》一書中，並且在1543年出版。\n\n<br />\n\n雖然哥白尼提出了日心說的概念，但他並沒有完全捨棄托勒密的科學概念，在他的日心說模型當中，行星依舊鑲嵌在天球中，並隨著球殼轉動，另外，哥白尼也相信天體的運動是完美的圓周運動，這使得他的模型依舊需要小本輪來做修正。儘管如此，哥白尼還是為天文學打開了一道新的大門，吹響了天文學革命的號角。\n\n<br />\n\n![984](https://i.imgur.com/4qr8Sse.png)\n\n(哥白尼肖像，Credit：Toruń Regional Museum, Public domain, via Wikimedia Commons)\n\n<br />\n\n![985](https://i.imgur.com/FSPCldX.png)\n\n(哥白尼的宇宙觀，Credit：Nicolai Copernici  Created in vector format by Scewing, Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	gzwI6-4qHl	fGVkq0tONG
16	天球	2022-04-06	## 天球\n\n在地表上觀看天體時，由於天體距離地球都非常遙遠，我們僅憑肉眼無法分辨它們的遠近，因此會感覺所有天體都鑲嵌在一個位於無限遠處的假想球面上，而此球體就稱為天球。\n\n<br />\n\n天球和地球具有相同的球心及自轉軸，地球自轉軸向外延伸與天球相交的點稱為天北極及天南極，地球赤道向外延伸並投影在天球上，稱為天球赤道。\n\n<br />\n\n為了方便指出天體在天球上的位置，天文學家制定出赤經及赤緯，其功能就像地表上的經緯度。有了赤經赤緯，則每個天體在天空中都有一組座標，此座標系統就稱為赤道座標系。\n\n<br />\n\n![4755](https://i.imgur.com/rvQdXz4.png)\n\n<br />\n\n(天球，紅色為黃道、綠色為赤經及赤緯，取自Tfr000 (talk) 20:06, 29 March 2012 (UTC), CC BY-SA 3.0, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	BmxKkdhJun	4TsWgIrSqM
1	太陽系	2022-04-06	## 太陽系到底包含什麼呢?\n\n> 一般來說可能直覺就是太陽與八大行星─水星、金星、地球、火星、木星、土星、天王星、海王星。\n\n<br />\n\n![Untitled](https://i.imgur.com/3gUkmwk.png)\n\n<br />\n\n(太陽與八大行星，取自[!https://en.wikipedia.org/wiki/Solar_System](https://en.wikipedia.org/wiki/Solar_System))\n\n<br />\n\n不過比較嚴謹的定義，只要是在太陽主導的範圍內都算是太陽系的範圍，可由兩種概念去定義，一是太陽的重力所主導的範圍；二是太陽風所主導的範圍。\n\n<br />\n\n太陽重力所主導的區域，意即在此範圍內的天體是受到太陽的引力而圍繞太陽運轉，最遠估計是到約2光年遠的歐特雲，作為參照，離太陽最近的另一顆恆星是比鄰星，距離4.2光年。\n\n<br />\n\n太陽風所主導的區域，是指太陽所吹出的太陽風與星際物質的邊界，大約100AU(隨著太陽活動變化，此邊界的距離起伏不定)，目前航行最遠的人造物體─航海家1號與2號已經穿越到此之外。\n\n<br />\n\n![Untitled](https://i.imgur.com/F4qZbJc.png)\n\n<br />\n\n(太陽系的範圍，由內而外依序為太陽、八大行星、太陽風邊界/日球層頂Heliopause、歐特雲Oort Cloud，取自Oort Cloud and Scale of the Solar System (Infographic) | NASA Solar System Exploration)\n\n<br />\n\n航海家1號，距離太陽150AU (2020年)，已經飛出日球層頂，脫離太陽風的範圍，因此可以說它飛出了太陽系，但卻又還沒到達歐特雲，似乎還在太陽系裡面，這就是因為以不同的方式來定義太陽系(太陽風/太陽重力)。\n\n<br />\n\n太陽系內的天體繁多，若依照環繞太陽的天體性質區分，則可分為：行星、矮行星、太陽系小天體。\n\n<br />\n\n在2006年國際天文聯合會正式對行星、矮行星、太陽系小天體做出定義：\n\n<br />\n\n行星：\n\n- 圍繞恆星公轉\n\n- 質量足夠大，可產生足夠的引力使其保持接近球體\n\n- 能夠清除軌道附近的天體\n\n<br />\n\n矮行星：\n\n- 圍繞恆星公轉\n\n- 質量足夠大，可產生足夠的引力使其保持接近球體\n\n- 不能清除軌道附近的天體\n\n- 不是衛星\n\n<br />\n\n太陽系小天體：\n\n- 其他軌道環繞太陽的天體\n	/assets/bg/default-image-438x438.gif	t	FTYQn0A4su	4TsWgIrSqM
17	類地行星	2022-04-06	## 類地行星\n\n也稱岩石行星，主要由金屬及矽酸鹽岩石所組成，在太陽系中類地行星共有4顆，分別為水星、金星、地球、火星。\n\n<br />\n\n![4787](https://i.imgur.com/PDzF4Cy.png)\n\n<br />\n\n(太陽系中的類地行星，取自wikipedia user Brian0918, Public domain, via Wikimedia Commons)\n\n<br />\n\n類地行星的核心由鐵及其他金屬所組成，周圍則含有以矽酸鹽類為主的地函，整體密度相對於類木行星來說要大。\n\n<br />\n\n除了太陽系以外，目前天文學家尋找的系外行星中也含有類地行星，其中有些甚至位於適居帶上，和地球擁有類似的溫度及水資源，例如：Gliese 581c。\n\n<br />\n\n由於類地行星一般來說比較小，因此透過凌日法尋找到的系外行星多半屬於類木行星，不過隨著望遠鏡的觀測能力提升，未來的望遠鏡將有能力直接觀測到類地行星，天文學家也認為類地行星是宇宙當中相當常見的天體，未來發現地球2.0的機率也相當高。	/assets/bg/default-image-438x438.gif	t	ibAC-97hQu	4TsWgIrSqM
4	水星	2022-04-06	## 軌道特性:\n\n> 水星是距離太陽最近的行星\n\n軌道半長軸為0.38AU，而其離心率是行星之中最大的，近日點與遠日點的距離約1.5倍(0.31AU與0.47AU)，繞行太陽一圈約需88日，自轉一圈則約59日。\n\n<br />\n\n物理特性:\n\n<br />\n\n水星的半徑約為0.39倍地球半徑，質量約為0.055倍地球質量，是太陽系最小的行星，主要成分由金屬及岩石組成，由密度推測應該具有相當大比例的金屬內核。\n\n<br />\n\n表面特徵:\n\n<br />\n\n水星表面與月球類似，充滿許多的撞擊坑與平原，顯示水星表面地質年份較古老，沒有明顯的地質活動。\n\n<br />\n\n磁場與大氣層:\n\n<br />\n\n水星具有微弱的磁場(強度大約為地球磁場的1%)，沒有大氣層，缺乏大氣層導致水星的日夜溫差劇烈，在白天的時候溫度可以高至700K，夜晚則冷至100K。\n\n<br />\n\n觀測:\n\n<br />\n\n水星的軌道位於地球之內，且非常接近太陽，因此在地球上很難觀測水星，只有凌晨或黃昏的短暫時間內可以在接近地平線處看到他，而由於水星的運行速度較快，古代的天文學家以Mercury為水星命名，代表神話中為眾神傳遞訊息的信使，頭戴羽翅帽，腳穿飛行鞋，行走如飛。\n\n<br />\n\n目前(2020年)只有水手10號、信使號進行過水星探索，算是類地行星中探測最少的，因為水星在地球內側，從地球發射探測器，由於太陽的重力，若想穩定的進入水星軌道反而需要減速，將需要大量的燃料而使得任務難度較高。\n\n<br />\n\n![Untitled](https://i.imgur.com/xE4FgR8.png)\n\n<br />\n\n(信使號所拍攝的水星，取自[https://solarsystem.nasa.gov/planets/mercury/galleries](https://solarsystem.nasa.gov/planets/mercury/galleries))	/assets/bg/default-image-438x438.gif	t	Qol-zwfjDv	4TsWgIrSqM
5	金星	2022-04-06	## 軌道特性:\n\n> 金星是太陽系由內往外數第二顆行星\n\n<br />\n\n軌道半長軸為0.72AU，在所有的行星之中，金星的軌道是最圓的(離心率0.0067)，繞行太陽一圈約225日，自轉速度非常慢，自轉一圈約243日，比一年還長!\n\n<br />\n\n金星的自轉方向也與眾不同，從地球的北極上方來看，大部分的行星自轉皆是逆時針(由西向東轉)，但金星是順時針轉，自轉軸傾角177°。\n\n<br />\n\n如此奇怪的自轉特性，尚未完全明白是如何產生的，推測可能是在太陽系早期時金星曾受到巨大的撞擊事件，或是由於金星濃厚的大氣層長期潮汐作用有關。\n\n<br />\n\n物理特性:\n\n<br />\n\n金星的半徑約為0.95倍地球半徑，質量約為0.82倍地球質量，在大小與質量上，皆與地球相似，推測內部結構也與地球一樣，由岩石與金屬組成，並有地核、地函、地殼的結構。\n\n<br />\n\n表面特徵:\n\n<br />\n\n金星的表面主要是由火山活動形成的，且較少古老的大型隕石坑，推測金星表面的年齡較年輕，可能在約3億年前有全球性的熔岩覆蓋，將舊有的撞擊坑抹去。\n\n<br />\n\n磁場與大氣層:\n\n<br />\n\n金星有著濃厚的大氣層，主要成分為二氧化碳(約佔96.5%)，表面的大氣壓力約為地球的92倍，濃厚的大氣層造成失控的溫室效應，使得金星表面為全太陽系最熱的行星(462℃/735K)。\n\n<br />\n\n金星沒有自身產生的磁場，但是隨著太陽風撞擊金星大氣層，在金星的電離層上方有一層很局部的誘發磁層，但是仍無法完全保護大氣層受到太陽風影響而逐漸逸散。\n\n<br />\n\n觀測:\n\n<br />\n\n在金星大氣層中有一層濃厚的硫酸雲覆蓋，因此無法用可見光直接看到金星的表面。\n\n<br />\n\n由於金星的軌道在地球內側，因此只有凌晨或黃昏的時候可以看到金星，在中國古代曾認為他是兩顆星─「啟明」在凌晨出現；「長庚」在黃昏出現。金星在夜空中的亮度非常亮，可達-4.9等，而隨著地球、金星、太陽的相對位置變化，透過望遠鏡也可看到如同月球一樣的盈虧變化。\n\n<br />\n\n![Untitled](https://i.imgur.com/sXBpVkD.png)\n\n<br />\n\n(金星，分別攝於2020/2/7、4/25、5/11)\n\n<br />\n\n![Untitled](https://i.imgur.com/cb5FmcX.png)\n\n<br />\n\n(水手10號所拍攝的金星，取自[https://solarsystem.nasa.gov/planets/venus/galleries](https://solarsystem.nasa.gov/planets/venus/galleries))	/assets/bg/default-image-438x438.gif	t	v3DnoIBOy2	4TsWgIrSqM
7	火星	2022-04-06	## 軌道特性:\n\n> 火星是太陽系由內往外數第四顆行星\n\n<br />\n\n軌道半長軸為1.5AU，繞行太陽一圈687日，自轉週期與轉軸傾角與地球非常類似，自轉一圈約1.026日(24小時40分)，自轉軸傾角25.19°，隨著太陽照射角度的變化，火星上也具有四季的交替。\n\n<br />\n\n物理特性:\n\n<br />\n\n火星的半徑約為0.53倍地球半徑，質量約為0.11倍地球質量，由岩石和金屬組成，推測內部結構也與地球一樣，有地核、地函、地殼的結構。\n\n<br />\n\n表面特徵:\n\n<br />\n\n火星表面具有豐富的地質樣貌，有早期形成的隕石撞擊坑、火山作用形成的大型火山、地殼拉伸移動產生的峽谷、早期液態水流動導致的侵蝕與沉積地形、風蝕及沙丘地形、南北極極冠的冰原，一般所看到火星紅色的地表是由於表面廣布著氧化鐵，在行星之中獨樹一格。\n\n<br />\n\n磁場與大氣層:\n\n<br />\n\n火星有著稀薄的大氣，表面大氣壓力約為地球的0.6%，主要成分為二氧化碳(約佔95%)，受到日照及季節的變化，火星大氣中的沙塵常被捲起，形成大範圍的塵暴。\n\n<br />\n\n火星沒有穩定的全球性磁場，但局部地殼具有被磁化的感應磁場，顯示火星在過去應該有全球性磁場，但後來磁場減弱、消失，推測可能就是因為少了磁場的保護，導致火星的大氣層被太陽風不斷的剝離，過去的火星應該有較厚的大氣，其溫室效應可讓表面溫度較高，使液態水存在於火星表面。\n\n<br />\n\n觀測:\n\n<br />\n\n火星特別的火紅色，古希臘人將其聯想為戰神(Mars)，中國則稱其為「熒惑」，取自顏色熒熒如火，並且位置與亮度不斷變化而使人困惑。\n\n<br />\n\n在地球上可以透過望遠鏡觀測到火星地表的一些明暗特徵，曾經有段時間被誤認為上面的深色線條為運河，意即猜測具有文明開墾的痕跡，但是當然到了近代的太空探測器，表明火星上並沒有智慧文明，不過火星與地球的相似性，以及水的存在，仍然使得人們對火星充滿興趣。\n\n<br />\n\n要觀察火星最佳的時機，為「火星衝」前後，表示太陽、地球、火星三者排成一直線，此時火星距離地球較近、較亮而容易觀測。\n\n<br />\n\n![979](https://i.imgur.com/0iIc0mx.jpg)\n\n<br />\n\n(火星，分別攝於2020/9/6、9/29、10/14、11/1、11/18，「衝」日為10/14，可看出當日火星的視直徑最大)\n\n<br />\n\n![980](https://i.imgur.com/Y4WH6uL.jpg)\n\n<br />\n\n(維京1號所拍攝的火星，取自[https://solarsystem.nasa.gov/planets/mars/galleries](https://solarsystem.nasa.gov/planets/mars/galleries))	/assets/bg/default-image-438x438.gif	t	K6Ip3emMKE	4TsWgIrSqM
8	月球	2022-04-06	## 簡述：\n\n> 月球，也稱為月亮，古稱太陰。\n\n<br />\n\n文學作品裡則有嬋娟、桂宮、廣寒宮等稱呼，是地球擁有的唯一一顆天然衛星，在太陽系的衛星當中排名第五大。月球的直徑約為地球的0.27倍，在所有衛星當中，月球相對於母行星的比例是最大的。\n\n<br />\n\n軌道特性：\n\n<br />\n\n月球和地球的平均距離約38萬4400公里，大約是地球直徑的30倍，這個距離足以塞下太陽系的八大行星。但受到潮汐效應的影響，目前月球逐漸遠離地球，每年約增加3.8公分。\n\n<br />\n\n![3515](https://i.imgur.com/7Qdqo7C.png)\n\n<br />\n\n(地球和月球的距離，取自[https://www.universetoday.com/115672/](https://www.universetoday.com/115672/))\n\n<br />\n\n月球公轉的軌道稱為白道，呈現橢圓形，和黃道面夾5.14度，自轉軸和黃道面的法線交角有1.54度。\n\n<br />\n\n![3516](https://i.imgur.com/DrhOGwg.png)\n\n<br />\n\n(地月系統示意圖，取自Earth-Moon.PNG: Earth-image from NASA; arrangement by brews_oharederivative work: Patcre, Public domain, via Wikimedia Commons)\n\n<br />\n\n物理特性：\n\n<br />\n\n月球的平均半徑約1737公里，質量約7.35×1022公斤，平均密度約3.346克/立方公分，表面重力約為地球的六分之一，其分層可分為地核、地函、地殼。核心半徑約350公里，可分為內外層，內層為固體，外層為液體，主要成分為鐵；地函主要由橄欖石、斜輝石等礦物所組成；地殼平均厚度約50公里，主要由斜長岩組成。\n\n<br />\n\n表面特徵：\n\n<br />\n\n由於月球的大氣層非常稀薄，幾近於真空的狀態，所以在月球上面不會有天氣變化、風化現象，遺留在月球表面的痕跡，例如隕石坑、腳印等，可以完整地保留下來。目前月球表面主要分成月海和隕石坑，月海是月球表面上相對較平整的區域，隕石坑則是由外來天體撞擊所形成的凹洞。\n\n<br />\n\n![3517](https://i.imgur.com/HXpRRWw.png)\n\n<br />\n\n(月球正面，可看到深色的月海及淺白色的隕石坑，取自Jay Tanner, CC BY-SA 3.0 , via Wikimedia Commons)\n\n<br />\n\n表面磁場：\n\n<br />\n\n現今月球的磁場非常薄弱，幾乎可以忽略。科學家認為，早期月球誕生的時候，內部的液態鐵可以流動產生全球性的磁場，但隨著時間過去，液態鐵逐漸變成固體，磁場強度逐漸減弱，到了現代，儘管月球仍然保有液態層核心，但不足以產生強大的磁場保護月球本身，月球也就無力抵擋來自外太空的高能輻射及隕石的撞擊。\n\n<br />\n\n曆法：\n\n<br />\n\n由於月球繞地球公轉具有周期性，因此古人根據月相的盈虧週期變化(朔望月)制定出曆法，稱為陰曆，例如伊斯蘭曆。陰曆從日期可知月相，但月分和季節無關，每30年中設11個閏年，閏年時，12月多一天，一年為355天。要注意的是，中國古代的曆法農曆，不是單純的陰曆，而是屬於陰陽合曆，因此不只從日期可知月相，也可從月分知道季節，每19年中置7個閏月，閏年時，一年共13個月，大約為383天至385天。\n\n<br />\n\n觀測：\n\n<br />\n\n從宇宙的尺度來看，月球可以說是非常靠近地球的。一般情況下用肉眼觀看，可發現月球具有不同的月相，同時也能分辨出月球表面具有深淺不一的顏色，而透過望遠鏡的觀察，更可以明顯觀察到月球表面的月海及隕石坑。當年伽利略便是透過望遠鏡觀察月球，發現月球並不是如人類所想的那般完美，說明天體也是有缺陷的，也開啟了後世觀測天文學的發展，帶動了天文學的革命進步。	/assets/bg/default-image-438x438.gif	t	jJvlV3dXRJ	4TsWgIrSqM
9	月球起源	2022-04-06	## 關於月球的起源\n\n> 主要有四種假說：同源說、捕獲說、分裂說、大碰撞說\n\n<br />\n\n根據對月球的組成與分布所做的調查，以大碰撞說最為有力。\n\n<br />\n\n同源說認為月球和地球是在同一場所、同一時期一起形成，也就是在早期的太陽系原始吸積盤上兩者一同誕生，只是該假說無法解釋地月系統的角動量，也無法解釋為何月球具有較小的核心(月球核心約半徑的17%，地球核心約半徑的55%)。\n\n<br />\n\n捕獲說認為月球其實來自於其他地方，但運行至地球附近時，剛好被地球的重力吸引而捕獲。但以月球相對於地球的大小來說，當月球經過地球附近時，很可能發生碰撞或是改變運行軌道而遠離地球，因此捕獲說很難獲得科學界的支持。\n\n<br />\n\n分裂說認為因為地球自轉的力量，一部分的物質由地球飛出，而在附近形成了月球。只是該假說和同源說相同，無法處理地月系統的角動量問題。\n\n<br />\n\n大碰撞說認為一顆體積近似火星的原始行星和地球相撞，碰撞後產生的碎片在地球周圍公轉，之後凝聚形成了月球。在太陽系演化早期，原始吸積盤上有原始行星誕生，這些行星透過彼此碰撞、吸收而成長，科學家認為這是行星演化過程中不可避免的。此學說支持的證據有：地球自轉和月球公轉方向相同、月球表面曾經為熔融狀態、月球含有體積較小的鐵核、觀察到其他行星系統發生類似的碰撞等等。\n\n<br />\n\n雖然大碰撞說是目前月球形成的最佳理論，但它還是存在著缺陷，也無法回答某些問題，例如為何月球表面仍然存在著揮發物質、同樣發生過碰撞的金星為何沒有衛星等。\n\n<br />\n\n![3518](https://i.imgur.com/IFW2xt0.png)\n\n<br />\n\n(月球起源的理論之一─大碰撞說，取自NASA/JPL-Caltech, Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	FCZ3-Gln0T	4TsWgIrSqM
45	約翰‧伽勒 Johann Galle	2022-04-06	## 科學家介紹\n\n> 德國天文學家，以發現海王星而聞名。\n\n<br />\n\n天王星被發現後，科學家很快就發現天王星的位置往往和預測值有所出入，似乎有受到另外一股力量的拉扯。1846年，法國數學家勒維耶透過數學計算，預測出另一顆行星的位置、軌道、大小，他拜託伽勒幫忙尋找，同年，伽勒根據勒維耶的資料，果然成功找到這一顆新行星，後續被命名為海王星。\n\n<br />\n\n除了海王星外，伽勒也研究彗星，並且將這些資料整理後出版。\n\n<br />\n\n![2987](https://i.imgur.com/shrDYGR.png)\n\n(約翰‧伽勒，Credit：Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	BAaLw7heRU	fGVkq0tONG
10	恆星月及朔望月	2022-04-06	## 月球是地球的衛星\n\n繞著地球公轉，本身也會自轉，方向為由西向東，從北極上方往下看，自轉及公轉均為逆時針轉動，只是月球已經被地球潮汐鎖定，所以其自轉和公轉同步，平均恆星月約27.3天，平均朔望月約29.5天。\n\n<br />\n\n恆星月和朔望月的定義如下：\n\n<br />\n\n恆星月：以遠方的一顆恆星為基準，月球完整地繞地球公轉一圈360度所需花費的時間定義為一個恆星月。\n\n<br />\n\n朔望月：當月相從朔(望)到下一次朔(望)所需花費的時間定義為一個朔望月。\n\n<br />\n\n由於地球本身也會繞著太陽公轉，一個月約公轉30度，所以在一個朔望月的週期當中，月球繞地球公轉約390度，因此平均朔望月的長度會比平均恆星月來得長。\n\n<br />\n\n![3519](https://i.imgur.com/tA4HRMD.png)\n\n<br />\n\n(恆星月及朔望月，取自網路)\n\n<br />\n\n根據月球所在位置的不同，從地球上面觀看月亮，會發現月亮呈現不同的樣貌，也就是具有不同的月相。根據月相，可以推測日期(農曆、陰曆)，也可以知道當時日地月三者之間的相對位置。\n\n<br />\n\n在地球上，月亮每天會東升西落，但如果位在月球上，由於月球本身同步自轉的關係，會發現地球似乎都固定在天空中的某一個位置，也就沒有所謂的「地出」和「地落」。但由於太陽依舊會升落，而隨著太陽的移動，在月球上便可看到不同的地相，地相的變化週期和月球上的晝夜更替週期相同，約為29.5天。	/assets/bg/default-image-438x438.gif	t	GnnUjgh3Xo	4TsWgIrSqM
11	月球天平動	2022-04-06	## 月球天平動\n\n> 從地表觀察月球，會發現月球似乎有個輕微、緩慢的振盪，此稱為月球的天平動。\n\n同步自轉的衛星相對於行星，多少都有不同程度的天平動，除此之外，天平動現象在其他行星，甚至太陽，也都可以發現到。\n\n<br />\n\n雖然月球被地球潮汐鎖定，使得其自轉週期同步於公轉週期，但因為天平動的影響，觀測者在不同的時間內可以看到些許不同的月球表面，這使得觀測者可以在地球上看到59%的月面，而非僅僅50%的月球正面。\n\n<br />\n\n月球天平動主要可分成兩大類：幾何天平動及物理天平動。幾何天平動是由於觀測位置與月球之間的幾何關係所造成；物理天平動則是月球本身擺動所造成的。\n\n<br />\n\n幾何天平動也稱為光學天平動，主要可分成四種形式：\n\n<br />\n\n**一、經度天平動**\n\n<br />\n\n由於月球繞地球公轉的軌道(白道)為橢圓形，因此月球位在不同的位置時也就具有不同的公轉速度，但因為月球的自轉速度是固定的，這也就導致月球的公轉速度有時候會超前、有時候則落後自轉速度，從地球上來看，便能額外觀察到月球左右方向(經度)的月面。\n\n**二、緯度天平動**\n\n<br />\n\n由於白道面和黃道面有5.14°的夾角，且月球自轉軸和黃道面的法線交角有1.54°，這些傾斜導致月球在南北方向(緯度)的振盪，因此觀測者能從地球上看到額外的上下方向(緯度)月面。\n\n**三、周日天平動**\n\n<br />\n\n周日天平動是由地球的自轉所造成的，當月球從東方升起，西方落下時，代表觀測者已隨著地球的自轉從西側轉至東側，因而能先多看見一些月球東側，然後再多看見一些月球西側。\n\n<br />\n\n**四、視差天平動**\n\n<br />\n\n這是由於在地表上不同的觀測位置所造成的效應，在南北兩極便可多觀察到月球南北兩極的部分區域。\n\n<br />\n\n**物理天平動**是屬於月球自身的擺動，由於月球本身並非是一個完美球體，它的三個慣性軸長度不等，加上月球公轉軌道也並非圓形，因此在地球引力的作用下，產生對平均位置的偏移。但由於物理天平動比幾何天平動的影響要小得多，所以基本上可以忽略不計。\n\n<br />\n\n![3520](https://i.imgur.com/nMlkKwg.png)\n\n<br />\n\n(月球天平動的變化，取自Tomruen, Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	k5LMpVj9PV	4TsWgIrSqM
13	月球兩大地形	2022-04-06	## 月球兩大地形\n\n> 從地表觀看月球，會發現月球上很明顯地分成明亮及暗黑的區域，剛好分別對應到月球上的隕石坑和月海。\n\n<br />\n\n月海是月球表面相對較為平坦的區域，如平原或低地，主要由玄武岩所組成，是古代火山爆發噴發出來的岩漿將窪地填滿後所形成的。之所以稱為海，是因為在早期的時候，觀測技術不如現在先進，無法清晰地分辨月球表面情況，觀測者依照對地球的了解，認為該地區較暗是因為反光率低所導致，推測應該是海洋。玄武岩中富含鐵元素，缺乏含水的礦物，且其分布並不均勻，在月球正面，月海面積約佔一半，但在月球背面，月海只佔2.5%。\n\n<br />\n\n月球表面看起來較亮的區域為隕石坑，主要由小行星或彗星撞擊而形成，大部分的隕石坑以歷史上著名的科學家、藝術家、哲學家等的名字命名。當一顆隕石撞擊月球表面時，撞擊時的動能會產生衝擊波並從撞擊點輻射擴散出去，撞擊點的月岩和隕石會因為高溫而熔化，逐漸形成一個坑。由於不同時期的隕石坑具有不同的特徵，因此透過分析隕石坑的外觀、組成、分布，可以推估其年齡。雖然月球上沒有大氣層及天氣作用，但因為暴露在太空中，月球表層容易受到宇宙射線、太陽輻射、太陽風粒子、微流星體的轟擊，因此隕石坑邊緣也會逐漸被軟化和磨損，此現象稱為太空風化。\n\n<br />\n\n![4520](https://i.imgur.com/tFLY4Zj.png)\n\n<br />\n\n(月球表面，取自Jay Tanner, CC BY-SA 3.0, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	xBy5dSKlX-	4TsWgIrSqM
40	第谷‧布拉赫 Tycho Brahe	2022-04-06	## 科學家介紹\n\n丹麥人，著名的天文學家、煉金術士，著名的天文學家[克卜勒](https://taea.tn.edu.tw/taea/astro_news/book_detail/44dee23a-480d-11eb-8ac9-8bd2bfe9ed25)為其助手。\n\n<br />\n\n第谷的宇宙觀可說是地心說及日心說的綜合體，他認為地球位於宇宙中心，太陽繞著地球作圓周運動，而其他天體則繞著太陽作圓周運動。儘管克卜勒努力勸說第谷接受日心說，但第谷始終不採納。\n\n<br />\n\n第谷最有名的成就便是其對火星的精準觀測，並且將觀測資料詳細地記錄下來，日後克卜勒根據這些數據，提出了著名的克卜勒三大定律，完美地解釋行星的公轉運動。\n\n<br />\n\n除了火星之外，第谷也研究過超新星(當時還沒有超新星的概念)及彗星。1572年，一顆非常耀眼的星星出現在仙后座，由於當時的主流天文學為亞里斯多德的地心說，該學說認為天體是完美的，因此大眾普遍認為這是一種大氣現象。但第谷發現到該天體的視差幾乎不變，因此認為它是一種位於地球外的天體，且該天體距離地球相當遙遠。第谷將此天體命名為新星(nova)，現在則將此類天體稱為超新星(supernova)。\n\n<br />\n\n同樣的，1577年出現的彗星也被認為是一種大氣現象，但第谷透過觀測，認為彗星的軌跡並非完美的圓形，而是被拉長的，同時彗星也位於地球之外，是宇宙中的另一種天體。\n\n<br />\n\n![988](https://i.imgur.com/YyURUmq.png)\n\n(第谷畫像，Credit：Eduard Ender (1822-1883), Public domain, via Wikimedia Commons)\n\n<br />\n\n![989](https://i.imgur.com/3yms8nA.png)\n\n(第谷的宇宙觀，Credit：Fastfission, Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	1bO8mFOhs8	fGVkq0tONG
44	奧本‧勒維耶 Urbain Le Verrier	2022-04-06	## 科學家介紹\n\n> 法國數學家、天文學家，以準確預測出海王星的位置而聞名。\n\n科學家在研究天王星的過程當中，發現天王星的軌道似乎有受到另外一股力量的拉扯而有所變動，也就是天文學上所稱的「攝動」影響，科學家們推測，應該有另外一顆未知行星的引力作用在干擾。\n\n<br />\n\n1846年，勒維耶透過數學計算，預測出這顆行星的位置、軌道、大小，並且請柏林天文臺的[約翰‧伽勒](https://taea.tn.edu.tw/astro_news/book_detail/d9d95b60-b917-11eb-a195-b2a72f3900e4)幫忙尋找。\n\n\n<br />\n\n同年9月23日，[伽勒](https://taea.tn.edu.tw/astro_news/book_detail/d9d95b60-b917-11eb-a195-b2a72f3900e4)根據勒維耶的計算，成功找到了太陽系中的第八顆行星，其位置和勒維耶的預言結果相差不到1°，後來以羅馬神話中的海神名字，將其命名為海王星。\n\n<br />\n\n海王星的發現也代表著牛頓力學的重大勝利，更使得牛頓力學被視為科學界的萬靈丹。1859年，勒維耶發表報告，說明[水星](https://taea.tn.edu.tw/astro_news/book_detail/8fa25692-3608-11eb-a08c-d33c5015ac94)的進動現象不能完全用牛頓力學和已知的行星攝動來解釋。\n\n<br />\n\n有了尋找海王星的成功經驗，科學家認為應該也是有一顆行星在干擾水星的運動，便將這顆未知行星命名為祝融星，並試著找出它。當然，這顆行星從未被找到，到了20世紀初，愛因斯坦提出廣義相對論後，人們發現利用廣義相對論能完美解釋水星的進動現象，便不再尋找祝融星。\n\n<br />\n\n1877年9月23日，勒維耶逝世，剛好和海王星的發現日期同一天，他的姓氏也被雕刻在艾菲爾鐵塔上，以紀念他對天文學界的貢獻。\n\n<br />\n\n![1319](https://i.imgur.com/skXOPgZ.png)\n\n(奧本‧勒維耶，Credit：User Magnus Manske on en.wikipedia, Public domain, via Wikimedia Commons)\n\n<br />\n\n![1330](https://i.imgur.com/qTjWLwa.png)\n\n(紀念海王星發現100周年的50法郎，正面)\n\n<br />\n\n![1329](https://i.imgur.com/yEcAJGz.png)\n\n(紀念海王星發現100周年的50法郎，背面)	/assets/bg/default-image-438x438.gif	t	UxgHfGFbjr	fGVkq0tONG
48	查爾斯‧梅西耶 Charles Messier	2022-04-06	## 科學家介紹\n\n> 法國人，著名的天文學家，以《梅西耶星團星雲表》而聞名於世。\n\n梅西耶在年輕的時候有遇到一些天文現象，這引起了他對天文學的興趣。1751年，他在法國海軍天文台擔任助手，開始記錄他的天文觀測結果；1760年，梅西耶接任法國海軍天文官的職務；1764年，梅西耶開始製作彗星及朦朧天體的列表；1774至1784年，梅西耶發表了《梅西耶星團星雲表》共三卷，總共包含103個天體，其中有些天體是他的助手皮埃爾‧梅尚所發現的。\n\n<br />\n\n現行的梅西耶天體共有110個，因為根據天文學家及歷史學家的考察，最後面7個天體應該也曾經被梅西耶或梅尚所觀測到，所以儘管它們並未被收錄在《梅西耶星團星雲表》中，天文學家仍然承認它們為梅西耶天體。\n\n<br />\n\n《梅西耶星團星雲表》包含五種深空天體：星系、球狀星團、疏散星團、行星狀星雲、瀰漫星雲，這些梅西耶天體除了是天文學家的研究目標外，也是業餘人士熱門的攝影標的。\n\n<br />\n\n![3118](https://i.imgur.com/jR8h5NJ.png)\n\n(查理斯‧梅西耶，Credit：Ansiaux (1729—1786), Public domain, via Wikimedia Commons)\n\n<br />\n\n![3119](https://i.imgur.com/3NoxPwB.png)\n\n(《梅西耶星團星雲表》第一卷，Credit：All data and text by Charles Messier, Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	KuWZRhYsAS	fGVkq0tONG
49	喬治‧勒梅特 Georges Lemaître	2022-04-06	## 科學家介紹\n\n> 比利時人，是神父、數學家、物理學家。\n\n首先提出大爆炸理論，認為宇宙正在膨脹，也估算出哈伯常數，這項理論後來也被哈伯的觀測所證實。\n\n<br />\n\n愛因斯坦提出廣義相對論後，許多學者根據愛因斯坦方程式推論出一些新的概念。1927年，勒梅特透過計算，得到愛因斯坦方程式的一個解，並由此指出宇宙處於膨脹的狀態，同時也建立星系退行速度與地球距離之間的關係，首次估算出哈伯常數，此關係後來被稱為「哈伯-勒梅特定律」。\n\n<br />\n\n1932年，勒梅特提出大爆炸(大霹靂)理論，認為若宇宙在膨脹，則它在反向時間上便會塌縮，此塌縮最後會形成一個尺寸非常小的原始原子，宇宙中所有的質量都集中在這個原始原子上，而時間和空間都是由此產生的。此理論後來被伽莫夫予以支持並加入相對論後，成為後來的熱大霹靂宇宙模型。1933年，勒梅特發表論文，認為在宇宙射線中，可能存在最初大霹靂遺留下來的痕跡，1965年，彭齊亞斯和威爾森測量到宇宙微波背景輻射，證實了當年勒梅特的猜想。\n\n<br />\n\n除了研究物理外，勒梅特也是一名教授，根據他指導過的學生的回憶，勒梅特為人可親，平易近人，課後也願意花時間和學生互動交流。\n\n<br />\n\n1966年，勒梅特過世，葬於自家的家族墓地中。\n\n<br />\n\n![3123](https://i.imgur.com/Rel67yh.png)\n\n(喬治‧勒梅特，Credit：Unknown authorUnknown author, Public domain, via Wikimedia Commons)\n\n<br />\n\n![3124](https://i.imgur.com/ZjVkrSb.png)\n\n(《原始原子的假設》，Credit：JoJan, CC BY 4.0, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	PlXnLsPLSJ	fGVkq0tONG
67	時的分類為何？	2022-04-06	## 曆法相關\n\n> 觀測天體的運行來定時刻有兩種——\n\n以太陽為準所得的時刻為太陽時，以恆星為準所得的時刻為恆星時，由於人類自古以來均以太陽時為作息時刻，因此太陽時在應用上又產生各種不同的時制。\n\n1. 視太陽時 - 古代以日晷測時所得的時刻。\n2. 平太陽時 - 由於視太陽時每日長短不一，為了便於使用，以全年視太陽時總和平均所得叫平均太陽時，簡稱平太陽時。\n\n```\n平太陽時依採用子午線之不同\n```\n\n### 又產生下列各種時：\n- 世界時─以格林維治子午線為準，行24小時制，主要為科學用途。\n- 標準時─以格林維治子午線為起點，每15度定1標準經線，分全球為24時區。\n- 政令時─夏令時或日光節約時，在夏季將標準時撥快1小時。\n- 地方平時─即本地平太陽時。	/assets/bg/default-image-438x438.gif	t	esc3CtCJZU	wI0aS3tQ0c
50	愛德溫‧哈伯 Edwin Hubble	2022-04-06	## 科學家介紹\n\n> 美國著名的天文學家，哈伯-勒梅特定律的建立者，被公認為星系天文學的創始人，世人尊其為星系天文學之父。\n\n在1924年以前，天文學界對於銀河系究竟是不是宇宙的全部，且觀測到的一些星雲究竟是不是位在銀河系內部的問題始終沒有確切的定論，為此甚至在1920年舉行沙普利-柯蒂斯辯論。\n\n<br />\n\n1924年，哈伯在仙女座大星系發現了一種稱為「造父變星」的天體，根據造父變星的亮度計算天體的距離後，確認仙女座大星系不是銀河系內部的成員，而是位在銀河系外部的天體系統─系外星系，這一結論不只解決了沙普利-柯蒂斯辯論，同時也揭開了宇宙學嶄新的一頁。1926年，哈伯根據星系外形，將星系予以分類，稱為哈伯序列(Hubble sequence)，也因為分類圖看起來很像音叉，所以又稱為哈伯音叉圖(Hubble tuning fork diagram)。\n\n<br />\n\n1927年，[勒梅特](https://taea.tn.edu.tw/astro_news/book_detail/392d88ce-c062-11eb-86a5-dfbb8c5718e9)根據計算，提出宇宙正在膨脹，並指出星系紅移可以用宇宙膨脹來解釋，星系紅移現象是[維斯托‧斯里弗](https://taea.tn.edu.tw/astro_news/book_detail/50564ebc-79d2-11ec-83ae-196db47df796)於1912年發現。\n\n<br />\n\n1929年，哈伯透過觀測，和助手米爾頓‧赫馬森針對遙遠星系的距離進行了大量的測量工作，同時結合斯里弗的星系紅移資料，發現距離越遠的星系，其紅移越大，代表其遠離的速度越高，證實了宇宙正在膨脹。\n\n<br />\n\n哈伯更進一步地發現，星系遠離的速率和星系距離的比值為一個定值，即為哈伯常數，兩者之間的關係後來被稱為哈伯定律，但事實上，[勒梅特](https://taea.tn.edu.tw/astro_news/book_detail/392d88ce-c062-11eb-86a5-dfbb8c5718e9)早先便已經估算出此數值，所以2018年國際天文聯合會表決通過，為表彰勒梅特的貢獻，將此定律更改為哈伯-勒梅特定律。\n\n<br />\n\n雖然哈伯30歲過後才從律師界正式轉入天文界，但他的貢獻卻是不容置疑的，因此哈伯太空望遠鏡便以他的名字命名，而這也是最為人所知的一架太空望遠鏡。\n\n<br />\n\n![3134](https://i.imgur.com/yIKDrXj.png)\n\n(愛德溫‧哈伯，Credit：Johan Hagemeyer (1884-1962), Public domain, via Wikimedia Commons)\n\n<br />\n\n![3135](https://i.imgur.com/yHDMj7Q.png)\n\n(哈伯太空望遠鏡，Credit：NASA, Public domain, via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	eI714gU5mp	fGVkq0tONG
51	維斯托‧斯里弗 Vesto Melvin Slipher	2022-04-06	## 科學家介紹\n\n> 美國天文學家，畢生都在羅威爾天文台工作。\n\n1912年，斯里弗首度在星系的譜線中發現了紅移；之後斯里弗便和其他科學家共同完成紅移的量測與確認。\n\n<br />\n\n雖然提到紅移，大家都會以為是[哈伯](https://taea.tn.edu.tw/astro_news/book_detail/3526fbb6-c2ab-11eb-8ffc-bc347f1faad0)發現的，但事實上，哈伯做的工作是天體距離的量測，而他之後把量測資料及斯里弗的紅移資料整合比對後，發現距離越遠的星系，其紅移越大，代表其遠離的速度越快，證實了宇宙正在膨脹，後來更發現，星系遠離的速率和距離之間存在一個固定的關係，後來被命名為哈伯─[勒梅特](https://taea.tn.edu.tw/astro_news/book_detail/392d88ce-c062-11eb-86a5-dfbb8c5718e9)定律。\n\n<br />\n\n![7699](https://i.imgur.com/3cMKrKK.png)\n\n(維斯托‧斯里弗，Credit：via Wikimedia Commons)	/assets/bg/default-image-438x438.gif	t	qPnL7ULtoJ	fGVkq0tONG
52	何謂曆法？其基本要素為何？	2022-04-06	## 曆法相關\n\n> 人類依據太陽、月球及地球運轉的週期——\n\n制定年、月、日等順應大自然時序及四季寒暑的法則，稱為曆法。\n\n```\n何謂曆法？其基本要素為何？\n```\n\n曆法的基本要素為日、月及年。地球自轉1周伴隨太陽的出沒，因此有晨昏晝夜的現象稱為1「日」，此為最基本的單位。\n\n<br />\n\n月球繞地球運行約29.5日的盈虧週期，吾人視為1「月」。\n\n<br />\n\n地球繞太陽公轉，由於赤道與公轉軌道呈約23.5度的傾斜角，因此產生春夏秋冬不同的季節變化。\n\n<br />\n\n人類觀測太陽出沒的方位與日影長短的變化，覺察此公轉週期約 365日餘，此時間單位為1「年」。	/assets/bg/default-image-438x438.gif	t	WEmhVBUbt5	wI0aS3tQ0c
53	曆有幾類？	2022-04-06	## 曆法相關\n\n> 人類依大自然的法則所定出的曆法不外乎3種：\n\n- 陽曆：僅注重太陽在天球上的視行，以地球公轉太陽1週的時間為曆年，亦稱為太陽曆，簡稱陽曆。古代陽曆有許多種，西元1582年教宗格勒哥里13世改革儒略曆後，所頒布的曆法稱格勒哥里曆（Gregorian calendar）。 我國採世界通用的格勒哥里曆為國家的曆法，故稱為國曆。\n- 陰曆：完全根據月球繞地球運行1週定為1個月，積12個月定為1年，未考慮配合四季寒暑變化，1年長度約354日左右，較太陽年約短11日左右，現今回教人士所使用之回曆即係此種純陰曆。\n- 陰陽合曆：是陽曆與陰曆並顧的曆法，農曆月份以月球週期為準，年的長度以太陽年為準，為使月份與季節寒暑相配合，因此有閏月的設計，此為中國固有之曆法，相對於國曆一般習稱之為舊曆，後來因農民大都喜依此曆進行農事，故稱它為農曆。	/assets/bg/default-image-438x438.gif	t	3oh6dyHUnr	wI0aS3tQ0c
54	陽曆大小月為何分佈紊亂？	2022-04-06	## 曆法相關\n\n> 陽曆月份大小的分佈，是人定分配的結果，與月球圓缺無關。\n\n當古羅馬儒略凱撒（Julius Caesar）於西元前46年，依天文家索西琴（Sosigenes）建議修訂古羅馬曆而制定儒略曆時，將1年分為12個月，規定單數月為31日，雙數月為30日，而平年時2月是29日，閏年是30日。\n\n<br />\n\n至西元前8年羅馬議會將8月改成奧古斯都皇帝（Augustus Caesar）之名，稱為August，同時將8月改為大月而成31日，使它和紀念凱撒（Julius Caesar）的7月（July）日數相同，以顯示他和凱撒的功業同等偉大。\n\n<br />\n\n而8月後的大小月全都反過來，即將9月和11月改為30日，而10月和12月則改為31日，8月所增的1天由2月裡扣減，因此2月於平年時為28日，閏年時才有29日。此大小月安排至改革成格勒哥里曆時仍然沿用，直至今日。	/assets/bg/default-image-438x438.gif	t	T13C1R_y6o	wI0aS3tQ0c
55	陽曆為何有閏年的安排？有何規律性？	2022-04-06	## 曆法相關\n\n> 陽曆訂地球繞太陽公轉1周為1年，全年合計365日，稱為平年（平均太陽年的簡稱）。\n\n但實際上地球繞日公轉1周平均為365.2422日，因此每積4年就會多出約0.9688日，為了使曆法能配合天象，規定當西元年數是4的倍數時，2月就增加1天成29天，該年稱為閏年。\n\n```\n又因此法每4年又會多加0.03日左右，故再規定每400年需減3天\n```\n\n當西元年數逢百年的倍數時，必需是400的倍數才是閏年，如1700、1800、1900都是平年，只有2000年能被400整除才是閏年。	/assets/bg/default-image-438x438.gif	t	MW9VfOebd2	wI0aS3tQ0c
56	陰曆的月份為何稱為朔望月，而且有大小月之分？	2022-04-06	## 曆法相關\n\n> 月球因本身不發光，我們所見的月光是經月面反射的太陽光——\n\n由於月球繞地球公轉，當太陽和月球在天球上經度相同時，月球的背光面向著地球所以看不到月光，叫做合朔。\n\n<br />\n\n定為陰曆月的開始，當月球繞到距日180度時，這時受光面全部對著地球，我們可見一輪明月，叫做望。\n\n<br />\n\n月球由朔至望再回到朔平均約29.5日稱為朔望月，此為陰曆月的長度。\n\n<br />\n\n由於朔望月長度不是整數，所以這次合朔到下一次合朔期間在日期上有時跨29日有時跨30日，因此陰曆有大小月之分，大月30天，小月29天，又大小月的排列並不固定完全視相鄰兩次合朔時刻而定，有時可能連續3個大月或連續2個小月。\n\n```\n較罕見的如民國17年（西元1928年）農曆九月至十二月是連續4個大月。\n```	/assets/bg/default-image-438x438.gif	t	BdxXKaPxJt	wI0aS3tQ0c
60	農曆置閏的原則為何？	2022-04-06	## 曆法相關\n\n> 目前的農曆置閏之原則為：\n\n- 節氣冬至所在之農曆月須為農曆十一月。\n- 從農曆十一月開始到下一個農曆十一月之間(包括第1個十一月但不計第2個十一月)，若有13個農曆月，取其中先出現不包含中氣的農曆月定為農曆閏月。\n- 閏月採用在其前1個農曆月的名稱前加「閏」字的方法表示。\n\n<br />\n\n農曆置閏是為了使四季與實際氣候配合，每19年需加7個閏月，在農曆月裡通常包含1個節氣和1個中氣，如果僅出現節氣而無中氣時，曆法上就規定這個月為閏月，作為前月的附屬月，例如民國109年（西元2020年）國曆5月23日至6月20日的這個朔望月只有「芒種」節氣，而沒有中氣，因此定為閏月，又因前月是四月，故該月定為閏四月。\n\n<br />\n\n而朔望月中有中氣而無節氣時，是不予置閏的。\n\n<br />\n\n### 24 節氣中的中氣分別為：\n冬至、大寒、雨水、春分、穀雨、小滿、夏至、大暑、處暑、秋分、霜降、小雪等12個。	/assets/bg/default-image-438x438.gif	t	YdvnYZyXQf	wI0aS3tQ0c
61	農曆之閏月在全年中分佈為何？	2022-04-06	## 曆法相關\n\n> 農曆置閏的安排，主要是用以控制陰曆月在年中的位置——\n\n使它能配合1年四季寒暑的變化。下圖是西元1849年至2050年農曆閏月的分布圖。\n\n<br />\n\n<img src=https://i.imgur.com/zWF6TJB.png style=max-width: 100%>	/assets/bg/default-image-438x438.gif	t	djDS8wqlxw	wI0aS3tQ0c
62	中國古代歲首分那幾種?各以何為起點？	2022-04-06	## 曆法相關\n\n> 古代歲首分天文歲首及民用（或稱政治）歲首——\n\n<br />\n\n天文歲首以冬至為1歲的起點，係因冬至時太陽方位最南，其時日影最長易於測量之故，以子、丑、寅……戌、亥等12地支為序，代表1年中各月稱12建月，含冬至的月份定為子月，以下依序類推。而政治歲首以月朔為準，政治上採正月朔旦（即正月初一日）為政治歲首，齊一政治步調，以便統御臣民，\n\n<br />\n\n至於那個月是正月，自漢武帝太初元年（西元前104年）改曆以來，至今大都採用夏代的建寅制，即取冬至起的第3個月為正月，由於寅月通常含有立春及雨水兩個節氣，又當農曆年有閏月時立春會在初一之前，故習慣上我們取雨水前的朔日（初一）為正朔，\n\n<br />\n\n但仍有例外發生，例如民國73年 （西元1984年）農曆有閏月，該年出現兩個立春兩個雨水（即雙春雙雨水），導致民國74年（西元1985年）農曆正朔位於雨水之後，不過此種例外情形甚少，就近年查證，僅咸豐元年（西元1851年）曾出現過——\n\n```\n兩者前後相距長達一百三十多年。\n```	/assets/bg/default-image-438x438.gif	t	OTrIZ_FQcT	wI0aS3tQ0c
63	為什麼清明節的日期會變動？	2022-04-06	## 曆法相關\n\n> 由於1個回歸年（由春分點到春分點）的實際長度為\n\n```\n365日5時48分45秒\n```\n\n但現行四年一閏的曆法平均1年定為365日6時，兩者每年大約相差11分15秒，因此節氣的時刻每年會提前11分15秒，亦即約128年會提前1天，不過由於曆法規定凡遇上不能被400整除的世紀年如1700、1800、1900、2100等，該年不閏，2月仍為28日，因此節氣日期每100年會拉回1天成原來日期，不過在未經不閏的世紀年之前，有的節氣日期會提前1天。\n\n<br />\n\n清明節的日期是以節氣清明為準。\n\n<br />\n\n### 出現日期依統計結果顯示如下表：\n\n<br />\n\n#### 清明節日期\n\n| 起訖年份 | 清明節日期(4年1次巡迴)  |\n|-------------|-------------------------|\n| 1912年~1943年 | 4月5日(連續3年) + 4月6日(1年)   |\n| 1944年~1975年 | 4月5日(固定)                |\n| 1976年~2007年 | 4月4日(1年) + 4月5日(連續3年)   |\n| 2008年~2039年 | 4月4日(連續2年) + 4月5日(連續2年) |\n| 2040年~2071年 | 4月4日(連續3年) + 4月5日(1年)   |\n| 2072年~2099年 | 4月4日(固定)                |	/assets/bg/default-image-438x438.gif	t	XycRZ48pQZ	wI0aS3tQ0c
64	星期次序是如何排列的？	2022-04-06	## 曆法相關\n\n> 我們知道每7日1週的週期叫做星期——\n\n這種週期據說源於古巴比倫時代，是以日月五星等七曜配合於7日而成，七曜的次序，依埃及托勒密時代的宇宙觀，以為地球為宇宙的中心。\n\n<br />\n\n### 當時認為\n\n日月五星對地球的距離由遠而近依序為：\n\n```\n土、木、火、日、金、水、月。\n```\n\n當初七曜是配合於1日的24小時以用於占星術上，從土曜開始各曜各主1小時，依序排列24小時後再連接於次日，這樣繼續不斷，直到代表每日首時的各曜都排列出來。\n\n<br />\n\n它們分別為土、日、月、火、水、木、金的次序，又以日曜為主日，形成今日的日、月、火、水、木、金、土等七曜的星期次序，後來為求更簡單明瞭，演變為星期日、星期一……星期六的名稱。	/assets/bg/default-image-438x438.gif	t	d-TbzDYRqq	wI0aS3tQ0c
65	何謂儒略週期（Julian Period）？	2022-04-06	## 曆法相關\n\n> 由於古代各國所用的曆法繁雜不同且屢有更改——\n\n在推算兩件史事間相距日數或某歷史事件距今日數，以及各國史日之相互比較都相當的困難，西元1582年法國曆法家史伽利日（J.J.Scaliger）創立1種獨立的記日週期。\n\n<br />\n\n以西元前4713年羅馬儒略曆法的1月1日正午為週期的開始，全週期共7,980年，可以包括有史以來的年代及未來的千餘年，其不斷的日序定名為儒略週日，這是1種長週期的記日系統，現代歷史家及天文家均普遍用之。\n\n<br />\n\n儒略週期之訂定係根據1年以365.25日為基礎，並以陽曆日期與星期相會的28年週期，陽曆與陰曆19年相會週期，以及羅馬每15年訂定財產價值以備課稅之週期，3者相乘得7,980年的時間長度定為一個儒略週期，並向上推至西元前4713年1月1日為此3者同時開始的1天，定為1週之元。	/assets/bg/default-image-438x438.gif	t	smTRO5IaJy	wI0aS3tQ0c
66	何謂干支週期？	2022-04-06	## 曆法相關\n\n> 干支週期又稱甲子週期——\n\n中國古代曆法中將干支週期用於紀日，也用於紀年、紀月、紀時。\n\n<br />\n\n以10個天干的甲、乙、丙、丁、戊、己、庚、辛、壬、癸，和12個地支的子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥。天干在前地支在後兩兩依序互相配合，成為60干支。（甲子、乙酉、……甲戌、乙亥、……癸亥）\n\n<br />\n\n如干支紀日法，把60個干支配合在日子上，每日1名循環不斷，由甲骨文研究發現，自殷代以來已有完整的干支紀日系統，計有三千餘年不斷的歷史，是世界上最悠久的紀日法。干支在歷史家考證年、月、日上，佔有很重要的地位，因此中國古曆，亦稱為陰陽甲子三合曆。	/assets/bg/default-image-438x438.gif	t	R-UIzyvwho	wI0aS3tQ0c
68	何謂時差（equation of time）？	2022-04-06	## 曆法相關\n\n> 由於視太陽時每日長短不一，古代以日晷或漏壺計時尚能相符。\n\n但鐘錶發明以後，計時精密度大增，視太陽時不能配合鐘錶使用，天文家取視太陽時之1年時間而平均之，稱為平均太陽時（平太陽時）。\n\n<br />\n\n，而視太陽時與平太陽時每日相差數值稱為時差，由下圖時差曲線可以發現時差每日皆不同，例如11月初，時差約為負16分，表示視太陽時比平太陽時快16分。\n\n<br />\n\n但是，1年中有4次視太陽時與平太陽時相合的日子。時差之值雖然每年不同，但變化極小，幾乎每年通用，詳細數值可於天文年曆中查得。\n\n<br />\n\n<img src=https://i.imgur.com/uG0PHok.png style=max-width: 100%; />	/assets/bg/default-image-438x438.gif	t	y-CfDIwGgh	wI0aS3tQ0c
69	何謂日晷（sundial）?可分那幾類？	2022-04-06	## 曆法相關\n\n> 日晷又名日規，晷字就是影的意思，是古代測量日影方位角以定時刻的1種工具。\n\n最原始的日晷只是在地面上直立一支8尺的竿子，至周朝已改進為圭表，圭是平置在地面上的1支玉石所製的尺，表是直立地面的1支8尺木竿，到漢代改用銅表。\n\n<br />\n\n日晷按其架構形式，大體上可分為赤道日晷、地平日晷及垂直日晷等。\n\n<br />\n\n- 赤道日晷其圭盤與地球赤道面平行，圭表通過圭盤中心垂直於圭盤，圭表與地軸平行，頂端指向北極。\n- 地平日晷以立於水平面上1塊三角斜板為圭表，圭表對準南北方位，圭盤可為半圓形，圭表斜邊對圭盤的傾角為當地緯度，此種日晷製造容易，適合中緯度地區使用，比較普遍。\n- 垂直日晷係安置在建築物的牆壁上，牆壁與地平面垂直，而圭盤平置或繪於牆面，因牆壁朝向方位不同，所以有正南、正北、朝東、朝西或偏向等不同的垂直日晷，其圭表安置的方式依日晷的不同而異。\n\n<br />\n\n赤道及地平日晷分別如附圖所示，其中φ代表當地的緯度。\n\n<br />\n\n<img src=https://i.imgur.com/CdSEEWg.png style=max-width: 100% />	/assets/bg/default-image-438x438.gif	t	LI9UP6oAsN	wI0aS3tQ0c
70	世界時區如何劃分？	2022-04-06	## 曆法相關\n\n地球上各地方晝夜循環不息，以英國格林維治地方的子午線為標準時刻的世界時，不適合世界各地民眾的日夜起居作息時間，西元1884年，在美國華盛頓召開的國際性時間會議中決議，全世界按統一標準劃分時區，實行分區計時。\n\n> 這種時間稱為標準時，它以格林維治經線為0度作標準\n\n把西經7.5度到東經7.5度均定為零時區，由零時區分別向東與向西每隔15個經度劃為1個時區，東西各有12個時區，東12區與西12區重合，此區有1條國際換日線，作為國際日期的變換，全球合計共有24個標準時區，同1時區內使用同1時刻，每向東過1時區則鐘錶撥快1小時，向西則撥慢1小時。\n\n<br />\n\n不過時區界線原則上雖按上述方式劃分，但為方便實施避免施政困擾，世界各國往往加以變通，取政區界線或自然界線來劃分時區，臺灣在地理位置上屬於東8區。\n\n```\n各國時區範圍常會因政體變遷而有變化，\n可前往美國海軍天文臺網頁參考最新時區圖。\n```	/assets/bg/default-image-438x438.gif	t	wSEryIespu	wI0aS3tQ0c
71	何謂歲差？	2022-04-06	## 曆法相關\n\n> 由於地球自轉速率頗高，因此赤道直徑較兩極直徑多43公里左右，故地球呈扁球狀。\n\n當地球繞太陽公轉的過程中，受到日、月等天體引力的影響，造成地軸與軌道面呈約66.5度的傾斜，亦使得自轉軸在空間中作圓錐形的運動，如同旋轉中陀螺的旋轉軸所做的運動一般，地軸依逆時針方向繞黃道軸轉圈。\n\n<br />\n\n交角為約23.5度，繞1圈週期約2萬5千8百年，於是天球赤道與黃道的交點(春分點)每年會向西退行約50.26角秒，地球在公轉軌道上運行此段距離約需20分鐘，故回歸年(以春分點為準)較地球實際繞太陽1周360度的時間短約20分鐘左右，是為歲差。	/assets/bg/default-image-438x438.gif	t	56NmFyx0U3	wI0aS3tQ0c
72	伽利略自由落體思想實驗	2022-04-06	## 亞里斯多德認為在自由落體的狀態下——\n\n> 物體重量越重，落下的速度越快，但伽利略思考之後，認為這說法是錯誤的。\n\n假設有一顆鉛球和一顆乒乓球，用細繩綁在一起，當它們同時下落時，如果亞里斯多德的推論是正確的。\n\n<br />\n\n那麼鉛球就會落得比較快，而乒乓球因為落得比較慢，會施加一個阻力給鉛球，使得鉛球減速，因此整體的下落速度應該會介於鉛球和乒乓球下落速度之間。\n\n<br />\n\n然而，如果把兩顆球看成一個整體，則總重量大於鉛球，那麼它的下落速度應該比鉛球來得快。\n\n<br />\n\n由於這兩個推論互相矛盾，因此亞里斯多德的理論是錯的，兩顆球應該會同時落地，不論它們的質量是否相同。	/assets/bg/default-image-438x438.gif	t	t4YzhLCzhg	TXoGaQ-iE0
73	伽利略斜面運動實驗	2022-04-06	## 亞里斯多德認為——\n\n物體若要移動，便要有外力的提供，若外力消失，則物體也將會靜止。\n\n<br />\n\n但伽利略設計了一個斜面運動實驗，透過實驗，推翻了亞里斯多德的看法。\n\n<br />\n\n伽利略設計了一個V字形滑軌，表面非常光滑，幾乎可以忽略掉摩擦力。\n\n<br />\n\n伽利略發現，當小球從左上方往右下方滑落時，其速度會越來越快，但往右上方上升的時候，速度會越來越慢，而最後靜止的地方，其高度會和一開始的高度相同。\n\n<br />\n\n如果調低右側滑軌的斜率，小球仍然會滾到相同的高度，同時水平移動距離也更長。\n\n> 因此若將右側滑軌斜率逐漸調低並降至水平，則根據前面的經驗，如果沒有摩擦力的影響，則小球將會一直滾下去，保持等速度運動。\n\n在任何實驗當中，摩擦力都無法完全去除，所以任何真實的實驗都無法完美地驗證慣性定理，這也是為什麼古人會覺得，物體在不受力的狀態下，最終必定會靜止的原因。	/assets/bg/default-image-438x438.gif	t	I4XppDkRLk	TXoGaQ-iE0
\.


--
-- TOC entry 3480 (class 0 OID 17150)
-- Dependencies: 229
-- Data for Name: stargazing_list; Type: TABLE DATA; Schema: public; Owner: ctsb
--

COPY public.stargazing_list (stargazing_orderid, stargazing_title, stargazing_latitude, stargazing_longitude, stargazing_image, stargazing_description, stargazing_address, published, "stargazingNanoId") FROM stdin;
10	台東：都蘭觀海公園	22.872918933863400	121.234871435978460	/img/mark-0010.jpg	都蘭觀海公園位於臺11線旁，園區內有兩條對外道路，可區分通道管控車輛通行，而且園區停車場位於觀星草原平台的下方，所以不用擔心車燈光害影響觀星，為我們提供最高品質的星空美景。	臺東縣東河鄉都蘭61號	t	k2ZgjOhxtu
9	台東：關山親水公園	23.040162889616862	121.173931812783850	/img/mark-0009.jpg	位於海岸山脈與中央山脈縱谷間的關山親水公園，地理位置清淨優雅，是親子旅遊、戲水與騎單車的好去處，白天能眺望關山鎮無邊際的田園風光，而夜間則能抬頭仰望繁星點點的絕美風景。	臺東縣關山鎮隆盛路1號	t	V4lNz6GzoD
6	綠島：帆船鼻大草原	22.636130832588435	121.508277581345030	/img/mark-0006.jpg	位於台灣本島外的綠島，相較於都市的光害少了許多，尤其是帆船鼻大草原，站在景觀台上擁抱夜空的點點繁星，實在是太幸福啦～	臺東縣綠島鄉東南角	t	ixyvPYOOKf
5	台東：大武濱海公園	22.359312118429415	120.907571995493700	/img/mark-0005.jpg	沿著海岸線，可見群星閃爍著，大武濱海公園的星群屬於三等星，雖然沒有一等星的星光閃爍，但可以享受躺在海灘旁細數星星的無敵浪漫！	臺東縣大武鄉大武濱海公園	t	SMeErF9a1o
4	台東：長濱金剛大道	23.329304670426000	121.440732861119940	/img/mark-0004.jpg	繁星就像是從銀河偷溜了出來，運氣好時可以在金剛大道觀看銀河橫跨夜空的美，只要仰望臺東的天空，就能看見令人屏息的滿天星斗，讓人讚嘆大自然的不可思議啊～	臺東縣長濱鄉東13鄉道(長光產業道路)	t	FORWeEO8ue
3	台東：加路蘭遊憩區	22.807952816240450	121.196506388373280	/img/mark-0003.jpg	加路蘭遊憩區是台東人最美星空的推薦！大片草坪上有特殊的藝術造景，怎麼拍都美！還可以聽著海浪聲，仰望繁點的群星，超療癒啊～	臺東縣臺東市富岡漁港往北走1公里	t	VixAMQykgQ
1	台東：三仙台風景區	23.123308488498190	121.406877745775030	/img/mark-0001.jpg	海浪造型的三仙台，是台東地標，來到觀星時節時，有機會清晰地看見銀河系美景，碧藍大海呼應滿天繁星的紫藍色，有種奇幻之美，快來捕捉這絕美的時刻！	臺東縣成功鎮三仙里基翬路74號	t	tEcOhffXkU
8	台東：池上大坡池	23.116984445118370	121.225358376797130	/img/mark-0008.jpg	大坡池白天是花東縱谷知名的景點，不少人會選擇在當地騎單車、賞夏荷、遊竹筏趕送美麗樸素的景色。不過大坡池的夜景也讓人驚艷，天氣好便能看見滿天的星斗倒映於水面中，是賞星必去景點！	臺東縣池上鄉(臺9線322K東側轉入)	t	OQujGZV8EB
7	蘭嶼：蘭嶼氣象站	22.037406340161123	121.558645976448530	/img/mark-0007.jpg	蘭嶼有台灣最美小島封號，自然原始，讓這裡成了觀星最美小島！置高點的蘭嶼氣象站，是獨占山景及星空的絕美地方，天氣好時，就像是銀河系覆蓋了整個島嶼，哪怕只是一秒，都讓人美到捨不得眨眼～	臺東縣蘭嶼鄉紅頭村2號	t	NEZ0ItaA4T
13	台東：富源景觀平台	22.828574143383403	121.153070856538190	/img/mark-0013.jpg	富源景觀平台視野遼闊，可以360度觀景，一邊能眺望都蘭山與綠島，而另一邊則可以看見卑南溪、小黃山、利吉惡地等獨特地理景觀，把東海岸景緻盡收眼底。開闊的視野是觀星的絕佳景點。	臺東縣卑南鄉富源197縣道56公里處	t	0grbfQ4Ylr
2	台東：南田觀景台	22.270049870794672	120.889036776450980	/img/mark-0002.jpg	透過專業攝影的快門，清楚地看見星星移動的軌跡，讓人就像是穿越時空般浪漫，簡直就像走進璀璨繁星的無敵星星隧道～	臺東縣大武鄉南田	t	DtVJG4o7ea
11	台東：鹿野高台高眺亭	22.917382768822500	121.122730288101450	/img/mark-0011.jpg	鹿野高台為於花東縱谷南段，而鹿野高台也是熱氣球的舉辦的，吸引各地旅客前往朝聖。也因為地勢高，可以俯瞰鹿野溪與卑南溪的匯流口，視野相當開闊，幾乎無光害，是絕佳的觀星地點。	台東縣鹿野鄉高台路42巷84號	t	CIt_2i2OHc
12	台東：金針山湛藍若洗觀景平台	22.626562086369855	120.976158747681860	/img/mark-0012.jpg	位於太麻里的金針山是著名的賞花勝地，四季造訪皆能觀賞到滿山遍野不同的花朵盛開美景。除了白天可以賞花看海景外，夜晚也可欣賞星空夜景與月光海色，美不勝收的景色一生一定要去一次。	台東縣太麻里鄉大王村	t	aWaK30Ie6w
\.


--
-- TOC entry 3482 (class 0 OID 17157)
-- Dependencies: 231
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ctsb
--

COPY public.users (orderid, name, email, password, "nanoId") FROM stdin;
1	allen	a131381568@gmail.com	$2b$04$ov0eEyyUSbuZTJ6hAW0vTOrBGaPaC2rXAdMzC9.jEppTkY9FmWyZO	hOa8sdxhJT
2	kevin	kevin@test.com	$2b$04$uy73IdY9HVZrIENuLwZ3k./0azDvlChLyY1ht/73N4YfEZntgChbe	VpvqzNuLaH
\.


--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 218
-- Name: about_info_about_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ctsb
--

SELECT pg_catalog.setval('public.about_info_about_id_seq', 1, false);


--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 220
-- Name: facilities_list_facilities_orderid_seq; Type: SEQUENCE SET; Schema: public; Owner: ctsb
--

SELECT pg_catalog.setval('public.facilities_list_facilities_orderid_seq', 50, true);


--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 222
-- Name: observatories_list_observatory_orderid_seq; Type: SEQUENCE SET; Schema: public; Owner: ctsb
--

SELECT pg_catalog.setval('public.observatories_list_observatory_orderid_seq', 23, true);


--
-- TOC entry 3504 (class 0 OID 0)
-- Dependencies: 224
-- Name: page_info_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ctsb
--

SELECT pg_catalog.setval('public.page_info_page_id_seq', 1, false);


--
-- TOC entry 3505 (class 0 OID 0)
-- Dependencies: 226
-- Name: post_categories_post_category_orderid_seq; Type: SEQUENCE SET; Schema: public; Owner: ctsb
--

SELECT pg_catalog.setval('public.post_categories_post_category_orderid_seq', 33, true);


--
-- TOC entry 3506 (class 0 OID 0)
-- Dependencies: 228
-- Name: science_orderid_seq; Type: SEQUENCE SET; Schema: public; Owner: ctsb
--

SELECT pg_catalog.setval('public.science_orderid_seq', 119, true);


--
-- TOC entry 3507 (class 0 OID 0)
-- Dependencies: 230
-- Name: stargazing_list_stargazing_orderid_seq; Type: SEQUENCE SET; Schema: public; Owner: ctsb
--

SELECT pg_catalog.setval('public.stargazing_list_stargazing_orderid_seq', 25, true);


--
-- TOC entry 3508 (class 0 OID 0)
-- Dependencies: 232
-- Name: users_orderid_seq; Type: SEQUENCE SET; Schema: public; Owner: ctsb
--

SELECT pg_catalog.setval('public.users_orderid_seq', 14, true);


--
-- TOC entry 3298 (class 2606 OID 17054)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3300 (class 2606 OID 17189)
-- Name: about_info about_info_pkey; Type: CONSTRAINT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.about_info
    ADD CONSTRAINT about_info_pkey PRIMARY KEY (about_id);


--
-- TOC entry 3303 (class 2606 OID 17191)
-- Name: facilities_list facilities_list_pkey; Type: CONSTRAINT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.facilities_list
    ADD CONSTRAINT facilities_list_pkey PRIMARY KEY (facilities_orderid);


--
-- TOC entry 3306 (class 2606 OID 17193)
-- Name: observatories_list observatories_list_pkey; Type: CONSTRAINT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.observatories_list
    ADD CONSTRAINT observatories_list_pkey PRIMARY KEY (observatory_orderid);


--
-- TOC entry 3309 (class 2606 OID 17195)
-- Name: page_info page_info_pkey; Type: CONSTRAINT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.page_info
    ADD CONSTRAINT page_info_pkey PRIMARY KEY (page_id);


--
-- TOC entry 3312 (class 2606 OID 17197)
-- Name: post_categories post_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.post_categories
    ADD CONSTRAINT post_categories_pkey PRIMARY KEY (post_category_orderid);


--
-- TOC entry 3315 (class 2606 OID 17199)
-- Name: science science_pkey; Type: CONSTRAINT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.science
    ADD CONSTRAINT science_pkey PRIMARY KEY (orderid);


--
-- TOC entry 3319 (class 2606 OID 17201)
-- Name: stargazing_list stargazing_list_pkey; Type: CONSTRAINT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.stargazing_list
    ADD CONSTRAINT stargazing_list_pkey PRIMARY KEY (stargazing_orderid);


--
-- TOC entry 3323 (class 2606 OID 17203)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ctsb
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (orderid);


--
-- TOC entry 3301 (class 1259 OID 17204)
-- Name: facilities_list_facilitiesNanoId_key; Type: INDEX; Schema: public; Owner: ctsb
--

CREATE UNIQUE INDEX "facilities_list_facilitiesNanoId_key" ON public.facilities_list USING btree ("facilitiesNanoId");


--
-- TOC entry 3304 (class 1259 OID 17205)
-- Name: observatories_list_observatoryNanoId_key; Type: INDEX; Schema: public; Owner: ctsb
--

CREATE UNIQUE INDEX "observatories_list_observatoryNanoId_key" ON public.observatories_list USING btree ("observatoryNanoId");


--
-- TOC entry 3307 (class 1259 OID 17206)
-- Name: page_info_pageNanoId_key; Type: INDEX; Schema: public; Owner: ctsb
--

CREATE UNIQUE INDEX "page_info_pageNanoId_key" ON public.page_info USING btree ("pageNanoId");


--
-- TOC entry 3313 (class 1259 OID 17207)
-- Name: post_categories_post_category_nanoid_key; Type: INDEX; Schema: public; Owner: ctsb
--

CREATE UNIQUE INDEX post_categories_post_category_nanoid_key ON public.post_categories USING btree (post_category_nanoid);


--
-- TOC entry 3316 (class 1259 OID 17208)
-- Name: science_postNanoId_key; Type: INDEX; Schema: public; Owner: ctsb
--

CREATE UNIQUE INDEX "science_postNanoId_key" ON public.science USING btree ("postNanoId");


--
-- TOC entry 3317 (class 1259 OID 17209)
-- Name: science_post_category_nanoid_idx; Type: INDEX; Schema: public; Owner: ctsb
--

CREATE INDEX science_post_category_nanoid_idx ON public.science USING btree (post_category_nanoid);


--
-- TOC entry 3320 (class 1259 OID 17210)
-- Name: stargazing_list_stargazingNanoId_key; Type: INDEX; Schema: public; Owner: ctsb
--

CREATE UNIQUE INDEX "stargazing_list_stargazingNanoId_key" ON public.stargazing_list USING btree ("stargazingNanoId");


--
-- TOC entry 3310 (class 1259 OID 17211)
-- Name: unique_page_id; Type: INDEX; Schema: public; Owner: ctsb
--

CREATE UNIQUE INDEX unique_page_id ON public.page_info USING btree (page_id);


--
-- TOC entry 3321 (class 1259 OID 17212)
-- Name: users_nanoId_key; Type: INDEX; Schema: public; Owner: ctsb
--

CREATE UNIQUE INDEX "users_nanoId_key" ON public.users USING btree ("nanoId");


--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: ctsb
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-11-10 21:38:30 UTC

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+2)
-- Dumped by pg_dump version 16.4

-- Started on 2024-11-10 21:38:30 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2024-11-10 21:38:30 UTC

--
-- PostgreSQL database dump complete
--

-- Completed on 2024-11-10 21:38:30 UTC

--
-- PostgreSQL database cluster dump complete
--

