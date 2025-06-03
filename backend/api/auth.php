
<?php
/**
 * Enhanced Authentication API Endpoints
 * Handles user login, logout, and session management with improved security
 */

require_once '../config/database.php';
require_once '../includes/security.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . ($_ENV['CORS_ORIGIN'] ?? 'http://localhost:3000'));
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

session_start();

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

// Sanitize all input data
if ($input) {
    $input = sanitizeArray($input);
}

switch ($method) {
    case 'POST':
        if (isset($_GET['action'])) {
            switch ($_GET['action']) {
                case 'login':
                    handleLogin($db, $input);
                    break;
                case 'logout':
                    handleLogout();
                    break;
                default:
                    http_response_code(404);
                    echo json_encode(['error' => 'Action not found']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Action required']);
        }
        break;
    
    case 'GET':
        if (isset($_GET['action']) && $_GET['action'] === 'verify') {
            verifySession($db);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid request']);
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function handleLogin($db, $input) {
    try {
        // Rate limiting
        $clientIP = getClientIP();
        if (!checkRateLimit('login_' . $clientIP, 5, 900)) { // 5 attempts per 15 minutes
            logSecurityEvent('rate_limit_exceeded', ['action' => 'login', 'ip' => $clientIP]);
            http_response_code(429);
            echo json_encode(['error' => 'Too many login attempts. Please try again later.']);
            return;
        }

        // Validate input
        if (!isset($input['email']) || !isset($input['password'])) {
            logSecurityEvent('invalid_login_attempt', ['missing_fields' => true]);
            http_response_code(400);
            echo json_encode(['error' => 'Email and password required']);
            return;
        }

        $email = validateEmail($input['email']);
        $password = $input['password'];

        if (!$email) {
            logSecurityEvent('invalid_login_attempt', ['invalid_email' => $input['email']]);
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email format']);
            return;
        }

        // Password strength validation
        if (strlen($password) < 8) {
            http_response_code(400);
            echo json_encode(['error' => 'Password must be at least 8 characters']);
            return;
        }

        // Get user from database with prepared statement
        $stmt = $db->prepare("SELECT id, email, password_hash, role, is_active FROM users WHERE email = ? AND is_active = 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            // Successful login
            session_regenerate_id(true);
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_role'] = $user['role'];
            $_SESSION['session_start'] = time();
            $_SESSION['last_regeneration'] = time();
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
            $_SESSION['csrf_token_time'] = time();

            // Update last login time
            $updateStmt = $db->prepare("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?");
            $updateStmt->execute([$user['id']]);

            // Log successful login
            logSecurityEvent('successful_login', ['user_id' => $user['id'], 'email' => $email]);

            echo json_encode([
                'success' => true,
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'role' => $user['role'],
                    'createdAt' => date('c')
                ],
                'csrf_token' => $_SESSION['csrf_token']
            ]);
        } else {
            // Failed login
            logSecurityEvent('failed_login_attempt', ['email' => $email, 'ip' => $clientIP]);
            
            // Add delay to prevent timing attacks
            usleep(random_int(100000, 500000)); // 0.1-0.5 second delay
            
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
        }
    } catch (Exception $e) {
        logSecurityEvent('login_error', ['error' => $e->getMessage()]);
        http_response_code(500);
        echo json_encode(['error' => 'Login failed']);
        error_log("Login error: " . $e->getMessage());
    }
}

function handleLogout() {
    session_start();
    
    if (isset($_SESSION['user_id'])) {
        logSecurityEvent('user_logout', ['user_id' => $_SESSION['user_id']]);
    }
    
    // Clear all session data
    $_SESSION = array();
    
    // Delete session cookie
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    
    session_destroy();
    echo json_encode(['success' => true]);
}

function verifySession($db) {
    if (isset($_SESSION['user_id']) && isset($_SESSION['session_start'])) {
        // Check session timeout
        if ((time() - $_SESSION['session_start']) > 86400) { // 24 hours
            session_destroy();
            echo json_encode(['authenticated' => false, 'reason' => 'session_expired']);
            return;
        }

        $stmt = $db->prepare("SELECT id, email, role FROM users WHERE id = ? AND is_active = 1");
        $stmt->execute([$_SESSION['user_id']]);
        $user = $stmt->fetch();

        if ($user) {
            echo json_encode([
                'authenticated' => true,
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'role' => $user['role'],
                    'createdAt' => date('c')
                ],
                'csrf_token' => generateCSRFToken()
            ]);
        } else {
            logSecurityEvent('invalid_session', ['user_id' => $_SESSION['user_id']]);
            session_destroy();
            echo json_encode(['authenticated' => false, 'reason' => 'user_not_found']);
        }
    } else {
        echo json_encode(['authenticated' => false, 'reason' => 'no_session']);
    }
}
?>
