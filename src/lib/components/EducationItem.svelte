<script>
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    export let item;
    
    let isModalOpen = false;
    let isCompleted = false;

    // Unique key for this specific lesson
    const storageKey = `lesson_completed_${item.id}`;

    onMount(() => {
        // Check if this lesson was previously finished
        isCompleted = localStorage.getItem(storageKey) === 'true';
    });

    const readTime = Math.ceil((item.content_text || '').split(' ').length / 200);

    function toggleModal() {
        isModalOpen = !isModalOpen;
        if (typeof document !== 'undefined') {
            document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
        }
    }

    function completeLesson() {
        isCompleted = true;
        localStorage.setItem(storageKey, 'true');
        toggleModal();
    }
</script>

<div class="item-card" class:completed-border={isCompleted}>
    <div class="card-meta">
        <span class="read-time">⏱️ {readTime} min read</span>
        {#if isCompleted}
            <span class="status-badge" in:fade>✅ Completed</span>
        {/if}
    </div>
    
    <h4>{item.topic}</h4>
    
    <div class="item-content">
        <p>{item.content_text.substring(0, 100)}...</p>
    </div>

    <div class="card-actions">
        <button class="expand-btn" class:completed-btn={isCompleted} on:click={toggleModal}>
            {isCompleted ? 'Review Lesson' : 'Start Lesson →'}
        </button>
    </div>
</div>

{#if isModalOpen}
    <div class="modal-overlay" on:click={toggleModal} transition:fade={{duration: 200}}>
        <div class="modal-content" on:click|stopPropagation in:fly={{ y: 50, duration: 400 }}>
            <header class="modal-header">
                <span class="category-tag">{item.category}</span>
                <button class="close-btn" on:click={toggleModal}>&times;</button>
            </header>
            
            <article class="prose">
                <h1>{item.topic}</h1>
                <div class="lesson-body">
                    {@html item.content_text.replace(/\n/g, '<br>')}
                </div>
            </article>

            <footer class="modal-footer">
                {#if item.media_url}
                    <a href={item.media_url} target="_blank" rel="noopener noreferrer" class="resource-link">
                        View Official Resource 🔗
                    </a>
                {:else}
                    <span></span>
                {/if}
                <button class="finish-btn" on:click={completeLesson}>
                    {isCompleted ? 'Close' : 'Mark as Finished'}
                </button>
            </footer>
        </div>
    </div>
{/if}

<style>
    .item-card {
        background: white;
        border: 2px solid #e6f0e9;
        border-radius: 16px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        transition: all 0.2s ease;
        position: relative;
    }

    .completed-border {
        border-color: #007a33;
        background: #f4fbf7;
    }

    .card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }

    .status-badge {
        font-size: 0.75rem;
        font-weight: bold;
        color: #007a33;
        background: white;
        padding: 2px 8px;
        border-radius: 12px;
        border: 1px solid #007a33;
    }

    h4 { color: #1a1a1a; margin: 0 0 12px 0; font-size: 1.25rem; font-weight: 700; }
    .read-time { font-size: 0.85em; color: #007a33; font-weight: 700; }

    .expand-btn {
        background: #007a33;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
        width: 100%;
    }

    .completed-btn {
        background: white;
        color: #007a33;
        border: 2px solid #007a33;
    }

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex; justify-content: center; align-items: center;
        z-index: 1000; padding: 20px;
        backdrop-filter: blur(4px);
    }

    .modal-content {
        background: white;
        width: 100%; max-width: 800px;
        max-height: 90vh;
        border-radius: 24px;
        display: flex; flex-direction: column;
        overflow: hidden;
    }

    .modal-header { padding: 20px 30px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
    .category-tag { color: #007a33; font-weight: bold; text-transform: uppercase; font-size: 0.8em; }
    .close-btn { background: none; border: none; font-size: 2rem; cursor: pointer; color: #999; }

    .prose { padding: 40px 30px; overflow-y: auto; line-height: 1.8; color: #333; }
    .prose h1 { color: #007a33; margin-bottom: 20px; }

    .modal-footer {
        padding: 20px 30px;
        background: #f4fbf7;
        border-top: 1px solid #e6f0e9;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .finish-btn {
        background: #007a33;
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 12px;
        font-weight: bold;
        cursor: pointer;
    }

    .resource-link { color: #007a33; font-weight: 700; text-decoration: none; }
</style>