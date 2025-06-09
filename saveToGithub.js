import fetch from 'node-fetch';
import { Buffer } from 'buffer';

const GITHUB_TOKEN = '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'; // Replace with your token
const REPO_OWNER = 'SathishPonnusamy1';
const REPO_NAME = 'CCTSAssurance';
const FILE_PATH = 'IPAFFS_CodeSmellsAPIResponse.JSON'; // File path in the repo
const API_URL = 'https://api.github.com/repos/' + REPO_OWNER + '/' + REPO_NAME + '/contents/' + FILE_PATH;

// 1. Fetch the JSON from your API
const response = await fetch('YOUR_API_URL'); // Replace with your API endpoint
const jsonData = await response.json();

// 2. Get the SHA if the file already exists (for update)
let sha = undefined;
const getRes = await fetch(API_URL, {
  headers: { Authorization: `token ${GITHUB_TOKEN}` }
});
if (getRes.status === 200) {
  const getData = await getRes.json();
  sha = getData.sha;
}

// 3. Prepare the payload
const content = Buffer.from(JSON.stringify(jsonData, null, 2)).toString('base64');
const payload = {
  message: 'Update IPAFFS CodeSmells API Response',
  content,
  ...(sha && { sha })
};

// 4. Save to GitHub
const putRes = await fetch(API_URL, {
  method: 'PUT',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
});

if (putRes.ok) {
  console.log('File saved to GitHub successfully!');
} else {
  const error = await putRes.text();
  console.error('Failed to save file:', error);
}