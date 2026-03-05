export default {
  // Use 'github' for production/builds or when local testing with real content
  // source: 'local', 
  source: 'github',
  
  // External repository configuration
  github: {
    repo: 'NUSAISoc/aisoc-website-content',
    branch: 'main',
  },

  // Paths within repo where markdown files are located
  contentPaths: {
    blog: 'blog',
    events: 'events',
    team: 'team',
  }
};
