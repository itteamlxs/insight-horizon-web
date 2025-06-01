
# TechCorp Solutions - Corporate Website Platform

A modern, responsive corporate website platform built with React, TypeScript, and Tailwind CSS, featuring a comprehensive admin dashboard for content management.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with dark/light theme support
- **Admin Dashboard**: Complete content management system
- **Dynamic Content**: Editable pricing plans, gallery, and news articles
- **Contact Management**: Integrated contact forms with plan selection
- **Video Backgrounds**: Customizable hero section backgrounds
- **SEO Optimized**: Clean URLs and meta tag management
- **Security**: Protected admin routes with authentication

## 📋 Requirements

### Frontend Requirements
- **Node.js**: Version 16.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Backend Requirements (XAMPP)
- **PHP**: Version 8.0 or higher
- **MySQL**: Version 8.0 or higher
- **Apache**: Version 2.4 or higher
- **XAMPP**: Latest version recommended

## 🛠️ Installation Instructions

### Step 1: Download and Install XAMPP

1. Download XAMPP from [https://www.apachefriends.org/](https://www.apachefriends.org/)
2. Run the installer and follow the installation wizard
3. Install XAMPP to the default directory (usually `C:\xampp\` on Windows)
4. Start the XAMPP Control Panel

### Step 2: Start Required Services

1. Open XAMPP Control Panel
2. Click **"Start"** next to **Apache**
3. Click **"Start"** next to **MySQL**
4. Verify both services show **"Running"** status (green background)

### Step 3: Clone the Repository

```bash
# Clone the repository
git clone <your-repository-url>

# Navigate to the project directory
cd techcorp-solutions
```

### Step 4: Set Up Backend Files

1. Navigate to your XAMPP installation directory
2. Open the `htdocs` folder (usually `C:\xampp\htdocs\`)
3. Create a new folder called `techcorp`
4. Copy all files from the `backend` folder in this project to `C:\xampp\htdocs\techcorp\`

Your directory structure should look like:
```
C:\xampp\htdocs\techcorp\
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

### Step 5: Configure Database Connection

1. Open the file `C:\xampp\htdocs\techcorp\.env`
2. Update the database credentials:

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

**Note**: Default XAMPP MySQL credentials are:
- Host: `localhost`
- Port: `3306`
- Username: `root`
- Password: (leave empty)

### Step 6: Create the Database

#### Option A: Using phpMyAdmin (Recommended)
1. Open your browser and go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. Click on the **"SQL"** tab
3. Copy the entire contents of `backend/database/schema.sql`
4. Paste it into the SQL query box
5. Click **"Go"** to execute the script

#### Option B: Using MySQL Command Line
1. Open Command Prompt or Terminal
2. Navigate to MySQL bin directory: `cd C:\xampp\mysql\bin\`
3. Connect to MySQL: `mysql -u root -p`
4. Press Enter when prompted for password (default is empty)
5. Execute the script: `source C:\xampp\htdocs\techcorp\database\schema.sql`

### Step 7: Verify Database Setup

1. Go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. Confirm the `techcorp_db` database was created
3. Verify the following tables exist:
   - `users`
   - `posts`
   - `company_settings`
   - `sessions`

### Step 8: Test Backend API

1. Open your browser
2. Go to [http://localhost/techcorp/api/auth.php?action=verify](http://localhost/techcorp/api/auth.php?action=verify)
3. You should see: `{"authenticated":false}`
4. If you see this response, the backend is working correctly

### Step 9: Install Frontend Dependencies

1. Open a new terminal/command prompt
2. Navigate to the project root directory
3. Install dependencies:

```bash
npm install
```

### Step 10: Start the Development Server

```bash
npm run dev
```

The application will start on [http://localhost:5173](http://localhost:5173)

### Step 11: Access the Application

1. **Frontend**: [http://localhost:5173](http://localhost:5173)
2. **Admin Login**: Click "Admin Login" in the top right corner
3. **Default Credentials**:
   - Email: `admin@techcorp.com`
   - Password: `admin123`

## 🗄️ Database Schema

The platform uses the following main tables:

### Users Table
- `id` (Primary Key)
- `email` (Unique)
- `password_hash`
- `role` (admin)
- `created_at`, `updated_at`

### Posts Table
- `id` (Primary Key)
- `title`, `content`
- `type` (press_release, announcement, company_info)
- `is_public` (Boolean)
- `author_id` (Foreign Key to users)
- `created_at`, `updated_at`

### Company Settings Table
- `id` (Primary Key)
- `company_name`, `description`
- `contact_info` (email, phone, address)
- `social_links`
- `logo_path`

### Sessions Table
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `data`, `expires_at`

## 🔧 Configuration

### Environment Variables
Update `.env` file for your environment:

```env
# Production settings
APP_ENV=production
APP_DEBUG=false
CORS_ORIGIN=https://yourdomain.com

# Database settings
DB_HOST=your-db-host
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
```

### Frontend Configuration
Update `src/config/api.ts` for production:

```typescript
export const API_BASE_URL = 'https://yourdomain.com/api';
```

## 🚀 Deployment

### Production Deployment Steps

1. **Prepare Files**:
   ```bash
   npm run build
   ```

2. **Upload Files**:
   - Upload `dist` folder contents to your web server
   - Upload `backend` folder to your server

3. **Configure Database**:
   - Create production database
   - Import `schema.sql`
   - Update `.env` with production credentials

4. **Set Permissions**:
   ```bash
   chmod 755 uploads/
   chmod 644 .env
   ```

5. **Configure Web Server**:
   - Set document root to `dist` folder
   - Configure URL rewriting for SPA routing

## 🔒 Security Considerations

### For Production:
- Change default admin password immediately
- Use strong database passwords
- Enable HTTPS/SSL
- Set proper file permissions
- Update `CORS_ORIGIN` to your domain
- Set `APP_DEBUG=false`
- Regular security updates

### File Upload Security:
- File type validation
- Size limits enforced
- Secure upload directory

## 🐛 Troubleshooting

### Common Issues:

#### 1. Apache/MySQL Won't Start
- **Issue**: Port conflicts (80, 443, 3306)
- **Solution**: 
  - Stop other web servers (IIS, Skype)
  - Change ports in XAMPP configuration
  - Restart XAMPP services

#### 2. Database Connection Failed
- **Check**: XAMPP MySQL service is running
- **Check**: Credentials in `.env` are correct
- **Check**: Database `techcorp_db` exists

#### 3. 404 Errors on API Calls
- **Check**: Apache is running
- **Check**: Files are in correct directory
- **Check**: URL paths are correct

#### 4. CORS Errors
- **Check**: `CORS_ORIGIN` in `.env` matches frontend URL
- **Check**: Both frontend and backend are running

#### 5. File Upload Issues
- **Check**: `uploads` directory exists and has write permissions
- **Check**: PHP settings in `php.ini`:
  ```ini
  file_uploads = On
  upload_max_filesize = 5M
  post_max_size = 5M
  max_execution_time = 300
  ```

## 📱 Features Overview

### Public Features:
- Responsive homepage with hero video
- Interactive pricing plans
- Image gallery
- News and announcements
- Contact forms
- Theme switching (dark/light)

### Admin Features:
- Secure authentication
- Content management (posts, pages)
- Media upload and management
- Pricing plan management
- Gallery management
- Company settings
- User management

## 🤝 Support

For additional support:
1. Check the troubleshooting section above
2. Verify all services are running in XAMPP
3. Check browser console for JavaScript errors
4. Check XAMPP logs in `C:\xampp\apache\logs\`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔄 Version History

- **v1.0.0**: Initial release with basic CMS functionality
- **v1.1.0**: Added pricing management and contact forms
- **v1.2.0**: Enhanced gallery management and video backgrounds

---

**Last Updated**: December 2024
**Tested With**: XAMPP 8.2.x, PHP 8.2, MySQL 8.0, Node.js 18.x
