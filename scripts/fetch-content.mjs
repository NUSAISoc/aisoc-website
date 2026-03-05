import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import config from '../content.config.mjs';

const CONTENT_TYPES = ['blog', 'events', 'team'];
const BASE_CONTENT_DIR = path.join(process.cwd(), 'src/content');

async function fetchContent() {
  console.log(`[Content Fetch] Source set to: ${config.source}`);

  if (config.source === 'local') {
    console.log('[Content Fetch] Using local content. No action needed.');
    return;
  }

  if (config.source === 'github') {
    if (!config.github.repo) {
      console.error('[Content Fetch] Error: GitHub repo not configured in content.config.mjs');
      // Don't fail build, just warn
      return;
    }

    console.log(`[Content Fetch] Fetching from ${config.github.repo}...`);
    
    const tempDir = path.join(process.cwd(), '.temp-content');
    
    try {
      // Clean up temp dir
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
      
      // Clone repo
      execSync(`git clone --depth 1 --branch ${config.github.branch} https://github.com/${config.github.repo}.git ${tempDir}`, { stdio: 'inherit' });
      
      // Process each content type
      CONTENT_TYPES.forEach(type => {
        const repoPath = config.contentPaths[type];
        if (!repoPath) {
          console.warn(`[Content Fetch] Warning: No repo path configured for ${type} in content.config.mjs`);
          return;
        }

        const sourcePath = path.join(tempDir, repoPath);
        const targetDir = path.join(BASE_CONTENT_DIR, type);
        
        if (fs.existsSync(sourcePath)) {
          // Ensure target content dir exists
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          
          // Copy .md files, skipping templates
          const files = fs.readdirSync(sourcePath).filter(file => {
             return file.endsWith('.md') && !file.startsWith('_template-');
          });
          
          files.forEach(file => {
            fs.copyFileSync(path.join(sourcePath, file), path.join(targetDir, file));
          });
          
          console.log(`[Content Fetch] Successfully imported ${files.length} ${type} items.`);
        } else {
          console.warn(`[Content Fetch] Warning: Content path ${repoPath} not found in repo for ${type}.`);
        }
      });
      
    } catch (error) {
      console.error('[Content Fetch] Failed to fetch content:', error);
    } finally {
      // Cleanup
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }
  }
}

fetchContent();
