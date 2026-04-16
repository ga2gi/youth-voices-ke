<script>
    import EducationItem from '$lib/components/EducationItem.svelte';
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    // Fallbacks to ensure no blank page
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

<div class="education-page-container">
    <header class="hub-header" in:fade>
        <div class="header-content">
            <span class="academy-tag">Policy Bridge Academy</span>
            <h2>Civic Education Hub</h2>
            <p class="subtitle">Master the mechanics of governance, devolution, and policy-making through structured, data-driven modules.</p>
        </div>
        
        <div class="progress-card">
            <div class="progress-info">
                <span class="percentage">{progressPercent}%</span>
                <p class="progress-label">Mastery</p>
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: {progressPercent}%"></div>
            </div>
            <p class="stats">{completedCount} of {totalLessons} Modules Completed</p>
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
            <p>Our policy team is finalizing these modules. Check back shortly.</p>
        </div>
    {/if}
</div>

<style>
    .education-page-container { padding: 80px 24px; max-width: 1240px; margin: 0 auto; font-family: 'Inter', sans-serif; }
    
    .hub-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; margin-bottom: 80px; border-left: 6px solid #064e3b; padding-left: 40px; }

    .academy-tag { background: #064e3b; color: white; padding: 6px 12px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }

    h2 { font-size: 3.5rem; color: #064e3b; margin: 20px 0 10px; font-weight: 800; letter-spacing: -0.05em; }
    .subtitle { color: #475569; font-size: 1.1rem; max-width: 600px; }

    .progress-card { background: white; padding: 30px; border: 3px solid #0f172a; width: 320px; box-shadow: 10px 10px 0 #064e3b; }
    .percentage { font-size: 2.5rem; font-weight: 800; color: #064e3b; }
    .progress-bar-bg { background: #f1f5f9; height: 10px; margin: 15px 0; border: 1px solid #0f172a; }
    .progress-bar-fill { background: #064e3b; height: 100%; transition: width 0.5s ease; }

    .category-section { margin-bottom: 80px; }
    .category-header { display: flex; align-items: center; gap: 20px; margin-bottom: 40px; }
    .level-badge { background: #0f172a; color: white; padding: 10px; text-align: center; min-width: 60px; }
    .category-heading { font-size: 1.8rem; font-weight: 800; text-transform: uppercase; margin: 0; }
    .divider { height: 4px; width: 50px; background: #064e3b; margin-top: 8px; }

    .grid-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
</style>