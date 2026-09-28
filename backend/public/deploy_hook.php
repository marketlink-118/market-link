<?php
/**
 * MarketLink Automatic Deployment Hook
 * Triggered automatically by GitHub Webhooks or manually via browser
 */

$secret_token = 'marketlink_deploy_2026';

if (!isset($_GET['token']) || $_GET['token'] !== $secret_token) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Unauthorized access. Valid token required.']);
    exit;
}

$backend_dir = realpath(__DIR__ . '/..');

// 1. Pull latest code from GitHub
$git_output = shell_exec("cd {$backend_dir} && git pull origin main 2>&1");

// 2. Run database updates if present
$admin_output = '';
if (file_exists("{$backend_dir}/update_admin.php")) {
    $admin_output = shell_exec("cd {$backend_dir} && php update_admin.php 2>&1");
}
if (file_exists("{$backend_dir}/update_honey_image.php")) {
    $admin_output .= "\n" . shell_exec("cd {$backend_dir} && php update_honey_image.php 2>&1");
}

// 3. Clear Laravel caches
$cache_output = shell_exec("cd {$backend_dir} && php artisan config:clear && php artisan cache:clear && php artisan route:clear 2>&1");

header('Content-Type: text/plain');
echo "========================================\n";
echo "  MARKETLINK AUTO-DEPLOYMENT REPORT    \n";
echo "========================================\n\n";
echo "[1] GIT PULL:\n" . ($git_output ?: 'No output') . "\n\n";
echo "[2] ADMIN UPDATE:\n" . ($admin_output ?: 'Skipped') . "\n\n";
echo "[3] CACHE REFRESH:\n" . ($cache_output ?: 'No output') . "\n\n";
echo "STATUS: Deployment finished successfully at " . date('Y-m-d H:i:s') . "\n";
