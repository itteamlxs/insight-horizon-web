
<?php
/**
 * Enhanced Security Functions
 * Contains security utilities for input validation, XSS prevention, CSRF protection, and more
 */

/**
 * Sanitize input to prevent XSS attacks with enhanced protection
 */
function sanitizeInput($input) {
    if (is_string($input)) {
        // Remove null bytes
        $input = str_replace(chr(0), '', $input);
        
        // Trim whitespace
        $input = trim($input);
        
        // Convert special characters to HTML entities
        $input = htmlspecialchars($input, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        
        // Remove potential script tags and event handlers
        $input = preg_replace('/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi', '', $input);
        $input = preg_replace('/on\w+\s*=\s*["\'][^"\']*["\']/i', '', $input);
        $input = preg_replace('/javascript:/i', '', $input);
        
        return $input;
    }
    return $input;
}

/**
 * Validate and sanitize array of inputs recursively
 */
function sanitizeArray($array) {
    $sanitized = [];
    foreach ($array as $key => $value) {
        $sanitizedKey = sanitizeInput($key);
        if (is_array($value)) {
            $sanitized[$sanitizedKey] = sanitizeArray($value);
        } else {
            $sanitized[$sanitizedKey] = sanitizeInput($value);
        }
    }
    return $sanitized;
}

/**
 * Generate cryptographically secure CSRF token
 */
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token']) || !isset($_SESSION['csrf_token_time']) || 
        (time() - $_SESSION['csrf_token_time']) > 3600) { // Token expires after 1 hour
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        $_SESSION['csrf_token_time'] = time();
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF token with timing attack protection
 */
function verifyCSRFToken($token) {
    if (!isset($_SESSION['csrf_token']) || !isset($_SESSION['csrf_token_time'])) {
        return false;
    }
    
    // Check token expiration (1 hour)
    if ((time() - $_SESSION['csrf_token_time']) > 3600) {
        unset($_SESSION['csrf_token'], $_SESSION['csrf_token_time']);
        return false;
    }
    
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Check if user is authenticated with session validation
 */
function requireAuth() {
    session_start();
    
    // Validate session
    if (!isset($_SESSION['user_id']) || !isset($_SESSION['session_start'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Authentication required']);
        exit;
    }
    
    // Check session timeout (24 hours)
    if ((time() - $_SESSION['session_start']) > 86400) {
        session_destroy();
        http_response_code(401);
        echo json_encode(['error' => 'Session expired']);
        exit;
    }
    
    // Regenerate session ID periodically for security
    if (!isset($_SESSION['last_regeneration']) || 
        (time() - $_SESSION['last_regeneration']) > 1800) { // 30 minutes
        session_regenerate_id(true);
        $_SESSION['last_regeneration'] = time();
    }
}

/**
 * Enhanced file upload validation with MIME type verification
 */
function validateFileUpload($file, $allowedTypes = ['jpg', 'jpeg', 'png'], $maxSize = 5242880) {
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['valid' => false, 'error' => 'Upload failed'];
    }

    if ($file['size'] > $maxSize) {
        return ['valid' => false, 'error' => 'File too large'];
    }

    // Validate file name
    $fileName = basename($file['name']);
    if (strpos($fileName, '..') !== false || 
        strpos($fileName, '/') !== false || 
        strpos($fileName, '\\') !== false) {
        return ['valid' => false, 'error' => 'Invalid file name'];
    }

    $fileInfo = pathinfo($fileName);
    $extension = strtolower($fileInfo['extension'] ?? '');

    if (!in_array($extension, $allowedTypes)) {
        return ['valid' => false, 'error' => 'Invalid file type'];
    }

    // Verify actual file type using multiple methods
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    $allowedMimes = [
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'png' => 'image/png',
        'gif' => 'image/gif',
        'pdf' => 'application/pdf'
    ];

    if (!isset($allowedMimes[$extension]) || 
        $mimeType !== $allowedMimes[$extension]) {
        return ['valid' => false, 'error' => 'File content does not match extension'];
    }

    // Additional security checks for images
    if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif'])) {
        $imageInfo = getimagesize($file['tmp_name']);
        if ($imageInfo === false) {
            return ['valid' => false, 'error' => 'Invalid image file'];
        }
        
        // Check for reasonable image dimensions
        if ($imageInfo[0] > 5000 || $imageInfo[1] > 5000) {
            return ['valid' => false, 'error' => 'Image dimensions too large'];
        }
    }

    return ['valid' => true];
}

/**
 * Enhanced rate limiting with IP-based tracking
 */
function checkRateLimit($identifier, $maxAttempts = 10, $timeWindow = 900) {
    $clientIP = getClientIP();
    $cacheKey = md5($identifier . '_' . $clientIP);
    $cacheFile = sys_get_temp_dir() . '/rate_limit_' . $cacheKey;
    
    if (file_exists($cacheFile)) {
        $data = json_decode(file_get_contents($cacheFile), true);
        if (time() - $data['first_attempt'] < $timeWindow) {
            if ($data['attempts'] >= $maxAttempts) {
                // Log suspicious activity
                error_log("Rate limit exceeded for IP: $clientIP, Identifier: $identifier");
                return false;
            }
            $data['attempts']++;
        } else {
            $data = ['attempts' => 1, 'first_attempt' => time()];
        }
    } else {
        $data = ['attempts' => 1, 'first_attempt' => time()];
    }
    
    file_put_contents($cacheFile, json_encode($data));
    return true;
}

/**
 * Get client IP address with proxy support
 */
function getClientIP() {
    $ipKeys = ['HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'HTTP_CLIENT_IP', 'REMOTE_ADDR'];
    
    foreach ($ipKeys as $key) {
        if (!empty($_SERVER[$key])) {
            $ips = explode(',', $_SERVER[$key]);
            $ip = trim($ips[0]);
            
            if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                return $ip;
            }
        }
    }
    
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

/**
 * Validate email with enhanced security
 */
function validateEmail($email) {
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    
    // Check email length
    if (strlen($email) > 254) {
        return false;
    }
    
    // Additional checks for suspicious patterns
    $suspiciousPatterns = [
        '/\.\./i',
        '/javascript:/i',
        '/<script/i',
        '/\0/',
    ];
    
    foreach ($suspiciousPatterns as $pattern) {
        if (preg_match($pattern, $email)) {
            return false;
        }
    }
    
    return $email;
}

/**
 * Secure password hashing
 */
function hashPassword($password) {
    return password_hash($password, PASSWORD_ARGON2ID, [
        'memory_cost' => 65536, // 64 MB
        'time_cost' => 4,       // 4 iterations
        'threads' => 3,         // 3 threads
    ]);
}

/**
 * Set security headers
 */
function setSecurityHeaders() {
    // Prevent clickjacking
    header('X-Frame-Options: DENY');
    
    // XSS protection
    header('X-XSS-Protection: 1; mode=block');
    
    // Content type sniffing
    header('X-Content-Type-Options: nosniff');
    
    // HSTS (if using HTTPS)
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
        header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
    }
    
    // Content Security Policy
    $csp = "default-src 'self'; " .
           "script-src 'self' 'unsafe-inline'; " .
           "style-src 'self' 'unsafe-inline'; " .
           "img-src 'self' data: https:; " .
           "font-src 'self'; " .
           "connect-src 'self'; " .
           "frame-ancestors 'none'; " .
           "base-uri 'self'; " .
           "form-action 'self'";
    
    header("Content-Security-Policy: $csp");
    
    // Referrer policy
    header('Referrer-Policy: strict-origin-when-cross-origin');
}

/**
 * Log security events
 */
function logSecurityEvent($event, $details = []) {
    $logEntry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'ip' => getClientIP(),
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        'event' => $event,
        'details' => $details
    ];
    
    error_log('SECURITY: ' . json_encode($logEntry));
}

// Set security headers for all requests
setSecurityHeaders();
?>
