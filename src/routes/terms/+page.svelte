<script>
    import { onMount } from 'svelte';

    let showBackToTop = false;

    onMount(() => {
        const handleScroll = () => {
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
    <title>Terms of Use and Submission | PolicyBridge</title>
    <meta
        name="description"
        content="Official Terms of Use and Submission for PolicyBridge. Understand our submission process, user conduct, and data policies."
    />
</svelte:head>

<div class="container legal-page">
    {#if showBackToTop}
        <button class="back-to-top" on:click={scrollToTop} aria-label="Back to top"> ↑ </button>
    {/if}

    <header>
        <h1>⚖️ Terms of Use and Submission</h1>
        <p class="last-updated">Last Updated: December 10, 2025</p>
    </header>

    <section id="intro">
        <p>
            These Terms of Use and Submission (“Terms”) constitute a legally binding agreement made
            between you, whether personally or on behalf of an entity (“you”) and PolicyBridge
            (“we,” “us” or “our”), concerning your access to and use of the PolicyBridge platform as
            well as any other media form, media channel or mobile website related, linked, or otherwise
            connected thereto (collectively, “the Platform”).
        </p>
        <p>
            You agree that by accessing the Platform, you have read, understood, and agree to be bound by
            all of these Terms. If you do not agree with all of these Terms, then you are expressly
            prohibited from using the Platform, and you must discontinue use immediately.
        </p>
    </section>

    <nav class="index-section">
        <h2>Index</h2>
        <ul class="index-list">
            <li><a href="#sec-1">1. Acceptance of Terms</a></li>
            <li><a href="#sec-2">2. Definitions</a></li>
            <li><a href="#sec-3">3. Eligibility and User Conduct</a></li>
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

    <hr class="divider" />

    <section id="sec-1">
        <h2>1. Acceptance of Terms</h2>
        <p>
            These Terms constitute a legally binding agreement. By accessing the Platform, you acknowledge
            that you have read, understood, and agree to be bound by these Terms.
        </p>
        <div class="alert warning">
            If you do not agree with all of these Terms, you are expressly prohibited from using the
            Platform and must discontinue use immediately.
        </div>
    </section>

    <section id="sec-2">
        <h2>2. Definitions</h2>
        <p>For the purposes of these Terms:</p>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Term</th>
                        <th>Definition</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Community Voting</strong></td>
                        <td>The Platform’s public evaluation process for selecting submissions.</td>
                    </tr>
                    <tr>
                        <td><strong>Community Engagement & Volunteering</strong></td>
                        <td>Optional participation by Users in PolicyBridge-facilitated engagement activities, including WhatsApp community groups, discussions, volunteering opportunities, and related civic engagement initiatives that may require the processing of personal contact information.</td>
                    </tr>
                    <tr>
                        <td><strong>Content</strong></td>
                        <td>All user-generated solutions that may be in the form of text, images, data, or material.</td>
                    </tr>
                    <tr>
                        <td><strong>Personal Identifier</strong></td>
                        <td>Any personal data that identifies a user, including the user’s name and contact information. Personal identification is entirely optional. That is why it must not be included in the submission and should be provided only on a voluntary basis in the Platform section. We may request identity verification under and for the purposes of Term 3.2 of these Terms.</td>
                    </tr>
                    <tr>
                        <td><strong>Platform</strong></td>
                        <td>The PolicyBridge website, mobile interface, and related digital services.</td>
                    </tr>
                    <tr>
                        <td><strong>Policy Challenge</strong></td>
                        <td>Any topic, question, or issue posted by PolicyBridge that invites youth solutions.</td>
                    </tr>
                    <tr>
                        <td><strong>Stakeholders</strong></td>
                        <td>Government bodies, civil society, development partners, donors, or institutions that receive policy briefs or insights.</td>
                    </tr>
                    <tr>
                        <td><strong>Submission</strong></td>
                        <td>Any non-identifying idea, proposal, comment, response, or content submitted through the Platform. A submission must not contain any personal identifier that can identify a user.</td>
                    </tr>
                    <tr>
                        <td><strong>User</strong></td>
                        <td>Any person who accesses or interacts with the Platform.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <section id="sec-3">
        <h2>3. Eligibility and User Conduct</h2>
        <h3>3.1 Eligibility</h3>
        <p>The Platform is intended for Kenyan citizens and residents aged 18 years and above.</p>

        <h3>3.2 Identity Verification</h3>
        <p>PolicyBridge may request identity verification where necessary, including when—</p>
        <ul>
            <li>recognition, prizes, or awards are involved; and</li>
            <li>follow-up engagement requires confirmation of identity.</li>
        </ul>

        <h3>3.3 Prohibited Conduct</h3>
        <p>You must not submit, upload, or engage in activity that—</p>
        <ul>
            <li>is defamatory, hateful, obscene, or discriminatory;</li>
            <li>violates any law or infringes third-party intellectual property or privacy rights;</li>
            <li>involves plagiarism or copying from another source without permission;</li>
            <li>is submitted with malicious intent (spam, manipulation, fraud, or vote tampering);</li>
            <li>is technically harmful (malware, bots, scraping tools, or attempts to bypass security);</li>
            <li>impersonates another person or entity.</li>
        </ul>
        <p>PolicyBridge may remove content or restrict access at its sole discretion.</p>

        <h3>3.4 Community Engagement & Volunteering</h3>
        <p>
            Participation in Community Engagement & Volunteering activities, including WhatsApp groups, is
            entirely voluntary. Users who choose to participate acknowledge that:
        </p>
        <ul>
            <li>joining WhatsApp groups requires disclosure of personal contact information (including phone numbers);</li>
            <li>WhatsApp is a third-party platform governed by its own terms and privacy practices.</li>
        </ul>
        <p>
            PolicyBridge shall only process personal data for community engagement and volunteering
            where the User has provided explicit consent in accordance with the Privacy Policy. Users may
            withdraw from community activities and withdraw consent at any time by contacting
            info@policybridge.org.
        </p>
        <p>
            PolicyBridge is not responsible for the conduct of other community members or for
            interactions occurring on third-party platforms, but reserves the right to moderate or remove
            participants to protect community safety.
        </p>
    </section>

    <section id="sec-4">
        <h2>4. User Submissions & Intellectual Property</h2>
        <h3>4.1 Ownership</h3>
        <p>You retain ownership of your original submissions.</p>

        <h3>4.2 Licence to PolicyBridge</h3>
        <p>By submitting a solution, you grant PolicyBridge and the Stakeholders a non-exclusive, worldwide, royalty-free, transferable, and sub-licensable licence solely to:</p>
        <ul>
            <li>use, edit, adapt, display and analyse your submission;</li>
            <li>publish and distribute it in policy briefs, research materials, and stakeholder reports for purposes of policy research, citizen engagement, media dissemination, and public-interest advocacy;</li>
            <li>store it for the duration necessary to fulfil the Platform's public interest mission as part of the public policy record.</li>
        </ul>

        <div class="warranty-card">
            <h3>4.3 User Warranties</h3>
            <p>By submitting content, you warrant that:</p>
            <ul>
                <li>The submission is your own <strong>original work</strong>;</li>
                <li>The submission does not infringe any <strong>third-party rights</strong> (copyright, trademark, privacy, or other intellectual property or confidentiality obligations);</li>
                <li>The submission is lawful, non-defamatory, and non-harmful;</li>
                <li>You have all rights necessary to grant the required licence;</li>
                <li>You understand submissions are <strong>not confidential</strong>;</li>
                <li>Submission does <strong>not</strong> constitute a contract for compensation or employment.</li>
            </ul>
        </div>

        <h3>4.4 No Confidentiality</h3>
        <p>PolicyBridge does not guarantee confidentiality for any submission. All submitted solutions may be publicly accessed, reviewed, and shared with stakeholders for policy development.</p>
    </section>

    <section id="sec-5">
        <h2>5. Submission, Review & Voting Process</h2>
        <p>All submissions must be non-identifying, original, detailed, and directly address a featured Policy Challenge in compliance with these Terms. Submissions that violate these rules will be removed without notice.</p>
        <ul>
            <li>Shortlisting is done by an independent review committee using the published criteria (Relevance, Feasibility, Impact).</li>
            <li>Final policy briefs selection incorporates both committee evaluation and community voting.</li>
            <li>PolicyBridge may edit, combine, or adapt submissions to produce final policy briefs.</li>
            <li>PolicyBridge may retain submissions that are used in policy briefs, have been shared with stakeholders, form part of anonymised datasets, or contribute to public-interest research.</li>
        </ul>
        <h4>No Guarantee</h4>
        <p>Submission does not guarantee publication, shortlisting, selection, voting, or ultimately implementation by any government entity or relevant stakeholder. PolicyBridge is not responsible for the actions or inaction of the government or other relevant stakeholders.</p>
    </section>

    <section id="sec-6">
        <h2>6. Disclaimers and Limitation of Liability</h2>
        <h3>6.1. Platform “As Is”</h3>
        <p>The Platform is provided “as is.” PolicyBridge makes no warranties, express or implied, regarding the Platform's reliability, accuracy, or fitness for a particular purpose, or that the Platform will operate without errors or interruptions.</p>
        <p>PolicyBridge may introduce, modify, or discontinue features, including beta features, without notice. PolicyBridge does not guarantee that submissions will influence public policy or that stakeholders will act upon any policy brief.</p>

        <h3>6.2. Platform Use at Your Own Risk</h3>
        <p>Your use of the Platform is entirely at your own risk. PolicyBridge does not guarantee uninterrupted access, error-free functionality, or security beyond industry-standard measures. The Platform may become unavailable due to maintenance, outages, or events beyond our control.</p>

        <h3>6.3. Limitation of Liability</h3>
        <p>All submissions, votes, and ideas posted on the Platform are the sole responsibility of the users who submit them. PolicyBridge is not liable for the accuracy, legality, completeness, or consequences of any user-generated content.</p>
        <p>PolicyBridge does not control how stakeholders, partners, or third parties interpret or use policy briefs. We are not responsible for decisions or inaction by external stakeholders, adoption or modification of submissions, outcomes arising from policy implementation or non-implementation.</p>
        <p>PolicyBridge is not responsible for decisions made in reliance on the platform content, for missed opportunities, for funding or recognition, or for the political, social, or professional consequences of participation or use of the platform.</p>
        <p>To the fullest extent permitted by Kenyan law, PolicyBridge’s total cumulative liability arising out of or related to Platform use shall not exceed the amount paid by the user in the preceding 12 months, typically <strong>Ksh. 0.00</strong>, as the Platform is free.</p>

        <h3>6.4. No Responsibility for External Outcomes</h3>
        <p>PolicyBridge is not liable for: government inaction or decisions; how partners interpret or implement briefs; and reliance on any platform content.</p>

        <h3>6.5. No Professional Advice</h3>
        <p>PolicyBridge provides civic engagement information only and does not constitute legal, financial, or professional advice. Users should seek independent advice when necessary.</p>
    </section>

    <section id="sec-7">
        <h2>7. Third-Party Services & Links</h2>
        <p>The Platform may use third-party hosting, analytics, authentication, or external links. PolicyBridge is not responsible for the security, reliability, or practices of third-party systems.</p>
    </section>

    <section id="sec-8">
        <h2>8. Indemnification</h2>
        <p>You agree to indemnify, defend and hold harmless PolicyBridge, its founders, advisors, reviewers, partners, staff, contractors and affiliates from any and all claims, losses, liabilities, damages, or expenses (including legal fees) arising out of:</p>
        <ul>
            <li>your use or misuse of the Platform, including attempts to manipulate voting, breach platform security, or submit prohibited content.</li>
            <li>your submissions, including but not limited to: accuracy, originality, or legality of the content you provide; infringement of intellectual property rights; defamatory or unlawful statements; violation of the rights of any third party.</li>
            <li>your breach of these Terms, the Privacy Policy, or any infringement caused by your content under any applicable law.</li>
        </ul>
        <p>This indemnity continues even after you stop using the Platform.</p>
    </section>

    <section id="sec-9">
        <h2>9. Moderation, Suspension & Termination</h2>
        <p>PolicyBridge reserves the right, at its sole discretion, to at any time for violations of these Terms or for any reason deemed necessary to protect the Platform or its users: remove or edit submissions; restrict or suspend user access; block abusive or harmful behaviour; modify or discontinue any part of the Platform. No prior notice is required.</p>
    </section>

    <section id="sec-10">
        <h2>10. Governing Law & Dispute Resolution</h2>
        <p>The laws of Kenya govern these Terms. The parties shall first attempt to resolve any dispute amicably through good-faith negotiations for a period of 30 days. If unresolved, disputes shall be resolved by a competent court of law in Kenya. Any proceedings shall be filed in Nairobi, Kenya.</p>
    </section>

    <section id="sec-11">
        <h2>11. Data Protection</h2>
        <p>Your use of the Platform is also governed by our Privacy Policy, which is compliant with the Data Protection Act 2019. While we use industry-standard security measures, no online system is ever completely secure.</p>
        <p>You acknowledge that you submit information at your own risk and that PolicyBridge does not guarantee protection from all cyber-attacks, prevention of unauthorised access and/or absolute security of stored data. We will notify affected users when required by law, but we are not liable for unauthorised access occurring despite reasonable safeguards.</p>
        <p>Where participation in Platform features requires the processing of additional personal data (including contact information for community engagement or volunteering), such processing shall only occur on the basis of explicit, informed, and freely given consent, which may be withdrawn at any time without prejudice.</p>
    </section>

    <section id="sec-12">
        <h2>12. Severability</h2>
        <p>If any part of these Terms is held to be unlawful, invalid, or unenforceable by a court of competent jurisdiction, the remaining provisions will remain in full force and effect. Any invalid provision will be interpreted or replaced in a way that best reflects the original intent while remaining lawful.</p>
    </section>

    <section id="sec-13">
        <h2>13. Entire Agreement</h2>
        <p>These Terms constitute the entire agreement between you and PolicyBridge regarding your use of the Platform and supersede any prior understandings or discussions.</p>
    </section>

    <section id="sec-14">
        <h2>14. Changes to Terms</h2>
        <p>PolicyBridge may update these Terms at any time. We will alert you about any changes by updating the “Last updated” date of these Terms, and you waive any right to receive specific notice of each such change.</p>
        <p>It is your responsibility to periodically review these Terms and Conditions to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms by your continued use of the Platform after the date such revised Terms and Conditions are posted.</p>
    </section>

    <section id="sec-15">
        <h2>15. Contact</h2>
        <div class="contact-box">
            <p>For questions regarding these Terms of Use and Submission, contact:</p>
            <a href="mailto:info@policybridge.org" class="email-btn">info@policybridge.org</a>
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
        line-height: 1.7;
    }

    header {
        border-bottom: 3px solid #2e7d32;
        margin-bottom: 30px;
    }

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
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .index-section {
        background: #f1f8e9;
        padding: 25px;
        border-radius: 12px;
        margin-bottom: 40px;
    }

    .index-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 10px;
        list-style: none;
        padding: 0;
    }

    .index-list a {
        text-decoration: none;
        color: #1b5e20;
        font-weight: 500;
    }

    section {
        margin-bottom: 50px;
        scroll-margin-top: 80px;
    }

    h2 {
        border-left: 6px solid #2e7d32;
        padding-left: 15px;
        margin-bottom: 20px;
        color: #1b5e20;
    }

    h3 {
        color: #2e7d32;
        margin-top: 25px;
        margin-bottom: 10px;
    }

    .alert.warning {
        background: #fff9c4;
        border-left: 5px solid #fbc02d;
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
    }

    .table-container {
        overflow-x: auto;
        margin: 20px 0;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        background: #fff;
    }

    th,
    td {
        padding: 15px;
        text-align: left;
        border-bottom: 1px solid #eee;
        vertical-align: top;
    }

    th {
        background: #f1f8e9;
        color: #1b5e20;
    }

    .warranty-card {
        background: #f1f8e9;
        border: 1px solid #c8e6c9;
        padding: 25px;
        border-radius: 12px;
        margin: 25px 0;
    }

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

    ul {
        padding-left: 20px;
        margin-bottom: 1rem;
    }

    li {
        margin-bottom: 8px;
    }

    .divider {
        border: 0;
        border-top: 1px solid #eee;
        margin: 40px 0;
    }
</style>