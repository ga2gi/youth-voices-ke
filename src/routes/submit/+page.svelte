<script>
    import { enhance } from '$app/forms';

    /** @type {import('./$types').PageData} */
    export let data;

    const { challenges } = data; // Data containing available challenges
    
    // State for client-side form data and validation checks
    let challengeTitle = '';
    let solutionText = '';
    let optionalContact = '';

    // Function to check if the minimum character count is met (for visual feedback)
    $: isDetailedEnough = solutionText.length >= 50;
</script>

<div class="container submit-page">
    <header>
        <h1>📝 Submit Your Policy Solution</h1>
        <p class="tagline">Turn your innovative idea into a tangible policy brief. Please ensure your solution meets the criteria below.</p>
    </header>

    <div class="submission-content-wrapper">
        <section class="criteria-section">
            <h2>💡 Our Submission Criteria</h2>
            <p>Solutions that move forward to voting and policy formulation must be:</p>
            <ul>
                <li>Relevance: Directly address one of the listed policy challenges.</li>
                <li>Feasibility: Proposed action must be realistic and implementable within the Kenyan governance context.</li>
                <li>Impact: Clearly articulate the positive outcome for the community or the target policy area.</li>
                <li>Clarity: Solution must be detailed, well-articulated, and constructive (minimum 50 characters).</li>
            </ul>
        </section>

        <form method="POST" action="?/submit" use:enhance class="single-page-form">
            <h2>Submit Solution Details</h2>
            
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
            
            <label for="solution_text">Detail Your Proposed Solution *</label>
            <textarea 
                id="solution_text"
                name="solution_text" 
                rows="10" 
                placeholder="Be specific about the problem it solves, the proposed action, and the expected impact. (Min 50 characters)"
                bind:value={solutionText}
                required
            ></textarea>
            <p class="char-count" class:valid={isDetailedEnough}>
                Characters: {solutionText.length} (Maximum 500 required)
            </p>

            <label for="optional_contact">Your Contact Information (Optional)</label>
            <input 
                type="text" 
                id="optional_contact" 
                name="optional_contact" 
                placeholder="Email or Phone Number (if you wish to be included in next step if challenge is selected)"
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

    /* --- Criteria Section --- */
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

    .criteria-section p {
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
        content: '✓';
        color: var(--color-primary-accent);
        font-weight: bold;
        position: absolute;
        left: 0;
    }

    /* --- Form Styling --- */
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