import express from 'express';
import fetch from 'node-fetch';
import { Buffer } from 'buffer';

const app = express();
app.use(express.json());

const GITHUB_TOKEN = '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'; // Replace with your token
const REPO_OWNER = 'SathishPonnusamy1';
const REPO_NAME = 'CCTSAssurance';
const FILE_PATH = 'IPAFFS_CodeSmellsAPIResponse.JSON';
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

app.post('/api/save-to-github', async (req, res) => {
    try {
        // Fetch the JSON from your API or use req.body.data if sent from frontend
        const response = await fetch('YOUR_API_URL'); // Replace with your API endpoint
        const jsonData = await response.json();

        // Get SHA if file exists
        let sha = undefined;
        const getRes = await fetch(API_URL, {
            headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });
        if (getRes.status === 200) {
            const getData = await getRes.json();
            sha = getData.sha;
        }

        // Prepare payload
        const content = Buffer.from(JSON.stringify(jsonData, null, 2)).toString('base64');
        const payload = {
            message: 'Update IPAFFS CodeSmells API Response',
            content,
            ...(sha && { sha })
        };

        // Save to GitHub
        const putRes = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (putRes.ok) {
            res.json({ success: true, message: 'File saved to GitHub successfully!' });
        } else {
            const error = await putRes.text();
            res.status(500).json({ success: false, error });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));