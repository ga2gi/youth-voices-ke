export async function GET() {
    // Define all your live pages
    // The empty string '' represents the homepage
    const pages = [
        { path: '', priority: '1.0', changefreq: 'daily' },
        { path: 'submit', priority: '0.9', changefreq: 'weekly' },
        { path: 'education', priority: '0.8', changefreq: 'weekly' },
        { path: 'briefs', priority: '0.8', changefreq: 'weekly' },
        { path: 'opportunities', priority: '0.8', changefreq: 'daily' },
        { path: 'about', priority: '0.5', changefreq: 'monthly' },
        { path: 'recognition', priority: '0.5', changefreq: 'monthly' },
        { path: 'privacy', priority: '0.3', changefreq: 'monthly' },
        { path: 'terms', priority: '0.3', changefreq: 'monthly' }
    ];

    const body = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
        ${pages
            .map((page) => `
            <url>
                <loc>https://www.youthvoiceske.org/${page.path}</loc>
                <changefreq>${page.changefreq}</changefreq>
                <priority>${page.priority}</priority>
            </url>
            `)
            .join('')}
    </urlset>`.trim();

    return new Response(body, {
        headers: {
            'Content-Type': 'application/xml',
            // Tells browsers and Google to cache this for 1 hour
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
}