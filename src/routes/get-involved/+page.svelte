<script>
    import { fade, fly } from 'svelte/transition';
    export let data;

    // Consent State
    let hasConsented = false;

    const initiatives = [
        { icon: '🌍', title: 'Climate Action', desc: 'Tree planting and sustainability advocacy.' },
        { icon: '🤝', title: 'Charity & Outreach', desc: 'Supporting local children\'s homes and communities.' },
        { icon: '📢', title: 'Advocacy', desc: 'Campaigning for youth rights in local policy.' }
    ];
</script>

<svelte:head>
    <title>Get Involved | PolicyBridge KE</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700;900&display=swap" rel="stylesheet">
</svelte:head>

<div class="page-container">
    <header class="hero" in:fade>
        <span class="eyebrow">Direct Impact</span>
        <h1>PolicyBridge KE: <br><span class="accent">Your Voice Matters. Make It Count.</span></h1>
        <p>Join Kenya's youth community that turns ideas into real action, influences policy, and connects changemakers across the country.</p>
        <!-- NEW: Rolling Basis Badge -->
        <div class="rolling-badge">
            <span class="badge-icon">📱</span>
            <span>Rolling Basis • Applications Open</span>
        </div>
    </header>

    <section class="consent-box" in:fly={{ y: 20 }}>
        <label class="consent-label">
            <input type="checkbox" bind:checked={hasConsented}>
            <span class="checkmark"></span>
            <p>
                I <strong>explicitly consent</strong> to the processing of my personal data by PolicyBridge KE as outlined in the
                <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Submission</a>
                for the purposes of community engagement and volunteering. I understand I can withdraw this consent at any time by contacting
                <a href="mailto:info@policybridge.or.ke">info@policybridge.or.ke</a>.
            </p>
        </label>
    </section>

    <section class="main-actions">
        <div class="action-card community" class:disabled={!hasConsented} in:fly={{ y: 20, delay: 100 }}>
            <span class="card-icon">💬</span>
            <h3>WhatsApp Community</h3>
            <p>Be part of a youth-led network driving discussions, volunteering, and policy solutions that shape Kenya's future.</p>
            <a href={hasConsented ? data.links.whatsapp : '#'}
               class="btn-whatsapp"
               class:inactive={!hasConsented}>
                {hasConsented ? 'Join WhatsApp Group' : 'Check consent box to join'}
            </a>
        </div>

        <div class="action-card ambassador" class:disabled={!hasConsented} in:fly={{ y: 20, delay: 200 }}>
            <span class="card-icon">🎓</span>
            <h3>Join Campus Ambassador Program</h3>
            <p>Represent PolicyBridge KE at your university or college. Coordinate policy labs, mobilize students, and transform campus ideas into national solutions.</p>
            <div class="ambassador-info">
                <p class="info-text">As a Campus Ambassador, you'll be part of a national youth network working to transform student ideas into structured policy solutions.</p>
            </div>
            <!-- UPDATED: Google Form Link with rolling basis tag -->
            <a href={hasConsented ? 'https://forms.gle/XeAZ59WoQQTHfucP9' : '#'}
               class="btn-ambassador"
               class:inactive={!hasConsented}
               target="_blank">
                {hasConsented ? 'Apply Now (Rolling Basis)' : 'Check consent box to apply'}
            </a>
            <span class="rolling-tag">📋 Rolling admissions</span>
        </div>
    </section>

    <section class="ambassador-details" in:fly={{ y: 20, delay: 300 }}>
        <div class="details-card">
            <h3>🌟 What Campus Ambassadors Do</h3>
            <div class="details-grid">
                <div class="detail-item">
                    <span class="detail-icon">📢</span>
                    <p>Share official updates and announcements with your campus community</p>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">🤝</span>
                    <p>Coordinate ambassador activities and campus engagement events</p>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">💡</span>
                    <p>Share policy challenges and youth participation opportunities</p>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">🎯</span>
                    <p>Organize onboarding sessions and ambassador meetings</p>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">📊</span>
                    <p>Collect ideas, feedback, and insights from your campus</p>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">🏆</span>
                    <p>Lead PolicyBridge KE Policy Labs at your institution</p>
                </div>
            </div>
        </div>
    </section>

    <section class="initiatives">
        <h2>Our Impact Areas</h2>
        <div class="impact-list">
            {#each initiatives as item}
                <div class="impact-item">
                    <div class="icon-wrap">{item.icon}</div>
                    <div class="content">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <section class="socials">
        <h3>Connect Everywhere</h3>
        <p>Follow us for stories, trends, and opportunities.</p>
        <div class="social-grid">
            <a href={data.links.tiktok} target="_blank" class="s-tag">TikTok</a>
            <a href={data.links.x} target="_blank" class="s-tag">X (Twitter)</a>
            <a href={data.links.instagram} target="_blank" class="s-tag">Instagram</a>
            <a href={data.links.reddit} target="_blank" class="s-tag">Reddit</a>
            <a href={data.links.linkedin} target="_blank" class="s-tag">LinkedIn</a>
        </div>
    </section>

    <section class="footer-cta" in:fade={{ delay: 400 }}>
        <h2>Ready to make a difference?</h2>
        <div class="cta-btns">
            <!-- UPDATED: Google Form Link in footer -->
            <a href={hasConsented ? 'https://forms.gle/XeAZ59WoQQTHfucP9' : '#'} 
               class="btn-primary" 
               class:inactive={!hasConsented}
               target="_blank">
               Apply Now (Rolling Basis)
            </a>
            <a href="/about" class="btn-ghost">Learn More</a>
        </div>
    </section>
</div>

<style>
    /* NEW: Rolling Basis Badge Styles */
    .rolling-badge {
        display: inline-block;
        background: #dbeafe;
        padding: 8px 24px;
        border-radius: 50px;
        margin-top: 25px;
        font-size: 0.9rem;
        font-weight: 600;
        color: #1e3a8a;
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    .badge-icon {
        margin-right: 8px;
    }

    .rolling-tag {
        display: inline-block;
        margin-top: 10px;
        font-size: 0.8rem;
        color: #d97706;
        font-weight: 600;
        background: #fef3c7;
        padding: 4px 12px;
        border-radius: 50px;
        width: fit-content;
    }

    /* Consent Styles */
    .consent-box {
        background: #fff;
        border: 2px dashed #ccc;
        padding: 20px;
        border-radius: 16px;
        margin-bottom: 40px;
        display: flex;
        justify-content: center;
    }

    .consent-label {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        cursor: pointer;
        max-width: 600px;
    }

    .consent-label input {
        width: 24px;
        height: 24px;
        accent-color: #064e3b;
        margin-top: 4px;
    }

    .consent-label p {
        margin: 0;
        font-size: 0.95rem;
        color: #444;
        line-height: 1.4;
    }

    .consent-label a {
        color: #064e3b;
        font-weight: 700;
        text-decoration: underline;
    }

    /* Card & Button Disabling Logic */
    .action-card.disabled {
        opacity: 0.6;
        filter: grayscale(0.5);
        pointer-events: none;
    }

    .inactive {
        background: #999 !important;
        cursor: not-allowed;
        pointer-events: none;
    }

    /* Core Layout Styles */
    :global(body) { font-family: 'Source Sans 3', sans-serif; background-color: #fcfcfc; margin: 0; }
    .page-container { max-width: 1000px; margin: 0 auto; padding: 60px 20px; }
    .hero { text-align: center; margin-bottom: 80px; }
    .eyebrow { color: #064e3b; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; }
    h1 { font-size: 3rem; font-weight: 900; margin: 15px 0; line-height: 1; }
    .accent { color: #064e3b; }
    .hero p { font-size: 1.25rem; color: #555; max-width: 600px; margin: 0 auto; line-height: 1.6; }
    .main-actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 40px; }
    .action-card { background: white; border: 2px solid #f0f0f0; border-radius: 24px; padding: 40px; transition: 0.3s ease; position: relative; }
    .action-card:hover { border-color: #064e3b; transform: translateY(-5px); }
    .action-card.community { background: #f0fdf4; border-color: #064e3b; }
    .action-card.ambassador { background: #fef3c7; border-color: #d97706; }
    .card-icon { font-size: 3rem; margin-bottom: 20px; display: block; }
    h3 { font-size: 1.6rem; margin-bottom: 12px; }
    .action-card p { color: #666; margin-bottom: 15px; line-height: 1.5; }
    
    .ambassador-info {
        background: white;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 20px;
        border-left: 4px solid #d97706;
    }
    
    .info-text {
        font-size: 0.9rem;
        color: #555;
        font-style: italic;
        margin: 0;
    }
    
    .btn-whatsapp { background: #25D366; color: white; display: block; text-align: center; padding: 15px; border-radius: 12px; text-decoration: none; font-weight: 700; }
    .btn-ambassador { background: #d97706; color: white; display: block; text-align: center; padding: 15px; border-radius: 12px; text-decoration: none; font-weight: 700; }
    .btn-dark { background: #111; color: white; display: block; text-align: center; padding: 15px; border-radius: 12px; text-decoration: none; font-weight: 700; }
    
    /* Ambassador Details Section */
    .ambassador-details {
        margin-bottom: 60px;
    }
    
    .details-card {
        background: linear-gradient(135deg, #fef3c7 0%, #fff7ed 100%);
        border: 2px solid #fbbf24;
        border-radius: 24px;
        padding: 40px;
    }
    
    .details-card h3 {
        text-align: center;
        margin-bottom: 30px;
        color: #92400e;
    }
    
    .details-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }
    
    .detail-item {
        display: flex;
        gap: 15px;
        align-items: flex-start;
        background: white;
        padding: 20px;
        border-radius: 12px;
        transition: 0.3s ease;
    }
    
    .detail-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .detail-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
    }
    
    .detail-item p {
        margin: 0;
        color: #555;
        line-height: 1.5;
        font-size: 0.95rem;
    }
    
    .initiatives { margin-bottom: 80px; }
    .impact-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 40px; }
    .impact-item { display: flex; gap: 20px; align-items: flex-start; }
    .icon-wrap { background: #ecfdf5; padding: 12px; border-radius: 12px; font-size: 1.5rem; }
    h4 { font-size: 1.2rem; margin: 0 0 5px 0; }
    .impact-item p { margin: 0; color: #555; font-size: 0.95rem; line-height: 1.5; }
    .socials { text-align: center; margin-bottom: 100px; }
    .social-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 30px; }
    .s-tag { padding: 10px 24px; border: 2px solid #eee; border-radius: 50px; text-decoration: none; color: #111; font-weight: 600; font-size: 0.9rem; transition: 0.2s; }
    .s-tag:hover { border-color: #064e3b; color: #064e3b; background: #f0fdf4; }
    .footer-cta { background: #064e3b; color: white; padding: 80px 40px; border-radius: 32px; text-align: center; }
    .footer-cta h2 { font-size: 2.5rem; margin-bottom: 20px; }
    .cta-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 30px; }
    .btn-primary { background: white; color: #064e3b; padding: 16px 40px; border-radius: 14px; text-decoration: none; font-weight: 800; font-size: 1.1rem; }
    .btn-ghost { border: 2px solid white; color: white; padding: 16px 40px; border-radius: 14px; text-decoration: none; font-weight: 700; }

    @media (max-width: 600px) {
        h1 { font-size: 2.2rem; }
        .footer-cta h2 { font-size: 1.8rem; }
        .btn-primary, .btn-ghost { width: 100%; }
        .social-grid { gap: 8px; }
        .details-grid { grid-template-columns: 1fr; }
        .rolling-badge { font-size: 0.8rem; padding: 6px 16px; }
    }
</style>