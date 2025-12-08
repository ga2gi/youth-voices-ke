<script>
    import { enhance } from '$app/forms';

    /** @type {import('./$types').PageData} */
    export let data;
    
    /** @type {import('./$types').ActionData} */
    export let form;

    const { challenges } = data;

    // Helper to format date
    const formatDate = (isoDate) => {
        if (!isoDate) return 'N/A';
        return new Date(isoDate).toLocaleDateString('en-KE', { 
            year: 'numeric', month: 'short', day: 'numeric' 
        });
    };

    // State for the creation form inputs
    let newChallenge = {
        title: '',
        category: 'Governance',
        overview_text: '',
        pdf_url: '',
        is_featured: false,
    };
</script>

<div class="admin-content">
    <h2>📝 Manage Policy Challenges ({challenges.length})</h2>
    <p class="subtitle">Create new challenges and control which are highlighted on the public homepage.</p>

    <section class="creation-form-section">
        <h3>+ Create New Challenge</h3>
        
        {#if form?.createError}
            <div class="error-message">❌ Creation Failed: {form.createError}</div>
        {:else if form?.createSuccess}
            <div class="success-message">✅ New Challenge created successfully!</div>
        {/if}

        <form method="POST" action="?/create" use:enhance class="challenge-form">
            <div class="form-grid">
                <label for="title">Title *</label>
                <input type="text" id="title" name="title" bind:value={newChallenge.title} required>
                
                <label for="category">Category</label>
                <select id="category" name="category" bind:value={newChallenge.category}>
                    <option value="Governance">Governance</option>
                    <option value="Health">Health</option>
                    <option value="Environment">Environment</option>
                    <option value="Technology">Technology</option>
                    <option value="General">General</option>
                </select>

                <label for="pdf_url" class="full-width">PDF Brief URL *</label>
                <input type="url" id="pdf_url" name="pdf_url" bind:value={newChallenge.pdf_url} placeholder="https://example.com/brief.pdf" required class="full-width">
                
                <label for="overview_text" class="full-width">Short Overview Text *</label>
                <textarea id="overview_text" name="overview_text" rows="3" bind:value={newChallenge.overview_text} required class="full-width"></textarea>

                <div class="checkbox-group full-width">
                    <input type="checkbox" id="is_featured" name="is_featured" bind:checked={newChallenge.is_featured}>
                    <label for="is_featured">Feature on Homepage?</label>
                </div>
            </div>
            
            <button type="submit" class="button-primary submit-btn">Publish Challenge</button>
        </form>
    </section>

    <section class="management-table-section">
        <h3>Existing Challenges</h3>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Created</th>
                        <th class="text-center">Featured?</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each challenges as challenge (challenge.id)}
                        <tr>
                            <td>
                                <a href={challenge.pdf_url} target="_blank" rel="noopener noreferrer" class="challenge-link">
                                    {challenge.title}
                                </a>
                            </td>
                            <td>{challenge.category}</td>
                            <td>{formatDate(challenge.created_at)}</td>
                            
                            <td class="text-center">
                                <form method="POST" action="?/toggle_featured" use:enhance class="inline-form">
                                    <input type="hidden" name="id" value={challenge.id} />
                                    <input type="hidden" name="current_status" value={challenge.month_highlighted} />
                                    <button 
                                        type="submit" 
                                        class:status-active={challenge.month_highlighted} 
                                        class:status-inactive={!challenge.month_highlighted}
                                        class:success={form?.toggleSuccess && form.updatedId === challenge.id}
                                    >
                                        {#if form?.toggleSuccess && form.updatedId === challenge.id}
                                            Saving...
                                        {:else}
                                            {challenge.month_highlighted ? '🔥 Active' : 'Off'}
                                        {/if}
                                    </button>
                                </form>
                            </td>

                            <td class="text-center actions-column">
                                <form method="POST" action="?/delete" use:enhance class="inline-form" on:submit={() => confirm('Are you sure you want to DELETE this challenge? This cannot be undone.')}>
                                    <input type="hidden" name="id" value={challenge.id} />
                                    <button type="submit" class="button-delete">Delete</button>
                                </form>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    {#if form?.toggleError || form?.deleteError}
        <div class="error-message fixed-bottom">
            ❌ Action Failed: {form.toggleError || form.deleteError}
        </div>
    {/if}
</div>

<style>
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

    .challenge-form {
        display: block;
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

    .checkbox-group {
        display: flex;
        align-items: center;
        margin-top: 10px;
        grid-column: 1 / -1;
    }
    
    .checkbox-group input[type="checkbox"] {
        margin-right: 10px;
        width: auto;
    }

    .submit-btn {
        margin-top: 25px;
        width: 100%;
    }

    /* --- Management Table Styles --- */
    .management-table-section h3 {
        color: var(--color-text-dark);
        font-size: 1.5em;
        margin-bottom: 20px;
    }

    .table-container {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        background-color: var(--color-white);
    }
    
    th, td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #eee;
        font-size: 0.9em;
    }
    
    th {
        background-color: #f5f5f5;
        font-weight: 600;
    }

    .challenge-link {
        font-weight: 600;
        color: var(--color-primary-accent);
        text-decoration: none;
    }

    .challenge-link:hover {
        text-decoration: underline;
    }

    /* Action Buttons */
    .text-center {
        text-align: center;
    }

    .inline-form {
        display: inline-block;
    }
    
    .status-active, .status-inactive {
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .status-active {
        background-color: var(--color-primary-accent);
        color: white;
    }

    .status-inactive {
        background-color: #e0e0e0;
        color: var(--color-text-dark);
    }

    .button-delete {
        background-color: var(--color-secondary-accent);
        color: white;
        border: none;
        padding: 6px 12px;
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
</style>