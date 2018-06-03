
--
-- Name: add_date_bet(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.add_date_bet() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
 NEW."dateBet" = CURRENT_DATE;
 return NEW;
END;
$$;


--
-- Name: add_points_score(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.add_points_score() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
 NEW.score = 100;
 RETURN NEW;
END;
$$;


--
-- Name: change_creation_date(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.change_creation_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
 NEW."dateCreation" = CURRENT_DATE;
 RETURN NEW;
END;
$$;


--
-- Name: update_score(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_score() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
bets CURSOR FOR SELECT * FROM public.ebets WHERE "idMatch" = NEW."idMatch";
users CURSOR FOR SELECT * FROM public.user where "idUser" in (SELECT "idUser" from public.ebets where "idMatch" = NEW."idMatch");
bet RECORD;
userRow RECORD;
BEGIN
 OPEN bets;
 OPEN users;
   LOOP
      FETCH from bets INTO bet;
      EXIT WHEN NOT FOUND;
	  LOOP
	  	FETCH from users into userRow;
		EXIT WHEN NOT FOUND;
		IF bet."idUser" = userRow."idUser" THEN
			IF NEW."scoreTeam1" = bet."scoreTeam1" and NEW."scoreTeam2" = bet."scoreTeam2" then
				update public.user set "score" = round("score" + bet."pointsMise" * 1.7) where "idUser" = userRow."idUser";
				update public.ebets set "win" = true, "points" = bet."pointsMise" * 1.7 where "idBet" = bet."idBet";
			ELSIF NEW."scoreTeam1" > NEW."scoreTeam2" and bet."scoreTeam1" > bet."scoreTeam2" THEN
				update public.user set "score" = round("score" + bet."pointsMise"  * 1.2) where "idUser" = userRow."idUser";
				update public.ebets set "win" = true, "points" = bet."pointsMise" * 1.2 where "idBet" = bet."idBet";
			ELSIF NEW."scoreTeam1" < NEW."scoreTeam2" and bet."scoreTeam1" < bet."scoreTeam2" THEN
				update public.user set "score" = round("score" + bet."pointsMise"  * 1.2) where "idUser" = userRow."idUser";
				update public.ebets set "win" = true, "points" = bet."pointsMise" * 1.2 where "idBet" = bet."idBet";
			ELSIF NEW."scoreTeam1" > NEW."scoreTeam2" and bet."scoreTeam1" < bet."scoreTeam2" THEN
				update public.user set "score" = round("score" - bet."pointsMise"  * 1.7) where "idUser" = userRow."idUser";
				update public.ebets set "win" = false, "points" = bet."pointsMise" * 1.7 where "idBet" = bet."idBet";
			ELSIF NEW."scoreTeam1" < NEW."scoreTeam2" and bet."scoreTeam1" > bet."scoreTeam2" THEN
				update public.user set "score" = round("score" - bet."pointsMise"  * 1.7) where "idUser" = userRow."idUser";
				update public.ebets set "win" = false, "points" = bet."pointsMise" * 1.7 where "idBet" = bet."idBet";
			END IF;
		END IF;
	  END LOOP;
   END LOOP;
   CLOSE bets;
   CLOSE users;
   return new;
END;
$$;


--
-- Name: ebets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ebets (
    "idBet" integer NOT NULL,
    "idMatch" integer NOT NULL,
    "idUser" integer NOT NULL,
    "scoreTeam1" integer NOT NULL,
    "scoreTeam2" integer NOT NULL,
    "dateBet" date NOT NULL,
    "pointsMise" integer NOT NULL,
    win boolean,
    points integer
);


--
-- Name: ebets_idBet_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ebets_idBet_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ebets_idBet_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ebets_idBet_seq" OWNED BY public.ebets."idBet";


--
-- Name: game; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.game (
    "idGame" integer NOT NULL,
    "nameGame" text NOT NULL,
    description character(1000),
    "dateCreation" date,
    "imgGame" text
);


--
-- Name: game_idGame_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."game_idGame_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: game_idGame_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."game_idGame_seq" OWNED BY public.game."idGame";


--
-- Name: match; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.match (
    "idMatch" integer NOT NULL,
    "idTeam1" integer NOT NULL,
    "idTeam2" integer NOT NULL,
    "dateMatch" date NOT NULL,
    "idGame" integer NOT NULL,
    "scoreTeam1" integer,
    "scoreTeam2" integer,
    description text
);


--
-- Name: match_idMatch_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."match_idMatch_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: match_idMatch_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."match_idMatch_seq" OWNED BY public.match."idMatch";


--
-- Name: playsin; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.playsin (
    "idGame" integer NOT NULL,
    "idTeam" integer NOT NULL
);


--
-- Name: team; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team (
    "idTeam" integer NOT NULL,
    "nameTeam" text NOT NULL,
    "logoTeam" text NOT NULL,
    "dateCreation" date NOT NULL
);


--
-- Name: team_idTeam_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."team_idTeam_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: team_idTeam_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."team_idTeam_seq" OWNED BY public.team."idTeam";


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    "idUser" integer NOT NULL,
    "loginUser" text NOT NULL,
    "nomUser" text NOT NULL,
    "prenomUser" text NOT NULL,
    "mailUser" text NOT NULL,
    "dateNaissance" date NOT NULL,
    "dateCreation" date NOT NULL,
    admin boolean NOT NULL,
    password text NOT NULL,
    score integer NOT NULL
);


--
-- Name: user_idUser_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."user_idUser_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_idUser_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."user_idUser_seq" OWNED BY public."user"."idUser";


--
-- Name: ebets idBet; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ebets ALTER COLUMN "idBet" SET DEFAULT nextval('public."ebets_idBet_seq"'::regclass);


--
-- Name: game idGame; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game ALTER COLUMN "idGame" SET DEFAULT nextval('public."game_idGame_seq"'::regclass);


--
-- Name: match idMatch; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.match ALTER COLUMN "idMatch" SET DEFAULT nextval('public."match_idMatch_seq"'::regclass);


--
-- Name: team idTeam; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team ALTER COLUMN "idTeam" SET DEFAULT nextval('public."team_idTeam_seq"'::regclass);


--
-- Name: user idUser; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN "idUser" SET DEFAULT nextval('public."user_idUser_seq"'::regclass);


--
-- Data for Name: ebets; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.ebets ("idBet", "idMatch", "idUser", "scoreTeam1", "scoreTeam2", "dateBet", "pointsMise", win, points) VALUES (14, 4, 47, 6, 6, '2018-06-02', 4, NULL, NULL);
INSERT INTO public.ebets ("idBet", "idMatch", "idUser", "scoreTeam1", "scoreTeam2", "dateBet", "pointsMise", win, points) VALUES (15, 4, 46, 4, 2, '2018-06-02', 5, NULL, NULL);


--
-- Data for Name: game; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.game ("idGame", "nameGame", description, "dateCreation", "imgGame") VALUES (10, 'League Of Legends', 'League of Legends (abrégé LoL, anciennement nommé League of Legends: Clash of Fates) est un jeu vidéo de type arène de bataille en ligne (MOBA) gratuit développé et édité par Riot Games.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ', '2009-10-27', 'https://euw.leagueoflegends.com/sites/default/files/upload/art/team_graves_3.jpg');
INSERT INTO public.game ("idGame", "nameGame", description, "dateCreation", "imgGame") VALUES (11, 'CS:GO', 'Counter-Strike: Global Offensive (abrégé CS:GO) est un jeu de tir à la première personne multijoueur en ligne basé sur le jeu d''équipe développé par Valve Corporation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ', '2012-08-21', 'https://www.dvsgaming.org/wp-content/uploads/2017/07/Counter-Strike-Global-Offensive-HD-Wallpaper.jpg');
INSERT INTO public.game ("idGame", "nameGame", description, "dateCreation", "imgGame") VALUES (12, 'Dota 2', 'Dota 2 est un jeu vidéo de type arène de bataille en ligne multijoueur développé et édité par Valve Corporation.
Dota 2 se joue en matchs indépendants opposant deux équipes de cinq joueurs, chacune possédant une base située en coin de carte contenant un bâtiment appelé l''« Ancient », dont la destruction mène à la victoire de l''équipe ennemie. Chaque joueur contrôle un « Héros » et est amené à accumuler de l’expérience, gagner de l''or, s''équiper d''objets et combattre l''équipe ennemie pour parvenir à la victoire.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ', '2013-07-09', 'http://www.gamersrules.com/wp-content/uploads/2016/05/fond-ecran-dota-2-74.jpg');


--
-- Data for Name: match; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.match ("idMatch", "idTeam1", "idTeam2", "dateMatch", "idGame", "scoreTeam1", "scoreTeam2", description) VALUES (5, 21, 23, '2018-06-18', 10, -1, -1, 'LCS EU Spring Split 2018');
INSERT INTO public.match ("idMatch", "idTeam1", "idTeam2", "dateMatch", "idGame", "scoreTeam1", "scoreTeam2", description) VALUES (7, 22, 20, '2018-06-19', 10, -1, -1, 'LCS NA Spring Split 2018');
INSERT INTO public.match ("idMatch", "idTeam1", "idTeam2", "dateMatch", "idGame", "scoreTeam1", "scoreTeam2", description) VALUES (4, 20, 21, '2018-06-03', 10, 3, 0, 'MSI 2018');
INSERT INTO public.match ("idMatch", "idTeam1", "idTeam2", "dateMatch", "idGame", "scoreTeam1", "scoreTeam2", description) VALUES (6, 22, 23, '2018-06-09', 10, 3, 0, 'MSI 2018');
INSERT INTO public.match ("idMatch", "idTeam1", "idTeam2", "dateMatch", "idGame", "scoreTeam1", "scoreTeam2", description) VALUES (8, 22, 21, '2018-06-01', 10, -1, -1, 'test');


--
-- Data for Name: playsin; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.playsin ("idGame", "idTeam") VALUES (10, 20);
INSERT INTO public.playsin ("idGame", "idTeam") VALUES (10, 21);
INSERT INTO public.playsin ("idGame", "idTeam") VALUES (10, 22);
INSERT INTO public.playsin ("idGame", "idTeam") VALUES (10, 23);


--
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.team ("idTeam", "nameTeam", "logoTeam", "dateCreation") VALUES (20, 'Cloud9', 'https://d1u5p3l4wpay3k.cloudfront.net/pubg_esports_gamepedia_en/thumb/8/88/Cloud9logo_square.png/300px-Cloud9logo_square.png?version=5b47ae9da47c94a668920e3f8093ac97', '2012-12-04');
INSERT INTO public.team ("idTeam", "nameTeam", "logoTeam", "dateCreation") VALUES (21, 'Fnatic', 'https://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/fnatic-289pu6fn.jpg', '2004-01-01');
INSERT INTO public.team ("idTeam", "nameTeam", "logoTeam", "dateCreation") VALUES (22, 'TSM', 'http://www.eclypsia.com/public/upload/cke/Games/Lol/tsm.jpg', '2009-09-01');
INSERT INTO public.team ("idTeam", "nameTeam", "logoTeam", "dateCreation") VALUES (23, 'G2', 'https://d1u5p3l4wpay3k.cloudfront.net/lolesports_gamepedia_en/7/77/G2_Esportslogo_square.png', '2014-01-01');


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."user" ("idUser", "loginUser", "nomUser", "prenomUser", "mailUser", "dateNaissance", "dateCreation", admin, password, score) VALUES (1, 'Alexis', 'Sanchez', 'Alexis', 'alexis559.sanchez@gmail.com', '1997-12-19', '2018-05-29', true, '$2a$10$umJ4kxxQy0sBK3p5VU0y/.LSe/NmXIIeQZ8JBU0NEhptAHb6rhnZG', 100);
INSERT INTO public."user" ("idUser", "loginUser", "nomUser", "prenomUser", "mailUser", "dateNaissance", "dateCreation", admin, password, score) VALUES (45, 'a', 'a', 'a', 'a@a', '4815-09-14', '2018-05-29', false, '$2a$10$tIHeRQWV2gA.tT5PBI0MbeB5qhERt6Z3u7dheXDlvCw4UZNawU7dC', 100);
INSERT INTO public."user" ("idUser", "loginUser", "nomUser", "prenomUser", "mailUser", "dateNaissance", "dateCreation", admin, password, score) VALUES (47, 'Vorstag', 'Gestin', 'Rémi', 'remi.gestin@etu.umontpellier.fr', '1997-12-14', '2018-06-02', false, '$2a$10$ECGv22h90dbFypj2nM0FiuXiCyrk9KmK6DF4mnuuauwJndslfthCa', 96);
INSERT INTO public."user" ("idUser", "loginUser", "nomUser", "prenomUser", "mailUser", "dateNaissance", "dateCreation", admin, password, score) VALUES (46, 'martinCayuelas', 'Cayuelas', 'Martin', 'martincayuelas@gmail.com', '2018-05-31', '2018-05-31', false, '$2a$10$d8z8rg88l0WTUHYJYcK43.zJdVbRMW3tPdgWpmkdyKuscpWfXDQt6', 95);


--
-- Name: ebets_idBet_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ebets_idBet_seq"', 15, true);


--
-- Name: game_idGame_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."game_idGame_seq"', 12, true);


--
-- Name: match_idMatch_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."match_idMatch_seq"', 8, true);


--
-- Name: team_idTeam_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."team_idTeam_seq"', 23, true);


--
-- Name: user_idUser_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."user_idUser_seq"', 47, true);


--
-- Name: ebets ebets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ebets
    ADD CONSTRAINT ebets_pkey PRIMARY KEY ("idBet");


--
-- Name: game game_nameGame_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT "game_nameGame_key" UNIQUE ("nameGame");


--
-- Name: game game_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pkey PRIMARY KEY ("idGame");


--
-- Name: user loginUser; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "loginUser" UNIQUE ("loginUser");


--
-- Name: match match_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT match_pkey PRIMARY KEY ("idMatch");


--
-- Name: playsin playsIn_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.playsin
    ADD CONSTRAINT "playsIn_pkey" PRIMARY KEY ("idGame", "idTeam");


--
-- Name: team team_nameTeam_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT "team_nameTeam_key" UNIQUE ("nameTeam");


--
-- Name: team team_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY ("idTeam");


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY ("idUser");


--
-- Name: user add_points; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER add_points BEFORE INSERT ON public."user" FOR EACH ROW EXECUTE PROCEDURE public.add_points_score();


--
-- Name: user change_date; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER change_date BEFORE INSERT ON public."user" FOR EACH ROW EXECUTE PROCEDURE public.change_creation_date();


--
-- Name: ebets date_bet; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER date_bet BEFORE INSERT ON public.ebets FOR EACH ROW EXECUTE PROCEDURE public.add_date_bet();


--
-- Name: match update_score; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_score AFTER UPDATE ON public.match FOR EACH ROW EXECUTE PROCEDURE public.update_score();


--
-- Name: ebets ebets_idMatch_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ebets
    ADD CONSTRAINT "ebets_idMatch_fkey" FOREIGN KEY ("idMatch") REFERENCES public.match("idMatch");


--
-- Name: ebets ebets_idUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ebets
    ADD CONSTRAINT "ebets_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES public."user"("idUser");


--
-- Name: match match_idGame_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT "match_idGame_fkey" FOREIGN KEY ("idGame") REFERENCES public.game("idGame");


--
-- Name: match match_idMatch_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT "match_idMatch_fkey" FOREIGN KEY ("idMatch") REFERENCES public.match("idMatch");


--
-- Name: match match_idTeam1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT "match_idTeam1_fkey" FOREIGN KEY ("idTeam1") REFERENCES public.team("idTeam");


--
-- Name: match match_idTeam2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT "match_idTeam2_fkey" FOREIGN KEY ("idTeam2") REFERENCES public.team("idTeam");


--
-- Name: playsin playsin_idGame_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.playsin
    ADD CONSTRAINT "playsin_idGame_fkey" FOREIGN KEY ("idGame") REFERENCES public.game("idGame");


--
-- Name: playsin playsin_idTeam_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.playsin
    ADD CONSTRAINT "playsin_idTeam_fkey" FOREIGN KEY ("idTeam") REFERENCES public.team("idTeam");


--
-- PostgreSQL database dump complete
--

