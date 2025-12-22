export async function GET() {
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

    // Important: No spaces/tabs before <?xml or inside the loop tags
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>https://www.youthvoiceske.org/${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`.trim();

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
}