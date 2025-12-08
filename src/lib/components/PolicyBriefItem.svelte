<script>
    /** @type {{id: string, title: string, description: string, pdf_url: string, status: string, stakeholder_acknowledged: string, delivery_date: string}} */
    export let brief;

    // Define the official status steps
    const statusSteps = [
        'Delivered', 
        'Acknowledged', 
        'In Review', 
        'Implemented'
    ];

    // Determine the active step index
    const activeIndex = statusSteps.indexOf(brief.status);

    // Helper for formatting date
    const formatDate = (isoDate) => {
        if (!isoDate) return 'N/A';
        return new Date(isoDate).toLocaleDateString('en-KE', { 
            year: 'numeric', month: 'short', day: 'numeric' 
        });
    };
</script>

<div class="brief-item">
    <div class="brief-header">
        <h3>{brief.title}</h3>
        <a 
            href={brief.pdf_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            class="button-download"
        >
            Download Brief ⬇️
        </a>
    </div>

    <p class="brief-description">{brief.description}</p>
    
    <div class="brief-meta">
        <span class="meta-item">
            <strong>Delivered:</strong> {formatDate(brief.delivery_date)}
        </span>
        <span class="meta-item acknowledged-by">
            <strong>Acknowledged By:</strong> {brief.stakeholder_acknowledged || 'Awaiting response'}
        </span>
    </div>

    <div class="status-tracker">
        {#each statusSteps as step, index}
            <div class="status-step" class:active={index <= activeIndex} class:current={index === activeIndex}>
                <span class="step-dot"></span>
                <span class="step-label">{step}</span>
            </div>
        {/each}
    </div>
</div>

<style>
    .brief-item {
        background-color: var(--color-white);
        border: 1px solid var(--color-border-light);
        border-radius: 8px;
        padding: 30px;
        margin-bottom: 30px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }
    
    .brief-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 15px;
    }

    .brief-header h3 {
        font-size: 1.6em;
        color: var(--color-primary-accent); /* Green accent */
        margin: 0;
    }

    .button-download {
        background: none;
        color: var(--color-text-dark);
        border: 1px solid var(--color-border-light);
        padding: 8px 15px;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.2s;
        white-space: nowrap;
        font-size: 0.9em;
    }
    
    .button-download:hover {
        border-color: var(--color-secondary-accent); /* Red hover */
        color: var(--color-secondary-accent);
    }

    .brief-description {
        color: var(--color-text-dark);
        margin-bottom: 20px;
    }

    .brief-meta {
        display: flex;
        gap: 30px;
        margin-bottom: 30px;
        font-size: 0.95em;
        color: var(--color-text-light);
    }

    .brief-meta strong {
        color: var(--color-text-dark);
        font-weight: 600;
    }

    /* --- Status Tracker Styles --- */
    .status-tracker {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        position: relative;
        margin-top: 10px;
        padding-top: 20px;
    }
    
    /* Horizontal connecting line */
    .status-tracker::before {
        content: '';
        position: absolute;
        top: 28px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--color-border-light);
        z-index: 0;
    }

    .status-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        position: relative;
        z-index: 1;
    }

    .step-dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--color-border-light);
        border: 3px solid var(--color-white);
        margin-bottom: 8px;
        transition: background 0.3s;
    }

    .step-label {
        font-size: 0.85em;
        text-align: center;
        color: var(--color-text-light);
        font-weight: 500;
        transition: color 0.3s;
    }

    /* Active Step Styling */
    .status-step.active .step-dot {
        background: var(--color-primary-accent); /* Green for completed/current steps */
        border-color: var(--color-primary-accent);
    }
    
    .status-step.active .step-label {
        color: var(--color-text-dark);
        font-weight: 700;
    }

    /* Override the current step's line color (using ::after on the active step's dot) */
    .status-step.current .step-dot {
        background: var(--color-secondary-accent); /* Red to highlight the CURRENT step */
        border-color: var(--color-secondary-accent);
        transform: scale(1.2); /* Slightly larger for visual emphasis */
    }

    /* Responsive adjustments */
    @media (max-width: 600px) {
        .brief-header {
            flex-direction: column;
            gap: 15px;
        }
        .brief-meta {
            flex-direction: column;
            gap: 10px;
        }
        .status-tracker {
            flex-wrap: wrap;
        }
        .status-step {
            width: 50%; /* Force two columns on small screens */
            margin-bottom: 15px;
        }
    }
</style>