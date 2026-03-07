import fs from 'fs';
import path from 'path';

const CONTENT_TYPES = ['blog', 'events', 'team'];
const BASE_CONTENT_DIR = path.join(process.cwd(), 'src/content');
const BASE_PUBLIC_DIR = path.join(process.cwd(), 'public/images/content');

async function downloadImage(url, dest) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(dest, buffer);
}

function getFilenameFromUrl(urlString) {
  try {
    const url = new URL(urlString);
    const pathname = url.pathname;
    const parts = pathname.split('/');
    let filename = parts[parts.length - 1];
    if (!filename) {
      filename = 'image-' + Date.now();
    }
    // ensure it has some valid chars
    filename = decodeURIComponent(filename).replace(/[^a-zA-Z0-9.-]/g, '_');
    return filename;
  } catch (e) {
    return 'image-' + Date.now();
  }
}

async function processImages() {
  console.log('[Image Processing] Starting image processing...');
  
  if (!fs.existsSync(BASE_PUBLIC_DIR)) {
    fs.mkdirSync(BASE_PUBLIC_DIR, { recursive: true });
  }

  for (const type of CONTENT_TYPES) {
    const contentDir = path.join(BASE_CONTENT_DIR, type);
    const publicTypeDir = path.join(BASE_PUBLIC_DIR, type);
    
    if (!fs.existsSync(contentDir)) {
      continue;
    }

    if (!fs.existsSync(publicTypeDir)) {
      fs.mkdirSync(publicTypeDir, { recursive: true });
    }

    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(contentDir, file);
      let content = fs.readFileSync(filePath, 'utf-8');
      
      const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
      const match = content.match(frontmatterRegex);
      
      let modified = false;
      if (match) {
        let frontmatter = match[1];

        // Find coverImage or image with http/https
        const imageRegex = /^(coverImage|image):\s*["']?(https?:\/\/[^\s"'<]+)["']?/gm;
        let imgMatch;
        let newFrontmatter = frontmatter;

        while ((imgMatch = imageRegex.exec(frontmatter)) !== null) {
          const key = imgMatch[1];
          const url = imgMatch[2];
          
          console.log(`[Image Processing] Found remote image in ${file}: ${url}`);
          
          const filename = file.replace('.md', '-') + getFilenameFromUrl(url);
          const destPath = path.join(publicTypeDir, filename);
          const publicPath = `/images/content/${type}/${filename}`;
          
          try {
            await downloadImage(url, destPath);
            console.log(`[Image Processing] Downloaded to ${publicPath}`);
            
            // Replace in frontmatter
            newFrontmatter = newFrontmatter.replace(url, publicPath);
            modified = true;
          } catch (err) {
            console.error(`[Image Processing] Failed to download ${url}:`, err.message);
          }
        }
        
        if (modified) {
          content = content.replace(frontmatter, newFrontmatter);
          console.log(`[Image Processing] Updated frontmatter in ${file}`);
        }
      }

      // Find markdown body images ![(alt)](http...)
      const bodyImageRegex = /!\[([^\]]*?)\]\((https?:\/\/[^\s"'<]+)\)/g;
      let bodyMatch;
      let newContent = content;
      let bodyModified = false;

      while ((bodyMatch = bodyImageRegex.exec(content)) !== null) {
        const altText = bodyMatch[1];
        const url = bodyMatch[2];
        
        console.log(`[Image Processing] Found remote body image in ${file}: ${url}`);
        
        const filename = file.replace('.md', '-') + getFilenameFromUrl(url);
        const destPath = path.join(publicTypeDir, filename);
        const publicPath = `/images/content/${type}/${filename}`;
        
        try {
          // If we haven't already downloaded it in this pass
          if (!fs.existsSync(destPath)) {
            await downloadImage(url, destPath);
            console.log(`[Image Processing] Downloaded to ${publicPath}`);
          }
          
          // Replace in content
          newContent = newContent.replace(`](${url})`, `](${publicPath})`);
          bodyModified = true;
        } catch (err) {
          console.error(`[Image Processing] Failed to download ${url}:`, err.message);
        }
      }

      if (bodyModified) {
        content = newContent;
        console.log(`[Image Processing] Updated body in ${file}`);
      }

      if (modified || bodyModified) {
        fs.writeFileSync(filePath, content);
      }

    }
  }
  
  console.log('[Image Processing] Finished.');
}

await processImages();
