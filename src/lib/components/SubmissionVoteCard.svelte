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

    $: isTarget = form && (form.voted_id === submission.id);
    
    $: {
        if (isTarget) {
            if (form.success) {
                isVoted = true;
                voteError = null;
            } else if (form.error) {
                voteError = form.error;
            }
        }
    }

    function handleVote({ formData }) {
        voteError = null;
        isVoted = false;
        formData.append('submission_id', submission.id);
        return async ({ update }) => {
            await update({ invalidateAll: true });
        };
    }
</script>

<div class="card {isVoted ? 'voted' : ''}">
    <div 
        class="header" 
        role="button"
        tabindex="0"
        on:click={() => expanded = !expanded}
        on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                expanded = !expanded;
            }
        }}
    >
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
    /* Local variable definition for the success state, ensuring it does not conflict globally */
    .card {
        --color-voted-success: #27ae60; /* Use a distinct green for success feedback */
    }

    .card {
        background-color: var(--color-white);
        border: 1px solid var(--color-border-light);
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        transition: all 0.2s ease-in-out;
    }
    
    .card.voted {
        border-color: var(--color-voted-success);
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
        /* Use a slight variation of the background for hover feedback */
        background-color: var(--color-background-light); 
    }

    .challenge-title {
        font-size: 1.1em;
        font-weight: 600;
        color: var(--color-primary-accent); /* USES YOUR KENYAN GREEN */
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
        margin-left: 10px;
    }

    .details {
        padding: 0 20px 15px;
        overflow: hidden;
    }
    
    .solution-text {
        white-space: pre-wrap;
        font-size: 1em;
        line-height: 1.6;
        color: var(--color-text-dark);
        /* Uses primary accent for the border to match your brand */
        border-left: 3px solid var(--color-primary-accent); 
        padding-left: 15px;
        margin-top: 15px;
    }

    .footer {
        padding: 15px 20px;
        border-top: 1px solid var(--color-border-light);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--color-background-light);
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
        color: var(--color-voted-success);
    }
    
    .vote-label {
        font-size: 0.9em;
        color: var(--color-text-light);
    }

    .vote-button {
        background-color: var(--color-primary-accent); /* USES YOUR KENYAN GREEN */
        color: var(--color-white);
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .vote-button:hover:not(:disabled) {
        /* Uses the dark green hex from your app.css hover state */
        background-color: #005625; 
    }
    
    .vote-button.voted {
        background-color: var(--color-voted-success);
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