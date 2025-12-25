# test-api.ps1
$signupUrl = "http://localhost:3000/api/auth/signup"
$serviceUrl = "http://localhost:3000/api/services/create"
$testUrl = "http://localhost:3000/api/test-airtable"

# Test the test-airtable endpoint first
Write-Host "Testing test-airtable endpoint..."
try {
    $response = Invoke-WebRequest -Uri $testUrl -Method GET
    Write-Host "Test endpoint response:" $response.Content
} catch {
    Write-Host "Test endpoint failed:" $_.Exception.Message
}

# Test signup
Write-Host "Testing signup..."
$signupBody = @{
    name = "Test User"
    email = "test@example.com"
    password = "testpass123"
    userType = "student"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri $signupUrl -Method POST -Body $signupBody -ContentType "application/json"
    Write-Host "Signup response:" $response.Content
} catch {
    Write-Host "Signup failed:" $_.Exception.Message
}

# Test service creation
Write-Host "Testing service creation..."
$serviceBody = @{
    name = "Test Service"
    title = "Test Title"
    description = "Test Description"
    linkupPrice = 50
    vendorPrice = 40
    whatsapp = "+1234567890"
    telegram = "@testuser"
    images = @("https://example.com/image1.jpg", "https://example.com/image2.jpg")
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri $serviceUrl -Method POST -Body $serviceBody -ContentType "application/json"
    Write-Host "Service creation response:" $response.Content
} catch {
    Write-Host "Service creation failed:" $_.Exception.Message
}