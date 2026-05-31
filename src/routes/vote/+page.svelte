<script>
    export let data;
</script>

<svelte:head>
    <title>Voting Closed — Policy Bridge KE</title>
</svelte:head>

<div class="page-wrapper">
    <header class="hero-section">
        <div class="container">
            <div class="vote-badge">🗳️ Voting Period Concluded</div>
            <h1>Voting is Now Closed</h1>
            <p class="hero-intro">
                The community voting phase has ended. Thank you to everyone who participated 
                and cast their votes on policy proposals.
            </p>
        </div>
    </header>

    <main class="container">
        <div class="closed-content">
            <!-- How Voting Worked -->
            <div class="guidelines-grid">
                <div class="guideline-card">
                    <h3>Why Vote?</h3>
                    <p>Your vote directly contributes to the final selection of policy proposals. Final policy briefs selection incorporates both committee evaluation and community voting.</p>
                </div>
                <div class="guideline-card">
                    <h3>How to Vote</h3>
                    <p>We feature solutions for challenges each month. You get one vote per challenge. Select the solution you believe is the most relevant and click 'Vote'.</p>
                </div>
                <div class="guideline-card full-width">
                    <h3>What Happens Next?</h3>
                    <p>The shortlisted submissions, informed by your voting and our expert review, will be used by Policy Bridge KE and its Stakeholders to produce final policy briefs.</p>
                </div>
            </div>

            <div class="closed-notice">
                <span class="closed-icon">🔒</span>
                <p><strong>Voting has closed.</strong> Winning proposals are now being synthesized into policy briefs. New challenges are open for submissions.</p>
            </div>

            <div class="actions">
                <a href="/submit" class="btn-primary">View Active Challenges</a>
                <a href="/briefs" class="btn-secondary">Browse Policy Briefs</a>
            </div>
        </div>
    </main>
</div>

<style>
    :global(body) { 
        background-color: #f9fafb; 
        margin: 0; 
        font-family: 'Inter', sans-serif; 
        color: #111827; 
    }

    .container { 
        max-width: 1000px; 
        margin: 0 auto; 
        padding: 0 1.5rem; 
    }

    /* Hero */
    .hero-section { 
        background: white; 
        padding: 4rem 0 3rem; 
        border-bottom: 1px solid #e5e7eb; 
        text-align: center; 
    }

    .vote-badge { 
        background: #f1f5f9; 
        color: #64748b; 
        padding: 6px 16px; 
        border-radius: 99px; 
        font-weight: 700; 
        display: inline-block; 
        margin-bottom: 1rem; 
        font-size: 0.9rem; 
        border: 1px solid #e2e8f0; 
    }

    h1 { 
        font-size: 2.5rem; 
        margin: 0 0 0.5rem; 
        font-weight: 800; 
        letter-spacing: -0.03em;
    }

    .hero-intro { 
        color: #4b5563; 
        font-size: 1.1rem; 
        margin-top: 0.5rem; 
        max-width: 600px; 
        margin-left: auto; 
        margin-right: auto; 
        line-height: 1.6;
    }

    /* Content */
    .closed-content {
        padding: 3rem 0 5rem;
    }

    /* Guidelines */
    .guidelines-grid { 
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        gap: 1.5rem; 
        margin-bottom: 2rem; 
    }

    @media (max-width: 768px) {
        .guidelines-grid {
            grid-template-columns: 1fr;
        }
    }

    .guideline-card { 
        background: white; 
        padding: 1.5rem; 
        border-radius: 12px; 
        border: 1px solid #e2e8f0; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }

    .guideline-card h3 { 
        margin: 0 0 0.5rem; 
        font-size: 1rem; 
        color: #1e293b; 
        border-bottom: 2px solid #064e3b; 
        display: inline-block; 
        padding-bottom: 4px; 
    }

    .guideline-card p { 
        font-size: 0.9rem; 
        color: #64748b; 
        line-height: 1.6; 
        margin: 0.5rem 0 0 0; 
    }

    .full-width { 
        grid-column: span 2; 
    }

    @media (max-width: 768px) {
        .full-width {
            grid-column: span 1;
        }
    }

    /* Closed Notice */
    .closed-notice {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 1.5rem 2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2.5rem;
    }

    .closed-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
    }

    .closed-notice p {
        margin: 0;
        font-size: 0.95rem;
        color: #475569;
        line-height: 1.6;
    }

    .closed-notice strong {
        color: #0f172a;
    }

    /* Actions */
    .actions {
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: center;
    }

    @media (min-width: 480px) {
        .actions {
            flex-direction: row;
            justify-content: center;
        }
    }

    .btn-primary, .btn-secondary {
        display: inline-block;
        padding: 14px 28px;
        font-weight: 700;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        text-decoration: none;
        border-radius: 8px;
        transition: all 0.2s ease;
        text-align: center;
        min-width: 220px;
    }

    .btn-primary {
        background: #064e3b;
        color: white;
    }

    .btn-primary:hover {
        background: #043d2e;
        transform: translateY(-2px);
    }

    .btn-secondary {
        background: #ffffff;
        color: #475569;
        border: 2px solid #e2e8f0;
    }

    .btn-secondary:hover {
        background: #f8fafc;
        border-color: #cbd5e1;
    }
</style>