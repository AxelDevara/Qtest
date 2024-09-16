export async function GET() {
  // throw new Error(
  //   '@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)'
  // );
  // Suggestion (check for correctness before using):
  return new Response(
    `
        <?xml version="1.0" encoding="UTF-8" ?>
        <urlset
          xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xhtml="https://www.w3.org/1999/xhtml"
          xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
          xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
          xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
          xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
        >
          <url>
            <loc>http://www.qubic.id</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
          </url>
          <url>
            <loc>http://www.qubic.id/aboutus</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
          </url>
          <url>
            <loc>http://www.qubic.id/products</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
          </url>
          <url>
            <loc>http://www.qubic.id/analytics</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
          </url>
          <url>
            <loc>http://www.qubic.id/teams</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
          </url>
          <url>
            <loc>http://www.qubic.id/pages/contactus</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
          </url>
          <url>
            <loc>http://www.qubic.id/profile</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>always</changefreq>
          </url>
          <url>
            <loc>http://www.qubic.id/affiliate</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
          </url>
          <url>
            <loc>http://www.qubic.id/shop</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
          </url>
          <url>
            <loc>http://www.qubic.id/pages/collaborations</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
          </url>
        </urlset>
      `.trim(),
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
}
