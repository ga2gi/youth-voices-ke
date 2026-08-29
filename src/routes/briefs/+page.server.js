/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Static data for policy briefs - always shows both briefs
    const staticBriefs = [
        {
            id: 'mental-health-brief',
            title: 'YOUTH MENTAL HEALTH IN KENYA: FROM LISTENING TO IMPLEMENTATION',
            description: 'A youth-led framework for accessible, affordable and youth-friendly mental-health support to address Kenya\'s growing crisis.',
            delivery_date: '2026-08-01',
            status: 'OFFICIAL',
            stakeholder_acknowledged: 'true',
            pdf_url: '/downloads/Youth-Mental-Health-Crisis-Policy-Brief-2026.pdf'
        },
        {
            id: 'access-to-capital-brief',
            title: 'UNLOCKING KENYA\'S YOUTH ACCESS TO CAPITAL: A FIVE-PILLAR REFORM FRAMEWORK',
            description: 'A strategic framework addressing the KES 500 billion financing gap through structural reform and market-enabling mechanisms.',
            delivery_date: '2026-07-15',
            status: 'OFFICIAL',
            stakeholder_acknowledged: 'true',
            pdf_url: '/downloads/Youth-Access-to-Capital-Reform-Framework.pdf'
        }
    ];

    return { 
        groupedBriefs: [{
            title: "NATIONAL REGISTRY",
            briefs: staticBriefs
        }]
    };
}