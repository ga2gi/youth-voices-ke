<script>
    import '../app.css';
    import Header from '$lib/components/Header.svelte'; 
    import Footer from '$lib/components/Footer.svelte'; 
    import { page } from '$app/stores';

    // This helps with "cohesion" by allowing you to style 
    // the layout differently based on the current route if needed.
    $: currentRoute = $page.url.pathname;
</script>

<div class="layout-wrapper" data-route={currentRoute}>
    <Header />

    <main class="content-area">
        <slot />
    </main>

    <Footer />
</div>

<style>
    /* NGO Standard: High-contrast, clean lines, and 
       "Sticky Footer" behavior to prevent layout jumps.
    */
    :global(:root) {
        --brand-navy: #0f172a;
        --brand-green: #059669;
        --bg-paper: #ffffff;
        --text-main: #1e293b;
    }

    .layout-wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--bg-paper);
        /* Ensures smooth font rendering for policy documents */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .content-area {
        flex: 1; /* Pushes footer to the bottom */
        display: flex;
        flex-direction: column;
        
        /* Subtle animation when switching between the 
           Homepage and Policy Briefs.
        */
        animation: fadeIn 0.4s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Mobile-first adjustments for the layout container */
    @media (max-width: 768px) {
        .content-area {
            /* Ensures content doesn't feel cramped on mobile */
            padding-bottom: 2rem; 
        }
    }
</style>