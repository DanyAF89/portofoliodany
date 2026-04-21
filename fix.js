const fs = require('fs');

try {
    // 1. Fix index.html
    let html = fs.readFileSync('c:/portofoliodany/index.html', 'utf8');

    // Fix "About Us" -> "About Me"
    html = html.replace('About Us</h4>', 'About Me</h4>');

    // Add Global Noise Texture for premium dark feel
    if (!html.includes('noiseFilter')) {
        let noiseTag = `<!-- Global Noise Texture -->
    <div class="fixed inset-0 z-0 opacity-[0.025] pointer-events-none mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>

    <!-- Global Background Blobs -->`;
        html = html.replace('<!-- Global Background Blobs -->', noisegit push -u origin mainTag);
    }

    fs.writeFileSync('c:/portofoliodany/index.html', html, 'utf8');
    console.log('Fixed index.html');

    // 2. Fix style.css
    let css = fs.readFileSync('c:/portofoliodany/css/style.css', 'utf8');

    // Make glass panels more premium (lighter top edge)
    css = css.replace('backdrop-filter: blur(12px);', 'backdrop-filter: blur(16px);');
    if (!css.includes('border-top: 1px solid')) {
        css = css.replace(
            'border: 1px solid rgba(255, 255, 255, 0.05);', 
            'border: 1px solid rgba(255, 255, 255, 0.05);\n    border-top: 1px solid rgba(255, 255, 255, 0.15);\n    border-left: 1px solid rgba(255, 255, 255, 0.1);'
        );
    }

    // Enhance text gradient with animation
    if (!css.includes('gradientText')) {
        let newGradient = `background: linear-gradient(to right, #3b82f6, #06b6d4, #8b5cf6, #3b82f6);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientText 4s linear infinite;`;
        
        // This regex matches the existing gradient block contents safely
        css = css.replace(/background: linear-gradient[\s\S]*?background-clip: text;/, newGradient);
        
        css += `\n@keyframes gradientText {\n    0% { background-position: 0% 50%; }\n    100% { background-position: 200% 50%; }\n}\n`;
    }

    // Add Blob animations
    if (!css.includes('blob-float')) {
        css = css.replace('opacity: 0.5;', 'opacity: 0.5;\n    animation: blob-float 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);');
        css = css.replace('opacity: 0.4;', 'opacity: 0.4;\n    animation: blob-float 25s infinite alternate-reverse cubic-bezier(0.4, 0, 0.2, 1);');
        
        css += `\n@keyframes blob-float {
    0% { transform: translate(0, 0) scale(1) rotate(0deg); }
    33% { transform: translate(30px, -50px) scale(1.1) rotate(10deg); }
    66% { transform: translate(-20px, 20px) scale(0.9) rotate(-5deg); }
    100% { transform: translate(0, 0) scale(1) rotate(0deg); }
}\n`;
    }

    // Fix Marquee offset issue and smooth it
    css = css.replace('animation: marquee 25s linear infinite;', 'animation: marquee 35s linear infinite;');
    css = css.replace('100% { transform: translateX(-50%); }', '100% { transform: translateX(calc(-50% - 2rem)); }');

    // Add hover defocus effect to siblings for premium grid interaction
    if (!css.includes('grayscale(20%)')) {
        css += `\n
/* Sibling Defocus on Hover */
#projects:hover .project-card:not(:hover),
#services:hover .service-card:not(:hover) {
    opacity: 0.6;
    filter: grayscale(30%);
    transform: scale(0.97);
}
.project-card, .service-card {
    will-change: transform, opacity, filter;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease, filter 0.3s ease !important;
}
`;
    }

    // Make glow button pulse
    if (!css.includes('btn-pulse')) {
        css = css.replace('.btn-glow {', '.btn-glow {\n    animation: btn-pulse 3s infinite alternate;');
        css += `\n@keyframes btn-pulse {\n    0% { box-shadow: 0 0 15px rgba(37, 99, 235, 0.3); }\n    100% { box-shadow: 0 0 25px rgba(37, 99, 235, 0.6); }\n}\n`;
    }

    fs.writeFileSync('c:/portofoliodany/css/style.css', css, 'utf8');
    console.log('Fixed style.css');

    // 3. Fix main.js
    let js = fs.readFileSync('c:/portofoliodany/js/main.js', 'utf8');

    // Unobserve to trigger only once (more premium)
    js = js.replace('// observer.unobserve(entry.target);', 'observer.unobserve(entry.target);');

    // Make animation duration longer
    js = js.replace("duration-700", "duration-[1200ms]");
    
    fs.writeFileSync('c:/portofoliodany/js/main.js', js, 'utf8');
    console.log('Fixed main.js');

} catch(err) {
    console.error(err);
}
