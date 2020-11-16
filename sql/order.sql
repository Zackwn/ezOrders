-- 1
CREATE TABLE Orders (
    id varchar(36) PRIMARY KEY,
    "table" int,
    description TEXT,
    status varchar(255)
);

-- 2
CREATE TYPE Status AS ENUM ('PENDING', 'DONE', 'CANCELED');
ALTER TABLE Orders
ALTER COLUMN status TYPE Status USING status::status;