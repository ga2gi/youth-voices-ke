<script>
    import { slide } from 'svelte/transition';

    /** @type {import('./$types').PageData} */
    export let data;

    $: groupedBriefs = data.groupedBriefs || [];
    let expandedBriefId = null;

    function toggleBrief(id) {
        expandedBriefId = expandedBriefId === id ? null : id;
    }

    function getDisplayDate(brief) {
        const title = (brief?.title || '').toLowerCase();
        if (title.includes('mental health')) {
            return 'August 2026';
        } else if (title.includes('capital') || title.includes('financing')) {
            return 'April 2026';
        }
        return 'OFFICIAL RELEASE';
    }

    function getPdfUrl(brief) {
        if (brief?.pdf_url) {
            return brief.pdf_url;
        }
        
        const title = (brief?.title || '').toLowerCase();
        if (title.includes('mental health')) {
            return '/downloads/Youth-Mental-Health-Crisis-Policy-Brief-2026.pdf';
        } else if (title.includes('capital') || title.includes('financing')) {
            return '/downloads/Youth-Access-to-Capital-Reform-Framework.pdf';
        }
        return '/downloads/PolicyBridge-KE-Policy-Brief.pdf';
    }

    function isMentalHealthBrief(brief) {
        return (brief?.title || '').toLowerCase().includes('mental health');
    }
</script>

<svelte:head>
    <title>Policy Briefs — PolicyBridge KE</title>
    <meta name="description" content="Official policy briefs and research frameworks from PolicyBridge KE." />
</svelte:head>

<div class="institutional-repository">
    <header class="document-header">
        <div class="org-brand">PolicyBridge KE | Governance & Research Division</div>
        <h1>National Policy Repository</h1>
        <p class="mission-statement">Official synthesis of youth-led legislative frameworks and developmental research in alignment with Kenya Vision 2030.</p>
        <div class="header-divider"></div>
    </header>

    <div class="document-grid">
        {#each groupedBriefs as group}
            {#each group.briefs as brief}
                <article class="policy-paper" class:is-expanded={expandedBriefId === brief.id}>
                    <div class="paper-edge"></div>
                    
                    <div class="paper-content">
                        <div class="top-registry">
                            <span class="ref-no">REF: PB/KE/2026/{String(brief.id).slice(0, 3).toUpperCase()}</span>
                            <span class="official-stamp">{brief.status || 'OFFICIAL'}</span>
                        </div>
                        
                        <div class="main-titles">
                            <span class="date-stamp">Release: {getDisplayDate(brief)}</span>
                            <h2>{brief.title || "UNLOCKING KENYA'S YOUTH ACCESS TO CAPITAL: A FIVE-PILLAR REFORM FRAMEWORK"}</h2>
                            <p class="abstract">{brief.description || 'A strategic framework addressing the KES 500 billion financing gap through structural reform and market-enabling mechanisms.'}</p>
                        </div>

                        <button class="expand-action" on:click={() => toggleBrief(brief.id)}>
                            {expandedBriefId === brief.id ? 'CLOSE SUMMARY' : 'POLICY BRIEF SUMMARY'}
                        </button>

                        {#if expandedBriefId === brief.id}
                            <div class="annex-content" transition:slide={{ duration: 400 }}>
                                <div class="internal-divider"></div>
                                
                                {#if isMentalHealthBrief(brief)}
                                    <section class="summary-section">
                                        <h3>1. The Policy Problem</h3>
                                        <p class="body-text">
                                            Kenya has an established policy and legal basis for mental-health reform, yet access remains a central implementation concern. The National Youth Consultation conducted by PolicyBridge KE between 16 July and 1 August 2026 across 20 Counties recorded an average access-to-affordable-services score of only <strong>2.87/10</strong>; 51 of 78 respondents (65.4%) rated access at 1–3/10.
                                        </p>
                                    </section>

                                    <section class="summary-section">
                                        <h3>2. What Young People Told Us</h3>
                                        <ul class="diagnosis-list">
                                            <li><strong>Economic insecurity:</strong> Financial stress selected by 61 respondents (78.2%) and unemployment by 58 (74.4%).</li>
                                            <li><strong>Social pressures:</strong> Social media (26), relationship challenges (23) and family conflict (20).</li>
                                            <li><strong>Weak access:</strong> 65.4% rated access to affordable services at 1–3 out of 10.</li>
                                        </ul>
                                    </section>

                                    <section class="summary-section">
                                        <h3>3. Youth Priorities for Government Action</h3>
                                        <div class="pillar-grid">
                                            <div class="pillar-card">
                                                <strong>Mental-health education in schools (44)</strong>
                                                <p>Most selected government priority - preventive approach.</p>
                                            </div>
                                            <div class="pillar-card">
                                                <strong>Youth-friendly services (37)</strong>
                                                <p>Accessible, confidential, and non-judgmental care.</p>
                                            </div>
                                            <div class="pillar-card">
                                                <strong>Community counselling centres (29)</strong>
                                                <p>Bringing support closer to where young people live.</p>
                                            </div>
                                            <div class="pillar-card">
                                                <strong>Safe youth spaces (21), Digital platforms (19), Peer support (18)</strong>
                                                <p>Lower-stigma routes into support systems.</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section class="summary-section">
                                        <h3>4. The Four-Pillar Framework</h3>
                                        <div class="pillar-grid">
                                            <div class="pillar-card">
                                                <strong>Pillar I: Bring Mental Health to the Ward</strong>
                                                <p>Integrate basic mental-health screening, psychological first aid, and referral into primary healthcare.</p>
                                            </div>
                                            <div class="pillar-card">
                                                <strong>Pillar II: Make Education Institutions Access Points</strong>
                                                <p>Establish mental-health desks in schools, TVETs and universities with trained peer educators.</p>
                                            </div>
                                            <div class="pillar-card">
                                                <strong>Pillar III: Community Safe Spaces & Creative Prevention</strong>
                                                <p>Pilot Mtaani Skill & Vibe Hubs and Creative Prescription Programme for prevention and connection.</p>
                                            </div>
                                            <div class="pillar-card">
                                                <strong>Pillar IV: Connect Digital, Crisis & Specialist Support</strong>
                                                <p>Strengthen integrated digital access with clear escalation and human oversight.</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section class="summary-section">
                                        <h3>5. Help-Seeking Channels</h3>
                                        <div class="impact-metrics">
                                            <div class="impact-stat"><strong>48</strong> Friends</div>
                                            <div class="impact-stat"><strong>42</strong> AI Tools</div>
                                            <div class="impact-stat"><strong>25</strong> Social Media</div>
                                            <div class="impact-stat"><strong>13</strong> Family</div>
                                            <div class="impact-stat"><strong>12</strong> Church</div>
                                            <div class="impact-stat"><strong>8</strong> Psychologists</div>
                                        </div>
                                    </section>

                                    <section class="summary-section">
                                        <h3>6. Financing & Accountability</h3>
                                        <p class="body-text">
                                            The Kenya Mental Health Investment Case 2021 estimated the annual economic burden at <strong>KSh.62.2 billion</strong>. PolicyBridge KE recommends identifiable budget lines, published implementation data, and performance-linked accountability.
                                        </p>
                                    </section>
                                {:else}
                                    <section class="summary-section">
                                        <h3>1. The Structural Crisis of Youth Capital Exclusion</h3>
                                        <p class="body-text">
                                            Over one million young people enter the labour market annually, yet fewer than 15% access formal employment. Despite strong entrepreneurial activity, youth-led MSMEs face a <strong>KES 500 billion financing gap</strong>. Systemic exclusion is shaped by policy design rather than individual shortcomings, with 75% of youth-led enterprises failing within three years due to constraints in capital and market access.
                                        </p>
                                    </section>

                                    <section class="summary-section">
                                        <h3>2. Diagnosis: Structural Failures</h3>
                                        <ul class="diagnosis-list">
                                            <li>Fragmented financing systems across public funds.</li>
                                            <li>Collateral-based lending models that exclude asset-poor youth.</li>
                                            <li>Short-term consumption use of small grants.</li>
                                            <li>Lack of post-financing support ("capital without capability").</li>
                                            <li>Credit scoring systems that exclude first-time borrowers.</li>
                                        </ul>
                                    </section>

                                    <section class="summary-section">
                                        <h3>3. The Five-Pillar Reform Framework</h3>
                                        <div class="pillar-grid">
                                            <div class="pillar-card">
                                                <strong>Pillar I: Youth Credit Guarantee Scheme (YCGS)</strong>
                                                <p>De-risking mechanism with 50%–85% guarantees to crowd in private lending.</p>
                                            </div>
                                            <div class="pillar-card">
                                                <strong>Pillar II: Unified Digital Youth Capital Portal</strong>
                                                <p>Single gateway for streamlined applications and public transparency.</p>
                                            </div>
                                            <div class="pillar-card">
                                                <strong>Pillar III: Mentorship-Linked Lending</strong>
                                                <p>Pairs larger loans with capability-building support and performance incentives.</p>
                                            </div>
                                            <div class="pillar-card">
                                                <strong>Pillar IV: Corporate Youth Procurement Targets</strong>
                                                <p>Allocating 5% of corporate spend to youth enterprises to unlock KES 50B annually.</p>
                                            </div>
                                            <div class="pillar-card">
                                                <strong>Pillar V: Credit Scoring System Reform</strong>
                                                <p>Integrating alternative data (mobile money, utilities) to expand inclusion.</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section class="summary-section">
                                        <h3>4. 2030 Impact Projections</h3>
                                        <div class="impact-metrics">
                                            <div class="impact-stat"><strong>40,000</strong> Enterprises Funded</div>
                                            <div class="impact-stat"><strong>80,000</strong> Jobs Created</div>
                                            <div class="impact-stat"><strong>KES 100B+</strong> Private Lending Unlocked</div>
                                        </div>
                                    </section>
                                {/if}

                                <div class="footer-actions">
                                    <a href={getPdfUrl(brief)} 
                                       target="_blank" 
                                       rel="noopener noreferrer" 
                                       class="un-btn-primary">
                                        DOWNLOAD FULL POLICY BRIEF (PDF)
                                    </a>
                                    <p class="legal-footer">© 2026 PolicyBridge KE | policy co-creation </p>
                                </div>
                            </div>
                        {/if}
                    </div>
                </article>
            {/each}
        {/each}
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;600;800&display=swap');

    :global(body) { 
        background: #f4f4f2; 
        color: #2d3748; 
        margin: 0; 
    }
    
    .institutional-repository { 
        max-width: 900px; 
        margin: 0 auto; 
        padding: 60px 20px; 
        font-family: 'Inter', sans-serif; 
    }
    
    .document-header { 
        margin-bottom: 50px; 
    }
    
    .org-brand { 
        font-size: 0.7rem; 
        font-weight: 800; 
        color: #718096; 
        text-transform: uppercase; 
        letter-spacing: 2px; 
    }
    
    h1 { 
        font-family: 'Libre Baskerville', serif; 
        font-size: 2.5rem; 
        color: #1a202c; 
        margin: 10px 0; 
    }
    
    .mission-statement { 
        font-size: 0.95rem; 
        color: #4a5568; 
        max-width: 600px; 
        line-height: 1.5; 
    }
    
    .header-divider { 
        height: 4px; 
        width: 50px; 
        background: #064e3b; 
        margin-top: 20px; 
    }

    .policy-paper { 
        background: white; 
        border: 1px solid #e2e8f0; 
        display: flex; 
        margin-bottom: 25px; 
        box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
    }
    
    .paper-edge { 
        width: 10px; 
        background: #064e3b; 
        flex-shrink: 0; 
    }
    
    .paper-content { 
        padding: 45px; 
        width: 100%; 
    }

    .top-registry { 
        display: flex; 
        justify-content: space-between; 
        margin-bottom: 25px; 
        font-family: monospace; 
        font-size: 0.8rem; 
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .ref-no {
        color: #718096;
    }
    
    .official-stamp { 
        border: 1.5px solid #2d3748; 
        padding: 2px 10px; 
        font-weight: 800; 
        text-transform: uppercase; 
        font-size: 0.7rem;
        letter-spacing: 1px;
    }

    .date-stamp { 
        font-size: 0.7rem; 
        font-weight: 700; 
        color: #a0aec0; 
        text-transform: uppercase; 
        display: block;
        margin-bottom: 8px;
    }
    
    h2 { 
        font-family: 'Libre Baskerville', serif; 
        font-size: 1.5rem; 
        margin: 8px 0; 
        color: #1a202c; 
        line-height: 1.3; 
    }
    
    .abstract { 
        color: #4a5568; 
        line-height: 1.6; 
        margin-bottom: 30px; 
        font-size: 1rem; 
    }

    .expand-action { 
        width: 100%; 
        padding: 16px; 
        border: 1.5px solid #064e3b; 
        background: transparent; 
        color: #064e3b; 
        font-weight: 800; 
        cursor: pointer; 
        letter-spacing: 1.5px; 
        font-size: 0.75rem; 
        transition: all 0.3s ease;
    }
    
    .expand-action:hover { 
        background: #064e3b; 
        color: white; 
    }

    .internal-divider { 
        height: 1px; 
        background: #e2e8f0; 
        margin: 35px 0; 
    }
    
    h3 { 
        font-size: 0.8rem; 
        text-transform: uppercase; 
        color: #718096; 
        border-bottom: 1px solid #edf2f7; 
        padding-bottom: 8px; 
        margin-bottom: 15px; 
    }
    
    .body-text { 
        line-height: 1.75; 
        color: #2d3748; 
        font-size: 1rem; 
        margin-bottom: 20px; 
    }
    
    .diagnosis-list { 
        padding-left: 20px; 
        margin-bottom: 30px; 
    }
    
    .diagnosis-list li { 
        margin-bottom: 10px; 
        color: #4a5568; 
        line-height: 1.5; 
    }

    .pillar-grid { 
        display: flex; 
        flex-direction: column; 
        gap: 15px; 
        margin-bottom: 30px; 
    }
    
    .pillar-card { 
        background: #f9fafb; 
        padding: 20px; 
        border-left: 4px solid #064e3b; 
    }
    
    .pillar-card strong { 
        display: block; 
        margin-bottom: 5px; 
        color: #111827; 
    }
    
    .pillar-card p { 
        margin: 0; 
        font-size: 0.95rem; 
        color: #4b5563; 
    }

    .impact-metrics { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
        gap: 20px; 
        margin-bottom: 30px;
    }
    
    .impact-stat { 
        background: #ecfdf5; 
        padding: 20px; 
        border-radius: 4px; 
        font-size: 0.9rem; 
        color: #064e3b; 
        text-align: center; 
        font-weight: 600; 
    }
    
    .impact-stat strong {
        display: block;
        font-size: 1.5rem;
        margin-bottom: 5px;
    }

    .un-btn-primary { 
        display: block; 
        background: #064e3b; 
        color: white; 
        text-align: center; 
        text-decoration: none; 
        padding: 20px; 
        font-weight: 800; 
        border-radius: 4px; 
        margin-top: 40px; 
        letter-spacing: 1px; 
        transition: background 0.3s ease;
    }
    
    .un-btn-primary:hover { 
        background: #043d2e; 
    }
    
    .legal-footer { 
        font-size: 0.7rem; 
        color: #a0aec0; 
        margin-top: 20px; 
        text-align: center; 
        text-transform: uppercase; 
    }

    @media (max-width: 768px) {
        .paper-content { 
            padding: 25px; 
        }
        
        h1 { 
            font-size: 2rem; 
        }
        
        h2 { 
            font-size: 1.25rem; 
        }
        
        .institutional-repository {
            padding: 40px 16px;
        }
        
        .impact-metrics {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
    }
    
    @media (max-width: 480px) {
        .paper-content { 
            padding: 20px; 
        }
        
        .impact-metrics {
            grid-template-columns: 1fr;
        }
    }
</style>