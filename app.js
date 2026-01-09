// Lorena & Ethan Relationship Status Page
// Loads status from YAML config file and displays it

// Status text mappings
const statusMessages = {
    operational: {
        title: 'All Systems Operational',
        description: 'All relationship components are functioning normally.'
    },
    degraded_performance: {
        title: 'Degraded Performance',
        description: 'Some relationship components are experiencing minor issues.'
    },
    partial_outage: {
        title: 'Partial Outage',
        description: 'Some relationship components are not functioning properly.'
    },
    major_outage: {
        title: 'Major Outage',
        description: 'Multiple relationship components are experiencing significant issues.'
    }
};

const statusLabels = {
    operational: 'Operational',
    degraded_performance: 'Degraded',
    partial_outage: 'Partial Outage',
    major_outage: 'Major Outage'
};

// Load and parse YAML config
async function loadConfig() {
    try {
        const response = await fetch('status-config.yaml');
        const yamlText = await response.text();
        const config = jsyaml.load(yamlText);
        return config;
    } catch (error) {
        console.error('Error loading config:', error);
        return null;
    }
}

// Render overall status banner
function renderStatusBanner(status) {
    const statusClass = status.replace(/_/g, '-');
    const statusInfo = statusMessages[status] || statusMessages.operational;

    document.getElementById('status-icon').className = `status-icon ${statusClass}`;
    document.getElementById('status-title').textContent = statusInfo.title;
    document.getElementById('status-description').textContent = statusInfo.description;
    document.getElementById('status-banner').className = `status-banner ${statusClass}`;
}

// Render component list
function renderComponents(components) {
    const componentsList = document.getElementById('components-list');
    componentsList.innerHTML = '';

    if (!components || components.length === 0) {
        componentsList.innerHTML = '<p style="padding: 20px; color: var(--text-muted);">No components configured.</p>';
        return;
    }

    components.forEach(component => {
        const item = document.createElement('div');
        item.className = 'component-item';

        const statusClass = component.status.replace(/_/g, '-');
        const statusLabel = statusLabels[component.status] || component.status;
        const icon = component.icon || '';

        item.innerHTML = `
            <div class="component-info">
                <div class="component-name">${icon ? icon + ' ' : ''}${component.name}</div>
                <div class="component-description">${component.description || ''}</div>
            </div>
            <div class="component-status">
                <span class="status-indicator ${statusClass}"></span>
                <span class="status-label ${statusClass}">${statusLabel}</span>
            </div>
        `;

        componentsList.appendChild(item);
    });
}

// Render incidents
function renderIncidents(incidents) {
    const incidentsList = document.getElementById('incidents-list');
    const noIncidents = document.getElementById('no-incidents');

    incidentsList.innerHTML = '';

    if (!incidents || incidents.length === 0) {
        incidentsList.style.display = 'none';
        noIncidents.style.display = 'block';
        return;
    }

    incidentsList.style.display = 'flex';
    noIncidents.style.display = 'none';

    incidents.forEach(incident => {
        const card = document.createElement('div');
        card.className = 'incident-card';

        const statusClass = incident.status || 'ongoing';
        const statusLabel = incident.status === 'resolved' ? 'Resolved' : 'Ongoing';

        let updatesHTML = '';
        if (incident.updates && incident.updates.length > 0) {
            updatesHTML = '<div class="incident-updates">';
            incident.updates.forEach(update => {
                updatesHTML += `
                    <div class="incident-update">
                        <div class="update-time">${update.time}</div>
                        <div class="update-message">${update.message}</div>
                    </div>
                `;
            });
            updatesHTML += '</div>';
        }

        card.innerHTML = `
            <div class="incident-header">
                <div class="incident-title">${incident.title}</div>
                <div class="incident-status ${statusClass}">${statusLabel}</div>
            </div>
            <div class="incident-date">${formatDate(incident.date)}</div>
            <div class="incident-description">${incident.description || ''}</div>
            ${updatesHTML}
        `;

        incidentsList.appendChild(card);
    });
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Update last updated timestamp
function updateTimestamp() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    };
    document.getElementById('last-updated').textContent = now.toLocaleString('en-US', options);
}

// Toggle incidents section
function toggleIncidents() {
    const content = document.getElementById('incidents-content');
    const toggle = document.getElementById('incidents-toggle');

    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.classList.add('expanded');
    } else {
        content.style.display = 'none';
        toggle.classList.remove('expanded');
    }
}

// Initialize the page
async function init() {
    const config = await loadConfig();

    if (!config) {
        document.getElementById('status-title').textContent = 'Error Loading Status';
        document.getElementById('status-description').textContent = 'Could not load configuration file.';
        return;
    }

    // Render all sections
    renderStatusBanner(config.overall_status || 'operational');
    renderComponents(config.components || []);
    renderIncidents(config.incidents || []);
    updateTimestamp();
}

// Load everything when page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
