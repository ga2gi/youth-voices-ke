<script>
	import { onMount } from 'svelte';

	let showBackToTop = false;

	onMount(() => {
		const handleScroll = () => {
			showBackToTop = window.scrollY > 400;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
</script>

<svelte:head>
	<title>Privacy Policy | Youth Voices KE</title>
	<meta
		name="description"
		content="Read the Privacy Policy for Youth Voices KE. Learn how we protect your data in compliance with the Kenyan Data Protection Act 2019."
	/>
</svelte:head>

<div class="container legal-page">
	{#if showBackToTop}
		<button class="back-to-top" on:click={scrollToTop} aria-label="Back to top"> ↑ </button>
	{/if}

	<header>
		<h1>🔒 Privacy Policy</h1>
		<p class="last-updated">Last Updated: December 10, 2025</p>
	</header>

	<section class="introduction">
		<p>
			This Privacy Policy explains how Youth Voices KE (“we,” “our,” or “us”) collects, uses,
			shares, and protects information submitted through the Platform. By using the Platform, you
			acknowledge that you have read and agreed to this Policy. Youth Voices KE is committed to
			protecting your privacy and complying with the Kenyan Data Protection Act, 2019.
		</p>
	</section>

	<nav class="index-section">
		<h2>Index</h2>
		<ul class="index-list">
			<li><a href="#sec-1">1. Definitions</a></li>
			<li><a href="#sec-2">2. Information We Collect</a></li>
			<li><a href="#sec-3">3. How We Use Your Information</a></li>
			<li><a href="#sec-4">4. Consent for Community Engagement</a></li>
			<li><a href="#sec-5">5. No Emergency Reporting</a></li>
			<li><a href="#sec-6">6. Sharing of Information and Disclosure</a></li>
			<li><a href="#sec-7">7. Third-Party Services</a></li>
			<li><a href="#sec-8">8. Data Retention & Security</a></li>
			<li><a href="#sec-9">9. Platform Availability</a></li>
			<li><a href="#sec-10">10. Cookies & Tracking Technologies</a></li>
			<li><a href="#sec-11">11. Surveys, Rewards & Recognition</a></li>
			<li><a href="#sec-12">12. Your Rights Under Kenyan Law</a></li>
			<li><a href="#sec-13">13. Changes to This Privacy Policy</a></li>
			<li><a href="#sec-14">14. Contact</a></li>
		</ul>
	</nav>

	<hr class="divider" />

	<section id="sec-1">
		<h2>1. Definitions</h2>
		<p>For the purposes of this Policy:</p>
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>Term</th>
						<th>Definition</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><strong>Community Voting</strong></td>
						<td>The Platform’s public evaluation process for selecting submissions.</td>
					</tr>
					<tr>
						<td><strong>Community Engagement & Volunteering</strong></td>
						<td>Refers to optional civic engagement activities facilitated by Youth Voices KE, including participation in WhatsApp groups, volunteering initiatives, discussions, and related youth engagement programs that require the processing of personal contact information.</td>
					</tr>
					<tr>
						<td><strong>Content</strong></td>
						<td>Means all user-generated solutions that may be in the form of text, images, data, or material.</td>
					</tr>
					<tr>
						<td><strong>Personal Identifier</strong></td>
						<td>Means any personal data that identifies a user, including the user’s name and contact information. Personal identification is entirely optional. That is why it must not be included in the submission and should be provided only on a voluntary basis in the Platform section. We may request identity verification under and for the purposes of Term 3.2 of the Terms of Use and Submission.</td>
					</tr>
					<tr>
						<td><strong>Platform</strong></td>
						<td>Means the Youth Voices KE website, mobile interface, and related digital services.</td>
					</tr>
					<tr>
						<td><strong>Policy Challenge</strong></td>
						<td>Means any topic, question, or issue posted by Youth Voices KE that invites youth solutions.</td>
					</tr>
					<tr>
						<td><strong>Stakeholders</strong></td>
						<td>Means government bodies, civil society, development partners, donors, or institutions that contribute to and/or receive policy briefs or insights.</td>
					</tr>
					<tr>
						<td><strong>Submission</strong></td>
						<td>Means any non-identifying idea, proposal, comment, response, or content submitted through the Platform. A submission must not contain any personal identifier that can identify a user.</td>
					</tr>
					<tr>
						<td><strong>User</strong></td>
						<td>Means any person who accesses or interacts with the Platform.</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section id="sec-2">
		<h2>2. Information We Collect</h2>
		<h3>2.1. Submission Information</h3>
		<p>We collect non-identifying Policy Solution text in the challenge area.</p>

		<h3>2.2. Personal Identifiers</h3>
		<p>
			We collect Optional contact details you voluntarily provide. We may request identity
			verification where necessary, including when— recognition, prizes, or awards are involved; and
			follow-up engagement requires confirmation of identity.
		</p>
		<p>
			Where a User voluntarily opts into Community Engagement & Volunteering activities, we may
			collect and process:
		</p>
		<ul>
			<li>phone number;</li>
			<li>name or alias used in community platforms;</li>
			<li>participation metadata related to engagement or volunteering activities.</li>
		</ul>
		<p>
			This information is collected only upon explicit consent and is not required to use the core
			Platform features.
		</p>

		<h3>2.3 Voting Information</h3>
		<p>
			We record your votes to ensure integrity, typically linking votes to an anonymous session ID
			or a non-identifying user hash.
		</p>

		<h3>2.4. Technical Information</h3>
		<p>
			We collect standard technical and security logs, including: IP address, Browser type and
			device information, cookies, Access timestamps and Security/event logs used to detect or
			prevent misuse for security and site maintenance.
		</p>
	</section>

	<section id="sec-3">
		<h2>3. How We Use Your Information</h2>
		<p>
			<strong>3.1 Policy Development:</strong> Your Submission content is used to evaluate ideas, develop
			policy briefs and present solutions to stakeholders.
		</p>
		<p>
			<strong>3.2 Transparency:</strong> Policy briefs published to stakeholders will acknowledge the
			source of the idea (e.g., "From Youth Solutions Platform"), but will not publicly disclose
			your optional contact information unless you grant explicit, separate written permission where
			applicable.
		</p>
		<p>
			<strong>3.3 Communication:</strong> If you choose to provide contact information, we may use it
			only to seek clarification on submissions.
		</p>
		<p>
			<strong>3.4. Security & Maintenance:</strong> Technical data helps us to secure the Platform, prevent
			abuse, fraud, and vote manipulation and troubleshoot operational issues. Personal data collected
			for Community Engagement & Volunteering is used solely to: facilitate participation in WhatsApp
			or similar community forums; coordinate volunteering opportunities; share civic engagement updates
			relevant to Youth Voices KE initiatives; and ensure community safety and moderation.
		</p>
	</section>

	<section id="sec-4">
		<h2>4. Consent for Community Engagement</h2>
		<p>
			Participation in Community Engagement & Volunteering activities requires explicit consent,
			which is obtained through a clear consent statement prior to joining.
		</p>
		<p>
			Consent is: freely given; specific to community engagement purposes; revocable at any time by
			contacting info@youthvoiceske.org.
		</p>
		<p>
			Withdrawal of consent does not affect the lawfulness of processing carried out prior to
			withdrawal.
		</p>
	</section>

	<section id="sec-5">
		<h2>5. No Emergency Reporting</h2>
		<div class="alert warning">
			The Platform is not intended for reporting emergencies, crimes, threats, or urgent safety
			issues. Youth Voices KE does not monitor submissions for emergency content.
		</div>
	</section>

	<section id="sec-6">
		<h2>6. Sharing of Information and Disclosure</h2>
		<p>We do not sell personal data. Your submission ideas (not your personal identifiers) may be shared with:</p>
		<ul>
			<li>
				<strong>Stakeholders:</strong> (only the content of the policy brief, not your personal contact
				details).
			</li>
			<li>
				<strong>Research Partners:</strong> Think tanks and academic partners for validation and analysis
				(under strict non-disclosure and confidentiality agreements regarding personal identifiers where
				they are involved).
			</li>
			<li>
				<strong>Service Providers:</strong> Third-party technical providers (e.g., Supabase) help us
				host, store, or secure data. They may only process data under strict confidentiality and for
				the purposes we specify.
			</li>
			<li>
				<strong>Legal Requirements:</strong> We may disclose information if required by law, by court
				order, or to comply with lawful requests from enforcement or regulatory agencies. We will
				always evaluate such requests for legality and proportionality.
			</li>
		</ul>
		<p>Personal identifiers (if provided) are never shared without your explicit written consent.</p>
	</section>

	<section id="sec-7">
		<h2>7. Third-Party Services</h2>
		<p>
			The Platform may rely on third-party hosting, analytics, identity tools, or links. These third
			parties process data under their own privacy policies. Youth Voices KE is not responsible for
			their practices.
		</p>
		<p>
			Where community engagement occurs on third-party platforms such as WhatsApp, Users acknowledge
			that personal data will also be processed by those platforms under their own privacy policies.
			Youth Voices KE does not control and is not responsible for third-party data practices.
		</p>
	</section>

	<section id="sec-8">
		<h2>8. Data Retention & Security</h2>
		<h3>8.1. Retention</h3>
		<p>
			Non-identifying Submissions and resulting policy briefs may be retained indefinitely in a
			public policy archive for historical research and public interest purposes, in accordance with
			the Data Protection Act's provisions on processing for archiving in the public interest.
		</p>
		<p>Technical logs (IP, security events) are retained for approximately 90 days.</p>
		<p>
			Optional contact information is retained only as long as necessary for communication or
			verification.
		</p>
		<p>
			Community engagement contact data is retained only for as long as the User remains an active
			participant or until consent is withdrawn.
		</p>

		<h3>8.2. Security Measures</h3>
		<p>
			We use industry-standard security measures, including HTTPS and secure database configuration
			(Supabase), to protect the data under our control.
		</p>
		<p>While we take reasonable steps to protect data, no system is completely secure.</p>
		<p>
			You acknowledge that submissions and votes are provided at your own risk, that unauthorised
			access may occur despite reasonable security measures, and that Youth Voices KE is not liable
			for security breaches beyond our reasonable control.
		</p>
		<p>
			If required by law, we will notify affected users and the Office of the Data Protection
			Commissioner.
		</p>
		<p>Users must ensure that submitted information is accurate and up to date.</p>
	</section>

	<section id="sec-9">
		<h2>9. Platform Availability</h2>
		<p>
			The Platform may be unavailable due to maintenance or outages. We do not guarantee
			uninterrupted service.
		</p>
	</section>

	<section id="sec-10">
		<h2>10. Cookies & Tracking Technologies</h2>
		<p>
			We use cookies and analytics tools for, among other things, session management, performance
			optimisation, fraud prevention, and usage analysis.
		</p>
		<p>Users may disable cookies, though some features may not work.</p>
	</section>

	<section id="sec-11">
		<h2>11. Surveys, Rewards & Recognition</h2>
		<p>
			Participation in recognition or reward programs is voluntary and not guaranteed. We will
			request consent before publicly attributing personal information.
		</p>
	</section>

	<section id="sec-12">
		<h2>12. Your Rights Under Kenyan Law</h2>
		<p>Under the Data Protection Act 2019, you may request:</p>
		<ul>
			<li>access to your personal data;</li>
			<li>correction of inaccurate data; and</li>
			<li>deletion of optional personal information.</li>
		</ul>
		<p>Submit rights requests to: <a href="mailto:info@youthvoiceske.org">info@youthvoiceske.org</a></p>
		<p>
			Users may withdraw consent for community engagement processing at any time without affecting
			access to other Platform features.
		</p>
	</section>

	<section id="sec-13">
		<h2>13. Changes to This Privacy Policy</h2>
		<p>
			We may update this Privacy Policy from time to time. Continued use of the Platform indicates
			acceptance of any revised policy.
		</p>
	</section>

	<section id="sec-14">
		<h2>14. Contact</h2>
		<div class="contact-box">
			<p>For questions about privacy or your data rights, contact:</p>
			<a href="mailto:info@youthvoiceske.org" class="email-btn">info@youthvoiceske.org</a>
		</div>
	</section>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	.legal-page {
		max-width: 900px;
		margin: 0 auto;
		padding: 40px 20px;
		color: #333;
		line-height: 1.7;
	}

	header {
		border-bottom: 3px solid #2e7d32;
		margin-bottom: 30px;
	}

	.back-to-top {
		position: fixed;
		bottom: 30px;
		right: 30px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: #2e7d32;
		color: white;
		border: none;
		cursor: pointer;
		font-size: 24px;
		z-index: 1000;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	}

	.index-section {
		background: #f1f8e9;
		padding: 25px;
		border-radius: 12px;
		margin-bottom: 40px;
	}

	.index-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 10px;
		list-style: none;
		padding: 0;
	}

	.index-list a {
		text-decoration: none;
		color: #1b5e20;
		font-weight: 500;
	}

	section {
		margin-bottom: 50px;
		scroll-margin-top: 80px;
	}

	h2 {
		border-left: 6px solid #2e7d32;
		padding-left: 15px;
		margin-bottom: 20px;
		color: #1b5e20;
	}

	h3 {
		color: #2e7d32;
		margin-top: 25px;
		margin-bottom: 10px;
	}

	.alert.warning {
		background: #fff9c4;
		border-left: 5px solid #fbc02d;
		padding: 15px;
		border-radius: 8px;
		margin: 20px 0;
	}

	.table-container {
		overflow-x: auto;
		margin: 20px 0;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background: #fff;
	}

	th,
	td {
		padding: 15px;
		text-align: left;
		border-bottom: 1px solid #eee;
		vertical-align: top;
	}

	th {
		background: #f1f8e9;
		color: #1b5e20;
	}

	.contact-box {
		text-align: center;
		background: #f1f8e9;
		padding: 40px;
		border-radius: 20px;
	}

	.email-btn {
		display: inline-block;
		background: #2e7d32;
		color: white !important;
		padding: 12px 35px;
		border-radius: 50px;
		text-decoration: none;
		font-weight: bold;
		margin-top: 15px;
	}

	ul {
		padding-left: 20px;
		margin-bottom: 1rem;
	}

	li {
		margin-bottom: 8px;
	}

	.divider {
		border: 0;
		border-top: 1px solid #eee;
		margin: 40px 0;
	}
</style>