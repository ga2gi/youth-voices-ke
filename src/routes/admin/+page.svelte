<script>
    /** @type {import('./$types').PageData} */
    export let data;

    const { metrics } = data;

    // Define dashboard cards
    const statCards = [
        { 
            title: 'Total Submissions', 
            value: metrics.totalSubmissions, 
            icon: '🗳️', 
            color: '#007A33', // Primary Green
            link: '/admin/submissions' 
        },
        { 
            title: 'Shortlisted Solutions', 
            value: metrics.shortlistedSubmissions, 
            icon: '✅', 
            color: '#3498DB', // Blue
            link: '/admin/submissions' 
        },
        { 
            title: 'Total Votes Received', 
            value: metrics.totalVotes, 
            icon: '👍', 
            color: '#F39C12', // Orange
            link: '/admin/submissions' 
        },
        { 
            title: 'Policy Briefs Issued', 
            value: metrics.totalBriefs, 
            icon: '📄', 
            color: '#B01E26', // Secondary Red
            link: '/admin/briefs-tracking' 
        },
        { 
            title: 'Implemented Briefs', 
            value: metrics.implementedBriefs, 
            icon: '🏆', 
            color: '#27AE60', // Darker Green
            link: '/admin/briefs-tracking' 
        },
        { 
            title: 'Active Challenges', 
            value: metrics.totalChallenges, 
            icon: '💡', 
            color: '#8E44AD', // Purple
            link: '/admin/challenges' 
        },
    ];
</script>

<div class="admin-dashboard">
    <h2>👋 Welcome, Administrator!</h2>
    <p class="subtitle">Quick overview of platform engagement and impact metrics.</p>

    <section class="metrics-section">
        <h3>Platform Snapshot</h3>
        <div class="stat-grid">
            {#each statCards as card}
                <a href={card.link} class="stat-card" style="--card-color: {card.color}">
                    <div class="stat-icon">{card.icon}</div>
                    <div class="stat-details">
                        <div class="stat-value">{card.value.toLocaleString()}</div>
                        <div class="stat-title">{card.title}</div>
                    </div>
                </a>
            {/each}
        </div>
    </section>

    <section class="quick-nav-section">
        <h3>Quick Management Links</h3>
        <div class="quick-nav-grid">
            <a href="/admin/submissions" class="nav-item submission-item">
                <h4>Review Submissions</h4>
                <p>Filter, review solutions, and toggle shortlisting status.</p>
            </a>
            <a href="/admin/briefs-tracking" class="nav-item brief-item">
                <h4>Update Brief Status</h4>
                <p>Track progress from 'Delivered' to 'Implemented' by stakeholders.</p>
            </a>
            <a href="/admin/challenges" class="nav-item challenge-item">
                <h4>Manage Challenges</h4>
                <p>Create new challenges and feature them on the homepage.</p>
            </a>
            <a href="/admin/education" class="nav-item education-item">
                <h4>Manage Education</h4>
                <p>Add, edit, or remove civic education articles.</p>
            </a>
        </div>
    </section>
</div>

<style>
    .admin-dashboard {
        padding: 20px 0;
    }

    h2 {
        font-size: 2.5em;
        color: var(--color-text-dark);
        margin-bottom: 5px;
    }

    .subtitle {
        color: var(--color-text-light);
        margin-bottom: 40px;
    }

    h3 {
        font-size: 1.6em;
        color: var(--color-text-dark);
        border-bottom: 2px solid var(--color-border-light);
        padding-bottom: 5px;
        margin-bottom: 20px;
        font-weight: 600;
    }

    /* --- Metrics Grid --- */
    .stat-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 25px;
        margin-bottom: 50px;
    }

    .stat-card {
        display: flex;
        align-items: center;
        background-color: var(--color-white);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        border-left: 5px solid var(--card-color); /* Dynamic color bar */
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s;
    }
    
    .stat-card:hover {
        transform: translateY(-3px);
    }

    .stat-icon {
        font-size: 2.5em;
        margin-right: 15px;
        flex-shrink: 0;
    }

    .stat-value {
        font-size: 1.8em;
        font-weight: 700;
        color: var(--card-color);
        line-height: 1.1;
    }

    .stat-title {
        font-size: 0.9em;
        color: var(--color-text-light);
        margin-top: 3px;
    }

    /* --- Quick Navigation --- */
    .quick-nav-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
    }

    .nav-item {
        display: block;
        padding: 20px;
        border-radius: 8px;
        text-decoration: none;
        color: var(--color-text-dark);
        border: 1px solid var(--color-border-light);
        background-color: var(--color-white);
        transition: background-color 0.2s;
    }

    .nav-item:hover {
        background-color: #f0f0f0;
    }

    .nav-item h4 {
        font-size: 1.4em;
        margin-bottom: 5px;
        font-weight: 700;
        border-left: 3px solid;
        padding-left: 10px;
    }
    
    .nav-item p {
        color: var(--color-text-light);
        font-size: 0.9em;
    }

    /* Color coding for quick links */
    .submission-item h4 { border-color: #3498DB; }
    .brief-item h4 { border-color: #B01E26; }
    .challenge-item h4 { border-color: #F39C12; }
    .education-item h4 { border-color: #007A33; }
</style>