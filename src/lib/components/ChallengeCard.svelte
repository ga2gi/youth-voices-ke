<script>
    /** @type {{id: string, title: string, category: string, overview_text: string, pdf_url: string}} */
    export let challenge;
</script>

<div class="challenge-card">
    <span class="challenge-category">{challenge.category || 'General'}</span>
    <h3>{challenge.title}</h3>
    <p class="overview-text">{challenge.overview_text}</p>

    <div class="card-actions">
        <a 
            href={challenge.pdf_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            class="button-secondary"
        >
            <span class="icon">⬇️</span> Read Full Brief
        </a>
        
        <a href="/submit" class="button-primary submit-cta">Submit Solution</a>
    </div>
</div>

<style>
    .challenge-card {
        background-color: var(--color-white);
        border: 1px solid var(--color-border-light);
        /* Green accent stripe on the side for professionalism */
        border-left: 5px solid var(--color-primary-accent); 
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .challenge-category {
        display: inline-block;
        font-size: 0.8em;
        font-weight: 700;
        color: var(--color-primary-accent);
        text-transform: uppercase;
        margin-bottom: 10px;
        padding: 3px 8px;
        background-color: rgba(0, 122, 51, 0.1); /* Light green background */
        border-radius: 4px;
    }

    .challenge-card h3 {
        font-size: 1.5em;
        color: var(--color-text-dark);
        margin-bottom: 15px;
    }

    .overview-text {
        color: var(--color-text-light);
        margin-bottom: 25px;
        flex-grow: 1; /* Pushes action buttons to the bottom */
    }

    .card-actions {
        display: flex;
        gap: 15px;
        margin-top: 15px;
    }

    /* Secondary button for downloads/details */
    .button-secondary {
        background: none;
        color: var(--color-text-dark);
        border: 1px solid var(--color-border-light);
        padding: 10px 15px;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .button-secondary:hover {
        border-color: var(--color-primary-accent);
        color: var(--color-primary-accent);
    }
    
    .submit-cta {
        flex-grow: 1; /* Makes the main CTA prominent */
        text-align: center;
        text-decoration: none;
    }
</style>