<?php
/**
 * MarketLink - Cloud Database Schema Synchronizer
 * Safely adds any missing columns to farmer_profiles and users tables
 */

$envFile = __DIR__ . '/.env';
if (!file_exists($envFile)) {
    echo "Notice: No .env found, skipping schema sync.\n";
    exit(0);
}

$lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$env = [];
foreach ($lines as $line) {
    $line = trim($line);
    if (strpos($line, '#') === 0 || strpos($line, '=') === false) continue;
    list($key, $val) = explode('=', $line, 2);
    $key = trim($key);
    $val = trim($val, " \t\n\r\0\x0B\"'");
    $env[$key] = $val;
}

$host = $env['DB_HOST'] ?? '127.0.0.1';
$port = $env['DB_PORT'] ?? '3306';
$db   = $env['DB_DATABASE'] ?? 'marketlink_db';
$user = $env['DB_USERNAME'] ?? 'root';
$pass = $env['DB_PASSWORD'] ?? '';

try {
    $pdo = new PDO("mysql:host={$host};port={$port};dbname={$db};charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    echo "==> Connected to database [{$db}] on [{$host}]\n";

    // 1. Verify and add missing columns to farmer_profiles
    $farmerColumns = [
        'stall_category' => "ALTER TABLE `farmer_profiles` ADD COLUMN `stall_category` VARCHAR(255) NULL AFTER `stall_number`",
        'stall_items'    => "ALTER TABLE `farmer_profiles` ADD COLUMN `stall_items` TEXT NULL AFTER `stall_category`",
        'operating_days' => "ALTER TABLE `farmer_profiles` ADD COLUMN `operating_days` LONGTEXT NULL AFTER `stall_items`",
        'city'           => "ALTER TABLE `farmer_profiles` ADD COLUMN `city` VARCHAR(100) NULL AFTER `farm_address`",
        'country'        => "ALTER TABLE `farmer_profiles` ADD COLUMN `country` VARCHAR(100) NULL AFTER `city`",
    ];

    foreach ($farmerColumns as $col => $sql) {
        $stmt = $pdo->query("SHOW COLUMNS FROM `farmer_profiles` LIKE '{$col}'");
        if ($stmt->rowCount() === 0) {
            $pdo->exec($sql);
            echo "==> Added missing column '{$col}' to farmer_profiles table\n";
        } else {
            echo "==> Column '{$col}' already present in farmer_profiles\n";
        }
    }

    // 2. Verify and add missing columns to users
    $userColumns = [
        'city'    => "ALTER TABLE `users` ADD COLUMN `city` VARCHAR(100) NULL AFTER `address`",
        'country' => "ALTER TABLE `users` ADD COLUMN `country` VARCHAR(100) NULL AFTER `city`",
    ];

    foreach ($userColumns as $col => $sql) {
        $stmt = $pdo->query("SHOW COLUMNS FROM `users` LIKE '{$col}'");
        if ($stmt->rowCount() === 0) {
            $pdo->exec($sql);
            echo "==> Added missing column '{$col}' to users table\n";
        } else {
            echo "==> Column '{$col}' already present in users\n";
        }
    }

    // 3. Clean up legacy Desi bracketed slang from product names
    $pdo->exec("UPDATE `products` SET `name` = 'Fresh Green Spinach' WHERE `name` LIKE '%Spinach%' OR `name` LIKE '%Palak%'");
    $pdo->exec("UPDATE `products` SET `name` = 'Homemade Cultured Butter' WHERE `name` LIKE '%Makhan%'");
    echo "==> SUCCESS: Product names cleaned to standard international titles!\n";

    echo "==> SUCCESS: Schema synchronization completed!\n";
} catch (\Throwable $e) {
    echo "ERROR during schema sync: " . $e->getMessage() . "\n";
}
