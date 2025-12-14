<script>
    /** @type {import('./$types').PageData} */
    export let data;
    
    // Original variables for single featured challenge
    const { featuredChallenge, metrics } = data;
</script>

<div class="homepage-wrapper">
    <section class="hero-section">
        <div class="container hero-content">
            <h1>Youth Voices KE</h1>
            <p class="tagline">
Youth Voices KE aligns with the SDGs and Vision 2030, empowering young people to drive national and global development. We flip the script: instead of asking youth what problems they face, we present data-driven policy challenges and pose a more powerful question: What solution do you propose? Positioning youths as active policy actors and champions of youth-led solutions and action.            </p>
            <div class="cta-buttons">
                <a href="/submit" class="button-primary large-btn">
                    Submit Your Solution Today 💡
                </a>
                <a href="/vote" class="button-secondary large-btn">
                    Vote on Shortlisted Ideas 👍
                </a>
            </div>
        </div>
    </section>
    
    <section class="challenge-module container">
        {#if featuredChallenge}
            <h2 class="section-title">🔥 Current Policy Challenge in Focus</h2>
            <div class="challenge-card">
                <div class="card-header">
                    <h3>{featuredChallenge.title}</h3>
                    <span class="solution-count">
                        {featuredChallenge.submission_count} Solution(s) Submitted
                    </span>
                </div>
                
                <p class="challenge-overview">{featuredChallenge.overview_text}</p>
                
                <div class="challenge-actions">
                    <a href="/submit" class="button-secondary">
                        Submit Solution for this Challenge
                    </a>
                    </div>
            </div>
        {:else}
            <div class="no-challenge-info">
                <h2 class="section-title">💡 Ready to Engage?</h2>
                <p>There is currently no featured challenge, but you can explore our previous work and start preparing your ideas!</p>
                <a href="/briefs" class="button-secondary">View Past Policy Briefs</a>
            </div>
        {/if}
    </section>

    <hr>
    
    <section class="impact-snapshot container">
        <h2 class="section-title">Our Impact Snapshot</h2>
        <div class="metrics-grid">
            <div class="metric-card">
                <span class="metric-icon">🗳️</span>
                <span class="metric-value">{metrics.totalSubmissions.toLocaleString()}</span>
                <span class="metric-label">Total Solutions Submitted</span>
            </div>
            <div class="metric-card">
                <span class="metric-icon">📄</span>
                <span class="metric-value">{metrics.totalBriefs.toLocaleString()}</span>
                <span class="metric-label">Policy Briefs Issued</span>
            </div>
            <div class="metric-card">
                <span class="metric-icon">🏆</span>
                <span class="metric-value">{metrics.implementedBriefs.toLocaleString()}</span>
                <span class="metric-label">Briefs Fully Implemented</span>
            </div>
            <div class="metric-card">
                <span class="metric-icon">📚</span>
                <span class="metric-value">4+</span>
                <span class="metric-label">Civic Education Topics</span>
            </div>
        </div>
        <a href="/about" class="button-link center-link">Learn More About Our Process →</a>
    </section>
</div>

<style>
    /* --- General Layout --- */
    .homepage-wrapper {
        padding-bottom: 60px;
    }
    
    .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 20px;
    }
    
    .section-title {
        text-align: center;
        font-size: 2.2em;
        color: var(--color-text-dark);
        margin-bottom: 30px;
        border-bottom: 2px solid var(--color-primary-accent);
        display: inline-block;
        padding-bottom: 5px;
    }

    /* --- 1. Hero Section --- */
    .hero-section {
        background-color: var(--color-text-dark);
        color: var(--color-white);
        padding: 80px 0;
        text-align: center;
        margin-bottom: 50px;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }

    .hero-content h1 {
        font-size: 3.5em;
        margin-bottom: 15px;
        font-weight: 800;
    }

    .tagline {
        font-size: 1.4em;
        margin-bottom: 40px;
        color: rgba(255, 255, 255, 0.9);
    }

    .cta-buttons {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    .large-btn {
        padding: 15px 30px;
        font-size: 1.1em;
        font-weight: 700;
        text-transform: uppercase;
        border-radius: 6px;
        text-decoration: none;
        transition: transform 0.2s;
    }
    
    .large-btn:hover {
        transform: translateY(-2px);
    }
    
    /* --- 2. Featured Challenge Module --- */
    .challenge-module {
        text-align: center;
        margin-bottom: 60px;
    }
    
    .challenge-card {
        background-color: var(--color-white);
        border: 2px solid var(--color-primary-accent);
        border-radius: 12px;
        padding: 30px;
        max-width: 800px;
        margin: 0 auto;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        border-bottom: 1px dashed var(--color-border-light);
        padding-bottom: 10px;
    }
    
    .card-header h3 {
        font-size: 1.8em;
        color: var(--color-secondary-accent);
        margin: 0;
    }
    
    .solution-count {
        background-color: rgba(0, 122, 51, 0.1);
        color: var(--color-primary-accent);
        padding: 5px 10px;
        border-radius: 5px;
        font-weight: 600;
        font-size: 0.9em;
    }
    
    .challenge-overview {
        font-size: 1.1em;
        line-height: 1.6;
        color: var(--color-text-dark);
        margin-bottom: 30px;
    }

    .challenge-actions {
        display: flex;
        justify-content: center;
        gap: 15px;
    }

    .no-challenge-info {
        padding: 40px;
        background-color: var(--color-background-light);
        border-radius: 8px;
    }
    
    /* --- 3. Impact Snapshot --- */
    .impact-snapshot {
        text-align: center;
        padding-top: 30px;
    }
    
    .impact-snapshot .section-title {
        border-bottom-color: var(--color-secondary-accent);
    }

    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 30px;
        margin-bottom: 40px;
        margin-top: 40px;
    }

    .metric-card {
        background-color: var(--color-white);
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        border-top: 4px solid var(--color-primary-accent);
    }
    
    .metric-icon {
        font-size: 2.5em;
        display: block;
        margin-bottom: 10px;
    }

    .metric-value {
        font-size: 2.2em;
        font-weight: 800;
        color: var(--color-text-dark);
    }

    .metric-label {
        display: block;
        font-size: 0.95em;
        color: var(--color-text-light);
        margin-top: 5px;
    }
    
    .center-link {
        display: inline-block;
        font-weight: 600;
        color: var(--color-secondary-accent);
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .hero-content h1 {
            font-size: 2.5em;
        }
        .tagline {
            font-size: 1.2em;
        }
        .cta-buttons {
            flex-direction: column;
        }
        .challenge-actions {
            flex-direction: column;
        }
    }
</style>