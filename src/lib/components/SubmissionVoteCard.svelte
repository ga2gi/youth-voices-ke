<script>
    import { enhance } from '$app/forms';

    /** @type {{id: string, solution_text: string, challenge_title: string}} */
    export let submission;

    // The actionData passed from the parent page after a form submission
    /** @type {import('../../routes/vote/$types').ActionData} */
    export let form; 

    // Track state to disable/update the button after a successful vote
    $: isVoted = form?.success && form.voted_id === submission.id;
</script>

<div class="submission-card" class:voted={isVoted}>
    <div class="card-content">
        <p class="challenge-tag">
            Challenge: <span>{submission.challenge_title}</span>
        </p>
        
        <h4>Proposed Solution:</h4>
        <div class="solution-text-container">
            <p class="solution-text">
                {submission.solution_text}
            </p>
        </div>
    </div>
    
    <div class="vote-actions">
        <form method="POST" action="?/vote" use:enhance>
            <input type="hidden" name="submission_id" value={submission.id} />

            <button 
                type="submit" 
                class="button-primary vote-button" 
                disabled={isVoted}
            >
                {#if isVoted}
                    Vote Recorded! ✅
                {:else}
                    Upvote This Solution 👍
                {/if}
            </button>
        </form>

        {#if form?.error}
            <p class="vote-error">
                {form.error}
            </p>
        {/if}
    </div>
</div>

<style>
    .submission-card {
        background-color: var(--color-white);
        border: 1px solid var(--color-border-light);
        border-radius: 8px;
        padding: 25px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: all 0.3s;
    }
    
    .voted {
        border: 2px solid var(--color-primary-accent);
        box-shadow: 0 4px 12px rgba(0, 122, 51, 0.2);
        opacity: 0.9;
    }

    .challenge-tag {
        font-size: 0.9em;
        font-weight: 500;
        color: var(--color-text-light);
        margin-bottom: 15px;
        border-bottom: 1px dashed var(--color-border-light);
        padding-bottom: 5px;
    }

    .challenge-tag span {
        font-weight: 700;
        color: var(--color-text-dark);
    }
    
    .submission-card h4 {
        font-size: 1.1em;
        color: var(--color-text-dark);
        margin-bottom: 5px;
    }

    .solution-text-container {
        /* Limit height of solution text to keep card size consistent */
        max-height: 150px; 
        overflow: hidden;
        margin-bottom: 15px;
    }

    .solution-text {
        font-size: 0.95em;
        color: var(--color-text-dark);
        /* Use a slight vertical gradient to hint at truncated text */
        mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
    }

    .vote-actions {
        border-top: 1px solid var(--color-border-light);
        padding-top: 15px;
        text-align: center;
    }

    .vote-button {
        width: 100%;
        font-size: 1.1em;
    }

    .vote-error {
        color: var(--color-secondary-accent);
        font-size: 0.8em;
        margin-top: 10px;
    }
</style>