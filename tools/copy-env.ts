const fs = require('fs');
const path = require('path');

const findEnvFile = (rootPath: string): string | null => {
  const envFiles = ['.env', '.env.local', '.env.production'];
  return envFiles.find(file => fs.existsSync(path.join(rootPath, file))) || null;
}

const copyEnvFile = (projectName: string, envName: string): void => {
  const rootPath = path.join(__dirname, '..');
  const rootEnvPath = path.join(rootPath, envName);

  // 檢查必要的環境變數是否存在
  if (fs.existsSync(rootEnvPath)) {
    const envContent = fs.readFileSync(rootEnvPath, 'utf8');
    const requiredVars = ['VITE_APP_API', 'VITE_APP_HOST'];
    const hasAllVars = requiredVars.every(varName => 
      envContent.includes(`${varName}=`)
    );

    if (!hasAllVars) {
      console.error(`Missing required environment variables in ${envName}`);
      process.exit(1);
    }

    const paths = [
      ['bruno', `apps/${projectName}/bruno/${envName}`],
      ['env', `apps/${projectName}/${envName}`],
      ['frontend', `apps/cts-front-end/${envName}`],
      ['deploy', `apps/${projectName}/deployment/${envName}`]
    ];

    paths.forEach(([type, destPath]) => {
      const fullPath = path.join(rootPath, destPath);
      fs.copyFileSync(rootEnvPath, fullPath);
      console.log(`Copied ${envName} to ${type}`);
    });
  } else {
    console.error(`Root ${envName} file not found`);
  }
}

const projectName = process.argv[2];
if (!projectName) {
  console.error('Please provide a project name');
  process.exit(1);
}

if(process.env.NODE_ENV !== 'production'){
  ['.env', '.env.local', '.env.production'].forEach(env => 
    copyEnvFile(projectName, env)
  );
}
