CREATE TRIGGER change_date BEFORE INSERT ON public.user
    FOR EACH ROW EXECUTE PROCEDURE change_creation_date();

CREATE OR REPLACE FUNCTION change_creation_date()
  RETURNS trigger AS $change_date$
BEGIN
 NEW.dateCreation = CURRENT_DATE;
END;
$change_date$ LANGUAGE plpgsql;


CREATE TRIGGER add_points BEFORE INSERT ON public.user
    FOR EACH ROW EXECUTE PROCEDURE add_points_score();

CREATE OR REPLACE FUNCTION add_points_score()
  RETURNS trigger AS $add_points$
BEGIN
 NEW.score = 100;
END;
$add_points$ LANGUAGE plpgsql;



CREATE TRIGGER date_bet BEFORE INSERT ON public.ebets
    FOR EACH ROW EXECUTE PROCEDURE add_date_bet();

CREATE OR REPLACE FUNCTION add_date_bet()
  RETURNS trigger AS $date_bet$
BEGIN
 NEW."dateBet" = CURRENT_DATE;
 return NEW;
END;
$date_bet$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION public.update_score()
     RETURNS trigger AS $update_score$
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
$update_score$ LANGUAGE plpgsql;












