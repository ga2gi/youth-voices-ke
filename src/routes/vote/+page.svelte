<script>
    import { enhance } from '$app/forms';
    export let data;

    // Track which solution is selected for each challenge
    // Structure: { challengeId: selectedSolutionId }
    let selections = {};

    function selectSolution(challengeId, solutionId) {
        selections[challengeId] = solutionId;
        selections = selections; // Trigger reactivity
    }

    $: hasVoted = (cId) => data.userVotes.some(v => v.challenge_id === cId);
</script>

<div class="page-wrapper">
    <header class="hero-section">
        <div class="container">
            <div class="vote-badge">🗳️ Your Vote Shapes Policy</div>
            <h1>Voting Phase</h1>
            <p class="hero-intro">Review the submitted policy solutions below and cast your vote for the most impactful idea.</p>
            
            <div class="guidelines-grid">
                <div class="guideline-card">
                    <h3>Why Vote?</h3>
                    <p>Your vote directly contributes to the final selection of policy proposals. Final policy briefs selection incorporates both committee evaluation and community voting.</p>
                </div>
                <div class="guideline-card">
                    <h3>How to Vote</h3>
                    <p>We feature solutions for challenges each month. You get one vote per challenge. Select the solution you believe is the most relevant and click 'Vote'.</p>
                </div>
                <div class="guideline-card full-width">
                    <h3>What Happens Next?</h3>
                    <p>The shortlisted submissions, informed by your voting and our expert review, will be used by Youth Voices KE and its Stakeholders to produce final policy briefs.</p>
                </div>
            </div>
            
            <p class="disclaimer">
                <strong>Note:</strong> Once you vote on a challenge, you cannot vote on another solution within that same challenge.
            </p>
        </div>
    </header>

    <main class="container">
        {#each data.challenges as challenge}
            <section class="challenge-card">
                <div class="challenge-header">
                    <h2>{challenge.title}</h2>
                </div>

                {#if hasVoted(challenge.id)}
                    <div class="voted-banner">
                        <p>✅ Your vote has been recorded for this challenge. Thank you!</p>
                    </div>
                {:else}
                    <div class="options-list">
                        {#each challenge.options as sol}
                            <button 
                                type="button"
                                class="option-btn"
                                class:is-active={selections[challenge.id] === sol.id}
                                on:click={() => selectSolution(challenge.id, sol.id)}
                            >
                                <div class="radio-circle">
                                    {#if selections[challenge.id] === sol.id}
                                        <div class="dot"></div>
                                    {/if}
                                </div>
                                <span class="solution-text">{sol.solution_text}</span>
                            </button>
                        {/each}
                    </div>

                    <div class="vote-footer">
                        <form method="POST" action="?/vote" use:enhance>
                            <input type="hidden" name="challenge_id" value={challenge.id} />
                            <input type="hidden" name="solution_id" value={selections[challenge.id] || ''} />
                            
                            <button 
                                type="submit" 
                                class="green-vote-btn" 
                                disabled={!selections[challenge.id]}
                            >
                                Vote
                            </button>
                        </form>
                    </div>
                {/if}
            </section>
        {/each}
    </main>
</div>

<style>
    :global(body) { background-color: #f9fafb; margin: 0; font-family: 'Inter', sans-serif; color: #111827; }
    .container { max-width: 1000px; margin: 0 auto; padding: 0 1.5rem; }

    /* Hero Styling */
    .hero-section { background: white; padding: 4rem 0; border-bottom: 1px solid #e5e7eb; margin-bottom: 3rem; text-align: center; }
    /* Changed to PolicyBridge Green Tint */
    .vote-badge { background: #f0fdf4; color: #064e3b; padding: 6px 16px; border-radius: 99px; font-weight: 700; display: inline-block; margin-bottom: 1rem; font-size: 0.9rem; border: 1px solid #dcfce7; }
    h1 { font-size: 2.5rem; margin: 0; font-weight: 800; }
    .hero-intro { color: #4b5563; font-size: 1.1rem; margin-top: 1rem; }

    .guidelines-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2.5rem; text-align: left; }
    .guideline-card { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
    /* Border color changed to PolicyBridge Green */
    .guideline-card h3 { margin-top: 0; font-size: 1rem; color: #1e293b; border-bottom: 2px solid #064e3b; display: inline-block; padding-bottom: 4px; }
    .guideline-card p { font-size: 0.9rem; color: #64748b; line-height: 1.6; margin-bottom: 0; }
    .full-width { grid-column: span 2; }
    .disclaimer { margin-top: 2rem; font-size: 0.85rem; color: #9ca3af; font-style: italic; }

    /* Challenge Card Styling */
    .challenge-card { background: white; border-radius: 16px; padding: 2rem; margin-bottom: 2.5rem; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .challenge-header { border-bottom: 1px solid #f3f4f6; margin-bottom: 1.5rem; padding-bottom: 1rem; }
    .challenge-header h2 { margin: 0; font-size: 1.5rem; }

    .options-list { display: flex; flex-direction: column; gap: 0.75rem; }
    .option-btn { 
        display: flex; align-items: center; padding: 1.25rem; background: white; 
        border: 2px solid #f3f4f6; border-radius: 10px; cursor: pointer; text-align: left; transition: 0.2s;
    }
    .option-btn:hover { border-color: #d1d5db; }
    /* Active colors changed to PolicyBridge Green */
    .option-btn.is-active { border-color: #064e3b; background: #f0fdf4; }

    .radio-circle { width: 22px; height: 22px; border: 2px solid #d1d5db; border-radius: 50%; margin-right: 1rem; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: white; }
    .is-active .radio-circle { border-color: #064e3b; }
    .dot { width: 12px; height: 12px; background: #064e3b; border-radius: 50%; }

    /* Footer Action */
    .vote-footer { margin-top: 2rem; text-align: right; border-top: 1px solid #f3f4f6; padding-top: 1.5rem; }
    /* Primary button changed to PolicyBridge Green */
    .green-vote-btn { 
        background: #064e3b; color: white; border: none; padding: 0.8rem 3.5rem; 
        border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.2s; font-size: 1rem;
    }
    .green-vote-btn:hover:not(:disabled) { background: #043d2e; transform: translateY(-1px); }
    .green-vote-btn:disabled { background: #9ca3af; cursor: not-allowed; }

    /* Voted banner colors changed to PolicyBridge Green */
    .voted-banner { background: #f0fdf4; color: #064e3b; padding: 1.5rem; border-radius: 12px; text-align: center; border: 1px solid #bbf7d0; font-weight: 600; }
</style>