CREATE TRIGGER change_date BEFORE INSERT ON public.user
    FOR EACH ROW EXECUTE PROCEDURE change_creation_date();

CREATE OR REPLACE FUNCTION change_creation_date()
  RETURNS trigger AS $change_date$
BEGIN
 NEW.dateCreation = CURRENT_DATE;
 RETURN NEW;
END;
$change_date$ LANGUAGE plpgsql;