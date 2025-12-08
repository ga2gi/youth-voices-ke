<script>
    const currentYear = new Date().getFullYear();
</script>

<footer class="main-footer">
    <div class="container footer-content">
        <div class="footer-brand">
            <span class="logo-text">Youth Voices KE 🇰🇪</span>
            <p>Empowering the youth to be co-creators of policy.</p>
            <p>&copy; {currentYear} Policy Platform. All rights reserved.</p>
        </div>
        
        <div class="footer-links">
            <h4>Quick Links</h4>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/briefs">Policy Tracking</a></li>
                <li><a href="/submit" class="button-link">Submit Solution</a></li>
            </ul>
        </div>
        
        <div class="footer-external">
            <h4>Relevant Resources</h4>
            <ul>
                <li><a href="https://www.parliament.go.ke/" target="_blank" rel="noopener noreferrer">Parliament of Kenya</a></li>
                <li><a href="https://kippra.or.ke/" target="_blank" rel="noopener noreferrer">KIPPRA (Policy Research)</a></li>
                <li><a href="https://www.youth.go.ke/" target="_blank" rel="noopener noreferrer">Ministry of Youth Affairs</a></li>
            </ul>
        </div>
        
        <div class="footer-legal">
            <h4>Legal & Connect</h4>
            <ul>
                <li><a href="/terms">Terms of Use</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li class="contact-info">Email: partnerships@youthvoiceske.org</li>
            </ul>
        </div>
    </div>
</footer>

<style>
    /* --- Footer Styling --- */
    .main-footer {
        background-color: var(--color-text-dark);
        color: var(--color-white);
        padding: 40px 0;
        border-top: 5px solid var(--color-primary-accent);
    }
    
    .container { 
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .footer-content {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
    }

    .logo-text {
        font-size: 1.5em;
        font-weight: 700;
        color: var(--color-primary-accent);
        display: block;
        margin-bottom: 10px;
    }
    
    .footer-brand p {
        font-size: 0.9em;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 5px;
    }

    .footer-links h4, .footer-external h4, .footer-legal h4 {
        color: var(--color-secondary-accent);
        font-size: 1.1em;
        margin-bottom: 15px;
        font-weight: 600;
    }

    .footer-links ul, .footer-external ul, .footer-legal ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer-links a, .footer-external a, .footer-legal a {
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        display: block;
        padding: 5px 0;
        font-size: 0.95em;
        transition: color 0.2s;
    }
    
    .footer-external a:after {
        content: ' ↗'; /* External link indicator */
        font-size: 0.7em;
        margin-left: 3px;
        opacity: 0.6;
    }

    .footer-links a:hover, .footer-external a:hover, .footer-legal a:hover {
        color: var(--color-primary-accent);
    }
    
    .contact-info {
        color: var(--color-white);
        padding: 5px 0;
        font-size: 0.95em;
        margin-top: 10px;
    }

    /* Responsive adjustments */
    @media (max-width: 900px) {
        .footer-content {
            grid-template-columns: repeat(2, 1fr);
        }
        .footer-brand {
            grid-column: 1 / -1;
            margin-bottom: 20px;
        }
    }

    @media (max-width: 500px) {
        .footer-content {
            grid-template-columns: 1fr;
        }
    }
</style>