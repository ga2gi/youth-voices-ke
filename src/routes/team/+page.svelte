<!-- src/routes/team/+page.svelte -->
<script>
    const teamMembers = [
        {
            name: "Sharon Gatugi Gikundi",
            role: "Founder",
            email: "sharongatugi@policybridgeke.org",
            bio: "Visionary leader dedicated to bridging the gap between policy research and practical implementation. Sharon founded PolicyBridge KE with a mission to make policy engagement accessible and impactful for all Kenyans.",
            photo: "/images/team/sharon-gatugi.jpeg",
            linkedin: null,
            website: "https://ga2gi.github.io/sharongikundi.github.io/",
            expertise: ["Policy Development", "Strategic Leadership", "Civic Engagement"],
            initials: "SG"
        },
        {
            name: "Kenson Mutethia",
            role: "Co-Founder",
            email: "kensonmutethia@policybridgeke.org",
            bio: "Co-founded PolicyBridge KE, bringing legal expertise and policy analysis to the team. As an Advocate of the High Court of Kenya, Kenson specializes in constitutional law, governance, and policy formulation with a focus on creating sustainable social impact.",
            photo: "/images/team/kenson-mutethia.jpeg",
            linkedin: "https://www.linkedin.com/in/kenson-mutethia-7605a4232?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
            website: null,
            expertise: ["Constitutional Law", "Policy Analysis", "Legal Advocacy", "Governance"],
            initials: "KM"
        }
    ];
</script>

<svelte:head>
    <title>Meet the Team - PolicyBridge KE</title>
    <meta name="description" content="Meet the dedicated team behind PolicyBridge KE - Sharon Gatugi Gikundi (Founder) and Kenson Mutethia (Co-Founder)." />
</svelte:head>

<div class="team-page">
    <!-- Hero Section -->
    <section class="team-hero">
        <div class="container">
            <span class="section-badge">Our Team</span>
            <h1 class="hero-title">Meet the People Behind PolicyBridge KE</h1>
            <p class="hero-subtitle">
                Dedicated professionals committed to bridging the gap between policy research and real-world implementation in Kenya.
            </p>
        </div>
    </section>

    <!-- Team Members Section -->
    <section class="team-members">
        <div class="container">
            <div class="team-grid">
                {#each teamMembers as member}
                    <article class="team-card">
                        <!-- Photo Section -->
                        <div class="member-photo-section">
                            {#if member.photo}
                                <img src={member.photo} alt={member.name} class="profile-photo" />
                            {:else}
                                <div class="photo-placeholder">
                                    <span class="initials">{member.initials}</span>
                                </div>
                            {/if}
                        </div>

                        <!-- Member Info -->
                        <div class="member-info">
                            <div class="member-header">
                                <h2 class="member-name">{member.name}</h2>
                                <span class="member-role">{member.role}</span>
                            </div>

                            <p class="member-bio">{member.bio}</p>

                            <!-- Expertise Tags -->
                            <div class="expertise-tags">
                                {#each member.expertise as skill}
                                    <span class="expertise-tag">{skill}</span>
                                {/each}
                            </div>

                            <!-- Contact & Social Links -->
                            <div class="contact-links">
                                <a href="mailto:{member.email}" class="contact-link email-link">
                                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                    <span>Email</span>
                                </a>
                                
                                {#if member.linkedin}
                                    <a href={member.linkedin} class="contact-link linkedin-link" target="_blank" rel="noopener noreferrer">
                                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                        <span>LinkedIn</span>
                                    </a>
                                {/if}
                                
                                {#if member.website}
                                    <a href={member.website} class="contact-link website-link" target="_blank" rel="noopener noreferrer">
                                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"/>
                                            <line x1="2" y1="12" x2="22" y2="12"/>
                                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                                        </svg>
                                        <span>Website</span>
                                    </a>
                                {/if}
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="team-cta">
        <div class="container">
            <div class="cta-content">
                <h2 class="cta-title">Want to Work With Us?</h2>
                <p class="cta-text">We're always looking for passionate individuals and organizations to collaborate with.</p>
                <a href="/get-involved" class="cta-button">Get Involved</a>
            </div>
        </div>
    </section>
</div>

<style>
    .team-page {
        min-height: 100vh;
        background: #fafafa;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
    }

    /* Hero Section */
    .team-hero {
        background: linear-gradient(135deg, #064e3b 0%, #043d2e 100%);
        padding: 80px 0;
        text-align: center;
        position: relative;
        overflow: hidden;
    }

    .team-hero::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 100%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
        animation: pulse 6s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }

    .section-badge {
        display: inline-block;
        background: rgba(255, 255, 255, 0.1);
        color: #4ade80;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        margin-bottom: 20px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .hero-title {
        font-size: 3rem;
        font-weight: 800;
        color: white;
        margin: 0 0 20px;
        letter-spacing: -0.02em;
        position: relative;
        z-index: 1;
    }

    .hero-subtitle {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.9);
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
        position: relative;
        z-index: 1;
    }

    /* Team Members Grid */
    .team-members {
        padding: 80px 0;
    }

    .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 40px;
        max-width: 1000px;
        margin: 0 auto;
    }

    .team-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid #e5e7eb;
    }

    .team-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border-color: #4ade80;
    }

    /* Photo Section */
    .member-photo-section {
        width: 100%;
        padding: 40px 0 20px;
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .profile-photo {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: contain;
        object-position: center;
        background: white;
        border: 4px solid white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        padding: 8px;
    }

    .team-card:hover .profile-photo {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .photo-placeholder {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: linear-gradient(135deg, #064e3b 0%, #047857 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .initials {
        font-size: 2.5rem;
        font-weight: 700;
        color: white;
        letter-spacing: 1px;
    }

    /* Member Info */
    .member-info {
        padding: 30px;
    }

    .member-header {
        margin-bottom: 15px;
        text-align: center;
    }

    .member-name {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0 0 8px;
        letter-spacing: -0.01em;
    }

    .member-role {
        display: inline-block;
        background: #f0fdf4;
        color: #064e3b;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.5px;
    }

    .member-bio {
        color: #475569;
        line-height: 1.6;
        margin: 0 0 20px;
        font-size: 0.95rem;
        text-align: center;
    }

    /* Expertise Tags */
    .expertise-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 25px;
        justify-content: center;
    }

    .expertise-tag {
        background: #f8faf9;
        color: #475569;
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 0.8rem;
        font-weight: 500;
        border: 1px solid #e5e7eb;
    }

    /* Contact Links */
    .contact-links {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;
        justify-content: center;
    }

    .contact-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        border-radius: 8px;
        text-decoration: none;
        font-size: 0.85rem;
        font-weight: 500;
        transition: all 0.2s ease;
        border: 1px solid #e5e7eb;
    }

    .contact-link .icon {
        width: 16px;
        height: 16px;
    }

    .email-link {
        color: #475569;
        background: white;
    }

    .email-link:hover {
        background: #f8faf9;
        border-color: #cbd5e1;
        color: #064e3b;
    }

    .linkedin-link {
        color: #0a66c2;
        background: #f0f7ff;
        border-color: #b8d4f0;
    }

    .linkedin-link:hover {
        background: #e1efff;
        border-color: #0a66c2;
    }

    .website-link {
        color: #7c3aed;
        background: #faf5ff;
        border-color: #ddd6fe;
    }

    .website-link:hover {
        background: #f3e8ff;
        border-color: #7c3aed;
    }

    /* CTA Section */
    .team-cta {
        background: #064e3b;
        padding: 60px 0;
        margin-top: 40px;
    }

    .cta-content {
        text-align: center;
    }

    .cta-title {
        font-size: 2rem;
        font-weight: 700;
        color: white;
        margin: 0 0 10px;
    }

    .cta-text {
        color: rgba(255, 255, 255, 0.9);
        margin: 0 0 30px;
        font-size: 1.1rem;
    }

    .cta-button {
        display: inline-block;
        background: white;
        color: #064e3b;
        padding: 12px 28px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        transition: all 0.2s ease;
    }

    .cta-button:hover {
        background: #f0fdf4;
        transform: translateY(-2px);
        box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .hero-title {
            font-size: 2rem;
        }
        
        .hero-subtitle {
            font-size: 1rem;
        }
        
        .team-grid {
            grid-template-columns: 1fr;
            gap: 30px;
        }
        
        .member-photo-section {
            padding: 30px 0 15px;
        }
        
        .profile-photo,
        .photo-placeholder {
            width: 120px;
            height: 120px;
        }
        
        .initials {
            font-size: 2rem;
        }
        
        .member-info {
            padding: 20px;
        }
        
        .member-name {
            font-size: 1.3rem;
        }
        
        .contact-links {
            flex-direction: column;
        }
        
        .contact-link {
            justify-content: center;
        }
    }

    @media (max-width: 480px) {
        .container {
            padding: 0 16px;
        }
        
        .team-hero {
            padding: 50px 0;
        }
        
        .hero-title {
            font-size: 1.8rem;
        }
        
        .team-members {
            padding: 40px 0;
        }
        
        .member-photo-section {
            padding: 25px 0 10px;
        }
        
        .profile-photo,
        .photo-placeholder {
            width: 100px;
            height: 100px;
        }
        
        .initials {
            font-size: 1.5rem;
        }
    }
</style>