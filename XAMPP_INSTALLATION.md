
# TechCorp Solutions - XAMPP Installation Guide

This guide will help you set up the TechCorp Solutions website on your local XAMPP environment.

## Prerequisites

- XAMPP installed on your system
- Basic knowledge of PHP and MySQL
- Text editor (VS Code, Notepad++, etc.)

## Step-by-Step Installation

### 1. Download and Install XAMPP

1. Download XAMPP from [https://www.apachefriends.org/](https://www.apachefriends.org/)
2. Install XAMPP following the installer instructions
3. Start XAMPP Control Panel

### 2. Start Required Services

1. Open XAMPP Control Panel
2. Start **Apache** service (click "Start" button)
3. Start **MySQL** service (click "Start" button)
4. Verify both services are running (they should show "Running" status)

### 3. Set Up the Project Files

1. Navigate to your XAMPP installation directory (usually `C:\xampp\` on Windows)
2. Go to the `htdocs` folder
3. Create a new folder called `techcorp` inside `htdocs`
4. Copy all the backend files from this project into `C:\xampp\htdocs\techcorp\`

Your directory structure should look like:
```
C:\xampp\htdocs\techcorp\
├── backend/
│   ├── api/
│   │   └── auth.php
│   ├── config/
│   │   └── database.php
│   ├── database/
│   │   └── schema.sql
│   ├── includes/
│   │   └── security.php
│   └── .env
```

### 4. Create the Database

1. Open your web browser and go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. Click on the "SQL" tab
3. Copy and paste the contents of `backend/database/schema.sql`
4. Click "Go" to execute the SQL script
5. Verify that the database `techcorp_db` was created with the following tables:
   - `users`
   - `posts`
   - `company_settings`
   - `sessions`

### 5. Configure Database Connection

1. Open `backend/.env` file in your text editor
2. Update the database credentials if needed:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=techcorp_db
   DB_USER=root
   DB_PASSWORD=
   ```
   
   **Note:** Default XAMPP MySQL settings:
   - Host: `localhost`
   - Port: `3306`
   - Username: `root`
   - Password: (leave empty)

### 6. Test the Backend API

1. Open your browser and go to [http://localhost/techcorp/backend/api/auth.php?action=verify](http://localhost/techcorp/backend/api/auth.php?action=verify)
2. You should see a JSON response like: `{"authenticated":false}`
3. If you see this response, the backend is working correctly

### 7. Set Up the Frontend (React)

1. Make sure you have Node.js installed on your system
2. Open a terminal/command prompt
3. Navigate to the frontend project directory
4. Run the following commands:
   ```bash
   npm install
   npm run dev
   ```
5. The React application should start on [http://localhost:5173](http://localhost:5173)

### 8. Configure CORS (if needed)

If you encounter CORS errors, update the `CORS_ORIGIN` in your `.env` file:
```
CORS_ORIGIN=http://localhost:5173
```

### 9. Test the Complete Application

1. Open [http://localhost:5173](http://localhost:5173) in your browser
2. You should see the TechCorp Solutions homepage
3. Click on "Admin Login" in the top right corner
4. Use these credentials to test the login:
   - Email: `admin@techcorp.com`
   - Password: `admin123`

## Default Admin Credentials

- **Email:** admin@techcorp.com
- **Password:** admin123

## Troubleshooting

### Common Issues and Solutions

#### 1. Apache/MySQL Won't Start
- **Issue:** Port conflicts (80, 443, 3306 already in use)
- **Solution:** 
  - Stop other web servers (IIS, other Apache instances)
  - Change Apache ports in XAMPP (Config → httpd.conf)
  - Stop MySQL services running outside XAMPP

#### 2. Database Connection Failed
- **Check:** MySQL service is running in XAMPP
- **Check:** Database credentials in `.env` file are correct
- **Check:** Database `techcorp_db` exists in phpMyAdmin

#### 3. 404 Error on API Calls
- **Check:** Apache is running
- **Check:** Files are in correct directory (`C:\xampp\htdocs\techcorp\`)
- **Check:** URL path is correct

#### 4. CORS Errors
- **Solution:** Update `CORS_ORIGIN` in `.env` file to match your frontend URL
- **Solution:** Ensure both frontend and backend are running

#### 5. File Upload Issues
- **Check:** `uploads` directory exists and has write permissions
- **Check:** PHP file upload settings in `php.ini`:
  ```ini
  file_uploads = On
  upload_max_filesize = 5M
  post_max_size = 5M
  ```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Change Default Passwords:** Update the admin password after installation
2. **Environment Variables:** Never commit `.env` files with real credentials to version control
3. **File Permissions:** Ensure proper file permissions on uploads directory
4. **HTTPS:** Use HTTPS in production environments
5. **Database Access:** Restrict database access in production

## Production Deployment

For production deployment:

1. Use a proper web server (Apache/Nginx with SSL)
2. Use a dedicated MySQL server with strong credentials
3. Enable HTTPS and update CORS settings
4. Set `APP_ENV=production` and `APP_DEBUG=false`
5. Implement proper backup strategies
6. Use environment-specific configuration files

## File Structure Reference

```
techcorp/
├── backend/
│   ├── api/
│   │   ├── auth.php          # Authentication endpoints
│   │   ├── posts.php         # Post management endpoints
│   │   └── upload.php        # File upload endpoints
│   ├── config/
│   │   └── database.php      # Database connection
│   ├── database/
│   │   └── schema.sql        # Database structure
│   ├── includes/
│   │   └── security.php      # Security functions
│   ├── uploads/              # Uploaded files directory
│   └── .env                  # Environment configuration
└── frontend/                 # React application files
```

## Support

If you encounter any issues during installation:

1. Check the XAMPP logs in `C:\xampp\apache\logs\`
2. Check PHP error logs
3. Verify all services are running in XAMPP Control Panel
4. Ensure all file paths are correct

For additional help, refer to the XAMPP documentation or create an issue in the project repository.
