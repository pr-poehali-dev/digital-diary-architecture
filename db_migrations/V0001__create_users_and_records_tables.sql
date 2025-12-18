-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы записей дневника
CREATE TABLE IF NOT EXISTS day_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    date DATE NOT NULL,
    mood VARCHAR(50) NOT NULL,
    emoji VARCHAR(10) NOT NULL,
    note TEXT,
    color VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, date)
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_day_records_user_id ON day_records(user_id);
CREATE INDEX IF NOT EXISTS idx_day_records_date ON day_records(date);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
