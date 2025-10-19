const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const middlewarePath = path.join(process.cwd(), 'middleware.ts');
const middlewareBackupPath = path.join(process.cwd(), 'middleware.ts.bak');

console.log('🚀 Starting export build for GitHub Pages...\n');

try {
  // 1. Backup middleware
  if (fs.existsSync(middlewarePath)) {
    console.log('📦 Backing up middleware.ts...');
    fs.renameSync(middlewarePath, middlewareBackupPath);
  }

  // 2. Run build
  console.log('🔨 Building Next.js static export...\n');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('\n✅ Build completed successfully!');
  console.log('📁 Static files are in the /out directory\n');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // 3. Restore middleware
  if (fs.existsSync(middlewareBackupPath)) {
    console.log('🔄 Restoring middleware.ts...');
    fs.renameSync(middlewareBackupPath, middlewarePath);
  }
}

console.log('✨ Ready to deploy to GitHub Pages!');
console.log('Next steps:');
console.log('  1. git add .');
console.log('  2. git commit -m "Deploy to GitHub Pages"');
console.log('  3. git push origin main');
