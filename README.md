# Lorena & Ethan Relationship Status Page

A GitHub Status Page inspired relationship status tracker. Because every off-again, on-again relationship deserves proper monitoring and incident reporting.

## Features

- **Real-time Status Monitoring**: Quickly identify if they are together or not
- **Component Status**: Monitor individual aspects of the relationship without having to ask or assume
- **Incident Reporting**: Document and track outages for easy reference
- **GitHub Pages Ready**: Easy deployment with GitHub Actions
- **YAML Configuration**: Simple file-based updates, no database required
- **Responsive Design**: Works beautifully on desktop and mobile

## Components Tracked

- Speaking to Each Other
- Lorena's Parents Know
- Hooking Up
- Not Seeing Other People
- Consider Themselves a Couple
- Each Other's Emergency Contacts
- Planning Future Things Together
- Living Together


## Quick Start

### 1. Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Build and deployment", select "GitHub Actions" as the source
4. The workflow will automatically deploy on push to main branch

### 2. Update Your Status

Edit the `status-config.yaml` file to update your relationship status:

```yaml
# Set overall status
overall_status: operational  # or: degraded_performance, partial_outage, major_outage

# Update component statuses
components:
  - name: "Speaking to Each Other"
    status: operational
    description: "Daily communication and conversation quality"

# Add incidents
incidents:
  - date: "2026-01-09"
    title: "Minor Communication Hiccup"
    status: resolved
    description: "Temporary messaging delay due to busy work schedules."
    updates:
      - time: "14:30 PST"
        message: "Back to normal operations"
```

### 3. Commit and Push

```bash
git add status-config.yaml
git commit -m "Update relationship status"
git push
```

The page will automatically update within a few minutes!

## Status Values

### Overall Status
- `operational` - All systems go
- `degraded_performance` - Minor issues
- `partial_outage` - Some components down
- `major_outage` - Serious issues

### Incident Status
- `resolved` - Issue fixed
- `ongoing` - Issue not fixed

## Customization

### Adding New Components

Add to the `components` array in `status-config.yaml`:

```yaml
components:
  - name: "Your Component Name"
    status: operational
    description: "What this tracks"
```

### Recording Incidents

Add to the `incidents` array (newest first):

```yaml
incidents:
  - date: "2026-01-09"
    title: "Incident Title"
    status: resolved
    description: "What happened"
    updates:
      - time: "14:30 PST"
        message: "Update message"
      - time: "12:00 PST"
        message: "Initial report"
```

### Styling

Edit `styles.css` to customize colors, fonts, and layout. The CSS uses CSS custom properties for easy theming:

```css
:root {
    --status-operational: #2ea44f;
    --status-degraded: #bf8700;
    --status-partial: #d73a49;
    --status-major: #cb2431;
    /* ... more variables */
}
```

## Local Development

### Option 1: Docker (Recommended)

The easiest way to preview locally with Docker:

```bash
# Start the container
docker-compose up

# Or run in detached mode
docker-compose up -d

# Stop the container
docker-compose down
```

Then visit `http://localhost:8000` in your browser.

The Docker setup includes:
- Live file mounting - changes to HTML, CSS, JS, and YAML reflect immediately
- Proper YAML MIME type configuration
- Nginx-based static file serving

### Option 2: Simple Local Server

1. Clone the repository
2. Open `index.html` in a web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

3. Edit `status-config.yaml` to test changes
4. Refresh the page to see updates

## File Structure

```
.
├── index.html           # Main HTML page
├── styles.css           # Stylesheet (GitHub-inspired theme)
├── app.js              # JavaScript for loading and displaying status
├── status-config.yaml  # Your relationship status configuration
├── l_e_banner.png      # Banner image
├── Dockerfile          # Docker container configuration
├── docker-compose.yml  # Docker Compose setup for local preview
├── nginx.conf          # Nginx configuration for proper YAML serving
├── .dockerignore       # Docker build exclusions
├── .github/
│   └── workflows/
│       └── pages.yml   # GitHub Pages deployment workflow
└── README.md           # This file
```

## FAQ

### Why did you build this?
Love, humor, and a deep appreciation for status pages. Also, because proper incident reporting makes everything better.

## License

MIT License - Use it, fork it, make your own status page for whatever you want to monitor!

## Credits

Inspired by [GitHub Status](https://www.githubstatus.com/) and the beautiful chaos of on-again, off-again relationships everywhere.
