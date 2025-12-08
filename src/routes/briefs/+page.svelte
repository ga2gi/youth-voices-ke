<script>
    /** @type {import('./$types').PageData} */
    export let data;

    const { briefs } = data;

    // Helper for formatting date
    const formatDate = (isoDate) => {
        if (!isoDate) return 'N/A';
        return new Date(isoDate).toLocaleDateString('en-KE', { 
            year: 'numeric', month: 'short', day: 'numeric' 
        });
    };

    // Helper to determine the step percentage for the status bar
    const getStatusPercentage = (status) => {
        const statuses = ['Delivered', 'Acknowledged', 'In Review', 'Implemented'];
        const index = statuses.indexOf(status);
        if (index === -1) return 0;
        return (index / (statuses.length - 1)) * 100;
    };
</script>

<div class="container briefs-page">
    <header>
        <h1>🏛️ Policy Briefs Tracking</h1>
        <p class="intro-text">
            Track the journey of policy briefs generated from youth solutions. We monitor the progress 
            of each brief from **Delivery** to **Implementation** by relevant stakeholders.
        </p>
    </header>

    <div class="briefs-list">
        {#if briefs.length === 0}
            <div class="empty-state">
                <p>No policy briefs have been published or are currently being tracked.</p>
            </div>
        {:else}
            {#each briefs as brief (brief.id)}
                <div class="brief-card">
                    <div class="brief-header">
                        <h2>{brief.title}</h2>
                        <div class="delivery-date">Delivered: **{formatDate(brief.delivery_date)}**</div>
                    </div>

                    <p class="description">{brief.description}</p>
                    
                    {#if brief.stakeholder_acknowledged}
                        <p class="acknowledgement">
                            **Acknowledged By:** {brief.stakeholder_acknowledged}
                        </p>
                    {/if}

                    <div class="status-tracker">
                        <div class="status-bar">
                            <div class="progress" style="width: {getStatusPercentage(brief.status)}%"></div>
                        </div>

                        <ul class="status-labels">
                            <li class:active={brief.status === 'Delivered' || getStatusPercentage(brief.status) > 0}>Delivered</li>
                            <li class:active={brief.status === 'Acknowledged' || getStatusPercentage(brief.status) > 25}>Acknowledged</li>
                            <li class:active={brief.status === 'In Review' || getStatusPercentage(brief.status) > 75}>In Review</li>
                            <li class:active={brief.status === 'Implemented' || getStatusPercentage(brief.status) === 100}>Implemented</li>
                        </ul>
                        
                        <div class="current-status-tag">
                            Current Status: **{brief.status}**
                        </div>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
    .briefs-page {
        padding-top: 40px;
        padding-bottom: 60px;
    }
    
    header {
        text-align: center;
        margin-bottom: 50px;
    }

    h1 {
        font-size: 2.8em;
        color: var(--color-primary-accent);
        margin-bottom: 10px;
    }

    .intro-text {
        max-width: 700px;
        margin: 0 auto;
        color: var(--color-text-light);
        font-size: 1.1em;
    }

    .brief-card {
        background-color: var(--color-white);
        border: 1px solid var(--color-border-light);
        border-radius: 10px;
        padding: 30px;
        margin-bottom: 30px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s;
    }
    
    .brief-card:hover {
        transform: translateY(-3px);
    }

    .brief-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 15px;
        border-bottom: 1px dashed var(--color-border-light);
        padding-bottom: 10px;
    }

    .brief-header h2 {
        font-size: 1.8em;
        color: var(--color-text-dark);
        margin: 0;
        flex-grow: 1;
    }

    .delivery-date {
        font-size: 0.9em;
        color: var(--color-text-light);
        flex-shrink: 0;
        margin-left: 20px;
    }

    .description {
        color: var(--color-text-dark);
        line-height: 1.6;
        margin-bottom: 20px;
    }

    .acknowledgement {
        font-size: 0.95em;
        color: var(--color-secondary-accent);
        margin-bottom: 20px;
    }

    /* --- Status Tracker --- */
    .status-tracker {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #eee;
    }

    .status-bar {
        height: 8px;
        background-color: #e0e0e0;
        border-radius: 4px;
        margin-bottom: 10px;
        position: relative;
    }

    .progress {
        height: 100%;
        background-color: var(--color-primary-accent);
        border-radius: 4px;
        transition: width 0.5s ease-in-out;
    }

    .status-labels {
        display: flex;
        justify-content: space-between;
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 0.85em;
        color: var(--color-text-light);
        position: relative;
    }

    .status-labels li {
        width: 25%;
        text-align: center;
        font-weight: 500;
        transition: color 0.3s;
    }
    
    .status-labels li:first-child { text-align: left; }
    .status-labels li:last-child { text-align: right; }

    .status-labels li.active {
        color: var(--color-text-dark);
        font-weight: 700;
    }

    .current-status-tag {
        text-align: center;
        margin-top: 20px;
        font-size: 1.1em;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: rgba(0, 122, 51, 0.1);
        color: var(--color-primary-accent);
    }
    
    .empty-state {
        text-align: center;
        padding: 80px 20px;
        color: var(--color-text-light);
        font-size: 1.2em;
        font-style: italic;
        background-color: var(--color-white);
        border-radius: 10px;
        border: 1px dashed var(--color-border-light);
    }
    
    @media (max-width: 600px) {
        .brief-header {
            flex-direction: column;
            align-items: flex-start;
        }
        .delivery-date {
            margin-left: 0;
            margin-top: 5px;
        }
        .status-labels {
            flex-wrap: wrap;
        }
        .status-labels li {
            width: 50%;
            margin-bottom: 10px;
        }
        .status-labels li:nth-child(even) { text-align: right; }
        .status-labels li:nth-child(odd) { text-align: left; }
    }
</style>