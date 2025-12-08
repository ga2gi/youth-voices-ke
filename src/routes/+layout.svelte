<script>
    import "../app.css";
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte'; // <-- ADD THIS IMPORT
</script>

<Header />

<main class="container">
    <slot />
</main>

<Footer /> <style>
    /* Layout specific styles */
    main.container {
        padding-top: 40px; /* Space below the fixed header */
        padding-bottom: 80px;
        min-height: 80vh; /* Ensures content pushes the footer down */
    }
</style>