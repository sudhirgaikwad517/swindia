<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$configFile = __DIR__ . '/gemini_config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Gemini config missing. Copy gemini_config.example.php to gemini_config.php']);
    exit;
}

require_once $configFile;

if (!defined('GEMINI_API_KEY') || !GEMINI_API_KEY) {
    http_response_code(500);
    echo json_encode(['error' => 'GEMINI_API_KEY not set in gemini_config.php']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$userMessage = trim($input['message'] ?? '');
$history = $input['history'] ?? [];

if ($userMessage === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Message is required']);
    exit;
}

$models = ['gemini-3.5-flash', 'gemini-2.5-flash-lite'];
$contents = [];

foreach ($history as $turn) {
    if (!isset($turn['role'], $turn['text'])) continue;
    $contents[] = [
        'role' => $turn['role'] === 'model' ? 'model' : 'user',
        'parts' => [['text' => $turn['text']]]
    ];
}

$contents[] = [
    'role' => 'user',
    'parts' => [['text' => $userMessage]]
];

$systemPrompt = $input['systemPrompt'] ?? 'You are a helpful assistant for Swavalambi India.';

$payload = [
    'systemInstruction' => ['parts' => [['text' => $systemPrompt]]],
    'contents' => $contents,
    'generationConfig' => [
        'temperature' => 0.7,
        'maxOutputTokens' => 256,
    ],
];

$lastError = 'All Gemini models failed';

foreach ($models as $model) {
    $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . $model . ':generateContent?key=' . GEMINI_API_KEY;

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_TIMEOUT => 20,
    ]);

    $response = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($status !== 200 || !$response) {
        $lastError = "Model $model failed with status $status";
        continue;
    }

    $data = json_decode($response, true);
    $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';

    if ($reply !== '') {
        echo json_encode(['reply' => trim($reply), 'model' => $model]);
        exit;
    }

    $lastError = "Model $model returned empty response";
}

http_response_code(502);
echo json_encode(['error' => $lastError]);
