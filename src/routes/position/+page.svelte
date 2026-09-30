<script>
    /** @type {import('./$types').PageData} */
    export let data;

    /**
     * Position paper content.
     * Server data (data.papers / data.upcoming) overrides these defaults when present,
     * so this page works standalone today and evolves with the backend later.
     */
    const DEFAULT_PAPERS = [
        {
            slug: 'mental-health',
            topic: 'Mental Health',
            title: 'Youth Mental Health in Kenya: From Listening to Implementation',
            status: 'Published',
            published_at: '2026-08-01',
            lead_theme: 'From Listening to Implementation',
            summary: 'Kenya has a strong policy and legal foundation for mental health reform, including a statutory direction toward community-based care and integration into primary health services. Yet access remains the central failure. PolicyBridge KE proposes a four-pillar framework to move from policy commitment to measurable implementation.'
        }
    ];

    const DEFAULT_UPCOMING = [
        {
            slug: 'gender-public-safety',
            topic: 'Gender & Public Safety',
            title: 'Gender & Public Safety',
            status: 'In Development',
            lead_theme: 'Protection, Participation, and Accountability',
            summary: 'Public safety is a precondition for gender equality, not a separate agenda.',
            issue: 'Young women and girls in Kenya navigate pervasive threats to their safety — in public transport, in learning institutions, in workplaces, and in the home. Gender-based violence, femicide, sexual harassment, and the everyday policing of women\u2019s presence in public space are not isolated incidents; they are patterns sustained by weak enforcement, underreporting, and cultural silence. At the same time, young women\u2019s participation in public life — politics, leadership, civic action — remains constrained by violence, intimidation, and economic exclusion.',
            position: 'Public safety is a precondition for gender equality, not a separate agenda. Kenya cannot claim to advance youth leadership while young women are unsafe in the spaces where leadership is exercised. Safety policy must move beyond reactive criminal justice responses toward prevention, survivor-centred support, and institutional accountability.',
            calls: [
                'Full operationalisation and resourcing of existing GBV protection frameworks at county level, including GBV recovery centres and safe houses.',
                'Mandatory, enforced safeguarding standards in all institutions serving young people — schools, TVETs, universities, workplaces, and religious institutions.',
                'Public transport safety reforms, including licensing conditions, reporting mechanisms, and driver/rider accountability.',
                'Dedicated, protected funding for women-led and youth-led organisations delivering frontline safety and survivor support.',
                'Independent oversight of police handling of GBV and femicide cases, with published disposition data.',
                'Removal of structural barriers to young women\u2019s political and civic participation.'
            ]
        },
        {
            slug: 'governance-civic-engagement',
            topic: 'Governance & Civic Engagement',
            title: 'Governance & Civic Engagement',
            status: 'In Development',
            lead_theme: 'Participation as a Right, Not a Favour',
            summary: 'Young people are citizens with enforceable rights to participate in the decisions that govern their lives.',
            issue: 'Kenya\u2019s constitutional architecture promises public participation, devolution, and civic space. In practice, young people are frequently consulted without being heard, invited without being empowered, and counted without being represented. Public participation processes are often poorly publicised, technically inaccessible, and held at times and places that exclude working and rural youth. Civic space — the freedom to organise, assemble, speak, and hold power to account — has narrowed in ways that disproportionately affect young activists and organisers.',
            position: 'Young people are not a demographic to be managed. They are citizens with enforceable rights to participate in the decisions that govern their lives. Participation that is extractive — gathering youth views for legitimacy without transferring influence — is not participation. It is decoration.',
            calls: [
                'Enforceable minimum standards for public participation at national and county levels, including accessibility, notice periods, language, and documentation of how input shaped decisions.',
                'Institutionalised youth representation with decision-making authority — not observer status — in county planning, budgeting, and sectoral committees.',
                'Protection of civic space, including safeguards against arbitrary restriction of assembly, association, and expression.',
                'Civic education embedded in the curriculum and in community programming, with a focus on rights, devolution, and accountability mechanisms.',
                'Transparent, published feedback loops: citizens should be able to see what happened to their input.'
            ]
        },
        {
            slug: 'creative-economy',
            topic: 'Creative Economy',
            title: 'Creative Economy',
            status: 'In Development',
            lead_theme: 'From Talent to Livelihood',
            summary: 'The creative economy is not a side hustle. It is a legitimate industry.',
            issue: 'Kenya\u2019s creative sector — music, film, visual arts, fashion, gaming, content creation, performance — is one of the most visible expressions of youth enterprise and one of the least supported economically. Creatives face weak intellectual property enforcement, exploitative contracts, limited access to affordable production infrastructure, and financing models that do not recognise irregular income. The sector is celebrated culturally and neglected structurally.',
            position: 'The creative economy is not a side hustle. It is a legitimate industry capable of generating mass employment, export earnings, and national identity — provided it is treated with the same seriousness as agriculture, manufacturing, or ICT. Talent is abundant in Kenya. What is scarce is infrastructure, protection, and capital.',
            calls: [
                'Strengthened enforcement of intellectual property rights, including accessible, affordable dispute resolution for individual creatives.',
                'Public investment in affordable creative infrastructure: recording studios, rehearsal and performance venues, production facilities, and shared workspaces at county level.',
                'Financing instruments designed for creative income patterns — including revenue-based lending, grant facilities, and royalty-backed instruments.',
                'Standardised, enforceable contract protections for creatives, particularly young and first-time signees.',
                'Creative education and enterprise training integrated into TVET and university curricula.',
                'Formal recognition of creative work in national employment and taxation frameworks.',
                'Mental health and wellbeing support tailored to the creative sector, recognising its precarity and public-facing pressures.'
            ]
        },
        {
            slug: 'environmental-policy',
            topic: 'Environmental Policy',
            title: 'Environmental Policy',
            status: 'In Development',
            lead_theme: 'Environmental Justice as Youth Justice',
            summary: 'Environmental policy must be reframed as a public health and equity agenda.',
            issue: 'Young Kenyans bear the consequences of environmental degradation they did not cause. Air pollution in urban centres, uncollected waste, contaminated water, lead and e-waste exposure, and the loss of green and public space are concentrated in low-income and informal settlements — precisely where young people are most numerous. Environmental harm is not distributed evenly; it follows the contours of class and geography.',
            position: 'Environmental policy in Kenya must be reframed as a public health and equity agenda, not merely a conservation agenda. The question is not only how to protect nature, but who is protected from environmental harm — and who is not.',
            calls: [
                'Enforcement of existing environmental standards, with published compliance and penalty data, particularly for industrial pollution and waste management.',
                'Prioritised remediation of contaminated sites affecting low-income and informal settlements.',
                'Investment in youth-led waste management, recycling, and circular economy enterprises, with fair procurement and decent work standards.',
                'Protection and expansion of public green space in urban areas, with youth participation in planning.',
                'Safe management and disposal of e-waste, with attention to informal-sector workers.',
                'Recognition and protection of youth environmental defenders, including safeguards against intimidation and violence.'
            ]
        },
        {
            slug: 'climate-resilience',
            topic: 'Climate Resilience',
            title: 'Climate Resilience',
            status: 'In Development',
            lead_theme: 'Youth at the Frontline, Youth at the Table',
            summary: 'Young people are not merely climate victims. They are already adapting and organising.',
            issue: 'Kenya is on the front line of climate change. Cycles of drought and flooding have devastated livelihoods, disrupted education, displaced communities, and deepened food insecurity. Pastoralist and farming communities — and the young people within them — absorb the first and hardest shocks. Yet climate governance remains dominated by older actors, and climate finance rarely reaches the local level or the youth-led organisations closest to affected communities.',
            position: 'Young people are not merely climate victims. They are already adapting, innovating, and organising. Climate policy must recognise them as agents of resilience — and must ensure that climate finance flows to where vulnerability is greatest, not only where institutional capacity is strongest.',
            calls: [
                'Meaningful youth participation in climate governance at national, county, and community levels, including in climate finance decision-making.',
                'Direct, accessible climate finance windows for youth-led and community-based organisations, with simplified application and reporting requirements.',
                'Investment in climate-resilient livelihoods, particularly for pastoralist and smallholder youth.',
                'Integration of climate resilience into education and TVET curricula, aligned with green job opportunities.',
                'Climate displacement protections, including safeguards for children and young people\u2019s continuity of education.',
                'Investment in early warning systems and last-mile dissemination that reach youth in local languages and through their existing networks.'
            ]
        },
        {
            slug: 'youth-employment',
            topic: 'Youth Employment',
            title: 'Youth Employment',
            status: 'In Development',
            lead_theme: 'From Unemployment to Decent Work',
            summary: 'The challenge is not youth willingness to work. It is the absence of decent work to enter.',
            issue: 'Kenya\u2019s youth face a labour market that is neither absorbing them nor rewarding them fairly. Unemployment and underemployment are compounded by skills mismatch, limited access to capital, exploitative informal work, and a persistent gap between education outcomes and labour market demand. Young women, young people with disabilities, and youth in marginalised counties face additional, compounding barriers.',
            position: 'The challenge is not youth willingness to work. It is the absence of decent work to enter. Policy responses that focus exclusively on individual skills — while leaving demand, capital access, and job quality untouched — will not resolve the crisis. Kenya must address both sides of the labour market.',
            calls: [
                'Alignment of education and TVET curricula with current and projected labour market demand, developed in partnership with employers and industry.',
                'Expanded access to affordable, responsible capital for youth enterprise, including instruments suited to young people without collateral or credit history.',
                'Formalisation pathways for informal and gig work that extend protections — social security, occupational safety, and fair contracting — without imposing impossible compliance burdens.',
                'Enforcement of decent work standards, including on wages, hours, and harassment, with particular attention to young workers.',
                'Targeted programmes for youth with disabilities, young women, and youth in marginalised and arid counties.',
                'Integration of mental health and wellbeing support into youth employment and enterprise programmes.'
            ]
        },
        {
            slug: 'public-finance',
            topic: 'Public Finance',
            title: 'Public Finance',
            status: 'In Development',
            lead_theme: 'Intergenerational Equity and Budget Transparency',
            summary: 'A budget is a statement of values. If young people are a priority, that must be visible.',
            issue: 'Public finance decisions shape young people\u2019s futures more than almost any other policy lever — yet young people are the least represented in the processes that make them. Budgets are frequently opaque, allocations are difficult to trace to service delivery, and public participation in county budgeting is often procedural rather than substantive. Rising public debt raises serious questions of intergenerational equity: today\u2019s borrowing is tomorrow\u2019s young person\u2019s burden.',
            position: 'A budget is a statement of values. If young people are a national priority, that priority must be visible in allocations, traceable in expenditure, and verifiable in outcomes. Fiscal policy must be assessed not only for macroeconomic stability but for what it does to the next generation.',
            calls: [
                'Transparent, identifiable budget lines for youth-focused programmes — including mental health, employment, and civic participation — tracked from allocation to expenditure to service delivery.',
                'Meaningful youth participation in county budget-making processes, with documented evidence of how input shaped allocations.',
                'Public publication of budget implementation data, including county-level disaggregation.',
                'Fiscal impact assessments that explicitly consider intergenerational equity, particularly on debt, education, and health spending.',
                'Strengthened oversight by county assemblies and civil society, with accessible information for citizen monitoring.',
                'Protection of spending on prevention, primary services, and human capital even during fiscal consolidation.'
            ]
        }
    ];

    // Server data overrides defaults when present
    $: papers = data?.papers?.length ? data.papers : DEFAULT_PAPERS;
    $: upcoming = data?.upcoming?.length ? data.upcoming : DEFAULT_UPCOMING;
    $: topics = data?.topics?.length
        ? data.topics
        : [...papers, ...upcoming].map(p => p.topic);

    let selectedTopic = 'all';
    let searchQuery = '';

    $: filteredPapers = papers.filter(paper => {
        const matchesTopic = selectedTopic === 'all' || paper.topic === selectedTopic;
        const matchesSearch = !searchQuery ||
            paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            paper.summary?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTopic && matchesSearch;
    });

    $: filteredUpcoming = upcoming.filter(paper => {
        const matchesTopic = selectedTopic === 'all' || paper.topic === selectedTopic;
        const matchesSearch = !searchQuery ||
            paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            paper.summary?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTopic && matchesSearch;
    });

    // Open/closed state for expandable in-development cards
    let expandedSlugs = new Set();
    function toggleExpand(slug) {
        if (expandedSlugs.has(slug)) {
            expandedSlugs.delete(slug);
        } else {
            expandedSlugs.add(slug);
        }
        expandedSlugs = expandedSlugs;
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-KE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
</script>

<svelte:head>
    <title>Position Papers — PolicyBridge Kenya</title>
    <meta name="description" content="Official PolicyBridge Kenya positions on key issues affecting youth, governance, and development in Kenya." />
</svelte:head>

<div class="page">
    <!-- Header -->
    <section class="page-header">
        <span class="section-label">Policy Positions</span>
        <h1>Position Papers</h1>
        <p>Official PolicyBridge Kenya positions on key issues affecting youth, governance, and development in Kenya. Each paper is grounded in research, stakeholder engagement, and the lived experience of young people, and concludes with clear, actionable recommendations.</p>
    </section>

    <!-- Our Process -->
    <section class="process-section">
        <h2 class="section-heading">Our Process</h2>
        <div class="process-steps">
            <div class="step">
                <span class="step-number">1</span>
                <div>
                    <h4>Research &amp; Analysis</h4>
                    <p>Gathering evidence, data, and stakeholder input — including youth consultation, policy analysis, and review of existing legal and institutional frameworks.</p>
                </div>
            </div>
            <div class="step">
                <span class="step-number">2</span>
                <div>
                    <h4>Drafting &amp; Review</h4>
                    <p>Developing clear positions with actionable recommendations. Each paper is peer-reviewed internally and validated with the young people most affected.</p>
                </div>
            </div>
            <div class="step">
                <span class="step-number">3</span>
                <div>
                    <h4>Publication &amp; Advocacy</h4>
                    <p>Sharing positions with stakeholders and the public, and translating them into institutional engagement, advocacy, and accountability work.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Filters -->
    <div class="filters">
        <div class="search-wrap">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
                type="text"
                placeholder="Search position papers..."
                bind:value={searchQuery}
                class="search-input"
                aria-label="Search position papers"
            />
        </div>

        {#if topics.length > 0}
            <div class="topic-filters">
                <button
                    class="filter-btn"
                    class:active={selectedTopic === 'all'}
                    on:click={() => selectedTopic = 'all'}
                >
                    All Topics
                </button>
                {#each topics as topic}
                    <button
                        class="filter-btn"
                        class:active={selectedTopic === topic}
                        on:click={() => selectedTopic = topic}
                    >
                        {topic}
                    </button>
                {/each}
            </div>
        {/if}
    </div>

    <!-- Published Papers -->
    {#if filteredPapers.length > 0}
        <section class="published-section">
            <h2 class="section-heading">Published Positions</h2>

            <div class="papers-list">
                {#each filteredPapers as paper}
                    <article class="paper-card">
                        <div class="paper-content">
                            <div class="paper-meta">
                                <span class="topic-tag">{paper.topic}</span>
                                {#if paper.published_at}
                                    <span class="paper-date">{formatDate(paper.published_at)}</span>
                                {/if}
                                <span class="paper-status">{paper.status || 'Published'}</span>
                            </div>
                            <h3 class="paper-title">
                                <a href={`/position/${paper.slug}`}>{paper.title}</a>
                            </h3>
                            {#if paper.summary}
                                <p class="paper-summary">{paper.summary}</p>
                            {/if}
                            <div class="paper-footer">
                                <a href={`/position/${paper.slug}`} class="read-link">
                                    Read Full Position →
                                </a>
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        </section>
    {/if}

    <!-- In Development -->
    {#if filteredUpcoming.length > 0}
        <section class="upcoming-section">
            <h2 class="section-heading">In Development</h2>
            <p class="section-intro">
                Our research team is developing evidence-based position papers on the following
                critical policy issues. Each paper represents thorough analysis and clear policy
                recommendations on matters affecting Kenya's youth. Expand any position to preview
                our emerging stance and proposed recommendations.
            </p>

            <div class="upcoming-list">
                {#each filteredUpcoming as item}
                    {@const isOpen = expandedSlugs.has(item.slug)}
                    <article class="upcoming-card" class:open={isOpen}>
                        <button
                            class="upcoming-header"
                            on:click={() => toggleExpand(item.slug)}
                            aria-expanded={isOpen}
                            aria-controls={`upcoming-${item.slug}`}
                        >
                            <div class="upcoming-header-content">
                                <span class="upcoming-status">In Development</span>
                                <h3 class="upcoming-title">{item.title}</h3>
                                {#if item.lead_theme}
                                    <p class="upcoming-theme">{item.lead_theme}</p>
                                {/if}
                            </div>
                            <svg
                                class="upcoming-chevron"
                                class:open={isOpen}
                                width="20" height="20"
                                viewBox="0 0 24 24"
                                fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            >
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </button>

                        <div class="upcoming-body" id={`upcoming-${item.slug}`} hidden={!isOpen}>
                            {#if item.issue}
                                <div class="upcoming-block">
                                    <h4>The Issue</h4>
                                    <p>{item.issue}</p>
                                </div>
                            {/if}
                            {#if item.position}
                                <div class="upcoming-block position-block">
                                    <h4>Our Position</h4>
                                    <p>{item.position}</p>
                                </div>
                            {/if}
                            {#if item.calls && item.calls.length > 0}
                                <div class="upcoming-block">
                                    <h4>What We Are Calling For</h4>
                                    <ul class="calls-list">
                                        {#each item.calls as call}
                                            <li>{call}</li>
                                        {/each}
                                    </ul>
                                </div>
                            {/if}
                        </div>
                    </article>
                {/each}
            </div>
        </section>
    {/if}

    <!-- Empty filter state -->
    {#if filteredPapers.length === 0 && filteredUpcoming.length === 0}
        <div class="empty-filter">
            <h3>No positions found</h3>
            <p>Try adjusting your search or filter criteria.</p>
            <button class="reset-btn" on:click={() => { searchQuery = ''; selectedTopic = 'all'; }}>
                Clear filters
            </button>
        </div>
    {/if}

    <!-- Footer CTA -->
    <section class="page-footer">
        <h2>Engage With Our Positions</h2>
        <p>
            We invite policymakers, practitioners, researchers, and young people to engage with
            these positions — to challenge them, strengthen them, and help translate them into action.
        </p>
        <p class="footer-contact">
            <strong>Partnership or contribution:</strong>
            <a href="mailto:info@policybridgeke.org">info@policybridgeke.org</a> ·
            <a href="https://www.policybridgeke.org">www.policybridgeke.org</a>
        </p>
    </section>
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
        margin-bottom: 48px;
    }

    .section-label {
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #064e3b;
        display: inline-block;
        margin-bottom: 10px;
        padding: 3px 10px;
        background: #f0fdf4;
        border-radius: 4px;
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
        max-width: 680px;
        line-height: 1.6;
        margin: 0;
    }

    /* Section headings */
    .section-heading {
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #475569;
        margin: 0 0 20px;
    }

    .section-intro {
        font-size: 0.92rem;
        color: #555;
        line-height: 1.6;
        max-width: 720px;
        margin: 0 0 24px;
    }

    /* Process */
    .process-section {
        margin-bottom: 48px;
        padding: 28px 24px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
    }

    .process-steps {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
    }

    .step {
        display: flex;
        gap: 14px;
        align-items: flex-start;
    }

    .step-number {
        width: 28px;
        height: 28px;
        background: #064e3b;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.8rem;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .step h4 {
        font-size: 0.9rem;
        font-weight: 600;
        margin: 0 0 4px;
        color: #1a1a1a;
    }

    .step p {
        font-size: 0.82rem;
        color: #64748b;
        line-height: 1.5;
        margin: 0;
    }

    /* Filters */
    .filters {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 40px;
        padding-bottom: 32px;
        border-bottom: 1px solid #f1f5f9;
    }

    .search-wrap {
        position: relative;
        max-width: 400px;
    }

    .search-icon {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
        pointer-events: none;
    }

    .search-input {
        width: 100%;
        padding: 10px 14px 10px 40px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-family: inherit;
        font-size: 0.9rem;
        color: #1a1a1a;
        background: #f8fafc;
        transition: all 0.15s;
    }

    .search-input:focus {
        outline: none;
        border-color: #064e3b;
        background: white;
        box-shadow: 0 0 0 3px rgba(6, 78, 59, 0.06);
    }

    .search-input::placeholder {
        color: #94a3b8;
    }

    .topic-filters {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .filter-btn {
        padding: 6px 16px;
        border: 1px solid #e5e7eb;
        border-radius: 100px;
        background: white;
        color: #475569;
        font-family: inherit;
        font-size: 0.82rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s;
    }

    .filter-btn:hover {
        border-color: #064e3b;
        color: #064e3b;
    }

    .filter-btn.active {
        background: #064e3b;
        color: white;
        border-color: #064e3b;
    }

    /* Published papers */
    .published-section {
        margin-bottom: 56px;
    }

    .papers-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .paper-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        transition: all 0.2s;
    }

    .paper-card:hover {
        border-color: #064e3b;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    }

    .paper-content {
        padding: 24px;
    }

    .paper-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
        flex-wrap: wrap;
    }

    .topic-tag {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #064e3b;
        background: #f0fdf4;
        padding: 3px 8px;
        border-radius: 4px;
    }

    .paper-date {
        font-size: 0.78rem;
        color: #94a3b8;
    }

    .paper-status {
        font-size: 0.7rem;
        font-weight: 600;
        color: #0891b2;
        background: #ecfeff;
        padding: 3px 8px;
        border-radius: 4px;
    }

    .paper-title {
        font-size: 1.15rem;
        font-weight: 700;
        line-height: 1.35;
        margin: 0 0 10px;
    }

    .paper-title a {
        color: #1a1a1a;
        text-decoration: none;
    }

    .paper-title a:hover {
        color: #064e3b;
    }

    .paper-summary {
        font-size: 0.88rem;
        color: #555;
        line-height: 1.6;
        margin: 0 0 16px;
    }

    .paper-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 14px;
        border-top: 1px solid #f1f5f9;
        flex-wrap: wrap;
        gap: 12px;
    }

    .read-link {
        font-size: 0.82rem;
        font-weight: 600;
        color: #064e3b;
        text-decoration: none;
    }

    .read-link:hover {
        text-decoration: underline;
    }

    /* Upcoming (expandable) */
    .upcoming-section {
        margin-bottom: 56px;
    }

    .upcoming-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .upcoming-card {
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        overflow: hidden;
        transition: border-color 0.15s, background 0.15s;
    }

    .upcoming-card:hover {
        border-color: #cbd5e1;
    }

    .upcoming-card.open {
        background: white;
        border-color: #064e3b;
    }

    .upcoming-header {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 20px 22px;
        background: transparent;
        border: none;
        text-align: left;
        font-family: inherit;
        cursor: pointer;
        color: inherit;
    }

    .upcoming-header-content {
        flex: 1;
        min-width: 0;
    }

    .upcoming-status {
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #94a3b8;
        display: block;
        margin-bottom: 6px;
    }

    .upcoming-title {
        font-size: 1.05rem;
        font-weight: 700;
        margin: 0 0 6px;
        color: #1a1a1a;
        line-height: 1.3;
    }

    .upcoming-theme {
        font-size: 0.8rem;
        font-weight: 600;
        color: #064e3b;
        margin: 0;
    }

    .upcoming-chevron {
        flex-shrink: 0;
        color: #94a3b8;
        margin-top: 4px;
        transition: transform 0.2s, color 0.15s;
    }

    .upcoming-chevron.open {
        transform: rotate(180deg);
        color: #064e3b;
    }

    .upcoming-body {
        padding: 4px 22px 24px;
        border-top: 1px solid #f1f5f9;
    }

    .upcoming-block {
        margin-top: 20px;
    }

    .upcoming-block h4 {
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #475569;
        margin: 0 0 8px;
    }

    .upcoming-block p {
        font-size: 0.88rem;
        color: #444;
        line-height: 1.65;
        margin: 0;
    }

    .position-block {
        padding: 16px 18px;
        background: #f0fdf4;
        border-left: 3px solid #064e3b;
        border-radius: 4px;
    }

    .position-block h4 {
        color: #064e3b;
    }

    .calls-list {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .calls-list li {
        position: relative;
        padding: 0 0 0 20px;
        margin-bottom: 10px;
        font-size: 0.88rem;
        color: #444;
        line-height: 1.6;
    }

    .calls-list li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 8px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #064e3b;
    }

    .calls-list li:last-child {
        margin-bottom: 0;
    }

    /* Filter empty */
    .empty-filter {
        text-align: center;
        padding: 48px 24px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
    }

    .empty-filter h3 {
        font-size: 1.15rem;
        margin: 0 0 6px;
    }

    .empty-filter p {
        font-size: 0.9rem;
        color: #64748b;
        margin: 0 0 16px;
    }

    .reset-btn {
        padding: 8px 20px;
        background: #064e3b;
        color: white;
        border: none;
        border-radius: 6px;
        font-family: inherit;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
    }

    .reset-btn:hover {
        background: #043d2e;
    }

    /* Footer */
    .page-footer {
        padding: 32px 28px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
    }

    .page-footer h2 {
        font-size: 1.15rem;
        font-weight: 700;
        margin: 0 0 10px;
    }

    .page-footer p {
        font-size: 0.9rem;
        color: #555;
        line-height: 1.6;
        margin: 0 0 12px;
        max-width: 680px;
    }

    .footer-contact {
        margin: 0 !important;
    }

    .footer-contact a {
        color: #064e3b;
        font-weight: 600;
        text-decoration: none;
    }

    .footer-contact a:hover {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        .page {
            padding: 40px 16px 60px;
        }

        .page-header h1 {
            font-size: 1.75rem;
        }

        .process-steps {
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .paper-footer {
            flex-direction: column;
            align-items: flex-start;
        }

        .upcoming-header {
            padding: 18px 18px;
        }

        .upcoming-body {
            padding: 4px 18px 20px;
        }
    }
</style>