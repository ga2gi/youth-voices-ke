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

<div class="holiday-banner">
    <span class="snowflake">❄</span>
    Happy Holidays from Youth Voices KE!
    <span class="snowflake">❄</span>
</div>

<header>
    <div class="container header-content">
        <a href="/" class="logo-link">
            <h1 class="festive-logo">Youth Voices <span class="accent-ke-green">KE</span></h1>
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
    /* --- HOLIDAY ELEMENTS --- */
    .holiday-banner {
        background: linear-gradient(90deg, #B01E26, #d42d36, #B01E26);
        background-size: 200% auto;
        animation: bannerShimmer 3s linear infinite;
        color: white;
        text-align: center;
        height: 35px; /* Fixed height to prevent shifting */
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.85rem;
        font-weight: 700;
        letter-spacing: 0.5px;
        z-index: 1001;
        position: relative;
    }

    @keyframes bannerShimmer {
        to { background-position: 200% center; }
    }

    .snowflake {
        display: inline-block;
        animation: spin 4s linear infinite;
        margin: 0 8px;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    /* Precise Santa Hat positioning */
    .festive-logo {
        position: relative;
        display: inline-block;
        font-size: 1.1rem; /* Matched to your photo preference */
        margin-left: 10px;
    }

    .festive-logo::before {
        content: "🎅";
        position: absolute;
        top: -14px; /* Sits right on top of the text */
        left: -10px;
        font-size: 1.1rem;
        transform: rotate(-10deg);
        filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.1));
    }

    /* --- MAIN HEADER STRUCTURE --- */
    header {
        background-color: var(--color-white);
        /* Festive Green & Red bottom border */
        border-bottom: 4px solid transparent;
        border-image: linear-gradient(to right, #007A33, #B01E26, #007A33, #B01E26) 1;
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
        color: var(--color-text-dark);
        white-space: nowrap;
    }

    .accent-ke-green {
        color: #8B1620; /* Your specific dark red from original code */
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
        color: var(--color-text-dark);
        font-weight: 600;
        padding: 4px 2px;
        transition: all 0.3s ease;
        font-size: 0.82rem; /* Adjusted for better fit */
        white-space: nowrap;
    }

    .main-nav a:hover {
        color: #B01E26;
        text-decoration: underline wavy #007A33;
    }

    .main-nav a.active {
        color: var(--color-primary-accent);
        border-bottom: 2px solid var(--color-primary-accent);
    }

    /* --- MOBILE STYLES --- */
    .menu-toggle {
        display: none;
        background: none;
        border: none;
        color: var(--color-text-dark);
        font-size: 2em;
        cursor: pointer;
        padding: 0 5px;
        line-height: 1;
        z-index: 1001;
    }

    .mobile-menu {
        position: fixed;
        top: 95px; /* Banner height + Header height */
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
        background-color: #B01E26;
        color: white;
    }

    /* --- BREAKPOINT ADJUSTMENTS --- */
    /* Switched to mobile menu earlier to prevent text overlapping */
    @media (max-width: 1180px) {
        .main-nav { display: none; }
        .menu-toggle { display: block; }
    }
    
    @media (max-width: 600px) {
         .festive-logo { font-size: 1rem; }
         .festive-logo::before { top: -12px; font-size: 1rem; }
    }
</style>