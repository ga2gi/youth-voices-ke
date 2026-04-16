<script lang="ts">
    import { enhance } from '$app/forms';
    import { fade, slide } from 'svelte/transition';

    export let data; 
    export let form; 

    const challengeMetadata = {
        "youth access to capital": {
            ref: "PL-ECO-001",
            sector: "Economic Inclusion",
            color: "#64748b", // Muted for 'Closed' look
            icon: "🔒",
            prompt: "Restructuring credit guarantee schemes (Phase 1 Complete).",
            stakeholders: "Partnership Pending",
            status: "Closed",
            currentStep: 4, 
            stats: { contributors: 8, ideas: 56 }
        },
        "youth-led mental health solutions": {
            ref: "PL-HEA-002",
            sector: "Public Health",
            color: "#6366f1", 
            icon: "🧠", // Mental health icon
            prompt: "Framework for ward-level funding utilizing 0.05% of county budgets.",
            stakeholders: "Partnership Pending",
            status: "Open for Proposals",
            currentStep: 1,
            stats: { contributors: 8, ideas: 18 }
        }
    };

    const stages = ["Ideation", "Technical Drafting", "Multi-Stakeholder Review", "Policy Synthesis", "Institutional Adoption"];
    let selectedChallenge = null;

    $: activeChallenges = data.challenges.map(db => {
        const cleanTitle = db.title.toLowerCase();
        let meta = null;

        for (const [key, value] of Object.entries(challengeMetadata)) {
            if (cleanTitle.includes(key)) {
                meta = value;
                break;
            }
        }
        
        if (meta) {
            return { ...db, ...meta };
        }

        return {
            ...db,
            ref: "PL-GEN-000",
            sector: "Inter-Sectoral",
            color: "#0f172a", 
            icon: "📁",
            prompt: db.title,
            stakeholders: "Partnership Pending",
            status: "Active",
            currentStep: 1,
            stats: { contributors: 8, ideas: 0 }
        };
    });

    function selectChallenge(challenge) {
        if (challenge.status.toLowerCase() === 'closed') return;
        selectedChallenge = challenge;
        setTimeout(() => {
            document.getElementById('submission-desk')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }
</script>

<div class="policy-lab">
    <header class="hero">
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <div class="badge">POLICY BRIDGE KE // CO-CREATION HUB</div>
            <h1>Submit a Solution</h1>
            <div class="hero-manifesto">
                <p>
                    Select an active policy challenge below to contribute your technical insights. 
                    <strong>Every submission is vetted</strong> and synthesized into formal briefs for legislative advocacy. 
                    Your expertise is the bridge between grassroots reality and national policy.
                </p>
                <p class="barrier-notice">
                    Peer-reviewed. Data-driven. Direct impact.
                </p>
            </div>
        </div>
    </header>

    {#if form?.message}
        <div class="alert" class:success={form.success} transition:fade>
            {form.message}
        </div>
    {/if}

    <div class="challenge-grid">
        {#each activeChallenges as challenge}
            <button 
                class="challenge-card" 
                class:active={selectedChallenge?.id === challenge.id}
                class:closed={challenge.status.toLowerCase() === 'closed'}
                style="--accent-color: {challenge.color}"
                on:click={() => selectChallenge(challenge)}
            >
                <div class="card-inner">
                    <div class="registry-header">
                        <span class="mono-ref">{challenge.ref}</span>
                        <span class="status-pill">{challenge.status}</span>
                    </div>

                    <div class="portfolio-label">
                        <span class="icon-small">{challenge.icon}</span>
                        <span>{challenge.sector} PORTFOLIO</span>
                    </div>

                    <h3>{challenge.title}</h3>
                    <p class="brief-desc">{challenge.prompt}</p>

                    <div class="data-table">
                        <div class="data-row">
                            <span class="label">CO-CREATION PARTNERS</span>
                            <span class="value">{challenge.stakeholders}</span>
                        </div>
                        <div class="data-row">
                            <span class="label">ENGAGEMENT STAGE</span>
                            <span class="value">{stages[challenge.currentStep]}</span>
                        </div>
                    </div>

                    <div class="card-footer">
                        <div class="progress-track">
                            <div class="progress-bar" style="width: {(challenge.currentStep / 4) * 100}%"></div>
                        </div>
                        <div class="action-link">
                            {challenge.status.toLowerCase() === 'closed' ? 'ARCHIVED' : 'SUBMIT SOLUTION →'}
                        </div>
                    </div>
                </div>
            </button>
        {/each}
    </div>

    {#if selectedChallenge}
        <section id="submission-desk" transition:slide={{ duration: 400 }}>
            <div class="dossier-form">
                <div class="form-header" style="background: {selectedChallenge.color}">
                    <div class="header-content">
                        <span class="kicker">TECHNICAL CO-CREATION PROTOCOL</span>
                        <h2>{selectedChallenge.ref} // {selectedChallenge.title}</h2>
                    </div>
                    <span class="large-icon">{selectedChallenge.icon}</span>
                </div>

                <div class="form-content">
                    <form method="POST" action="?/submit" use:enhance class="protocol-form">
                        <input type="hidden" name="challenge_id" value={selectedChallenge.id} />
                        <input type="hidden" name="challenge_title" value={selectedChallenge.title} />

                        <div class="form-grid">
                            <div class="input-group">
                                <label for="stk">RESPONSIBLE STAKEHOLDER</label>
                                <select id="stk" name="responsible_stakeholder" required>
                                    <option value="" disabled selected>Select stakeholder category...</option>
                                    <option value="National & County Governments">National & County Governments (Implementation & Budget)</option>
                                    <option value="Civil Society Organizations (CSOs) & NGOs">Civil Society (CSOs) & NGOs (Advocacy & Accountability)</option>
                                    <option value="Academic & Research Institutions">Academic & Research Institutions (Validation & Analysis)</option>
                                    <option value="Development Partners & Donors">Development Partners & Donors (Funding & Sustainability)</option>
                                    <option value="Private Sector & Tech Ecosystem">Private Sector & Tech Ecosystem (Digital & Innovation)</option>
                                    <option value="Oversight & Accountability Bodies">Oversight & Accountability Bodies (Legitimacy & Follow-through)</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <label for="tim">IMPLEMENTATION TIMELINE</label>
                                <select id="tim" name="implementation_timeline" required>
                                    <option value="Immediate">Immediate (0-6 Months)</option>
                                    <option value="Short-term">Short-term (1 Year)</option>
                                    <option value="Medium-term">Medium-term (2-5 Years)</option>
                                </select>
                            </div>
                        </div>

                        <div class="input-group">
                            <label for="sol">SOLUTION TEXT (METHODOLOGY & LOGIC)</label>
                            <textarea id="sol" name="solution_text" rows="5" placeholder="Outline the fiscal, regulatory, or operational path forward..." required></textarea>
                        </div>

                        <div class="input-group">
                            <label for="evid">SUPPORTING EVIDENCE</label>
                            <textarea id="evid" name="supporting_evidence" rows="2" placeholder="Link to research, existing Acts, or pilot evidence..."></textarea>
                        </div>

                        <div class="form-actions">
                            <div class="checkbox-group">
                                <label>
                                    <input type="checkbox" name="declaration" required /> 
                                    I certify that this submission is data-driven and adheres to Policy Bridge KE integrity standards.
                                </label>
                            </div>
                            <button type="submit" class="submit-btn" style="background: {selectedChallenge.color}">
                                SUBMIT SOLUTION
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    {/if}
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&family=Inter:wght@400;500;600;700;800&display=swap');

    :global(body) { background: #f8fafc; color: #0f172a; margin: 0; font-family: 'Inter', sans-serif; }

    .policy-lab { max-width: 1200px; margin: 0 auto; padding: 60px 24px 100px 24px; }

    /* Hero Section with Banner Image */
    .hero { 
        position: relative; 
        margin-bottom: 60px; 
        padding: 80px 50px; 
        background-color: #064e3b; 
        border-radius: 16px; 
        overflow: hidden; 
        color: white;
    }
    
    .hero-overlay {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background-image: url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2000');
        background-size: cover; background-position: center; opacity: 0.15;
    }

    .hero-content { position: relative; z-index: 1; }
    .hero h1 { font-size: 3.5rem; font-weight: 800; letter-spacing: -0.04em; margin: 0 0 20px 0; }
    .hero-manifesto p { font-size: 1.15rem; line-height: 1.6; max-width: 800px; opacity: 0.95; }
    .barrier-notice { font-weight: 700; color: #10b981; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; margin-top: 20px; }
    .badge { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; opacity: 0.7; margin-bottom: 12px; font-weight: 600; }

    /* Grid & Cards */
    .challenge-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 32px; }

    .challenge-card {
        background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;
        text-align: left; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer; padding: 0; position: relative;
    }

    .challenge-card:hover:not(.closed) { transform: translateY(-5px); border-color: var(--accent-color); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
    .challenge-card.closed { opacity: 0.6; filter: grayscale(0.5); cursor: not-allowed; }
    .challenge-card.active { border: 2px solid var(--accent-color); }

    .card-inner { padding: 36px; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;}

    .registry-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .mono-ref { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #64748b; font-weight: 700; }
    .status-pill { font-size: 0.7rem; font-weight: 800; padding: 4px 12px; border: 1px solid #e2e8f0; border-radius: 100px; text-transform: uppercase; color: #64748b; }

    .portfolio-label { display: flex; align-items: center; gap: 10px; font-size: 0.7rem; font-weight: 800; color: #94a3b8; letter-spacing: 0.1em; margin-bottom: 16px; }
    
    h3 { margin: 0 0 16px 0; font-size: 1.6rem; font-weight: 800; color: #0f172a; line-height: 1.1; }
    .brief-desc { font-size: 0.95rem; color: #475569; line-height: 1.5; margin-bottom: 32px; flex-grow: 1; }

    .data-table { border-top: 1px solid #f1f5f9; padding-top: 20px; margin-bottom: 28px; }
    .data-row { display: flex; justify-content: space-between; margin-bottom: 12px; }
    .data-row .label { font-size: 0.65rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
    .data-row .value { font-size: 0.8rem; font-weight: 600; color: #1e293b; }

    .progress-track { height: 4px; background: #f1f5f9; border-radius: 2px; margin-bottom: 20px; }
    .progress-bar { height: 100%; background: var(--accent-color); border-radius: 2px; transition: width 0.8s ease; }
    .action-link { font-size: 0.8rem; font-weight: 800; color: var(--accent-color); text-align: right; text-transform: uppercase; }

    /* Dossier Form */
    .dossier-form { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); margin-top: 80px; }
    .form-header { padding: 50px; color: white; display: flex; justify-content: space-between; align-items: center; }
    .header-content .kicker { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; opacity: 0.8; }
    .header-content h2 { font-size: 2.2rem; margin: 15px 0 0 0; font-weight: 800; }
    .large-icon { font-size: 4rem; opacity: 0.3; }

    .form-content { padding: 50px; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
    .input-group { margin-bottom: 35px; }
    .input-group label { display: block; font-size: 0.75rem; font-weight: 800; margin-bottom: 12px; color: #64748b; }
    
    select, textarea {
        width: 100%; padding: 18px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; font-size: 1rem;
    }
    select:focus, textarea:focus { outline: none; border-color: #6366f1; }

    .form-actions { display: flex; flex-direction: column; gap: 30px; border-top: 1px solid #f1f5f9; padding-top: 40px; }
    .checkbox-group label { font-size: 0.95rem; font-weight: 500; display: flex; align-items: center; gap: 14px; cursor: pointer; color: #475569; }
    
    .submit-btn { border: none; padding: 22px; color: white; font-weight: 800; cursor: pointer; font-size: 1.1rem; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.05em; }

    .alert { padding: 24px; border-radius: 8px; border: 1px solid #fecaca; background: #fef2f2; color: #991b1b; font-weight: 600; margin-bottom: 40px; }
    .alert.success { border-color: #bbf7d0; background: #f0fdf4; color: #166534; }

    @media (max-width: 900px) {
        .form-grid { grid-template-columns: 1fr; }
        .hero h1 { font-size: 2.5rem; }
    }
</style>