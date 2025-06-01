
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

## 📋 System Requirements

### Frontend Requirements
- **Node.js**: Version 16.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Backend Requirements (XAMPP)
- **PHP**: Version 8.0 or higher
- **MySQL**: Version 8.0 or higher
- **Apache**: Version 2.4 or higher
- **XAMPP**: Latest version recommended

## 🛠️ Step-by-Step Installation Guide

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

3. **Start XAMPP Control Panel**:
   - Windows: Search for "XAMPP Control Panel" in Start Menu
   - Linux: Run `sudo /opt/lampp/lampp start`
   - Mac: Open XAMPP from Applications folder

### Step 2: Start Required Services

1. **Open XAMPP Control Panel**
2. **Start Apache**:
   - Click the "Start" button next to Apache
   - Wait for the status to show "Running" (green background)
   - Default port: 80 (HTTP) and 443 (HTTPS)

3. **Start MySQL**:
   - Click the "Start" button next to MySQL
   - Wait for the status to show "Running" (green background)
   - Default port: 3306

4. **Verify Services**:
   - Both Apache and MySQL should show "Running" status
   - If ports are blocked, click "Config" to change ports

### Step 3: Set Up Project Structure

1. **Navigate to XAMPP Directory**:
   ```bash
   # Windows
   cd C:\xampp\htdocs\
   
   # Linux
   cd /opt/lampp/htdocs/
   
   # Mac
   cd /Applications/XAMPP/htdocs/
   ```

2. **Create Project Directory**:
   ```bash
   mkdir techcorp
   cd techcorp
   ```

3. **Copy Backend Files**:
   - Copy all files from the `backend` folder in this project
   - Your structure should look like:
   ```
   htdocs/techcorp/
   ├── api/
   │   ├── auth.php
   │   ├── posts.php
   │   └── upload.php
   ├── config/
   │   └── database.php
   ├── database/
   │   └── schema.sql
   ├── includes/
   │   └── security.php
   ├── uploads/
   └── .env
   ```

### Step 4: Configure Database Connection

1. **Edit Environment File**:
   ```bash
   # Navigate to techcorp directory
   cd C:\xampp\htdocs\techcorp\  # Windows
   # or
   cd /opt/lampp/htdocs/techcorp/  # Linux/Mac
   ```

2. **Update `.env` file**:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=techcorp_db
   DB_USER=root
   DB_PASSWORD=
   
   # Application Configuration
   APP_ENV=development
   APP_DEBUG=true
   CORS_ORIGIN=http://localhost:5173
   
   # Security
   SESSION_LIFETIME=3600
   ```

   **Note**: Default XAMPP MySQL credentials:
   - Host: `localhost`
   - Port: `3306`
   - Username: `root`
   - Password: (leave empty)

### Step 5: Create Database Structure

#### Method A: Using phpMyAdmin (Recommended)

1. **Access phpMyAdmin**:
   - Open browser and go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
   - Login with username: `root`, password: (leave empty)

2. **Execute SQL Script**:
   - Click on the **"SQL"** tab at the top
   - Copy the complete MySQL script below and paste it into the query box
   - Click **"Go"** to execute

3. **MySQL Database Script**:
   ```sql
   -- TechCorp Database Schema
   -- Creates the complete database structure for the platform
   
   -- Create database
   CREATE DATABASE IF NOT EXISTS techcorp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   USE techcorp_db;
   
   -- Users table for admin authentication
   CREATE TABLE IF NOT EXISTS users (
       id INT PRIMARY KEY AUTO_INCREMENT,
       email VARCHAR(255) UNIQUE NOT NULL,
       password_hash VARCHAR(255) NOT NULL,
       role ENUM('admin') DEFAULT 'admin',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       INDEX idx_email (email)
   );
   
   -- Posts table for news, announcements, and content
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
   
   -- Company settings for dynamic configuration
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
   ```

#### Method B: Using MySQL Command Line

1. **Open Command Line**:
   ```bash
   # Windows
   cd C:\xampp\mysql\bin\
   mysql -u root -p
   
   # Linux/Mac
   /opt/lampp/bin/mysql -u root -p
   ```

2. **Execute Script**:
   ```sql
   source C:\xampp\htdocs\techcorp\database\schema.sql;
   ```

### Step 6: Verify Database Setup

1. **Check Database Creation**:
   - Go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
   - Confirm `techcorp_db` database exists in the left sidebar
   - Verify the following tables are created:
     - `users` (1 record - admin user)
     - `posts` (3 sample records)
     - `company_settings` (1 record)
     - `sessions` (empty)

2. **Test Data Verification**:
   - Click on `users` table → Browse
   - Confirm admin user exists: `admin@techcorp.com`
   - Click on `posts` table → Browse
   - Confirm 3 sample posts exist

### Step 7: Test Backend API

1. **Test Authentication Endpoint**:
   ```
   http://localhost/techcorp/api/auth.php?action=verify
   ```
   **Expected Response**: `{"authenticated":false}`

2. **Test Posts Endpoint**:
   ```
   http://localhost/techcorp/api/posts.php?action=getPublic
   ```
   **Expected Response**: JSON array with 3 sample posts

3. **If you see JSON responses, the backend is working correctly**

### Step 8: Install Frontend Dependencies

1. **Clone/Download Project**:
   ```bash
   git clone <your-repository-url>
   cd techcorp-solutions
   ```

2. **Install Node Dependencies**:
   ```bash
   npm install
   ```

3. **Verify Package Installation**:
   ```bash
   npm list --depth=0
   ```

### Step 9: Configure Frontend API Connection

1. **Update API Configuration** (if needed):
   ```typescript
   // src/config/api.ts
   export const API_BASE_URL = 'http://localhost/techcorp/api';
   ```

### Step 10: Start Development Server

1. **Start Frontend**:
   ```bash
   npm run dev
   ```

2. **Access Application**:
   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend API**: [http://localhost/techcorp/api/](http://localhost/techcorp/api/)
   - **phpMyAdmin**: [http://localhost/phpmyadmin](http://localhost/phpmyadmin)

### Step 11: Admin Access

1. **Login to Admin Panel**:
   - Click "Admin Login" in the top right corner
   - **Email**: `admin@techcorp.com`
   - **Password**: `admin123`

2. **Admin Features**:
   - Content Management (Create/Edit Posts)
   - Pricing Plan Management
   - Company Settings
   - Media Upload (Images/Videos)
   - Video Background Configuration (1920x720px optimized)

## 🗄️ Database Schema Details

### Tables Structure

#### users
- `id` (Primary Key, Auto Increment)
- `email` (Unique, VARCHAR(255))
- `password_hash` (VARCHAR(255))
- `role` (ENUM: 'admin')
- `created_at`, `updated_at` (Timestamps)

#### posts
- `id` (Primary Key, Auto Increment)
- `title` (VARCHAR(500))
- `content` (TEXT)
- `type` (ENUM: 'press_release', 'announcement', 'company_info')
- `is_public` (BOOLEAN)
- `author_id` (Foreign Key → users.id)
- `created_at`, `updated_at` (Timestamps)

#### company_settings
- `id` (Primary Key, Auto Increment)
- `company_name` (VARCHAR(255))
- `description`, `address` (TEXT)
- `email`, `phone` (VARCHAR)
- `logo_path` (VARCHAR(500))
- `social_*` (Social media links)
- `updated_at` (Timestamp)

#### sessions
- `id` (VARCHAR(128), Primary Key)
- `user_id` (Foreign Key → users.id)
- `data` (TEXT)
- `created_at`, `expires_at` (Timestamps)

## 🐛 Troubleshooting Guide

### Common Installation Issues

#### 1. Apache/MySQL Won't Start
**Problem**: Port conflicts (80, 443, 3306 in use)
**Solutions**:
```bash
# Check what's using the ports
netstat -an | find "80"
netstat -an | find "3306"

# Stop conflicting services
net stop "World Wide Web Publishing Service"  # IIS
net stop "SQL Server (MSSQLSERVER)"  # SQL Server
```

#### 2. Database Connection Failed
**Checklist**:
- ✅ MySQL service running in XAMPP
- ✅ Database `techcorp_db` exists
- ✅ Credentials in `.env` match XAMPP defaults
- ✅ No firewall blocking port 3306

#### 3. 404 Errors on API Calls
**Solutions**:
- Verify Apache is running
- Check file paths: `C:\xampp\htdocs\techcorp\api\auth.php`
- Test direct access: `http://localhost/techcorp/api/auth.php`

#### 4. CORS Errors
**Fix**:
```env
# Update .env file
CORS_ORIGIN=http://localhost:5173
```

#### 5. File Upload Issues
**Solutions**:
```ini
# Check php.ini settings
file_uploads = On
upload_max_filesize = 5M
post_max_size = 5M
max_execution_time = 300
```

### Performance Optimization

#### Video Background (1920x720px)
- Uses optimized iframe embedding
- Responsive scaling for smaller screens
- Brightness filter for text readability
- Auto-loop and mute for better UX

## 🔒 Security Configuration

### Production Security Checklist

1. **Change Default Credentials**:
   ```sql
   UPDATE users SET password_hash = PASSWORD('new_secure_password') 
   WHERE email = 'admin@techcorp.com';
   ```

2. **Environment Security**:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   DB_PASSWORD=secure_database_password
   ```

3. **File Permissions**:
   ```bash
   chmod 755 uploads/
   chmod 644 .env
   chown www-data:www-data uploads/  # Linux
   ```

## 🚀 Deployment

### Production Deployment Steps

1. **Build Frontend**:
   ```bash
   npm run build
   ```

2. **Upload Files**:
   - Upload `dist/` contents to web server document root
   - Upload `backend/` to server (outside document root recommended)

3. **Configure Production Database**:
   - Create production MySQL database
   - Import `schema.sql`
   - Update `.env` with production credentials

4. **Web Server Configuration**:
   ```apache
   # .htaccess for Apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

## 📱 Features Overview

### Public Features
- ✅ Responsive homepage with optimized video backgrounds (1920x720px)
- ✅ Interactive pricing plans with contact forms
- ✅ Dynamic news and announcements
- ✅ Theme switching (dark/light mode)
- ✅ Mobile-optimized navigation

### Admin Features
- ✅ Secure authentication system
- ✅ Content management (posts, announcements)
- ✅ Media upload and management
- ✅ Pricing plan configuration
- ✅ Company settings management
- ✅ Video background configuration

## 🤝 Support

If you encounter issues:

1. **Check XAMPP Status**: Ensure Apache and MySQL are running
2. **Verify File Paths**: Confirm all files are in correct directories
3. **Check Browser Console**: Look for JavaScript errors
4. **Review XAMPP Logs**: Check `C:\xampp\apache\logs\error.log`
5. **Test API Endpoints**: Verify backend is responding correctly

## 📄 License

This project is licensed under the MIT License.

## 🔄 Version History

- **v1.0.0**: Initial release with basic CMS functionality
- **v1.1.0**: Added pricing management and contact forms  
- **v1.2.0**: Enhanced gallery management and video backgrounds
- **v1.3.0**: Optimized video display (1920x720px) and improved XAMPP documentation

---

**Last Updated**: December 2024  
**Tested With**: XAMPP 8.2.x, PHP 8.2, MySQL 8.0, Node.js 18.x
