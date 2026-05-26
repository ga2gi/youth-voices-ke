export async function GET() {
    const base = "https://policybridgeke.org";

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

    const lastmod = new Date().toISOString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${base}/${page.path ? page.path + '/' : ''}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`.trim();

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
}