<script>
    /** @type {import('./$types').PageData} */
    export let data;

    const { stakeholders } = data; // Data fetched from +page.server.js

    // Define the steps of the policy creation cycle
    const policySteps = [
        { 
            title: "1. Challenge Identification", 
            icon: "💡", 
            description: "Experts and youth leaders define critical policy gaps in governance, economy, and social well-being." 
        },
        { 
            title: "2. Solution Submission", 
            icon: "📝", 
            description: "Youth submit innovative solutions through our platform. All raw ideas are reviewed by a vetting committee." 
        },
        { 
            title: "3. Shortlisting & Voting", 
            icon: "🗳️", 
            description: "The best solutions are shortlisted, and the public votes to prioritize the ideas that move forward." 
        },
        { 
            title: "4. Policy Brief Formulation", 
            icon: "📄", 
            description: "The top-voted solutions are synthesized into concise, formal policy briefs, ready for government submission." 
        },
        { 
            title: "5. Stakeholder Engagement", 
            icon: "🤝", 
            description: "Briefs are formally delivered to relevant government Ministries and County Governments for acknowledgment." 
        },
        { 
            title: "6. Tracking & Implementation", 
            icon: "🏆", 
            description: "We continuously track the status of acknowledged briefs until they are formally reviewed and implemented." 
        },
    ];
</script>

<div class="container about-page">
    <header>
        <h1>About Youth Voices KE</h1>
        <p class="tagline">Empowering the youth to be co-creators of policy and good governance.</p>
    </header>

    <hr>
    
    <section class="mission-section">
        <h2>Our Core Purpose</h2>
        <div class="mission-content">
            <div class="mission-text">
                <h3>Our Mission</h3>
                <p>To empower Kenya's youth to shape public policy and community action by providing a simple, open, and credible platform where they can propose practical and actionable solutions to the challenges they face and ensure these solutions reach the relevant stakeholders with transparency and accountability.
</p>
            </div>
            <div class="mission-text">
                <h3>Our Vision</h3>
                <p>A Kenya where youth ideas directly influence decision-making, drive innovation, and lead measurable change in government, communities, and institutions; a country where young people are not just heard, but their solutions guide the nation's future.</p>
            </div>
        </div>
    </section>

    <hr>
    
    <section class="policy-cycle-section">
        <h2>Our 6-Step Policy Cycle </h2>
        <p class="section-intro">
            Transparency is key. Here is how your ideas move from a simple suggestion to a formal, trackable policy document.
        </p>

        <div class="cycle-grid">
            {#each policySteps as step}
                <div class="cycle-step-card">
                    <div class="step-icon">{step.icon}</div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    {#if step.icon === '🗳️'}
                        <a href="/vote" class="button-link">Start Voting →</a>
                    {:else if step.icon === '📝'}
                        <a href="/submit" class="button-link">Submit Idea →</a>
                    {/if}
                </div>
            {/each}
        </div>
    </section>

    <hr>

    <section class="stakeholders-section">
        <h2>Potential Stakeholders: Let's Partner for Impact 🤝</h2>
        <p class="section-intro">
            We seek collaboration with organizations capable of acknowledging, implementing, or amplifying youth-led policy solutions. Join us in transforming governance.
        </p>

        <div class="stakeholders-grid">
            {#each stakeholders as partner}
                <div class="partner-card">
                    <div class="partner-details">
                        <h4>{partner.name}</h4>
                        <p class="role">{partner.role}</p>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <hr>
    
    <section class="cta-section">
        <h3>Ready to Partner With Us?</h3>
        <p>If your organization shares our vision for youth empowerment and governance, we welcome your partnership in policy implementation, outreach, or funding. **Take action today.**</p>
        <a href="mailto:partnerships@youthvoiceske.org" class="button-primary large-btn">
            Contact Our Partnership Team 📧
        </a>
        <p class="email-address">Email: **partnerships@youthvoiceske.org**</p>
    </section>
</div>

<style>
    /* --- General Layout --- */
    .about-page {
        padding-top: 40px;
        padding-bottom: 60px;
    }

    header {
        text-align: center;
        margin-bottom: 30px;
    }

    h1 {
        font-size: 3em;
        color: var(--color-text-dark);
        margin-bottom: 10px;
        font-weight: 800;
    }

    .tagline {
        font-size: 1.2em;
        color: var(--color-primary-accent);
    }
    
    h2 {
        text-align: center;
        font-size: 2.2em;
        color: var(--color-text-dark);
        margin: 40px 0 20px 0;
    }
    
    .section-intro {
        text-align: center;
        max-width: 800px;
        margin: 0 auto 30px auto;
        color: var(--color-text-light);
        font-size: 1.1em;
    }

    /* --- Mission and Vision (Styling kept for prominence) --- */
    .mission-section {
        background-color: var(--color-text-dark);
        color: var(--color-white);
        padding: 40px;
        border-radius: 10px;
    }
    
    .mission-section h2 {
        color: var(--color-white);
        border-bottom: 2px solid var(--color-primary-accent);
        display: inline-block;
        padding-bottom: 5px;
        margin-bottom: 30px;
        text-align: center;
        width: 100%;
    }
    
    .mission-content {
        display: flex;
        gap: 30px;
    }
    
    .mission-text {
        flex: 1;
        background-color: rgba(255, 255, 255, 0.05);
        padding: 20px;
        border-radius: 8px;
    }
    
    .mission-text h3 {
        color: var(--color-primary-accent);
        font-size: 1.6em;
        margin-bottom: 10px;
        font-weight: 700;
    }

    /* --- Policy Cycle Section --- */
    .policy-cycle-section h2 {
        color: var(--color-primary-accent);
    }
    
    .cycle-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 25px;
        margin-top: 30px;
    }

    .cycle-step-card {
        background-color: var(--color-white);
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        border-top: 5px solid var(--color-secondary-accent);
        text-align: center;
    }

    .step-icon {
        font-size: 3em;
        margin-bottom: 15px;
        display: block;
    }
    
    .cycle-step-card h3 {
        font-size: 1.4em;
        color: var(--color-text-dark);
        margin-bottom: 10px;
    }
    
    .cycle-step-card p {
        color: var(--color-text-light);
        font-size: 0.95em;
        margin-bottom: 15px;
    }

    /* --- Stakeholders Section --- */
    .stakeholders-section h2 {
        color: var(--color-secondary-accent);
    }
    
    .stakeholders-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        margin-top: 30px;
        margin-bottom: 40px;
    }

    .partner-card {
        display: flex;
        align-items: center;
        background-color: var(--color-white);
        padding: 20px;
        border-radius: 8px;
        border: 1px solid var(--color-border-light);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        border-left: 5px solid #3498DB; /* Blue accent */
    }
    
    .partner-details h4 {
        font-size: 1.1em;
        color: var(--color-text-dark);
        margin-bottom: 5px;
    }
    
    .partner-details .role {
        font-size: 0.9em;
        color: var(--color-text-dark);
        font-weight: 600; 
    }

    /* --- Partnership CTA --- */
    .cta-section {
        text-align: center;
        padding: 40px;
        background-color: #e8f5e9; /* Light green background */
        border-radius: 10px;
        border: 1px solid var(--color-primary-accent);
    }
    
    .cta-section h3 {
        font-size: 2em;
        color: var(--color-text-dark);
        margin-bottom: 15px;
    }
    
    .cta-section p {
        font-size: 1.1em;
        color: var(--color-text-dark);
        margin-bottom: 30px;
    }

    .large-btn {
        padding: 15px 30px;
        font-size: 1.1em;
        font-weight: 700;
        text-transform: uppercase;
        border-radius: 6px;
        text-decoration: none;
        transition: transform 0.2s;
    }
    
    .email-address {
        margin-top: 15px;
        font-size: 1em;
        color: var(--color-text-light);
    }
    
    @media (max-width: 768px) {
        .mission-content {
            flex-direction: column;
        }
        .cta-section {
            padding: 20px;
        }
    }
</style>