<script>
    import EducationItem from '$lib/components/EducationItem.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    // The data is an object where keys are categories (e.g., {'Governance': [...], 'Rights': [...]})
    const categories = Object.keys(data.categorizedContent);
</script>

<div class="education-page-container">
    <h2>📚 Civic Education Hub</h2>
    <p class="subtitle">Empower yourself with knowledge on governance, rights, and the policy-making process in Kenya.</p>

    {#if categories.length > 0}
        {#each categories as category}
            <section class="category-section">
                <h3 class="category-heading">{category}</h3>
                
                <div class="content-list">
                    {#each data.categorizedContent[category] as item (item.id)}
                        <EducationItem {item} />
                    {/each}
                </div>
            </section>
        {/each}
    {:else}
        <div class="empty-state">
            <h3>Content Coming Soon!</h3>
            <p>Our team is curating quality educational resources. Please check back shortly for updates on governance and civic rights.</p>
        </div>
    {/if}
</div>

<style>
    .education-page-container {
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

    .category-section {
        margin-bottom: 40px;
    }

    .category-heading {
        font-size: 1.8em;
        color: var(--color-text-dark);
        margin-bottom: 25px;
        padding-left: 10px;
        border-left: 4px solid var(--color-secondary-accent); /* Red accent for section headers */
        font-weight: 600;
    }

    .empty-state {
        text-align: center;
        padding: 60px;
        background-color: var(--color-white);
        border: 1px dashed var(--color-border-light);
        border-radius: 8px;
        margin: 40px auto;
        max-width: 700px;
    }
    
    .empty-state h3 {
        color: var(--color-secondary-accent);
        margin-bottom: 10px;
    }
</style>