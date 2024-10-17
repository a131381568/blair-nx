const fs = require('fs');
const path = require('path');

const copyEnvFile = (projectName, envName) => {
  const rootEnvPath = path.join(__dirname, `../${envName}`);
  const projectBrunoPath = path.join(__dirname, `../apps/${projectName}/bruno/${envName}`);
  const projectEnvPath = path.join(__dirname, `../apps/${projectName}/${envName}`);
 
  if (fs.existsSync(rootEnvPath)) {
    fs.copyFileSync(rootEnvPath, projectBrunoPath);
    fs.copyFileSync(rootEnvPath, projectEnvPath);
    console.log(`Copied ${envName} file to project: ${projectName}`);
  } else {
    console.error(`Root ${envName} file not found`);
  }
}

// Get the project name from command line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name');
  process.exit(1);
}

copyEnvFile(projectName,`.env`);
copyEnvFile(projectName,`.env.local`);
copyEnvFile(projectName,`.env.production`);
