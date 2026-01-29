import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import config from '../blog.config.mjs';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');

async function fetchBlogContent() {
  console.log(`[Blog Fetch] Source set to: ${config.source}`);

  if (config.source === 'local') {
    console.log('[Blog Fetch] Using local content. No action needed.');
    return;
  }

  if (config.source === 'github') {
    if (!config.github.repo) {
      console.error('[Blog Fetch] Error: GitHub repo not configured in blog.config.mjs');
      // Don't fail build, just warn
      return;
    }

    console.log(`[Blog Fetch] Fetching from ${config.github.repo}...`);
    
    const tempDir = path.join(process.cwd(), '.temp-blog');
    
    try {
      // Clean up temp dir
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
      
      // Clone repo
      execSync(`git clone --depth 1 --branch ${config.github.branch} https://github.com/${config.github.repo}.git ${tempDir}`, { stdio: 'inherit' });
      
      // Copy files
      const sourcePath = path.join(tempDir, config.github.contentPath);
      
      if (fs.existsSync(sourcePath)) {
        // Ensure content dir exists
        if (!fs.existsSync(CONTENT_DIR)) {
          fs.mkdirSync(CONTENT_DIR, { recursive: true });
        }
        
        // This is a simplified copy. In production might want to be more careful or sync.
        // For now, let's just copy .md files
        const files = fs.readdirSync(sourcePath).filter(file => file.endsWith('.md'));
        
        files.forEach(file => {
          fs.copyFileSync(path.join(sourcePath, file), path.join(CONTENT_DIR, file));
        });
        
        console.log(`[Blog Fetch] Successfully imported ${files.length} posts.`);
      } else {
        console.warn(`[Blog Fetch] Warning: Content path ${config.github.contentPath} not found in repo.`);
      }
      
    } catch (error) {
      console.error('[Blog Fetch] Failed to fetch blog content:', error);
    } finally {
      // Cleanup
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }
  }
}

fetchBlogContent();
