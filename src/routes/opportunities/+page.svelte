<script>
    /** @type {import('./$types').PageData} */
    export let data;
    
    const { groupedOpportunities } = data;

    const sections = [
        { 
            id: 'engage', 
            title: 'Engage & Volunteer', 
            description: 'Hands-on involvement, skill-sharing, and community impact opportunities.' 
        },
        { 
            id: 'develop', 
            title: 'Programs & Fellowships', 
            description: 'Structured training, leadership development, and small grants for professional growth.' 
        },
        { 
            id: 'financial', 
            title: 'Scholarships & Academic Aid', 
            description: 'Financial support and academic opportunities to continue your education.' 
        },
    ];

    function getMainSectionId(category) {
        if (['Volunteer', 'Community Work', 'CSR Initiatives'].includes(category)) return 'engage';
        if (['Leadership Programs', 'Grants & Fellowships', 'Mentorship'].includes(category)) return 'develop';
        if (['Scholarship', 'Academic Aid'].includes(category)) return 'financial';
        return 'other';
    }

    function formatDeadline(dateString) {
        if (!dateString) return 'Ongoing';
        const date = new Date(dateString);
        if (isNaN(date)) return 'Check Link';
        return date.toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    $: hasAnyOpportunities = Object.values(groupedOpportunities).some(arr => arr.length > 0);
</script>

<div class="page">
    <!-- Header -->
    <section class="page-header">
        <h1>Youth Opportunities</h1>
        <p>A curated directory of scholarships, programs, and engagement opportunities for young Kenyans.</p>
    </section>

    {#if hasAnyOpportunities}
        {#each sections as section}
            {@const sectionOpportunities = Object.entries(groupedOpportunities).filter(([cat]) => getMainSectionId(cat) === section.id)}
            <section class="section">
                <div class="section-header">
                    <h2>{section.title}</h2>
                    <p>{section.description}</p>
                </div>

                <!-- Campus Ambassador Program - Featured Card -->
                {#if section.id === 'engage'}
                    <div class="featured-card">
                        <div class="featured-badge">Featured</div>
                        <div class="featured-content">
                            <div class="featured-text">
                                <h3>PolicyBridge Campus Ambassador Program</h3>
                                <p>Represent PolicyBridge Kenya at your university or college. Coordinate policy labs, mobilize students, and transform campus ideas into national policy solutions. Join a national network of young leaders shaping Kenya's future.</p>
                                <ul class="featured-details">
                                    <li>Lead policy dialogues on campus</li>
                                    <li>Organize solution submission drives</li>
                                    <li>Connect students to national policy processes</li>
                                    <li>Build leadership and advocacy skills</li>
                                </ul>
                            </div>
                            <div class="featured-action">
                                <a 
                                    href="https://forms.gle/J2icK2FxxwFeA22z8" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    class="featured-link"
                                >
                                    Apply Now →
                                </a>
                                <span class="deadline-text">Rolling applications</span>
                            </div>
                        </div>
                    </div>
                {/if}

                {#if sectionOpportunities.length > 0}
                    <div class="grid">
                        {#each sectionOpportunities as [categoryName, opportunitiesList]}
                            {#if opportunitiesList.length > 0}
                                <div class="category-block">
                                    <h3 class="category-title">{categoryName}</h3>
                                    
                                    <div class="opportunities">
                                        {#each opportunitiesList as opportunity}
                                            <div class="card">
                                                <div class="card-body">
                                                    <h4>{opportunity.title}</h4>
                                                    <p>{opportunity.description}</p>
                                                </div>
                                                <div class="card-footer">
                                                    <span class="deadline">
                                                        Deadline: <strong>{formatDeadline(opportunity.application_deadline)}</strong>
                                                    </span>
                                                    <a 
                                                        href={opportunity.link_url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        class="link"
                                                    >
                                                        View & Apply →
                                                    </a>
                                                </div>
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                {:else if section.id !== 'engage'}
                    <div class="empty-section">
                        <p>No active opportunities in this category right now. Check back soon.</p>
                    </div>
                {/if}
            </section>
        {/each}
    {:else}
        <div class="empty">
            <h3>No Opportunities Available</h3>
            <p>We're updating our listings. Check back soon or ensure you have a stable internet connection.</p>
        </div>
    {/if}
</div>

<style>
    .page {
        max-width: 1100px;
        margin: 0 auto;
        padding: 56px 24px 80px;
        font-family: system-ui, -apple-system, sans-serif;
        color: #1a1a1a;
    }

    /* Header */
    .page-header {
        text-align: center;
        margin-bottom: 56px;
    }

    .page-header h1 {
        font-size: 2.25rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        margin: 0 0 10px;
    }

    .page-header p {
        font-size: 1rem;
        color: #555;
        max-width: 540px;
        margin: 0 auto;
        line-height: 1.5;
    }

    /* Section */
    .section {
        margin-bottom: 56px;
    }

    .section-header {
        margin-bottom: 28px;
    }

    .section-header h2 {
        font-size: 1.35rem;
        font-weight: 700;
        margin: 0 0 6px;
        color: #064e3b;
    }

    .section-header p {
        font-size: 0.9rem;
        color: #64748b;
        margin: 0;
    }

    /* Featured Card */
    .featured-card {
        background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
        border: 2px solid #064e3b;
        border-radius: 12px;
        padding: 28px;
        margin-bottom: 24px;
        position: relative;
    }

    .featured-badge {
        position: absolute;
        top: -12px;
        left: 24px;
        background: #064e3b;
        color: white;
        padding: 4px 14px;
        border-radius: 100px;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .featured-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 32px;
    }

    .featured-text {
        flex: 1;
    }

    .featured-text h3 {
        font-size: 1.2rem;
        font-weight: 700;
        margin: 0 0 10px;
        color: #064e3b;
    }

    .featured-text p {
        font-size: 0.9rem;
        color: #475569;
        line-height: 1.6;
        margin: 0 0 16px;
    }

    .featured-details {
        margin: 0;
        padding-left: 18px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px 24px;
    }

    .featured-details li {
        font-size: 0.83rem;
        color: #475569;
        line-height: 1.5;
    }

    .featured-action {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
    }

    .featured-link {
        display: inline-block;
        padding: 14px 28px;
        background: #064e3b;
        color: white;
        text-decoration: none;
        font-weight: 700;
        font-size: 0.9rem;
        border-radius: 8px;
        white-space: nowrap;
        transition: background 0.15s;
    }

    .featured-link:hover {
        background: #043d2e;
    }

    .deadline-text {
        font-size: 0.75rem;
        color: #64748b;
    }

    /* Grid */
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 20px;
    }

    /* Category Block */
    .category-block {
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 20px;
    }

    .category-title {
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #475569;
        margin: 0 0 16px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e7eb;
    }

    /* Cards */
    .opportunities {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        overflow: hidden;
    }

    .card-body {
        padding: 16px;
    }

    .card-body h4 {
        font-size: 0.95rem;
        font-weight: 700;
        margin: 0 0 6px;
        line-height: 1.3;
    }

    .card-body p {
        font-size: 0.83rem;
        color: #555;
        margin: 0;
        line-height: 1.5;
    }

    .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: #fafafa;
        border-top: 1px solid #e5e7eb;
    }

    .deadline {
        font-size: 0.75rem;
        color: #64748b;
    }

    .deadline strong {
        color: #1a1a1a;
        font-weight: 600;
    }

    .link {
        font-size: 0.8rem;
        font-weight: 600;
        color: #064e3b;
        text-decoration: none;
        white-space: nowrap;
    }

    .link:hover {
        text-decoration: underline;
    }

    /* Empty States */
    .empty, .empty-section {
        text-align: center;
        padding: 40px 24px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        color: #64748b;
    }

    .empty h3 {
        font-size: 1.15rem;
        color: #1a1a1a;
        margin: 0 0 8px;
    }

    .empty p, .empty-section p {
        font-size: 0.9rem;
        margin: 0;
    }

    @media (max-width: 768px) {
        .page {
            padding: 40px 16px 60px;
        }

        .page-header h1 {
            font-size: 1.75rem;
        }

        .featured-content {
            flex-direction: column;
        }

        .featured-details {
            grid-template-columns: 1fr;
        }

        .featured-action {
            width: 100%;
        }

        .featured-link {
            text-align: center;
            width: 100%;
        }

        .grid {
            grid-template-columns: 1fr;
        }

        .card-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
        }
    }
</style>