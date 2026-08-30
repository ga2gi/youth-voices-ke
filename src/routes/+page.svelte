<script>
    /** @type {import('./$types').PageData} */
    export let data;
    
    const metrics = {
        publishedBriefs: 2,
        liveChallenges: 5,
        communityMembers: "120+"
    };

    const heroBg = "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2000&auto=format&fit=crop";

    export const prerender = true;
</script>

<svelte:head>
    <title>PolicyBridge Kenya — Youth-Led Public Policy & Civic Engagement</title>
    <meta name="description" content="PolicyBridge Kenya is a youth-led civic platform strengthening youth participation in governance through crowdsourced solutions and evidence-based policy solutions." />
    <meta property="og:title" content="PolicyBridge Kenya — Youth-Led Public Policy" />
    <meta property="og:description" content="Strengthening meaningful youth participation in governance and policy making." />
    <meta property="og:type" content="website" />
</svelte:head>

<div class="page">

    <!-- Hero -->
    <section class="hero" style="background-image: linear-gradient(rgba(5, 46, 22, 0.9), rgba(5, 46, 22, 0.9)), url({heroBg});">
        <div class="container">
            <span class="hero-kicker">Youth-Led Public Policy & Civic Engagement</span>
            <h1>PolicyBridge <span class="text-green-light">KE</span></h1>
            <div class="hero-line"></div>
            <p class="hero-desc">
                PolicyBridge KE is a youth-led public policy and civic engagement organization dedicated to strengthening meaningful youth participation in governance and policy making. Through our Policy Lab model, we crowdsource youth-generated solutions, facilitate community participation, and synthesize ideas into evidence-based policy solutions for institutional engagement.
            </p>
            <div class="hero-actions">
                <a href="/submit" class="btn btn-primary">Contribute Your Solution</a>
                <a href="/briefs" class="btn btn-secondary">Policy Repository</a>
                <a href="/get-involved" class="btn btn-outline">Get Involved</a>
            </div>
        </div>
    </section>

    <!-- Manifesto -->
    <section class="manifesto">
        <div class="container">
            <div class="manifesto-card">
                <span class="kicker">Our Belief</span>
                <h2>Youth as Policy Co-Creators.<br><span class="text-green">Not voices in the crowd.</span></h2>
                <div class="divider"></div>
                <p>We empower young Kenyans to shape public policy by proposing practical, actionable solutions, then deliver them directly to decision-makers with transparency and accountability.</p>
                <p class="closing">Simple. Open. Credible.</p>
            </div>
        </div>
    </section>

    <!-- Pipeline -->
    <section class="pipeline">
        <div class="container">
            <div class="section-header">
                <span class="kicker">Methodology</span>
                <h2>The Policy Lab Pipeline</h2>
            </div>

            <div class="pipeline-grid">
                <div class="pipeline-step">
                    <span class="step-num">01</span>
                    <h3>Crowdsource</h3>
                    <p>Young Kenyans submit practical solutions to live policy challenges through our platform, surveys, and community dialogues.</p>
                </div>
                <div class="pipeline-step">
                    <span class="step-num">02</span>
                    <h3>Synthesize</h3>
                    <p>Community ideas are refined into formal, evidence-based policy briefs ready for institutional engagement.</p>
                </div>
                <div class="pipeline-step">
                    <span class="step-num">03</span>
                    <h3>Advocate & Track</h3>
                    <p>Briefs are delivered to government and stakeholders with public accountability tracking, so you see who responds.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Brief -->
    <section class="featured">
        <div class="container">
            <div class="featured-card">
                <span class="featured-label">Latest Policy Publication</span>
                <h3>Youth Mental Health in Kenya: From Listening to Implementation</h3>
                <p>A youth-led framework for accessible, affordable and youth-friendly mental-health support. Based on a National Youth Consultation across 20 counties, this brief proposes a Four-Pillar reform strategy to address Kenya's growing mental health crisis.</p>
                <a href="/briefs" class="featured-link">View Policy Brief →</a>
            </div>
        </div>
    </section>

    <!-- Metrics -->
    <section class="metrics">
        <div class="container">
            <div class="section-header">
                <span class="kicker">Transparency</span>
                <h2>Governance Metrics</h2>
                <p class="section-subtitle">Real-time indicators tracking our policy impact and community growth.</p>
            </div>

            <div class="metrics-grid">
                <div class="metric-card">
                    <span class="metric-value">{metrics.publishedBriefs}</span>
                    <span class="metric-label">Policy Briefs Published</span>
                    <p class="metric-desc">Youth Mental Health & Access to Capital</p>
                </div>
                <div class="metric-card dark">
                    <span class="metric-value">{metrics.liveChallenges}</span>
                    <span class="metric-label">Live Policy Challenges</span>
                    <p class="metric-desc">Open for youth-led solutions</p>
                </div>
                <div class="metric-card">
                    <span class="metric-value">{metrics.communityMembers}</span>
                    <span class="metric-label">Youth Contributors</span>
                    <p class="metric-desc">Growing community of co-creators</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Bottom CTA -->
    <section class="bottom-cta">
        <div class="container">
            <p>You see the issues. You live the challenges. <strong>You design the solutions.</strong></p>
            <div class="cta-actions">
                <a href="/submit" class="btn btn-primary">Contribute Your Solution</a>
                <a href="/get-involved" class="btn btn-dark-outline">Join the Community</a>
            </div>
        </div>
    </section>

</div>

<style>
    .page {
        font-family: system-ui, -apple-system, sans-serif;
        color: #0f172a;
        background: #ffffff;
    }

    .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 24px;
    }

    .kicker {
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: #064e3b;
    }

    .text-green { color: #064e3b; }
    .text-green-light { color: #6ee7b7; }

    .section-header {
        text-align: center;
        margin-bottom: 48px;
    }

    .section-header h2 {
        font-size: 2rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        margin: 8px 0;
    }

    .section-subtitle {
        color: #64748b;
        font-size: 0.95rem;
        margin: 8px 0 0;
    }

    .divider {
        width: 48px;
        height: 3px;
        background: #064e3b;
        margin: 24px auto;
    }

    /* Buttons */
    .btn {
        display: inline-block;
        padding: 16px 28px;
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        text-decoration: none;
        border-radius: 6px;
        transition: all 0.15s;
        text-align: center;
    }

    .btn-primary {
        background: #dc2626;
        color: white;
    }

    .btn-primary:hover {
        background: #b91c1c;
    }

    .btn-secondary {
        background: #064e3b;
        color: white;
    }

    .btn-secondary:hover {
        background: #043d2e;
    }

    .btn-outline {
        border: 2px solid rgba(255, 255, 255, 0.5);
        color: white;
    }

    .btn-outline:hover {
        background: white;
        color: #064e3b;
    }

    .btn-dark-outline {
        border: 2px solid #0f172a;
        color: #0f172a;
    }

    .btn-dark-outline:hover {
        background: #0f172a;
        color: white;
    }

    /* Hero */
    .hero {
        background-size: cover;
        background-position: center;
        padding: 100px 0;
        text-align: center;
        color: white;
    }

    .hero-kicker {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 3px;
        color: #6ee7b7;
        text-transform: uppercase;
    }

    .hero h1 {
        font-size: clamp(2.5rem, 7vw, 4rem);
        font-weight: 800;
        letter-spacing: -0.04em;
        margin: 16px 0;
    }

    .hero-line {
        width: 60px;
        height: 3px;
        background: #6ee7b7;
        margin: 24px auto;
    }

    .hero-desc {
        font-size: 1.05rem;
        max-width: 680px;
        margin: 0 auto 36px;
        color: rgba(255, 255, 255, 0.85);
        line-height: 1.7;
    }

    .hero-actions {
        display: flex;
        flex-direction: column;
        gap: 14px;
        align-items: center;
        justify-content: center;
    }

    @media (min-width: 768px) {
        .hero-actions {
            flex-direction: row;
            gap: 18px;
        }
        .hero {
            padding: 120px 0;
        }
    }

    /* Manifesto */
    .manifesto {
        margin-top: -40px;
        position: relative;
        z-index: 2;
        padding-bottom: 80px;
    }

    .manifesto-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 48px;
        text-align: center;
        max-width: 760px;
        margin: 0 auto;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
    }

    .manifesto-card h2 {
        font-size: clamp(1.5rem, 3vw, 2rem);
        font-weight: 800;
        line-height: 1.3;
        letter-spacing: -0.02em;
        margin: 12px 0 0;
    }

    .manifesto-card p {
        font-size: 1rem;
        color: #555;
        line-height: 1.7;
        max-width: 520px;
        margin: 0 auto;
    }

    .closing {
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 4px;
        text-transform: uppercase;
        color: #94a3b8;
        margin-top: 20px !important;
    }

    /* Pipeline */
    .pipeline {
        padding: 80px 0;
        background: #f8fafc;
    }

    .pipeline-grid {
        display: grid;
        gap: 28px;
    }

    @media (min-width: 900px) {
        .pipeline-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .pipeline-step {
        background: white;
        padding: 32px;
        border-radius: 10px;
        border: 1px solid #e5e7eb;
        border-top: 3px solid #064e3b;
    }

    .step-num {
        font-weight: 800;
        color: #d1d5db;
        font-size: 2.8rem;
        line-height: 1;
        display: block;
        margin-bottom: 16px;
    }

    .pipeline-step h3 {
        font-size: 1.2rem;
        font-weight: 700;
        margin: 0 0 8px;
        color: #1a1a1a;
    }

    .pipeline-step p {
        color: #555;
        font-size: 0.9rem;
        margin: 0;
        line-height: 1.6;
    }

    /* Featured */
    .featured {
        padding: 80px 0;
    }

    .featured-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 40px;
        border-left: 5px solid #064e3b;
    }

    .featured-label {
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 2px;
        color: #064e3b;
        text-transform: uppercase;
    }

    .featured-card h3 {
        font-size: 1.6rem;
        font-weight: 800;
        margin: 10px 0;
        letter-spacing: -0.02em;
        line-height: 1.2;
    }

    .featured-card p {
        color: #555;
        font-size: 1rem;
        line-height: 1.6;
        max-width: 560px;
        margin: 0 0 20px;
    }

    .featured-link {
        font-size: 0.85rem;
        font-weight: 700;
        color: #064e3b;
        text-decoration: none;
    }

    .featured-link:hover {
        color: #043d2e;
        text-decoration: underline;
    }

    /* Metrics */
    .metrics {
        padding: 80px 0;
        background: #f8fafc;
    }

    .metrics-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
    }

    @media (min-width: 640px) {
        .metrics-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .metric-card {
        background: white;
        padding: 36px 20px;
        text-align: center;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
    }

    .metric-card.dark {
        background: #0f172a;
        color: white;
        border: none;
    }

    .metric-card.dark .metric-label {
        color: #94a3b8;
    }

    .metric-card.dark .metric-desc {
        color: #cbd5e1;
    }

    .metric-value {
        display: block;
        font-size: 2.5rem;
        font-weight: 800;
        letter-spacing: -0.04em;
        margin-bottom: 6px;
        color: #064e3b;
    }

    .metric-card.dark .metric-value {
        color: white;
    }

    .metric-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #94a3b8;
        display: block;
        margin-bottom: 6px;
    }

    .metric-desc {
        font-size: 0.8rem;
        color: #64748b;
        margin: 0;
    }

    /* Bottom CTA */
    .bottom-cta {
        text-align: center;
        padding: 80px 0;
    }

    .bottom-cta p {
        font-size: 1.15rem;
        color: #334155;
        margin: 0 0 32px;
        line-height: 1.5;
    }

    .bottom-cta p strong {
        color: #0f172a;
    }

    .cta-actions {
        display: flex;
        flex-direction: column;
        gap: 14px;
        align-items: center;
        justify-content: center;
    }

    @media (min-width: 640px) {
        .cta-actions {
            flex-direction: row;
            gap: 18px;
        }
    }

    /* Responsive */
    @media (max-width: 768px) {
        .manifesto-card {
            padding: 32px 20px;
            margin: 0 16px;
        }
        .featured-card {
            padding: 24px;
        }
        .featured-card h3 {
            font-size: 1.3rem;
        }
        .pipeline-step {
            padding: 24px;
        }
        .section-header h2 {
            font-size: 1.6rem;
        }
        .metric-card {
            padding: 28px 16px;
        }
        .metric-value {
            font-size: 2rem;
        }
    }
</style>