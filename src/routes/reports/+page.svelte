<script>
    import { onMount } from 'svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    $: reports = data?.reports || [];
    $: years = data?.years || [];

    let selectedYear = 'all';

    $: filteredReports = selectedYear === 'all' 
        ? reports 
        : reports.filter(report => report.year === selectedYear);

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-KE', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
</script>

<svelte:head>
    <title>Annual Reports — PolicyBridge Kenya</title>
    <meta name="description" content="Annual reports on PolicyBridge Kenya's activities, impact, and financial transparency." />
</svelte:head>

<div class="page">
    <!-- Header -->
    <section class="page-header">
        <span class="section-label">Organizational</span>
        <h1>Annual Reports</h1>
        <p>Comprehensive reports on PolicyBridge Kenya's activities, impact, financials, and strategic direction. We believe in transparency and accountability to our community and stakeholders.</p>
    </section>

    {#if reports.length > 0}
        <!-- Year Filter -->
        {#if years.length > 0}
            <div class="filters">
                <div class="year-filters">
                    <button 
                        class="filter-btn" 
                        class:active={selectedYear === 'all'}
                        on:click={() => selectedYear = 'all'}
                    >
                        All Years
                    </button>
                    {#each years as year}
                        <button 
                            class="filter-btn" 
                            class:active={selectedYear === year}
                            on:click={() => selectedYear = year}
                        >
                            {year}
                        </button>
                    {/each}
                </div>
            </div>
        {/if}

        <!-- Reports Grid -->
        {#if filteredReports.length > 0}
            <div class="reports-grid">
                {#each filteredReports as report}
                    <article class="report-card">
                        <div class="report-cover">
                            <div class="cover-year">{report.year}</div>
                            <div class="cover-label">Annual Report</div>
                        </div>
                        <div class="report-content">
                            <h2 class="report-title">
                                <a href={`/annual-reports/${report.slug}`}>{report.title}</a>
                            </h2>
                            {#if report.summary}
                                <p class="report-summary">{report.summary}</p>
                            {/if}
                            <div class="report-meta">
                                <span class="meta-item">Published: {formatDate(report.published_at)}</span>
                                {#if report.pages}
                                    <span class="meta-item">{report.pages} pages</span>
                                {/if}
                            </div>
                            <div class="report-footer">
                                <a href={`/annual-reports/${report.slug}`} class="read-link">
                                    View Report →
                                </a>
                                {#if report.download_url}
                                    <a href={report.download_url} class="download-btn" download>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                        Download PDF
                                    </a>
                                {/if}
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        {:else}
            <div class="empty-filter">
                <h3>No reports for this year</h3>
                <p>Try selecting a different year.</p>
                <button class="reset-btn" on:click={() => selectedYear = 'all'}>
                    Show all years
                </button>
            </div>
        {/if}
    {:else}
        <!-- Empty State -->
        <div class="empty-state">
            <div class="empty-content">
                <h2>Our First Report is in Progress</h2>
                <p>As a growing organization, we are documenting our journey, impact, and financials for our inaugural annual report. We are committed to full transparency with our community.</p>
                
                <div class="empty-reporting">
                    <h3>What to Expect</h3>
                    <div class="expect-grid">
                        <div class="expect-item">
                            <span class="expect-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                                </svg>
                            </span>
                            <h4>Impact Metrics</h4>
                            <p>Solutions submitted, policy briefs published, stakeholders engaged</p>
                        </div>
                        <div class="expect-item">
                            <span class="expect-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                                    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                                </svg>
                            </span>
                            <h4>Organizational Growth</h4>
                            <p>Team, partnerships, and institutional development</p>
                        </div>
                        <div class="expect-item">
                            <span class="expect-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="12" y1="1" x2="12" y2="23"/>
                                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                                </svg>
                            </span>
                            <h4>Financial Transparency</h4>
                            <p>Funding sources, expenditure, and financial statements</p>
                        </div>
                        <div class="expect-item">
                            <span class="expect-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12 6 12 12 16 14"/>
                                </svg>
                            </span>
                            <h4>Strategic Outlook</h4>
                            <p>Future plans, priorities, and upcoming initiatives</p>
                        </div>
                    </div>
                </div>

                <p class="empty-sub">In the meantime, explore our published <a href="/briefs">Policy Briefs</a> and learn about our <a href="/about">mission and approach</a>.</p>
            </div>
        </div>
    {/if}
</div>

<style>
    .page {
        max-width: 1100px;
        margin: 0 auto;
        padding: 56px 24px 80px;
        font-family: system-ui, -apple-system, sans-serif;
        color: #1a1a1a;
    }

    /* Header */
    .page-header {
        margin-bottom: 48px;
    }

    .section-label {
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #064e3b;
        display: inline-block;
        margin-bottom: 10px;
        padding: 3px 10px;
        background: #f0fdf4;
        border-radius: 4px;
    }

    .page-header h1 {
        font-size: 2.25rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        margin: 0 0 10px;
    }

    .page-header p {
        font-size: 1rem;
        color: #555;
        max-width: 640px;
        line-height: 1.5;
        margin: 0;
    }

    /* Filters */
    .filters {
        margin-bottom: 36px;
    }

    .year-filters {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .filter-btn {
        padding: 6px 16px;
        border: 1px solid #e5e7eb;
        border-radius: 100px;
        background: white;
        color: #475569;
        font-family: inherit;
        font-size: 0.82rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s;
    }

    .filter-btn:hover {
        border-color: #064e3b;
        color: #064e3b;
    }

    .filter-btn.active {
        background: #064e3b;
        color: white;
        border-color: #064e3b;
    }

    /* Reports Grid */
    .reports-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
    }

    .report-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.2s;
        display: flex;
        flex-direction: column;
    }

    .report-card:hover {
        border-color: #064e3b;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    }

    .report-cover {
        background: linear-gradient(135deg, #064e3b 0%, #0a6e4f 100%);
        padding: 32px 24px;
        text-align: center;
        color: white;
    }

    .cover-year {
        font-size: 2.5rem;
        font-weight: 800;
        line-height: 1;
        margin-bottom: 4px;
    }

    .cover-label {
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        opacity: 0.8;
    }

    .report-content {
        padding: 20px;
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .report-title {
        font-size: 1.05rem;
        font-weight: 700;
        line-height: 1.3;
        margin: 0 0 8px;
    }

    .report-title a {
        color: #1a1a1a;
        text-decoration: none;
    }

    .report-title a:hover {
        color: #064e3b;
    }

    .report-summary {
        font-size: 0.85rem;
        color: #555;
        line-height: 1.5;
        margin: 0 0 14px;
        flex: 1;
    }

    .report-meta {
        display: flex;
        gap: 16px;
        margin-bottom: 14px;
        flex-wrap: wrap;
    }

    .meta-item {
        font-size: 0.75rem;
        color: #94a3b8;
    }

    .report-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 14px;
        border-top: 1px solid #f1f5f9;
        flex-wrap: wrap;
        gap: 12px;
    }

    .read-link {
        font-size: 0.82rem;
        font-weight: 600;
        color: #064e3b;
        text-decoration: none;
    }

    .read-link:hover {
        text-decoration: underline;
    }

    .download-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.8rem;
        font-weight: 600;
        color: #475569;
        text-decoration: none;
        padding: 6px 14px;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        transition: all 0.15s;
    }

    .download-btn:hover {
        border-color: #064e3b;
        color: #064e3b;
        background: #f0fdf4;
    }

    /* Empty States */
    .empty-state {
        padding: 64px 24px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 16px;
    }

    .empty-content {
        max-width: 640px;
        margin: 0 auto;
        text-align: center;
    }

    .empty-content h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 12px;
        color: #1a1a1a;
    }

    .empty-content > p {
        font-size: 0.95rem;
        color: #555;
        line-height: 1.6;
        margin: 0 0 36px;
    }

    .empty-reporting {
        text-align: left;
        margin-bottom: 32px;
        padding: 28px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
    }

    .empty-reporting h3 {
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #475569;
        margin: 0 0 24px;
        text-align: center;
    }

    .expect-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .expect-item {
        text-align: center;
    }

    .expect-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        background: #f0fdf4;
        border-radius: 10px;
        margin-bottom: 10px;
        color: #064e3b;
    }

    .expect-item h4 {
        font-size: 0.88rem;
        font-weight: 600;
        margin: 0 0 4px;
        color: #1a1a1a;
    }

    .expect-item p {
        font-size: 0.8rem;
        color: #64748b;
        margin: 0;
        line-height: 1.4;
    }

    .empty-sub {
        font-size: 0.85rem;
        color: #64748b;
    }

    .empty-sub a {
        color: #064e3b;
        font-weight: 600;
        text-decoration: underline;
    }

    .empty-filter {
        text-align: center;
        padding: 48px 24px;
    }

    .empty-filter h3 {
        font-size: 1.15rem;
        margin: 0 0 6px;
    }

    .empty-filter p {
        font-size: 0.9rem;
        color: #64748b;
        margin: 0 0 16px;
    }

    .reset-btn {
        padding: 8px 20px;
        background: #064e3b;
        color: white;
        border: none;
        border-radius: 6px;
        font-family: inherit;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
    }

    .reset-btn:hover {
        background: #043d2e;
    }

    @media (max-width: 768px) {
        .page {
            padding: 40px 16px 60px;
        }

        .page-header h1 {
            font-size: 1.75rem;
        }

        .reports-grid {
            grid-template-columns: 1fr;
        }

        .expect-grid {
            grid-template-columns: 1fr;
        }

        .report-footer {
            flex-direction: column;
            align-items: flex-start;
        }

        .empty-state {
            padding: 40px 16px;
        }
    }
</style>