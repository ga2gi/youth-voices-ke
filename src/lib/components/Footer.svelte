<script>
    const currentYear = new Date().getFullYear();
</script>

<footer class="main-footer">
    <div class="footer-holiday-note">
        <p>🎄 Wishing you a season of joy, peace, and empowerment! ❄️</p>
    </div>

    <div class="container footer-content">
        <div class="footer-brand">
            <span class="logo-text">Youth Voices KE 🇰🇪</span>
            <p>Empowering the youth to be co-creators of policy.</p>
            <p class="footer-url">www.youthvoiceske.org</p>
            <p>&copy; {currentYear} Youth Voices KE. All rights reserved.</p>
        </div>
        
        <div class="footer-links">
            <h4>Quick Links</h4>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/get-involved">Get Involved</a></li>
                <li><a href="/opportunities">Opportunities</a></li> 
                <li><a href="/briefs">Policy Tracking</a></li>
                <li><a href="/submit" class="submit-highlight">Submit Solution</a></li>
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
                <li class="contact-info">📧 info@youthvoiceske.org</li>
                <li class="social-tag">📱 Follow us: @youthvoiceske</li>
            </ul>
        </div>
    </div>
</footer>

<style>
    /* --- Main Footer Container --- */
    .main-footer {
        background-color: #1a1a1a; /* Sleek dark background */
        color: var(--color-white);
        padding: 0 0 40px 0;
        /* Candy-cane style festive border at the top */
        border-top: 6px solid transparent;
        border-image: linear-gradient(to right, #007A33, #B01E26, #007A33, #B01E26) 1;
        font-family: 'Source Sans 3', 'Source Sans Pro', sans-serif;
    }

    /* --- Holiday Note --- */
    .footer-holiday-note {
        background-color: rgba(176, 30, 38, 0.1);
        text-align: center;
        padding: 15px 0;
        margin-bottom: 30px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .footer-holiday-note p {
        font-weight: 600;
        color: #f9f9f9;
        font-size: 0.95rem;
        margin: 0;
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

    /* --- Brand Section --- */
    .logo-text {
        font-size: 1.5em;
        font-weight: 700;
        color: var(--color-green);
        display: block;
        margin-bottom: 10px;
    }

    .footer-url {
        color: var(--color-red) !important;
        font-weight: 700;
        margin-top: 10px;
    }
    
    .footer-brand p {
        font-size: 0.85em;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 5px;
    }

    /* --- Link Headers --- */
    .footer-links h4, .footer-external h4, .footer-legal h4 {
        color: var(--color-red);
        font-size: 1.1em;
        margin-bottom: 15px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .footer-links ul, .footer-external ul, .footer-legal ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer-links a, .footer-external a, .footer-legal a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        display: block;
        padding: 6px 0;
        font-size: 0.9rem;
        transition: all 0.2s ease;
    }
    
    .footer-links a:hover, .footer-external a:hover, .footer-legal a:hover {
        color: var(--color-green);
        transform: translateX(5px);
    }

    .submit-highlight {
        color: var(--color-green) !important;
        font-weight: 700;
    }

    /* --- Contact & Socials --- */
    .contact-info, .social-tag {
        color: var(--color-white);
        padding: 8px 0;
        font-size: 0.9rem;
        font-weight: 500;
    }

    .footer-external a:after {
        content: ' ↗';
        font-size: 0.7em;
        opacity: 0.5;
    }

    /* --- Responsive --- */
    @media (max-width: 900px) {
        .footer-content {
            grid-template-columns: repeat(2, 1fr);
        }
        .footer-brand {
            grid-column: 1 / -1;
            text-align: center;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 20px;
        }
    }

    @media (max-width: 500px) {
        .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
        }
        .footer-links a:hover {
            transform: none;
        }
    }
</style>