<script>
    /** @type {import('./$types').PageData} */
    export let data;
    
    // Grouped opportunities from the server load function
    const { groupedOpportunities } = data;

    // Define the structure and display order for the main sections.
    // The key in 'groupedOpportunities' must match the item.category value in your database.
    const sections = [
        { 
            id: 'engage', 
            title: '🤝 Engage with Youth Voices KE & Partners (Non-Monetary)', 
            description: 'Opportunities for hands-on involvement, skill-sharing, and community impact.'
        },
        { 
            id: 'develop', 
            title: '🎓 Youth Programs & Fellowships (Development)', 
            description: 'Structured programs, training, and small grants for professional and leadership growth.' 
        },
        { 
            id: 'financial', 
            title: '💰 Scholarships & Academic Aid (Financial)', 
            description: 'Financial support and academic opportunities for continuing your education.' 
        },
    ];

    /**
     * Helper function to determine which opportunities belong to which main section.
     * @param {string} category The category name from the database (e.g., 'Scholarship')
     * @returns {string} The ID of the main section ('engage', 'develop', or 'financial')
     */
    function getMainSectionId(category) {
        if (['Volunteer', 'Community Work', 'CSR Initiatives'].includes(category)) {
            return 'engage';
        }
        if (['Leadership Programs', 'Grants & Fellowships', 'Mentorship'].includes(category)) {
            return 'develop';
        }
        if (['Scholarship', 'Academic Aid'].includes(category)) {
            return 'financial';
        }
        return 'other'; // Fallback
    }

    /**
     * Function to format the deadline date.
     * @param {string | null} dateString 
     * @returns {string}
     */
    function formatDeadline(dateString) {
        if (!dateString) return 'Ongoing';
        
        const date = new Date(dateString);
        if (isNaN(date)) return 'Check Link';

        return date.toLocaleDateString('en-KE', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
</script>

<div class="opportunities-page-wrapper container">
    <header class="page-header">
        <h1>Youth Opportunities Hub</h1>
        <p class="tagline">
            Your centralized resource for scholarships, volunteer work, youth programs, and community engagement in Kenya.
        </p>
    </header>

    {#each sections as section}
        <section id={section.id} class="opportunity-section">
            <h2 class="section-title">{section.title}</h2>
            <p class="section-description">{section.description}</p>
            
            <div class="category-grid">
                {#each Object.entries(groupedOpportunities) as [categoryName, opportunitiesList]}
                    {#if getMainSectionId(categoryName) === section.id}
                        <div class="opportunity-category">
                            <h3 class="category-header">{categoryName}</h3>
                            
                            {#if opportunitiesList.length > 0}
                                <ul class="opportunity-list">
                                    {#each opportunitiesList as opportunity}
                                        <li class="opportunity-item">
                                            <h4>{opportunity.title}</h4>
                                            <p>{opportunity.description}</p>
                                            
                                            <div class="item-footer">
                                                <span class="deadline-tag">
                                                    Deadline: <strong>{formatDeadline(opportunity.application_deadline)}</strong>
                                                </span>
                                                <a 
                                                    href={opportunity.link_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    class="button-small button-primary"
                                                >
                                                    View & Apply →
                                                </a>
                                            </div>
                                        </li>
                                    {/each}
                                </ul>
                            {:else}
                                <p class="no-opportunities">No active opportunities in this category right now. Check back soon!</p>
                            {/if}
                        </div>
                    {/if}
                {/each}
            </div>
            
            {#if Object.keys(groupedOpportunities).length === 0 && section.id === 'engage'}
                <div class="no-data-alert">
                    <p>We are currently updating our opportunities list. Please ensure your internet connection is stable, or check back shortly.</p>
                </div>
            {/if}
        </section>
        <hr>
    {/each}
</div>

<style>
    /* --- General Layout --- */
    .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 20px;
    }
    
    .opportunities-page-wrapper {
        padding-top: 40px;
        padding-bottom: 80px;
    }
    
    hr {
        margin: 50px 0;
        border: 0;
        border-top: 1px dashed var(--color-border-light);
    }

    /* --- Page Header --- */
    .page-header {
        text-align: center;
        margin-bottom: 50px;
        padding-bottom: 20px;
        border-bottom: 3px solid var(--color-primary-accent);
    }
    
    .page-header h1 {
        font-size: 3em;
        margin-bottom: 10px;
        color: var(--color-text-dark);
    }
    
    .tagline {
        font-size: 1.2em;
        color: var(--color-text-light);
        max-width: 700px;
        margin: 0 auto;
    }

    /* --- Section Styling --- */
    .opportunity-section {
        margin-bottom: 40px;
    }

    .section-title {
        font-size: 2.2em;
        color: var(--color-secondary-accent);
        margin-bottom: 10px;
        text-align: center;
    }

    .section-description {
        text-align: center;
        color: var(--color-text-light);
        margin-bottom: 40px;
        font-size: 1.1em;
    }

    /* --- Category Grid --- */
    .category-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
    }

    .opportunity-category {
        background-color: var(--color-background-light);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        border-left: 5px solid var(--color-primary-accent);
    }

    .category-header {
        font-size: 1.5em;
        color: var(--color-text-dark);
        margin-top: 0;
        margin-bottom: 15px;
        padding-bottom: 5px;
        border-bottom: 1px solid var(--color-border-light);
    }

    /* --- Opportunity List --- */
    .opportunity-list {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .opportunity-item {
        background-color: var(--color-white);
        padding: 15px;
        border-radius: 6px;
        border: 1px solid var(--color-border-light);
    }

    .opportunity-item h4 {
        font-size: 1.2em;
        color: var(--color-text-dark);
        margin-top: 0;
        margin-bottom: 5px;
        font-weight: 700;
    }

    .opportunity-item p {
        font-size: 0.95em;
        color: var(--color-text-light);
        margin-bottom: 10px;
    }

    .item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px dashed var(--color-border-light);
    }
    
    .deadline-tag {
        font-size: 0.9em;
        color: var(--color-text-light);
    }
    
    .deadline-tag strong {
        color: var(--color-secondary-accent);
        font-weight: 600;
    }

    /* --- Utility & Fallback --- */
    .no-opportunities, .no-data-alert {
        padding: 15px;
        background-color: rgba(255, 193, 7, 0.1);
        color: #856404; /* Darker yellow/gold color */
        border: 1px solid #ffeeba;
        border-radius: 4px;
        text-align: center;
        font-weight: 500;
    }
    
    /* Responsive adjustment */
    @media (max-width: 768px) {
        .category-grid {
            grid-template-columns: 1fr;
        }
    }
</style>