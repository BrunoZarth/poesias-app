DROP TABLE poesias;

DROP TABLE autores;

CREATE TABLE autores (
  id TEXT NOT NULL ,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE PRIMARY KEY,
  img TEXT,
  hash TEXT NOT NULL,
  salt TEXT NOT NULL
);

CREATE TABLE poesias (
  id TEXT NOT NULL UNIQUE PRIMARY KEY,
  poesia TEXT NOT NULL,
  autor TEXT NOT NULL,
  FOREIGN KEY (autor) REFERENCES autores (email)
);
