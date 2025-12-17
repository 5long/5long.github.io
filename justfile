# List available commands
default:
  @just -l

# Remove build artifacts
clean:
  rm -rf _site

# Build site
build:
  eleventy

# Upload to Github Pages
upload:
  git init _site
  cd _site; git add .; git commit -m AUTOMATIC; git push -f git@github.com:5long/5long.github.io.git HEAD:gh-page

# Clean build then upload
deploy: clean build upload
