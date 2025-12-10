<script>
    import SubmissionVoteCard from '$lib/components/SubmissionVoteCard.svelte';
    
    /** @type {import('./$types').PageData} */
    export let data;

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
    /* Using global CSS variables from app.css */
    .voting-page-container {
        padding: 20px 0;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    h2 {
        font-size: clamp(1.8em, 4vw, 2.5em); /* Responsive font size */
        font-weight: 700;
        margin-bottom: 5px;
        color: var(--color-primary-accent);
        text-align: center;
        padding: 0 10px;
    }

    .subtitle {
        text-align: center;
        color: var(--color-text-light);
        margin-bottom: 40px;
        font-size: clamp(1em, 2vw, 1.15em);
        padding: 0 10px;
    }
    
    .submissions-grid {
        /* Responsive Grid: Cards wrap when screen size decreases */
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 30px;
        padding: 0 20px 40px; /* Add horizontal padding for smaller screens */
    }

    /* Tablet breakpoint */
    @media (max-width: 768px) {
        .submissions-grid {
            grid-template-columns: 1fr; /* Stack cards vertically */
            padding: 0 15px 40px;
        }
    }

    .empty-state {
        text-align: center;
        padding: 60px 20px;
        background-color: var(--color-background-light);
        border: 2px dashed var(--color-border-light);
        border-radius: 8px;
        margin: 40px auto;
        max-width: 600px;
    }
    
    .empty-state h3 {
        color: var(--color-primary-accent);
        margin-bottom: 10px;
    }
</style>