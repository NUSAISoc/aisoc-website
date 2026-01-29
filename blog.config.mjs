export default {
  // Switch to 'github' when ready to fetch from external repo
  source: 'local', 
  
  // External repository configuration
  github: {
    repo: '', // e.g., 'username/blog-posts'
    branch: 'main',
    contentPath: 'posts', // Path within repo where markdown files are located
  }
};
