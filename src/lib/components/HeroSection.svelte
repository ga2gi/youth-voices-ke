<script>
    // Component expects a title and description prop, which can be passed from the page.
    export let title = "Amplify Your Voice. Drive Kenyan Policy.";
    export let tagline = "Youth-led solutions turned into actionable policy briefs, tracked for transparency.";
</script>

<section class="hero-section">
    <h1>{title}</h1>
    <p class="tagline">{tagline}</p>
    
    <a href="/submit" class="button-primary hero-cta">Submit Your Solution Now</a>
</section>

<style>
    .hero-section {
        padding: 60px 0;
        text-align: center;
        background-color: var(--color-white); /* Clean white background */
        border-radius: 8px;
        margin-bottom: 40px;
    }

    .hero-section h1 {
        font-size: 2.8em;
        font-weight: 700;
        color: var(--color-text-dark);
        margin-bottom: 15px;
        line-height: 1.2;
    }

    .tagline {
        font-size: 1.3em;
        color: var(--color-text-light);
        margin-bottom: 30px;
    }

    .hero-cta {
        padding: 15px 35px;
        font-size: 1.2em;
        text-decoration: none;
    }
</style>