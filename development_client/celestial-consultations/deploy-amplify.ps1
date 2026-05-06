param(
  [string]$AppName = "star-insight-astrology-temp",
  [string]$BranchName = "production",
  [string]$Region = "us-east-1"
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$zipPath = Join-Path $repoRoot "amplify-deploy.zip"

Set-Location $repoRoot

Write-Host "Building static export..."
npm run build | Out-Host

if (Test-Path $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

Write-Host "Packaging deploy artifact..."
tar -a -c -f $zipPath -C (Join-Path $repoRoot "apps/web/out") .

Write-Host "Looking up Amplify app..."
$appsResponse = aws amplify list-apps --region $Region --output json | ConvertFrom-Json
$app = $appsResponse.apps | Where-Object { $_.name -eq $AppName } | Select-Object -First 1

if (-not $app) {
  Write-Host "Creating Amplify app..."
  $createdApp = aws amplify create-app `
    --region $Region `
    --name $AppName `
    --platform WEB `
    --output json | ConvertFrom-Json
  $app = $createdApp.app
}

$appId = $app.appId

Write-Host "Ensuring branch exists..."
$branchExists = $true
try {
  aws amplify get-branch --region $Region --app-id $appId --branch-name $BranchName --output json | Out-Null
} catch {
  $branchExists = $false
}

if (-not $branchExists) {
  aws amplify create-branch `
    --region $Region `
    --app-id $appId `
    --branch-name $BranchName `
    --stage PRODUCTION `
    --framework "Next.js - Static" `
    --output json | Out-Null
}

Write-Host "Creating deployment..."
$deployment = aws amplify create-deployment `
  --region $Region `
  --app-id $appId `
  --branch-name $BranchName `
  --output json | ConvertFrom-Json

Write-Host "Uploading artifact..."
Invoke-RestMethod `
  -Uri $deployment.zipUploadUrl `
  -Method Put `
  -InFile $zipPath `
  -ContentType "application/zip" | Out-Null

Write-Host "Starting deployment..."
$job = aws amplify start-deployment `
  --region $Region `
  --app-id $appId `
  --branch-name $BranchName `
  --job-id $deployment.jobId `
  --output json | ConvertFrom-Json

$defaultDomain = $app.defaultDomain
$url = "https://$BranchName.$defaultDomain"

Write-Host ""
Write-Host "Deployment started."
Write-Host "App ID: $appId"
Write-Host "Branch: $BranchName"
Write-Host "URL: $url"
Write-Host "Job ID: $($job.jobSummary.jobId)"
