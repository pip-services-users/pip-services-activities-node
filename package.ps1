#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$stageImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-rc"
$latestImage="$($component.registry)/$($component.name):latest"

# Build docker image
docker build -f docker/Dockerfile -t $stageImage -t $latestImage .

# Set environment variables
$env:IMAGE = $stageImage

# Set docker host address
$dockerMachineHost = $env:DOCKER_MACHINE_HOST
if ($dockerMachineHost -eq $null) {
    $dockerMachineHost = "localhost"
}


try {
    # Workaround to remove dangling images
    docker-compose -f ./docker/docker-compose.yml down

    docker-compose -f ./docker/docker-compose.yml up -d

    # Test using curl
    Start-Sleep -Seconds 10
    Invoke-WebRequest -Uri http://$($dockerMachineHost):8080/heartbeat
    #Invoke-WebRequest -Uri http://localhost:8080/v1/activities/get_party_activities

    Write-Host "The container was successfully built."
} finally {
    # Workaround to remove dangling images
    docker-compose -f ./docker/docker-compose.yml down
}
