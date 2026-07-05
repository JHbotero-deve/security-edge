CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
-- 1. Módulo de Seguridad
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Módulo de Ganadería
CREATE TABLE IF NOT EXISTS animales (
    id SERIAL PRIMARY KEY,
    arete VARCHAR(20) UNIQUE NOT NULL,
    especie VARCHAR(50),
    fecha_nacimiento DATE,
    peso_actual DECIMAL(10, 2),
    estado VARCHAR(20) DEFAULT 'activo'
);

-- 3. Relación entre ambos (Registro de quién modificó qué)
CREATE TABLE IF NOT EXISTS registros_actividad (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    animal_id INTEGER REFERENCES animales(id),
    accion TEXT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

