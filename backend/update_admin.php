<?php
// Script to update Admin credentials
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Check if marketlink118@gmail.com already exists in the database
$existing = User::where('email', 'marketlink118@gmail.com')->first();

if ($existing) {
    $existing->name = 'System Admin';
    $existing->role = 'admin';
    $existing->password = Hash::make('#marketlink118@');
    $existing->is_active = true;
    $existing->save();
    echo "\n==> SUCCESS: Existing user marketlink118@gmail.com promoted to Admin with password #marketlink118@!\n";
} else {
    $admin = User::where('role', 'admin')->first() ?: User::find(1);
    if ($admin) {
        $admin->name = 'System Admin';
        $admin->email = 'marketlink118@gmail.com';
        $admin->password = Hash::make('#marketlink118@');
        $admin->role = 'admin';
        $admin->is_active = true;
        $admin->save();
        echo "\n==> SUCCESS: Admin credentials updated to marketlink118@gmail.com with password #marketlink118@!\n";
    } else {
        User::create([
            'name' => 'System Admin',
            'email' => 'marketlink118@gmail.com',
            'password' => Hash::make('#marketlink118@'),
            'role' => 'admin',
            'is_active' => true,
        ]);
        echo "\n==> SUCCESS: Created fresh Admin user marketlink118@gmail.com with password #marketlink118@!\n";
    }
}
