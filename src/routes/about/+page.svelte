<script>
    /** @type {import('./$types').PageData} */
    export let data;

    const { stakeholders } = data;

    const policySteps = [
        { 
            title: "Challenge Identification", 
            icon: "💡", 
            description: "Experts and youth leaders define critical policy gaps in governance, economy, and social well-being." 
        },
        { 
            title: "Solution Submission", 
            icon: "📝", 
            description: "Youth submit solutions through our digital platform, surveys, interviews, and policy dialogues. All submissions undergo committee review." 
        },
        { 
            title: "Shortlisting & Voting", 
            icon: "🗳️", 
            description: "Solutions are shortlisted based on Feasibility, Relevance, and Impact. The public votes to prioritize the most promising ideas." 
        },
        { 
            title: "Policy Brief Formulation", 
            icon: "📄", 
            description: "Top-voted solutions are synthesized into formal policy briefs ready for government submission." 
        },
        { 
            title: "Stakeholder Engagement", 
            icon: "🤝", 
            description: "Briefs are formally delivered to relevant Government Ministries and County Governments for acknowledgment." 
        },
        { 
            title: "Tracking & Implementation", 
            icon: "🏆", 
            description: "We track acknowledged briefs through to formal review and implementation." 
        },
    ];

    const collectionMethods = [
        {
            icon: "💻",
            title: "Digital Platform",
            description: "Direct solution submission through our website with no registration barriers."
        },
        {
            icon: "📋",
            title: "Surveys & Questionnaires",
            description: "Structured digital and paper-based surveys distributed across counties."
        },
        {
            icon: "🎙️",
            title: "Interviews",
            description: "In-depth conversations with young changemakers and community leaders."
        },
        {
            icon: "🏛️",
            title: "Policy Dialogues",
            description: "Virtual and in-person forums bringing together youth, experts, and policymakers."
        },
        {
            icon: "🎓",
            title: "Campus Ambassadors",
            description: "Student representatives mobilize peers and organize policy labs at universities nationwide."
        },
        {
            icon: "📱",
            title: "Social Media & WhatsApp",
            description: "Solution collection through channels youth already use daily."
        }
    ];
</script>

<div class="about-page">
    <!-- Header -->
    <section class="page-header">
        <div class="section-container">
            <h1>About PolicyBridge <span class="text-accent">KE</span></h1>
            <p class="header-subtitle">A civic-tech platform bridging the gap between youth ideas and national policy.</p>
        </div>
    </section>

    <!-- Mission & Vision -->
    <section class="mission-vision-section">
        <div class="section-container">
            <div class="mission-card">
                <div class="card-header">
                    <span class="card-icon">🎯</span>
                    <h2>Our Mission</h2>
                </div>
                <p>To empower Kenya's youth to shape public policy and community action by providing a simple, open, and credible platform where they can propose practical and actionable solutions to the challenges they face and ensure these solutions reach the relevant stakeholders with transparency and accountability.</p>
            </div>
            
            <div class="vision-card">
                <div class="card-header">
                    <span class="card-icon">🔭</span>
                    <h2>Our Vision</h2>
                </div>
                <p>A Kenya where youth ideas directly influence decision-making, drive innovation, and lead measurable change in government, communities, and institutions; a country where young people are not just heard, but their solutions guide the nation's future.</p>
            </div>
        </div>
    </section>

    <!-- About & Approach -->
    <section class="about-section">
        <div class="section-container">
            <div class="about-grid">
                <div class="about-text">
                    <h2 class="section-title">Who We Are</h2>
                    <p>PolicyBridge KE is a civic-tech platform built by young people, for young people, rooted in the belief that Kenya's youth hold practical solutions to the country's most persistent challenges.</p>
                    <p>While many platforms focus on describing problems, we bridge the gap toward action. We present data-driven challenges and provide the infrastructure to turn ideas into formal policy instruments—no registration, no sign-up walls, no unnecessary bureaucracy.</p>
                    <p>We ensure youth participation is substantive, not symbolic, fostering a community where ideas mature into policies, policies push institutions, and institutions become accountable to the youth they serve.</p>
                </div>
                <div class="approach-text">
                    <h2 class="section-title">Our Approach</h2>
                    <p>We recognize that meaningful youth participation requires meeting young people where they are. Our multi-channel solution collection strategy ensures accessibility for all, regardless of internet access, location, or background.</p>
                    <div class="approach-highlight">
                        <p><strong>No internet? No problem.</strong> We conduct physical outreach through campus ambassadors, community events, and paper-based surveys to ensure rural and underserved youth are not left behind.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- How We Collect Solutions -->
    <section class="collection-section">
        <div class="section-container">
            <h2 class="section-title">How We Collect Solutions</h2>
            <div class="collection-grid">
                {#each collectionMethods as method}
                    <div class="collection-card">
                        <span class="collection-icon">{method.icon}</span>
                        <div>
                            <h4>{method.title}</h4>
                            <p>{method.description}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Policy Cycle -->
    <section class="policy-cycle-section">
        <div class="section-container">
            <h2 class="section-title">Our Policy Cycle</h2>
            <p class="section-subtitle">How your solution moves from idea to trackable policy document.</p>

            <div class="cycle-grid">
                {#each policySteps as step, index}
                    <div class="cycle-card">
                        <span class="step-number">{index + 1}</span>
                        <span class="step-icon">{step.icon}</span>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                        {#if step.icon === '🗳️'}
                            <a href="/vote" class="step-link">Start Voting →</a>
                        {:else if step.icon === '📝'}
                            <a href="/submit" class="step-link">Submit Solution →</a>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Stakeholders -->
    <section class="stakeholders-section">
        <div class="section-container">
            <h2 class="section-title">Potential Stakeholders</h2>
            <p class="section-subtitle">Organizations we seek to partner with for policy implementation and amplification.</p>

            <div class="stakeholders-grid">
                {#each stakeholders as partner}
                    <div class="stakeholder-card">
                        <span class="stakeholder-initial">{partner.name.charAt(0)}</span>
                        <div>
                            <h4>{partner.name}</h4>
                            <p>{partner.role}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
        <div class="section-container">
            <div class="cta-content">
                <h2>Partner With Us</h2>
                <p>If your organization shares our vision for youth empowerment and governance, we welcome your collaboration in policy implementation, outreach, or funding.</p>
                <a href="mailto:info@policybridgeke.org" class="btn-primary">Contact Our Partnership Team →</a>
                <p class="email-text">info@policybridgeke.org</p>
            </div>
        </div>
    </section>
</div>

<style>
    /* Reset & Global */
    .about-page {
        background: #fafafa;
        color: #1a1a1a;
    }

    .section-container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 24px;
    }

    .section-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 24px;
    }

    .section-subtitle {
        text-align: center;
        color: #666;
        font-size: 1rem;
        max-width: 600px;
        margin: 0 auto 40px;
        line-height: 1.6;
    }

    /* Page Header */
    .page-header {
        padding: 64px 24px 48px;
        text-align: center;
        background: white;
        border-bottom: 1px solid #e5e7eb;
    }

    .page-header h1 {
        font-size: 2.5rem;
        font-weight: 800;
        margin-bottom: 12px;
        color: #1a1a1a;
    }

    .text-accent {
        color: #064e3b;
    }

    .header-subtitle {
        font-size: 1.15rem;
        color: #666;
        max-width: 600px;
        margin: 0 auto;
    }

    /* Mission & Vision */
    .mission-vision-section {
        padding: 64px 0;
        background: white;
    }

    .mission-vision-section .section-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
    }

    .mission-card,
    .vision-card {
        padding: 36px;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
    }

    .mission-card {
        background: #f0fdf4;
        border-color: #064e3b;
    }

    .vision-card {
        background: #fefce8;
        border-color: #d97706;
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
    }

    .card-icon {
        font-size: 1.75rem;
    }

    .card-header h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
    }

    .mission-card p,
    .vision-card p {
        font-size: 0.95rem;
        line-height: 1.7;
        color: #444;
    }

    /* About & Approach */
    .about-section {
        padding: 64px 0;
        background: #f8faf9;
    }

    .about-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 48px;
    }

    .about-text p,
    .approach-text p {
        font-size: 0.95rem;
        line-height: 1.7;
        color: #444;
        margin-bottom: 16px;
    }

    .approach-highlight {
        background: #fefce8;
        border-left: 3px solid #d97706;
        padding: 16px 20px;
        border-radius: 0 8px 8px 0;
        margin-top: 20px;
    }

    .approach-highlight p {
        margin: 0;
        font-size: 0.9rem;
        color: #444;
    }

    /* Collection Methods */
    .collection-section {
        padding: 64px 0;
        background: white;
    }

    .collection-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 16px;
    }

    .collection-card {
        display: flex;
        gap: 16px;
        align-items: flex-start;
        padding: 20px;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        transition: border-color 0.2s;
    }

    .collection-card:hover {
        border-color: #064e3b;
    }

    .collection-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
        margin-top: 2px;
    }

    .collection-card h4 {
        font-size: 0.95rem;
        font-weight: 700;
        margin: 0 0 4px 0;
        color: #1a1a1a;
    }

    .collection-card p {
        font-size: 0.85rem;
        color: #666;
        margin: 0;
        line-height: 1.5;
    }

    /* Policy Cycle */
    .policy-cycle-section {
        padding: 64px 0;
        background: #f8faf9;
    }

    .cycle-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }

    .cycle-card {
        background: white;
        padding: 28px;
        border-radius: 10px;
        border: 1px solid #e5e7eb;
        text-align: center;
        position: relative;
        transition: border-color 0.2s;
    }

    .cycle-card:hover {
        border-color: #064e3b;
    }

    .step-number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        background: #064e3b;
        color: white;
        border-radius: 50%;
        font-size: 0.8rem;
        font-weight: 700;
        margin-bottom: 12px;
    }

    .step-icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 12px;
    }

    .cycle-card h3 {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 8px;
        color: #1a1a1a;
    }

    .cycle-card p {
        font-size: 0.85rem;
        color: #666;
        line-height: 1.5;
        margin-bottom: 12px;
    }

    .step-link {
        display: inline-block;
        color: #064e3b;
        font-weight: 600;
        text-decoration: none;
        font-size: 0.85rem;
    }

    .step-link:hover {
        text-decoration: underline;
    }

    /* Stakeholders */
    .stakeholders-section {
        padding: 64px 0;
        background: white;
    }

    .stakeholders-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 12px;
    }

    .stakeholder-card {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 16px 20px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        transition: border-color 0.2s;
    }

    .stakeholder-card:hover {
        border-color: #064e3b;
    }

    .stakeholder-initial {
        width: 40px;
        height: 40px;
        background: #064e3b;
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1rem;
        flex-shrink: 0;
    }

    .stakeholder-card h4 {
        font-size: 0.95rem;
        font-weight: 600;
        margin: 0 0 2px 0;
    }

    .stakeholder-card p {
        font-size: 0.8rem;
        color: #666;
        margin: 0;
    }

    /* CTA */
    .cta-section {
        padding: 64px 0;
        background: #f8faf9;
    }

    .cta-content {
        text-align: center;
        background: #064e3b;
        padding: 48px;
        border-radius: 12px;
        color: white;
    }

    .cta-content h2 {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 12px;
    }

    .cta-content p {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.85);
        margin-bottom: 24px;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
    }

    .btn-primary {
        display: inline-block;
        background: #fbbf24;
        color: #1a1a1a;
        padding: 12px 28px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 700;
        font-size: 0.95rem;
        transition: background 0.2s;
    }

    .btn-primary:hover {
        background: #f59e0b;
    }

    .email-text {
        margin-top: 16px;
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.6);
    }

    /* Responsive */
    @media (max-width: 768px) {
        .page-header h1 {
            font-size: 2rem;
        }

        .mission-vision-section .section-container,
        .about-grid {
            grid-template-columns: 1fr;
        }

        .collection-grid {
            grid-template-columns: 1fr;
        }

        .cta-content {
            padding: 32px 24px;
        }
    }
</style>