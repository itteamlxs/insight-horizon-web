
-- TechCorp Solutions Database Schema
-- Production-ready database structure for phpMyAdmin
-- Execute this script in phpMyAdmin SQL tab

-- Create database with proper charset and collation
CREATE DATABASE IF NOT EXISTS techcorp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE techcorp_db;

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_active (is_active),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Posts table for news, announcements, and content
CREATE TABLE IF NOT EXISTS posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(500),
    type ENUM('press_release', 'announcement', 'company_info') NOT NULL,
    is_public BOOLEAN DEFAULT true,
    featured_image VARCHAR(500),
    author_id INT NOT NULL,
    slug VARCHAR(500) UNIQUE,
    meta_description VARCHAR(160),
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_public (is_public),
    INDEX idx_created (created_at),
    INDEX idx_slug (slug),
    INDEX idx_author_public (author_id, is_public),
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Company settings for dynamic configuration
CREATE TABLE IF NOT EXISTS company_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255) NOT NULL DEFAULT 'TechCorp Solutions',
    tagline VARCHAR(255),
    description TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    logo_path VARCHAR(500),
    favicon_path VARCHAR(500),
    social_twitter VARCHAR(255),
    social_linkedin VARCHAR(255),
    social_github VARCHAR(255),
    social_facebook VARCHAR(255),
    social_instagram VARCHAR(255),
    hero_video_url VARCHAR(500),
    hero_background_image VARCHAR(500),
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#10B981',
    timezone VARCHAR(50) DEFAULT 'UTC',
    date_format VARCHAR(20) DEFAULT 'Y-m-d',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sessions table for secure session management
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(128) PRIMARY KEY,
    user_id INT NOT NULL,
    data TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_expires (expires_at),
    INDEX idx_user_expires (user_id, expires_at),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Pricing plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    billing_period ENUM('monthly', 'yearly', 'one-time') DEFAULT 'monthly',
    features JSON,
    is_popular BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_order (display_order),
    INDEX idx_billing (billing_period)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact forms table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    message TEXT NOT NULL,
    selected_plan_id INT NULL,
    status ENUM('new', 'contacted', 'converted', 'closed') DEFAULT 'new',
    source VARCHAR(100) DEFAULT 'website',
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created (created_at),
    INDEX idx_email (email),
    FOREIGN KEY (selected_plan_id) REFERENCES pricing_plans(id) ON SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Gallery/media management table
CREATE TABLE IF NOT EXISTS media_files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type ENUM('image', 'video', 'document') NOT NULL,
    mime_type VARCHAR(100),
    file_size INT,
    title VARCHAR(255),
    description TEXT,
    alt_text VARCHAR(255),
    is_public BOOLEAN DEFAULT true,
    uploaded_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type (file_type),
    INDEX idx_public (is_public),
    INDEX idx_uploaded_by (uploaded_by),
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Transparency documents table
CREATE TABLE IF NOT EXISTS transparency_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category ENUM(
        'security_practices', 
        'financial_reporting', 
        'governance', 
        'environmental_impact', 
        'data_privacy', 
        'ethics_compliance'
    ) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INT,
    document_version VARCHAR(20) DEFAULT '1.0',
    effective_date DATE,
    expiry_date DATE,
    uploaded_by INT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_active (is_active),
    INDEX idx_effective_date (effective_date),
    INDEX idx_category_active (category, is_active),
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Activity logs table for audit trail
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INT,
    details JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_created (created_at),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- System settings table
CREATE TABLE IF NOT EXISTS system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_editable BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (setting_key),
    INDEX idx_editable (is_editable)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123)
-- Password hash generated with PHP: password_hash('admin123', PASSWORD_DEFAULT)
INSERT INTO users (email, password_hash, role, first_name, last_name, is_active) VALUES 
('admin@techcorp.com', '$2y$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewNhWzVOjz5HEqQ6', 'admin', 'System', 'Administrator', true)
ON DUPLICATE KEY UPDATE 
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    is_active = VALUES(is_active);

-- Insert default company settings
INSERT INTO company_settings (
    company_name, 
    tagline,
    description, 
    email, 
    phone,
    address,
    social_twitter,
    social_linkedin,
    social_github,
    primary_color,
    secondary_color
) VALUES (
    'TechCorp Solutions', 
    'Leading Technology Solutions Provider',
    'We provide cutting-edge technology and infrastructure solutions that help businesses scale and thrive in the digital age. Our comprehensive platform offers everything from cloud infrastructure to advanced security solutions.',
    'contact@techcorp.com', 
    '+1 (555) 123-4567',
    '123 Technology Drive, Silicon Valley, CA 94000, United States',
    'https://twitter.com/techcorp',
    'https://linkedin.com/company/techcorp-solutions',
    'https://github.com/techcorp-solutions',
    '#3B82F6',
    '#10B981'
)
ON DUPLICATE KEY UPDATE 
    tagline = VALUES(tagline),
    description = VALUES(description),
    social_twitter = VALUES(social_twitter),
    social_linkedin = VALUES(social_linkedin),
    social_github = VALUES(social_github);

-- Insert sample posts with proper slugs and excerpts
INSERT INTO posts (title, content, excerpt, type, is_public, author_id, slug, meta_description) VALUES 
(
    'Welcome to TechCorp Solutions', 
    'We are excited to announce the launch of our new comprehensive technology platform that will revolutionize how businesses manage their infrastructure. Our innovative suite of tools provides everything you need to scale your operations efficiently and securely.\n\nThis platform integrates cutting-edge cloud technology with robust security measures, ensuring your business stays ahead in the digital transformation journey. From automated deployment pipelines to real-time monitoring and analytics, we have built a solution that grows with your business.',
    'Announcing the launch of our revolutionary technology platform for modern business infrastructure management and digital transformation.',
    'announcement', 
    true, 
    1,
    'welcome-to-techcorp-solutions',
    'TechCorp Solutions launches innovative technology platform for business infrastructure management and digital transformation.'
),
(
    'Q3 2024 Financial Results Show Strong Growth', 
    'TechCorp Solutions announces exceptional Q3 2024 financial results with 25% year-over-year growth in cloud infrastructure services and 40% increase in enterprise client acquisition. We continue to expand our market presence while delivering outstanding value to our clients.\n\nKey highlights include:\n• Revenue growth of 25% YoY\n• New enterprise clients increased by 40%\n• Customer satisfaction score of 98%\n• Expansion into 3 new markets\n\nThese results demonstrate our commitment to innovation and customer success in the rapidly evolving technology landscape.',
    'Exceptional Q3 2024 results showcase 25% YoY growth in cloud services and 40% increase in enterprise client acquisition.',
    'press_release', 
    true, 
    1,
    'q3-2024-financial-results-strong-growth',
    'TechCorp Solutions Q3 2024 financial results show 25% growth in cloud infrastructure services and strong market expansion.'
),
(
    'Advanced Security Features Now Available', 
    'We have implemented state-of-the-art security measures across all our services, including end-to-end encryption, multi-factor authentication, and zero-trust architecture. These enhancements ensure the highest level of data protection and compliance for our clients.\n\nNew security features include:\n• AES-256 end-to-end encryption\n• Advanced multi-factor authentication\n• Zero-trust network architecture\n• Real-time threat detection\n• Compliance with SOC 2, ISO 27001, and GDPR\n\nOur security-first approach provides peace of mind while enabling your business to operate confidently in the digital space.',
    'Enhanced security measures including end-to-end encryption and zero-trust architecture now protect all client services.',
    'company_info', 
    true, 
    1,
    'advanced-security-features-available',
    'TechCorp Solutions implements advanced security features including end-to-end encryption and zero-trust architecture for enhanced data protection.'
)
ON DUPLICATE KEY UPDATE 
    content = VALUES(content),
    excerpt = VALUES(excerpt),
    meta_description = VALUES(meta_description);

-- Insert sample pricing plans with comprehensive features
INSERT INTO pricing_plans (name, description, price, billing_period, features, is_popular, display_order, currency) VALUES
(
    'Starter',
    'Perfect for small businesses and startups getting started with our platform. Includes essential features to kickstart your digital transformation.',
    29.99,
    'monthly',
    '["Up to 5 team members", "10GB cloud storage", "Basic support (48h response)", "Standard security features", "Email integration", "Basic analytics dashboard", "Mobile app access"]',
    false,
    1,
    'USD'
),
(
    'Professional',
    'Ideal for growing businesses with advanced needs. Comprehensive feature set for scaling operations and enhanced productivity.',
    79.99,
    'monthly',
    '["Up to 25 team members", "100GB cloud storage", "Priority support (24h response)", "Advanced security & compliance", "Full API access", "Custom integrations", "Advanced analytics & reporting", "Workflow automation", "Priority feature requests"]',
    true,
    2,
    'USD'
),
(
    'Enterprise',
    'Complete solution for large organizations requiring maximum scalability, security, and dedicated support.',
    199.99,
    'monthly',
    '["Unlimited team members", "1TB cloud storage", "24/7 dedicated support", "Enterprise-grade security", "Complete API access", "Custom development support", "Advanced compliance tools", "SLA guarantee (99.9% uptime)", "Dedicated account manager", "Custom training sessions"]',
    false,
    3,
    'USD'
)
ON DUPLICATE KEY UPDATE 
    description = VALUES(description),
    features = VALUES(features),
    currency = VALUES(currency);

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_editable) VALUES
('site_maintenance', 'false', 'boolean', 'Enable maintenance mode for the website', true),
('max_upload_size', '5242880', 'number', 'Maximum file upload size in bytes (5MB)', true),
('session_timeout', '3600', 'number', 'Session timeout in seconds (1 hour)', true),
('enable_registration', 'false', 'boolean', 'Allow new user registration', true),
('email_notifications', 'true', 'boolean', 'Enable email notifications', true),
('backup_frequency', 'daily', 'string', 'Database backup frequency', true),
('analytics_enabled', 'true', 'boolean', 'Enable analytics tracking', true)
ON DUPLICATE KEY UPDATE 
    setting_value = VALUES(setting_value),
    description = VALUES(description);

-- Create additional performance indexes
CREATE INDEX idx_posts_type_public_created ON posts(type, is_public, created_at DESC);
CREATE INDEX idx_contact_status_created ON contact_submissions(status, created_at DESC);
CREATE INDEX idx_media_type_public ON media_files(file_type, is_public);
CREATE INDEX idx_transparency_category_active ON transparency_documents(category, is_active, effective_date DESC);
CREATE INDEX idx_activity_logs_user_action ON activity_logs(user_id, action, created_at DESC);

-- Set AUTO_INCREMENT starting values
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE posts AUTO_INCREMENT = 1;
ALTER TABLE pricing_plans AUTO_INCREMENT = 1;
ALTER TABLE contact_submissions AUTO_INCREMENT = 1;
ALTER TABLE media_files AUTO_INCREMENT = 1;
ALTER TABLE transparency_documents AUTO_INCREMENT = 1;
ALTER TABLE activity_logs AUTO_INCREMENT = 1;
ALTER TABLE system_settings AUTO_INCREMENT = 1;

-- Add triggers for activity logging (optional)
DELIMITER $$

CREATE TRIGGER log_user_changes 
AFTER UPDATE ON users 
FOR EACH ROW 
BEGIN
    INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details) 
    VALUES (NEW.id, 'user_updated', 'users', NEW.id, JSON_OBJECT('email', NEW.email, 'active', NEW.is_active));
END$$

CREATE TRIGGER log_post_creation 
AFTER INSERT ON posts 
FOR EACH ROW 
BEGIN
    INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details) 
    VALUES (NEW.author_id, 'post_created', 'posts', NEW.id, JSON_OBJECT('title', NEW.title, 'type', NEW.type));
END$$

DELIMITER ;

-- Display success message
SELECT 
    'Database setup completed successfully!' as Status,
    'Default admin: admin@techcorp.com / admin123' as AdminCredentials,
    'Remember to change default password in production!' as SecurityNote;

-- Show table summary
SELECT 
    TABLE_NAME as 'Table',
    TABLE_ROWS as 'Rows',
    ROUND(((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024), 2) as 'Size (MB)'
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'techcorp_db'
ORDER BY TABLE_NAME;
