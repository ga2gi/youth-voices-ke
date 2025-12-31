<script>
    import { onMount } from 'svelte';

    let showBackToTop = false;

    onMount(() => {
        const handleScroll = () => {
            // Show button after scrolling down 400px
            showBackToTop = window.scrollY > 400;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
</script>

<svelte:head>
    <title>Terms of Use and Submission | Youth Voices KE</title>
    <meta name="description" content="Official Terms of Use and Submission for Youth Voices KE. Understand our submission process, user conduct, and data policies." />
</svelte:head>

<div class="container legal-page">
    {#if showBackToTop}
        <button 
            class="back-to-top" 
            on:click={scrollToTop}
            aria-label="Back to top"
        >
            ↑
        </button>
    {/if}

    <header>
        <h1>⚖️ Terms of Use and Submission</h1>
        <p class="last-updated">Last Updated: December 10, 2025</p>
    </header>

    <nav class="index-section">
        <h2>Index</h2>
        <ul class="index-list">
            <li><a href="#sec-1">1. Acceptance of Terms</a></li>
            <li><a href="#sec-2">2. Definitions</a></li>
            <li><a href="#sec-3">3. Eligibility & Conduct</a></li>
            <li><a href="#sec-4">4. User Submissions & IP</a></li>
            <li><a href="#sec-5">5. Review & Voting Process</a></li>
            <li><a href="#sec-6">6. Disclaimers & Liability</a></li>
            <li><a href="#sec-7">7. Third-Party Services</a></li>
            <li><a href="#sec-8">8. Indemnification</a></li>
            <li><a href="#sec-9">9. Moderation & Termination</a></li>
            <li><a href="#sec-10">10. Governing Law</a></li>
            <li><a href="#sec-11">11. Data Protection</a></li>
            <li><a href="#sec-12">12. Severability</a></li>
            <li><a href="#sec-13">13. Entire Agreement</a></li>
            <li><a href="#sec-14">14. Changes to Terms</a></li>
            <li><a href="#sec-15">15. Contact</a></li>
        </ul>
    </nav>

    <section id="sec-1">
        <h2>1. Acceptance of Terms</h2>
        <p>
            These Terms of Use and Submission (“Terms”) constitute a legally binding agreement made between you and <strong>Youth Voices KE</strong>. By accessing the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.
        </p>
        <div class="alert warning">
            If you do not agree with all of these Terms, you are expressly prohibited from using the Platform and must discontinue use immediately.
        </div>
    </section>

    <section id="sec-2">
        <h2>2. Definitions</h2>
        <div class="table-container">
            <table>
                <thead>
                    <tr><th>Term</th><th>Definition</th></tr>
                </thead>
                <tbody>
                    <tr><td><strong>Community Voting</strong></td><td>The Platform’s public evaluation process for selecting submissions.</td></tr>
                    <tr><td><strong>Content</strong></td><td>User-generated solutions (text, images, data, or material).</td></tr>
                    <tr><td><strong>Personal Identifier</strong></td><td>Optional data (name/contact) used for verification or rewards.</td></tr>
                    <tr><td><strong>Platform</strong></td><td>The Youth Voices KE website and digital services.</td></tr>
                    <tr><td><strong>Submission</strong></td><td>Any non-identifying idea or proposal submitted through the Platform.</td></tr>
                </tbody>
            </table>
        </div>
    </section>

    <section id="sec-3">
        <h2>3. Eligibility and User Conduct</h2>
        <div class="grid-sections">
            <div class="card">
                <h3>3.1 Eligibility</h3>
                <p>Intended for Kenyan citizens and residents aged <strong>18 years and above</strong>.</p>
            </div>
            <div class="card">
                <h3>3.2 Identity Verification</h3>
                <p>We may request verification for prizes, awards, or specific follow-up engagement.</p>
            </div>
        </div>

        <div class="conduct-box">
            <h3>3.3 Prohibited Conduct</h3>
            <p>Users are strictly prohibited from activity that is:</p>
            <ul class="dark-list">
                <li>Defamatory, hateful, obscene, or discriminatory.</li>
                <li>Infringing on third-party intellectual property or privacy.</li>
                <li>Technically harmful (malware, bots, or scraping tools).</li>
                <li>Manipulating votes or impersonating others.</li>
            </ul>
        </div>
    </section>

    <section id="sec-4">
        <h2>4. User Submissions & Intellectual Property</h2>
        <div class="ip-container">
            <p><strong>4.1 Ownership:</strong> You retain ownership of your original submissions.</p>
            <p><strong>4.2 Licence:</strong> By submitting, you grant Youth Voices KE a worldwide, royalty-free, transferable licence to use, edit, and publish your content.</p>
            
            <div class="warranty-card">
                <h3>4.3 User Warranties</h3>
                <p>By submitting content, you warrant that:</p>
                <ul>
                    <li>The submission is your own <strong>original work</strong>;</li>
                    <li>The submission does not infringe any <strong>third-party rights</strong>;</li>
                    <li>You have all rights necessary to grant the required licence;</li>
                    <li>You understand submissions are <strong>not confidential</strong>;</li>
                    <li>Submission does <strong>not</strong> constitute a contract for compensation or employment.</li>
                </ul>
            </div>

            <div class="alert info">
                <strong>4.4 No Confidentiality:</strong> Submissions may be publicly accessed and shared for policy development.
            </div>
        </div>
    </section>

    <section id="sec-5">
        <h2>5. Submission, Review & Voting Process</h2>
        <p>Shortlisting is conducted by an independent committee using criteria: <strong>Relevance, Feasibility, and Impact</strong>. Selection incorporates both committee evaluation and community voting.</p>
    </section>

    <section id="sec-6">
        <h2>6. Disclaimers and Limitation of Liability</h2>
        <div class="disclaimer-grid">
            <div class="disclaimer-item">
                <strong>6.1 Platform “As Is”</strong>
                <p>No warranties regarding platform reliability or fitness for a particular purpose.</p>
            </div>
            <div class="disclaimer-item">
                <strong>6.3 Limitation of Liability</strong>
                <p>Cumulative liability shall not exceed <strong>Ksh 0.00</strong> as the platform is free.</p>
            </div>
            <div class="disclaimer-item">
                <strong>6.5 No Advice</strong>
                <p>Content is for civic engagement and does not constitute professional advice.</p>
            </div>
        </div>
    </section>

    <section id="sec-7">
        <h2>7. Third-Party Services & Links</h2>
        <p>Youth Voices KE is not responsible for the security or practices of third-party systems like Supabase or WhatsApp.</p>
    </section>

    <section id="sec-8">
        <h2>8. Indemnification</h2>
        <p>You agree to indemnify Youth Voices KE from any claims arising from your use of the Platform or breach of these Terms.</p>
    </section>

    <section id="sec-9">
        <h2>9. Moderation, Suspension & Termination</h2>
        <p>We reserve the right to remove content, edit submissions, or block access at our sole discretion without notice.</p>
    </section>

    <section id="sec-10">
        <h2>10. Governing Law & Dispute Resolution</h2>
        <p>Governed by the <strong>Laws of Kenya</strong>. Disputes shall be resolved through negotiation, then Nairobi courts.</p>
    </section>

    <section id="sec-11">
        <h2>11. Data Protection</h2>
        <p>Use of the platform is also governed by our Privacy Policy (Data Protection Act 2019).</p>
    </section>

    <section id="sec-12">
        <h2>12. Severability</h2>
        <p>If any part of these Terms is held invalid, the remaining provisions remain in full force.</p>
    </section>

    <section id="sec-13">
        <h2>13. Entire Agreement</h2>
        <p>These Terms supersede all prior discussions regarding your use of the Platform.</p>
    </section>

    <section id="sec-14">
        <h2>14. Changes to Terms</h2>
        <p>We may update these terms at any time. Continued use constitutes acceptance of revisions.</p>
    </section>

    <section id="sec-15">
        <h2>15. Contact</h2>
        <div class="contact-box">
            <p>For questions regarding these Terms of Use and Submission:</p>
            <a href="mailto:info@youthvoiceske.org" class="email-btn">info@youthvoiceske.org</a>
        </div>
    </section>
</div>

<style>
    :global(html) {
        scroll-behavior: smooth;
    }

    .legal-page {
        max-width: 900px;
        margin: 0 auto;
        padding: 40px 20px;
        color: #333;
        height: auto;
        overflow: visible;
    }

    header {
        border-bottom: 3px solid #2e7d32; /* Forest Green */
        margin-bottom: 30px;
    }

    /* Floating Button */
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2e7d32;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 24px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: transform 0.2s ease;
    }
    .back-to-top:hover { transform: scale(1.1); }

    /* Index Nav */
    .index-section {
        background: #f1f8e9; /* Light green tint */
        padding: 25px;
        border-radius: 12px;
        margin-bottom: 50px;
    }
    .index-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 12px;
        list-style: none;
        padding: 0;
    }
    .index-list a {
        text-decoration: none;
        color: #1b5e20;
        font-weight: 500;
    }

    /* Content Layout */
    section {
        margin-bottom: 70px;
        scroll-margin-top: 80px;
    }
    h2 {
        border-left: 6px solid #2e7d32;
        padding-left: 15px;
        margin-bottom: 25px;
    }

    .table-container {
        overflow-x: auto;
        margin: 20px 0;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
    }
    table { width: 100%; border-collapse: collapse; background: #fff; }
    th, td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f1f8e9; }

    .grid-sections { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .card { background: #fff; border: 1px solid #e0e0e0; padding: 20px; border-radius: 10px; }

    .conduct-box {
        background: #1b5e20;
        color: white;
        padding: 30px;
        border-radius: 12px;
        margin-top: 20px;
    }
    .dark-list li { color: #e2e8f0; margin-bottom: 10px; }

    .warranty-card {
        background: #f1f8e9;
        border: 1px solid #c8e6c9;
        padding: 25px;
        border-radius: 12px;
        margin: 25px 0;
    }
    .warranty-card h3 { color: #2e7d32; margin-top: 0; }

    .alert { padding: 15px; border-radius: 8px; margin: 20px 0; }
    .alert.warning { background: #fff9c4; border-left: 5px solid #fbc02d; color: #333; }
    .alert.info { background: #e8f5e9; border-left: 5px solid #2e7d32; }

    .disclaimer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
    .disclaimer-item { background: #f9fdf9; padding: 20px; border-radius: 8px; border: 1px solid #e8f5e9; }

    .contact-box {
        text-align: center;
        background: #f1f8e9;
        padding: 40px;
        border-radius: 20px;
    }
    .email-btn {
        display: inline-block;
        background: #2e7d32;
        color: white !important;
        padding: 12px 35px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: bold;
        margin-top: 15px;
    }

    .divider { margin: 40px 0; border: 0; border-top: 1px solid #eee; }

    @media (max-width: 768px) { .grid-sections { grid-template-columns: 1fr; } }
</style>