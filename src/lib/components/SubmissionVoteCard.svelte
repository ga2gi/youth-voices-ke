<script>
    import { enhance } from '$app/forms';
    import { fly } from 'svelte/transition';

    /** @type {{id: string, solution_text: string, challenge_title: string, vote_count: number}} */
    export let submission;
    
    /** @type {import('../../routes/vote/$types').ActionData} */
    export let form;

    let expanded = false;
    let isVoted = false;
    let voteError = null;

    // Check if this card was the target of the last form submission
    $: isTarget = form && (form.voted_id === submission.id);
    
    // Update local state based on action result
    $: {
        if (isTarget) {
            if (form.success) {
                isVoted = true;
                voteError = null;
            } else if (form.error) {
                // Display error (e.g., already voted)
                voteError = form.error;
            }
        }
    }

    // Function to handle the form submission
    function handleVote({ formData }) {
        voteError = null;
        
        // Add the submission ID to the form data
        formData.append('submission_id', submission.id);

        return async ({ update }) => {
            // Invalidate the page data to refresh vote counts after a successful submission
            await update({ invalidateAll: true });
        };
    }
</script>

<div class="card {isVoted ? 'voted' : ''}">
    
    <div class="header" on:click={() => expanded = !expanded} role="button" tabindex="0" on:keydown={(e) => { if (e.key === 'Enter') expanded = !expanded; }}>
        <h3 class="challenge-title">{submission.challenge_title}</h3>
        <p class="summary-label">Proposed Solution:</p>
        <span class="expand-icon">{expanded ? '▲ Hide Details' : '▼ View Full Solution'}</span>
    </div>

    {#if expanded}
        <div class="details" transition:fly={{ y: 5, duration: 200 }}>
            <p class="solution-text">{submission.solution_text}</p>
        </div>
    {/if}

    <div class="footer">
        <div class="vote-info">
            <span class="vote-count">{submission.vote_count}</span>
            <span class="vote-label">Votes</span>
        </div>
        
        <form 
            method="POST" 
            action="?/vote" 
            use:enhance={handleVote}
            class="vote-form"
        >
            <input type="hidden" name="submission_id" value={submission.id}>

            {#if isVoted || (form && form.error && form.voted_id === submission.id)}
                <button class="vote-button voted" disabled>
                    {isVoted ? 'Voted! 🎉' : 'Already Voted'}
                </button>
            {:else}
                <button class="vote-button" type="submit">
                    Cast Your Vote
                </button>
            {/if}
        </form>
    </div>
    
    {#if voteError && isTarget}
        <p class="error-message" transition:fly={{ y: -5, duration: 200 }}>{voteError}</p>
    {/if}
</div>

<style>
    /* Card Styles */
    .card {
        background-color: #ffffff;
        border: 1px solid var(--color-border-light);
        border-radius: 12px;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        transition: all 0.3s ease-in-out;
        overflow: hidden;
    }
    
    .card.voted {
        border-color: var(--color-success);
        box-shadow: 0 0 15px rgba(39, 174, 96, 0.3);
    }

    /* Header Styles (Clickable for Expand) */
    .header {
        padding: 20px;
        cursor: pointer;
        border-bottom: 1px solid var(--color-border-light);
        display: flex;
        flex-direction: column;
        gap: 5px;
        transition: background-color 0.2s;
    }

    .header:hover {
        background-color: #fcfcfc;
    }

    .challenge-title {
        font-size: 1.2em;
        font-weight: 600;
        color: var(--color-primary-accent);
        line-height: 1.4;
    }
    
    .summary-label {
        font-size: 0.9em;
        font-weight: 500;
        color: var(--color-text-light);
    }

    .expand-icon {
        font-size: 0.9em;
        font-weight: 600;
        color: var(--color-secondary-light);
        margin-top: 10px;
        align-self: flex-end;
    }
    
    /* Details (Expanded Content) */
    .details {
        padding: 0 20px 15px;
        overflow: hidden;
    }
    
    .solution-text {
        white-space: pre-wrap; /* Ensures line breaks are respected */
        font-size: 1em;
        line-height: 1.6;
        color: var(--color-text-dark);
        border-left: 3px solid var(--color-secondary-light);
        padding-left: 15px;
        margin-top: 15px;
    }

    /* Footer (Vote Info) */
    .footer {
        padding: 15px 20px;
        border-top: 1px solid var(--color-border-light);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fafafa;
    }

    .vote-info {
        display: flex;
        align-items: baseline;
        gap: 8px;
    }
    
    .vote-count {
        font-size: 2em;
        font-weight: 800;
        color: var(--color-success); 
        line-height: 1;
    }
    
    .vote-label {
        font-size: 0.9em;
        color: var(--color-text-light);
    }

    /* Vote Button */
    .vote-button {
        background-color: var(--color-primary-accent);
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.1s;
        font-size: 1em;
    }

    .vote-button:hover:not(:disabled) {
        background-color: var(--color-primary-dark);
        transform: translateY(-1px);
    }
    
    .vote-button.voted {
        background-color: var(--color-success);
        cursor: default;
        box-shadow: 0 0 10px rgba(39, 174, 96, 0.3);
    }

    /* Error Message */
    .error-message {
        background-color: #fef4f4;
        color: #e74c3c;
        padding: 10px 20px;
        font-size: 0.9em;
        text-align: center;
        margin: 0;
    }
    
    /* Mobile adjustments */
    @media (max-width: 480px) {
        .footer {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
        }

        .vote-button {
            width: 100%;
            padding: 10px;
        }
    }
</style>