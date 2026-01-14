<script>
    import { page } from '$app/stores';

    // 1. Mobile Menu State
    let isMobileMenuOpen = false;

    // Navigation links - Optimized for spacing
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/submit', label: 'Submit Solution' },
        { href: '/vote', label: 'Voting Phase' },
        { href: '/briefs', label: 'Policy Briefs' },
        { href: '/education', label: 'Civic Education' },
        { href: '/about', label: 'About' },
        { href: '/recognition', label: 'Stakeholder Recognition' },
    ];
    
    // 2. Close the menu automatically when navigating
    $: {
        if ($page.url.pathname) {
            isMobileMenuOpen = false;
        }
    }
</script>

<header>
    <div class="container header-content">
        <a href="/" class="logo-link">
            <h1 class="logo-text">Youth Voices <span class="accent-ke-green">KE</span></h1>
        </a>

        <nav class="main-nav">
            <ul>
                {#each navLinks as link}
                    <li>
                        <a href={link.href} class:active={$page.url.pathname === link.href}>
                            {link.label}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
        
        <button class="menu-toggle" aria-label="Toggle Menu" on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}>
            {#if isMobileMenuOpen}
                &times; {:else}
                &#9776; {/if}
        </button>
    </div>
</header>

<div class="mobile-menu" class:open={isMobileMenuOpen}>
    {#each navLinks as link}
        <a href={link.href} class="mobile-nav-link" class:active={$page.url.pathname === link.href}>
            {link.label}
        </a>
    {/each}
</div>

<style>
    /* --- MAIN HEADER STRUCTURE --- */
    header {
        background-color: var(--color-white, #ffffff);
        /* Replaced festive gradient with standard brand green border */
        border-bottom: 4px solid var(--color-primary, #007A33);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        padding: 10px 0; /* Slimmer padding to save vertical space */
        position: sticky;
        top: 0;
        z-index: 1000;
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .logo-link {
        text-decoration: none;
        color: var(--color-dark, #1a1a1a);
        white-space: nowrap;
    }

    .logo-text {
        position: relative;
        display: inline-block;
        font-size: 1.1rem;
        margin: 0;
    }

    .accent-ke-green {
        color: var(--color-primary, #007A33);
        font-weight: 800;
    }

    /* --- DESKTOP NAVIGATION --- */
    .main-nav ul {
        list-style: none;
        display: flex;
        gap: 12px; /* Tighter gap to fit all links */
        margin: 0;
        padding: 0;
    }

    .main-nav a {
        text-decoration: none;
        color: var(--color-dark, #1a1a1a);
        font-weight: 600;
        padding: 4px 2px;
        transition: all 0.3s ease;
        font-size: 0.82rem; /* Adjusted for better fit */
        white-space: nowrap;
    }

    .main-nav a:hover {
        color: var(--color-primary, #007A33);
    }

    .main-nav a.active {
        color: var(--color-primary, #007A33);
        border-bottom: 2px solid var(--color-primary, #007A33);
    }

    /* --- MOBILE STYLES --- */
    .menu-toggle {
        display: none;
        background: none;
        border: none;
        color: var(--color-dark, #1a1a1a);
        font-size: 2em;
        cursor: pointer;
        padding: 0 5px;
        line-height: 1;
        z-index: 1001;
    }

    .mobile-menu {
        position: fixed;
        top: 60px; /* Adjusted for header height without banner */
        left: 0;
        width: 100%;
        background-color: #1a1a1a;
        display: flex;
        flex-direction: column;
        transform: translateY(-150%);
        transition: transform 0.4s ease-in-out;
        z-index: 999;
        box-shadow: 0 10px 15px rgba(0,0,0,0.3);
    }

    .mobile-menu.open {
        transform: translateY(0);
    }

    .mobile-nav-link {
        color: white;
        text-decoration: none;
        padding: 18px 20px;
        border-bottom: 1px solid #333;
        text-align: center;
        font-weight: 600;
    }

    .mobile-nav-link:hover, .mobile-nav-link.active {
        background-color: var(--color-primary, #007A33);
        color: white;
    }

    /* --- BREAKPOINT ADJUSTMENTS --- */
    @media (max-width: 1180px) {
        .main-nav { display: none; }
        .menu-toggle { display: block; }
    }
    
    @media (max-width: 600px) {
         .logo-text { font-size: 1rem; }
    }
</style>