const fs = require('fs');
const path = require('path');

const copyEnvFile = (projectName) => {
  console.log(typeof projectName)

  const rootEnvPath = path.join(__dirname, '../.env');
  const projectEnvPath = path.join(__dirname, `../apps/${projectName}/bruno/.env`);
  
  if (fs.existsSync(rootEnvPath)) {
    fs.copyFileSync(rootEnvPath, projectEnvPath);
    console.log(`Copied .env file to project-${projectName}`);
  } else {
    console.error('Root .env file not found');
  }
}

// Get the project name from command line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name');
  process.exit(1);
}

copyEnvFile(projectName);
