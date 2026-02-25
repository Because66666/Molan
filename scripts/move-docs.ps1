if (Test-Path "docs/public") {
    Get-ChildItem -Path "docs/public" | Move-Item -Destination "docs" -Force
    Remove-Item -Path "docs/public" -Recurse -Force
}
if (Test-Path "docs/nitro.json") {
    Remove-Item -Path "docs/nitro.json" -Force
}
