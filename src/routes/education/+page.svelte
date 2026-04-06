<script>
    import EducationItem from '$lib/components/EducationItem.svelte';
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    const categories = Object.keys(data.categorizedContent);
    let completedCount = 0;

    function handleLessonCompleted() {
        calculateProgress();
    }

    function calculateProgress() {
        if (typeof localStorage === 'undefined') return;
        const keys = Object.keys(localStorage);
        // Counting keys that match your progress tracking pattern
        completedCount = keys.filter(key => 
            key.startsWith('lesson_completed_') && 
            localStorage.getItem(key) === 'true'
        ).length;
    }

    onMount(() => {
        calculateProgress();
    });

    $: progressPercent = Math.round((completedCount / data.totalLessons) * 100) || 0;
</script>

<div class="education-page-container">
    <header class="hub-header" in:fade>
        <div class="header-content">
            <span class="academy-tag">Academy 2026</span>
            <h2>📚 Civic Education Hub</h2>
            <p class="subtitle">Master the mechanics of governance, devolution, and policy-making in Kenya.</p>
        </div>
        
        <div class="progress-card">
            <div class="progress-info">
                <span class="percentage">{progressPercent}%</span>
                <p class="progress-label">Your Learning Journey</p>
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: {progressPercent}%">
                    <div class="progress-glow"></div>
                </div>
            </div>
            <p class="stats">{completedCount} of {data.totalLessons} modules mastered</p>
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
                        {#each data.categorizedContent[category] as item (item.id)}
                            <EducationItem 
                                {item} 
                                on:completed={handleLessonCompleted} 
                            />
                        {/each}
                    </div>
                </section>
            {/each}
        </div>
    {:else}
        <div class="empty-state">
            <div class="empty-icon">📖</div>
            <h3>Curating the Curriculum</h3>
            <p>Our Policy Lab team is currently finalizing modules on <strong>Devolved Units</strong> and <strong>Public Participation</strong>. Check back shortly to begin Level 1!</p>
            <button class="notify-btn">Notify Me of New Lessons</button>
        </div>
    {/if}
</div>

<style>
    .education-page-container { 
        padding: 60px 20px; 
        max-width: 1200px; 
        margin: 0 auto; 
        font-family: 'Source Sans 3', sans-serif;
    }
    
    .hub-header { 
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 40px;
        margin-bottom: 80px; 
        border-bottom: 1px solid #eee;
        padding-bottom: 40px;
    }

    .header-content { flex: 1; }
    
    .academy-tag { 
        background: #007a33; 
        color: white; 
        padding: 5px 15px; 
        border-radius: 4px; 
        font-size: 0.75em; 
        font-weight: 800; 
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    h2 { font-size: 3em; color: #1a1a1a; margin: 15px 0 10px; font-weight: 800; }
    .subtitle { color: #555; font-size: 1.25em; max-width: 500px; line-height: 1.5; }

    /* Progress Card Styling */
    .progress-card { 
        background: white;
        padding: 25px;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        width: 350px;
        border: 1px solid #f0f0f0;
    }

    .progress-info { display: flex; align-items: baseline; gap: 10px; margin-bottom: 15px; }
    .percentage { font-size: 2.2em; font-weight: 800; color: #007a33; }
    .progress-label { font-weight: 700; color: #1a1a1a; margin: 0; }

    .progress-bar-bg { background: #f0f7f3; height: 12px; border-radius: 10px; overflow: hidden; margin-bottom: 12px; }
    .progress-bar-fill { 
        background: linear-gradient(90deg, #007a33, #00a846); 
        height: 100%; 
        transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1); 
        position: relative;
    }

    .progress-glow {
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        animation: shine 2s infinite;
    }

    @keyframes shine {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }

    .stats { font-size: 0.85em; color: #777; font-weight: 600; margin: 0; }

    /* Category Section Styling */
    .category-section { margin-bottom: 80px; }
    
    .category-header { display: flex; align-items: center; gap: 20px; margin-bottom: 35px; }
    
    .level-badge { 
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #1a1a1a;
        color: white;
        padding: 10px;
        border-radius: 8px;
        min-width: 60px;
    }

    .level-badge .label { font-size: 0.6em; font-weight: 800; opacity: 0.7; }
    .level-badge .number { font-size: 1.4em; font-weight: 800; }

    .header-text { flex: 1; }
    .category-heading { font-size: 2em; color: #1a1a1a; font-weight: 800; margin: 0; }
    .divider { height: 4px; width: 40px; background: #007a33; margin-top: 8px; }

    .grid-layout { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); 
        gap: 30px; 
    }

    /* Empty State */
    .empty-state { 
        text-align: center; 
        padding: 100px 40px; 
        background: #fdfdfd; 
        border-radius: 24px; 
        border: 2px dashed #eee;
        max-width: 700px;
        margin: 40px auto;
    }
    .empty-icon { font-size: 4em; margin-bottom: 20px; }
    .empty-state h3 { font-size: 1.8em; margin-bottom: 10px; color: #1a1a1a; }
    .empty-state p { color: #666; margin-bottom: 30px; line-height: 1.6; }

    .notify-btn {
        background: #1a1a1a;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
    }

    @media (max-width: 900px) {
        .hub-header { flex-direction: column; align-items: flex-start; }
        .progress-card { width: 100%; }
        .grid-layout { grid-template-columns: 1fr; }
    }
</style>