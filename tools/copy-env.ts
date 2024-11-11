const fs = require('fs');
const path = require('path');

const copyEnvFile = (projectName, envName) => {
  const rootEnvPath = path.join(__dirname, `../${envName}`);
  const ctsbBrunoPath = path.join(__dirname, `../apps/${projectName}/bruno/${envName}`);
  const ctsbEnvPath = path.join(__dirname, `../apps/${projectName}/${envName}`);
  const ctsfEnvPath = path.join(__dirname, `../apps/cts-front-end/${envName}`);
  const ctsDeployPath = path.join(__dirname, `../apps/${projectName}/deployment/${envName}`);

  if (fs.existsSync(rootEnvPath)) {
    fs.copyFileSync(rootEnvPath, ctsbBrunoPath);
    fs.copyFileSync(rootEnvPath, ctsbEnvPath);
    fs.copyFileSync(rootEnvPath, ctsfEnvPath);
    fs.copyFileSync(rootEnvPath, ctsDeployPath);
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
