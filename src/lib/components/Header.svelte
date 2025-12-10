
<script>
    import { page } from '$app/stores';

    // 1. Mobile Menu State: Default is closed (NEW)
    let isMobileMenuOpen = false;

    // Define the navigation links for clarity and easy maintenance
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/submit', label: 'Submit Solution' },
        { href: '/vote', label: 'Voting Phase' },
        { href: '/briefs', label: 'Policy Briefs' },
        { href: '/education', label: 'Civic Education' },
        { href: '/about', label: 'About' },
        { href: '/recognition', label: 'Stakeholder Recognition' },
    ];
    
    // 2. Close the menu automatically when navigating (NEW)
    $: {
        if ($page.url.pathname) {
            isMobileMenuOpen = false;
        }
    }
</script>

<header>
    <div class="container header-content">
        <a href="/" class="logo">
            <h1>Youth Voices <span class="accent-ke-green">KE</span></h1>
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
        
        <button class="menu-toggle" on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}>
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
    /* * Uses variables defined in src/app.css 
      * Primary accent (Green) for professionalism and action.
      */
    header {
        background-color: var(--color-white);
        border-bottom: 2px solid var(--color-border-light);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        padding: 15px 0;
        position: sticky; /* Keeps header visible on scroll */
        top: 0;
        z-index: 1000;
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        text-decoration: none;
        color: var(--color-text-dark);
        font-size: 1.2em;
        white-space: nowrap; /* Keeps the title on one line */
    }

    .accent-ke-green {
        color: var(--color-primary-accent); /* #007A33 - Green */
        font-weight: 800;
    }

    /* --- Desktop Navigation Styles --- */
    .main-nav ul {
        list-style: none;
        display: flex;
        gap: 25px; /* Spacing between links */
        margin: 0;
        padding: 0;
    }

    .main-nav a {
        text-decoration: none;
        color: var(--color-text-dark);
        font-weight: 500;
        padding-bottom: 5px;
        transition: color 0.2s, border-bottom 0.2s;
    }

    .main-nav a:hover {
        color: var(--color-primary-accent);
        border-bottom: 2px solid var(--color-primary-accent);
    }

    /* Active Link Style (Green highlight) */
    .main-nav a.active {
        color: var(--color-primary-accent);
        border-bottom: 2px solid var(--color-primary-accent);
        font-weight: 700;
    }

    /* --- Mobile Menu Toggle --- */
    .menu-toggle {
        display: none; /* Hidden by default */
        background: none;
        border: none;
        color: var(--color-text-dark);
        font-size: 2.2em;
        cursor: pointer;
        padding: 0 5px;
        line-height: 1;
        z-index: 1001; /* Ensure button is on top of dropdown */
    }

    /* --- Mobile Dropdown Menu --- */
    .mobile-menu {
        position: absolute;
        top: 70px; /* Adjust based on your header's actual height (15px padding + content) */
        left: 0;
        width: 100%;
        background-color: var(--color-text-dark); /* Dark background for visibility */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        transform: translateY(-100%); /* Start hidden above the viewport */
        transition: transform 0.3s ease-in-out;
        z-index: 999;
    }

    .mobile-menu.open {
        transform: translateY(0); /* Slide down when open */
    }

    .mobile-nav-link {
        color: var(--color-white);
        text-decoration: none;
        padding: 15px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        text-align: center;
        transition: background-color 0.2s;
    }

    .mobile-nav-link:hover, .mobile-nav-link.active {
        background-color: var(--color-primary-accent);
        color: var(--color-white);
    }

    /* --- Responsive Overrides --- */
    @media (max-width: 900px) {
        /* 1. Hide desktop navigation */
        .main-nav {
            display: none;
        }
        
        /* 2. Show the toggle button */
        .menu-toggle {
            display: block; 
        }

        /* 3. Ensure logo and toggle are visible */
        .header-content {
            justify-content: space-between;
        }
    }
    
    @media (max-width: 600px) {
         .logo h1 {
            font-size: 1.1em;
         }
    }
</style>