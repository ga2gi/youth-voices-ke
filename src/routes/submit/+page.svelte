<script lang="ts">
    import { enhance } from '$app/forms';
    import { fade, slide } from 'svelte/transition';

    export let data; 
    export let form; 

    const challengeMetadata = {
        "youth access to capital": {
            ref: "PL-ECO-001",
            sector: "Economic Inclusion",
            color: "#059669", // Vibrant Emerald instead of muted slate for better UI signaling
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
            icon: "🧠",
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
            status: "Open for Ideas",
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

            <h1>Share Your Solution</h1>

            <div class="hero-manifesto">
                <p>
                    Choose a challenge below and contribute your ideas, research, or lived experience.
                    <strong>Your submission is reviewed, refined, and turned into policy briefs</strong> that can influence real governance decisions in Kenya.
                </p>

                <p>
                    You don’t need perfect language — just clear thinking, evidence, or practical insight.
                    We help structure the rest.
                </p>

                <p class="barrier-notice">
                    Simple. Structured. Impact-driven.
                </p>
            </div>
        </div>
    </header>

    {#if form?.message}
        <div class="alert" class:success={form.success} transition:fade>
            <span class="alert-icon">{form.success ? '✓' : '⚠️'}</span>
            <p>{form.message}</p>
        </div>
    {/if}

    <div class="challenge-grid">
        {#each activeChallenges as challenge}
            <div 
                class="challenge-card" 
                class:active={selectedChallenge?.id === challenge.id}
                class:closed={challenge.status.toLowerCase() === 'closed'}
                style="--accent-color: {challenge.color}"
                role="button"
                tabindex={challenge.status.toLowerCase() === 'closed' ? -1 : 0}
                on:click={() => selectChallenge(challenge)}
                on:keydown={(e) => e.key === 'Enter' && selectChallenge(challenge)}
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
                            <span class="label">COLLABORATION STATUS</span>
                            <span class="value">{challenge.stakeholders}</span>
                        </div>
                        <div class="data-row">
                            <span class="label">CURRENT PHASE</span>
                            <span class="value">{stages[challenge.currentStep]}</span>
                        </div>
                    </div>

                    <div class="card-footer">
                        <div class="progress-container">
                            <div class="progress-track">
                                <div class="progress-bar" style="width: {(challenge.currentStep / 4) * 100}%"></div>
                            </div>
                            <span class="progress-percent">{Math.round((challenge.currentStep / 4) * 100)}%</span>
                        </div>

                        <div class="action-link">
                            {challenge.status.toLowerCase() === 'closed' 
                                ? 'ARCHIVED CASE' 
                                : 'CONTRIBUTE YOUR SOLUTION →'}
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>

    {#if selectedChallenge}
        <section id="submission-desk" transition:slide={{ duration: 400 }}>
            <div class="dossier-form">
                <div class="form-header" style="background: {selectedChallenge.color}">
                    <div class="header-content">
                        <span class="kicker">SUBMISSION WORKSPACE</span>
                        <h2>{selectedChallenge.ref} // {selectedChallenge.title}</h2>

                        <p class="form-context-p">
                            You are now contributing to a live policy pipeline. Your input will be reviewed and may inform national or county-level recommendations.
                        </p>
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
                                <div class="select-wrapper">
                                    <select id="stk" name="responsible_stakeholder" required>
                                        <option value="" disabled selected>Select stakeholder category...</option>
                                        <option value="National & County Governments">National & County Governments</option>
                                        <option value="Civil Society Organizations (CSOs) & NGOs">Civil Society (CSOs) & NGOs</option>
                                        <option value="Academic & Research Institutions">Academic & Research Institutions</option>
                                        <option value="Development Partners & Donors">Development Partners & Donors</option>
                                        <option value="Private Sector & Tech Ecosystem">Private Sector & Tech Ecosystem</option>
                                        <option value="Oversight & Accountability Bodies">Oversight & Accountability Bodies</option>
                                    </select>
                                </div>
                            </div>

                            <div class="input-group">
                                <label for="tim">IMPLEMENTATION TIMELINE</label>
                                <div class="select-wrapper">
                                    <select id="tim" name="implementation_timeline" required>
                                        <option value="Immediate">Immediate (0–6 Months)</option>
                                        <option value="Short-term">Short-term (1 Year)</option>
                                        <option value="Medium-term">Medium-term (2–5 Years)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="input-group">
                            <label for="sol">YOUR SOLUTION (CLEAR EXPLANATION)</label>
                            <textarea id="sol" name="solution_text" rows="5" placeholder="Explain your idea in simple terms. What should change and how?" required></textarea>
                        </div>

                        <div class="input-group">
                            <label for="evid">EVIDENCE OR SUPPORTING CONTEXT (OPTIONAL)</label>
                            <textarea id="evid" name="supporting_evidence" rows="2" placeholder="Any links, research, lived experience, or examples..."></textarea>
                        </div>

                        <div class="form-actions">
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" name="declaration" required /> 
                                    <span class="checkbox-text">I understand my submission may be refined into a public policy brief for civic impact.</span>
                                </label>
                            </div>

                            <button type="submit" class="submit-btn" style="background: {selectedChallenge.color}; --hover-color: {selectedChallenge.color}cc">
                                SUBMIT YOUR IDEA
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    {/if}
</div>

<style>
    /* Premium High-Contrast System Font Stack */
    .policy-lab { 
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        max-width: 1240px; 
        margin: 0 auto; 
        padding: 40px 24px 120px 24px; 
        color: #0f172a;
        -webkit-font-smoothing: antialiased;
    }

    /* Hero Component Blueprint */
    .hero { 
        position: relative; 
        margin-bottom: 48px; 
        padding: 64px 48px; 
        background-color: #042e16; 
        border-radius: 16px; 
        overflow: hidden; 
        color: white;
        box-shadow: 0 10px 25px -5px rgba(4, 46, 22, 0.15);
    }
    
    .hero-overlay {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background-image: url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2000');
        background-size: cover; background-position: center; opacity: 0.08;
        mix-blend-mode: overlay;
    }

    .hero-content { position: relative; z-index: 1; }

    .hero h1 { 
        font-size: clamp(2.2rem, 5vw, 3.5rem); 
        font-weight: 800; 
        letter-spacing: -0.04em; 
        margin: 0 0 24px 0; 
        line-height: 1.1;
    }

    .hero-manifesto p { 
        font-size: clamp(1rem, 2vw, 1.15rem); 
        line-height: 1.7; 
        max-width: 820px; 
        color: #e2e8f0;
        margin: 0 0 16px 0;
    }
    .hero-manifesto strong { color: #ffffff; font-weight: 600; }

    .barrier-notice { 
        font-weight: 700; 
        color: #34d399; 
        text-transform: uppercase; 
        font-size: 0.85rem; 
        letter-spacing: 0.08em; 
        margin-top: 28px !important; 
    }

    .badge { 
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; 
        font-size: 0.75rem; 
        color: #34d399;
        margin-bottom: 16px; 
        font-weight: 700; 
        letter-spacing: 0.05em;
    }

    /* Alert / Flash Infrastructure */
    .alert { 
        display: flex; 
        align-items: flex-start; 
        gap: 16px; 
        padding: 20px 24px; 
        border-radius: 12px; 
        margin-bottom: 40px; 
        border: 1px solid #e2e8f0;
        background: #f8fafc;
    }
    .alert.success { 
        background: #f0fdf4; 
        color: #14532d; 
        border-color: #bbf7d0; 
    }
    .alert p { margin: 0; font-size: 0.95rem; font-weight: 500; line-height: 1.5; }
    .alert-icon { font-size: 1.25rem; line-height: 1; }

    /* Interactive Challenge Portfolio Layout */
    .challenge-grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); 
        gap: 28px; 
    }

    .challenge-card {
        background: #ffffff; 
        border: 1px solid #e2e8f0; 
        border-radius: 14px;
        text-align: left; 
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        padding: 0;
        position: relative;
        outline: none;
    }

    .challenge-card:focus-visible {
        box-shadow: 0 0 0 3px #ffffff, 0 0 0 6px var(--accent-color);
    }

    .challenge-card:hover:not(.closed) {
        transform: translateY(-4px);
        border-color: var(--accent-color);
        box-shadow: 0 16px 32px -8px rgba(15, 23, 42, 0.08);
    }

    .challenge-card.closed { 
        opacity: 0.55; 
        filter: grayscale(0.8); 
        cursor: not-allowed; 
        background: #f8fafc;
    }

    .challenge-card.active { 
        border: 2px solid var(--accent-color); 
        box-shadow: 0 8px 24px -6px rgba(15, 23, 42, 0.04);
    }

    .card-inner { 
        padding: 32px; 
        display: flex; 
        flex-direction: column; 
        height: 100%; 
        box-sizing: border-box;
    }

    .registry-header { 
        display: flex; 
        justify-content: space-between; 
        align-items: center;
        margin-bottom: 20px; 
    }

    .mono-ref {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-weight: 700;
        font-size: 0.8rem;
        background: #f1f5f9;
        padding: 4px 8px;
        border-radius: 6px;
        color: #475569;
    }

    .status-pill {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.02em;
        padding: 4px 10px;
        border-radius: 100px;
        background: #e2e8f0;
        color: #334155;
    }
    .challenge-card:not(.closed) .status-pill {
        background: #e0f2fe;
        color: #0369a1;
    }

    .portfolio-label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.75rem;
        font-weight: 700;
        color: #64748b;
        letter-spacing: 0.05em;
        margin-bottom: 12px;
    }
    
    .challenge-card h3 { 
        font-size: 1.35rem; 
        font-weight: 700; 
        line-height: 1.3; 
        margin: 0 0 10px 0; 
        color: #0f172a;
        letter-spacing: -0.01em;
    }

    .brief-desc { 
        font-size: 0.95rem; 
        color: #475569; 
        margin: 0 0 24px 0; 
        line-height: 1.5;
        flex-grow: 1;
    }

    /* Matrix Internal Grid Data Layout */
    .data-table { 
        border-top: 1px dashed #e2e8f0; 
        padding-top: 18px;
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .data-row { 
        display: flex; 
        justify-content: space-between; 
        font-size: 0.75rem; 
        line-height: 1.4;
    }
    .data-row .label { color: #64748b; font-weight: 600; }
    .data-row .value { color: #0f172a; font-weight: 700; text-align: right; }

    .card-footer { 
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    .progress-container {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .progress-track {
        flex-grow: 1;
        height: 6px;
        background: #f1f5f9;
        border-radius: 100px;
        overflow: hidden;
    }

    .progress-bar {
        height: 100%;
        background: var(--accent-color);
        border-radius: 100px;
        transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .progress-percent {
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 0.75rem;
        font-weight: 700;
        color: #64748b;
    }

    .action-link { 
        font-size: 0.8rem; 
        font-weight: 700; 
        color: var(--accent-color); 
        text-align: right; 
        letter-spacing: 0.02em;
    }
    .challenge-card.closed .action-link { color: #94a3b8; }

    /* Submission Workspace Area */
    #submission-desk { margin-top: 64px; }

    .dossier-form {
        background: #ffffff;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
        overflow: hidden;
    }

    .form-header {
        padding: 40px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 24px;
        position: relative;
    }

    .form-header .kicker {
        font-size: 0.75rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        opacity: 0.8;
        display: block;
        margin-bottom: 8px;
    }

    .form-header h2 {
        font-size: 1.75rem;
        font-weight: 800;
        margin: 0;
        letter-spacing: -0.02em;
        line-height: 1.2;
    }

    .form-context-p { margin: 12px 0 0 0; opacity: 0.85; font-size: 0.95rem; max-width: 720px; line-height: 1.6; }

    .large-icon { font-size: 3rem; opacity: 0.25; line-height: 1; }

    .form-content { padding: 40px; }

    .protocol-form { display: flex; flex-direction: column; gap: 24px; }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
    }
    @media (min-width: 768px) {
        .form-grid { grid-template-columns: repeat(2, 1fr); }
    }

    /* Structured Layout Controls Inputs */
    .input-group { display: flex; flex-direction: column; gap: 8px; }

    .input-group label {
        font-size: 0.75rem;
        font-weight: 700;
        color: #475569;
        letter-spacing: 0.05em;
    }

    .select-wrapper { position: relative; }

    select, textarea {
        width: 100%;
        padding: 14px 16px;
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        font-family: inherit;
        font-size: 0.95rem;
        color: #0f172a;
        box-sizing: border-box;
        transition: all 0.2s ease;
    }

    select {
        appearance: none;
        cursor: pointer;
        padding-right: 40px;
    }

    .select-wrapper::after {
        content: "▾";
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: #64748b;
        pointer-events: none;
        font-size: 1rem;
    }

    textarea { resize: vertical; }

    select:focus, textarea:focus {
        outline: none;
        background: #ffffff;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.05);
    }

    /* Operations Matrix Action Bar */
    .form-actions {
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin-top: 12px;
        padding-top: 24px;
        border-top: 1px solid #e2e8f0;
    }
    @media (min-width: 768px) {
        .form-actions {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }

    .checkbox-group { max-width: 520px; }
    
    .checkbox-label {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        cursor: pointer;
    }

    .checkbox-label input {
        margin-top: 3px;
        width: 16px;
        height: 16px;
        accent-color: var(--accent-color);
        cursor: pointer;
    }

    .checkbox-text { font-size: 0.85rem; color: #475569; line-height: 1.5; font-weight: 500; }

    .submit-btn {
        border: none;
        padding: 16px 32px;
        color: white;
        font-weight: 700;
        font-size: 0.85rem;
        letter-spacing: 0.05em;
        cursor: pointer;
        border-radius: 8px;
        text-transform: uppercase;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        white-space: nowrap;
        align-self: flex-start;
    }
    @media (min-width: 768px) { .submit-btn { align-self: auto; } }

    .submit-btn:hover {
        background: var(--hover-color) !important;
        transform: translateY(-1px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }
    .submit-btn:active { transform: translateY(0); }
</style>