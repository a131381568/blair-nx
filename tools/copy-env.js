// tools/copy-env.js
const fs = require('fs');
const path = require('path');

const findEnvFile = (rootPath) => {
  const envFiles = ['.env', '.env.local', '.env.production'];
  return envFiles.find(file => fs.existsSync(path.join(rootPath, file))) || null;
}

const copyEnvFile = ({ projectName = 'cts-back-end', requiredVars = [] } = {}, envName) => {
  const rootPath = path.join(__dirname, '..');
  const rootEnvPath = path.join(rootPath, envName);

  if (fs.existsSync(rootEnvPath)) {
    const envContent = fs.readFileSync(rootEnvPath, 'utf8');
    
    if (requiredVars.length > 0) {
      const hasAllVars = requiredVars.every(varName => 
        envContent.includes(`${varName}=`)
      );

      if (!hasAllVars) {
        console.warn(`Warning: Some required variables might be missing in ${envName}`);
      }
    }

    const paths = [
      ['bruno', `apps/${projectName}/bruno/${envName}`],
      ['env', `apps/${projectName}/${envName}`],
      ['frontend', `apps/cts-front-end/${envName}`],
      ['deploy', `apps/${projectName}/deployment/${envName}`]
    ];

    paths.forEach(([type, destPath]) => {
      const fullPath = path.join(rootPath, destPath);
      try {
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.copyFileSync(rootEnvPath, fullPath);
        console.log(`Copied ${envName} to ${type}`);
      } catch (err) {
        console.warn(`Warning: Could not copy to ${type}: ${err.message}`);
      }
    });
  } else {
    console.warn(`Warning: ${envName} file not found`);
  }
}

if (process.env.NODE_ENV !== 'production') {
  const projectName = process.argv[2];
  ['.env', '.env.local', '.env.production'].forEach(env => 
    copyEnvFile({ projectName }, env)
  );
}
