async function checkPage(
    name: string,
    url: string,
) {
    const response = await fetch(url);
    const ok = response.ok;
    return [name, ok];
}

const result = await Promise.all([
    checkPage('obos.no', 'https://dkt-boligjaktfe-prod-wa.azurewebsites.net/ny-bolig/api/health'),
    checkPage('obos.se', 'https://dkt-boligjaktfe-se-prod-wa.azurewebsites.net/hitta-bostad/api/health'),
    checkPage('obosblockwatne.no', 'https://dkt-boligjaktfe-obw-prod-wa.azurewebsites.net/finn-bolig/api/health'),
]);

result.forEach(([name, ok]) => {
    if (ok) {
        console.log('[OK]', name);
    } else {
        console.error('[KO]', name);
    }
});

const anyFailed = result.some(([,ok]) => !ok);
if (anyFailed) {
    console.log('trigger notification plz');
    process.exit(1);
} else {
    process.exit(0);
}