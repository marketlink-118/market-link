<?php
// Update Honey product image to the new Pixabay URL
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Product;

$newImage = 'https://cdn.pixabay.com/photo/2024/02/15/03/59/honey-8574616_1280.jpg';

$updated = Product::where('name', 'like', '%Honey%')->update([
    'image' => $newImage
]);

echo "\n==> SUCCESS: Updated {$updated} Honey product(s) to {$newImage}!\n";
