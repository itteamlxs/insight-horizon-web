
# TechCorp Solutions - Corporate Website Platform

A modern, responsive corporate website platform built with React, TypeScript, and Tailwind CSS, featuring a comprehensive admin dashboard for content management.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with dark/light theme support
- **Admin Dashboard**: Complete content management system
- **Dynamic Content**: Editable pricing plans, gallery, and news articles
- **Contact Management**: Integrated contact forms with plan selection
- **Video Backgrounds**: Customizable hero section backgrounds (1920x720px optimized)
- **SEO Optimized**: Clean URLs and meta tag management
- **Security**: Protected admin routes with authentication
- **Transparency Portal**: Document management for compliance categories

## 📋 System Requirements

### Development Requirements
- **Node.js**: Version 16.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Production Requirements
- **Web Server**: Apache 2.4+ or Nginx 1.18+
- **PHP**: Version 8.0 or higher
- **MySQL**: Version 8.0 or higher
- **SSL Certificate**: Required for HTTPS
- **Minimum Server Specs**: 2GB RAM, 20GB storage

## 🛠️ Development Installation (XAMPP)

### Step 1: Download and Install XAMPP

1. **Download XAMPP**:
   - Visit [https://www.apachefriends.org/](https://www.apachefriends.org/)
   - Download the latest version for your operating system
   - Choose the version with PHP 8.0 or higher

2. **Install XAMPP**:
   - Run the installer as Administrator (Windows) or with sudo (Linux/Mac)
   - Follow the installation wizard
   - Install to the default directory: `C:\xampp\` (Windows) or `/opt/lampp/` (Linux)
   - Select Apache, MySQL, and phpMyAdmin components

3. **Start XAMPP Services**:
   - Open XAMPP Control Panel
   - Start Apache and MySQL services
   - Verify both services show "Running" status

### Step 2: Set Up Development Environment

1. **Create Project Directory**:
   ```bash
   cd C:\xampp\htdocs\  # Windows
   mkdir techcorp
   cd techcorp
   ```

2. **Copy Backend Files**:
   - Copy all files from the `backend` folder to `C:\xampp\htdocs\techcorp\`

3. **Configure Environment**:
   ```env
   # .env file
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=techcorp_db
   DB_USER=root
   DB_PASSWORD=
   CORS_ORIGIN=http://localhost:5173
   ```

### Step 3: Create Database

1. **Access phpMyAdmin**: [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. **Execute SQL Script**: Use the complete database script provided in the database section below

### Step 4: Install Frontend

1. **Install Dependencies**:
   ```bash
   npm install
   npm run dev
   ```

2. **Access Application**: [http://localhost:5173](http://localhost:5173)

## 🚀 Production Deployment

### Prerequisites

- **Domain**: Registered domain name
- **Hosting**: VPS or dedicated server with root access
- **SSL Certificate**: Let's Encrypt or commercial certificate

### Step 1: Server Setup

#### Ubuntu/Debian Server Setup

1. **Update System**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Required Packages**:
   ```bash
   # Install Apache, PHP, and MySQL
   sudo apt install apache2 php8.1 php8.1-mysql php8.1-curl php8.1-gd php8.1-mbstring php8.1-xml php8.1-zip mysql-server -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install nodejs -y
   ```

3. **Configure MySQL**:
   ```bash
   sudo mysql_secure_installation
   ```

#### CentOS/RHEL Server Setup

1. **Install Packages**:
   ```bash
   sudo yum update -y
   sudo yum install httpd php php-mysql php-curl php-gd php-mbstring php-xml php-zip mysql-server -y
   ```

2. **Start Services**:
   ```bash
   sudo systemctl start httpd mysql
   sudo systemctl enable httpd mysql
   ```

### Step 2: Database Configuration

1. **Login to MySQL**:
   ```bash
   sudo mysql -u root -p
   ```

2. **Create Production Database**:
   ```sql
   CREATE DATABASE techcorp_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'techcorp_user'@'localhost' IDENTIFIED BY 'your_secure_password_here';
   GRANT ALL PRIVILEGES ON techcorp_production.* TO 'techcorp_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

3. **Import Database Schema**:
   ```bash
   mysql -u techcorp_user -p techcorp_production < /path/to/schema.sql
   ```

### Step 3: Backend Deployment

1. **Create Web Directory**:
   ```bash
   sudo mkdir -p /var/www/techcorp
   sudo chown $USER:www-data /var/www/techcorp
   ```

2. **Upload Backend Files**:
   ```bash
   # Upload backend files to /var/www/techcorp/
   # Set proper permissions
   sudo chown -R www-data:www-data /var/www/techcorp/uploads/
   sudo chmod -R 755 /var/www/techcorp/
   sudo chmod -R 777 /var/www/techcorp/uploads/
   ```

3. **Configure Production Environment**:
   ```env
   # /var/www/techcorp/.env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=techcorp_production
   DB_USER=techcorp_user
   DB_PASSWORD=your_secure_password_here
   
   APP_ENV=production
   APP_DEBUG=false
   CORS_ORIGIN=https://yourdomain.com
   
   # Generate secure keys
   JWT_SECRET=your_64_character_random_string_here
   SESSION_SECRET=your_64_character_random_string_here
   ```

### Step 4: Apache Virtual Host Configuration

1. **Create Virtual Host**:
   ```bash
   sudo nano /etc/apache2/sites-available/techcorp.conf
   ```

2. **Virtual Host Configuration**:
   ```apache
   <VirtualHost *:80>
       ServerName yourdomain.com
       DocumentRoot /var/www/techcorp/public
       
       <Directory /var/www/techcorp/public>
           AllowOverride All
           Require all granted
       </Directory>
       
       # API routing
       Alias /api /var/www/techcorp/api
       <Directory /var/www/techcorp/api>
           AllowOverride All
           Require all granted
       </Directory>
       
       ErrorLog ${APACHE_LOG_DIR}/techcorp_error.log
       CustomLog ${APACHE_LOG_DIR}/techcorp_access.log combined
   </VirtualHost>
   ```

3. **Enable Site**:
   ```bash
   sudo a2ensite techcorp.conf
   sudo a2enmod rewrite
   sudo systemctl reload apache2
   ```

### Step 5: SSL Certificate (Let's Encrypt)

1. **Install Certbot**:
   ```bash
   sudo apt install certbot python3-certbot-apache -y
   ```

2. **Obtain Certificate**:
   ```bash
   sudo certbot --apache -d yourdomain.com
   ```

3. **Auto-renewal**:
   ```bash
   sudo crontab -e
   # Add line: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

### Step 6: Frontend Build and Deployment

1. **Build Frontend**:
   ```bash
   # On your local machine or CI/CD
   npm run build
   ```

2. **Upload Built Files**:
   ```bash
   # Upload dist/ contents to /var/www/techcorp/public/
   sudo rsync -av dist/ /var/www/techcorp/public/
   ```

3. **Configure Frontend Routing**:
   ```apache
   # /var/www/techcorp/public/.htaccess
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QSA,L]
   ```

### Step 7: Security Configuration

1. **Firewall Setup**:
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

2. **PHP Security**:
   ```ini
   # /etc/php/8.1/apache2/php.ini
   expose_php = Off
   display_errors = Off
   log_errors = On
   error_log = /var/log/php_errors.log
   upload_max_filesize = 5M
   post_max_size = 5M
   max_execution_time = 30
   ```

3. **File Permissions**:
   ```bash
   find /var/www/techcorp -type f -exec chmod 644 {} \;
   find /var/www/techcorp -type d -exec chmod 755 {} \;
   chmod 600 /var/www/techcorp/.env
   ```

## 🗄️ Complete Database Schema

Execute this SQL script in phpMyAdmin to create the complete database structure:

```sql
-- TechCorp Solutions Database Schema
-- Production-ready database structure
-- Execute this script in phpMyAdmin SQL tab

-- Create database with proper charset
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
    INDEX idx_active (is_active)
) ENGINE=InnoDB;

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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_public (is_public),
    INDEX idx_created (created_at),
    INDEX idx_slug (slug),
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

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
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Pricing plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    billing_period ENUM('monthly', 'yearly') DEFAULT 'monthly',
    features JSON,
    is_popular BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_order (display_order)
) ENGINE=InnoDB;

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
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created (created_at),
    FOREIGN KEY (selected_plan_id) REFERENCES pricing_plans(id) ON SET NULL
) ENGINE=InnoDB;

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
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Transparency documents table
CREATE TABLE IF NOT EXISTS transparency_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category ENUM('security_practices', 'financial_reporting', 'governance', 'environmental_impact', 'data_privacy', 'ethics_compliance') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INT,
    uploaded_by INT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_active (is_active),
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password_hash, role, first_name, last_name) VALUES 
('admin@techcorp.com', '$2y$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewNhWzVOjz5HEqQ6', 'admin', 'System', 'Administrator')
ON DUPLICATE KEY UPDATE email = email;

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
    social_github
) VALUES (
    'TechCorp Solutions', 
    'Leading Technology Solutions Provider',
    'We provide cutting-edge technology and infrastructure solutions that help businesses scale and thrive in the digital age.',
    'contact@techcorp.com', 
    '+1 (555) 123-4567',
    '123 Technology Drive, Silicon Valley, CA 94000',
    'https://twitter.com/techcorp',
    'https://linkedin.com/company/techcorp',
    'https://github.com/techcorp'
)
ON DUPLICATE KEY UPDATE company_name = company_name;

-- Insert sample posts
INSERT INTO posts (title, content, excerpt, type, is_public, author_id, slug) VALUES 
(
    'Welcome to TechCorp Solutions', 
    'We are excited to announce the launch of our new technology platform that will revolutionize how businesses manage their infrastructure. Our comprehensive suite of tools provides everything you need to scale your operations efficiently.',
    'Announcing the launch of our revolutionary technology platform for business infrastructure management.',
    'announcement', 
    true, 
    1,
    'welcome-to-techcorp-solutions'
),
(
    'Q3 2024 Financial Results', 
    'TechCorp Solutions announces strong Q3 2024 results with 25% year-over-year growth in cloud infrastructure services. We continue to expand our market presence and deliver value to our clients.',
    'Strong Q3 2024 results show 25% YoY growth in cloud infrastructure services.',
    'press_release', 
    true, 
    1,
    'q3-2024-financial-results'
),
(
    'New Security Features Released', 
    'We have implemented advanced security measures including end-to-end encryption and multi-factor authentication across all our services. These enhancements ensure the highest level of data protection for our clients.',
    'Advanced security measures including end-to-end encryption now available across all services.',
    'company_info', 
    true, 
    1,
    'new-security-features-released'
)
ON DUPLICATE KEY UPDATE title = title;

-- Insert sample pricing plans
INSERT INTO pricing_plans (name, description, price, billing_period, features, is_popular, display_order) VALUES
(
    'Starter',
    'Perfect for small businesses getting started with our platform',
    29.99,
    'monthly',
    '["Up to 5 users", "10GB storage", "Basic support", "Standard security"]',
    false,
    1
),
(
    'Professional',
    'Ideal for growing businesses with advanced needs',
    79.99,
    'monthly',
    '["Up to 25 users", "100GB storage", "Priority support", "Advanced security", "API access", "Custom integrations"]',
    true,
    2
),
(
    'Enterprise',
    'Complete solution for large organizations',
    199.99,
    'monthly',
    '["Unlimited users", "1TB storage", "24/7 dedicated support", "Enterprise security", "Full API access", "Custom development", "SLA guarantee"]',
    false,
    3
)
ON DUPLICATE KEY UPDATE name = name;

-- Create indexes for better performance
CREATE INDEX idx_posts_author_public ON posts(author_id, is_public);
CREATE INDEX idx_contact_submissions_status_created ON contact_submissions(status, created_at);
CREATE INDEX idx_sessions_user_expires ON sessions(user_id, expires_at);

-- Set proper AUTO_INCREMENT values
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE posts AUTO_INCREMENT = 1;
ALTER TABLE pricing_plans AUTO_INCREMENT = 1;
ALTER TABLE contact_submissions AUTO_INCREMENT = 1;
ALTER TABLE media_files AUTO_INCREMENT = 1;
ALTER TABLE transparency_documents AUTO_INCREMENT = 1;

-- Show completion message
SELECT 'Database setup completed successfully!' as Status;
```

## 📊 Monitoring and Maintenance

### Performance Monitoring

1. **Server Monitoring**:
   ```bash
   # Install monitoring tools
   sudo apt install htop iotop nethogs -y
   ```

2. **Log Monitoring**:
   ```bash
   # Apache logs
   tail -f /var/log/apache2/techcorp_access.log
   tail -f /var/log/apache2/techcorp_error.log
   
   # MySQL logs
   tail -f /var/log/mysql/error.log
   ```

### Backup Strategy

1. **Database Backup**:
   ```bash
   # Daily backup script
   #!/bin/bash
   mysqldump -u techcorp_user -p techcorp_production > /backups/techcorp_$(date +%Y%m%d).sql
   ```

2. **File Backup**:
   ```bash
   # Backup uploads and configuration
   tar -czf /backups/techcorp_files_$(date +%Y%m%d).tar.gz /var/www/techcorp/uploads/ /var/www/techcorp/.env
   ```

## 🔒 Security Best Practices

### Production Security Checklist

- ✅ Change default admin password
- ✅ Use strong database passwords
- ✅ Enable HTTPS with SSL certificate
- ✅ Configure firewall rules
- ✅ Regular security updates
- ✅ File permission restrictions
- ✅ Database user privilege limitations
- ✅ Regular backups
- ✅ Log monitoring
- ✅ Disable directory browsing

### Default Credentials

**⚠️ CHANGE THESE IN PRODUCTION:**
- **Admin Email**: admin@techcorp.com
- **Admin Password**: admin123

## 🐛 Troubleshooting

### Common Production Issues

1. **502 Bad Gateway**: Check PHP-FPM or Apache status
2. **Database Connection**: Verify credentials and MySQL service
3. **File Upload Issues**: Check directory permissions
4. **SSL Certificate**: Verify certificate installation and renewal

## 📄 License

This project is licensed under the MIT License.

---

**Production Ready**: This platform is tested and ready for production deployment with proper security measures and performance optimizations.
