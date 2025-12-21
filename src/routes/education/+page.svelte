<script>
    import EducationItem from '$lib/components/EducationItem.svelte';
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    const categories = Object.keys(data.categorizedContent);
    
    let completedCount = 0;

    // We listen for a custom event from the child component to update the global counter
    function handleLessonCompleted() {
        calculateProgress();
    }

    function calculateProgress() {
        if (typeof localStorage === 'undefined') return;
        const keys = Object.keys(localStorage);
        completedCount = keys.filter(key => key.startsWith('lesson_completed_') && localStorage.getItem(key) === 'true').length;
    }

    onMount(() => {
        calculateProgress();
    });

    $: progressPercent = Math.round((completedCount / data.totalLessons) * 100) || 0;
</script>

<div class="education-page-container">
    <header class="hub-header" in:fade>
        <span class="academy-tag">Academy 2026</span>
        <h2>📚 Civic Education Hub</h2>
        <p class="subtitle">Master the mechanics of governance and policy-making in Kenya.</p>
        
        <div class="progress-container">
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: {progressPercent}%"></div>
            </div>
            <p class="progress-text">Your Progress: <strong>{progressPercent}% Complete</strong> ({completedCount}/{data.totalLessons} lessons)</p>
        </div>
    </header>

    {#if categories.length > 0}
        <div class="learning-path">
            {#each categories as category, i}
                <section class="category-section" in:fly={{ y: 20, delay: i * 100 }}>
                    <div class="category-header">
                        <span class="level-indicator">Level {i + 1}</span>
                        <h3 class="category-heading">{category}</h3>
                    </div>
                    
                    <div class="grid-layout">
                        {#each data.categorizedContent[category] as item (item.id)}
                            <EducationItem {item} on:completed={handleLessonCompleted} />
                        {/each}
                    </div>
                </section>
            {/each}
        </div>
    {:else}
        <div class="empty-state">
            <div class="empty-icon">🌱</div>
            <h3>Knowledge Seeds Planted!</h3>
            <p>Our team is curating quality educational resources. Check back shortly!</p>
        </div>
    {/if}
</div>

<style>
    .education-page-container { padding: 40px 20px; max-width: 1100px; margin: 0 auto; }
    
    .hub-header { text-align: center; margin-bottom: 60px; }
    
    .academy-tag { background: #007a33; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8em; font-weight: bold; }

    h2 { font-size: 2.5em; color: #1a1a1a; margin: 15px 0 5px; }
    
    .subtitle { color: #666; font-size: 1.1em; margin-bottom: 30px; }

    /* Progress Bar Styles */
    .progress-container { max-width: 400px; margin: 0 auto; }
    .progress-bar-bg { background: #e6f2eb; height: 10px; border-radius: 10px; overflow: hidden; margin-bottom: 10px; }
    .progress-bar-fill { background: #007a33; height: 100%; transition: width 0.5s ease-out; }
    .progress-text { font-size: 0.9em; color: #444; }

    .category-section { margin-bottom: 50px; }
    
    .category-header { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
    
    .level-indicator { color: #007a33; background: #e6f2eb; padding: 4px 12px; border-radius: 6px; font-weight: bold; font-family: monospace; }

    .category-heading { font-size: 1.8em; color: #1a1a1a; font-weight: 700; }

    .grid-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 25px; }

    .empty-state { text-align: center; padding: 80px; background: white; border-radius: 20px; border: 2px dashed #e6f0e9; }
    .empty-icon { font-size: 3em; }
</style>