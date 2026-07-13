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
    <title>Civic Education — PolicyBridge Kenya</title>
    <meta name="description" content="Learn about governance, devolution, your rights, and how to participate in Kenya's policy-making process." />
</svelte:head>

<div class="page">
    <!-- Header -->
    <section class="page-header" in:fade>
        <div class="header-main">
            <span class="label">PolicyBridge Academy</span>
            <h1>Civic Education</h1>
            <p>Understand governance, devolution, and policy-making in Kenya. Learn your rights and build practical skills for meaningful civic engagement.</p>
        </div>

        <div class="progress-widget">
            <div class="progress-ring">
                <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" stroke-width="8"/>
                    <circle 
                        cx="50" cy="50" r="42" 
                        fill="none" 
                        stroke="#064e3b" 
                        stroke-width="8"
                        stroke-linecap="round"
                        stroke-dasharray={`${progressPercent * 2.64} 264`}
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <span class="ring-text">{progressPercent}%</span>
            </div>
            <p class="progress-detail">{completedCount} of {totalLessons} completed</p>
        </div>
    </section>

    <!-- Content -->
    {#if categories.length > 0}
        <div class="content">
            {#each categories as category, i}
                <section class="category" in:fly={{ y: 20, delay: i * 100 }}>
                    <div class="category-header">
                        <span class="category-number">{i + 1}</span>
                        <h2>{category}</h2>
                    </div>
                    
                    <div class="grid">
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
        <div class="empty">
            <h3>Curriculum in Development</h3>
            <p>Our policy team is preparing these modules. Check back soon for structured learning paths on governance, rights, and civic engagement.</p>
        </div>
    {/if}

    <!-- Footer -->
    <footer class="footer">
        <p><strong>Disclaimer:</strong> This content is for informational purposes and does not constitute legal advice. For specific legal matters, consult a qualified advocate or the organizations listed in our directories.</p>
        <p>Last updated: 2025. Please report any outdated information.</p>
    </footer>
</div>

<style>
    .page {
        max-width: 1100px;
        margin: 0 auto;
        padding: 64px 24px 80px;
        font-family: system-ui, -apple-system, sans-serif;
        color: #1a1a1a;
    }

    /* Header */
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 40px;
        margin-bottom: 64px;
        flex-wrap: wrap;
    }

    .header-main {
        flex: 1;
        min-width: 300px;
    }

    .label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #064e3b;
        display: inline-block;
        margin-bottom: 12px;
        padding: 4px 10px;
        background: #f0fdf4;
        border-radius: 4px;
    }

    .header-main h1 {
        font-size: 2.5rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        margin: 0 0 12px 0;
    }

    .header-main p {
        font-size: 1rem;
        color: #555;
        line-height: 1.6;
        max-width: 560px;
        margin: 0;
    }

    /* Progress Widget */
    .progress-widget {
        flex-shrink: 0;
        text-align: center;
    }

    .progress-ring {
        position: relative;
        width: 100px;
        height: 100px;
        margin: 0 auto 8px;
    }

    .progress-ring svg {
        width: 100%;
        height: 100%;
    }

    .ring-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.3rem;
        font-weight: 700;
        color: #064e3b;
    }

    .progress-detail {
        font-size: 0.78rem;
        color: #64748b;
        margin: 0;
    }

    /* Categories */
    .content {
        display: flex;
        flex-direction: column;
        gap: 56px;
    }

    .category-header {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 24px;
    }

    .category-number {
        width: 32px;
        height: 32px;
        background: #064e3b;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.85rem;
        border-radius: 6px;
        flex-shrink: 0;
    }

    .category-header h2 {
        font-size: 1.35rem;
        font-weight: 700;
        margin: 0;
        color: #1a1a1a;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 20px;
    }

    /* Empty State */
    .empty {
        text-align: center;
        padding: 64px 24px;
        color: #64748b;
    }

    .empty h3 {
        font-size: 1.25rem;
        color: #1a1a1a;
        margin: 0 0 8px;
    }

    .empty p {
        font-size: 0.95rem;
        max-width: 480px;
        margin: 0 auto;
        line-height: 1.6;
    }

    /* Footer */
    .footer {
        margin-top: 80px;
        padding: 20px 24px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 0.8rem;
        color: #64748b;
        line-height: 1.6;
        text-align: center;
    }

    .footer p {
        margin: 0 0 6px;
    }

    .footer p:last-child {
        margin-bottom: 0;
    }

    @media (max-width: 768px) {
        .page {
            padding: 40px 16px 60px;
        }

        .page-header {
            flex-direction: column;
            gap: 24px;
        }

        .header-main h1 {
            font-size: 2rem;
        }

        .grid {
            grid-template-columns: 1fr;
        }

        .progress-widget {
            align-self: flex-start;
        }
    }
</style>