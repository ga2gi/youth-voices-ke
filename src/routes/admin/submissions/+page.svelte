<script>
    import { exportToCsv } from '$lib/utils/csvExport';
    import { enhance } from '$app/forms'; // <-- 1. Import enhance

    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {import('./$types').ActionData} */
    export let form; // <-- 2. Expose action data for UI feedback

    const { submissions } = data;

    // Helper for formatting date
    const formatDate = (isoDate) => {
        if (!isoDate) return 'N/A';
        return new Date(isoDate).toLocaleDateString('en-KE', { 
            year: 'numeric', month: 'short', day: 'numeric' 
        });
    };

    // Helper to trigger the CSV export
    const handleExport = () => {
        if (submissions && submissions.length > 0) {
            exportToCsv(submissions, 'youth_voices_submissions.csv');
        } else {
            alert("No data to export.");
        }
    };
</script>

<div class="admin-content">
    <h2>📑 Submissions Review ({submissions.length})</h2>
    <p class="subtitle">Review and shortlist raw solution entries submitted by the public. Newest submissions are at the top.</p>

    <div class="header-actions">
        <button on:click={handleExport} class="button-secondary">
            Export All to CSV ⬇️
        </button>
    </div>

    {#if submissions.length === 0}
        <div class="empty-state">
            <p>No new submissions have been received yet.</p>
        </div>
    {:else}
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Challenge Title</th>
                        <th>Solution Preview</th>
                        <th>Contact</th>
                        <th>Date</th>
                        <th class="text-center">Action: Shortlist</th> </tr>
                </thead>
                <tbody>
                    {#each submissions as sub (sub.id)}
                        <tr>
                            <td>{sub.id.substring(0, 4)}...</td>
                            <td class="challenge-title">{sub.challenge_title}</td>
                            <td class="solution-preview">
                                {sub.solution_text.substring(0, 100)}{sub.solution_text.length > 100 ? '...' : ''}
                            </td>
                            <td>{sub.optional_contact || 'N/A'}</td>
                            <td>{formatDate(sub.created_at)}</td>
                            
                            <td class="text-center actions-column">
                                <form method="POST" action="?/toggle_shortlist" use:enhance class="inline-form">
                                    <input type="hidden" name="id" value={sub.id} />
                                    <input type="hidden" name="current_status" value={sub.is_shortlisted} />
                                    <button 
                                        type="submit" 
                                        class:status-active={sub.is_shortlisted} 
                                        class:status-inactive={!sub.is_shortlisted}
                                        class:is-saving={form?.updatedId === sub.id}
                                    >
                                        {#if form?.updatedId === sub.id}
                                            Saving...
                                        {:else}
                                            {sub.is_shortlisted ? '✅ Shortlisted' : '➡️ Shortlist'}
                                        {/if}
                                    </button>
                                </form>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
    
    {#if form?.error}
        <div class="error-message fixed-bottom">
            ❌ Action Failed: {form.error}
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

    .header-actions {
        margin-bottom: 20px;
        text-align: right;
    }
    
    /* --- Table Styles --- */
    .table-container {
        overflow-x: auto;
        background-color: var(--color-white);
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }
    
    th, td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid var(--color-border-light);
        font-size: 0.9em;
        vertical-align: top;
    }
    
    th {
        background-color: var(--color-background-light);
        font-weight: 600;
        color: var(--color-text-dark);
    }

    .challenge-title {
        font-weight: 600;
        color: var(--color-primary-accent);
    }
    
    .solution-preview {
        max-width: 300px;
        line-height: 1.4;
    }

    /* --- Action Button Styles --- */
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
        transition: all 0.2s;
        min-width: 120px; 
        font-size: 0.85em;
    }

    .status-active {
        background-color: var(--color-primary-accent); /* Green */
        color: white;
    }

    .status-inactive {
        background-color: var(--color-border-light);
        color: var(--color-text-dark);
    }

    .is-saving {
        opacity: 0.7;
        cursor: wait;
    }

    .status-active:hover {
        background-color: #005625; /* Darker green on hover */
    }

    .status-inactive:hover {
        background-color: #c0c0c0;
    }
    
    .empty-state {
        text-align: center;
        padding: 60px;
        color: var(--color-text-light);
        font-style: italic;
    }

    .error-message {
        padding: 15px;
        border-radius: 4px;
        font-weight: 600;
        border: 1px solid var(--color-secondary-accent);
        background-color: rgba(176, 30, 38, 0.1);
        color: var(--color-secondary-accent);
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
</style>