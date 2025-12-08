<script>
    import { page } from '$app/stores';

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
    </div>
</header>

<style>
    /* * Uses variables defined in src/app.css 
     * Primary accent (Green) for professionalism and action.
     */
    header {
        background-color: var(--color-white);
        border-bottom: 2px solid var(--color-border-light);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        padding: 15px 0;
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

    /* --- Navigation Styles --- */
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

    /* Mobile First: Hide navigation on smaller screens for now */
    @media (max-width: 900px) {
        .main-nav {
            display: none; /* We'll implement a hamburger menu later */
        }
        .header-content {
            justify-content: center;
        }
    }
</style>