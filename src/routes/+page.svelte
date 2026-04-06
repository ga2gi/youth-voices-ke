<script>
    /** @type {import('./$types').PageData} */
    export let data;
    
    // Maintain reactive statement for featuredChallenge from server data
    $: ({ featuredChallenge } = data);

    // Metrics updated to reflect current Q1 status
    const metrics = {
        totalSubmissions: 8, 
        totalBriefs: 0,
        implementedBriefs: 0,
        activeChallenges: 2
    };
</script>

<div class="homepage-wrapper">
    <section class="hero-section">
        <div class="container hero-content">
            <h1>Policy Bridge KE</h1>
            <p class="tagline">
                Bridging the gap between youth innovation and legislative action. Aligned with the <strong>SDGs</strong> and <strong>Kenya Vision 2030</strong>, we transform youth-led ideas into actionable public policy briefs.
            </p>
            <div class="cta-buttons">
                <a href="/submit" class="button-primary large-btn">
                    Submit a Solution 💡
                </a>
                <a href="/vote" class="button-secondary large-btn">
                    Vote on Ideas 👍
                </a>
                <a href="/get-involved" class="button-outline large-btn">
                    Join the Movement 🤝
                </a>
            </div>
        </div>
    </section>
    
    <section class="challenge-module container">
        <h2 class="section-title">🔥 Q1 2026 Policy Challenges</h2>
        
        {#if featuredChallenge}
            <div class="challenge-card">
                <div class="card-header">
                    <div class="header-main">
                        <span class="badge">Featured Challenge</span>
                        <h3>{featuredChallenge.title}</h3>
                    </div>
                    <span class="solution-count">
                        {featuredChallenge.submission_count || 8} Solution(s) Submitted
                    </span>
                </div>
                
                <p class="challenge-overview">{featuredChallenge.overview_text}</p>
                
                <div class="challenge-actions">
                    <a href="/submit" class="button-primary">
                        Propose a Solution
                    </a>
                    <a href="/vote" class="link-text">See what others proposed →</a>
                </div>
            </div>
        {:else}
            <div class="no-challenge-info">
                <p>We are currently synthesizing submissions for the first quarter. Stay tuned for the Q2 Challenge launch!</p>
                <a href="/briefs" class="button-secondary">View Past Policy Briefs</a>
            </div>
        {/if}
    </section>

    <section class="community-bridge">
        <div class="container bridge-grid">
            <div class="bridge-text">
                <h2>Turning Ideas into Impact</h2>
                <p>Policy Bridge KE isn't just a suggestion box. We facilitate a structured <strong>Policy Lab</strong> process where the highest-voted youth solutions are refined by experts into formal briefs for government ministries and county offices.</p>
            </div>
            <div class="bridge-cta">
                <a href="/about" class="action-link">How Our Process Works →</a>
            </div>
        </div>
    </section>
    
    <section class="impact-snapshot container">
        <h2 class="section-title">Q1 Impact Snapshot</h2>
        <div class="metrics-grid">
            <div class="metric-card">
                <span class="metric-icon">🗳️</span>
                <span class="metric-value">{metrics.totalSubmissions}</span>
                <span class="metric-label">Total Solutions Submitted</span>
            </div>
            <div class="metric-card">
                <span class="metric-icon">📄</span>
                <span class="metric-value">{metrics.totalBriefs}</span>
                <span class="metric-label">Policy Briefs Drafted</span>
            </div>
            <div class="metric-card">
                <span class="metric-icon">🎯</span>
                <span class="metric-value">{metrics.activeChallenges}</span>
                <span class="metric-label">Active Q1 Challenges</span>
            </div>
            <div class="metric-card">
                <span class="metric-icon">📚</span>
                <span class="metric-value">4+</span>
                <span class="metric-label">Civic Education Modules</span>
            </div>
        </div>
        <div class="bottom-cta">
            <p>Help us reach 20 solutions before the Q1 deadline!</p>
            <a href="/submit" class="button-primary">Take Action Now</a>
        </div>
    </section>
</div>

<style>
    /* --- General Layout --- */
    .homepage-wrapper {
        padding-bottom: 60px;
        font-family: 'Source Sans 3', 'Source Sans Pro', sans-serif;
        color: #333;
    }
    
    .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 20px;
    }
    
    .section-title {
        text-align: center;
        font-size: 2.2em;
        color: #222;
        margin: 60px 0 40px 0;
        position: relative;
    }

    .section-title::after {
        content: '';
        display: block;
        width: 60px;
        height: 4px;
        background: #007a33;
        margin: 10px auto 0;
    }

    /* --- Hero Section --- */
    .hero-section {
        background-color: #1a1a1a;
        background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/hero-bg.jpg'); /* Optional background */
        background-size: cover;
        color: white;
        padding: 100px 0;
        text-align: center;
        box-shadow: inset 0 -10px 20px rgba(0,0,0,0.3);
    }

    .hero-content h1 { font-size: 4em; margin-bottom: 20px; font-weight: 800; letter-spacing: -1px; }

    .tagline {
        font-size: 1.4em;
        margin-bottom: 40px;
        color: #e0e0e0;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.5;
    }

    .cta-buttons { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }

    .large-btn {
        padding: 18px 36px;
        font-size: 1.1em;
        font-weight: 700;
        border-radius: 8px;
        text-decoration: none;
        transition: all 0.2s ease;
    }
    
    .button-primary { background-color: #007a33; color: white; border: none; }
    .button-primary:hover { background-color: #005c26; transform: translateY(-2px); }

    .button-secondary { background-color: #b01e26; color: white; border: none; }
    .button-secondary:hover { background-color: #8a171d; transform: translateY(-2px); }

    .button-outline { border: 2px solid white; color: white; }
    .button-outline:hover { background: white; color: #1a1a1a; }

    /* --- Challenge Card --- */
    .challenge-card {
        background: white;
        border-radius: 16px;
        padding: 40px;
        max-width: 900px;
        margin: 0 auto;
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        border: 1px solid #eee;
    }

    .card-header { 
        display: flex; 
        justify-content: space-between; 
        align-items: flex-start; 
        margin-bottom: 25px; 
    }

    .badge {
        display: inline-block;
        background: #fff3f3;
        color: #b01e26;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.8em;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 10px;
    }

    .card-header h3 { font-size: 2em; color: #1a1a1a; margin: 0; line-height: 1.2; }

    .solution-count {
        background: #e8f5e9;
        color: #007a33;
        padding: 8px 16px;
        border-radius: 50px;
        font-weight: 700;
        font-size: 0.9em;
    }

    .challenge-overview { font-size: 1.2em; line-height: 1.6; color: #555; margin-bottom: 30px; }

    .challenge-actions { display: flex; align-items: center; gap: 25px; }
    .link-text { color: #007a33; text-decoration: none; font-weight: 700; }

    /* --- Community Bridge --- */
    .community-bridge {
        background: #f9f9f9;
        padding: 80px 0;
        margin-top: 60px;
    }

    .bridge-grid {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 60px;
    }

    .bridge-text h2 { color: #1a1a1a; font-size: 2.5rem; margin-bottom: 20px; }
    .bridge-text p { font-size: 1.25rem; color: #555; line-height: 1.6; }

    .action-link {
        background: #007a33;
        color: white;
        padding: 20px 40px;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 800;
        font-size: 1.1em;
        display: inline-block;
        transition: background 0.2s;
    }

    /* --- Metrics --- */
    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 25px;
        margin: 40px 0;
    }

    .metric-card {
        background: white;
        padding: 35px 20px;
        border-radius: 12px;
        text-align: center;
        border-bottom: 5px solid #007a33;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }

    .metric-icon { font-size: 2.5em; display: block; margin-bottom: 10px; }
    .metric-value { font-size: 2.8em; font-weight: 800; color: #1a1a1a; }
    .metric-label { font-size: 1em; color: #777; font-weight: 600; }

    .bottom-cta { text-align: center; margin-top: 50px; }
    .bottom-cta p { font-size: 1.2em; font-weight: 600; margin-bottom: 20px; }

    /* Responsive */
    @media (max-width: 768px) {
        .hero-content h1 { font-size: 2.8em; }
        .bridge-grid { flex-direction: column; text-align: center; }
        .card-header { flex-direction: column; gap: 15px; }
        .challenge-actions { flex-direction: column; width: 100%; }
        .challenge-actions .button-primary { width: 100%; text-align: center; }
    }
</style>