<script>
    import { slide } from 'svelte/transition';

    /** @type {import('./$types').PageData} */
    export let data;

    $: articles = data?.articles || [];
    let expandedArticle = null;

    const publishedArticles = [
        {
            id: 1,
            title: "The Financing Gap: Why Most Young Kenyans Cannot Access Business Capital",
            category: "Economic Inclusion",
            author: "PolicyBridge KE Research Team",
            date: "July 2026",
            readTime: "8 min read",
            excerpt: "Young Kenyan entrepreneurs consistently rank access to capital as their primary barrier to business growth. Existing credit guarantee schemes reach less than 5 percent of their target market. The gap between policy intent and lived reality is not a funding problem. It is a structural design problem.",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
            content: [
                { type: 'paragraph', text: "Young Kenyan entrepreneurs consistently rank access to capital as their primary barrier to business growth. Youth unemployment is estimated at 35 to 40 percent. Approximately 80 percent of youth-led enterprises operate informally. Only about 15 percent of young entrepreneurs have ever accessed formal credit. Existing credit guarantee schemes, designed to de-risk lending to small businesses, reach less than 5 percent of their intended beneficiaries. The gap between policy intent and lived reality is not a funding problem. It is a structural design problem requiring structural solutions." },
                { type: 'infographic', image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop", caption: "Financial data visualization: structural barriers limiting youth access to formal credit in Kenya." },
                { type: 'heading', text: "Understanding the Barriers" },
                { type: 'paragraph', text: "Three interconnected failures lock youth out of Kenya's financial system. First, collateral requirements designed for salaried employees exclude young people who do not own land, vehicles, or fixed assets. A young entrepreneur with a viable business plan and consistent mobile money records is treated as higher risk than an older applicant with a title deed, regardless of business viability." },
                { type: 'paragraph', text: "Second, credit histories do not exist for most young Kenyans. The formal credit reference system captures bank loans and formal credit lines. It ignores mobile money transactions, SACCO contributions, utility payments, and informal lending circles — the very financial behaviours that demonstrate creditworthiness among youth." },
                { type: 'paragraph', text: "Third, business registration costs and procedural complexity push enterprises into informality. The time, money, and bureaucratic navigation required creates a perverse incentive: remain informal to survive, but stay invisible to formal finance. The result is a self-reinforcing cycle where youth cannot access credit because they lack collateral and credit history, cannot build credit history because they cannot access credit, and cannot formalize because formalization is costly." },
                { type: 'heading', text: "A Five-Pillar Reform Framework" },
                { type: 'paragraph', text: "PolicyBridge KE's analysis, drawing on our policy brief on youth access to capital and review of comparative models, identifies five interconnected reforms." },
                { type: 'subheading', text: "Pillar I: Youth Credit Guarantee Scheme" },
                { type: 'paragraph', text: "A de-risking instrument offering tiered government guarantees to private lenders, from 50 percent for lower-risk enterprises to 85 percent for first-time borrowers. This is structured risk-sharing rather than a subsidy. Loan disbursement would be asset-linked, ensuring capital is directed toward productive business investment rather than consumption." },
                { type: 'subheading', text: "Pillar II: Unified Digital Youth Capital Portal" },
                { type: 'paragraph', text: "A single online platform consolidating all youth financing programmes currently scattered across government agencies, development partners, and private initiatives. Young entrepreneurs would apply once, track applications in real time, and access public data on fund disbursement and outcomes." },
                { type: 'subheading', text: "Pillar III: Mentorship-Linked Lending" },
                { type: 'paragraph', text: "Access to larger loans tied to structured mentorship and business development support. Young entrepreneurs completing accredited programmes and demonstrating improved business practices would qualify for higher loan ceilings and better terms. Performance-based incentives, such as interest rate reductions for consistent repayment, would encourage responsible borrowing." },
                { type: 'subheading', text: "Pillar IV: Corporate Youth Procurement Targets" },
                { type: 'paragraph', text: "A policy requiring large firms to allocate 5 percent of procurement spend to certified youth-owned enterprises. At current procurement volumes, this could unlock an estimated KES 50 billion annually in market access. This is not a grant or subsidy. It is business opportunity through market access." },
                { type: 'subheading', text: "Pillar V: Credit Scoring System Reform" },
                { type: 'paragraph', text: "Introducing alternative data into credit scoring: mobile money transaction histories, consistent utility payments, SACCO savings patterns, and informal lending circle participation. A 'Youth First-Time Borrower' scoring model would assess creditworthiness differently for young people entering formal finance for the first time, using better data to make better lending decisions." },
                { type: 'heading', text: "Implementation Pathway" },
                { type: 'paragraph', text: "Implementation follows three phases. Phase one in 2026 focuses on legal and institutional setup: establishing a Youth Credit Guarantee Company through amendments to the Public Finance Management Act, updating CRB regulations to include alternative and positive credit data, and building the digital portal. Phase two from 2027 to 2028 pilots the framework in priority sectors with high youth enterprise concentration. Phase three from 2029 to 2030 scales nationally." },
                { type: 'heading', text: "Projected Outcomes" },
                { type: 'paragraph', text: "By 2030, the framework targets 40,000 youth enterprises funded, 80,000 jobs created, and over KES 100 billion in private sector lending unlocked. The broader objective is structural: moving youth economic policy from grant dependency to a market-driven financing ecosystem aligned with SDG 8 on Decent Work and Economic Growth, SDG 9 on Industry, Innovation and Infrastructure, and Kenya's Vision 2030 economic pillar." },
                { type: 'footnote', text: "This article is based on PolicyBridge KE's policy brief on youth access to capital, developed through internal research and analysis of publicly available data on youth enterprise financing in Kenya." }
            ]
        },
        {
            id: 2,
            title: "Beyond Tokenism: What Meaningful Youth Participation in Kenya's Policy Process Requires",
            category: "Governance & Civic Engagement",
            author: "PolicyBridge KE Research Team",
            date: "July 2026",
            readTime: "9 min read",
            excerpt: "Kenya's Constitution mandates public participation as a national value and requires county governments to ensure community involvement in decision making. Yet in practice, youth participation often amounts to attendance without influence. This article examines the structural barriers and the policy reforms required to move from performative consultation to genuine co-creation.",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
            content: [
                { type: 'paragraph', text: "Kenya's Constitution is unambiguous. Article 10 mandates public participation as a national value. Article 174 requires county governments to ensure community involvement in decision making. The Public Participation Act of 2018 further codifies these obligations. On paper, Kenya has one of Africa's strongest legal frameworks for citizen engagement in governance. In practice, the reality is different." },
                { type: 'paragraph', text: "A typical county budget hearing follows a predictable pattern. A government official reads a prepared document dense with technical language. Attendees receive a few minutes to respond. Comments are recorded. The forum concludes. Months later, the budget passes with limited evidence that citizen input influenced any line item. Young people who attend describe the experience as performative: present to observe, not to shape." },
                { type: 'heading', text: "The Structural Barriers" },
                { type: 'paragraph', text: "Information asymmetry is the first filter. Consultation notices appear in newspapers with limited youth readership, on noticeboards young people rarely visit, or on government websites with low public awareness. When documents are shared, they are often technical, lengthy, and available only in English shortly before the hearing. A university student in Nakuru or a young farmer in Kisumu has neither the time nor the technical background to process a 200-page budget document released three days before a consultation." },
                { type: 'paragraph', text: "Feedback opacity is the second barrier. Citizens who attend and submit input rarely learn what happened to their contributions. Without visible feedback loops, a rational cynicism develops: if you cannot determine whether your input influenced anything, the incentive to participate erodes." },
                { type: 'paragraph', text: "Institutional resistance is the third and deepest barrier. Public participation is frequently approached as a compliance exercise rather than a decision making input. The objective becomes holding a forum to satisfy legal requirements, not generating insights that might alter policy direction. When participation threatens established priorities, the institutional reflex is to manage rather than embrace it." },
                { type: 'infographic', image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop", caption: "The public participation cycle: how broken feedback loops undermine citizen trust in governance processes." },
                { type: 'heading', text: "What Meaningful Participation Requires" },
                { type: 'paragraph', text: "First, accessible information delivered in time to matter. Consultation documents should be available in plain language, in both English and Kiswahili, at least two weeks before any hearing. A central online repository of public participation documents, searchable by county and sector, would expand access. Digital access alone is insufficient. Radio announcements, community noticeboards, and youth networks must reach those offline." },
                { type: 'paragraph', text: "Second, feedback that closes the loop. Every public participation process should produce a public response document listing key inputs received and explaining which were incorporated or why they were not. This is the single highest-impact, lowest-cost reform available. A brief public report transforms citizen trust in the process." },
                { type: 'paragraph', text: "Third, youth representation that is structural rather than symbolic. Inviting a young person to a meeting differs fundamentally from ensuring youth perspectives influence decisions. County assemblies should establish standing youth advisory committees with defined mandates and voting rights. National ministries should appoint youth focal persons at decision making levels." },
                { type: 'paragraph', text: "Fourth, independent accountability. Citizens who believe their participation rights were violated have limited recourse beyond the courts, which are slow, expensive, and inaccessible to most. An independent Public Participation Ombuds office with investigative powers and the authority to publish findings would create accountability the current system lacks." },
                { type: 'heading', text: "Policy Reform Priorities" },
                { type: 'paragraph', text: "Drawing on PolicyBridge KE's analysis of Kenya's public participation framework, five reforms emerge as priorities. Standardize minimum participation requirements across all 47 counties to prevent weak compliance. Mandate plain language and digital access to all consultation materials. Require written government responses to citizen input. Establish youth quotas with voting rights on participation committees. Create an independent Public Participation Ombuds office." },
                { type: 'heading', text: "The Implications of Inaction" },
                { type: 'paragraph', text: "When young people conclude that formal governance processes do not value their input, they disengage from institutional politics. This weakens democratic accountability and deprives policy making of the lived experience and practical knowledge young people possess. When participation is genuine, legitimacy increases, institutional trust rebuilds, and policy outcomes improve. Kenya's Constitution promised ongoing, meaningful participation in decisions that shape daily life. Building the machinery to deliver on that promise is a defining governance challenge." },
                { type: 'footnote', text: "This article is based on PolicyBridge KE's research on public participation in Kenya, drawing on publicly available constitutional and legal frameworks, county government documents, and online sources on youth civic engagement." }
            ]
        },
        {
            id: 3,
            title: "Rethinking Youth Mental Health Policy: What Kenya's Young Population Actually Needs",
            category: "Public Health & Wellbeing",
            author: "PolicyBridge KE Research Team",
            date: "July 2026",
            readTime: "10 min read",
            excerpt: "Kenya has approximately 100 registered psychiatrists serving a population of over 50 million, with the vast majority concentrated in Nairobi and a few urban centres. Mental health receives less than one percent of the national health budget. Behind these statistics are young Kenyans navigating depression, anxiety, and trauma with minimal institutional support. The solution requires fundamentally rethinking how services are designed, funded, and delivered.",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
            content: [
                { type: 'paragraph', text: "Kenya has approximately 100 registered psychiatrists serving a population of over 50 million people. The vast majority practice in Nairobi and a few other urban centres. Some counties have no psychiatrist at all. Mental health receives less than one percent of the national health budget. Behind these numbers are young Kenyans managing depression, anxiety, trauma, and other conditions with minimal institutional support. Addressing this requires more than additional psychiatric staff. It requires rethinking how mental health services are designed, funded, and delivered to a generation facing significant pressures." },
                { type: 'heading', text: "Understanding the Drivers" },
                { type: 'paragraph', text: "Kenya's youth mental health challenge does not have a single cause. It results from multiple, intersecting pressures. Financial insecurity and unemployment create chronic stress that erodes wellbeing over time. Academic and workplace pressure compound this, with students navigating high-stakes examinations and young professionals facing precarious employment with no workplace mental health policies." },
                { type: 'paragraph', text: "Family instability, domestic conflict, social isolation, and loneliness reduce the support structures that protect mental health, particularly in urban areas where traditional community networks have weakened. Substance abuse, frequently a coping mechanism for underlying distress, is addressed primarily through criminal justice rather than health systems. Social media pressure and cyberbullying expose young people to constant comparison and harassment that previous generations did not experience. An intergenerational gap in understanding mental health means parents and elders may dismiss symptoms as laziness, spiritual affliction, or poor discipline. Young people learn not to speak about what they are experiencing." },
                { type: 'infographic', image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1200&auto=format&fit=crop", caption: "Healthcare system visualization: the gap between mental health needs and available services in Kenya." },
                { type: 'heading', text: "Systemic Gaps" },
                { type: 'paragraph', text: "Mental health services in Kenya remain expensive and inaccessible for most young people. Public facilities are concentrated in urban centres, understaffed, and under-resourced. Community-based support is provided largely by community-based organizations and faith-based groups operating with limited resources and without formal integration into the health system. These organizations provide essential services but cannot substitute for a functioning public mental health infrastructure." },
                { type: 'paragraph', text: "Domestic financing for mental health remains inadequate. Mental health competes with more visible health priorities and receives insufficient allocation. The result is a system oriented toward treating severe cases after crisis rather than preventing deterioration through early intervention. Low public awareness sustains stigma and delays help-seeking. Traditional service delivery models built around hospitals and clinics do not address the diverse needs of young people. A teenager experiencing anxiety may not require a psychiatrist. She may need someone to talk to, a peer who understands her experience, or a safe environment to decompress." },
                { type: 'heading', text: "Policy Directions" },
                { type: 'subheading', text: "Community-Based Mental Health" },
                { type: 'paragraph', text: "Mental health conversations should be established in spaces young people already access: schools, youth centres, religious institutions, and community gatherings. Community health promoters and youth champions can be trained in mental health awareness and referral. Partnerships with community organizations, faith-based groups, and youth networks that already hold community trust should be strengthened and formally integrated into the health system." },
                { type: 'subheading', text: "Domestic Financing" },
                { type: 'paragraph', text: "Counties should dedicate mental health funding within County Integrated Development Plans and annual budgets. Financing must extend beyond hospitals to community programmes, peer support networks, and prevention initiatives. Without dedicated domestic resources, mental health will remain dependent on inconsistent development partner funding." },
                { type: 'subheading', text: "Differentiated Service Delivery" },
                { type: 'paragraph', text: "Different young people need different responses. A university student managing academic stress, a young mother experiencing postpartum depression, and a teenager struggling with substance abuse require distinct approaches. The system should provide peer support groups, digital counselling, crisis response services, school and university counselling, community-based counselling, and specialist psychiatric care, each matched to the appropriate level of need." },
                { type: 'subheading', text: "Prevention and Awareness" },
                { type: 'paragraph', text: "National mental health awareness campaigns, parent education programmes to bridge intergenerational understanding gaps, and mental health education integrated into school curricula would normalize conversations and reduce stigma before crises develop. Prevention costs less than crisis response and produces better outcomes." },
                { type: 'subheading', text: "Safe Spaces and Digital Innovation" },
                { type: 'paragraph', text: "Young people need affordable, accessible spaces for sports, recreation, creative expression, social connection, and peer support. These are protective infrastructure, not luxuries. Digital tools, including mental health applications, confidential online counselling, and social media strategies promoting mental health literacy, can reach young people who will not access traditional clinic-based services." },
                { type: 'infographic', image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop", caption: "Tiered service delivery model: matching mental health interventions to levels of need." },
                { type: 'heading', text: "A Key Finding" },
                { type: 'paragraph', text: "PolicyBridge KE's analysis and community dialogues identify an important insight: many young people seek empathy, understanding, and practical support rather than unsolicited advice. Mental health services should prioritize active listening, peer support, confidentiality, and person-centred care. The quality of the relationship between a young person and a service provider often determines outcomes more than the specific clinical intervention." },
                { type: 'heading', text: "A Structural Proposal" },
                { type: 'paragraph', text: "Establishing County Youth Mental Health and Wellbeing Hubs would provide youth-friendly spaces combining peer support, counselling, digital services, recreational activities, referrals, and mental health education. A young person could access support without an appointment, referral, or diagnosis. The hubs would be funded jointly by county governments and development partners, delivered through partnerships with community-based organizations, universities, and youth organizations, and staffed by professional counsellors, trained peer supporters, and community health workers." },
                { type: 'paragraph', text: "The cost is modest relative to the burden of untreated mental illness. The return includes young people who remain in education, stay employed, maintain relationships, and contribute to their communities. Kenya cannot build enough hospitals or train enough psychiatrists to address this challenge through clinical models alone. A public health approach, built on community infrastructure, prevention, and differentiated care, offers the most viable path forward." },
                { type: 'footnote', text: "This article is based on PolicyBridge KE's research and community engagement on youth mental health, drawing on publicly available health system data, online sources, and internal policy analysis." }
            ]
        }
    ];

    function toggleArticle(id) {
        expandedArticle = expandedArticle === id ? null : id;
    }
</script>

<svelte:head>
    <title>Articles — PolicyBridge KE</title>
    <meta name="description" content="Read articles and analysis on policy, governance, and youth engagement in Kenya." />
</svelte:head>

<div class="page">
    <section class="page-header">
        <span class="section-label">Research & Analysis</span>
        <h1>Articles</h1>
        <p>Evidence-based analysis on economic inclusion, governance, and public health from PolicyBridge KE's research team.</p>
    </section>

    <div class="articles-list">
        {#each publishedArticles as article}
            <article class="article-wrapper" class:expanded={expandedArticle === article.id}>
                <button class="article-card" on:click={() => toggleArticle(article.id)}>
                    <div class="card-image">
                        <img src={article.image} alt={article.title} loading="lazy" />
                    </div>
                    <div class="card-body">
                        <div class="card-meta">
                            <span class="category-tag">{article.category}</span>
                            <span class="date">{article.date}</span>
                            <span class="read-time">{article.readTime}</span>
                        </div>
                        <h2>{article.title}</h2>
                        <p class="excerpt">{article.excerpt}</p>
                        <div class="card-footer">
                            <span class="author">{article.author}</span>
                            <span class="toggle-indicator">
                                {expandedArticle === article.id ? 'Collapse' : 'Read full article'}
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class:rotated={expandedArticle === article.id}>
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </button>

                {#if expandedArticle === article.id}
                    <div class="article-content" transition:slide={{ duration: 300 }}>
                        {#each article.content as block}
                            {#if block.type === 'heading'}
                                <h3>{block.text}</h3>
                            {:else if block.type === 'subheading'}
                                <h4>{block.text}</h4>
                            {:else if block.type === 'paragraph'}
                                <p>{block.text}</p>
                            {:else if block.type === 'infographic'}
                                <figure class="infographic">
                                    <img src={block.image} alt={block.caption} loading="lazy" />
                                    <figcaption>{block.caption}</figcaption>
                                </figure>
                            {:else if block.type === 'footnote'}
                                <div class="footnote">
                                    <p>{block.text}</p>
                                </div>
                            {/if}
                        {/each}
                    </div>
                {/if}
            </article>
        {/each}
    </div>
</div>

<style>
    .page {
        max-width: 900px;
        margin: 0 auto;
        padding: 56px 24px 80px;
        font-family: system-ui, -apple-system, sans-serif;
        color: #1a1a1a;
        line-height: 1.6;
    }

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
        max-width: 560px;
        line-height: 1.5;
        margin: 0;
    }

    .articles-list {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .article-wrapper {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        overflow: hidden;
        transition: border-color 0.2s;
    }

    .article-wrapper.expanded {
        border-color: #064e3b;
    }

    .article-card {
        display: grid;
        grid-template-columns: 280px 1fr;
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
        text-align: left;
        font-family: inherit;
        color: inherit;
        width: 100%;
    }

    .card-image {
        height: 100%;
        min-height: 240px;
        background: #064e3b;
        overflow: hidden;
        position: relative;
    }

    .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.85;
    }

    .card-body {
        padding: 28px;
        display: flex;
        flex-direction: column;
    }

    .card-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
        flex-wrap: wrap;
    }

    .category-tag {
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #064e3b;
        background: #f0fdf4;
        padding: 3px 8px;
        border-radius: 4px;
    }

    .date {
        font-size: 0.8rem;
        color: #94a3b8;
    }

    .read-time {
        font-size: 0.76rem;
        color: #94a3b8;
    }

    .card-body h2 {
        font-size: 1.25rem;
        font-weight: 700;
        letter-spacing: -0.01em;
        line-height: 1.35;
        margin: 0 0 10px;
        color: #1a1a1a;
    }

    .excerpt {
        font-size: 0.9rem;
        color: #555;
        line-height: 1.6;
        margin: 0;
        flex: 1;
    }

    .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 16px;
        margin-top: 16px;
        border-top: 1px solid #f1f5f9;
    }

    .author {
        font-size: 0.8rem;
        color: #64748b;
        font-weight: 500;
    }

    .toggle-indicator {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
        font-weight: 600;
        color: #064e3b;
    }

    .toggle-indicator svg {
        transition: transform 0.2s;
    }

    .toggle-indicator svg.rotated {
        transform: rotate(180deg);
    }

    .article-content {
        padding: 0 40px 40px;
        max-width: 720px;
        font-size: 1rem;
        color: #334155;
        line-height: 1.8;
    }

    .article-content h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1a1a1a;
        margin: 36px 0 14px;
        letter-spacing: -0.01em;
    }

    .article-content h4 {
        font-size: 1.05rem;
        font-weight: 700;
        color: #1a1a1a;
        margin: 24px 0 8px;
    }

    .article-content p {
        margin: 0 0 18px;
    }

    .infographic {
        margin: 32px 0;
        border-radius: 10px;
        overflow: hidden;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
    }

    .infographic img {
        width: 100%;
        height: auto;
        display: block;
    }

    .infographic figcaption {
        padding: 12px 16px;
        font-size: 0.82rem;
        color: #64748b;
        font-style: italic;
        text-align: center;
    }

    .footnote {
        margin-top: 36px;
        padding: 18px 20px;
        background: #f8fafc;
        border-left: 3px solid #064e3b;
        border-radius: 0 8px 8px 0;
        font-size: 0.85rem;
        color: #64748b;
        line-height: 1.6;
    }

    .footnote p {
        margin: 0;
    }

    @media (max-width: 768px) {
        .page {
            padding: 40px 16px 60px;
        }

        .page-header h1 {
            font-size: 1.75rem;
        }

        .article-card {
            grid-template-columns: 1fr;
        }

        .card-image {
            min-height: 160px;
            max-height: 200px;
        }

        .card-body {
            padding: 20px;
        }

        .card-body h2 {
            font-size: 1.1rem;
        }

        .article-content {
            padding: 0 20px 28px;
            font-size: 0.93rem;
        }
    }
</style>