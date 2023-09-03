USE weekly_meal;

ALTER DATABASE weekly_meal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE posts (
  id              VARCHAR(255)  PRIMARY KEY,
  sequence        BIGINT        NOT NULL,
  post_type       VARCHAR(255)  NOT NULL,
  daily_post_type VARCHAR(255)  ,
  is_notified     TINYINT       NOT NULL DEFAULT FALSE,
  content         TEXT          NOT NULL,
  `timestamp`     BIGINT        NOT NULL,
  created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE photos (
  id          VARCHAR(255)  PRIMARY KEY,
  post_id     VARCHAR(255)  NOT NULL,
  url         VARCHAR(255)  NOT NULL,
  filename    VARCHAR(255)  NOT NULL,
  width       INT           NOT NULL,
  height      INT           NOT NULL,
  `timestamp` BIGINT        NOT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_photos_post_id FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE comments (
  id          BIGINT        PRIMARY KEY AUTO_INCREMENT,
  post_id     VARCHAR(255)  NOT NULL,
  content     VARCHAR(255)  NOT NULL,
  `timestamp` BIGINT        NOT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_comments_post_id FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;