<script lang="ts">
    import { enhance } from '$app/forms';
    import { fade, slide } from 'svelte/transition';

    export let data; 
    export let form; 

    const challengeMetadata = {
        // ==================== ACTIVE CHALLENGES ====================
        "gender-based violence & femicide prevention in kenya": {
            ref: "PL-GEN-001",
            sector: "Gender & Public Safety",
            color: "#7c3aed",
            icon: "⚖️",
            prompt: "Despite legal frameworks, gaps persist in prevention, reporting systems, institutional coordination, survivor protection, and accountability mechanisms.",
            stakeholders: "Partnership Pending",
            status: "Open for Ideas",
            currentStep: 1,
            stats: { contributors: 8, ideas: 42 },
            category: "active",
            context: "Gender-based violence and femicide remain serious public safety and human rights challenges in Kenya, with most cases linked to intimate or domestic relationships. The issue involves legal, social, institutional, and economic dimensions.",
            keyData: [
                "~13 women killed weekly in Kenya (recent estimates)",
                "Hundreds of femicide cases reported annually",
                "Majority of cases involve known perpetrators (intimate partners/family)",
                "Underreporting remains high due to stigma and weak trust in systems"
            ],
            guidingQuestions: [
                "What gaps exist in prevention systems before violence escalates?",
                "How can reporting and response systems be improved?",
                "What institutional weaknesses affect accountability?",
                "What community-level prevention mechanisms are missing?",
                "What policy reforms are needed?"
            ],
            sdg: "SDG 5: Gender Equality | SDG 16: Peace, Justice & Strong Institutions",
            vision2030: "Social Pillar: Gender equality and social protection | Governance Pillar: Rule of law and justice systems",
            submissionGuide: "When submitting your solution, consider addressing: (1) Specific prevention gaps you've observed or experienced, (2) Concrete improvements to reporting mechanisms, (3) How different institutions (police, health, social services) could coordinate better. Evidence can include personal experiences, community observations, research citations, or links to relevant reports."
        },
        "public participation & civic awareness in kenya": {
            ref: "PL-GOV-002",
            sector: "Governance & Civic Engagement",
            color: "#0891b2",
            icon: "🗳️",
            prompt: "Challenges include accessibility, information gaps, weak feedback systems, low trust, and limited youth inclusion.",
            stakeholders: "Partnership Pending",
            status: "Open for Ideas",
            currentStep: 1,
            stats: { contributors: 8, ideas: 35 },
            category: "active",
            context: "Kenya's Constitution guarantees public participation in governance, but implementation varies in quality, accessibility, and influence on decision-making.",
            keyData: [
                "Youth form majority of population",
                "Participation processes often show low awareness and weak feedback loops",
                "Limited visibility of how citizen input influences final decisions"
            ],
            guidingQuestions: [
                "What barriers prevent meaningful participation?",
                "How can civic awareness be improved?",
                "How can feedback loops be strengthened?",
                "What would make participation more inclusive?",
                "How can trust in governance be improved?"
            ],
            sdg: "SDG 16: Peace, Justice & Strong Institutions | SDG 4: Quality Education (civic literacy)",
            vision2030: "Governance Pillar: Citizen engagement and accountability",
            submissionGuide: "Focus your solution on practical mechanisms: (1) How would you make participation easier for ordinary citizens?, (2) What digital or offline tools could improve feedback loops?, (3) How should government demonstrate that citizen input was actually used? Examples of successful participation models are valuable evidence."
        },
        "the creative economy & youth opportunities in kenya": {
            ref: "PL-ECO-003",
            sector: "Creative Economy & Youth Empowerment",
            color: "#f59e0b",
            icon: "🎨",
            prompt: "Challenges include limited funding, weak IP protection, lack of infrastructure, poor market access, and weak institutional support.",
            stakeholders: "Partnership Pending",
            status: "Open for Ideas",
            currentStep: 1,
            stats: { contributors: 8, ideas: 29 },
            category: "active",
            context: "Kenya's creative sector is rapidly growing but remains largely informal, underfunded, and under-protected despite its economic potential.",
            keyData: [
                "Creative economy contributes ~5% of GDP (varies by estimates)",
                "Majority of creatives operate informally",
                "Digital platforms are key income sources",
                "Weak intellectual property enforcement affects earnings"
            ],
            guidingQuestions: [
                "What barriers affect creative livelihoods?",
                "How can access to markets be improved?",
                "How can creative work be protected and valued?",
                "What systems are missing in the sector?",
                "What policy priorities should be addressed?"
            ],
            sdg: "SDG 8: Decent Work & Economic Growth | SDG 9: Industry, Innovation & Infrastructure",
            vision2030: "Economic Pillar: Creative industries & entrepreneurship | Social Pillar: Youth employment",
            submissionGuide: "Consider solutions around: (1) How to formalize creative work without burdening artists, (2) Practical IP protection mechanisms that work locally, (3) Market access platforms or models that have worked elsewhere. Evidence can include examples from other countries, personal experience as a creative, or economic data."
        },
        "environmental sustainability & waste management in kenya": {
            ref: "PL-ENV-004",
            sector: "Environment & Urban Sustainability",
            color: "#059669",
            icon: "🌱",
            prompt: "Key issues include weak enforcement, inadequate infrastructure, low recycling adoption, and limited public participation.",
            stakeholders: "Partnership Pending",
            status: "Open for Ideas",
            currentStep: 1,
            stats: { contributors: 8, ideas: 31 },
            category: "active",
            context: "Environmental management systems face increasing pressure due to urbanization, waste generation, and uneven infrastructure development.",
            keyData: [
                "Waste management systems vary across counties",
                "Recycling systems remain limited",
                "Urban areas face pollution and disposal challenges"
            ],
            guidingQuestions: [
                "What barriers exist in waste management systems?",
                "How can recycling and sustainability be improved?",
                "How can communities participate more effectively?",
                "What policy gaps exist in environmental management?",
                "How can urban cleanliness be improved?"
            ],
            sdg: "SDG 11: Sustainable Cities & Communities | SDG 12: Responsible Consumption & Production | SDG 13: Climate Action",
            vision2030: "Environmental Pillar: Clean, secure, and sustainable environment",
            submissionGuide: "Think about: (1) Waste separation at source — how to make it work in Kenyan households?, (2) Incentive models for recycling that have succeeded elsewhere, (3) How county governments could collaborate with informal waste collectors. Photos of local waste challenges, community cleanup case studies, or data from your area are great evidence."
        },
        "drought, food security & community resilience in kenya": {
            ref: "PL-CLI-005",
            sector: "Climate Resilience & Food Systems",
            color: "#dc2626",
            icon: "🌾",
            prompt: "Challenges include weak resilience systems, reliance on emergency response, water insecurity, and limited climate adaptation infrastructure.",
            stakeholders: "Partnership Pending",
            status: "Open for Ideas",
            currentStep: 1,
            stats: { contributors: 8, ideas: 27 },
            category: "active",
            context: "Kenya is highly vulnerable to climate variability, with recurring droughts affecting agriculture, water access, and livelihoods, especially in ASAL regions.",
            keyData: [
                "Millions affected by periodic food insecurity",
                "High food poverty levels in ASAL counties",
                "Climate shocks disrupt agriculture and livestock systems"
            ],
            guidingQuestions: [
                "What drives food insecurity in different regions?",
                "How can resilience systems be strengthened?",
                "What barriers exist in water and food systems?",
                "How can communities better prepare for climate shocks?",
                "What structural gaps exist in current policy approaches?"
            ],
            sdg: "SDG 2: Zero Hunger | SDG 13: Climate Action | SDG 6: Clean Water & Sanitation",
            vision2030: "Environmental Pillar: Climate resilience & food security | Economic Pillar: Agricultural transformation",
            submissionGuide: "Address: (1) Water harvesting or storage solutions appropriate for ASAL regions, (2) How to shift from emergency food aid to long-term resilience building, (3) Drought-resistant agricultural practices or alternative livelihoods. Traditional knowledge, local innovations, or experiences from past droughts are strong evidence."
        },
        "youth-led mental health solutions": {
            ref: "PL-HEA-002",
            sector: "Public Health & Wellbeing",
            color: "#6366f1",
            icon: "🧠",
            prompt: "Framework for ward-level funding utilizing 0.05% of county budgets to address the growing mental health crisis among young Kenyans.",
            stakeholders: "Partnership Pending",
            status: "Open for Proposals",
            currentStep: 1,
            stats: { contributors: 8, ideas: 18 },
            category: "active",
            context: "Mental health challenges among Kenya's youth have reached crisis levels, with limited access to services, persistent stigma, and inadequate funding. The burden falls disproportionately on young people in underserved communities, where mental health infrastructure is virtually non-existent.",
            keyData: [
                "Kenya has ~100 psychiatrists for 50+ million population",
                "Mental health receives <0.5% of national health budget",
                "Youth (15-24) show highest rates of depression and anxiety",
                "75% of Kenyans with mental health conditions lack access to care",
                "Suicide is the 4th leading cause of death among 15-29 year olds globally"
            ],
            guidingQuestions: [
                "How can ward-level mental health funding be structured for maximum impact?",
                "What community-based interventions are most effective for youth mental health?",
                "How can stigma be reduced through policy and community action?",
                "What role can schools and universities play in early intervention?",
                "How can peer support networks be formally integrated into the health system?"
            ],
            sdg: "SDG 3: Good Health & Wellbeing | SDG 10: Reduced Inequalities",
            vision2030: "Social Pillar: Health access and quality | Governance Pillar: Decentralized service delivery",
            submissionGuide: "Focus on: (1) Practical mechanisms for disbursing and accounting for ward-level mental health funds, (2) Integration of mental health into primary care and school systems, (3) Community-based models that reduce stigma and improve access. Evidence from pilot programs, community health models in other countries, or personal experience with mental health systems is valuable."
        },
        
        // ==================== PAST / CLOSED CHALLENGES ====================
        "youth access to capital": {
            ref: "PL-ECO-001",
            sector: "Economic Inclusion & Finance",
            color: "#78716c",
            icon: "🏦",
            prompt: "Restructuring credit guarantee schemes to unlock capital for youth-led enterprises — Phase 1 Complete, policy recommendations submitted.",
            stakeholders: "National Treasury & CBK",
            status: "Closed",
            currentStep: 4,
            stats: { contributors: 12, ideas: 56 },
            category: "past",
            context: "Young Kenyan entrepreneurs consistently cite access to affordable capital as their number one barrier to business growth. Traditional lending requirements — collateral, credit history, formal registration — systematically exclude youth from the financial system. Credit guarantee schemes offer a policy lever to bridge this gap.",
            keyData: [
                "Youth unemployment rate estimated at 35-40%",
                "~80% of youth-led enterprises operate informally",
                "Only 15% of young entrepreneurs access formal credit",
                "Existing credit guarantee schemes reach <5% of target MSMEs",
                "Women youth entrepreneurs face double barriers to capital access"
            ],
            guidingQuestions: [
                "How should credit guarantee schemes be restructured to serve youth better?",
                "What role can mobile lending and fintech play in youth capital access?",
                "How can informal businesses be graduated into the formal credit system?",
                "What alternative collateral models could work for young entrepreneurs?",
                "How should government de-risk lending to youth-led enterprises?"
            ],
            sdg: "SDG 1: No Poverty | SDG 8: Decent Work & Economic Growth | SDG 9: Industry, Innovation & Infrastructure",
            vision2030: "Economic Pillar: MSME development and youth enterprise | Social Pillar: Youth employment and economic empowerment",
            highlights: "Policy brief submitted to multiple stakeholders , live accountability tracing on stakeholder recognition page",
            
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
        
        if (meta) {
            return { ...db, ...meta, cleanTitle };
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
            stats: { contributors: 8, ideas: 0 },
            category: "active",
            cleanTitle
        };
    });

    $: activeChallenges = allChallenges.filter(c => c.category === 'active');
    $: pastChallenges = allChallenges.filter(c => c.category === 'past');

    function selectChallenge(challenge) {
        if (challenge.status?.toLowerCase() === 'closed') return;
        selectedChallenge = challenge;
        showSubmissionGuide = false;
        setTimeout(() => {
            document.getElementById('submission-desk')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }

    function toggleGuide() {
        showSubmissionGuide = !showSubmissionGuide;
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
                    You don't need perfect language — just clear thinking, evidence, or practical insight.
                    We help structure the rest.
                </p>

                <p class="barrier-notice">
                    Active Challenges. Real Impact. Your Voice Matters.
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

    <!-- ==================== ACTIVE CHALLENGES ==================== -->
    <section class="challenge-section">
        <div class="section-header">
            <span class="section-badge active-badge">● LIVE</span>
            <h2 class="section-title">Active Co-Creation Challenges</h2>
            <p class="section-subtitle">Open for contributions. Your ideas shape policy.</p>
        </div>

        <div class="challenge-grid">
            {#each activeChallenges as challenge}
                <div 
                    class="challenge-card" 
                    class:active={selectedChallenge?.id === challenge.id}
                    style="--accent-color: {challenge.color}"
                    role="button"
                    tabindex="0"
                    on:click={() => selectChallenge(challenge)}
                    on:keydown={(e) => e.key === 'Enter' && selectChallenge(challenge)}
                >
                    <div class="card-inner">
                        <div class="registry-header">
                            <span class="mono-ref">{challenge.ref}</span>
                            <span class="status-pill active-pill">{challenge.status}</span>
                        </div>

                        <div class="portfolio-label">
                            <span class="icon-small">{challenge.icon}</span>
                            <span>{challenge.sector} PORTFOLIO</span>
                        </div>

                        <h3>{challenge.title}</h3>
                        <p class="brief-desc">{challenge.prompt}</p>

                        {#if challenge.context}
                            <div class="context-section">
                                <p class="context-text">{challenge.context}</p>
                                {#if challenge.keyData}
                                    <div class="key-data">
                                        <span class="data-label">Key Data Points:</span>
                                        <ul class="data-list">
                                            {#each challenge.keyData as point}
                                                <li>{point}</li>
                                            {/each}
                                        </ul>
                                    </div>
                                {/if}
                            </div>
                        {/if}

                        <div class="data-table">
                            <div class="data-row">
                                <span class="label">SDG ALIGNMENT</span>
                                <span class="value">{challenge.sdg || 'Multiple SDGs'}</span>
                            </div>
                            {#if challenge.vision2030}
                                <div class="data-row">
                                    <span class="label">VISION 2030</span>
                                    <span class="value">{challenge.vision2030}</span>
                                </div>
                            {/if}
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
                                CONTRIBUTE YOUR SOLUTION →
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- ==================== PAST CHALLENGES ==================== -->
    {#if pastChallenges.length > 0}
        <section class="challenge-section past-section">
            <div class="section-header">
                <span class="section-badge past-badge">◉ COMPLETED</span>
                <h2 class="section-title">Past Challenges & Policy Outcomes</h2>
                <p class="section-subtitle">Archived challenges with policy impact summaries.</p>
            </div>

            <div class="challenge-grid past-grid">
                {#each pastChallenges as challenge}
                    <div 
                        class="challenge-card closed past-card"
                        style="--accent-color: {challenge.color}"
                    >
                        <div class="card-inner">
                            <div class="registry-header">
                                <span class="mono-ref">{challenge.ref}</span>
                                <span class="status-pill closed-pill">{challenge.status}</span>
                            </div>

                            <div class="portfolio-label">
                                <span class="icon-small">{challenge.icon}</span>
                                <span>{challenge.sector} PORTFOLIO</span>
                            </div>

                            <h3>{challenge.title}</h3>
                            <p class="brief-desc">{challenge.prompt}</p>

                            {#if challenge.context}
                                <div class="context-section past-context">
                                    <p class="context-text">{challenge.context}</p>
                                    {#if challenge.keyData}
                                        <div class="key-data">
                                            <span class="data-label">Key Data Points:</span>
                                            <ul class="data-list">
                                                {#each challenge.keyData as point}
                                                    <li>{point}</li>
                                                {/each}
                                            </ul>
                                        </div>
                                    {/if}
                                </div>
                            {/if}

                            {#if challenge.highlights}
                                <div class="outcome-box">
                                    <span class="outcome-label">POLICY OUTCOME</span>
                                    <p class="outcome-text">{challenge.highlights}</p>
                                    {#if challenge.outcomes}
                                        <ul class="outcome-list">
                                            {#each challenge.outcomes as outcome}
                                                <li>{outcome}</li>
                                            {/each}
                                        </ul>
                                    {/if}
                                </div>
                            {/if}

                            <div class="data-table">
                                <div class="data-row">
                                    <span class="label">SDG ALIGNMENT</span>
                                    <span class="value">{challenge.sdg || 'Multiple SDGs'}</span>
                                </div>
                                {#if challenge.vision2030}
                                    <div class="data-row">
                                        <span class="label">VISION 2030</span>
                                        <span class="value">{challenge.vision2030}</span>
                                    </div>
                                {/if}
                                <div class="data-row">
                                    <span class="label">CONTRIBUTORS</span>
                                    <span class="value">{challenge.stats.contributors} Contributors</span>
                                </div>
                                <div class="data-row">
                                    <span class="label">IDEAS SUBMITTED</span>
                                    <span class="value">{challenge.stats.ideas} Submissions</span>
                                </div>
                            </div>

                            <div class="card-footer">
                                <div class="progress-container">
                                    <div class="progress-track completed-track">
                                        <div class="progress-bar" style="width: 100%"></div>
                                    </div>
                                    <span class="progress-percent">100%</span>
                                </div>

                                <div class="action-link closed-link">
                                    POLICY BRIEF PUBLISHED ✓
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </section>
    {/if}

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

                        {#if selectedChallenge.guidingQuestions}
                            <div class="guiding-questions">
                                <span class="gq-label">Guiding Questions:</span>
                                <ul class="gq-list">
                                    {#each selectedChallenge.guidingQuestions as question}
                                        <li>{question}</li>
                                    {/each}
                                </ul>
                            </div>
                        {/if}
                    </div>
                    <span class="large-icon">{selectedChallenge.icon}</span>
                </div>

                <div class="form-content">
                    {#if selectedChallenge.submissionGuide}
                        <div class="guide-toggle-container">
                            <button 
                                type="button" 
                                class="guide-toggle-btn" 
                                on:click={toggleGuide}
                                style="--guide-accent: {selectedChallenge.color}"
                            >
                                <span class="guide-icon">{showSubmissionGuide ? '▾' : '▸'}</span>
                                <span>{showSubmissionGuide ? 'Hide' : 'Show'} Submission Guide & Examples</span>
                            </button>
                            
                            {#if showSubmissionGuide}
                                <div class="submission-guide" transition:slide={{ duration: 250 }}>
                                    <div class="guide-content">
                                        <span class="guide-label">HOW TO WRITE AN EFFECTIVE SUBMISSION:</span>
                                        <p>{selectedChallenge.submissionGuide}</p>
                                        <div class="guide-tips">
                                            <span class="guide-label">TIPS:</span>
                                            <ul>
                                                <li><strong>Be specific</strong> — "Increase funding" is vague; "Allocate 2% of county budgets to..." is actionable.</li>
                                                <li><strong>Include who</strong> — Which institution, ministry, or body should implement your idea?</li>
                                                <li><strong>Evidence matters</strong> — Personal experience, news articles, academic papers, or examples from other counties/countries all count.</li>
                                                <li><strong>Optional contact</strong> — Leave your email if you're open to follow-up questions from reviewers (not published).</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/if}

                    <form method="POST" action="?/submit" use:enhance class="protocol-form">
                        <input type="hidden" name="challenge_id" value={selectedChallenge.id} />
                        <input type="hidden" name="challenge_title" value={selectedChallenge.title} />

                        <div class="form-grid">
                            <div class="input-group">
                                <label for="stk">RESPONSIBLE STAKEHOLDER</label>
                                <span class="field-hint">Who should implement this solution?</span>
                                <div class="select-wrapper">
                                    <select id="stk" name="responsible_stakeholder" required>
                                        <option value="" disabled selected>Select stakeholder category...</option>
                                        <option value="National Government (Ministries, Departments, Agencies)">National Government (Ministries, Departments, Agencies)</option>
                                        <option value="County Government">County Government</option>
                                        <option value="Civil Society Organizations (CSOs) & NGOs">Civil Society Organizations (CSOs) & NGOs</option>
                                        <option value="Academic & Research Institutions">Academic & Research Institutions</option>
                                        <option value="Development Partners & Donors">Development Partners & Donors</option>
                                        <option value="Private Sector & Tech Ecosystem">Private Sector & Tech Ecosystem</option>
                                        <option value="Oversight & Accountability Bodies">Oversight & Accountability Bodies</option>
                                        <option value="Community-Based Organizations">Community-Based Organizations</option>
                                        <option value="Multi-Stakeholder Partnership">Multi-Stakeholder Partnership</option>
                                    </select>
                                </div>
                            </div>

                            <div class="input-group">
                                <label for="tim">IMPLEMENTATION TIMELINE</label>
                                <span class="field-hint">Realistic timeframe for your solution</span>
                                <div class="select-wrapper">
                                    <select id="tim" name="implementation_timeline" required>
                                        <option value="" disabled selected>Select timeline...</option>
                                        <option value="Immediate (0–6 Months)">Immediate (0–6 Months)</option>
                                        <option value="Short-term (6–12 Months)">Short-term (6–12 Months)</option>
                                        <option value="Medium-term (1–3 Years)">Medium-term (1–3 Years)</option>
                                        <option value="Long-term (3–5 Years)">Long-term (3–5 Years)</option>
                                        <option value="Ongoing/Continuous">Ongoing/Continuous</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="input-group">
                            <label for="sol">YOUR SOLUTION <span class="required-mark">*</span></label>
                            <span class="field-hint">Explain your idea clearly. What should change and how?</span>
                            <textarea 
                                id="sol" 
                                name="solution_text" 
                                rows="6" 
                                placeholder="Describe your policy solution here. Be specific about:
• What needs to change (the specific policy, system, or practice)
• How it should be implemented (the mechanism or approach)
• Who is responsible (which institution or body)
• Who benefits and how"
                                required
                            ></textarea>
                        </div>

                        <div class="input-group">
                            <label for="evid">EVIDENCE OR SUPPORTING CONTEXT</label>
                            <span class="field-hint">Optional — any links, research, lived experience, or examples that support your solution</span>
                            <textarea 
                                id="evid" 
                                name="supporting_evidence" 
                                rows="3" 
                                placeholder="Examples of evidence you can include:
• Personal or community experience with this issue
• Links to news articles, reports, or research
• Examples of similar solutions that worked elsewhere
• Data or statistics you've gathered"
                            ></textarea>
                        </div>

                        <div class="input-group">
                            <label for="cont">OPTIONAL CONTACT</label>
                            <span class="field-hint">Leave your email or phone if you're open to follow-up from our policy team (will not be published)</span>
                            <input 
                                type="text" 
                                id="cont" 
                                name="optional_contact" 
                                placeholder="Email or phone number (optional)"
                            />
                        </div>

                        <div class="form-actions">
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" name="declaration" required /> 
                                    <span class="checkbox-text">I understand my submission will be reviewed and may be refined into a public policy brief for civic impact. I confirm this is my original contribution.</span>
                                </label>
                            </div>

                            <button type="submit" class="submit-btn" style="background: {selectedChallenge.color}; --hover-color: {selectedChallenge.color}cc">
                                SUBMIT YOUR SOLUTION
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

    /* ==================== SECTION HEADERS ==================== */
    .challenge-section {
        margin-bottom: 64px;
    }

    .past-section {
        margin-top: 16px;
        padding-top: 48px;
        border-top: 2px solid #e2e8f0;
    }

    .section-header {
        margin-bottom: 32px;
        text-align: center;
    }

    .section-badge {
        display: inline-block;
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        padding: 4px 12px;
        border-radius: 100px;
        margin-bottom: 12px;
    }

    .active-badge {
        background: #dcfce7;
        color: #166534;
    }

    .past-badge {
        background: #f1f5f9;
        color: #64748b;
    }

    .section-title {
        font-size: 1.75rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: #0f172a;
        margin: 0 0 8px 0;
    }

    .section-subtitle {
        font-size: 0.9rem;
        color: #64748b;
        margin: 0;
    }

    /* ==================== CHALLENGE GRID ==================== */
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
        cursor: pointer;
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
        opacity: 0.8; 
        cursor: default; 
        background: #fafafa;
    }

    .challenge-card.closed:hover {
        transform: none;
        border-color: #e2e8f0;
        box-shadow: none;
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
    }

    .active-pill {
        background: #e0f2fe;
        color: #0369a1;
    }

    .closed-pill {
        background: #f1f5f9;
        color: #94a3b8;
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
        margin: 0 0 16px 0; 
        line-height: 1.5;
    }

    /* Context Section Styling */
    .context-section {
        background: #f8fafc;
        border-left: 3px solid var(--accent-color);
        padding: 14px 16px;
        margin-bottom: 18px;
        border-radius: 0 8px 8px 0;
    }

    .past-context {
        border-left-color: #94a3b8;
        background: #fafafa;
    }

    .context-text {
        font-size: 0.85rem;
        color: #475569;
        line-height: 1.6;
        margin: 0 0 12px 0;
    }

    .key-data {
        margin-top: 8px;
    }

    .data-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #64748b;
        display: block;
        margin-bottom: 6px;
    }

    .data-list {
        margin: 0;
        padding-left: 18px;
        font-size: 0.8rem;
        color: #334155;
        line-height: 1.6;
    }

    .data-list li {
        margin-bottom: 3px;
    }

    /* Outcome Box for Past Challenges */
    .outcome-box {
        background: linear-gradient(135deg, #f0fdf4, #fafafa);
        border: 1px solid #bbf7d0;
        border-radius: 8px;
        padding: 14px 16px;
        margin-bottom: 18px;
    }

    .outcome-label {
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #166534;
        display: block;
        margin-bottom: 6px;
    }

    .outcome-text {
        font-size: 0.83rem;
        color: #14532d;
        line-height: 1.5;
        margin: 0 0 8px 0;
        font-weight: 500;
    }

    .outcome-list {
        margin: 8px 0 0 0;
        padding-left: 18px;
        font-size: 0.78rem;
        color: #166534;
        line-height: 1.5;
    }

    .outcome-list li {
        margin-bottom: 4px;
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
        font-size: 0.7rem; 
        line-height: 1.4;
    }
    .data-row .label { color: #64748b; font-weight: 600; }
    .data-row .value { color: #0f172a; font-weight: 700; text-align: right; max-width: 65%; }

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

    .completed-track {
        background: #dcfce7;
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

    .closed-link {
        color: #94a3b8;
    }

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

    .form-context-p { 
        margin: 12px 0 0 0; 
        opacity: 0.85; 
        font-size: 0.95rem; 
        max-width: 720px; 
        line-height: 1.6; 
    }

    /* Guiding Questions in Form */
    .guiding-questions {
        margin-top: 20px;
        padding: 16px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        backdrop-filter: blur(4px);
    }

    .gq-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        opacity: 0.9;
        display: block;
        margin-bottom: 8px;
    }

    .gq-list {
        margin: 0;
        padding-left: 20px;
        font-size: 0.85rem;
        line-height: 1.6;
        opacity: 0.9;
    }

    .gq-list li {
        margin-bottom: 4px;
    }

    .large-icon { font-size: 3rem; opacity: 0.25; line-height: 1; }

    .form-content { padding: 40px; }

    /* Submission Guide Styles */
    .guide-toggle-container {
        margin-bottom: 28px;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        overflow: hidden;
    }

    .guide-toggle-btn {
        width: 100%;
        padding: 14px 18px;
        background: #f8fafc;
        border: none;
        cursor: pointer;
        font-family: inherit;
        font-size: 0.85rem;
        font-weight: 600;
        color: #475569;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: background 0.2s ease;
        text-align: left;
    }

    .guide-toggle-btn:hover {
        background: #f1f5f9;
    }

    .guide-icon {
        font-size: 0.7rem;
        color: var(--guide-accent, #475569);
        transition: transform 0.2s ease;
    }

    .submission-guide {
        border-top: 1px solid #e2e8f0;
        background: #fafafa;
    }

    .guide-content {
        padding: 20px 18px;
    }

    .guide-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #64748b;
        display: block;
        margin-bottom: 8px;
    }

    .guide-content p {
        font-size: 0.88rem;
        line-height: 1.65;
        color: #475569;
        margin: 0 0 16px 0;
    }

    .guide-tips {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 14px 16px;
    }

    .guide-tips ul {
        margin: 8px 0 0 0;
        padding-left: 18px;
        font-size: 0.83rem;
        color: #475569;
        line-height: 1.6;
    }

    .guide-tips ul li {
        margin-bottom: 5px;
    }

    .guide-tips ul li strong {
        color: #0f172a;
    }

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
    .input-group { display: flex; flex-direction: column; gap: 6px; }

    .input-group label {
        font-size: 0.75rem;
        font-weight: 700;
        color: #475569;
        letter-spacing: 0.05em;
    }

    .required-mark {
        color: #dc2626;
        font-weight: 400;
    }

    .field-hint {
        font-size: 0.75rem;
        color: #94a3b8;
        line-height: 1.3;
        margin-bottom: 2px;
    }

    .select-wrapper { position: relative; }

    select, textarea, input[type="text"] {
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
    input[type="text"] { padding: 14px 16px; }

    select:focus, textarea:focus, input[type="text"]:focus {
        outline: none;
        background: #ffffff;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.05);
    }

    textarea::placeholder, input[type="text"]::placeholder {
        color: #94a3b8;
        font-size: 0.85rem;
        line-height: 1.5;
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
        flex-shrink: 0;
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