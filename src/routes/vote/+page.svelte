<script>
    import SubmissionVoteCard from '$lib/components/SubmissionVoteCard.svelte';
    // SvelteKit's stores are not strictly necessary here but are good practice for future use
    // import { page } from '$app/stores'; 

    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {import('./$types').ActionData} */
    export let form;

    // --- Data Grouping Logic ---
    // Group submissions by challenge title for easy display
    $: groupedSubmissions = data.submissions.reduce((groups, submission) => {
        const title = submission.challenge_title;
        if (!groups[title]) {
            groups[title] = {
                title: title,
                id: submission.challenge_id, // Use the challenge ID for the key
                submissions: []
            };
        }
        groups[title].submissions.push(submission);
        return groups;
    }, {});
    
    // Convert the object into an array for easy iteration in the template
    $: challengeGroups = Object.values(groupedSubmissions);

</script>

<svelte:head>
    <title>Voting Phase - Youth Voices KE</title>
</svelte:head>

<div class="container">
    <div class="hero">
        <h1 class="page-title">Community Voting: Select the Best Ideas</h1>
        <p class="page-subtitle">Review the submitted policy solutions below and cast your vote for the most impactful idea.</p>
    </div>

    <section class="voting-instructions">
        <h2>🗳️ Your Vote Shapes Policy</h2>
        <div class="instructions-content">
            <div class="instruction-box">
                <h3>Why Vote?</h3>
                <p>Your vote directly contributes to the final selection of policy proposals. Final policy briefs selection incorporates both committee evaluation and community voting.</p>
            </div>
            <div class="instruction-box">
                <h3>How to Vote</h3>
                <p>We feature solutions for challenges each month. You get one vote per challenge. Select the solution you believe is the most relevant, feasible, and impactful, and click 'Upvote This Solution'.</p>
                <p class="rule">Note: Once you vote on a challenge, you cannot vote on another solution within that same challenge.</p>
            </div>
            <div class="instruction-box">
                <h3>What Happens Next?</h3>
                <p>The shortlisted submissions, informed by your voting and our expert review, will be used by Youth Voices KE and its Stakeholders to produce final policy briefs.</p>
            </div>
        </div>
    </section>

    {#if data.submissions.length > 0}
        {#each challengeGroups as challengeGroup, index (challengeGroup.id)}
            <section class="challenge-group">
                <h2 class="challenge-group-title">Challenge {index + 1}: {challengeGroup.title}</h2>
                <div class="submissions-grid">
                    {#each challengeGroup.submissions as submission (submission.id)}
                        <SubmissionVoteCard 
                            {submission} 
                            {form} 
                        />
                    {/each}
                </div>
            </section>
        {:else}
            <p class="empty-state">No Submissions are ready for voting under this challenge yet. Check back soon!</p>
        {/each}
    {:else}
        <div class="empty-state">
            <p>No Solutions Ready for Voting Yet</p>
            <p>We are still collecting submissions or shortlisting. Check back soon!</p>
        </div>
    {/if}
</div>

<style>
    /* Hero/Title Styles */
    .hero {
        text-align: center;
        padding: 40px 0 20px;
    }

    .page-title {
        font-size: 2.5em;
        color: var(--color-primary-accent, #007A33);
        margin-bottom: 5px;
        font-weight: 700;
    }

    .page-subtitle {
        font-size: 1.1em;
        color: var(--color-text-dark, #333333);
    }
    
    /* Instruction Styles */
    .voting-instructions {
        background-color: var(--color-white, #FFFFFF);
        border: 1px solid var(--color-border-light, #DDDDDD);
        border-radius: 8px;
        padding: 25px;
        margin-bottom: 40px;
        text-align: center;
    }
    
    .voting-instructions h2 {
        color: var(--color-primary-accent, #007A33);
        font-size: 1.8em;
        margin-bottom: 20px;
    }

    .instructions-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        text-align: left;
    }

    .instruction-box {
        background-color: var(--color-background-light, #F9F9F9);
        padding: 15px;
        border-left: 4px solid var(--color-primary-accent, #007A33);
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .instruction-box h3 {
        color: var(--color-text-dark, #333333);
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    
    .instruction-box p {
        color: var(--color-text-dark, #333333);
        font-size: 0.95em;
    }
    
    .rule {
        margin-top: 10px;
        /* Using the secondary red accent for a warning/rule */
        color: var(--color-secondary-accent, #B01E26); 
        font-weight: 600;
    }

    /* Grouping Styles */
    .challenge-group {
        margin-bottom: 50px;
    }

    .challenge-group-title {
        font-size: 2em;
        color: var(--color-text-dark, #333333);
        border-bottom: 3px solid var(--color-primary-accent, #007A33);
        padding-bottom: 10px;
        margin-bottom: 25px;
        font-weight: 600;
    }

    .submissions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 30px;
    }
    
    .empty-state {
        text-align: center;
        padding: 80px 0;
        font-size: 1.2em;
        color: var(--color-text-light, #666666);
    }
</style>