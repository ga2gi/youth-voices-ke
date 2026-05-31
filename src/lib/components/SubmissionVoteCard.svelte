<script>
    import { fly } from 'svelte/transition';

    /** @type {{id: string, solution_text: string, challenge_title: string, vote_count: number}} */
    export let submission;

    let expanded = false;
</script>

<div class="card">
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
            <span class="vote-count">{submission.vote_count || 0}</span>
            <span class="vote-label">Votes received</span>
        </div>
        
        <span class="voting-closed">Voting Closed</span>
    </div>
</div>

<style>
    .card {
        background-color: var(--color-white);
        border: 1px solid var(--color-border-light);
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        transition: all 0.2s ease-in-out;
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
        background-color: var(--color-background-light);
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
        color: #64748b;
    }
    
    .vote-label {
        font-size: 0.9em;
        color: var(--color-text-light);
    }

    .voting-closed {
        font-size: 0.78rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #94a3b8;
        background: #f1f5f9;
        padding: 8px 16px;
        border-radius: 99px;
        border: 1px solid #e2e8f0;
    }
</style>