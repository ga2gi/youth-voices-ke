<script>
    import { onMount } from 'svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    $: papers = data?.papers || [];
    $: topics = data?.topics || [];

    let selectedTopic = 'all';
    let searchQuery = '';

    $: filteredPapers = papers.filter(paper => {
        const matchesTopic = selectedTopic === 'all' || paper.topic === selectedTopic;
        const matchesSearch = !searchQuery || 
            paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            paper.summary?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTopic && matchesSearch;
    });

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
    <title>Position Papers — PolicyBridge Kenya</title>
    <meta name="description" content="Official position papers on key policy issues affecting youth and governance in Kenya." />
</svelte:head>

<div class="page">
    <!-- Header -->
    <section class="page-header">
        <span class="section-label">Policy Positions</span>
        <h1>Position Papers</h1>
        <p>Official PolicyBridge Kenya positions on key issues affecting youth, governance, and development in Kenya. These papers represent our evidence-based stance and policy recommendations.</p>
    </section>

    {#if papers.length > 0}
        <!-- Filters -->
        <div class="filters">
            <div class="search-wrap">
                <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                </svg>
                <input 
                    type="text" 
                    placeholder="Search position papers..." 
                    bind:value={searchQuery}
                    class="search-input"
                />
            </div>

            {#if topics.length > 0}
                <div class="topic-filters">
                    <button 
                        class="filter-btn" 
                        class:active={selectedTopic === 'all'}
                        on:click={() => selectedTopic = 'all'}
                    >
                        All Topics
                    </button>
                    {#each topics as topic}
                        <button 
                            class="filter-btn" 
                            class:active={selectedTopic === topic}
                            on:click={() => selectedTopic = topic}
                        >
                            {topic}
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

        <!-- Papers List -->
        {#if filteredPapers.length > 0}
            <div class="papers-list">
                {#each filteredPapers as paper}
                    <article class="paper-card">
                        <div class="paper-content">
                            <div class="paper-meta">
                                <span class="topic-tag">{paper.topic}</span>
                                <span class="paper-date">{formatDate(paper.published_at)}</span>
                                <span class="paper-status">{paper.status || 'Published'}</span>
                            </div>
                            <h2 class="paper-title">
                                <a href={`/position-papers/${paper.slug}`}>{paper.title}</a>
                            </h2>
                            {#if paper.summary}
                                <p class="paper-summary">{paper.summary}</p>
                            {/if}
                            <div class="paper-footer">
                                <a href={`/position-papers/${paper.slug}`} class="read-link">
                                    Read Full Position →
                                </a>
                                {#if paper.download_url}
                                    <a href={paper.download_url} class="download-link" download>
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
                <h3>No papers found</h3>
                <p>Try adjusting your search or filter criteria.</p>
                <button class="reset-btn" on:click={() => { searchQuery = ''; selectedTopic = 'all'; }}>
                    Clear filters
                </button>
            </div>
        {/if}
    {:else}
        <!-- Empty State -->
        <div class="empty-state">
            <div class="empty-content">
                <h2>Position Papers in Development</h2>
                <p>Our research team is developing evidence-based position papers on critical policy issues. Each paper represents thorough analysis and clear policy recommendations on matters affecting Kenya's youth.</p>
                
                <div class="empty-process">
                    <h3>Our Process</h3>
                    <div class="process-steps">
                        <div class="step">
                            <span class="step-number">1</span>
                            <div>
                                <h4>Research & Analysis</h4>
                                <p>Gathering evidence, data, and stakeholder input</p>
                            </div>
                        </div>
                        <div class="step">
                            <span class="step-number">2</span>
                            <div>
                                <h4>Drafting & Review</h4>
                                <p>Developing clear positions with actionable recommendations</p>
                            </div>
                        </div>
                        <div class="step">
                            <span class="step-number">3</span>
                            <div>
                                <h4>Publication & Advocacy</h4>
                                <p>Sharing positions with stakeholders and the public</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="empty-topics">
                    <span class="preview-tag">Gender & Public Safety</span>
                    <span class="preview-tag">Governance & Civic Engagement</span>
                    <span class="preview-tag">Creative Economy</span>
                    <span class="preview-tag">Environmental Policy</span>
                    <span class="preview-tag">Climate Resilience</span>
                    <span class="preview-tag">Mental Health</span>
                    <span class="preview-tag">Youth Employment</span>
                    <span class="preview-tag">Public Finance</span>
                </div>

                <p class="empty-sub">Explore our <a href="/briefs">Policy Briefs</a> for current publications, or <a href="/submit">submit a solution</a> to inform our positions.</p>
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
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 36px;
    }

    .search-wrap {
        position: relative;
        max-width: 400px;
    }

    .search-icon {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
        pointer-events: none;
    }

    .search-input {
        width: 100%;
        padding: 10px 14px 10px 40px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-family: inherit;
        font-size: 0.9rem;
        color: #1a1a1a;
        background: #f8fafc;
        transition: all 0.15s;
    }

    .search-input:focus {
        outline: none;
        border-color: #064e3b;
        background: white;
        box-shadow: 0 0 0 3px rgba(6, 78, 59, 0.06);
    }

    .search-input::placeholder {
        color: #94a3b8;
    }

    .topic-filters {
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

    /* Papers List */
    .papers-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .paper-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        transition: all 0.2s;
    }

    .paper-card:hover {
        border-color: #064e3b;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    }

    .paper-content {
        padding: 24px;
    }

    .paper-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
        flex-wrap: wrap;
    }

    .topic-tag {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #064e3b;
        background: #f0fdf4;
        padding: 3px 8px;
        border-radius: 4px;
    }

    .paper-date {
        font-size: 0.78rem;
        color: #94a3b8;
    }

    .paper-status {
        font-size: 0.7rem;
        font-weight: 600;
        color: #0891b2;
        background: #ecfeff;
        padding: 3px 8px;
        border-radius: 4px;
    }

    .paper-title {
        font-size: 1.15rem;
        font-weight: 700;
        line-height: 1.35;
        margin: 0 0 10px;
    }

    .paper-title a {
        color: #1a1a1a;
        text-decoration: none;
    }

    .paper-title a:hover {
        color: #064e3b;
    }

    .paper-summary {
        font-size: 0.88rem;
        color: #555;
        line-height: 1.6;
        margin: 0 0 16px;
    }

    .paper-footer {
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

    .download-link {
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

    .download-link:hover {
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
        max-width: 600px;
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
        margin: 0 0 32px;
    }

    .empty-process {
        text-align: left;
        margin-bottom: 32px;
        padding: 24px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
    }

    .empty-process h3 {
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #475569;
        margin: 0 0 20px;
        text-align: center;
    }

    .process-steps {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .step {
        display: flex;
        gap: 14px;
        align-items: flex-start;
    }

    .step-number {
        width: 28px;
        height: 28px;
        background: #064e3b;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.8rem;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .step h4 {
        font-size: 0.9rem;
        font-weight: 600;
        margin: 0 0 3px;
        color: #1a1a1a;
    }

    .step p {
        font-size: 0.82rem;
        color: #64748b;
        margin: 0;
    }

    .empty-topics {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        margin-bottom: 28px;
    }

    .preview-tag {
        padding: 6px 14px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 100px;
        font-size: 0.8rem;
        color: #475569;
        font-weight: 500;
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

        .paper-footer {
            flex-direction: column;
            align-items: flex-start;
        }

        .empty-state {
            padding: 40px 16px;
        }
    }
</style>