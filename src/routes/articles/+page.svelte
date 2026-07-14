<script>
    import { onMount } from 'svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    $: articles = data?.articles || [];
    $: categories = data?.categories || [];

    // Filter states
    let selectedCategory = 'all';
    let searchQuery = '';

    $: filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        const matchesSearch = !searchQuery || 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
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
    <title>Articles — PolicyBridge Kenya</title>
    <meta name="description" content="Read articles and analysis on policy, governance, and youth engagement in Kenya." />
</svelte:head>

<div class="page">
    <!-- Header -->
    <section class="page-header">
        <span class="section-label">Research & Analysis</span>
        <h1>Articles</h1>
        <p>Insights, commentary, and analysis on policy, governance, and youth engagement in Kenya.</p>
    </section>

    {#if articles.length > 0}
        <!-- Filters -->
        <div class="filters">
            <div class="search-wrap">
                <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                </svg>
                <input 
                    type="text" 
                    placeholder="Search articles..." 
                    bind:value={searchQuery}
                    class="search-input"
                />
            </div>

            {#if categories.length > 0}
                <div class="category-filters">
                    <button 
                        class="filter-btn" 
                        class:active={selectedCategory === 'all'}
                        on:click={() => selectedCategory = 'all'}
                    >
                        All
                    </button>
                    {#each categories as category}
                        <button 
                            class="filter-btn" 
                            class:active={selectedCategory === category}
                            on:click={() => selectedCategory = category}
                        >
                            {category}
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

        <!-- Articles Grid -->
        {#if filteredArticles.length > 0}
            <div class="articles-grid">
                {#each filteredArticles as article}
                    <article class="article-card">
                        {#if article.featured_image}
                            <div class="card-image">
                                <img src={article.featured_image} alt={article.title} />
                            </div>
                        {/if}
                        <div class="card-content">
                            <div class="card-meta">
                                {#if article.category}
                                    <span class="category-tag">{article.category}</span>
                                {/if}
                                {#if article.published_at}
                                    <span class="date">{formatDate(article.published_at)}</span>
                                {/if}
                            </div>
                            <h2 class="card-title">
                                <a href={`/articles/${article.slug}`}>{article.title}</a>
                            </h2>
                            {#if article.excerpt}
                                <p class="card-excerpt">{article.excerpt}</p>
                            {/if}
                            <div class="card-footer">
                                {#if article.author}
                                    <span class="author">{article.author}</span>
                                {/if}
                                <a href={`/articles/${article.slug}`} class="read-more">Read more →</a>
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        {:else}
            <div class="empty-filter">
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter criteria.</p>
                <button class="reset-btn" on:click={() => { searchQuery = ''; selectedCategory = 'all'; }}>
                    Clear filters
                </button>
            </div>
        {/if}
    {:else}
        <!-- Empty State -->
        <div class="empty-state">
            <div class="empty-content">
                <h2>Articles Coming Soon</h2>
                <p>Our team is working on insightful articles covering policy analysis, governance trends, youth perspectives, and civic engagement in Kenya.</p>
                <div class="empty-topics">
                    <span class="topic-tag">Policy Analysis</span>
                    <span class="topic-tag">Governance</span>
                    <span class="topic-tag">Youth Voice</span>
                    <span class="topic-tag">Devolution</span>
                    <span class="topic-tag">Civic Tech</span>
                    <span class="topic-tag">Public Participation</span>
                </div>
                <p class="empty-sub">Check back soon or explore our <a href="/briefs">Policy Briefs</a> for current publications.</p>
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
        max-width: 560px;
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

    .category-filters {
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

    /* Articles Grid */
    .articles-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 24px;
    }

    .article-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.2s;
    }

    .article-card:hover {
        border-color: #064e3b;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    }

    .card-image {
        width: 100%;
        height: 200px;
        overflow: hidden;
        background: #f1f5f9;
    }

    .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .card-content {
        padding: 20px;
    }

    .card-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 10px;
    }

    .category-tag {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #064e3b;
        background: #f0fdf4;
        padding: 3px 8px;
        border-radius: 4px;
    }

    .date {
        font-size: 0.78rem;
        color: #94a3b8;
    }

    .card-title {
        font-size: 1.1rem;
        font-weight: 700;
        line-height: 1.35;
        margin: 0 0 8px;
    }

    .card-title a {
        color: #1a1a1a;
        text-decoration: none;
    }

    .card-title a:hover {
        color: #064e3b;
    }

    .card-excerpt {
        font-size: 0.88rem;
        color: #555;
        line-height: 1.5;
        margin: 0 0 16px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 12px;
        border-top: 1px solid #f1f5f9;
    }

    .author {
        font-size: 0.8rem;
        color: #64748b;
        font-weight: 500;
    }

    .read-more {
        font-size: 0.82rem;
        font-weight: 600;
        color: #064e3b;
        text-decoration: none;
    }

    .read-more:hover {
        text-decoration: underline;
    }

    /* Empty States */
    .empty-state {
        padding: 80px 24px;
        text-align: center;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 16px;
    }

    .empty-content {
        max-width: 520px;
        margin: 0 auto;
    }

    .empty-content h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 12px;
        color: #1a1a1a;
    }

    .empty-content p {
        font-size: 0.95rem;
        color: #555;
        line-height: 1.6;
        margin: 0 0 24px;
    }

    .empty-topics {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        margin-bottom: 28px;
    }

    .topic-tag {
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

        .articles-grid {
            grid-template-columns: 1fr;
        }

        .empty-state {
            padding: 48px 16px;
        }
    }
</style>