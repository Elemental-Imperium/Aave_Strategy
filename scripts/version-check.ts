import { execSync } from 'child_process';
import semver from 'semver';
import fs from 'fs';

const MIN_NODE_VERSION = '16.0.0';
const MIN_YARN_VERSION = '3.0.0';

function checkNodeVersion() {
  const nodeVersion = process.version;
  if (!semver.gte(nodeVersion, MIN_NODE_VERSION)) {
    console.error(`Node.js version ${MIN_NODE_VERSION} or higher is required. Current version: ${nodeVersion}`);
    process.exit(1);
  }
}

function checkYarnVersion() {
  const yarnVersion = execSync('yarn --version').toString().trim();
  if (!semver.gte(yarnVersion, MIN_YARN_VERSION)) {
    console.error(`Yarn version ${MIN_YARN_VERSION} or higher is required. Current version: ${yarnVersion}`);
    process.exit(1);
  }
}

function checkDependencies() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const outdated = execSync('yarn outdated --json').toString();
  const outdatedDeps = JSON.parse(outdated);

  if (outdatedDeps.length > 0) {
    console.warn('The following dependencies are outdated:');
    outdatedDeps.forEach(dep => {
      console.warn(`${dep.name}: ${dep.current} → ${dep.latest}`);
    });
  }
}

function main() {
  console.log('Checking environment...');
  checkNodeVersion();
  checkYarnVersion();
  checkDependencies();
  console.log('Environment check completed.');
}

main(); 