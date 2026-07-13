<script>
    import { page } from '$app/stores';

    let isMobileMenuOpen = false;
    let activeDropdown = null;

    const navLinks = [
        { href: '/', label: 'Home' },
        { 
            label: 'Research', 
            type: 'dropdown',
            key: 'publications',
            children: [
                { href: '/briefs', label: 'Policy Briefs' },
                { href: '/articles', label: 'Articles' },
                { href: '/position', label: 'Position Papers' },
                { href: '/reports', label: 'Annual Reports' },
            ]
        },
        { 
            label: 'Policy Lab', 
            type: 'dropdown',
            key: 'policy-lab',
            children: [
                { href: '/submit', label: 'Submit Solution' },
                { href: '/vote', label: 'Voting Phase' },
                { href: '/recognition', label: 'Stakeholders' },
            ]
        },
        { href: '/education', label: 'Civic Education' },
        { href: '/about', label: 'About' },
    ];
    
    $: {
        if ($page.url.pathname) {
            isMobileMenuOpen = false;
            activeDropdown = null;
        }
    }

    function toggleDropdown(name) {
        activeDropdown = activeDropdown === name ? null : name;
    }

    function handleClickOutside(event) {
        if (!event.target.closest('.dropdown-container')) {
            activeDropdown = null;
        }
    }
</script>

<svelte:window on:click={handleClickOutside} />

<header>
    <div class="header-inner">
        <a href="/" class="logo-link">
            <h1 class="logo-text">PolicyBridge <span class="accent">KE</span></h1>
        </a>

        <nav class="main-nav">
            <ul>
                {#each navLinks as link}
                    <li>
                        {#if link.type === 'dropdown'}
                            <div class="dropdown-container">
                                <button 
                                    class="nav-link dropdown-trigger"
                                    class:active={link.children.some(child => $page.url.pathname === child.href)}
                                    on:click|stopPropagation={() => toggleDropdown(link.key)}
                                >
                                    {link.label}
                                    <svg class="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                        <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                
                                {#if activeDropdown === link.key}
                                    <div class="dropdown-menu">
                                        {#each link.children as child}
                                            <a 
                                                href={child.href} 
                                                class="dropdown-link"
                                                class:active={$page.url.pathname === child.href}
                                            >
                                                {child.label}
                                            </a>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        {:else}
                            <a href={link.href} class="nav-link" class:active={$page.url.pathname === link.href}>
                                {link.label}
                            </a>
                        {/if}
                    </li>
                {/each}
            </ul>
        </nav>

        <a href="/get-involved" class="cta-btn">Get Involved</a>
        
        <button class="menu-toggle" aria-label="Toggle Menu" on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}>
            <span class="menu-icon" class:open={isMobileMenuOpen}>
                <span></span>
                <span></span>
                <span></span>
            </span>
        </button>
    </div>
</header>

<div class="mobile-menu" class:open={isMobileMenuOpen}>
    <nav class="mobile-nav">
        {#each navLinks as link}
            {#if link.type === 'dropdown'}
                <div class="mobile-dropdown">
                    <button 
                        class="mobile-link mobile-dropdown-trigger"
                        on:click|stopPropagation={() => toggleDropdown(`mobile-${link.key}`)}
                    >
                        {link.label}
                        <svg class="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <div class="mobile-dropdown-content" class:open={activeDropdown === `mobile-${link.key}`}>
                        {#each link.children as child}
                            <a href={child.href} class="mobile-sub-link" class:active={$page.url.pathname === child.href}>
                                {child.label}
                            </a>
                        {/each}
                    </div>
                </div>
            {:else}
                <a href={link.href} class="mobile-link" class:active={$page.url.pathname === link.href}>
                    {link.label}
                </a>
            {/if}
        {/each}
        <a href="/get-involved" class="mobile-cta">Get Involved</a>
    </nav>
</div>

<style>
    /* --- HEADER --- */
    header {
        background: #ffffff;
        border-bottom: 1px solid #e5e7eb;
        position: sticky;
        top: 0;
        z-index: 1000;
    }

    .header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
        height: 64px;
    }

    /* --- LOGO --- */
    .logo-link {
        text-decoration: none;
        color: #1a1a1a;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .logo-text {
        font-size: 1.15rem;
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.01em;
    }

    .accent {
        color: #064e3b;
        font-weight: 800;
    }

    /* --- NAVIGATION --- */
    .main-nav ul {
        list-style: none;
        display: flex;
        gap: 4px;
        margin: 0;
        padding: 0;
        align-items: center;
    }

    .nav-link {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 8px 14px;
        text-decoration: none;
        color: #475569;
        font-weight: 500;
        font-size: 0.85rem;
        border-radius: 6px;
        transition: all 0.15s ease;
        background: none;
        border: none;
        cursor: pointer;
        font-family: inherit;
        white-space: nowrap;
    }

    .nav-link:hover {
        color: #064e3b;
        background: #f0fdf4;
    }

    .nav-link.active {
        color: #064e3b;
        background: #f0fdf4;
        font-weight: 600;
    }

    .chevron {
        transition: transform 0.2s ease;
        opacity: 0.5;
    }

    .dropdown-container:hover .chevron {
        opacity: 1;
    }

    /* --- DROPDOWN --- */
    .dropdown-container {
        position: relative;
    }

    .dropdown-menu {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        box-shadow: 0 16px 32px -12px rgba(0, 0, 0, 0.1), 0 4px 8px -4px rgba(0, 0, 0, 0.05);
        min-width: 200px;
        padding: 6px;
        z-index: 100;
        animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .dropdown-link {
        display: block;
        padding: 10px 14px;
        color: #475569;
        text-decoration: none;
        font-size: 0.85rem;
        border-radius: 6px;
        transition: all 0.1s ease;
    }

    .dropdown-link:hover {
        background: #f0fdf4;
        color: #064e3b;
    }

    .dropdown-link.active {
        background: #f0fdf4;
        color: #064e3b;
        font-weight: 600;
    }

    /* --- CTA BUTTON --- */
    .cta-btn {
        display: inline-flex;
        align-items: center;
        padding: 8px 18px;
        background: #064e3b;
        color: white;
        text-decoration: none;
        font-size: 0.82rem;
        font-weight: 600;
        border-radius: 6px;
        transition: background 0.15s ease;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .cta-btn:hover {
        background: #043d2e;
    }

    /* --- MOBILE TOGGLE --- */
    .menu-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
    }

    .menu-icon {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 22px;
    }

    .menu-icon span {
        display: block;
        height: 2px;
        background: #1a1a1a;
        border-radius: 2px;
        transition: all 0.3s ease;
    }

    .menu-icon.open span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
    }

    .menu-icon.open span:nth-child(2) {
        opacity: 0;
    }

    .menu-icon.open span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
    }

    /* --- MOBILE MENU --- */
    .mobile-menu {
        position: fixed;
        top: 64px;
        left: 0;
        width: 100%;
        background: white;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
        z-index: 999;
        border-bottom: 1px solid #e5e7eb;
        max-height: calc(100vh - 64px);
        overflow-y: auto;
    }

    .mobile-menu.open {
        transform: translateY(0);
    }

    .mobile-nav {
        padding: 8px 16px 24px;
    }

    .mobile-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 12px;
        color: #1a1a1a;
        text-decoration: none;
        font-weight: 500;
        font-size: 0.95rem;
        border-radius: 8px;
        background: none;
        border: none;
        width: 100%;
        cursor: pointer;
        font-family: inherit;
        text-align: left;
    }

    .mobile-link:hover {
        background: #f8faf9;
    }

    .mobile-link.active {
        color: #064e3b;
        background: #f0fdf4;
        font-weight: 600;
    }

    .mobile-dropdown-content {
        display: none;
        padding-left: 16px;
    }

    .mobile-dropdown-content.open {
        display: block;
    }

    .mobile-sub-link {
        display: block;
        padding: 12px 12px;
        color: #475569;
        text-decoration: none;
        font-size: 0.9rem;
        border-radius: 6px;
    }

    .mobile-sub-link:hover {
        background: #f8faf9;
    }

    .mobile-sub-link.active {
        color: #064e3b;
        background: #f0fdf4;
        font-weight: 500;
    }

    .mobile-cta {
        display: block;
        text-align: center;
        padding: 14px;
        background: #064e3b;
        color: white;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        border-radius: 8px;
        margin-top: 12px;
    }

    /* --- RESPONSIVE --- */
    @media (max-width: 1020px) {
        .main-nav, .cta-btn {
            display: none;
        }
        .menu-toggle {
            display: block;
        }
    }

    @media (max-width: 480px) {
        .header-inner {
            height: 56px;
            padding: 0 16px;
        }
        .logo-text {
            font-size: 1rem;
        }
        .mobile-menu {
            top: 56px;
            max-height: calc(100vh - 56px);
        }
    }
</style>