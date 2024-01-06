--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: anime; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anime (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying,
    genre character varying,
    release_date timestamp without time zone,
    image_url character varying,
    watched boolean
);


ALTER TABLE public.anime OWNER TO postgres;

--
-- Name: anime_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.anime_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.anime_id_seq OWNER TO postgres;

--
-- Name: anime_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.anime_id_seq OWNED BY public.anime.id;


--
-- Name: anime_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anime_logs (
    id integer NOT NULL,
    user_id integer NOT NULL,
    anime_id integer NOT NULL,
    watched boolean
);


ALTER TABLE public.anime_logs OWNER TO postgres;

--
-- Name: anime_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.anime_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.anime_logs_id_seq OWNER TO postgres;

--
-- Name: anime_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.anime_logs_id_seq OWNED BY public.anime_logs.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying(255) NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: anime id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anime ALTER COLUMN id SET DEFAULT nextval('public.anime_id_seq'::regclass);


--
-- Name: anime_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anime_logs ALTER COLUMN id SET DEFAULT nextval('public.anime_logs_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: anime; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.anime (id, title, description, genre, release_date, image_url, watched) FROM stdin;
1	Shingeki no Kyojin	In a world plagued by humanoid Titans that once nearly wiped out humanity, survivors live in fear behind colossal walls. After a century of peace, a colossal Titan breaches the wall, reigniting the battle. Eren Yeager, fueled by loss, joins the Survey Corps to eradicate Titans. With Mikasa and Armin, they strive to outsmart the Titans before the walls crumble for good.	Military, Shounen	2013-04-07 00:00:00	https://aniwave.to/watch/attack-on-titan.kww/ep-1	t
2	Jujutsu Kaisen	Itadori Yuji, a high school student, seeks the right death amidst curses born from negative emotions. He discovers a cursed talisman that attracts malevolent Curses to his school. To save his friends, he joins a secret occult club to learn Jujutsu Sorcery and battles powerful curses.	Action, Dark Fantasy, Supernatural	2020-10-03 00:00:00	https://aniwave.to/watch/jujutsu-kaisen.32n8/ep-1	t
3	Bleach	Ichigo Kurosaki, an ordinary teenager with the ability to see ghosts, accidentally obtains the powers of a Soul Reaper. Now, he must protect the living world from evil spirits and guide the souls of the deceased to the afterlife.	Action, Adventure, Supernatural	2004-10-05 00:00:00	https://example.com/bleach_image.jpg	t
5	Naruto	Naruto Uzumaki, a young ninja with dreams of becoming the strongest ninja and leader of his village, faces challenges and battles enemies to prove his worth. His journey is filled with friendship, determination, and the pursuit of his ninja way.	Action, Adventure, Fantasy	2002-10-03 00:00:00	https://example.com/naruto_image.jpg	t
4	One Piece	Monkey D. Luffy sets sail on a grand adventure to become the King of the Pirates. Alongside his diverse crew, they navigate the treacherous Grand Line, facing powerful enemies and uncovering the mysteries of the world.	Action, Adventure, Comedy	1999-10-20 00:00:00	https://example.com/one_piece_image.jpg	t
6	Fullmetal Alchemist	Brothers Edward and Alphonse Elric seek the Philosopher's Stone to restore their bodies after a failed alchemical experiment. Their journey explores the consequences of forbidden alchemy, political intrigue, and the cost of seeking power.	Action, Adventure, Drama	2003-10-04 00:00:00	https://example.com/fullmetal_alchemist_image.jpg	t
19	Death Note	An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it. Light Yagami discovers a Shinigami's notebook and plans to use it to create a better world. The series of mysterious deaths catches the attention of world-renowned detective L, who confronts the killer on live television.	Supernatural, Psychological thriller, Mystery	2007-10-20 21:00:00	https://www.imdb.com/title/tt0877057/?ref_=tt_mv_close	f
\.


--
-- Data for Name: anime_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.anime_logs (id, user_id, anime_id, watched) FROM stdin;
1	1	1	t
2	1	2	t
3	1	3	t
4	1	5	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password) FROM stdin;
1	sp-log	mu-0xkcd@gmail.com	f1help,stuff=null
\.


--
-- Name: anime_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.anime_id_seq', 19, true);


--
-- Name: anime_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.anime_logs_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: anime_logs anime_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anime_logs
    ADD CONSTRAINT anime_logs_pkey PRIMARY KEY (id);


--
-- Name: anime anime_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anime
    ADD CONSTRAINT anime_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: anime_logs anime_logs_anime_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anime_logs
    ADD CONSTRAINT anime_logs_anime_id_fkey FOREIGN KEY (anime_id) REFERENCES public.anime(id);


--
-- Name: anime_logs anime_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anime_logs
    ADD CONSTRAINT anime_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

