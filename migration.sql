DROP TABLE IF EXISTS storedVehicles;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    userName TEXT,
    passKey TEXT
);

CREATE TABLE storedVehicles (
    vehID SERIAL,
    userID INTEGER,
    make TEXT,
    model TEXT,
    year TEXT,
    miles INTEGER,
    task TEXT,
    PRIMARY KEY(vehID),
    CONSTRAINT fk_user_vehicle
    FOREIGN KEY(userID)
    REFERENCES users(id)
);