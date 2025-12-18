-- Добавление колонки для отслеживания онбординга
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Таблица настроек пользователя
CREATE TABLE IF NOT EXISTS user_settings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    selected_metrics JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Обновление структуры записей дневника для поддержки метрик
ALTER TABLE day_records ADD COLUMN IF NOT EXISTS metrics JSONB DEFAULT '{}';

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_day_records_metrics ON day_records USING GIN (metrics);
