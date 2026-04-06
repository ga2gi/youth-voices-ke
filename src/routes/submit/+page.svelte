<script lang="ts">
    import { enhance } from '$app/forms';

    /** * @type {import('./$types').PageData}
     * This prop receives the challenges array fetched from +page.server.js.
     */
    export let data;

    // Destructures the 'challenges' array from the server-fetched data.
    const { challenges: serverChallenges } = data;
   
    // State for client-side form data and validation checks
    let challengeTitle = '';
    let solutionText = '';
    let responsibleStakeholder = '';
    let implementationTimeline = '';
    let supportingEvidence = '';
    let optionalContact = '';
    let declarationChecked = false;

    // --- Hardcoded Stakeholder Options ---
    const stakeholderOptions = [
        "National & County Governments",
        "Civil Society Organizations (CSOs) & NGOs",
        "Academic & Research Institutions",
        "Development Partners & Donors",
        "Private Sector & Tech Ecosystem",
        "Oversight & Accountability Bodies"
    ];

    // Reactive variables
    $: isOtherSelected = responsibleStakeholder === 'Other';
    $: isDetailedEnough = solutionText.length >= 50;

    // Form submission status
    let formMessage = { type: 'none', text: '' };

    // --- SVELTE FORM ENHANCEMENT LOGIC ---
    const handleSubmit = () => {
        return async ({ update, result }) => {
            formMessage = { type: 'none', text: '' };
            await update();

            if (result.type === 'success' && result.data?.success) {
                formMessage = { type: 'success', text: result.data.message || 'Solution submitted successfully!' };
                // Reset form
                challengeTitle = ''; solutionText = ''; responsibleStakeholder = '';
                implementationTimeline = ''; supportingEvidence = ''; optionalContact = '';
                declarationChecked = false;
            } else if (result.type === 'failure' && result.data) {
                formMessage = { type: 'error', text: result.data.message || 'Submission failed.' };
            } else if (result.type === 'error') {
                 formMessage = { type: 'error', text: 'An unexpected server error occurred.' };
            }
        };
    };

    // --- UPDATED Challenges for Q1 2026 (January - March) ---
    let challengesOfTheMonthContext = [
        {
            id: 1,
            title: "Q1 2026 Challenge I: Youth Access to Capital for Self-Employment",
            excerpt: "How can Kenya bridge the KSh 500 Billion credit gap for youth in the informal, creative, and digital sectors?",
            details: `
                <div class="detailed-context">
                    <h4>The Context (Jan - Mar 2026)</h4>
                    <p>Kenya’s unemployment challenge is less about joblessness and more about job quality. With <strong>over 1 million youths</strong> entering the labour market annually, formal employment absorbs less than 15%.</p>
                   
                    <h4>Data & Statistics</h4>
                    <ul>
                        <li><strong>The Credit Gap:</strong> Unmet demand for MSME financing stands at roughly <strong>KSh 500 Billion</strong>.</li>
                        <li><strong>Risk Aversion:</strong> Traditional banks require collateral which <strong>90% of youth</strong> do not possess.</li>
                        <li><strong>The Hustler Sector:</strong> The informal sector represents <strong>83% of total employment</strong>.</li>
                    </ul>

                    <h4>The Challenge</h4>
                    <p>What practical, implementable policy measures can Kenya adopt to improve access to capital? Solutions should:</p>
                    <ul>
                        <li>Address <strong>high interest rates</strong> and collateral barriers.</li>
                        <li>Leverage <strong>blended finance</strong> (public + private capital).</li>
                        <li>Strengthen <strong>transparency</strong> in programs like the Hustler Fund.</li>
                    </ul>
                </div>
            `,
            expanded: false,
            pdfLink: null
        },
        {
            id: 2,
            title: "Q1 2026 Challenge II: Youth-Led Solutions For Mental Health",
            excerpt: "With mental health funding at less than 0.05% of the health budget, how do we implement youth-friendly care?",
            details: `
                <div class="detailed-context">
                    <h4>The Context (Jan - Mar 2026)</h4>
                    <p>Despite the <strong>Mental Health (Amendment) Act 2022</strong>, services remain urban-centered and unaffordable for the average young Kenyan.</p>
                   
                    <h4>Data & Statistics</h4>
                    <ul>
                        <li><strong>Funding Gap:</strong> Kenya allocates <strong>less than 0.05%</strong> of the health budget to mental health.</li>
                        <li><strong>Prevalence:</strong> Approximately <strong>1 in 4 Kenyans</strong> visiting routine facilities have a mental health condition.</li>
                        <li><strong>Scarcity:</strong> Roughly <strong>one psychiatrist for every 500,000 Kenyans</strong>.</li>
                    </ul>

                    <h4>The Challenge</h4>
                    <p>How can we improve access to youth-friendly services? Your solution should:</p>
                    <ul>
                        <li>Integrate mental health into <strong>primary healthcare</strong> at the ward level.</li>
                        <li>Propose mechanisms to <strong>reduce stigma</strong>.</li>
                        <li>Strengthen accountability for mental health funds.</li>
                    </ul>
                </div>
            `,
            expanded: false,
            pdfLink: null
        }
    ];

    // Dynamic PDF Link Population
    $: challengesOfTheMonthContext = challengesOfTheMonthContext.map(contextChallenge => {
        const matchingServerChallenge = serverChallenges?.find(sc => sc.id === contextChallenge.id);
        if (matchingServerChallenge && matchingServerChallenge.pdf_url) {
            return { ...contextChallenge, pdfLink: matchingServerChallenge.pdf_url };
        }
        return contextChallenge;
    });

    function toggleChallenge(id) {
        challengesOfTheMonthContext = challengesOfTheMonthContext.map(c => {
            if (c.id === id) return { ...c, expanded: !c.expanded };
            return c;
        });
    }
</script>

<div class="container submit-page">
    <header>
        <h1>📝 Submit Your Actionable Solution</h1>
        <p class="tagline">Policy Bridge KE: Bridging the gap between youth innovation and legislative action.</p>
    </header>
   
    <section class="challenges-of-month-section">
        <h2>🔥 Quarterly Policy Challenges (Q1: Jan - Mar 2026)</h2>
        <div class="challenge-cards-wrapper">
            {#each challengesOfTheMonthContext as challenge (challenge.id)}
                <div class="challenge-card" class:expanded={challenge.expanded}>
                    <button class="card-header" on:click={() => toggleChallenge(challenge.id)}>
                        <h3>{challenge.title}</h3>
                        <span class="toggle-icon">{challenge.expanded ? '−' : '+'}</span>
                    </button>
                   
                    <div class="card-content">
                        <p><strong>Overview:</strong> {challenge.excerpt}</p>
                        {#if challenge.expanded}
                            <div class="details-content">
                                {@html challenge.details}
                            </div>
                            {#if challenge.pdfLink}
                                <a href={challenge.pdfLink} target="_blank" class="pdf-download-link">
                                    ⬇️ Download Full Q1 Challenge PDF
                                </a>
                            {/if}
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <div class="submission-content-wrapper">
        <section class="criteria-section">
            <h2>💡 Structure of a Strong Solution</h2>
            <ul>
                <li><strong>Actionable Proposal:</strong> The specific "how-to".</li>
                <li><strong>Responsible Stakeholder:</strong> Who should implement this?</li>
                <li><strong>Proposed Timeline:</strong> How long will it take?</li>
                <li><strong>Supporting Evidence:</strong> Any data or local examples?</li>
            </ul>
        </section>
       
        {#if formMessage.type !== 'none'}
            <div class="alert {formMessage.type}">
                {formMessage.text}
            </div>
        {/if}

        <form method="POST" action="?/submit" use:enhance={handleSubmit} class="single-page-form">
            <label for="challenge_title">Select the Q1 Policy Challenge Area *</label>
            <select id="challenge_title" name="challenge_title" bind:value={challengeTitle} required>
                <option value="" disabled selected>-- Select a Policy Challenge --</option>
                {#each serverChallenges as challenge (challenge.id)}
                    <option value={challenge.title}>{challenge.title}</option>
                {/each}
            </select>
           
            <label for="solution_text">1. Clear, Actionable Proposal *</label>
            <textarea id="solution_text" name="solution_text" rows="10" bind:value={solutionText} placeholder="Describe your solution in detail..." required></textarea>
            <p class="char-count" class:valid={isDetailedEnough}>
                Characters: {solutionText.length} (Minimum 50 required)
            </p>

            <label for="responsible_stakeholder">2. Responsible Stakeholder *</label>
            <select id="responsible_stakeholder" name="responsible_stakeholder" bind:value={responsibleStakeholder} required>
                <option value="" disabled selected>-- Select the Responsible Body --</option>
                {#each stakeholderOptions as stakeholder}
                    <option value={stakeholder}>{stakeholder}</option>
                {/each}
                <option value="Other">Other</option>
            </select>
           
            {#if isOtherSelected}
                <input type="text" name="other_stakeholder" placeholder="Specify stakeholder" required />
            {/if}
           
            <label for="implementation_timeline">3. Proposed Implementation Timeline *</label>
            <input type="text" name="implementation_timeline" bind:value={implementationTimeline} placeholder="e.g., 6 months, 2026 Q2..." required />

            <label for="supporting_evidence">4. Supporting Evidence (Optional)</label>
            <textarea name="supporting_evidence" rows="4" bind:value={supportingEvidence} placeholder="Cite data, similar projects, or local examples..."></textarea>

            <label for="optional_contact">Contact Information (Optional)</label>
            <input type="text" name="optional_contact" bind:value={optionalContact} placeholder="Email or Phone number" />

            <div class="declaration">
                <input
                    type="checkbox"
                    id="declaration"
                    name="declaration"
                    bind:checked={declarationChecked}
                    required
                />
                <label for="declaration" class="inline-label">I agree to the <a href="/terms">terms of submission</a>.</label>
            </div>
           
            <button
                type="submit"
                class="button-primary final-submit-btn"
                disabled={!isDetailedEnough || !declarationChecked}
            >
                Submit Solution to Policy Team
            </button>
        </form>
    </div>
</div>

<style>
    /* Styles preserved and brand primary green (#007a33) used consistently */
    .alert { padding: 15px; margin-bottom: 20px; border-radius: 6px; font-weight: 600; text-align: center; }
    .alert.success { background-color: rgba(0, 122, 51, 0.1); color: #007a33; border: 1px solid #007a33; }
    .alert.error { background-color: rgba(176, 30, 38, 0.1); color: #b01e26; border: 1px solid #b01e26; }
    .submit-page { padding: 40px 0; font-family: 'Source Sans 3', sans-serif; }
    header { text-align: center; margin-bottom: 40px; }
    h1 { color: #007a33; }
    .submission-content-wrapper { max-width: 700px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
   
    .challenge-card { border: 2px solid #eee; border-radius: 8px; margin-bottom: 15px; overflow: hidden; }
    .card-header { display: flex; justify-content: space-between; width: 100%; padding: 15px 20px; background: #f9f9f9; border: none; cursor: pointer; text-align: left; }
    .challenge-card.expanded .card-header { background: #007a33; color: white; }
    .card-content { padding: 0 20px; max-height: 0; overflow: hidden; transition: max-height 0.4s ease-out; }
    .challenge-card.expanded .card-content { max-height: 2000px; padding: 15px 20px; }
   
    .detailed-context h4 { margin-top: 15px; color: #b01e26; border-bottom: 1px solid #eee; padding-bottom: 5px; }
    .detailed-context ul { padding-left: 20px; margin-bottom: 15px; }
    .detailed-context li { margin-bottom: 8px; font-size: 0.95rem; line-height: 1.5; }
   
    .criteria-section { background: #f4f4f4; padding: 20px; border-left: 5px solid #b01e26; margin-bottom: 30px; }
    label { display: block; font-weight: 600; margin-top: 15px; }
    select, textarea, input[type="text"] { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; margin-top: 5px; box-sizing: border-box; }
    .final-submit-btn { width: 100%; padding: 15px; background: #007a33; color: white; border: none; cursor: pointer; border-radius: 6px; font-weight: bold; margin-top: 20px; }
    .final-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .char-count { font-size: 0.85rem; color: #666; margin-top: 5px; }
    .char-count.valid { color: #007a33; font-weight: bold; }
    .declaration { margin-top: 20px; display: flex; align-items: center; gap: 10px; }
    .inline-label { margin-top: 0; font-weight: normal; }
    .pdf-download-link { display: inline-block; margin-top: 15px; color: #b01e26; font-weight: bold; text-decoration: none; border: 1px solid #b01e26; padding: 8px 15px; border-radius: 5px; }
</style>