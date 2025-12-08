<script>
    import { enhance } from '$app/forms';

    /** @type {import('./$types').PageData} */
    export let data;
    
    /** @type {import('./$types').ActionData} */
    export let form;

    const { content } = data;

    // State for the creation form inputs
    let newContent = {
        topic: '',
        category: 'Governance',
        content_text: '',
        media_url: '',
    };
    
    // Categorize content for display based on the data structure
    $: categorizedContent = content.reduce((acc, item) => {
        const category = item.category || 'General';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});

    $: categories = Object.keys(categorizedContent);
</script>

<div class="admin-content">
    <h2>📚 Manage Civic Education Content ({content.length})</h2>
    <p class="subtitle">Create, edit, or delete educational resources provided to youth on the public site.</p>

    <section class="creation-form-section">
        <h3>+ Create New Education Item</h3>
        
        {#if form?.createError}
            <div class="error-message">❌ Creation Failed: {form.createError}</div>
        {:else if form?.createSuccess}
            <div class="success-message">✅ New Education Item created successfully!</div>
        {/if}

        <form method="POST" action="?/create" use:enhance class="education-form">
            <div class="form-grid">
                <label for="topic">Topic *</label>
                <input type="text" id="topic" name="topic" bind:value={newContent.topic} required>
                
                <label for="category">Category</label>
                <select id="category" name="category" bind:value={newContent.category}>
                    <option value="Governance">Governance</option>
                    <option value="Rights">Rights & Freedoms</option>
                    <option value="Policy Process">Policy Process</option>
                    <option value="General">General</option>
                </select>

                <label for="media_url" class="full-width">Media URL (YouTube/PDF Link)</label>
                <input type="url" id="media_url" name="media_url" bind:value={newContent.media_url} placeholder="https://youtube.com/watch?v=..." class="full-width">
                
                <label for="content_text" class="full-width">Full Content Text *</label>
                <textarea id="content_text" name="content_text" rows="5" bind:value={newContent.content_text} required class="full-width"></textarea>
            </div>
            
            <button type="submit" class="button-primary submit-btn">Publish Content</button>
        </form>
    </section>

    <section class="management-list-section">
        <h3>Existing Content</h3>
        
        {#if categories.length === 0}
            <div class="empty-state">No civic education content published yet.</div>
        {:else}
            {#each categories as category}
                <div class="category-block">
                    <h4>{category}</h4>
                    {#each categorizedContent[category] as item (item.id)}
                        <div class="content-item-card">
                            <div class="item-details">
                                <h5>{item.topic}</h5>
                                <p class="media-link">Media URL: <a href={item.media_url || '#'} target="_blank" rel="noopener noreferrer">{item.media_url || 'None'}</a></p>
                                <p class="content-preview">{item.content_text.substring(0, 150)}{item.content_text.length > 150 ? '...' : ''}</p>
                            </div>

                            <div class="actions">
                                <form method="POST" action="?/delete" use:enhance on:submit={() => confirm('Are you sure you want to DELETE this content item?')}>
                                    <input type="hidden" name="id" value={item.id} />
                                    <button type="submit" class="button-delete">Delete</button>
                                </form>
                            </div>
                        </div>
                    {/each}
                </div>
            {/each}
        {/if}
    </section>
    
    {#if form?.deleteError}
        <div class="error-message fixed-bottom">
            ❌ Deletion Failed: {form.deleteError}
        </div>
    {/if}
</div>

<style>
    /* Styling is intentionally verbose here to provide a complete, standalone solution */
    .admin-content {
        padding: 20px 0;
    }
    
    .subtitle {
        color: var(--color-text-light);
        margin-bottom: 30px;
    }

    /* --- Creation Form Styles --- */
    .creation-form-section {
        background-color: var(--color-white);
        padding: 25px;
        border-radius: 8px;
        border: 1px solid var(--color-border-light);
        margin-bottom: 40px;
    }

    .creation-form-section h3 {
        color: var(--color-primary-accent);
        margin-bottom: 20px;
        font-size: 1.5em;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        align-items: center;
    }
    
    .form-grid label {
        font-weight: 600;
        grid-column: span 1;
    }

    .form-grid input:not([type="checkbox"]), .form-grid select, .form-grid textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--color-border-light);
        border-radius: 4px;
        box-sizing: border-box;
    }
    
    .full-width {
        grid-column: 1 / -1;
    }
    
    .submit-btn {
        margin-top: 25px;
        width: 100%;
    }
    
    /* --- Management List Styles --- */
    .management-list-section h3 {
        color: var(--color-text-dark);
        font-size: 1.5em;
        margin-bottom: 20px;
    }
    
    .category-block {
        margin-bottom: 30px;
    }
    
    .category-block h4 {
        color: var(--color-secondary-accent);
        font-size: 1.3em;
        margin-bottom: 15px;
        border-bottom: 2px solid rgba(176, 30, 38, 0.2);
        padding-bottom: 5px;
    }

    .content-item-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--color-white);
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 15px 20px;
        margin-bottom: 15px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    
    .item-details {
        flex-grow: 1;
        margin-right: 20px;
    }

    .item-details h5 {
        font-size: 1.2em;
        color: var(--color-text-dark);
        margin-bottom: 5px;
    }
    
    .media-link {
        font-size: 0.85em;
        color: var(--color-text-light);
        margin-bottom: 8px;
    }
    
    .content-preview {
        font-size: 0.9em;
        color: var(--color-text-dark);
    }
    
    .actions {
        flex-shrink: 0;
    }

    .button-delete {
        background-color: var(--color-secondary-accent);
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .button-delete:hover {
        background-color: #a01018;
    }

    .success-message, .error-message {
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 4px;
        font-weight: 600;
        border: 1px solid;
    }

    .success-message {
        background-color: rgba(0, 122, 51, 0.1);
        color: var(--color-primary-accent);
        border-color: var(--color-primary-accent);
    }

    .error-message {
        background-color: rgba(176, 30, 38, 0.1);
        color: var(--color-secondary-accent);
        border-color: var(--color-secondary-accent);
    }
    
    .error-message.fixed-bottom {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    .empty-state {
        color: var(--color-text-light);
        font-style: italic;
        padding: 20px;
        text-align: center;
    }

    /* Responsive adjustments */
    @media (max-width: 600px) {
        .form-grid {
            grid-template-columns: 1fr;
        }
        .content-item-card {
            flex-direction: column;
            align-items: flex-start;
        }
        .actions {
            margin-top: 15px;
            align-self: flex-end;
        }
    }
</style>