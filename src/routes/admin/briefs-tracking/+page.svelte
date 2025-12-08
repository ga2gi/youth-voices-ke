<script>
    import { enhance } from '$app/forms';

    /** @type {import('./$types').PageData} */
    export let data;
    
    // Action data (for success/error messages)
    /** @type {import('./$types').ActionData} */
    export let form;

    const { policyBriefs, statusOptions } = data;

    // Define state for the new brief form
    let newBrief = {
        title: '',
        description: '',
        delivery_date: new Date().toISOString().substring(0, 10), // Default to today
    };

    // Helper for formatting date
    const formatDate = (isoDate) => {
        if (!isoDate) return 'N/A';
        return new Date(isoDate).toLocaleDateString('en-KE', { 
            year: 'numeric', month: 'short', day: 'numeric' 
        });
    };
</script>

<div class="admin-content">
    <h2>🎯 Policy Briefs Tracking Management ({policyBriefs.length})</h2>
    <p class="subtitle">Record new briefs and update the status and acknowledgment details for each delivered brief.</p>

    <section class="creation-form-section">
        <h3>+ Record New Policy Brief</h3>
        
        {#if form?.createError}
            <div class="error-message">❌ Creation Failed: {form.createError}</div>
        {:else if form?.createSuccess}
            <div class="success-message">✅ New Policy Brief recorded successfully!</div>
        {/if}

        <form method="POST" action="?/create" use:enhance class="brief-creation-form">
            <div class="form-grid">
                <label for="new-title">Title</label>
                <input type="text" id="new-title" name="title" bind:value={newBrief.title} required>
                
                <label for="new-date">Delivery Date</label>
                <input type="date" id="new-date" name="delivery_date" bind:value={newBrief.delivery_date} required>
                
                <label for="new-description" class="full-width">Description (Short Summary)</label>
                <textarea id="new-description" name="description" rows="3" bind:value={newBrief.description} required class="full-width"></textarea>
            </div>
            
            <button type="submit" class="button-primary submit-btn">Record Brief</button>
        </form>
    </section>

    <hr>

    {#if policyBriefs.length === 0}
        <div class="empty-state">
            <p>No policy briefs have been recorded yet. Please use the form above to add the first brief.</p>
        </div>
    {:else}
        <div class="briefs-grid">
            {#each policyBriefs as brief (brief.id)}
                <div class="brief-card">
                    <div class="brief-info">
                        <h3>{brief.title}</h3>
                        <p class="date">Delivered: {formatDate(brief.delivery_date)}</p>
                        <p class="description">{brief.description}</p>
                        <p class="acknowledged-by">
                            Acknowledged By: <strong>{brief.stakeholder_acknowledged || 'Awaiting'}</strong>
                        </p>
                    </div>

                    <div class="status-update-form">
                        <form method="POST" action="?/update_status" use:enhance>
                            <input type="hidden" name="id" value={brief.id} />

                            <label for="status-{brief.id}">Current Status: 
                                <span class="current-status">{brief.status}</span>
                            </label>
                            <select id="status-{brief.id}" name="status" required>
                                {#each statusOptions as status}
                                    <option value={status} selected={brief.status === status}>
                                        {status}
                                    </option>
                                {/each}
                            </select>

                            <label for="stakeholder-{brief.id}" class="mt-15">Acknowledging Stakeholder</label>
                            <input 
                                type="text" 
                                id="stakeholder-{brief.id}" 
                                name="stakeholder"
                                placeholder="e.g., Ministry of Youth Affairs"
                                value={brief.stakeholder_acknowledged || ''}
                            />
                            
                            <button 
                                type="submit" 
                                class="button-primary update-btn"
                                class:success={form?.success && form.updatedId === brief.id}
                            >
                                {form?.success && form.updatedId === brief.id ? 'Updated! ✅' : 'Update Status'}
                            </button>
                            
                            {#if form?.error && form.id === brief.id}
                                <p class="error-message">Error: {form.error}</p>
                            {/if}
                        </form>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    /* NOTE: Added styling for the creation form and grid layout */
    
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
        border-left: 5px solid var(--color-primary-accent);
    }
    
    .creation-form-section h3 {
        color: var(--color-text-dark);
        margin-bottom: 20px;
        font-size: 1.5em;
    }

    .brief-creation-form label {
        font-weight: 600;
        grid-column: span 1;
        margin-bottom: 5px;
    }

    .brief-creation-form input, .brief-creation-form textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--color-border-light);
        border-radius: 4px;
        box-sizing: border-box;
    }
    
    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        align-items: center;
    }

    .full-width {
        grid-column: 1 / -1;
    }
    
    .submit-btn {
        margin-top: 20px;
        width: 100%;
    }

    /* --- Existing Briefs Grid Styles --- */
    .briefs-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 30px;
        margin-top: 20px;
    }

    .brief-card {
        background-color: var(--color-white);
        border: 1px solid var(--color-border-light);
        border-left: 5px solid var(--color-secondary-accent); /* Red accent strip */
        border-radius: 8px;
        padding: 25px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .brief-info h3 {
        font-size: 1.5em;
        margin-bottom: 5px;
        color: var(--color-text-dark);
    }
    
    .brief-info .date {
        font-size: 0.9em;
        color: var(--color-text-light);
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px dashed var(--color-border-light);
    }

    .description {
        margin-bottom: 15px;
    }

    .acknowledged-by {
        font-size: 0.95em;
        color: var(--color-primary-accent);
        margin-bottom: 20px;
    }
    
    .current-status {
        font-weight: 700;
        color: var(--color-primary-accent);
        background-color: rgba(0, 122, 51, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
        margin-left: 5px;
    }

    /* --- Status Form Styles --- */
    .status-update-form label {
        display: block;
        font-weight: 600;
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 0.9em;
    }
    
    .status-update-form .mt-15 {
        margin-top: 15px;
    }

    .status-update-form select, .status-update-form input[type="text"] {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--color-border-light);
        border-radius: 4px;
        margin-bottom: 10px;
    }
    
    .update-btn {
        width: 100%;
        margin-top: 15px;
        font-size: 0.95em;
    }
    
    .update-btn.success {
        background-color: var(--color-secondary-accent);
    }

    .error-message {
        color: var(--color-secondary-accent);
        font-size: 0.85em;
        margin-top: 5px;
    }
    
    .empty-state {
        text-align: center;
        padding: 60px;
        color: var(--color-text-light);
        font-style: italic;
    }
    
    @media (max-width: 768px) {
        .briefs-grid {
            grid-template-columns: 1fr;
        }
        .form-grid {
            grid-template-columns: 1fr;
        }
    }
</style>