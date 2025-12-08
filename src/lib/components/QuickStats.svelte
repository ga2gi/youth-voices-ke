<script>
    /** @type {{submissions: number, votes: number, briefsDelivered: number}} */
    export let stats = { submissions: 0, votes: 0, briefsDelivered: 0 };

    // Helper to format numbers with commas
    const formatNumber = (num) => num.toLocaleString();
</script>

<div class="stats-bar">
    <div class="stat-item">
        <span class="stat-number">{formatNumber(stats.submissions)}</span>
        <span class="stat-label">Total Submissions</span>
    </div>
    <div class="stat-item">
        <span class="stat-number">{formatNumber(stats.votes)}</span>
        <span class="stat-label">Total Votes</span>
    </div>
    <div class="stat-item primary-highlight">
        <span class="stat-number">{formatNumber(stats.briefsDelivered)}</span>
        <span class="stat-label">Briefs Delivered</span>
    </div>
</div>

<style>
    .stats-bar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: var(--color-white);
        border: 1px solid var(--color-border-light);
        border-radius: 8px;
        padding: 20px 10px;
        margin-bottom: 40px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .stat-item {
        text-align: center;
        padding: 0 15px;
    }

    .stat-number {
        display: block;
        font-size: 2.5em;
        font-weight: 800;
        color: var(--color-text-dark);
        line-height: 1.1;
    }

    .stat-label {
        display: block;
        font-size: 0.9em;
        color: var(--color-text-light);
        margin-top: 5px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .primary-highlight .stat-number {
        color: var(--color-primary-accent); /* Green accent for impact metric */
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .stats-bar {
            flex-direction: column;
            gap: 20px;
            padding: 30px 10px;
        }
    }
</style>