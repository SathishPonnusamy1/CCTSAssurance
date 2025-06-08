// ...existing code...
const express = require('express');
const app = express();

app.get('/api/sonarqube', async (req, res) => {
    const fetch = (await import('node-fetch')).default;
    const url = 'https://vss-sonarqube.azure.defra.cloud/api/issues/search?componentKeys=Imports-MS-FrontEndNotification%2CImports-frontend-decision%2CImports-frontend-bordernotification%2CImports-frontend-control%2CImports-frontend-checks%2CImports-frontend-bcpadmin%2CImports-frontend-upload%2CImports-MS-ApprovedEstablishment%2CImports-MS-Bip%2CImports-MS-BorderNotification%2CImports-MS-Bordernotification-Refdata%2CImports-MS-Certificate%2CImports-MS-Checks%2CImports-MS-Cloning%2CImports-MS-commoditycode%2CImports-MS-Countries%2CImports-MS-Customer%2CImports-MS-Decision%2CImports-MS-EconomicOperators%2CImports-MS-FieldConfig%2CImports-MS-File-Compression%2CImports-MS-GVMS%2CImports-MS-File-Upload%2CImports-Proxy%2CImports-MS-Laboratories%2CImports-Notification-Schema%2CImports-MS-Notification%2CImports-MS-Permissions%2CImports-MS-ReferenceDataLoader%2CImports-MS-SoapSearch%2CImports-MS-SoapRequest%2CImports-FUNC-Auto-Clearance%2CImports-FUNC-Risk-Assessment%2CImports-FUNC-Risk-Interface%2CImports-FUNC-Risk-Locking%2CImports-FUNC-Notify%2CImports-FUNC-Archive-Notifications%2CImports-MS-ENotificationEvent%2CImports-MS-ENotificationProcessing%2CImports-MS-ENotificationSubmission%2CImports-MS-ENotificationEventListener%2CImports-MS-BulkUpload%2CImports-MS-InServiceMessaging%2CImports-MS-Legacy-Notification%2CTracesX_Cloning&statuses=OPEN&severities=MAJOR';
    const response = await fetch(url, {
        headers: {
            'Authorization': 'Basic U2F0aGlzaFBvbm51c2FteToxM0hhc2h5YTIx',
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));