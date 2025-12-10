// src/routes/about/+page.server.js

// Updated static data representing the DIVERSE types of potential partners
const STATIC_STAKEHOLDERS = [
    {
        name: "National & County Governments",
        role: "Primary partners for policy implementation, review, and budget allocation.",
        logo_url: "/logos/gov.png" 
    },
    {
        name: "Civil Society Organizations (CSOs) & NGOs",
        role: "Partners for advocacy, community mobilization, and ensuring governmental accountability.",
        logo_url: "/logos/cso.png" 
    },
    {
        name: "Academic & Research Institutions",
        role: "Partners who provide technical validation,policy insights, and evidence-based analysis for briefs.",
        logo_url: "/logos/academic.png" 
    },
    {
        name: "Development Partners & Donors",
        role: "Partners providing funding and institutional support for scale, sustainability, and governance programs.",
        logo_url: "/logos/donor.png" 
    },
    {
        name: "Private Sector & Tech Ecosystem",
        role: "Partners for digital outreach, technology integration, and youth entrepreneurship resources.",
        logo_url: "/logos/private.png" 
    },
    {
        name: "Oversight & Accountability Bodies",
        role: "Partners who ensure legitimacy and pressure for timely follow-through on implemented policies.",
        logo_url: "/logos/oversight.png" 
    }
];

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        stakeholders: STATIC_STAKEHOLDERS
    };
}