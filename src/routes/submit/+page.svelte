<script>
    import { enhance } from '$app/forms';

    /** @type {import('./$types').PageData} */
    export let data;

    const { challenges } = data; // Data containing available challenges
    
    // State for client-side form data and validation checks
    let challengeTitle = '';
    let solutionText = '';
    let responsibleStakeholder = '';
    let implementationTimeline = '';
    let supportingEvidence = '';
    let optionalContact = '';

    // Function to check if the minimum character count is met (for visual feedback)
    $: isDetailedEnough = solutionText.length >= 50;

    // --- Hardcoded Challenges of the Month & Collapsible State ---
    // NOTE: MUST be defined with `let` for the toggle function to work (reactivity fix).
    let challengesOfTheMonth = [
        {
            id: 1,
            title: "Youth Lack of Capital for Self-Employment in Kenya",
            excerpt: "Limited access to capital, coupled with financial illiteracy and stringent collateral requirements, severely constrains self-employment opportunities. Click to view detailed analysis and policy gaps.",
            // FULL Detailed Content for Challenge 1
            details: `
                <h3>2. Scope and Statistics</h3>
                <ul>
                    <li><strong>Youth Unemployment Rate:</strong> ~22%</li>
                    <li><strong>Youth Business Failure Rate:</strong> Over 70% of youth-led startups fail within the first year, largely due to inadequate capital.</li>
                    <li><strong>Funding Gap:</strong> MSMEs contribute 30% to Kenya’s GDP, but youth-led enterprises remain underrepresented.</li>
                    <li><strong>Access to Credit:</strong> Only 15–20% of youth entrepreneurs successfully access loans from banks due to collateral requirements.</li>
                </ul>
                <h3>3. Causes of Limited Access to Capital</h3>
                <p>Financial Illiteracy, Stringent Loan Conditions (collateral, high interest rates), Weak Institutional Support (YEDF/Uwezo bureaucracy, limited rural outreach), and Socio-Cultural Barriers (perception of inexperience).</p>
                <h3>6. Policy & Programmatic Gaps</h3>
                <p>Limited allocation of funds, poor coordination between government/banks/NGOs, insufficient monitoring, and weak linkages between financial support and mentorship services.</p>
                <h3>7. Recommendations for Solutions</h3>
                <p>Simplify loan procedures, reduce collateral requirements, enhance financial literacy training, strengthen government fund transparency, and leverage digital financing solutions.</p>
            `,
            expanded: false 
        },
        {
            id: 2,
            title: "Youth Mental Health in Kenya: Challenges, Statistics, and Stakeholders",
            excerpt: "Approximately one in four young Kenyans experiences mental health challenges. Stigma, economic pressures, and insufficient service access require urgent policy attention. Click to view detailed analysis and policy gaps.",
            // FULL Detailed Content for Challenge 2
            details: `
                <h3>2. Scope of Youth Mental Health in Kenya</h3>
                <ul>
                    <li><strong>Prevalence:</strong> Studies indicate that 25% of Kenyan youth experience mental health challenges.</li>
                    <li><strong>Mortality:</strong> Suicide ranks among the top three causes of death for youth aged 15–29.</li>
                    <li><strong>Service Access:</strong> Kenya has only 0.1 psychiatrists per 100,000 population.</li>
                </ul>
                <h3>3. Challenges Facing Youth Mental Health</h3>
                <p>Limited Access to Services (mostly urban-based), Stigma and Cultural Barriers (dismissed as 'moodiness'), Education System Pressures, Economic Pressures (unemployment), and Digital/Social Pressures (cyberbullying).</p>
                <h3>5. Policy & Programmatic Gaps</h3>
                <p>Insufficient funding for youth mental health services, limited data on youth-specific trends, few trained adolescent specialists, and lack of integration with education and employment programs.</p>
                <h3>6. Recommendations for Solutions</h3>
                <p>Expand youth-friendly services (school counseling, hotlines), implement awareness campaigns to reduce stigma, train more specialized professionals, and integrate mental health into national youth development plans.</p>
            `,
            expanded: false
        }
    ];

    /**
     * FIX: Forces Svelte reactivity by creating a new array when an element is updated.
     */
    function toggleChallenge(id) {
        // Create a new array by mapping over the old one and updating the expanded state for the target ID
        challengesOfTheMonth = challengesOfTheMonth.map(c => {
            if (c.id === id) {
                // Return a new object for the modified challenge (using spread syntax)
                return { ...c, expanded: !c.expanded };
            }
            // Return the original object for all other challenges
            return c;
        });
    }
</script>

<div class="container submit-page">
    <header>
        <h1>📝 Submit Your Actionable Solution</h1>
        <p class="tagline">Your idea must directly address one of the challenges below or a challenge from the dropdown list.</p>
    </header>
    
    <section class="challenges-of-month-section">
        <h2>🔥 Challenges of the Month (Context)</h2>
        <p class="section-intro">Review the detailed policy context below before submitting your solution.</p>
        <div class="challenge-cards-wrapper">
            {#each challengesOfTheMonth as challenge (challenge.id)}
                <div class="challenge-card" class:expanded={challenge.expanded}>
                    <button class="card-header" on:click={() => toggleChallenge(challenge.id)}>
                        <h3>{challenge.title}</h3>
                        <span class="toggle-icon">{challenge.expanded ? '−' : '+'}</span>
                    </button>
                    
                    <div class="card-content">
                        <p>{@html challenge.excerpt}</p>
                        {#if challenge.expanded}
                            <div class="details-content">
                                {@html challenge.details}
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <div class="submission-content-wrapper">
        <section class="criteria-section">
            <h2>💡 Structure of a Strong Solution</h2>
            <p>To ensure policy relevance and actionability, your solution (50–500 words) must address these **four pillars**:</p>
            <ul>
                <li>**Actionable Proposal:** Detailed, realistic action with clear expected impact. (The main solution field)</li>
                <li>**Responsible Stakeholder:** Who is best positioned to implement this solution? (e.g., Ministry of ICT, County Assembly)</li>
                <li>**Proposed Timeline:** Estimate a realistic duration for the implementation.</li>
                <li>**Supporting Evidence:** Best practices or local examples to back your idea (Optional).</li>
            </ul>
        </section>

        <form method="POST" action="?/submit" use:enhance class="single-page-form">
            <h2>Solution Details</h2>
            
            <label for="challenge_title">Select the Policy Challenge Area *</label>
            <select 
                id="challenge_title" 
                name="challenge_title" 
                bind:value={challengeTitle} 
                required
            >
                <option value="" disabled selected>-- Select a Policy Challenge --</option>
                {#each challenges as challenge (challenge.id)}
                    <option value={challenge.title}>{challenge.title}</option>
                {/each}
            </select>
            
            <label for="solution_text">1. Clear, Actionable Proposal *</label>
            <textarea 
                id="solution_text"
                name="solution_text" 
                rows="10" 
                placeholder="Be specific about the proposed action, the problem it solves, and the expected impact. (Min 50 characters, Max 500 words)"
                bind:value={solutionText}
                required
            ></textarea>
            <p class="char-count" class:valid={isDetailedEnough}>
                Characters: {solutionText.length} (Minimum 50 required)
            </p>

            <label for="responsible_stakeholder">2. Responsible Stakeholder *</label>
            <input 
                type="text" 
                id="responsible_stakeholder" 
                name="responsible_stakeholder" 
                placeholder="E.g., Ministry of Education, Nairobi County CEC for Health, Local Community Policing Group"
                bind:value={responsibleStakeholder}
                required
            />
            
            <label for="implementation_timeline">3. Proposed Implementation Timeline (Estimate) *</label>
            <input 
                type="text" 
                id="implementation_timeline" 
                name="implementation_timeline" 
                placeholder="E.g., 6 months for pilot, 2 years for nationwide rollout"
                bind:value={implementationTimeline}
                required
            />

            <label for="supporting_evidence">4. Supporting Evidence (Optional)</label>
            <textarea 
                id="supporting_evidence"
                name="supporting_evidence" 
                rows="4" 
                placeholder="Mention best practices, local successes, or global examples that support your idea."
                bind:value={supportingEvidence}
            ></textarea>

            <label for="optional_contact">Your Contact Information (Optional)</label>
            <input 
                type="text" 
                id="optional_contact" 
                name="optional_contact" 
                placeholder="Email or Phone Number (for credit/clarification)"
                bind:value={optionalContact}
            />

            <div class="declaration">
                <input type="checkbox" id="declaration" required />
                <label for="declaration" class="inline-label">I declare that this solution is original and I agree to the <a href="/terms">terms of submission</a>.</label>
            </div>
            
            <button type="submit" class="button-primary final-submit-btn" disabled={!isDetailedEnough}>
                Submit Solution to Policy Team
            </button>
        </form>
    </div>
</div>

<style>
    /* --- General Layout --- */
    .submit-page {
        padding-top: 40px;
        padding-bottom: 60px;
    }
    
    header {
        text-align: center;
        margin-bottom: 40px;
    }
    
    h1 {
        font-size: 2.8em;
        color: var(--color-primary-accent);
        margin-bottom: 10px;
    }

    .tagline {
        font-size: 1.1em;
        color: var(--color-text-light);
    }
    
    .submission-content-wrapper {
        max-width: 700px;
        margin: 0 auto;
        background-color: var(--color-white);
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    /* --- Challenges of the Month Styling --- */
    .challenges-of-month-section {
        max-width: 700px;
        margin: 0 auto 30px auto;
        padding: 0 10px;
    }
    
    .challenges-of-month-section h2 {
        text-align: center;
        font-size: 1.8em;
        color: var(--color-secondary-accent);
        margin-bottom: 10px;
        border-bottom: 2px solid var(--color-border-light);
        padding-bottom: 5px;
    }

    .section-intro {
        text-align: center;
        font-size: 0.9em;
        color: var(--color-text-light);
        margin-bottom: 20px;
    }

    .challenge-cards-wrapper {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .challenge-card {
        background-color: var(--color-white);
        border: 2px solid var(--color-border-light);
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
    }

    .challenge-card.expanded {
        border-color: var(--color-primary-accent);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 15px 20px;
        background-color: #f9f9f9;
        border: none;
        cursor: pointer;
        text-align: left;
        transition: background-color 0.2s;
        /* Ensure font color contrast */
        color: var(--color-text-dark);
    }
    
    .challenge-card.expanded .card-header {
        background-color: var(--color-primary-accent);
        color: var(--color-white);
    }
    
    .card-header h3 {
        margin: 0;
        font-size: 1.1em;
        font-weight: 600;
        color: inherit;
    }

    .toggle-icon {
        font-size: 1.5em;
        font-weight: 700;
        line-height: 1;
    }
    
    .card-content {
        padding: 0 20px;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease-in-out;
    }

    .challenge-card.expanded .card-content {
        max-height: 1000px; 
        padding: 15px 20px;
    }

    .card-content p {
        color: var(--color-text-dark);
        margin-top: 10px;
        line-height: 1.5;
    }
    
    .card-content h3 {
        font-size: 1.2em;
        color: var(--color-secondary-accent);
        margin-top: 20px;
        margin-bottom: 5px;
        border-bottom: 1px dashed var(--color-border-light);
        padding-bottom: 3px;
    }

    :global(.card-content ul) {
        margin-top: 5px;
        padding-left: 20px;
        list-style: disc;
    }

    .details-content {
        margin-top: 10px;
        padding-top: 10px;
    }


    /* --- Submission Criteria & Form Styling --- */
    .criteria-section {
        background-color: #f7f7f7;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
        border-left: 5px solid var(--color-secondary-accent);
    }

    .criteria-section h2 {
        font-size: 1.6em;
        color: var(--color-secondary-accent);
        margin-bottom: 15px;
    }

    .criteria-section ul {
        list-style: none;
        padding-left: 0;
    }

    .criteria-section li {
        margin-bottom: 8px;
        padding-left: 20px;
        position: relative;
        font-size: 0.95em;
    }

    .criteria-section li::before {
        content: '▪'; 
        color: var(--color-primary-accent);
        font-weight: bold;
        position: absolute;
        left: 0;
    }

    .single-page-form h2 {
        font-size: 1.6em;
        color: var(--color-text-dark);
        margin-bottom: 20px;
        padding-bottom: 5px;
        border-bottom: 1px dashed var(--color-border-light);
    }

    label {
        display: block;
        font-weight: 600;
        margin-top: 15px;
        margin-bottom: 5px;
    }

    select, textarea, input[type="text"] {
        width: 100%;
        padding: 10px;
        border: 1px solid var(--color-border-light);
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 1em;
    }
    
    textarea {
        resize: vertical;
        min-height: 150px;
    }

    .char-count {
        text-align: right;
        font-size: 0.85em;
        color: var(--color-secondary-accent);
        margin-top: 5px;
    }
    
    .char-count.valid {
        color: var(--color-primary-accent);
    }

    .declaration {
        display: flex;
        align-items: center;
        margin-top: 25px;
        margin-bottom: 30px;
    }

    .declaration input {
        margin-right: 10px;
        transform: scale(1.2);
        width: auto;
    }
    
    .inline-label {
        display: inline;
        font-weight: 400;
    }

    .final-submit-btn {
        width: 100%;
    }
</style>