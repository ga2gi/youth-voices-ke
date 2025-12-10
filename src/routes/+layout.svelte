<script>
    import '../app.css';
    // Assuming your components are in src/lib/components
    import Header from '$lib/components/Header.svelte'; 
    import Footer from '$lib/components/Footer.svelte'; 
</script>

<div class="layout-wrapper">
    <Header />

    <main class="content">
        <slot />
    </main>

    <Footer />
</div>

<style>
    /* --- Layout Container Styling (for sticky footer) --- */
    .layout-wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .content {
        flex: 1; /* Ensures content pushes the footer down */
    }
</style>
