
-- TechCorp Database Schema
-- Run this script to create the required database structure

-- Create database
CREATE DATABASE IF NOT EXISTS techcorp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE techcorp_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    type ENUM('press_release', 'announcement', 'company_info') NOT NULL,
    is_public BOOLEAN DEFAULT true,
    author_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_public (is_public),
    INDEX idx_created (created_at),
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Company settings table
CREATE TABLE IF NOT EXISTS company_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255) NOT NULL DEFAULT 'TechCorp Solutions',
    description TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    logo_path VARCHAR(500),
    social_twitter VARCHAR(255),
    social_linkedin VARCHAR(255),
    social_github VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sessions table for secure session management
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(128) PRIMARY KEY,
    user_id INT NOT NULL,
    data TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_expires (expires_at),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password_hash, role) VALUES 
('admin@techcorp.com', '$2y$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewNhWzVOjz5HEqQ6', 'admin')
ON DUPLICATE KEY UPDATE email = email;

-- Insert default company settings
INSERT INTO company_settings (company_name, description, email, phone) VALUES 
('TechCorp Solutions', 'Leading technology and infrastructure solutions provider', 'contact@techcorp.com', '+1 (555) 123-4567')
ON DUPLICATE KEY UPDATE company_name = company_name;

-- Insert sample posts
INSERT INTO posts (title, content, type, is_public, author_id) VALUES 
('Welcome to TechCorp Solutions', 'We are excited to announce the launch of our new technology platform that will revolutionize how businesses manage their infrastructure.', 'announcement', true, 1),
('Q3 2024 Financial Results', 'TechCorp Solutions announces strong Q3 2024 results with 25% year-over-year growth in cloud infrastructure services.', 'press_release', true, 1),
('New Security Features Released', 'We have implemented advanced security measures including end-to-end encryption and multi-factor authentication across all our services.', 'company_info', true, 1)
ON DUPLICATE KEY UPDATE title = title;
