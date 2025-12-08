<script>
    import SubmissionVoteCard from '$lib/components/SubmissionVoteCard.svelte';
    
    /** @type {import('./$types').PageData} */
    export let data;

    // Action data is needed to pass the success/error state down to the cards
    /** @type {import('./$types').ActionData} */
    export let form; 

    const { submissions } = data;
</script>

<div class="voting-page-container">
    <h2>🗳️ Community Voting: Select the Best Ideas</h2>
    <p class="subtitle">Review the submitted policy solutions below and cast your vote for the most impactful idea.</p>

    {#if submissions && submissions.length > 0}
        <div class="submissions-grid">
            {#each submissions as submission (submission.id)}
                <SubmissionVoteCard {submission} {form} />
            {/each}
        </div>
    {:else}
        <div class="empty-state">
            <h3>No Solutions Ready for Voting Yet</h3>
            <p>We are still collecting submissions. Check back soon!</p>
        </div>
    {/if}
</div>

<style>
    .voting-page-container {
        padding: 20px 0;
    }
    
    h2 {
        font-size: 2.2em;
        font-weight: 700;
        margin-bottom: 5px;
        color: var(--color-text-dark);
        text-align: center;
    }

    .subtitle {
        text-align: center;
        color: var(--color-text-light);
        margin-bottom: 40px;
        font-size: 1.1em;
    }
    
    .submissions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 30px;
        padding-bottom: 40px;
    }

    .empty-state {
        text-align: center;
        padding: 80px;
        background-color: #f9f9f9;
        border: 1px dashed var(--color-border-light);
        border-radius: 8px;
        margin: 40px auto;
        max-width: 600px;
    }
    
    .empty-state h3 {
        color: var(--color-primary-accent);
        margin-bottom: 10px;
    }
</style>