<script>
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    export let item;
    const dispatch = createEventDispatcher();

    $: contentType = item.content_type || 'module';
    
    let isExpanded = false;
    let isCompleted = false;

    if (typeof localStorage !== 'undefined') {
        isCompleted = localStorage.getItem(`lesson_completed_${item.id}`) === 'true';
    }

    function markComplete() {
        isCompleted = !isCompleted;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`lesson_completed_${item.id}`, isCompleted);
        }
        dispatch('completed');
    }

    function toggleExpand() {
        isExpanded = !isExpanded;
    }

    const typeConfig = {
        module: {
            icon: '📚',
            label: 'LEARNING MODULE',
            color: '#064e3b',
            bgColor: '#f0fdf4',
            actionText: 'Start Module'
        },
        directory: {
            icon: '📞',
            label: 'SERVICE DIRECTORY',
            color: '#6366f1',
            bgColor: '#eef2ff',
            actionText: 'View Contacts'
        },
        guide: {
            icon: '📋',
            label: 'QUICK GUIDE',
            color: '#d97706',
            bgColor: '#fffbeb',
            actionText: 'Read Guide'
        },
        toolkit: {
            icon: '🧰',
            label: 'PRACTICAL TOOLKIT',
            color: '#0891b2',
            bgColor: '#ecfeff',
            actionText: 'Open Toolkit'
        },
        helpline: {
            icon: '🆘',
            label: 'EMERGENCY HELPLINE',
            color: '#dc2626',
            bgColor: '#fef2f2',
            actionText: 'Call Now'
        }
    };

    $: config = typeConfig[contentType] || typeConfig.module;
</script>

<div 
    class="education-card" 
    class:completed={isCompleted}
    class:expanded={isExpanded}
    style="--card-color: {config.color}; --card-bg: {config.bgColor}"
>
    <!-- Card Header -->
    <div class="card-top" on:click={toggleExpand} on:keydown={(e) => e.key === 'Enter' && toggleExpand()} role="button" tabindex="0">
        <div class="card-type-badge" style="background: {config.bgColor}; color: {config.color};">
            <span class="badge-icon">{config.icon}</span>
            <span class="badge-label">{config.label}</span>
        </div>
        
        <h3 class="card-title">{item.title}</h3>
        <p class="card-description">{item.description}</p>

        {#if item.tags?.length > 0}
            <div class="card-tags">
                {#each item.tags as tag}
                    <span class="tag">{tag}</span>
                {/each}
            </div>
        {/if}

        <div class="card-meta">
            {#if item.duration}
                <span class="meta-item">⏱️ {item.duration}</span>
            {/if}
            {#if item.readTime}
                <span class="meta-item">📖 {item.readTime} min read</span>
            {/if}
            {#if item.contacts?.length}
                <span class="meta-item">📞 {item.contacts.length} contact{item.contacts.length !== 1 ? 's' : ''}</span>
            {/if}
        </div>
    </div>

    <!-- Expandable Content -->
    {#if isExpanded}
        <div class="card-body" transition:fade={{ duration: 200 }}>
            <!-- For Directory/Helpline Types: Contact Cards -->
            {#if (contentType === 'directory' || contentType === 'helpline') && item.contacts?.length > 0}
                <div class="contacts-grid">
                    {#each item.contacts as contact}
                        <div class="contact-card">
                            <div class="contact-header">
                                <span class="contact-org">{contact.organization}</span>
                                {#if contact.available}
                                    <span class="availability">{contact.available}</span>
                                {/if}
                            </div>
                            
                            {#if contact.phone}
                                <a href="tel:{contact.phone.replace(/[\s\+\(\)-]/g, '')}" class="contact-phone">
                                    📞 {contact.phone}
                                </a>
                            {/if}
                            
                            {#if contact.tollFree}
                                <a href="tel:{contact.tollFree.replace(/[\s\(\)-]/g, '')}" class="contact-tollfree">
                                    🟢 Toll Free: {contact.tollFree}
                                </a>
                            {/if}
                            
                            {#if contact.whatsapp}
                                <a href="https://wa.me/{contact.whatsapp.replace(/[\s\+\(\)-]/g, '')}" target="_blank" rel="noopener" class="contact-whatsapp">
                                    💬 WhatsApp: {contact.whatsapp}
                                </a>
                            {/if}
                            
                            {#if contact.email}
                                <a href="mailto:{contact.email}" class="contact-email">
                                    ✉️ {contact.email}
                                </a>
                            {/if}
                            
                            {#if contact.website}
                                <a href={contact.website} target="_blank" rel="noopener" class="contact-website">
                                    🌐 Visit Website
                                </a>
                            {/if}
                            
                            {#if contact.description}
                                <p class="contact-desc">{contact.description}</p>
                            {/if}
                        </div>
                    {/each}
                </div>
            {/if}

            <!-- For Guide/Toolkit Types: Key Points -->
            {#if (contentType === 'guide' || contentType === 'toolkit') && item.keyPoints?.length > 0}
                <div class="key-points">
                    <span class="kp-label">Key Points:</span>
                    <ul class="kp-list">
                        {#each item.keyPoints as point}
                            <li>{point}</li>
                        {/each}
                    </ul>
                </div>
            {/if}

            <!-- For Toolkit Types: Steps -->
            {#if contentType === 'toolkit' && item.steps?.length > 0}
                <div class="steps-list">
                    <span class="steps-label">How To:</span>
                    {#each item.steps as step, i}
                        <div class="step-item">
                            <span class="step-number">{i + 1}</span>
                            <div class="step-content">
                                <strong>{step.title}</strong>
                                <p>{step.description}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}

            <!-- For Module Types: Learning Objectives -->
            {#if contentType === 'module' && item.objectives?.length > 0}
                <div class="objectives-box">
                    <span class="obj-label">Learning Objectives:</span>
                    <ul class="obj-list">
                        {#each item.objectives as objective}
                            <li>{objective}</li>
                        {/each}
                    </ul>
                </div>
            {/if}

            <!-- Rich HTML Content -->
            {#if item.content}
                <div class="rich-content">
                    {@html item.content}
                </div>
            {/if}

            <!-- Action Buttons -->
            <div class="card-actions">
                {#if item.link}
                    <a href={item.link} target="_blank" rel="noopener" class="action-btn primary-btn" style="background: {config.color};">
                        {config.actionText} →
                    </a>
                {/if}
                
                {#if item.downloadUrl}
                    <a href={item.downloadUrl} download class="action-btn secondary-btn">
                        📥 Download Resource
                    </a>
                {/if}

                <button 
                    class="action-btn complete-btn" 
                    class:marked-complete={isCompleted}
                    on:click={markComplete}
                    type="button"
                >
                    {isCompleted ? '✅ Completed' : '☐ Mark Complete'}
                </button>
            </div>
        </div>
    {/if}

    <!-- Expand/Collapse Indicator -->
    <button class="expand-toggle" on:click={toggleExpand} type="button">
        {isExpanded ? '▲ Collapse' : '▼ Expand'}
    </button>

    {#if isCompleted}
        <div class="completed-check" title="Completed">✓</div>
    {/if}
</div>

<style>
    .education-card {
        background: white;
        border: 2px solid #e2e8f0;
        position: relative;
        transition: all 0.3s ease;
        overflow: hidden;
    }

    .education-card:hover {
        border-color: var(--card-color);
        box-shadow: 0 8px 24px rgba(0,0,0,0.06);
    }

    .education-card.expanded {
        border-color: var(--card-color);
        box-shadow: 0 12px 32px rgba(0,0,0,0.08);
    }

    .education-card.completed {
        border-color: #059669;
        background: #fafdf9;
    }

    .card-top {
        padding: 24px;
        cursor: pointer;
    }

    .card-type-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        margin-bottom: 12px;
    }

    .badge-icon { font-size: 0.9rem; }

    .card-title {
        font-size: 1.15rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0 0 8px 0;
        line-height: 1.3;
    }

    .card-description {
        font-size: 0.88rem;
        color: #64748b;
        margin: 0 0 12px 0;
        line-height: 1.5;
    }

    .card-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 12px;
    }

    .tag {
        font-size: 0.68rem;
        font-weight: 600;
        background: #f1f5f9;
        color: #475569;
        padding: 2px 8px;
        border-radius: 4px;
    }

    .card-meta {
        display: flex;
        gap: 14px;
        font-size: 0.72rem;
        color: #94a3b8;
        font-weight: 500;
    }

    /* Expandable Body */
    .card-body {
        border-top: 1px solid #e2e8f0;
        padding: 24px;
    }

    /* Contacts Grid */
    .contacts-grid {
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin-bottom: 20px;
    }

    .contact-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 16px;
    }

    .contact-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        flex-wrap: wrap;
        gap: 8px;
    }

    .contact-org {
        font-weight: 700;
        font-size: 0.9rem;
        color: #0f172a;
    }

    .availability {
        font-size: 0.68rem;
        font-weight: 600;
        background: #dcfce7;
        color: #166534;
        padding: 2px 8px;
        border-radius: 99px;
    }

    .contact-phone, .contact-tollfree, .contact-whatsapp, .contact-email, .contact-website {
        display: block;
        font-size: 0.85rem;
        color: #475569;
        text-decoration: none;
        padding: 4px 0;
        transition: color 0.15s;
    }

    .contact-phone:hover, .contact-tollfree:hover { color: var(--card-color); font-weight: 600; }
    .contact-tollfree { color: #059669; font-weight: 600; }
    .contact-whatsapp { color: #25D366; }
    .contact-email:hover { color: #6366f1; }
    .contact-website:hover { color: var(--card-color); text-decoration: underline; }
    .contact-desc { font-size: 0.78rem; color: #94a3b8; margin-top: 6px; line-height: 1.4; }

    /* Key Points */
    .key-points { margin-bottom: 20px; }
    .kp-label, .steps-label, .obj-label {
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #64748b;
        display: block;
        margin-bottom: 10px;
    }
    .kp-list, .obj-list { margin: 0; padding-left: 18px; }
    .kp-list li, .obj-list li {
        font-size: 0.85rem;
        color: #475569;
        line-height: 1.6;
        margin-bottom: 6px;
    }

    /* Steps */
    .steps-list { margin-bottom: 20px; }
    .step-item { display: flex; gap: 14px; margin-bottom: 14px; }
    .step-number {
        width: 28px;
        height: 28px;
        background: var(--card-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: 700;
        flex-shrink: 0;
    }
    .step-content strong { display: block; font-size: 0.88rem; color: #0f172a; margin-bottom: 2px; }
    .step-content p { font-size: 0.8rem; color: #64748b; margin: 0; line-height: 1.4; }

    /* Objectives Box */
    .objectives-box {
        background: var(--card-bg);
        border: 1px solid var(--card-color);
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 20px;
    }

    /* Rich Content */
    .rich-content {
        font-size: 0.88rem;
        line-height: 1.7;
        color: #475569;
        margin-bottom: 20px;
    }
    .rich-content :global(h3) { font-size: 1rem; color: #0f172a; margin: 16px 0 8px; }
    .rich-content :global(p) { margin: 0 0 10px; }
    .rich-content :global(ul), .rich-content :global(ol) { padding-left: 18px; margin: 8px 0; }
    .rich-content :global(li) { margin-bottom: 4px; }
    .rich-content :global(strong) { color: #0f172a; }

    /* Actions */
    .card-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding-top: 16px;
        border-top: 1px solid #e2e8f0;
    }

    .action-btn {
        padding: 10px 16px;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 700;
        text-decoration: none;
        border: none;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.15s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .primary-btn { color: white; }
    .primary-btn:hover { opacity: 0.9; transform: translateY(-1px); }
    .secondary-btn { background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; }
    .secondary-btn:hover { background: #f1f5f9; border-color: #cbd5e1; }
    .complete-btn { background: white; color: #64748b; border: 1px solid #e2e8f0; }
    .complete-btn.marked-complete { background: #f0fdf4; color: #059669; border-color: #bbf7d0; }

    /* Expand Toggle */
    .expand-toggle {
        width: 100%;
        padding: 10px;
        background: #f8fafc;
        border: none;
        border-top: 1px solid #e2e8f0;
        cursor: pointer;
        font-family: inherit;
        font-size: 0.72rem;
        font-weight: 600;
        color: #94a3b8;
        transition: all 0.15s;
    }
    .expand-toggle:hover { background: #f1f5f9; color: #64748b; }

    /* Completed Check */
    .completed-check {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 28px;
        height: 28px;
        background: #059669;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.85rem;
        font-weight: 700;
    }

    @media (max-width: 480px) {
        .card-actions { flex-direction: column; }
        .action-btn { justify-content: center; }
    }
</style>