import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.get('/api/sonarcloud', async (req, res) => {
    const url = 'https://sonarcloud.io/api/issues/search?componentKeys=Defra.Trade.Cloning.Gateway.Api%2CDefra.Trade.Cloning.Api%2CDefra.Trade.Cloning.Web%2CDefra.Trade.Events.Services.Cloning.Scheduler%2CDefra.Trade.Address.Api%2CDefra.Trade.CrmAdapter%2CDefra.Trade.Events.Services.CaseNotifier%2CDefra.Trade.Events.Services.FileStorePublisher%2CDefra.Trade.Events.Services.FileStoreMover%2CDefra.Trade.CustomerExtension.UI%2CDefra.Trade.CustomerExtension.Api%2CDefra.Trade.Events.Services.CustomerPublisher%2CDefra.Trade.Events.Customer.EventStream%2CDefra.Trade.FileStore%2CDefra.Trade.Application.Status%2CDefra.Trade.Events.Services.TradeStoreUpdater%2CDefra.Trade.Events.CoreServices.InfoPublisher%2CDefra.Trade.Cloning.Adapter.Api';
    const response = await fetch(url, {
        headers: {
            'Authorization': 'Bearer 862c349052834f98a05ef0fcce144ff5ed97dab5',
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));