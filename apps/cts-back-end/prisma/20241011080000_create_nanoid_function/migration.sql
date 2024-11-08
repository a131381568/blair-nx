-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateFunction
CREATE OR REPLACE FUNCTION nanoid(size INT DEFAULT 21)
RETURNS TEXT AS $$
DECLARE
  id TEXT := '';
  i INT := 0;
  urlAlphabet CHAR(64) := 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';
  bytes BYTEA;
BEGIN
  WHILE i < size LOOP
    bytes := gen_random_bytes(1);
    i := i + 1;
    id := id || substr(urlAlphabet, get_byte(bytes, 0)::INT % 64 + 1, 1);
  END LOOP;
  RETURN id;
END;
$$ LANGUAGE plpgsql VOLATILE;
