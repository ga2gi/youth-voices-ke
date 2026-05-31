<script>
    import EducationItem from '$lib/components/EducationItem.svelte';
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    $: categorizedContent = data?.categorizedContent || {};
    $: totalLessons = data?.totalLessons || 0;
    $: categories = Object.keys(categorizedContent);

    let completedCount = 0;

    function calculateProgress() {
        if (typeof localStorage === 'undefined') return;
        const keys = Object.keys(localStorage);
        completedCount = keys.filter(key => 
            key.startsWith('lesson_completed_') && 
            localStorage.getItem(key) === 'true'
        ).length;
    }

    onMount(() => {
        calculateProgress();
    });

    $: progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
</script>

<svelte:head>
    <title>Civic Education Hub — Policy Bridge KE</title>
    <meta name="description" content="Learn about governance, devolution, your rights, and how to participate in Kenya's policy-making process." />
</svelte:head>

<div class="education-page-container">
    <header class="hub-header" in:fade>
        <div class="header-content">
            <span class="academy-tag">Policy Bridge Academy</span>
            <h2>Civic Education Hub</h2>
            <p class="subtitle">
                Master the mechanics of governance, devolution, and policy-making. 
                Learn your rights, access essential services, and build practical skills for civic engagement.
            </p>
        </div>
        
        <div class="progress-card">
            <div class="progress-info">
                <span class="percentage">{progressPercent}%</span>
                <p class="progress-label">Mastery</p>
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: {progressPercent}%"></div>
            </div>
            <p class="stats">{completedCount} of {totalLessons} Resources Completed</p>
        </div>
    </header>

    {#if categories.length > 0}
        <div class="learning-path">
            {#each categories as category, i}
                <section class="category-section" in:fly={{ y: 30, delay: i * 150 }}>
                    <div class="category-header">
                        <div class="level-badge">
                            <span class="label">LEVEL</span>
                            <span class="number">0{i + 1}</span>
                        </div>
                        <div class="header-text">
                            <h3 class="category-heading">{category}</h3>
                            <div class="divider"></div>
                        </div>
                    </div>
                    
                    <div class="grid-layout">
                        {#each categorizedContent[category] as item (item.id)}
                            <EducationItem 
                                {item} 
                                on:completed={calculateProgress} 
                            />
                        {/each}
                    </div>
                </section>
            {/each}
        </div>
    {:else}
        <div class="empty-state">
            <div class="empty-icon">📖</div>
            <h3>Curating Curriculum</h3>
            <p>Our policy team is finalizing these modules. Check back shortly for structured learning paths on governance, rights, and civic engagement.</p>
        </div>
    {/if}

    <footer class="education-footer">
        <p><strong>Disclaimer:</strong> This educational content is for informational purposes and does not constitute legal advice. 
        For specific legal matters, contact a qualified advocate or the organizations listed in our service directories.</p>
        <p>Content last updated: 2025. Contact numbers verified where possible. Please report any outdated information.</p>
    </footer>
</div>

<style>
    .education-page-container { 
        padding: 80px 24px; 
        max-width: 1240px; 
        margin: 0 auto; 
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #0f172a;
    }
    
    .hub-header { 
        display: flex; 
        justify-content: space-between; 
        align-items: flex-end; 
        gap: 40px; 
        margin-bottom: 80px; 
        border-left: 6px solid #064e3b; 
        padding-left: 40px; 
        flex-wrap: wrap;
    }

    .academy-tag { 
        background: #064e3b; 
        color: white; 
        padding: 6px 12px; 
        font-size: 0.7rem; 
        font-weight: 700; 
        text-transform: uppercase; 
        letter-spacing: 0.05em;
    }

    h2 { 
        font-size: 3.5rem; 
        color: #064e3b; 
        margin: 20px 0 10px; 
        font-weight: 800; 
        letter-spacing: -0.05em; 
    }

    .subtitle { 
        color: #475569; 
        font-size: 1.1rem; 
        max-width: 600px; 
        line-height: 1.6;
    }

    .progress-card { 
        background: white; 
        padding: 30px; 
        border: 3px solid #0f172a; 
        width: 320px; 
        box-shadow: 10px 10px 0 #064e3b; 
        flex-shrink: 0;
    }

    .percentage { 
        font-size: 2.5rem; 
        font-weight: 800; 
        color: #064e3b; 
    }

    .progress-label { 
        font-size: 0.75rem; 
        font-weight: 700; 
        text-transform: uppercase; 
        color: #64748b; 
        margin: 0 0 4px 0;
    }

    .progress-bar-bg { 
        background: #f1f5f9; 
        height: 10px; 
        margin: 15px 0; 
        border: 1px solid #0f172a; 
        border-radius: 99px;
        overflow: hidden;
    }

    .progress-bar-fill { 
        background: #064e3b; 
        height: 100%; 
        transition: width 0.5s ease; 
        border-radius: 99px;
    }

    .stats { 
        font-size: 0.8rem; 
        color: #64748b; 
        font-weight: 600; 
        margin: 0;
    }

    .category-section { 
        margin-bottom: 80px; 
    }

    .category-header { 
        display: flex; 
        align-items: center; 
        gap: 20px; 
        margin-bottom: 40px; 
    }

    .level-badge { 
        background: #0f172a; 
        color: white; 
        padding: 10px; 
        text-align: center; 
        min-width: 60px; 
    }

    .level-badge .label { 
        font-size: 0.6rem; 
        font-weight: 700; 
        display: block; 
        text-transform: uppercase; 
        letter-spacing: 0.05em;
    }

    .level-badge .number { 
        font-size: 1.5rem; 
        font-weight: 800; 
        display: block; 
        line-height: 1;
    }

    .category-heading { 
        font-size: 1.8rem; 
        font-weight: 800; 
        text-transform: uppercase; 
        margin: 0; 
        letter-spacing: -0.02em;
    }

    .divider { 
        height: 4px; 
        width: 50px; 
        background: #064e3b; 
        margin-top: 8px; 
    }

    .grid-layout { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
        gap: 30px; 
    }

    /* Empty State */
    .empty-state {
        text-align: center;
        padding: 80px 24px;
        color: #64748b;
    }
    .empty-icon { font-size: 3rem; margin-bottom: 16px; }
    .empty-state h3 { font-size: 1.5rem; color: #0f172a; margin: 0 0 8px; }
    .empty-state p { font-size: 1rem; max-width: 500px; margin: 0 auto; line-height: 1.6; }

    /* Footer */
    .education-footer {
        margin-top: 80px;
        padding: 24px;
        background: #f8fafc;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        font-size: 0.82rem;
        color: #64748b;
        line-height: 1.6;
        text-align: center;
    }
    .education-footer p { margin: 0 0 8px; }
    .education-footer p:last-child { margin-bottom: 0; }

    @media (max-width: 768px) {
        .education-page-container { padding: 40px 16px; }
        h2 { font-size: 2.2rem; }
        .hub-header { 
            flex-direction: column; 
            align-items: flex-start; 
            padding-left: 24px; 
            gap: 24px;
        }
        .progress-card { width: 100%; }
        .category-heading { font-size: 1.3rem; }
        .grid-layout { grid-template-columns: 1fr; }
    }
</style>