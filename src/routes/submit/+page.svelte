<script lang="ts">
    import { enhance } from '$app/forms';
    import { fade } from 'svelte/transition';

    export let data; 
    export let form; 

    const challengeMetadata = {
        "gender-based violence & femicide prevention in kenya": {
            ref: "PL-GEN-001",
            sector: "Gender & Public Safety",
            color: "#7c3aed",
            icon: "⚖️",
            prompt: "Despite legal frameworks, gaps persist in prevention, reporting, and accountability mechanisms.",
            context: "Gender-based violence and femicide remain serious challenges in Kenya, involving legal, social, and institutional dimensions.",
            keyData: [
                "~13 women killed weekly (recent estimates)",
                "Majority of cases involve known perpetrators",
                "Underreporting remains high due to stigma"
            ],
            guidingQuestions: [
                "What gaps exist in prevention systems?",
                "How can reporting and response be improved?",
                "What institutional weaknesses affect accountability?"
            ],
            sdg: "SDG 5: Gender Equality | SDG 16: Peace & Justice",
            vision2030: "Social Pillar: Gender equality | Governance Pillar: Rule of law",
            submissionGuide: "Address: (1) Specific prevention gaps, (2) Concrete improvements to reporting, (3) How institutions could coordinate better. Evidence can include personal experiences, research, or relevant reports."
        },
        "public participation & civic awareness in kenya": {
            ref: "PL-GOV-002",
            sector: "Governance & Civic Engagement",
            color: "#0891b2",
            icon: "🗳️",
            prompt: "Challenges include accessibility, information gaps, weak feedback systems, and limited youth inclusion.",
            context: "Kenya's Constitution guarantees public participation, but implementation varies in quality and influence on decision-making.",
            keyData: [
                "Youth form majority of population",
                "Participation processes show low awareness",
                "Limited visibility of how input influences decisions"
            ],
            guidingQuestions: [
                "What barriers prevent meaningful participation?",
                "How can civic awareness be improved?",
                "How can feedback loops be strengthened?"
            ],
            sdg: "SDG 16: Peace & Justice | SDG 4: Quality Education",
            vision2030: "Governance Pillar: Citizen engagement and accountability",
            submissionGuide: "Focus on: (1) Making participation easier for citizens, (2) Digital or offline tools for feedback, (3) How government should demonstrate input was used."
        },
        "the creative economy & youth opportunities in kenya": {
            ref: "PL-ECO-003",
            sector: "Creative Economy & Youth Empowerment",
            color: "#f59e0b",
            icon: "🎨",
            prompt: "Challenges include limited funding, weak IP protection, poor market access, and weak institutional support.",
            context: "Kenya's creative sector is rapidly growing but remains largely informal and under-protected.",
            keyData: [
                "Creative economy contributes ~5% of GDP",
                "Majority of creatives operate informally",
                "Weak IP enforcement affects earnings"
            ],
            guidingQuestions: [
                "What barriers affect creative livelihoods?",
                "How can market access be improved?",
                "How can creative work be protected?"
            ],
            sdg: "SDG 8: Decent Work | SDG 9: Industry & Innovation",
            vision2030: "Economic Pillar: Creative industries | Social Pillar: Youth employment",
            submissionGuide: "Consider: (1) Formalizing creative work without burdening artists, (2) Practical IP protection, (3) Market access platforms that work locally."
        },
        "environmental sustainability & waste management in kenya": {
            ref: "PL-ENV-004",
            sector: "Environment & Urban Sustainability",
            color: "#059669",
            icon: "🌱",
            prompt: "Key issues include weak enforcement, inadequate infrastructure, and low recycling adoption.",
            context: "Environmental systems face pressure due to urbanization, waste generation, and uneven infrastructure.",
            keyData: [
                "Waste management varies across counties",
                "Recycling systems remain limited",
                "Urban areas face pollution challenges"
            ],
            guidingQuestions: [
                "What barriers exist in waste management?",
                "How can recycling be improved?",
                "How can communities participate effectively?"
            ],
            sdg: "SDG 11: Sustainable Cities | SDG 12: Responsible Consumption",
            vision2030: "Environmental Pillar: Clean and sustainable environment",
            submissionGuide: "Think about: (1) Waste separation at source, (2) Incentive models for recycling, (3) County collaboration with informal collectors."
        },
        "drought, food security & community resilience in kenya": {
            ref: "PL-CLI-005",
            sector: "Climate Resilience & Food Systems",
            color: "#dc2626",
            icon: "🌾",
            prompt: "Challenges include weak resilience systems, water insecurity, and limited climate adaptation infrastructure.",
            context: "Kenya is highly vulnerable to climate variability, with recurring droughts affecting agriculture and livelihoods.",
            keyData: [
                "Millions affected by periodic food insecurity",
                "High food poverty levels in ASAL counties",
                "Climate shocks disrupt agriculture"
            ],
            guidingQuestions: [
                "What drives food insecurity in different regions?",
                "How can resilience systems be strengthened?",
                "What structural gaps exist in current policy?"
            ],
            sdg: "SDG 2: Zero Hunger | SDG 13: Climate Action",
            vision2030: "Environmental Pillar: Climate resilience | Economic Pillar: Agricultural transformation",
            submissionGuide: "Address: (1) Water harvesting for ASAL regions, (2) Long-term resilience vs emergency aid, (3) Drought-resistant practices or alternative livelihoods."
        },
        "youth-led mental health solutions": {
            ref: "PL-HEA-002",
            sector: "Public Health & Wellbeing",
            color: "#6366f1",
            icon: "🧠",
            prompt: "Framework for ward-level funding to address the growing mental health crisis among young Kenyans.",
            context: "Mental health challenges among youth have reached crisis levels, with limited access, persistent stigma, and inadequate funding.",
            keyData: [
                "~100 psychiatrists for 50+ million population",
                "Mental health receives <0.5% of health budget",
                "75% of those with conditions lack access to care"
            ],
            guidingQuestions: [
                "How can ward-level funding be structured for impact?",
                "What community-based interventions are effective?",
                "How can peer support be integrated into health systems?"
            ],
            sdg: "SDG 3: Good Health | SDG 10: Reduced Inequalities",
            vision2030: "Social Pillar: Health access | Governance Pillar: Decentralized services",
            submissionGuide: "Focus on: (1) Mechanisms for ward-level funds, (2) Mental health in primary care and schools, (3) Community models that reduce stigma.",
            highlights: "Policy brief published August 2026: 'Youth Mental Health in Kenya: From Listening to Implementation.' Four-Pillar framework with ward-level integration, education access points, community safe spaces, and digital support.",
            status: "Closed"
        },
        "youth access to capital": {
            ref: "PL-ECO-001",
            sector: "Economic Inclusion & Finance",
            color: "#78716c",
            icon: "🏦",
            prompt: "Restructuring credit guarantee schemes to unlock capital for youth-led enterprises.",
            context: "Young entrepreneurs cite access to affordable capital as their number one barrier to business growth.",
            keyData: [
                "Youth unemployment ~35-40%",
                "~80% of youth enterprises operate informally",
                "Only 15% of young entrepreneurs access formal credit"
            ],
            sdg: "SDG 1: No Poverty | SDG 8: Decent Work",
            vision2030: "Economic Pillar: MSME development | Social Pillar: Youth employment",
            highlights: "Policy brief published April 2026: 'Unlocking Kenya's Youth Access to Capital: A Five-Pillar Reform Framework.' Policy brief submitted to multiple stakeholders. Live accountability tracking available.",
            status: "Closed"
        }
    };

    const stages = ["Ideation", "Technical Drafting", "Multi-Stakeholder Review", "Policy Synthesis", "Institutional Adoption"];
    let selectedChallenge = null;
    let showSubmissionGuide = false;

    $: allChallenges = data.challenges.map(db => {
        const cleanTitle = db.title.toLowerCase().trim();
        let meta = null;

        for (const [key, value] of Object.entries(challengeMetadata)) {
            if (cleanTitle === key || cleanTitle.includes(key)) {
                meta = value;
                break;
            }
        }
        
        return meta 
            ? { ...db, ...meta, cleanTitle }
            : {
                ...db,
                ref: "PL-GEN-000",
                sector: "Inter-Sectoral",
                color: "#0f172a",
                icon: "📁",
                prompt: db.title,
                status: "Open for Ideas",
                cleanTitle
            };
    });

    $: activeChallenges = allChallenges.filter(c => c.status !== 'Closed');
    $: pastChallenges = allChallenges.filter(c => c.status === 'Closed');

    function selectChallenge(challenge) {
        if (challenge.status === 'Closed') return;
        selectedChallenge = challenge;
        showSubmissionGuide = false;
        setTimeout(() => {
            document.getElementById('submission-desk')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }
</script>

<div class="submit-page">
    <!-- Header -->
    <section class="page-header">
        <h1>Submit Your Solution</h1>
        <p>Choose a challenge below and contribute your ideas. Your submission is reviewed and may inform real policy recommendations. You don't need perfect language — just clear thinking and practical insight.</p>
    </section>

    {#if form?.message}
        <div class="alert" class:success={form.success} transition:fade>
            <span>{form.success ? '✓' : '⚠️'}</span>
            <p>{form.message}</p>
        </div>
    {/if}

    <!-- Active Challenges -->
    <section class="section">
        <div class="section-header">
            <h2>Active Challenges</h2>
            <span class="badge active">● Open for Submissions</span>
        </div>

        <div class="challenge-grid">
            {#each activeChallenges as challenge}
                <button 
                    class="challenge-card" 
                    class:selected={selectedChallenge?.id === challenge.id}
                    style="--accent: {challenge.color}"
                    on:click={() => selectChallenge(challenge)}
                >
                    <div class="card-top">
                        <span class="ref">{challenge.ref}</span>
                        <span class="icon">{challenge.icon}</span>
                    </div>
                    <h3>{challenge.title}</h3>
                    <p class="desc">{challenge.prompt}</p>
                    
                    {#if challenge.context}
                        <div class="context">
                            <p>{challenge.context}</p>
                            {#if challenge.keyData}
                                <ul class="data-points">
                                    {#each challenge.keyData as point}
                                        <li>{point}</li>
                                    {/each}
                                </ul>
                            {/if}
                        </div>
                    {/if}

                    <div class="meta">
                        <span>{challenge.sdg}</span>
                    </div>

                    <span class="cta">Contribute →</span>
                </button>
            {/each}
        </div>
    </section>

    <!-- Past Challenges -->
    {#if pastChallenges.length > 0}
        <section class="section past">
            <div class="section-header">
                <h2>Past Challenges</h2>
                <span class="badge closed">◉ Completed</span>
            </div>

            <div class="challenge-grid">
                {#each pastChallenges as challenge}
                    <div class="challenge-card closed" style="--accent: {challenge.color}">
                        <div class="card-top">
                            <span class="ref">{challenge.ref}</span>
                            <span class="icon">{challenge.icon}</span>
                        </div>
                        <h3>{challenge.title}</h3>
                        <p class="desc">{challenge.prompt}</p>
                        
                        {#if challenge.highlights}
                            <div class="outcome">
                                <span class="outcome-label">Outcome</span>
                                <p>{challenge.highlights}</p>
                            </div>
                        {/if}

                        <div class="meta">
                            <span>{challenge.sdg}</span>
                        </div>

                        <span class="cta completed">Policy Brief Published ✓</span>
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- Submission Form -->
    {#if selectedChallenge}
        <section id="submission-desk" class="form-section" transition:fade>
            <div class="form-container">
                <div class="form-header" style="background: {selectedChallenge.color}">
                    <div>
                        <span class="form-ref">{selectedChallenge.ref}</span>
                        <h2>{selectedChallenge.title}</h2>
                        <p>Your input will be reviewed and may inform national or county-level policy recommendations.</p>
                        
                        {#if selectedChallenge.guidingQuestions}
                            <div class="questions">
                                <span>Guiding Questions:</span>
                                <ul>
                                    {#each selectedChallenge.guidingQuestions as question}
                                        <li>{question}</li>
                                    {/each}
                                </ul>
                            </div>
                        {/if}
                    </div>
                    <span class="form-icon">{selectedChallenge.icon}</span>
                </div>

                <div class="form-body">
                    {#if selectedChallenge.submissionGuide}
                        <button 
                            type="button" 
                            class="guide-toggle" 
                            on:click={() => showSubmissionGuide = !showSubmissionGuide}
                        >
                            <span>{showSubmissionGuide ? '▾' : '▸'}</span>
                            {showSubmissionGuide ? 'Hide' : 'Show'} Submission Guide
                        </button>
                        
                        {#if showSubmissionGuide}
                            <div class="guide-content" transition:fade>
                                <p>{selectedChallenge.submissionGuide}</p>
                                <div class="guide-tips">
                                    <span>Tips:</span>
                                    <ul>
                                        <li><strong>Be specific</strong> — "Allocate 2% of county budgets to..." is actionable.</li>
                                        <li><strong>Include who</strong> — Which institution should implement your idea?</li>
                                        <li><strong>Evidence matters</strong> — Personal experience, research, or examples all count.</li>
                                        <li><strong>Optional contact</strong> — Leave your email for follow-up (not published).</li>
                                    </ul>
                                </div>
                            </div>
                        {/if}
                    {/if}

                    <form method="POST" action="?/submit" use:enhance class="form">
                        <input type="hidden" name="challenge_id" value={selectedChallenge.id} />
                        <input type="hidden" name="challenge_title" value={selectedChallenge.title} />

                        <div class="form-row">
                            <div class="field">
                                <label for="stk">Responsible Stakeholder</label>
                                <p class="hint">Who should implement this solution?</p>
                                <select id="stk" name="responsible_stakeholder" required>
                                    <option value="" disabled selected>Select stakeholder...</option>
                                    <option value="National Government">National Government (Ministries & Agencies)</option>
                                    <option value="County Government">County Government</option>
                                    <option value="Civil Society & NGOs">Civil Society Organizations & NGOs</option>
                                    <option value="Academic & Research">Academic & Research Institutions</option>
                                    <option value="Development Partners">Development Partners & Donors</option>
                                    <option value="Private Sector">Private Sector & Tech Ecosystem</option>
                                    <option value="Community-Based">Community-Based Organizations</option>
                                    <option value="Multi-Stakeholder">Multi-Stakeholder Partnership</option>
                                </select>
                            </div>

                            <div class="field">
                                <label for="tim">Implementation Timeline</label>
                                <p class="hint">Realistic timeframe for your solution</p>
                                <select id="tim" name="implementation_timeline" required>
                                    <option value="" disabled selected>Select timeline...</option>
                                    <option value="Immediate (0–6 Months)">Immediate (0–6 Months)</option>
                                    <option value="Short-term (6–12 Months)">Short-term (6–12 Months)</option>
                                    <option value="Medium-term (1–3 Years)">Medium-term (1–3 Years)</option>
                                    <option value="Long-term (3–5 Years)">Long-term (3–5 Years)</option>
                                    <option value="Ongoing">Ongoing/Continuous</option>
                                </select>
                            </div>
                        </div>

                        <div class="field">
                            <label for="sol">Your Solution <span class="required">*</span></label>
                            <p class="hint">Explain your idea clearly. What should change and how?</p>
                            <textarea 
                                id="sol" 
                                name="solution_text" 
                                rows="6" 
                                placeholder="Describe your policy solution:
• What needs to change (the specific policy, system, or practice)
• How it should be implemented
• Who is responsible
• Who benefits and how"
                                required
                            ></textarea>
                        </div>

                        <div class="field">
                            <label for="evid">Supporting Evidence</label>
                            <p class="hint">Optional — links, research, lived experience, or examples</p>
                            <textarea 
                                id="evid" 
                                name="supporting_evidence" 
                                rows="3" 
                                placeholder="Examples: personal experience, news articles, research, similar solutions from elsewhere"
                            ></textarea>
                        </div>

                        <div class="field">
                            <label for="cont">Contact (Optional)</label>
                            <p class="hint">Email or phone for follow-up — will not be published</p>
                            <input 
                                type="text" 
                                id="cont" 
                                name="optional_contact" 
                                placeholder="Email or phone number"
                            />
                        </div>

                        <div class="form-footer">
                            <label class="checkbox">
                                <input type="checkbox" name="declaration" required />
                                <span>I confirm this is my original contribution and understand it may be refined into a public policy brief.</span>
                            </label>

                            <button type="submit" class="submit-btn" style="background: {selectedChallenge.color}">
                                Submit Solution
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    {/if}
</div>

<style>
    .submit-page {
        max-width: 1100px;
        margin: 0 auto;
        padding: 48px 24px 80px;
        font-family: system-ui, -apple-system, sans-serif;
        color: #1a1a1a;
    }

    /* Header */
    .page-header {
        text-align: center;
        margin-bottom: 48px;
    }

    .page-header h1 {
        font-size: 2.25rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        margin-bottom: 12px;
    }

    .page-header p {
        font-size: 1rem;
        color: #555;
        max-width: 640px;
        margin: 0 auto;
        line-height: 1.6;
    }

    /* Alert */
    .alert {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        border-radius: 8px;
        margin-bottom: 32px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        font-size: 0.9rem;
    }
    .alert.success {
        background: #f0fdf4;
        color: #14532d;
        border-color: #bbf7d0;
    }
    .alert p { margin: 0; }

    /* Sections */
    .section {
        margin-bottom: 56px;
    }
    .section.past {
        padding-top: 48px;
        border-top: 1px solid #e5e7eb;
    }

    .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        flex-wrap: wrap;
        gap: 12px;
    }

    .section-header h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
    }

    .badge {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        padding: 4px 12px;
        border-radius: 100px;
    }
    .badge.active {
        background: #dcfce7;
        color: #166534;
    }
    .badge.closed {
        background: #f1f5f9;
        color: #64748b;
    }

    /* Challenge Grid */
    .challenge-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 20px;
    }

    .challenge-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 24px;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
        width: 100%;
    }

    .challenge-card:hover:not(.closed) {
        border-color: var(--accent);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.06);
    }

    .challenge-card.selected {
        border: 2px solid var(--accent);
    }

    .challenge-card.closed {
        opacity: 0.75;
        cursor: default;
    }

    .card-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }

    .ref {
        font-family: ui-monospace, monospace;
        font-size: 0.7rem;
        font-weight: 700;
        background: #f1f5f9;
        padding: 3px 8px;
        border-radius: 4px;
        color: #64748b;
    }

    .icon {
        font-size: 1.5rem;
    }

    .challenge-card h3 {
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 8px 0;
        line-height: 1.3;
    }

    .desc {
        font-size: 0.85rem;
        color: #555;
        margin: 0 0 14px 0;
        line-height: 1.5;
    }

    .context {
        background: #f8fafc;
        border-left: 3px solid var(--accent);
        padding: 12px 14px;
        margin-bottom: 14px;
        border-radius: 0 6px 6px 0;
        font-size: 0.8rem;
        color: #475569;
        line-height: 1.5;
    }
    .context p { margin: 0 0 8px 0; }

    .data-points {
        margin: 0;
        padding-left: 16px;
        font-size: 0.78rem;
        color: #64748b;
        line-height: 1.5;
    }

    .meta {
        font-size: 0.7rem;
        color: #94a3b8;
        margin-bottom: 12px;
    }

    .outcome {
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
        border-radius: 6px;
        padding: 10px 14px;
        margin-bottom: 14px;
    }

    .outcome-label {
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #166534;
        display: block;
        margin-bottom: 4px;
    }

    .outcome p {
        font-size: 0.8rem;
        color: #14532d;
        margin: 0;
        line-height: 1.4;
    }

    .cta {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--accent);
    }
    .cta.completed {
        color: #94a3b8;
    }

    /* Form Section */
    .form-section {
        margin-top: 48px;
    }

    .form-container {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        overflow: hidden;
    }

    .form-header {
        padding: 32px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 20px;
    }

    .form-ref {
        font-family: ui-monospace, monospace;
        font-size: 0.7rem;
        font-weight: 700;
        opacity: 0.8;
        letter-spacing: 0.04em;
    }

    .form-header h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 4px 0 8px 0;
        line-height: 1.2;
    }

    .form-header p {
        font-size: 0.9rem;
        opacity: 0.9;
        margin: 0;
        line-height: 1.5;
    }

    .questions {
        margin-top: 16px;
        padding: 12px;
        background: rgba(255,255,255,0.1);
        border-radius: 6px;
    }

    .questions span {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.9;
    }

    .questions ul {
        margin: 6px 0 0 0;
        padding-left: 18px;
        font-size: 0.83rem;
        opacity: 0.9;
        line-height: 1.5;
    }

    .form-icon {
        font-size: 2.5rem;
        opacity: 0.3;
        flex-shrink: 0;
    }

    .form-body {
        padding: 32px;
    }

    /* Guide Toggle */
    .guide-toggle {
        width: 100%;
        padding: 12px 16px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        cursor: pointer;
        font-family: inherit;
        font-size: 0.85rem;
        font-weight: 600;
        color: #475569;
        text-align: left;
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .guide-toggle:hover {
        background: #f1f5f9;
    }

    .guide-content {
        background: #fafafa;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 24px;
    }

    .guide-content p {
        font-size: 0.85rem;
        color: #475569;
        line-height: 1.6;
        margin: 0 0 14px 0;
    }

    .guide-tips {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        padding: 12px 16px;
    }

    .guide-tips span {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #64748b;
    }

    .guide-tips ul {
        margin: 6px 0 0 0;
        padding-left: 16px;
        font-size: 0.8rem;
        color: #475569;
        line-height: 1.5;
    }

    /* Form Fields */
    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .field label {
        font-size: 0.8rem;
        font-weight: 700;
        color: #475569;
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }

    .required {
        color: #dc2626;
        font-weight: 400;
    }

    .hint {
        font-size: 0.75rem;
        color: #94a3b8;
        margin: 0 0 4px 0;
    }

    select, textarea, input[type="text"] {
        padding: 12px 14px;
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        font-family: inherit;
        font-size: 0.9rem;
        color: #1a1a1a;
        transition: all 0.2s;
    }

    select {
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2364748b' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 14px center;
        padding-right: 36px;
        cursor: pointer;
    }

    textarea { resize: vertical; }

    select:focus, textarea:focus, input:focus {
        outline: none;
        background: white;
        border-color: var(--accent, #0f172a);
        box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.04);
    }

    textarea::placeholder, input::placeholder {
        color: #94a3b8;
        font-size: 0.83rem;
        line-height: 1.5;
    }

    .form-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;
        flex-wrap: wrap;
    }

    .checkbox {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        cursor: pointer;
        font-size: 0.83rem;
        color: #475569;
        line-height: 1.4;
        max-width: 440px;
    }

    .checkbox input {
        margin-top: 2px;
        width: 16px;
        height: 16px;
        accent-color: var(--accent);
        flex-shrink: 0;
    }

    .submit-btn {
        padding: 14px 28px;
        color: white;
        font-weight: 700;
        font-size: 0.85rem;
        letter-spacing: 0.03em;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: opacity 0.2s;
        white-space: nowrap;
    }

    .submit-btn:hover {
        opacity: 0.9;
    }

    @media (max-width: 768px) {
        .page-header h1 {
            font-size: 1.75rem;
        }

        .form-row {
            grid-template-columns: 1fr;
        }

        .form-header {
            flex-direction: column;
        }

        .form-footer {
            flex-direction: column;
            align-items: stretch;
        }

        .submit-btn {
            text-align: center;
        }

        .challenge-grid {
            grid-template-columns: 1fr;
        }
    }
</style>