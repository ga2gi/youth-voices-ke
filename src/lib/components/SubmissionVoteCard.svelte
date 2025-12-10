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
                // Clear any previous error
                voteError = null;
            } else if (form.error) {
                // Display error (e.g., already voted)
                voteError = form.error;
            }
        }
    }

    // Function to handle the form submission
    function handleVote({ formData }) {
        // Clear previous error and reset isVoted status before submission
        voteError = null;
        isVoted = false;

        // Add the submission ID to the form data
        formData.append('submission_id', submission.id);

        return async ({ update }) => {
            // Update the page data to refresh vote counts after a successful submission
            await update({ invalidateAll: true });
        };
    }
</script>

<div class="card {isVoted ? 'voted' : ''}">
    <div class="header" on:click={() => expanded = !expanded}>
        <h3 class="challenge-title">Challenge: {submission.challenge_title}</h3>
        <p class="summary-label">Solution Proposal</p>
        <span class="expand-icon">{expanded ? '▲' : '▼'}</span>
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

            {#if isVoted}
                <button class="vote-button voted" disabled>
                    Voted! 🎉
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
    .card {
        background-color: #ffffff;
        border: 1px solid var(--color-border-light);
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        transition: all 0.2s ease-in-out;
    }
    
    .card.voted {
        border-color: var(--color-success);
        box-shadow: 0 0 15px rgba(39, 174, 96, 0.2);
    }

    .header {
        padding: 20px;
        cursor: pointer;
        border-bottom: 1px solid var(--color-border-light);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
    }

    .header:hover {
        background-color: #f7f7f7;
    }

    .challenge-title {
        font-size: 1.1em;
        font-weight: 600;
        color: var(--color-primary-accent);
        margin-bottom: 5px;
        flex: 1 1 100%;
    }
    
    .summary-label {
        font-size: 0.9em;
        color: var(--color-text-light);
        flex: 1 1 80%;
    }

    .expand-icon {
        font-size: 1.2em;
        color: var(--color-text-dark);
    }

    .details {
        padding: 0 20px 15px;
        overflow: hidden;
    }
    
    .solution-text {
        white-space: pre-wrap; /* Ensures line breaks in the submission are respected */
        font-size: 1em;
        line-height: 1.6;
        color: var(--color-text-dark);
        border-left: 3px solid var(--color-secondary-light);
        padding-left: 15px;
        margin-top: 15px;
    }

    .footer {
        padding: 15px 20px;
        border-top: 1px solid var(--color-border-light);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fafafa;
        border-radius: 0 0 12px 12px;
    }

    .vote-info {
        display: flex;
        align-items: baseline;
        gap: 8px;
    }
    
    .vote-count {
        font-size: 1.8em;
        font-weight: 700;
        color: var(--color-primary-accent);
    }
    
    .vote-label {
        font-size: 0.9em;
        color: var(--color-text-light);
    }

    .vote-button {
        background-color: var(--color-primary-accent);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .vote-button:hover:not(:disabled) {
        background-color: var(--color-primary-dark);
    }
    
    .vote-button.voted {
        background-color: var(--color-success);
        cursor: default;
        box-shadow: 0 0 10px rgba(39, 174, 96, 0.5);
    }

    .error-message {
        background-color: #fcebeb;
        color: #e74c3c;
        padding: 10px 20px;
        border-radius: 0 0 12px 12px;
        margin-top: -1px;
        font-size: 0.9em;
        text-align: center;
    }
</style>