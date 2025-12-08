<script>
    import { page } from '$app/stores';

    const adminLinks = [
        { href: '/admin', label: 'Dashboard Home' },
        { href: '/admin/submissions', label: 'Submissions Review' },
        { href: '/admin/briefs-tracking', label: 'Policy Briefs Tracking' },
        { href: '/admin/challenges', label: 'Manage Challenges' },
        { href: '/admin/education', label: 'Manage Education' },
    ];

    // Simple function to check if the current link is active
    const isActive = (href) => $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
</script>

<div class="admin-wrapper">
    <aside class="sidebar">
        <h3 class="app-title">Youth Voices KE <span class="admin-tag">Admin</span></h3>
        
        <nav>
            <ul>
                {#each adminLinks as link}
                    <li>
                        <a 
                            href={link.href} 
                            class:active={isActive(link.href)}
                        >
                            {link.label}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
        
        <form method="POST" action="/admin/login?/logout">
            <button type="submit" class="logout-btn">
                Log Out
            </button>
        </form>
    </aside>

    <main class="admin-content-area">
        <slot />
    </main>
</div>

<style>
    /* NOTE: Standard administrative styling for navigation, sidebar, and layout is included here. */
    .admin-wrapper {
        display: flex;
        min-height: 100vh;
        background-color: #f8f9fa;
    }

    .sidebar {
        width: 250px;
        background-color: var(--color-text-dark);
        color: var(--color-white);
        padding: 20px 0;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
    }
    
    .app-title {
        font-size: 1.4em;
        padding: 0 20px 20px 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        font-weight: 700;
    }
    
    .admin-tag {
        font-size: 0.6em;
        vertical-align: top;
        background-color: var(--color-secondary-accent);
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        margin-left: 5px;
    }

    nav ul {
        list-style: none;
        padding: 0;
        flex-grow: 1;
    }

    nav ul li a {
        display: block;
        padding: 12px 20px;
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: background-color 0.2s, color 0.2s;
        border-left: 4px solid transparent;
        font-weight: 500;
    }

    nav ul li a:hover {
        background-color: rgba(255, 255, 255, 0.05);
        color: var(--color-white);
    }
    
    nav ul li a.active {
        background-color: rgba(0, 122, 51, 0.2);
        color: var(--color-primary-accent);
        border-left: 4px solid var(--color-primary-accent);
        font-weight: 600;
    }

    .admin-content-area {
        flex-grow: 1;
        padding: 40px;
        overflow-y: auto;
    }

    .logout-btn {
        background-color: var(--color-secondary-accent);
        color: white;
        border: none;
        padding: 10px 20px;
        margin: 20px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
        width: 80%; /* Fit button nicely inside the sidebar */
        align-self: center;
    }

    .logout-btn:hover {
        background-color: #a01018;
    }
    
    @media (max-width: 768px) {
        .admin-wrapper { flex-direction: column; }
        .sidebar { width: 100%; height: auto; flex-direction: row; flex-wrap: wrap; padding: 10px 20px; justify-content: space-between; }
        .app-title { padding: 0; margin-bottom: 10px; border-bottom: none; flex-basis: 100%; }
        nav { flex-basis: 100%; }
        nav ul { display: flex; flex-wrap: wrap; justify-content: space-around; }
        nav ul li a { padding: 8px 10px; border-left: none; border-bottom: 2px solid transparent; }
        nav ul li a.active { border-left: none; border-bottom: 2px solid var(--color-primary-accent); background-color: transparent; }
        .logout-btn { display: none; } /* Hide button on small screens */
        .admin-content-area { padding: 20px; }
    }
</style>