<script>
    import { fade, fly } from 'svelte/transition';
    export let data;

    const initiatives = [
        { icon: '🌍', title: 'Climate Action', desc: 'Tree planting and sustainability advocacy.' },
        { icon: '🤝', title: 'Charity & Outreach', desc: 'Supporting local children’s homes and communities.' },
        { icon: '📢', title: 'Advocacy', desc: 'Campaigning for youth rights in local policy.' }
    ];
</script>

<svelte:head>
    <title>Get Involved | Youth Voices KE</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700;900&display=swap" rel="stylesheet">
</svelte:head>

<div class="page-container">
    <header class="hero" in:fade>
        <span class="eyebrow">Direct Impact</span>
        <h1>Youth Voices KE: <br><span class="accent">Join the Community</span></h1>
        <p>A community-driven platform where Kenyan youth move from conversation to action. 
We go beyond policy discussions to support volunteering, direct community impact, 
and youth-led initiatives that create real change.
</p>
    </header>

    <section class="main-actions">
        <div class="action-card community" in:fly={{ y: 20, delay: 100 }}>
            <span class="card-icon">💬</span>
            <h3>WhatsApp Community</h3>
            <p>The core of our daily engagement. Join for updates, debates, and local meetups.</p>
            <a href={data.links.whatsapp} class="btn-whatsapp">Join WhatsApp Group</a>
        </div>

        <div class="action-card volunteer" in:fly={{ y: 20, delay: 200 }}>
            <span class="card-icon">🙋🏾‍♂️</span>
            <h3>Volunteer With Us</h3>
            <p>Lead campaigns, research policy, or manage community projects in your county.</p>
            <a href={data.links.volunteerForm} class="btn-dark">Apply to Volunteer</a>
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
            <a href={data.links.whatsapp} class="btn-primary">Take Action Now</a>
            <a href="/about" class="btn-ghost">Learn More</a>
        </div>
    </section>
</div>

<style>
    /* Source Sans Pro Implementation */
    :global(body) {
        font-family: 'Source Sans 3', sans-serif;
        background-color: #fcfcfc;
        margin: 0;
    }

    .page-container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 60px 20px;
    }

    .hero { text-align: center; margin-bottom: 80px; }
    .eyebrow { color: #007a33; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; }
    h1 { font-size: 3rem; font-weight: 900; margin: 15px 0; line-height: 1; }
    .accent { color: #007a33; }
    .hero p { font-size: 1.25rem; color: #555; max-width: 600px; margin: 0 auto; line-height: 1.6; }

    .main-actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 80px; }
    .action-card { background: white; border: 2px solid #f0f0f0; border-radius: 24px; padding: 40px; transition: 0.3s ease; }
    .action-card:hover { border-color: #007a33; transform: translateY(-5px); }
    .action-card.community { background: #f4fbf7; border-color: #007a33; }
    .card-icon { font-size: 3rem; margin-bottom: 20px; display: block; }
    h3 { font-size: 1.6rem; margin-bottom: 12px; }
    .action-card p { color: #666; margin-bottom: 30px; line-height: 1.5; }

    .btn-whatsapp { background: #25D366; color: white; display: block; text-align: center; padding: 15px; border-radius: 12px; text-decoration: none; font-weight: 700; }
    .btn-dark { background: #111; color: white; display: block; text-align: center; padding: 15px; border-radius: 12px; text-decoration: none; font-weight: 700; }

    .initiatives { margin-bottom: 80px; }
    .impact-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 40px; }
    .impact-item { display: flex; gap: 20px; align-items: flex-start; }
    .icon-wrap { background: #e6f2eb; padding: 12px; border-radius: 12px; font-size: 1.5rem; }
    h4 { font-size: 1.2rem; margin: 0 0 5px 0; }
    .impact-item p { margin: 0; color: #555; font-size: 0.95rem; line-height: 1.5; }

    .socials { text-align: center; margin-bottom: 100px; }
    .social-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 30px; }
    .s-tag { 
        padding: 10px 24px; border: 2px solid #eee; border-radius: 50px; 
        text-decoration: none; color: #111; font-weight: 600; font-size: 0.9rem; transition: 0.2s;
    }
    .s-tag:hover { border-color: #007a33; color: #007a33; background: #f4fbf7; }

    .footer-cta { background: #007a33; color: white; padding: 80px 40px; border-radius: 32px; text-align: center; }
    .footer-cta h2 { font-size: 2.5rem; margin-bottom: 20px; }
    .cta-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 30px; }
    .btn-primary { background: white; color: #007a33; padding: 16px 40px; border-radius: 14px; text-decoration: none; font-weight: 800; font-size: 1.1rem; }
    .btn-ghost { border: 2px solid white; color: white; padding: 16px 40px; border-radius: 14px; text-decoration: none; font-weight: 700; }

    @media (max-width: 600px) {
        h1 { font-size: 2.2rem; }
        .footer-cta h2 { font-size: 1.8rem; }
        .btn-primary, .btn-ghost { width: 100%; }
        .social-grid { gap: 8px; }
    }
</style>