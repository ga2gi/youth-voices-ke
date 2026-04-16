<script lang="ts">
    import { slide } from 'svelte/transition';

    /** @type {import('./$types').PageData} */
    export let data;

    $: groupedBriefs = data.groupedBriefs || [];
    let expandedBriefId = null;

    function toggleBrief(id) {
        expandedBriefId = expandedBriefId === id ? null : id;
    }

    function formatDate(dateString) {
        if (!dateString) return 'OFFICIAL RELEASE';
        return new Date(dateString).toLocaleDateString('en-KE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
</script>

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
                            <span class="ref-no">REF: PB/KE/2026/{brief.id.toString().slice(0, 3).toUpperCase()}</span>
                            <span class="official-stamp">{brief.status || 'OFFICIAL'}</span>
                        </div>
                        
                        <div class="main-titles">
                            <span class="date-stamp">Release: {formatDate(brief.delivery_date)}</span>
                            <h2>UNLOCKING KENYA’S YOUTH ACCESS TO CAPITAL: A FIVE-PILLAR REFORM FRAMEWORK</h2>
                            <p class="abstract">A strategic framework addressing the KES 500 billion financing gap through structural reform and market-enabling mechanisms.</p>
                        </div>

                        <button class="expand-action" on:click={() => toggleBrief(brief.id)}>
                            {expandedBriefId === brief.id ? 'CLOSE SUMMARY' : 'POLICY BRIEF SUMMARY'}
                        </button>

                        {#if expandedBriefId === brief.id}
                            <div class="annex-content" transition:slide={{ duration: 400 }}>
                                <div class="internal-divider"></div>
                                
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
                                        <li>Lack of post-financing support (“capital without capability”).</li>
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

                                <div class="footer-actions">
                                    <a href="/downloads/Youth-Access-to-Capital-Reform-Framework.pdf" 
                                       target="_blank" 
                                       rel="noopener noreferrer" 
                                       class="un-btn-primary">
                                        DOWNLOAD FULL POLICY BRIEF (PDF)
                                    </a>
                                    <p class="legal-footer">© 2026 PolicyBridge KE | Registered Company Limited by Guarantee</p>
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

    :global(body) { background: #f4f4f2; color: #2d3748; margin: 0; }
    .institutional-repository { max-width: 900px; margin: 0 auto; padding: 60px 20px; font-family: 'Inter', sans-serif; }
    
    .document-header { margin-bottom: 50px; }
    .org-brand { font-size: 0.7rem; font-weight: 800; color: #718096; text-transform: uppercase; letter-spacing: 2px; }
    h1 { font-family: 'Libre Baskerville', serif; font-size: 2.5rem; color: #1a202c; margin: 10px 0; }
    .mission-statement { font-size: 0.95rem; color: #4a5568; max-width: 600px; line-height: 1.5; }
    .header-divider { height: 4px; width: 50px; background: #064e3b; margin-top: 20px; }

    .policy-paper { background: white; border: 1px solid #e2e8f0; display: flex; margin-bottom: 25px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .paper-edge { width: 10px; background: #064e3b; flex-shrink: 0; }
    .paper-content { padding: 45px; width: 100%; }

    .top-registry { display: flex; justify-content: space-between; margin-bottom: 25px; font-family: monospace; font-size: 0.8rem; }
    .official-stamp { border: 1.5px solid #2d3748; padding: 2px 10px; font-weight: 800; text-transform: uppercase; }

    .date-stamp { font-size: 0.7rem; font-weight: 700; color: #a0aec0; text-transform: uppercase; }
    h2 { font-family: 'Libre Baskerville', serif; font-size: 1.8rem; margin: 8px 0; color: #1a202c; line-height: 1.3; }
    .abstract { color: #4a5568; line-height: 1.6; margin-bottom: 30px; font-size: 1.1rem; }

    .expand-action { width: 100%; padding: 16px; border: 1.5px solid #064e3b; background: transparent; color: #064e3b; font-weight: 800; cursor: pointer; letter-spacing: 1.5px; font-size: 0.75rem; }
    .expand-action:hover { background: #064e3b; color: white; }

    .internal-divider { height: 1px; background: #e2e8f0; margin: 35px 0; }
    h3 { font-size: 0.8rem; text-transform: uppercase; color: #718096; border-bottom: 1px solid #edf2f7; padding-bottom: 8px; margin-bottom: 15px; }
    
    .body-text { line-height: 1.75; color: #2d3748; font-size: 1.05rem; margin-bottom: 20px; }
    
    .diagnosis-list { padding-left: 20px; margin-bottom: 30px; }
    .diagnosis-list li { margin-bottom: 10px; color: #4a5568; line-height: 1.5; }

    .pillar-grid { display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px; }
    .pillar-card { background: #f9fafb; padding: 20px; border-left: 4px solid #064e3b; }
    .pillar-card strong { display: block; margin-bottom: 5px; color: #111827; }
    .pillar-card p { margin: 0; font-size: 0.95rem; color: #4b5563; }

    .impact-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
    .impact-stat { background: #ecfdf5; padding: 20px; border-radius: 4px; font-size: 0.9rem; color: #064e3b; text-align: center; font-weight: 600; }

    .un-btn-primary { display: block; background: #064e3b; color: white; text-align: center; text-decoration: none; padding: 20px; font-weight: 800; border-radius: 4px; margin-top: 40px; letter-spacing: 1px; }
    .legal-footer { font-size: 0.7rem; color: #a0aec0; margin-top: 20px; text-align: center; text-transform: uppercase; }
</style>