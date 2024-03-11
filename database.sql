-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS mediasharingapp;
CREATE DATABASE mediasharingapp;
USE mediasharingapp;

-- Create the tables

CREATE TABLE UserLevels (
    level_id INT AUTO_INCREMENT PRIMARY KEY,
    level_name VARCHAR(50) NOT NULL
);

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_level_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_level_id) REFERENCES UserLevels(level_id)
);

CREATE TABLE Places (
    place_id INT AUTO_INCREMENT PRIMARY KEY,
    place_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE MediaItems (
    media_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    place_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    filesize INT NOT NULL,
    media_type VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (place_id) REFERENCES Places(place_id)
);

CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL
);

CREATE TABLE MediaItemTags (
    media_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (media_id, tag_id),
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id)
);


INSERT INTO UserLevels (level_name) VALUES ('Admin'), ('User'), ('Guest');

-- Insert data into Users
INSERT INTO Users (username, password, email, user_level_id) VALUES
('Bella', 'password123', 'bella@example.com', 2),
('Aurora', 'password123', 'aurora.rose@example.com', 2),
('Olaf47', 'password47', 'olaf@example.com', 2),
('adminUser', 'adminPassword', 'admin@example.com', 1);

-- Insert data into Places
INSERT INTO Places (place_name) VALUES ('Central Park'), ('Golden Gate Bridge'), ('Eiffel Tower');

-- Insert data into MediaItems
INSERT INTO MediaItems (user_id, place_id, filename, media_type, filesize, rating, title, description) VALUES
(1, 1, 'central_park_photo.jpg', 'image', 2048, 5, 'Central Park in Spring', 'A beautiful view of Central Park in spring.'),
(2, 2, 'golden_gate_bridge_photo.jpg', 'image', 3072, 4, 'Golden Gate at Sunset', 'Sunset view from the Golden Gate Bridge.'),
(1, 3, 'eiffel_tower_photo.jpg', 'image', 1024, 5, 'Eiffel Tower by Night', 'The Eiffel Tower lit up at night.');

-- Insert data into Comments
INSERT INTO Comments (media_id, user_id, comment_text) VALUES
(1, 2, 'Stunning view!'),
(2, 1, 'Love this!'),
(3, 3, 'Amazing picture.');

-- Insert data into Likes
INSERT INTO Likes (media_id, user_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 2);

-- Insert data into Tags
INSERT INTO Tags (tag_name) VALUES ('Nature'), ('Architecture'), ('Night'), ('Sunset');

-- Insert data into MediaItemTags
INSERT INTO MediaItemTags (media_id, tag_id) VALUES
(1, 1),
(2, 2),
(2, 4),
(3, 2),
(3, 3);
