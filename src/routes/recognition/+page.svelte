<script>
    /** @type {import('./$types').PageData} */
    export let data;

    // Pipeline stages updated to reflect "Brief Drafting" as the current active phase
    const pipelineStages = [
        { 
            step: 1, 
            label: "Idea Sourcing", 
            status: "completed", 
            description: "Completed Q1 intake for Capital Access & Mental Health challenges." 
        },
        { 
            step: 2, 
            label: "Policy Lab Analysis", 
            status: "completed", 
            description: "Expert review and data synthesis of top-voted youth solutions." 
        },
        { 
            step: 3, 
            label: "Brief Drafting", 
            status: "active", 
            description: "Transforming analyzed data into formal briefs for legislative review." 
        },
        { 
            step: 4, 
            label: "Stakeholder Advocacy", 
            status: "upcoming", 
            description: "Scheduled presentations to relevant Ministries & Oversight bodies." 
        }
    ];
</script>

<div class="pipeline-container">
    <header class="section-header">
        <span class="pre-title">Current Progress: Q1 Synthesis</span>
        <h2>🚀 Policy Development Pipeline</h2>
        <p class="subtitle">
            The solutions submitted between January and March are now in the <strong>Drafting Phase</strong>. 
            Our team is currently refining these into professional policy documents.
        </p>
    </header>

    <div class="pipeline-tracker">
        {#each pipelineStages as stage}
            <div class="stage-card {stage.status}">
                <div class="stage-number">
                    {#if stage.status === 'completed'}
                        <span class="check">✓</span>
                    {:else}
                        {stage.step}
                    {/if}
                </div>
                <div class="stage-content">
                    <div class="status-badge">{stage.status === 'active' ? 'Current Phase' : stage.status}</div>
                    <h3>{stage.label}</h3>
                    <p>{stage.description}</p>
                </div>
                
                {#if stage.status === 'active'}
                    <div class="drafting-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <span class="action-text">Refining Documents...</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>

    <div class="drafting-focus-box">
        <div class="focus-header">
            <span class="icon">📄</span>
            <h4>On the Drafting Table:</h4>
        </div>
        <ul class="focus-list">
            <li><strong>Brief 001:</strong> De-risking Youth MSMEs (Targeting the KSh 500B Credit Gap)</li>
            <li><strong>Brief 002:</strong> Decentralizing Mental Health Care to Ward Levels</li>
        </ul>
        <p class="footer-note">Estimated completion: 14 days</p>
    </div>
</div>

<style>
    .pipeline-container {
        padding: 60px 20px;
        font-family: 'Source Sans 3', sans-serif;
        max-width: 1100px;
        margin: 0 auto;
    }

    .section-header { text-align: center; margin-bottom: 50px; }

    .pre-title {
        color: #007a33;
        text-transform: uppercase;
        font-weight: 800;
        font-size: 0.85em;
        letter-spacing: 1.5px;
    }

    h2 { font-size: 2.5em; font-weight: 800; color: #1a1a1a; margin: 10px 0; }

    .subtitle { color: #666; font-size: 1.1em; max-width: 700px; margin: 0 auto; line-height: 1.6; }

    .pipeline-tracker {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 25px;
        margin-top: 40px;
    }

    .stage-card {
        background: #fff;
        border: 1px solid #eee;
        border-radius: 12px;
        padding: 30px;
        position: relative;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
    }

    .stage-number {
        position: absolute;
        top: -15px;
        left: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        background: #f0f0f0;
        color: #999;
        border: 4px solid #fff;
    }

    /* Completed Styles */
    .stage-card.completed { border-top: 4px solid #007a33; }
    .stage-card.completed .stage-number { background: #007a33; color: white; }
    
    /* Active/Drafting Styles */
    .stage-card.active { 
        border: 2px solid #007a33; 
        box-shadow: 0 10px 30px rgba(0,122,51,0.12);
        background: #fdfdfd;
        z-index: 2;
    }
    .stage-card.active .stage-number { background: #b01e26; color: white; }

    .status-badge {
        font-size: 0.7em;
        text-transform: uppercase;
        font-weight: 700;
        margin-bottom: 12px;
        display: inline-block;
        padding: 2px 8px;
        border-radius: 4px;
        background: #f5f5f5;
        color: #888;
    }

    .active .status-badge { background: #fff3f3; color: #b01e26; }
    .completed .status-badge { background: #e8f5e9; color: #007a33; }

    .stage-card h3 { margin: 0 0 10px 0; font-size: 1.3em; color: #1a1a1a; }
    .stage-card p { font-size: 0.95em; color: #666; line-height: 1.5; margin: 0; flex-grow: 1; }

    /* Drafting Animation */
    .drafting-indicator {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 15px;
    }

    .typing-dot {
        width: 6px;
        height: 6px;
        background: #b01e26;
        border-radius: 50%;
        animation: typing 1.4s infinite;
    }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }

    .action-text { font-size: 0.8em; color: #b01e26; font-weight: 700; margin-left: 5px; }

    @keyframes typing {
        0%, 100% { opacity: 0.3; transform: translateY(0); }
        50% { opacity: 1; transform: translateY(-3px); }
    }

    .progress-bar { height: 4px; background: #eee; margin-top: 12px; border-radius: 2px; overflow: hidden; }
    .progress-fill { height: 100%; background: #007a33; width: 45%; }

    /* Focus Box */
    .drafting-focus-box {
        margin-top: 50px;
        background: #1a1a1a;
        color: white;
        padding: 30px;
        border-radius: 12px;
        text-align: left;
    }

    .focus-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
    .focus-header h4 { margin: 0; font-size: 1.2em; color: #fff; }
    
    .focus-list { list-style: none; padding: 0; margin: 0; }
    .focus-list li { 
        padding: 10px 0; 
        border-bottom: 1px solid #333; 
        color: #ccc; 
        display: flex; 
        align-items: center;
    }
    .focus-list li::before { content: "→"; margin-right: 15px; color: #007a33; font-weight: bold; }

    .footer-note { font-size: 0.85em; color: #666; margin-top: 15px; font-style: italic; }

    @media (max-width: 768px) {
        .pipeline-tracker { grid-template-columns: 1fr; }
    }
</style>