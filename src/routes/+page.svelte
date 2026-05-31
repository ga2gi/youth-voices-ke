<script>
    /** @type {import('./$types').PageData} */
    export let data;
    
    const metrics = {
        publishedBriefs: 1,
        liveChallenges: 6,
        communityMembers: "120+"
    };

    const heroBg = "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2000&auto=format&fit=crop";

    export const prerender = true;
</script>

<svelte:head>
    <title>Policy Bridge KE | Youth Civic Platform in Kenya for Public Policy & Governance Reform</title>

    <meta name="description" content="Policy Bridge KE is a youth-led civic platform in Kenya transforming grassroots ideas into public policy, governance accountability, and legislative reform through citizen engagement." />

    <meta name="keywords" content="youth civic platform Kenya, civic tech Kenya, public policy Kenya, governance Kenya, youth participation Kenya, legislative reform Kenya, Kenya youth policy, civic engagement Kenya" />

    <meta name="author" content="Policy Bridge KE" />

    <meta name="robots" content="index, follow" />

    <meta property="og:title" content="Policy Bridge KE | Youth Civic Platform in Kenya" />
    <meta property="og:description" content="Transforming grassroots innovation into public policy and governance reform in Kenya." />
    <meta property="og:type" content="website" />
</svelte:head>

<div class="homepage-wrapper">

    <!-- ==================== HERO ==================== -->
    <section 
        class="hero-section" 
        style="background-image: linear-gradient(rgba(5, 46, 22, 0.85), rgba(5, 46, 22, 0.85)), url({heroBg});"
    >
        <div class="container hero-content">
            <span class="org-subtext">YOUTH-LED CIVIC PLATFORM | KENYA</span>
            <h1>Policy Bridge KE</h1>
            <div class="hero-line"></div>

            <p class="tagline">
                Policy Bridge KE is a youth-led civic platform in Kenya transforming grassroots ideas into actionable public policy and legislative reform.
                <br><br>
                We connect young people, communities, and decision-makers to shape evidence-based governance and national development.
            </p>

            <div class="cta-buttons">
                <a href="/submit" class="btn btn-primary">Contribute Your Solution</a>
                <a href="/briefs" class="btn btn-secondary">Policy Repository</a>
                <a href="/get-involved" class="btn btn-outline">Get Involved</a>
            </div>
        </div>
    </section>

    <!-- ==================== MANIFESTO ==================== -->
    <section class="manifesto-section">
        <div class="container">
            <div class="manifesto-card">
                <div class="manifesto-badge">OUR BELIEF</div>
                <h2 class="manifesto-headline">
                    Youth as Policy Co-Creators.<br>
                    <span class="headline-emphasis">Not voices in the crowd.</span>
                </h2>
                <div class="manifesto-divider"></div>
                <p class="manifesto-body">
                    We empower young Kenyans to shape public policy by proposing practical, 
                    actionable solutions — then deliver them directly to decision-makers with 
                    transparency and accountability.
                </p>
                <p class="manifesto-closing">
                    Simple. Open. Credible.
                </p>
            </div>
        </div>
    </section>

    <!-- ==================== PIPELINE ==================== -->
    <section class="action-module container">
        <div class="section-header">
            <span class="section-kicker">METHODOLOGY</span>
            <h2 class="section-title">The Policy Lab Pipeline</h2>
        </div>
        
        <div class="pipeline-grid">
            <div class="pipeline-step">
                <div class="step-num">01</div>
                <h3>Propose</h3>
                <p>Young Kenyans submit practical solutions to live policy challenges — no jargon, just clear thinking and evidence.</p>
            </div>
            
            <div class="pipeline-divider">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </div>

            <div class="pipeline-step">
                <div class="step-num">02</div>
                <h3>Synthesize</h3>
                <p>Expert-led refinement of community ideas into formal, evidence-based policy briefs ready for decision-makers.</p>
            </div>
            
            <div class="pipeline-divider">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </div>

            <div class="pipeline-step highlight-step">
                <div class="step-num">03</div>
                <div class="step-header">
                    <h3>Advocate & Track</h3>
                    <span class="live-pulse">LIVE</span>
                </div>
                <p>Direct delivery to stakeholders with real-time <strong>Accountability Tracking</strong> — so you see who responded and who hasn't.</p>
            </div>
        </div>
    </section>

    <!-- ==================== FEATURED BRIEF ==================== -->
    <section class="featured-highlight">
        <div class="container">
            <div class="brief-card">
                <div class="brief-label">LATEST POLICY PUBLICATION</div>
                <div class="brief-body">
                    <h3>Unlocking Kenya's Youth Access to Capital</h3>
                    <p>A youth-developed strategic framework addressing the KES 500B financing gap via a Five-Pillar reform strategy. Adopted by the National Treasury task force for the 2025 MSME Credit Guarantee Framework review.</p>
                    <div class="brief-actions">
                        <a href="/briefs" class="text-cta">View Policy Brief <span>→</span></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== METRICS ==================== -->
    <section class="impact-snapshot container">
        <div class="section-header">
            <span class="section-kicker">TRANSPARENCY</span>
            <h2 class="section-title">Governance Metrics</h2>
            <p class="section-subtitle">Real-time indicators tracking our policy impact and community growth.</p>
        </div>

        <div class="metrics-grid">
            <div class="metric-card active-metric">
                <span class="metric-value">{metrics.publishedBriefs}</span>
                <span class="metric-label">Policy Brief Published</span>
                <p class="metric-desc">Youth Access to Capital Framework</p>
            </div>

            <div class="metric-card">
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
        
        <div class="bottom-cta">
            <p>You see the issues. You live the challenges. <strong>You design the solutions.</strong></p>
            <div class="cta-group">
                <a href="/submit" class="btn btn-primary">Contribute Your Solution</a>
                <a href="/get-involved" class="btn btn-outline-dark">Join the Community</a>
            </div>
        </div>
    </section>

</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    .homepage-wrapper {
        font-family: 'Inter', sans-serif;
        color: #0f172a;
        line-height: 1.6;
        padding-bottom: 120px;
        background: #ffffff;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
    }

    /* ==================== HERO ==================== */
    .hero-section {
        position: relative;
        background-color: #052e16;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        color: #ffffff;
        padding: 140px 0 100px 0;
        text-align: center;
    }

    .hero-content { position: relative; z-index: 1; }

    .org-subtext {
        display: block;
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 4px;
        color: #10b981;
        margin-bottom: 1.5rem;
    }

    h1 {
        font-weight: 800;
        font-size: clamp(2.5rem, 8vw, 4.5rem);
        margin: 0;
        line-height: 1.1;
        letter-spacing: -0.05em;
    }

    .hero-line {
        height: 4px; 
        width: 80px;
        background: #10b981;
        margin: 32px auto;
    }

    .tagline {
        font-size: clamp(1.05rem, 2vw, 1.2rem);
        max-width: 720px;
        margin: 0 auto 48px;
        color: rgba(255,255,255,0.85);
        font-weight: 400;
        line-height: 1.7;
    }

    .cta-buttons { 
        display: flex; 
        flex-direction: column; 
        gap: 16px; 
        align-items: center; 
        justify-content: center; 
    }
    @media (min-width: 768px) { 
        .cta-buttons { flex-direction: row; gap: 20px; } 
    }

    .btn {
        display: inline-block;
        padding: 18px 32px;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.8rem;
        letter-spacing: 1px;
        text-decoration: none;
        transition: all 0.3s ease;
        border-radius: 8px;
        min-width: 220px;
        text-align: center;
    }

    .btn-primary { background: #10b981; color: white; border: none; }
    .btn-primary:hover { background: #059669; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(16,185,129,0.2); }

    .btn-secondary { background: #ef4444; color: white; border: none; }
    .btn-secondary:hover { background: #dc2626; transform: translateY(-3px); }

    .btn-outline { border: 2px solid rgba(255,255,255,0.4); color: #ffffff; }
    .btn-outline:hover { background: #ffffff; color: #064e3b; border-color: #ffffff; }

    .btn-outline-dark { border: 2px solid #0f172a; color: #0f172a; }
    .btn-outline-dark:hover { background: #0f172a; color: #ffffff; }

    /* ==================== MANIFESTO ==================== */
    .manifesto-section {
        padding: 0 0 0 0;
        margin-top: -40px;
        position: relative;
        z-index: 2;
    }

    .manifesto-card {
        background: #ffffff;
        border: 2px solid #0f172a;
        border-radius: 16px;
        padding: 56px 48px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(5, 46, 22, 0.12);
        max-width: 800px;
        margin: 0 auto;
    }

    .manifesto-badge {
        display: inline-block;
        font-size: 0.68rem;
        font-weight: 800;
        letter-spacing: 3px;
        color: #10b981;
        margin-bottom: 20px;
    }

    .manifesto-headline {
        font-size: clamp(1.6rem, 3vw, 2.2rem);
        font-weight: 800;
        line-height: 1.3;
        letter-spacing: -0.03em;
        color: #0f172a;
        margin: 0 0 24px 0;
    }

    .headline-emphasis {
        color: #10b981;
    }

    .manifesto-divider {
        width: 48px;
        height: 3px;
        background: #10b981;
        margin: 0 auto 28px;
    }

    .manifesto-body {
        font-size: 1.08rem;
        color: #475569;
        line-height: 1.75;
        max-width: 600px;
        margin: 0 auto 20px;
    }

    .manifesto-closing {
        font-size: 0.85rem;
        font-weight: 700;
        letter-spacing: 4px;
        text-transform: uppercase;
        color: #94a3b8;
        margin: 0;
    }

    /* ==================== SECTION HEADERS ==================== */
    .section-header { 
        text-align: center; 
        margin-bottom: 64px; 
        margin-top: 100px;
    }
    .section-kicker { 
        color: #10b981; 
        font-weight: 800; 
        font-size: 0.75rem; 
        letter-spacing: 3px; 
    }
    .section-title { 
        font-size: 2.5rem; 
        font-weight: 800; 
        margin-top: 12px; 
        margin-bottom: 8px;
        letter-spacing: -0.03em; 
    }
    .section-subtitle {
        color: #64748b;
        font-size: 1.05rem;
        margin: 0;
    }

    /* ==================== PIPELINE ==================== */
    .pipeline-grid { 
        display: grid; 
        gap: 32px; 
        margin: 60px 0 100px 0; 
    }

    .pipeline-step { 
        padding: 40px; 
        border-radius: 12px; 
        background: #ffffff; 
        border: 1px solid #e2e8f0; 
        transition: border-color 0.3s ease;
    }
    
    .step-num { 
        font-weight: 800; 
        color: #f1f5f9; 
        font-size: 3.5rem; 
        line-height: 1; 
        margin-bottom: 20px; 
    }
    .pipeline-step h3 { 
        margin: 0 0 12px 0; 
        font-size: 1.5rem; 
        font-weight: 700; 
        color: #1e293b; 
    }
    .pipeline-step p { 
        color: #64748b; 
        font-size: 1rem; 
        margin: 0; 
        line-height: 1.6;
    }
    
    .step-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
    }
    .step-header h3 { margin: 0; }

    .live-pulse {
        font-size: 0.65rem; 
        font-weight: 800; 
        color: #059669; 
        background: #ecfdf5;
        padding: 4px 10px; 
        border-radius: 100px; 
        border: 1px solid #059669;
        animation: livePulse 2s infinite;
    }

    @keyframes livePulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
    }

    .highlight-step { 
        border: 2px solid #10b981; 
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05); 
    }
    .pipeline-divider { 
        display: none; 
        align-self: center; 
        color: #cbd5e1; 
    }

    @media (min-width: 1024px) {
        .pipeline-grid { 
            grid-template-columns: 1fr auto 1fr auto 1fr; 
            align-items: stretch; 
        }
        .pipeline-divider { display: block; }
    }

    /* ==================== FEATURED BRIEF ==================== */
    .featured-highlight { 
        background: #f8fafc; 
        padding: 120px 0; 
    }
    .brief-card {
        background: white; 
        padding: 56px; 
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); 
        border-left: 8px solid #ef4444;
    }
    .brief-label { 
        color: #ef4444; 
        font-weight: 800; 
        font-size: 0.72rem; 
        letter-spacing: 2px; 
        margin-bottom: 20px; 
    }
    .brief-card h3 { 
        font-size: 2.2rem; 
        font-weight: 800; 
        margin-bottom: 16px; 
        letter-spacing: -0.02em; 
        line-height: 1.2;
    }
    .brief-card p {
        color: #475569;
        font-size: 1.05rem;
        line-height: 1.7;
        max-width: 680px;
    }
    .text-cta { 
        display: inline-block;
        color: #10b981; 
        text-decoration: none; 
        font-weight: 700; 
        font-size: 0.9rem; 
        margin-top: 28px; 
    }
    .text-cta:hover { text-decoration: underline; }
    .text-cta span { transition: transform 0.2s ease; display: inline-block; }
    .text-cta:hover span { transform: translateX(4px); }

    /* ==================== METRICS ==================== */
    .metrics-grid { 
        display: grid; 
        grid-template-columns: 1fr; 
        gap: 24px; 
        margin-bottom: 80px; 
    }
    @media (min-width: 640px) { 
        .metrics-grid { grid-template-columns: repeat(3, 1fr); } 
    }

    .metric-card { 
        background: #ffffff; 
        padding: 50px 24px; 
        text-align: center; 
        border: 1px solid #e2e8f0; 
        border-radius: 12px;
        transition: all 0.3s ease;
    }
    .metric-card:hover {
        border-color: #cbd5e1;
        box-shadow: 0 8px 24px rgba(0,0,0,0.04);
    }

    .active-metric { 
        background: #0f172a; 
        color: white; 
        border: none; 
    }
    .active-metric:hover {
        box-shadow: 0 12px 32px rgba(15, 23, 42, 0.2);
    }
    .active-metric .metric-label { color: #94a3b8; }
    .active-metric .metric-desc { color: #cbd5e1; }

    .metric-value { 
        display: block; 
        font-size: 3rem; 
        font-weight: 800; 
        margin-bottom: 8px; 
        letter-spacing: -0.05em; 
        line-height: 1;
    }
    .metric-label { 
        font-size: 0.7rem; 
        font-weight: 700; 
        color: #94a3b8; 
        text-transform: uppercase; 
        letter-spacing: 2px; 
        display: block;
        margin-bottom: 6px;
    }
    .metric-desc {
        font-size: 0.8rem;
        color: #64748b;
        margin: 0;
        font-weight: 500;
    }

    /* ==================== BOTTOM CTA ==================== */
    .bottom-cta { 
        text-align: center; 
        margin-top: 80px; 
        padding: 80px 40px; 
        background: #f1f5f9; 
        border-radius: 20px; 
    }
    .bottom-cta p { 
        font-size: 1.2rem; 
        color: #334155; 
        margin-bottom: 40px; 
        font-weight: 500; 
        line-height: 1.6;
    }
    .bottom-cta p strong {
        color: #0f172a;
    }
    .cta-group { 
        display: flex; 
        flex-direction: column; 
        gap: 16px; 
        align-items: center; 
        justify-content: center; 
    }
    @media (min-width: 640px) { 
        .cta-group { flex-direction: row; gap: 20px; } 
    }

    /* ==================== RESPONSIVE ==================== */
    @media (max-width: 768px) {
        .hero-section { padding: 100px 0 80px 0; }
        .manifesto-card { padding: 40px 24px; margin: 0 16px; }
        .manifesto-headline { font-size: 1.4rem; }
        .manifesto-body { font-size: 0.95rem; }
        .brief-card { padding: 32px 24px; }
        .brief-card h3 { font-size: 1.5rem; }
        .metric-value { font-size: 2.2rem; }
        .metric-card { padding: 36px 16px; }
        .section-title { font-size: 1.8rem; }
        .featured-highlight { padding: 80px 0; }
        .pipeline-step { padding: 28px 20px; }
    }
</style>