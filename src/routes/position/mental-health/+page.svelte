<script>
    import { onMount } from 'svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    /**
     * Fallback content — used when the server doesn't provide a paper.
     * Server data (data.paper) overrides this entirely.
     */
    const FALLBACK_PAPER = {
        slug: 'mental-health',
        topic: 'Mental Health',
        title: 'Youth Mental Health in Kenya: From Listening to Implementation',
        subtitle: 'A youth-led framework for accessible, affordable and youth-friendly mental-health support',
        status: 'Published',
        published_at: '2026-08-01',
        reading_time: '18 min read',
        authors: 'PolicyBridge KE Policy Lab',
        edition: 'Policy Challenge II · August 2026'
    };

    $: paper = data?.paper ?? FALLBACK_PAPER;

    const sections = [
        { id: 'core-proposition', label: 'Core Proposition' },
        { id: 'executive-summary', label: 'Executive Summary' },
        { id: 'policy-problem', label: 'The Policy Problem' },
        { id: 'methodology', label: 'Methodology & Data' },
        { id: 'what-youth-told-us', label: 'What Young People Told Us' },
        { id: 'priorities', label: 'Where Youth Want Action' },
        { id: 'help-seeking', label: 'Where Youth Seek Help' },
        { id: 'barriers', label: 'Barriers to Help-Seeking' },
        { id: 'economic-security', label: 'Mental Health & Economic Security' },
        { id: 'framework', label: 'The Four-Pillar Framework' },
        { id: 'financing', label: 'Financing & Accountability' },
        { id: 'roadmap', label: 'Implementation Roadmap' },
        { id: 'risks', label: 'Risks & Mitigation' },
        { id: 'alignment', label: 'Policy & Legal Alignment' },
        { id: 'measurement', label: 'What Should Be Measured' },
        { id: 'conclusion', label: 'Conclusion' }
    ];

    let activeSection = 'core-proposition';
    let readingProgress = 0;
    let copied = false;

    onMount(() => {
        // Reading progress
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            readingProgress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();

        // Scroll spy
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    activeSection = visible[0].target.id;
                }
            },
            { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
        );

        sections.forEach(s => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', updateProgress);
            observer.disconnect();
        };
    });

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        } catch (e) {
            // clipboard unavailable
        }
    }

    function scrollToSection(id) {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({ top, behavior: 'smooth' });
        }
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
    <title>{paper.title} — PolicyBridge Kenya</title>
    <meta name="description" content={paper.subtitle} />
    <meta property="og:title" content={paper.title} />
    <meta property="og:description" content={paper.subtitle} />
    <meta property="og:type" content="article" />
</svelte:head>

<!-- Reading progress bar -->
<div class="progress-track" aria-hidden="true">
    <div class="progress-bar" style={`width: ${readingProgress}%`}></div>
</div>

<div class="page">
    <!-- Breadcrumb -->
    <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/position">← Position Papers</a>
    </nav>

    <!-- Hero -->
    <header class="paper-hero">
        <div class="hero-meta">
            <span class="topic-tag">{paper.topic}</span>
            <span class="hero-status">{paper.status}</span>
        </div>
        <h1>{paper.title}</h1>
        <p class="paper-subtitle">{paper.subtitle}</p>

        <div class="hero-meta-row">
            <span>{formatDate(paper.published_at)}</span>
            <span class="dot">·</span>
            <span>{paper.reading_time}</span>
            <span class="dot">·</span>
            <span>{paper.authors}</span>
        </div>

        <div class="hero-actions">
            <button class="btn btn-secondary" on:click={copyLink}>
                {#if copied}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Link copied
                {:else}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                    </svg>
                    Share
                {/if}
            </button>
        </div>
    </header>

    <!-- Body layout: sticky TOC + content -->
    <div class="paper-layout">
        <!-- Table of Contents -->
        <aside class="toc" aria-label="Table of contents">
            <h2 class="toc-heading">Contents</h2>
            <nav>
                <ol class="toc-list">
                    {#each sections as section}
                        <li>
                            <a
                                href={`#${section.id}`}
                                class:active={activeSection === section.id}
                                on:click|preventDefault={() => scrollToSection(section.id)}
                            >
                                {section.label}
                            </a>
                        </li>
                    {/each}
                </ol>
            </nav>
        </aside>

        <!-- Main content -->
        <main class="paper-body">
            <!-- Core Proposition -->
            <section id="core-proposition" class="section">
                <div class="proposition">
                    <span class="proposition-label">Core Proposition</span>
                    <p>
                        Kenya should move mental-health support closer to where young people live,
                        learn, work and socialise, while making care affordable, confidential,
                        non-judgmental and connected to specialist support.
                    </p>
                </div>
            </section>

            <!-- Executive Summary -->
            <section id="executive-summary" class="section">
                <h2>Executive Summary</h2>

                <div class="summary-block">
                    <h3>The policy problem</h3>
                    <p>
                        Kenya has an established policy and legal basis for mental-health reform,
                        including a statutory direction toward community-based care and mental-health
                        services in primary health facilities. Yet access remains a central
                        implementation concern. The National Youth Consultation conducted by
                        PolicyBridge KE recorded an average access-to-affordable-services score of
                        only <strong>2.87/10</strong>; 51 of 78 respondents (65.4%) rated access at 1–3/10.
                    </p>
                </div>

                <div class="summary-block">
                    <h3>What young people told us</h3>
                    <p>
                        Economic insecurity was the dominant reported pressure: financial stress was
                        selected by 61 respondents (78.2%) and unemployment by 58 (74.4%). Social
                        media (26), relationship challenges (23) and family conflict (20) were also
                        prominent. These findings do not establish causation, but they show that
                        participants understand mental well-being as closely connected to livelihoods,
                        education, relationships and digital environments.
                    </p>
                </div>

                <div class="summary-block">
                    <h3>What young people prioritised</h3>
                    <p>
                        Mental-health education in schools was the most selected government priority
                        (44 respondents), followed by youth-friendly services (37) and more community
                        counselling centres (29). Safe youth spaces (21), digital counselling platforms
                        (19) and peer-support programmes (18) also featured prominently.
                    </p>
                </div>

                <div class="summary-block">
                    <h3>What the solutions add</h3>
                    <p>
                        The Policy Lab submissions translate these priorities into practical
                        interventions: ward-level integration of basic mental-health support;
                        institutional access points in schools, TVETs and universities; peer-led and
                        community-based support; Mtaani Skill &amp; Vibe Hubs; and a Creative
                        Prescription Programme. PolicyBridge KE synthesises these proposals into a
                        four-pillar framework rather than presenting the four submissions as competing
                        interventions.
                    </p>
                </div>

                <div class="ask-callout">
                    <h3>The Policy Ask</h3>
                    <p>
                        Kenya should move from a predominantly specialist, facility-centred model
                        towards a connected youth mental-health system: prevent and identify distress
                        early; provide basic support close to home and within institutions; create
                        credible referral pathways; use digital tools to extend human care; and make
                        financing and performance visible.
                    </p>
                </div>

                <!-- Key numbers -->
                <div class="key-numbers">
                    <div class="stat">
                        <span class="stat-value">78</span>
                        <span class="stat-label">Consultation responses</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">20</span>
                        <span class="stat-label">Counties represented</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">2.87/10</span>
                        <span class="stat-label">Mean access score</span>
                    </div>
                </div>
            </section>

            <!-- Policy Problem -->
            <section id="policy-problem" class="section">
                <h2>1. The Policy Problem</h2>

                <p>
                    Kenya has a policy direction on mental health. The Constitution of Kenya
                    guarantees the right to the highest attainable standard of health. The Mental
                    Health Act, as amended in 2022, gives statutory recognition to a right to
                    accessible and affordable mental-health services and prioritises community health
                    and outpatient primary mental-health care. It also places specific responsibilities
                    on county governments for mental-health services, community-based care, financing,
                    personnel and stigma-reduction programmes.
                </p>

                <p>
                    The implementation question is therefore central. Kenya's own policy and legal
                    framework points toward prevention, early intervention, community care and
                    integration into primary health services. The youth evidence gathered by
                    PolicyBridge KE suggests that young people continue to experience the system as
                    distant, costly, difficult to navigate and insufficiently youth-friendly.
                </p>

                <p>
                    The financing gap is longstanding. Kenya's Ministry of Health has previously
                    identified inadequate mental-health financing as a major barrier to integration,
                    while the Kenya Mental Health Investment Case documented substantial
                    underinvestment and the economic costs of untreated mental-health conditions.
                    Because published estimates vary by year and denominator, this brief does not
                    treat the Policy Challenge's '&lt;0.05%' figure as a current national budget
                    statistic. The policy conclusion is nevertheless clear: mental-health financing
                    requires identifiable allocations, transparent expenditure reporting and stronger
                    alignment between national policy and county implementation.
                </p>

                <div class="callout callout-neutral">
                    <h4>Why the youth perspective matters</h4>
                    <p>
                        Young people: formal participation in design, implementation monitoring and
                        accountability, including through a standing youth advisory mechanism.
                    </p>
                </div>

                <div class="callout callout-green">
                    <h4>The implementation gap</h4>
                    <p>
                        The challenge is not simply to add more specialist services. It is to connect
                        prevention, early identification, basic support, referral and specialist care
                        across the places young people already use.
                    </p>
                </div>
            </section>

            <!-- Methodology -->
            <section id="methodology" class="section">
                <h2>2. Methodology and Data</h2>

                <p>
                    Three youth engagement methods were used, each with a distinct purpose. They were
                    analysed separately, then considered together to develop the policy framework.
                </p>

                <div class="method-table">
                    <div class="method-row method-head">
                        <div>Method</div>
                        <div>Purpose</div>
                        <div>Treatment of Evidence</div>
                    </div>
                    <div class="method-row">
                        <div><strong>Policy Lab Submissions</strong></div>
                        <div>Crowdsource practical, youth-led solutions to the Policy Challenge.</div>
                        <div>Submissions were screened for relevance and completeness; incomplete submissions were excluded. Four solutions were selected for policy synthesis.</div>
                    </div>
                    <div class="method-row">
                        <div><strong>Community Meetings</strong></div>
                        <div>Capture lived experience, concerns and priorities through discussion.</div>
                        <div>Discussion notes reviewed and summarised thematically. Findings are qualitative and contextual, not statistically representative.</div>
                    </div>
                    <div class="method-row">
                        <div><strong>National Youth Consultation</strong></div>
                        <div>Generate quantitative and open-ended evidence on experiences, access and policy priorities.</div>
                        <div>78 online responses across 20 counties analysed using descriptive statistics and thematic coding of open-ended responses.</div>
                    </div>
                </div>

                <h3>National Youth Consultation</h3>
                <p>
                    The online consultation ran from 16 July to 1 August 2026 and received 78
                    responses from participants reporting residence in 20 counties. The questionnaire
                    covered perceived drivers of mental-health challenges, access to affordable
                    services, barriers to seeking support, help-seeking channels, government
                    priorities and recommendations for policy action. Closed-ended questions were
                    analysed using frequencies and percentages. Multiple-response questions are
                    non-exclusive, so percentages may exceed 100%. Open-ended responses were
                    thematically reviewed.
                </p>

                <h3>Interpretation and limitations</h3>
                <ol class="limitations-list">
                    <li>The consultation is a rapid policy listening exercise, not a prevalence survey and not a statistically representative sample of Kenya's youth population.</li>
                    <li>Participation was voluntary and online, creating potential self-selection and digital-access bias.</li>
                    <li>Self-reported responses reflect participants' perceptions and experiences; they do not constitute clinical diagnoses.</li>
                    <li>Thematic coding of open-text responses identifies policy signals. It is not a validated clinical coding framework.</li>
                    <li>Platform submissions are self-selected proposals and should not be interpreted as a quantitative ranking of youth preferences.</li>
                </ol>

                <h3>Who participated</h3>
                <p>
                    The consultation received 78 responses from participants in 20 counties. The
                    sample was predominantly young adults aged 18–30, and students and unemployed
                    respondents together accounted for 55 participants (70.5%). Nairobi City
                    accounted for 31 responses (39.7%), with the remaining responses distributed
                    across 19 other counties. This profile matters for interpretation: the
                    consultation provides a particularly strong signal from young people navigating
                    education and labour-market transitions, but it remains too small and
                    self-selected to represent all Kenyan youth.
                </p>

                <div class="profile-grid">
                    <div class="profile-card">
                        <h4>Age</h4>
                        <ul>
                            <li><span>18–24</span><strong>39 (50.0%)</strong></li>
                            <li><span>25–30</span><strong>22 (28.2%)</strong></li>
                            <li><span>31–35</span><strong>9 (11.5%)</strong></li>
                            <li><span>Above 35</span><strong>8 (10.3%)</strong></li>
                        </ul>
                    </div>
                    <div class="profile-card">
                        <h4>Employment</h4>
                        <ul>
                            <li><span>Student</span><strong>36 (46.2%)</strong></li>
                            <li><span>Unemployed</span><strong>19 (24.4%)</strong></li>
                            <li><span>Employed</span><strong>13 (16.7%)</strong></li>
                            <li><span>Self-employed</span><strong>7 (9.0%)</strong></li>
                        </ul>
                    </div>
                </div>

                <p class="profile-note">
                    <strong>Geographic spread:</strong> Nairobi City (31), Kiambu (12), Nakuru (6),
                    Uasin Gishu (5), Busia (3), and 15 additional counties with one or more respondents.
                </p>
            </section>

            <!-- What youth told us -->
            <section id="what-youth-told-us" class="section">
                <h2>3. What Young People Told Us</h2>

                <p>
                    The consultation points to a three-part problem: the pressures affecting well-being
                    are strongly socio-economic and relational; perceived access to affordable care is
                    low; and young people favour prevention, proximity and youth-friendly entry points.
                </p>

                <h3>Economic pressures are central</h3>
                <p>
                    61 respondents (78.2%) selected financial stress, and 58 (74.4%) selected
                    unemployment. Social media (26), relationship challenges (23) and family conflict
                    (20) were also frequently selected. These responses do not establish causation or
                    diagnose mental-health conditions. They do, however, indicate that young
                    participants experience mental well-being closely linked to livelihoods,
                    relationships, education, and digital environments.
                </p>

                <div class="pressures-list">
                    <div class="pressure-row">
                        <div class="pressure-bar-wrap">
                            <span class="pressure-label">Financial stress</span>
                            <div class="pressure-bar"><div style="width: 78.2%"></div></div>
                        </div>
                        <span class="pressure-value">61 · 78.2%</span>
                    </div>
                    <div class="pressure-row">
                        <div class="pressure-bar-wrap">
                            <span class="pressure-label">Unemployment</span>
                            <div class="pressure-bar"><div style="width: 74.4%"></div></div>
                        </div>
                        <span class="pressure-value">58 · 74.4%</span>
                    </div>
                    <div class="pressure-row">
                        <div class="pressure-bar-wrap">
                            <span class="pressure-label">Social media</span>
                            <div class="pressure-bar"><div style="width: 33.3%"></div></div>
                        </div>
                        <span class="pressure-value">26 · 33.3%</span>
                    </div>
                    <div class="pressure-row">
                        <div class="pressure-bar-wrap">
                            <span class="pressure-label">Relationship challenges</span>
                            <div class="pressure-bar"><div style="width: 29.5%"></div></div>
                        </div>
                        <span class="pressure-value">23 · 29.5%</span>
                    </div>
                    <div class="pressure-row">
                        <div class="pressure-bar-wrap">
                            <span class="pressure-label">Family conflict</span>
                            <div class="pressure-bar"><div style="width: 25.6%"></div></div>
                        </div>
                        <span class="pressure-value">20 · 25.6%</span>
                    </div>
                </div>

                <h3>Access is perceived as weak</h3>
                <p>
                    The mean rating for access to affordable mental-health services was 2.87/10.
                    Fifty-one respondents (65.4%) rated access between 1 and 3, including 32 who gave
                    the lowest rating of 1. Only seven respondents (9.0%) rated access at 7 or above.
                    The distribution suggests that participants strongly perceive affordable,
                    accessible services as difficult to obtain.
                </p>

                <div class="callout callout-neutral">
                    <h4>What this means for policy</h4>
                    <p>
                        The consultation does not call for a single new programme. It points toward a
                        connected access system: mental-health literacy and prevention; accessible
                        community and primary-care support; trusted peer and institutional entry
                        points; and referral pathways to qualified professionals.
                    </p>
                </div>
            </section>

            <!-- Priorities -->
            <section id="priorities" class="section">
                <h2>4. Where Young People Want Government to Act</h2>

                <p>
                    The strongest government priorities were mental-health education in schools (44),
                    youth-friendly services (37), more community counselling centres (29), safe youth
                    spaces (21), digital counselling platforms (19) and peer support programmes (18).
                </p>

                <div class="priorities-grid">
                    <div class="priority-card">
                        <span class="priority-rank">1</span>
                        <span class="priority-name">Mental-health education in schools</span>
                        <span class="priority-count">44</span>
                    </div>
                    <div class="priority-card">
                        <span class="priority-rank">2</span>
                        <span class="priority-name">Youth-friendly services</span>
                        <span class="priority-count">37</span>
                    </div>
                    <div class="priority-card">
                        <span class="priority-rank">3</span>
                        <span class="priority-name">More community counselling centres</span>
                        <span class="priority-count">29</span>
                    </div>
                    <div class="priority-card">
                        <span class="priority-rank">4</span>
                        <span class="priority-name">Safe youth spaces</span>
                        <span class="priority-count">21</span>
                    </div>
                    <div class="priority-card">
                        <span class="priority-rank">5</span>
                        <span class="priority-name">Digital counselling platforms</span>
                        <span class="priority-count">19</span>
                    </div>
                    <div class="priority-card">
                        <span class="priority-rank">6</span>
                        <span class="priority-name">Peer support programmes</span>
                        <span class="priority-count">18</span>
                    </div>
                </div>

                <p>
                    The priority pattern is coherent. The leading preference, mental-health education
                    in schools, is preventive. The next priorities, youth-friendly services and
                    community counselling centres, focus on proximity and access. Safe spaces,
                    digital counselling and peer support point to demand for lower-stigma routes into
                    support.
                </p>
            </section>

            <!-- Help-seeking -->
            <section id="help-seeking" class="section">
                <h2>5. Where Young People Seek Help</h2>

                <p>
                    Help-seeking is already distributed across informal and digital channels.
                </p>

                <div class="help-channels">
                    <div class="channel-row">
                        <span class="channel-name">Friends</span>
                        <span class="channel-count">48</span>
                    </div>
                    <div class="channel-row channel-highlight">
                        <span class="channel-name">AI tools (ChatGPT, etc.)</span>
                        <span class="channel-count">42</span>
                    </div>
                    <div class="channel-row">
                        <span class="channel-name">Social media</span>
                        <span class="channel-count">25</span>
                    </div>
                    <div class="channel-row">
                        <span class="channel-name">Family</span>
                        <span class="channel-count">13</span>
                    </div>
                    <div class="channel-row">
                        <span class="channel-name">Church</span>
                        <span class="channel-count">12</span>
                    </div>
                    <div class="channel-row">
                        <span class="channel-name">Psychologists</span>
                        <span class="channel-count">8</span>
                    </div>
                </div>

                <div class="callout callout-amber">
                    <h4>A finding that demands policy attention</h4>
                    <p>
                        <strong>AI tools are now the second most common help-seeking channel</strong>
                        for young Kenyans, after friends, and surpassing family, religious
                        institutions, and professional psychologists. Informal and digital channels
                        are already part of the youth support environment. They must be connected to
                        safe, confidential and professionally supervised referral pathways.
                    </p>
                </div>

                <p>
                    These figures should be interpreted as channels mentioned by respondents, not
                    exclusive preferences or measures of effectiveness.
                </p>
            </section>

            <!-- Barriers -->
            <section id="barriers" class="section">
                <h2>6. Barriers to Help-Seeking</h2>

                <p>
                    Open-ended responses repeatedly pointed to four interconnected barriers. The
                    responses should be read as qualitative signals rather than a statistically
                    ranked list. Together, they reinforce the case for services that are confidential,
                    affordable, easy to navigate and located in settings that young people already
                    trust.
                </p>

                <div class="barriers-grid">
                    <div class="barrier-card">
                        <span class="barrier-number">01</span>
                        <h4>Stigma and fear of judgement</h4>
                    </div>
                    <div class="barrier-card">
                        <span class="barrier-number">02</span>
                        <h4>Limited awareness of where and how to obtain support</h4>
                    </div>
                    <div class="barrier-card">
                        <span class="barrier-number">03</span>
                        <h4>Cost and affordability</h4>
                    </div>
                    <div class="barrier-card">
                        <span class="barrier-number">04</span>
                        <h4>Concerns about trust, confidentiality and quality of services</h4>
                    </div>
                </div>

                <div class="callout callout-green">
                    <h4>Design principle</h4>
                    <p>
                        Youth-friendly care must reduce the social and practical cost of asking for
                        help: it should be confidential, affordable, non-judgmental, easy to find and
                        connected to a qualified human referral pathway.
                    </p>
                </div>
            </section>

            <!-- Economic security -->
            <section id="economic-security" class="section">
                <h2>7. Mental Health and Economic Security</h2>

                <p>
                    The consultation also points to a policy issue beyond the health sector. Financial
                    stress and unemployment were the two most frequently selected pressures.
                    Mental-health policy should therefore be coordinated with youth employment,
                    skills, enterprise development and social protection policies.
                </p>

                <p>
                    This does not mean treating economic insecurity as a clinical condition; it means
                    recognising social and economic conditions as part of the policy environment that
                    produces and protects mental well-being. Kenya's mental-health framework itself
                    calls for action on determinants and cross-sectoral prevention, while WHO guidance
                    supports collaboration across health, education, employment and social-protection
                    systems.
                </p>

                <div class="crosssector-table">
                    <div class="cs-row">
                        <div class="cs-priority">Youth employment and livelihoods</div>
                        <div>Strengthen access to employment, apprenticeships, skills and decent-work pathways, particularly for young people transitioning from education into the labour market.</div>
                    </div>
                    <div class="cs-row">
                        <div class="cs-priority">Youth enterprise and financial inclusion</div>
                        <div>Improve access to affordable and responsible finance, business support and market opportunities, building on PolicyBridge KE's youth access-to-capital work.</div>
                    </div>
                    <div class="cs-row">
                        <div class="cs-priority">Social protection</div>
                        <div>Ensure vulnerable and unemployed young people can access appropriate social-protection and referral mechanisms without stigma or unnecessary administrative barriers.</div>
                    </div>
                    <div class="cs-row">
                        <div class="cs-priority">Workplace and livelihood settings</div>
                        <div>Extend mental-health literacy, prevention and referral mechanisms to workplaces and youth enterprise programmes, consistent with existing workplace mental-wellness guidance.</div>
                    </div>
                </div>
            </section>

            <!-- Framework -->
            <section id="framework" class="section">
                <h2>8. The Youth Mental Health Access and Prevention Framework</h2>

                <p>
                    PolicyBridge KE proposes four mutually reinforcing pillars. The framework
                    synthesises the National Youth Consultation, Community Meetings and the four
                    youth-generated Policy Lab solutions. It is designed to strengthen, not duplicate,
                    Kenya's existing health, education, and community systems.
                </p>

                <div class="pillars">
                    <div class="pillar">
                        <div class="pillar-head">
                            <span class="pillar-num">I</span>
                            <h3>Bring Mental Health to the Ward</h3>
                        </div>
                        <div class="pillar-block">
                            <h4>Policy action</h4>
                            <p>Integrate basic screening, psychological first aid, brief support and referral into primary healthcare; train CHPs and nurses; link facilities to county specialists; and use youth peer champions for navigation and follow-up.</p>
                        </div>
                        <div class="pillar-block">
                            <h4>Institutional responsibility</h4>
                            <p><strong>Lead:</strong> Ministry of Health and County Departments of Health. <strong>Support:</strong> professional bodies, youth organisations and development partners.</p>
                        </div>
                        <div class="pillar-block pillar-indicator">
                            <h4>Accountability indicator</h4>
                            <p>Proportion of participating primary-care facilities offering defined mental-health screening/support and functioning referral pathways.</p>
                        </div>
                    </div>

                    <div class="pillar">
                        <div class="pillar-head">
                            <span class="pillar-num">II</span>
                            <h3>Make Education and Training Institutions Access Points</h3>
                        </div>
                        <div class="pillar-block">
                            <h4>Policy action</h4>
                            <p>Establish or strengthen mental-health desks in secondary schools, TVETs and universities; provide mental-health literacy and help-seeking information; train peer educators within safeguarding frameworks; and establish referral links to health services.</p>
                        </div>
                        <div class="pillar-block">
                            <h4>Institutional responsibility</h4>
                            <p><strong>Lead:</strong> Ministry of Education, training institutions and County education structures, in coordination with health authorities.</p>
                        </div>
                        <div class="pillar-block pillar-indicator">
                            <h4>Accountability indicator</h4>
                            <p>Institutions with functioning support, referral and safeguarding arrangements — not merely designated desks.</p>
                        </div>
                    </div>

                    <div class="pillar">
                        <div class="pillar-head">
                            <span class="pillar-num">III</span>
                            <h3>Build Community Safe Spaces and Creative Prevention</h3>
                        </div>
                        <div class="pillar-block">
                            <h4>Policy action</h4>
                            <p>Pilot Mtaani Skill &amp; Vibe Hubs in selected wards, using four tracks: Creative; Skill &amp; Hustle; Movement &amp; Body; and Social. Pilot a Creative Prescription Programme through which appropriate referrals can lead to structured, time-bound creative projects with professional check-ins.</p>
                        </div>
                        <div class="pillar-block">
                            <h4>Institutional responsibility</h4>
                            <p><strong>Lead:</strong> County Governments and youth-led/CSO partners. <strong>Support:</strong> local creatives, universities and responsible private-sector/CSR partners.</p>
                        </div>
                        <div class="pillar-block pillar-indicator">
                            <h4>Accountability indicator</h4>
                            <p>Participation, retention, referrals completed and participant-reported well-being/connection outcomes.</p>
                        </div>
                    </div>

                    <div class="pillar">
                        <div class="pillar-head">
                            <span class="pillar-num">IV</span>
                            <h3>Connect Digital, Crisis and Specialist Support</h3>
                        </div>
                        <div class="pillar-block">
                            <h4>Policy action</h4>
                            <p>Strengthen an integrated digital access and referral layer using web, SMS and messaging channels, with confidential triage, clear escalation protocols and referral to qualified human support. Digital and AI tools should supplement, not replace, professional care. The design should include low-bandwidth and non-smartphone pathways to avoid reproducing digital exclusion.</p>
                        </div>
                        <div class="pillar-block">
                            <h4>Institutional responsibility</h4>
                            <p><strong>Lead:</strong> Ministry of Health and relevant digital-health institutions, with county and specialist-provider linkages.</p>
                        </div>
                        <div class="pillar-block pillar-indicator">
                            <h4>Accountability indicator</h4>
                            <p>Successful connection to qualified support, referral completion and response times for urgent cases.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Financing -->
            <section id="financing" class="section">
                <h2>9. Financing, Accountability and Youth Governance</h2>

                <p>
                    Implementation will fail if mental health remains visible in policy documents but
                    difficult to identify in budgets and performance reports. The response should
                    therefore focus on financing that is identifiable, traceable and linked to
                    measurable service delivery.
                </p>

                <div class="reform-table">
                    <div class="reform-row reform-head">
                        <div>Reform</div>
                        <div>What should change</div>
                    </div>
                    <div class="reform-row">
                        <div class="reform-name">Make mental-health expenditure visible</div>
                        <div>National and county health plans and budgets should identify mental-health allocations and programmes clearly enough to track them from allocation to expenditure and service delivery.</div>
                    </div>
                    <div class="reform-row">
                        <div class="reform-name">Publish implementation data</div>
                        <div>Annual public reporting should include selected indicators such as facilities offering services, trained frontline workers, youth uptake, referral completion and waiting times.</div>
                    </div>
                    <div class="reform-row">
                        <div class="reform-name">Link financing to service standards</div>
                        <div>Funding should support defined packages of prevention, early identification, basic support and referral rather than only infrastructure or specialist institutions.</div>
                    </div>
                    <div class="reform-row">
                        <div class="reform-name">Strengthen youth accountability</div>
                        <div>Formalise meaningful youth participation in programme design, monitoring and evaluation, including paid participation where young people provide substantive expertise.</div>
                    </div>
                </div>

                <h3>Youth governance and accountability</h3>
                <p>
                    Institutionalise youth participation rather than limit it to consultation.
                    PolicyBridge KE recommends a standing Youth Mental Health Advisory mechanism at
                    national and county levels, with transparent terms of reference and meaningful
                    participation in programme design, budgeting priorities, monitoring and
                    evaluation. Participation should include rural and marginalised youth and should
                    be appropriately supported or compensated when young people provide substantive
                    policy or technical input.
                </p>
            </section>

            <!-- Roadmap -->
            <section id="roadmap" class="section">
                <h2>10. Implementation Roadmap</h2>

                <div class="roadmap-table">
                    <div class="rm-row rm-head">
                        <div>Reform area</div>
                        <div>0–6 months</div>
                        <div>6–18 months</div>
                        <div>18–36 months</div>
                    </div>
                    <div class="rm-row">
                        <div class="rm-area">Primary care</div>
                        <div>Issue implementation guidance; define service package, screening and referral tools; select pilot counties.</div>
                        <div>Train CHPs/nurses; implement pilots; establish specialist referral links and supervision.</div>
                        <div>Evaluate and scale the model through county planning.</div>
                    </div>
                    <div class="rm-row">
                        <div class="rm-area">Education</div>
                        <div>Develop minimum standards, safeguarding and referral guidance.</div>
                        <div>Establish/strengthen institutional support and referral arrangements in pilot institutions.</div>
                        <div>Scale effective models and integrate indicators into routine oversight.</div>
                    </div>
                    <div class="rm-row">
                        <div class="rm-area">Community &amp; creative</div>
                        <div>Map existing youth spaces and partners; co-design hub and Creative Prescription pilots.</div>
                        <div>Launch pilots; train peer facilitators; monitor participation and referrals.</div>
                        <div>Scale high-performing models and embed them in county plans.</div>
                    </div>
                    <div class="rm-row">
                        <div class="rm-area">Digital &amp; referral</div>
                        <div>Map existing digital/helpline assets; define clinical governance and escalation protocols.</div>
                        <div>Pilot integrated digital access and referral; monitor response and completion.</div>
                        <div>Expand coverage and integrate performance data into national monitoring.</div>
                    </div>
                    <div class="rm-row">
                        <div class="rm-area">Finance &amp; accountability</div>
                        <div>Create identifiable budget/reporting lines and baseline indicators.</div>
                        <div>Publish allocation, expenditure and coverage reporting.</div>
                        <div>Annual public scorecard and independent/participatory implementation review.</div>
                    </div>
                </div>
            </section>

            <!-- Risks -->
            <section id="risks" class="section">
                <h2>11. Implementation Risks and Mitigation</h2>

                <p>
                    The framework is deliberately phased because implementation risks are material.
                    The principal risks and practical mitigations are set out below.
                </p>

                <div class="risk-table">
                    <div class="risk-row risk-head">
                        <div>Risk</div>
                        <div>Likelihood</div>
                        <div>Impact</div>
                        <div>Mitigation</div>
                    </div>
                    <div class="risk-row">
                        <div class="risk-name">Financing shortfalls</div>
                        <div><span class="badge badge-high">High</span></div>
                        <div><span class="badge badge-high">High</span></div>
                        <div>Identifiable budget lines; expenditure tracking; phased pilots linked to evidence of results.</div>
                    </div>
                    <div class="risk-row">
                        <div class="risk-name">Workforce constraints</div>
                        <div><span class="badge badge-high">High</span></div>
                        <div><span class="badge badge-high">High</span></div>
                        <div>Task-sharing within defined scopes; supervision; training pipelines; specialist referral and tele-mental-health links.</div>
                    </div>
                    <div class="risk-row">
                        <div class="risk-name">Stigma and low uptake</div>
                        <div><span class="badge badge-high">High</span></div>
                        <div><span class="badge badge-high">High</span></div>
                        <div>Peer support; community dialogue; confidential service design; sustained public education.</div>
                    </div>
                    <div class="risk-row">
                        <div class="risk-name">Digital exclusion</div>
                        <div><span class="badge badge-medium">Medium</span></div>
                        <div><span class="badge badge-medium">Medium</span></div>
                        <div>SMS/USSD and other low-bandwidth options; community access points; avoid digital-only delivery.</div>
                    </div>
                    <div class="risk-row">
                        <div class="risk-name">Data protection and confidentiality</div>
                        <div><span class="badge badge-medium">Medium</span></div>
                        <div><span class="badge badge-high">High</span></div>
                        <div>Data-minimisation; consent; role-based access; secure systems; clear clinical escalation and governance protocols.</div>
                    </div>
                    <div class="risk-row">
                        <div class="risk-name">Institutional coordination</div>
                        <div><span class="badge badge-medium">Medium</span></div>
                        <div><span class="badge badge-high">High</span></div>
                        <div>Named responsibilities; intergovernmental coordination; common indicators and periodic public reporting.</div>
                    </div>
                </div>
            </section>

            <!-- Alignment -->
            <section id="alignment" class="section">
                <h2>12. Policy, Legal and Institutional Alignment</h2>

                <p>
                    The framework is intentionally implementation-oriented. It does not propose a
                    parallel mental-health system. It builds on Kenya's constitutional right to
                    health, the Mental Health Act as amended in 2022, the Health Act, the Kenya
                    Mental Health Policy 2015–2030 and the primary-healthcare and digital-health
                    architecture.
                </p>

                <p>
                    The Kenya Mental Health Action Plan 2021–2025 remains an important implementation
                    reference, but its stated implementation period has ended; the immediate policy
                    question is therefore how its relevant commitments are renewed, operationalised
                    and monitored beyond 2025. The Ministry of Health also published the National
                    Baseline Mental Health Survey in 2025, providing an important national evidence
                    base against which future youth-focused monitoring can be aligned.
                </p>

                <div class="alignment-table">
                    <div class="align-row">
                        <div class="align-name">Constitution of Kenya, Article 43</div>
                        <div>Right to the highest attainable standard of health and access to healthcare services.</div>
                    </div>
                    <div class="align-row">
                        <div class="align-name">Mental Health Act, Cap. 248, as amended in 2022</div>
                        <div>Accessible and affordable mental-health services; priority to community health and outpatient primary mental-health care; defined county responsibilities.</div>
                    </div>
                    <div class="align-row">
                        <div class="align-name">Health Act, Cap. 241</div>
                        <div>National/county health-system architecture and progressive access to promotive, preventive, curative, palliative and rehabilitative services.</div>
                    </div>
                    <div class="align-row">
                        <div class="align-name">Kenya Mental Health Policy 2015–2030</div>
                        <div>National framework for mental-health system reform.</div>
                    </div>
                    <div class="align-row">
                        <div class="align-name">Kenya Mental Health Action Plan 2021–2025</div>
                        <div>Implementation framework addressing governance, financing, service access, prevention and systems strengthening.</div>
                    </div>
                    <div class="align-row">
                        <div class="align-name">Primary Health Care Act, 2023 and Digital Health Act, 2023</div>
                        <div>Relevant statutory architecture for primary-care delivery and digital-health services.</div>
                    </div>
                </div>

                <div class="callout callout-green">
                    <h4>Policy window</h4>
                    <p>
                        Kenya now has both a strengthened statutory framework and a national baseline
                        survey. The opportunity is to translate those assets into measurable,
                        decentralised and youth-friendly implementation.
                    </p>
                </div>

                <h3>Institutional responsibilities</h3>
                <div class="institutional-table">
                    <div class="inst-row">
                        <div class="inst-name">Ministry of Health</div>
                        <div>Set standards and guidance; coordinate national monitoring; support workforce development; establish referral and digital-health governance.</div>
                    </div>
                    <div class="inst-row">
                        <div class="inst-name">County Governments</div>
                        <div>Implement ward-level services; allocate resources; support community programmes; monitor local performance.</div>
                    </div>
                    <div class="inst-row">
                        <div class="inst-name">Ministry of Education and institutions</div>
                        <div>Provide institutional support, literacy, safeguarding and referral arrangements.</div>
                    </div>
                    <div class="inst-row">
                        <div class="inst-name">National Treasury and county finance structures</div>
                        <div>Make mental-health allocations and expenditure sufficiently identifiable for accountability.</div>
                    </div>
                    <div class="inst-row">
                        <div class="inst-name">Youth-led organisations and CSOs</div>
                        <div>Co-design services; deliver peer/community components within appropriate standards; support engagement and monitoring.</div>
                    </div>
                    <div class="inst-row">
                        <div class="inst-name">Young people</div>
                        <div>Participate meaningfully in design, implementation, monitoring and accountability.</div>
                    </div>
                </div>
            </section>

            <!-- Measurement -->
            <section id="measurement" class="section">
                <h2>13. What Should Be Measured</h2>

                <p>
                    A youth mental-health strategy should measure access and outcomes, not merely
                    activity. PolicyBridge KE recommends a compact public scorecard built around five
                    questions:
                </p>

                <ol class="measurement-list">
                    <li>
                        <span class="m-num">1</span>
                        <div>
                            <h4>Reach</h4>
                            <p>How many primary facilities, schools, TVETs, universities and community hubs offer defined youth-friendly support?</p>
                        </div>
                    </li>
                    <li>
                        <span class="m-num">2</span>
                        <div>
                            <h4>Use</h4>
                            <p>How many young people use those services, disaggregated where appropriate by age, sex, location and institution?</p>
                        </div>
                    </li>
                    <li>
                        <span class="m-num">3</span>
                        <div>
                            <h4>Continuity</h4>
                            <p>What proportion of referrals are completed, and how quickly do young people move between levels of care?</p>
                        </div>
                    </li>
                    <li>
                        <span class="m-num">4</span>
                        <div>
                            <h4>Experience</h4>
                            <p>Do young people report that services are confidential, respectful, affordable and non-judgmental?</p>
                        </div>
                    </li>
                    <li>
                        <span class="m-num">5</span>
                        <div>
                            <h4>Resources</h4>
                            <p>What was allocated, what was spent, where was it spent, and what service coverage resulted?</p>
                        </div>
                    </li>
                </ol>

                <div class="callout callout-amber">
                    <h4>A practical accountability test</h4>
                    <p>
                        A programme should not be judged successful merely because a facility was
                        designated, a training was conducted, or a budget was approved. Success should
                        be demonstrated by whether young people can reach, use and benefit from
                        appropriate support.
                    </p>
                </div>
            </section>

            <!-- Conclusion -->
            <section id="conclusion" class="section">
                <h2>14. Conclusion: Listening Must Become Implementation</h2>

                <p>
                    The youth evidence points to a practical direction for reform. Participants
                    identified economic insecurity, social pressures and weak access to affordable
                    support as major concerns. They prioritised mental-health education, youth-friendly
                    services, community counselling, safe spaces, digital access and peer support. The
                    Policy Lab submissions then translated these concerns into practical models that
                    can be piloted and connected to existing systems.
                </p>

                <p>
                    The policy response should therefore be connected and proximate. Mental-health
                    support should be available through primary healthcare, educational institutions,
                    trusted community settings and safe digital pathways, with clear referral to
                    specialist care when required. Economic security should be treated as a
                    cross-sector determinant, while youth participation should be built into design,
                    budgeting, implementation and evaluation.
                </p>

                <p>
                    PolicyBridge KE's central proposition is straightforward: Kenya should build a
                    youth mental-health system in which a young person can recognise a need for
                    support, find a credible entry point close to where they live, learn or work,
                    receive appropriate early assistance, and move smoothly to higher levels of care
                    when necessary. The evidence gathered through this youth-led process provides a
                    practical starting point for that transition from policy commitment to
                    implementation.
                </p>

                <div class="immediate-priorities">
                    <h3>The Five Immediate Priorities</h3>
                    <ol>
                        <li>Integrate basic mental-health support and referral into primary healthcare.</li>
                        <li>Make schools, TVETs and universities active, safe access points.</li>
                        <li>Pilot community safe spaces and Creative Prescription pathways.</li>
                        <li>Connect digital and peer support to qualified human care and referral.</li>
                        <li>Align mental-health action with youth employment, livelihoods and social protection.</li>
                        <li>Make financing, performance and youth participation publicly traceable.</li>
                    </ol>
                </div>
            </section>

            <!-- Citation -->
            <section class="citation-section">
                <h3>Cite this paper</h3>
                <p class="citation-text">
                    PolicyBridge KE. (2026). <em>{paper.title}</em>. Policy Challenge II:
                    Youth-Led Solutions for Kenya's Mental Health Crisis. Nairobi: PolicyBridge KE.
                </p>
                <button class="btn btn-secondary btn-small" on:click={copyLink}>
                    {#if copied}
                        Citation copied
                    {:else}
                        Copy link
                    {/if}
                </button>
            </section>

            <!-- Page footer -->
            <div class="page-footer">
                <a href="/position" class="back-link">← Back to all Position Papers</a>
                <a href="mailto:info@policybridgeke.org" class="contact-link">Contact PolicyBridge KE →</a>
            </div>
        </main>
    </div>
</div>

<style>
    .page {
        max-width: 1100px;
        margin: 0 auto;
        padding: 40px 24px 80px;
        font-family: system-ui, -apple-system, sans-serif;
        color: #1a1a1a;
    }

    /* Reading progress */
    .progress-track {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: transparent;
        z-index: 100;
    }

    .progress-bar {
        height: 100%;
        background: #064e3b;
        transition: width 0.1s linear;
    }

    /* Breadcrumb */
    .breadcrumb {
        margin-bottom: 32px;
    }

    .breadcrumb a {
        font-size: 0.82rem;
        font-weight: 600;
        color: #64748b;
        text-decoration: none;
    }

    .breadcrumb a:hover {
        color: #064e3b;
    }

    /* Hero */
    .paper-hero {
        margin-bottom: 56px;
        padding-bottom: 40px;
        border-bottom: 1px solid #e5e7eb;
    }

    .hero-meta {
        display: flex;
        gap: 10px;
        margin-bottom: 16px;
        flex-wrap: wrap;
    }

    .topic-tag {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #064e3b;
        background: #f0fdf4;
        padding: 4px 10px;
        border-radius: 4px;
    }

    .hero-status {
        font-size: 0.7rem;
        font-weight: 600;
        color: #0891b2;
        background: #ecfeff;
        padding: 4px 10px;
        border-radius: 4px;
    }

    .paper-hero h1 {
        font-size: 2.5rem;
        font-weight: 800;
        letter-spacing: -0.025em;
        line-height: 1.15;
        margin: 0 0 16px;
        max-width: 900px;
    }

    .paper-subtitle {
        font-size: 1.1rem;
        color: #555;
        line-height: 1.55;
        max-width: 720px;
        margin: 0 0 24px;
    }

    .hero-meta-row {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.82rem;
        color: #94a3b8;
        flex-wrap: wrap;
        margin-bottom: 28px;
    }

    .hero-meta-row .dot {
        color: #cbd5e1;
    }

    .hero-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 18px;
        border-radius: 7px;
        font-family: inherit;
        font-size: 0.85rem;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 0.15s;
    }

    .btn-secondary {
        background: white;
        color: #1a1a1a;
        border-color: #e5e7eb;
    }

    .btn-secondary:hover {
        border-color: #064e3b;
        color: #064e3b;
    }

    .btn-small {
        padding: 7px 14px;
        font-size: 0.8rem;
    }

    /* Layout */
    .paper-layout {
        display: grid;
        grid-template-columns: 210px 1fr;
        gap: 56px;
        align-items: start;
    }

    /* TOC */
    .toc {
        position: sticky;
        top: 40px;
        align-self: start;
        max-height: calc(100vh - 80px);
        overflow-y: auto;
        padding-right: 8px;
    }

    .toc-heading {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #94a3b8;
        margin: 0 0 14px;
    }

    .toc-list {
        list-style: none;
        padding: 0;
        margin: 0;
        border-left: 1px solid #e5e7eb;
    }

    .toc-list li {
        margin: 0;
    }

    .toc-list a {
        display: block;
        padding: 7px 0 7px 14px;
        margin-left: -1px;
        border-left: 2px solid transparent;
        font-size: 0.8rem;
        line-height: 1.35;
        color: #64748b;
        text-decoration: none;
        transition: all 0.15s;
    }

    .toc-list a:hover {
        color: #064e3b;
    }

    .toc-list a.active {
        color: #064e3b;
        font-weight: 600;
        border-left-color: #064e3b;
    }

    /* Body */
    .paper-body {
        max-width: 720px;
        min-width: 0;
    }

    .section {
        margin-bottom: 64px;
        scroll-margin-top: 80px;
    }

    .section h2 {
        font-size: 1.5rem;
        font-weight: 800;
        letter-spacing: -0.015em;
        margin: 0 0 20px;
        line-height: 1.25;
        color: #0f172a;
    }

    .section h3 {
        font-size: 1.05rem;
        font-weight: 700;
        margin: 28px 0 12px;
        color: #1a1a1a;
    }

    .section h4 {
        font-size: 0.95rem;
        font-weight: 700;
        margin: 0 0 8px;
    }

    .section p {
        font-size: 0.95rem;
        line-height: 1.75;
        color: #333;
        margin: 0 0 16px;
    }

    /* Core proposition */
    .proposition {
        padding: 28px 30px;
        background: linear-gradient(135deg, #064e3b 0%, #0a6b52 100%);
        border-radius: 12px;
        color: white;
    }

    .proposition-label {
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #6ee7b7;
        display: block;
        margin-bottom: 12px;
    }

    .proposition p {
        font-size: 1.1rem !important;
        line-height: 1.55 !important;
        color: white !important;
        margin: 0 !important;
        font-weight: 500;
    }

    /* Executive summary blocks */
    .summary-block {
        margin-bottom: 24px;
    }

    .summary-block h3 {
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #064e3b;
        margin: 0 0 8px;
        font-weight: 700;
    }

    /* Ask callout */
    .ask-callout {
        margin: 32px 0;
        padding: 24px 26px;
        background: #f0fdf4;
        border-left: 4px solid #064e3b;
        border-radius: 6px;
    }

    .ask-callout h3 {
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #064e3b;
        margin: 0 0 10px;
        font-weight: 700;
    }

    .ask-callout p {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.7;
        color: #1a1a1a;
    }

    /* Key numbers */
    .key-numbers {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 14px;
        margin-top: 32px;
    }

    .stat {
        padding: 20px 18px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        text-align: center;
    }

    .stat-value {
        display: block;
        font-size: 1.75rem;
        font-weight: 800;
        color: #064e3b;
        letter-spacing: -0.02em;
        line-height: 1;
        margin-bottom: 8px;
    }

    .stat-label {
        display: block;
        font-size: 0.75rem;
        color: #64748b;
        font-weight: 500;
        line-height: 1.3;
    }

    /* Callouts */
    .callout {
        margin: 24px 0;
        padding: 20px 22px;
        border-radius: 8px;
    }

    .callout h4 {
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 0 0 8px;
        font-weight: 700;
    }

    .callout p {
        margin: 0 !important;
        font-size: 0.9rem !important;
        line-height: 1.7 !important;
    }

    .callout-green {
        background: #f0fdf4;
        border-left: 4px solid #064e3b;
    }

    .callout-green h4 {
        color: #064e3b;
    }

    .callout-neutral {
        background: #f8fafc;
        border-left: 4px solid #94a3b8;
    }

    .callout-neutral h4 {
        color: #475569;
    }

    .callout-amber {
        background: #fffbeb;
        border-left: 4px solid #d97706;
    }

    .callout-amber h4 {
        color: #b45309;
    }

    /* Method table */
    .method-table {
        margin: 24px 0;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        overflow: hidden;
    }

    .method-row {
        display: grid;
        grid-template-columns: 1.1fr 1.4fr 1.8fr;
        gap: 18px;
        padding: 16px 20px;
        border-bottom: 1px solid #f1f5f9;
        font-size: 0.85rem;
        line-height: 1.55;
        color: #444;
    }

    .method-row:last-child {
        border-bottom: none;
    }

    .method-head {
        background: #f8fafc;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #475569;
    }

    .method-head > div {
        font-size: 0.7rem;
    }

    .method-row strong {
        color: #1a1a1a;
        font-weight: 700;
    }

    /* Limitations list */
    .limitations-list {
        counter-reset: lim;
        list-style: none;
        padding: 0;
        margin: 16px 0;
    }

    .limitations-list li {
        counter-increment: lim;
        position: relative;
        padding: 0 0 0 34px;
        margin-bottom: 12px;
        font-size: 0.9rem;
        line-height: 1.65;
        color: #444;
    }

    .limitations-list li::before {
        content: counter(lim);
        position: absolute;
        left: 0;
        top: 0;
        width: 22px;
        height: 22px;
        background: #f0fdf4;
        color: #064e3b;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.72rem;
        font-weight: 700;
    }

    /* Profile cards */
    .profile-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
        margin: 24px 0;
    }

    .profile-card {
        padding: 18px 20px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
    }

    .profile-card h4 {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #475569;
        margin: 0 0 12px;
    }

    .profile-card ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .profile-card li {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
        border-bottom: 1px solid #e5e7eb;
        font-size: 0.82rem;
    }

    .profile-card li:last-child {
        border-bottom: none;
    }

    .profile-card li span {
        color: #64748b;
    }

    .profile-card li strong {
        color: #1a1a1a;
        font-weight: 700;
    }

    .profile-note {
        font-size: 0.82rem !important;
        color: #64748b !important;
        line-height: 1.6 !important;
    }

    /* Pressure bars */
    .pressures-list {
        margin: 24px 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    .pressure-row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 16px;
        align-items: center;
    }

    .pressure-bar-wrap {
        min-width: 0;
    }

    .pressure-label {
        display: block;
        font-size: 0.82rem;
        color: #333;
        font-weight: 600;
        margin-bottom: 6px;
    }

    .pressure-bar {
        height: 8px;
        background: #f1f5f9;
        border-radius: 4px;
        overflow: hidden;
    }

    .pressure-bar > div {
        height: 100%;
        background: #064e3b;
        border-radius: 4px;
    }

    .pressure-value {
        font-size: 0.78rem;
        font-weight: 700;
        color: #064e3b;
        white-space: nowrap;
        align-self: end;
        padding-bottom: 8px;
    }

    /* Priorities grid */
    .priorities-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin: 24px 0;
    }

    .priority-card {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
    }

    .priority-rank {
        width: 26px;
        height: 26px;
        background: #064e3b;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.78rem;
        font-weight: 700;
        flex-shrink: 0;
    }

    .priority-name {
        flex: 1;
        font-size: 0.85rem;
        color: #333;
        font-weight: 500;
        line-height: 1.35;
    }

    .priority-count {
        font-size: 0.88rem;
        font-weight: 700;
        color: #064e3b;
    }

    /* Help channels */
    .help-channels {
        margin: 24px 0;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        overflow: hidden;
    }

    .channel-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 20px;
        border-bottom: 1px solid #f1f5f9;
        font-size: 0.88rem;
    }

    .channel-row:last-child {
        border-bottom: none;
    }

    .channel-name {
        color: #333;
    }

    .channel-count {
        font-weight: 700;
        color: #064e3b;
    }

    .channel-highlight {
        background: #fffbeb;
    }

    .channel-highlight .channel-name {
        font-weight: 700;
        color: #92400e;
    }

    .channel-highlight .channel-count {
        color: #b45309;
    }

    /* Barriers */
    .barriers-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin: 24px 0;
    }

    .barrier-card {
        padding: 18px 20px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
    }

    .barrier-number {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 700;
        color: #94a3b8;
        letter-spacing: 0.06em;
        margin-bottom: 8px;
    }

    .barrier-card h4 {
        font-size: 0.88rem;
        margin: 0;
        line-height: 1.45;
        color: #1a1a1a;
    }

    /* Cross-sector table */
    .crosssector-table,
    .reform-table,
    .alignment-table,
    .institutional-table {
        margin: 24px 0;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        overflow: hidden;
    }

    .cs-row {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 18px;
        padding: 16px 20px;
        border-bottom: 1px solid #f1f5f9;
        font-size: 0.85rem;
        line-height: 1.6;
        color: #444;
    }

    .cs-row:last-child {
        border-bottom: none;
    }

    .cs-priority {
        font-weight: 700;
        color: #1a1a1a;
        font-size: 0.85rem;
    }

    /* Reform table */
    .reform-row {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 18px;
        padding: 16px 20px;
        border-bottom: 1px solid #f1f5f9;
        font-size: 0.85rem;
        line-height: 1.6;
        color: #444;
    }

    .reform-row:last-child {
        border-bottom: none;
    }

    .reform-head {
        background: #f8fafc;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #475569;
    }

    .reform-head > div {
        font-size: 0.7rem;
    }

    .reform-name {
        font-weight: 700;
        color: #1a1a1a;
    }

    /* Pillars */
    .pillars {
        margin: 28px 0;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .pillar {
        padding: 24px 26px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        border-left: 4px solid #064e3b;
    }

    .pillar-head {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 20px;
        padding-bottom: 18px;
        border-bottom: 1px solid #f1f5f9;
    }

    .pillar-num {
        width: 36px;
        height: 36px;
        background: #064e3b;
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.95rem;
        font-weight: 800;
        flex-shrink: 0;
    }

    .pillar-head h3 {
        font-size: 1.02rem;
        font-weight: 700;
        margin: 0;
        line-height: 1.3;
        color: #0f172a;
    }

    .pillar-block {
        margin-bottom: 16px;
    }

    .pillar-block:last-child {
        margin-bottom: 0;
    }

    .pillar-block h4 {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #475569;
        margin: 0 0 6px;
        font-weight: 700;
    }

    .pillar-block p {
        font-size: 0.85rem !important;
        line-height: 1.65 !important;
        color: #444;
        margin: 0 !important;
    }

    .pillar-indicator {
        padding: 12px 14px;
        background: #f0fdf4;
        border-radius: 6px;
    }

    .pillar-indicator h4 {
        color: #064e3b;
    }

    .pillar-indicator p {
        color: #1a1a1a !important;
        font-weight: 500;
    }

    /* Roadmap */
    .roadmap-table {
        margin: 24px 0;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        overflow: hidden;
    }

    .rm-row {
        display: grid;
        grid-template-columns: 1fr 2fr 2fr 2fr;
        gap: 16px;
        padding: 16px 18px;
        border-bottom: 1px solid #f1f5f9;
        font-size: 0.78rem;
        line-height: 1.55;
        color: #444;
    }

    .rm-row:last-child {
        border-bottom: none;
    }

    .rm-head {
        background: #f8fafc;
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #475569;
    }

    .rm-head > div {
        font-size: 0.68rem;
    }

    .rm-area {
        font-weight: 700;
        color: #064e3b;
    }

    /* Risk table */
    .risk-table {
        margin: 24px 0;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        overflow: hidden;
    }

    .risk-row {
        display: grid;
        grid-template-columns: 1.3fr 0.7fr 0.7fr 2.3fr;
        gap: 14px;
        padding: 14px 18px;
        border-bottom: 1px solid #f1f5f9;
        font-size: 0.8rem;
        line-height: 1.55;
        color: #444;
        align-items: center;
    }

    .risk-row:last-child {
        border-bottom: none;
    }

    .risk-head {
        background: #f8fafc;
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #475569;
    }

    .risk-head > div {
        font-size: 0.68rem;
    }

    .risk-name {
        font-weight: 700;
        color: #1a1a1a;
    }

    .badge {
        display: inline-block;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.02em;
    }

    .badge-high {
        background: #fef2f2;
        color: #b91c1c;
    }

    .badge-medium {
        background: #fffbeb;
        color: #b45309;
    }

    /* Alignment table */
    .align-row {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 18px;
        padding: 14px 20px;
        border-bottom: 1px solid #f1f5f9;
        font-size: 0.84rem;
        line-height: 1.6;
        color: #444;
    }

    .align-row:last-child {
        border-bottom: none;
    }

    .align-name {
        font-weight: 700;
        color: #1a1a1a;
    }

    /* Institutional table */
    .inst-row {
        display: grid;
        grid-template-columns: 1.1fr 2.2fr;
        gap: 18px;
        padding: 14px 20px;
        border-bottom: 1px solid #f1f5f9;
        font-size: 0.84rem;
        line-height: 1.6;
        color: #444;
    }

    .inst-row:last-child {
        border-bottom: none;
    }

    .inst-name {
        font-weight: 700;
        color: #064e3b;
    }

    /* Measurement */
    .measurement-list {
        list-style: none;
        padding: 0;
        margin: 24px 0;
    }

    .measurement-list li {
        display: flex;
        gap: 16px;
        padding: 16px 0;
        border-bottom: 1px solid #f1f5f9;
        align-items: flex-start;
    }

    .measurement-list li:last-child {
        border-bottom: none;
    }

    .m-num {
        width: 30px;
        height: 30px;
        background: #064e3b;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.82rem;
        font-weight: 700;
        flex-shrink: 0;
    }

    .measurement-list h4 {
        font-size: 0.92rem;
        margin: 0 0 4px;
        color: #0f172a;
    }

    .measurement-list p {
        font-size: 0.85rem !important;
        color: #555;
        margin: 0 !important;
        line-height: 1.6 !important;
    }

    /* Immediate priorities */
    .immediate-priorities {
        margin: 32px 0 0;
        padding: 24px 26px;
        background: #064e3b;
        border-radius: 12px;
        color: white;
    }

    .immediate-priorities h3 {
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #6ee7b7;
        margin: 0 0 16px;
        font-weight: 700;
    }

    .immediate-priorities ol {
        margin: 0;
        padding-left: 20px;
    }

    .immediate-priorities li {
        font-size: 0.9rem;
        line-height: 1.6;
        color: white;
        margin-bottom: 10px;
        padding-left: 4px;
    }

    .immediate-priorities li:last-child {
        margin-bottom: 0;
    }

    /* Citation */
    .citation-section {
        margin: 64px 0 32px;
        padding: 24px 26px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
    }

    .citation-section h3 {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #475569;
        margin: 0 0 12px;
        font-weight: 700;
    }

    .citation-text {
        font-size: 0.85rem;
        line-height: 1.65;
        color: #444;
        margin: 0 0 16px;
    }

    /* Page footer */
    .page-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 28px;
        border-top: 1px solid #e5e7eb;
        gap: 20px;
        flex-wrap: wrap;
    }

    .back-link,
    .contact-link {
        font-size: 0.85rem;
        font-weight: 600;
        color: #064e3b;
        text-decoration: none;
    }

    .back-link:hover,
    .contact-link:hover {
        text-decoration: underline;
    }

    /* Responsive */
    @media (max-width: 960px) {
        .paper-layout {
            grid-template-columns: 1fr;
            gap: 32px;
        }

        .toc {
            position: static;
            max-height: none;
            padding: 20px 22px;
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
        }

        .toc-list {
            border-left: none;
        }

        .toc-list a {
            padding-left: 0;
            border-left: none;
        }

        .toc-list a.active {
            font-weight: 700;
        }
    }

    @media (max-width: 720px) {
        .page {
            padding: 24px 16px 60px;
        }

        .paper-hero h1 {
            font-size: 1.75rem;
        }

        .paper-subtitle {
            font-size: 1rem;
        }

        .section h2 {
            font-size: 1.25rem;
        }

        .key-numbers {
            grid-template-columns: 1fr;
        }

        .profile-grid,
        .priorities-grid,
        .barriers-grid {
            grid-template-columns: 1fr;
        }

        .method-row {
            grid-template-columns: 1fr;
            gap: 8px;
        }

        .method-head {
            display: none;
        }

        .method-row > div:first-child {
            font-weight: 700;
            color: #1a1a1a;
        }

        .cs-row,
        .reform-row,
        .align-row,
        .inst-row {
            grid-template-columns: 1fr;
            gap: 6px;
        }

        .reform-head,
        .risk-head {
            display: none;
        }

        .rm-row {
            grid-template-columns: 1fr;
            gap: 10px;
        }

        .rm-head {
            display: none;
        }

        .risk-row {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 16px 18px;
        }

        .risk-name {
            font-size: 0.9rem;
        }

        .risk-row > div:not(.risk-name) {
            font-size: 0.8rem;
        }

        .immediate-priorities ol {
            padding-left: 16px;
        }

        .page-footer {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>