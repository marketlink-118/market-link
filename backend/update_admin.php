<?php
// Script to update Admin credentials
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

$admin = User::where('role', 'admin')->first() ?: User::find(1);

if ($admin) {
    $admin->email = 'marketlink118@gmail.com';
    $admin->password = Hash::make('#marketlink118@');
    $admin->save();
    echo "\n==> SUCCESS: Admin credentials updated!\n";
    echo "==> Email: marketlink118@gmail.com\n";
    echo "==> Password: #marketlink118@\n\n";
} else {
    echo "\n==> ERROR: Admin user not found.\n\n";
}
