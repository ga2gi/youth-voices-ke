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

    // --- UPDATED Challenges of the Month Context (January 2026) ---
    let challengesOfTheMonthContext = [
        {
            id: 1, 
            title: "January 2026 Policy Challenge I: Youth Access to Capital",
            excerpt: "What practical measures can Kenya adopt to improve access to youth-friendly capital for self-employment across creative, digital, and agricultural sectors?",
            details: `
                <h3>Make Your Voice Count</h3>
                <p>Submit a practical, innovative, and scalable solution that:</p>
                <ul>
                    <li>Includes creatives, freelancers, artisans, and digital workers.</li>
                    <li>Addresses barriers like lack of collateral and high interest rates.</li>
                    <li>Leverages public funds, private finance, and blended finance.</li>
                    <li>Strengthens transparency and impact tracking.</li>
                </ul>
            `,
            expanded: false,
            pdfLink: null
        },
        {
            id: 2,
            title: "January 2026 Policy Challenge II: Youth-Led Mental Health Solutions",
            excerpt: "What practical solution(s) can Kenya adopt to improve access to youth-friendly mental health services and reduce stigma?",
            details: `
                <h3>Make Your Voice Count</h3>
                <p>Submit a practical solution that addresses mental health among Kenyans (18–35 years). Your solution should:</p>
                <ul>
                    <li>Focus on <strong>implementation</strong>, not just diagnosing the problem.</li>
                    <li>Work within current legal and institutional frameworks.</li>
                    <li>Strengthen accountability in health and education systems.</li>
                </ul>
            `,
            expanded: false,
            pdfLink: null
        }
    ];

    // Dynamic PDF Link Population
    challengesOfTheMonthContext = challengesOfTheMonthContext.map(contextChallenge => {
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
        <p class="tagline">Your idea must directly address one of the challenges below or a challenge from the dropdown list.</p>
    </header>
    
    <section class="challenges-of-month-section">
        <h2>🔥 Challenges of the Month (Context)</h2>
        <div class="challenge-cards-wrapper">
            {#each challengesOfTheMonthContext as challenge (challenge.id)}
                <div class="challenge-card" class:expanded={challenge.expanded}>
                    <button class="card-header" on:click={() => toggleChallenge(challenge.id)}>
                        <h3>{challenge.title}</h3>
                        <span class="toggle-icon">{challenge.expanded ? '−' : '+'}</span>
                    </button>
                    
                    <div class="card-content">
                        <p>{challenge.excerpt}</p>
                        {#if challenge.expanded}
                            <div class="details-content">
                                {@html challenge.details}
                            </div>
                            {#if challenge.pdfLink}
                                <a href={challenge.pdfLink} target="_blank" class="pdf-download-link">
                                    ⬇️ Download Full Challenge PDF
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
            <label for="challenge_title">Select the Policy Challenge Area *</label>
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
            <input type="text" name="implementation_timeline" bind:value={implementationTimeline} placeholder="e.g., 6 months, 2026 Q1..." required />

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
    .alert { padding: 15px; margin-bottom: 20px; border-radius: 6px; font-weight: 600; text-align: center; }
    .alert.success { background-color: rgba(0, 122, 51, 0.1); color: #007a33; border: 1px solid #007a33; }
    .alert.error { background-color: rgba(176, 30, 38, 0.1); color: #b01e26; border: 1px solid #b01e26; }
    .submit-page { padding: 40px 0; }
    header { text-align: center; margin-bottom: 40px; }
    h1 { color: #007a33; }
    .submission-content-wrapper { max-width: 700px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    .challenge-card { border: 2px solid #eee; border-radius: 8px; margin-bottom: 15px; overflow: hidden; }
    .card-header { display: flex; justify-content: space-between; width: 100%; padding: 15px 20px; background: #f9f9f9; border: none; cursor: pointer; text-align: left; }
    .challenge-card.expanded .card-header { background: #007a33; color: white; }
    .card-content { padding: 0 20px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }
    .challenge-card.expanded .card-content { max-height: 1000px; padding: 15px 20px; }
    .criteria-section { background: #f4f4f4; padding: 20px; border-left: 5px solid #b01e26; margin-bottom: 30px; }
    label { display: block; font-weight: 600; margin-top: 15px; }
    select, textarea, input[type="text"] { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; margin-top: 5px; box-sizing: border-box; }
    .final-submit-btn { width: 100%; padding: 15px; background: #007a33; color: white; border: none; cursor: pointer; border-radius: 6px; font-weight: bold; margin-top: 20px; }
    .final-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .char-count { font-size: 0.85rem; color: #666; margin-top: 5px; }
    .char-count.valid { color: #007a33; font-weight: bold; }
    .declaration { margin-top: 20px; display: flex; align-items: center; gap: 10px; }
    .inline-label { margin-top: 0; font-weight: normal; }
</style>