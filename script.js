document.addEventListener('DOMContentLoaded', function() {
    // Load and display the data
    fetch('data/sonarqube-issues.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayIssues(data.issues);
            updateLastUpdated();
            
            // Add event listeners for filters
            document.querySelectorAll('.severity-filter').forEach(filter => {
                filter.addEventListener('change', () => {
                    const visibleSeverities = Array.from(document.querySelectorAll('.severity-filter:checked'))
                        .map(el => el.value);
                    filterIssues(visibleSeverities);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('issues-container').innerHTML = 
                `<p class="error">Error loading data: ${error.message}</p>`;
        });

    function displayIssues(issues) {
        const container = document.getElementById('issues-container');
        
        if (!issues || issues.length === 0) {
            container.innerHTML = '<p>No issues found</p>';
            return;
        }
        
        // Sort by severity (critical first)
        issues.sort((a, b) => {
            const severityOrder = {BLOCKER: 0, CRITICAL: 1, MAJOR: 2, MINOR: 3};
            return severityOrder[a.severity] - severityOrder[b.severity];
        });
        
        let html = '';
        issues.forEach(issue => {
            html += `
                <div class="issue ${issue.severity.toLowerCase()}">
                    <div>
                        <span class="severity severity-${issue.severity.toLowerCase()}">
                            ${issue.severity}
                        </span>
                        <span class="type">${issue.type}</span>
                    </div>
                    <div class="message">${issue.message}</div>
                    <div class="component">${issue.component.replace(/^.*?:/, '')}</div>
                    <div class="line">Line ${issue.line}</div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    function filterIssues(visibleSeverities) {
        document.querySelectorAll('.issue').forEach(issueEl => {
            const severity = issueEl.classList[1].toUpperCase();
            if (visibleSeverities.includes(severity)) {
                issueEl.style.display = 'block';
            } else {
                issueEl.style.display = 'none';
            }
        });
    }
    
    function updateLastUpdated() {
        const lastUpdatedEl = document.getElementById('last-updated');
        const now = new Date();
        lastUpdatedEl.textContent = `Last updated: ${now.toLocaleString()}`;
    }
});