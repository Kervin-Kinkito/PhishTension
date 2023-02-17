chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const url = new URL(tab.url);

    // Check for features
    const hasIpAddress = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url.hostname);
    const hasAtSymbol = url.href.includes('@');
    const hasMoreThanThreeDots = url.hostname.split('.').length > 3;
    const hasHyphenInDomain = url.hostname.includes('-');
    const lastDoubleSlashPosition = url.href.lastIndexOf('//');
    const lastDoubleSlashGreaterThanSeven = lastDoubleSlashPosition > 7;
    const isUsingUntrustedHttp = url.protocol === 'http:' && !url.origin.startsWith('https://');
    const isUsingMailFunction = url.href.includes('mail(') || url.href.startsWith('mailto:');
    const isUsingTinyUrl = url.href.includes('tinyurl.com');
    const isUrlLengthMoreThan54 = url.href.length >= 54;
    const hasUnicodeCharacters = /[^\x00-\x7F]/.test(url.href);
    const isUsingIFrame = tab.url.startsWith('chrome-extension://');
    const hostnameNotIncluded = url.hostname === '';
    // Implement these separately since these use different APIs
    const ageOfDomainLessThanSixMonths = false; //WHOISAPI
    const noDnsRecordForDomain = false; 
    const notIndexedByGoogle = false; 

    // Log the results
    console.log({
      hasIpAddress,
      hasAtSymbol,
      hasMoreThanThreeDots,
      hasHyphenInDomain,
      lastDoubleSlashGreaterThanSeven,
      isUsingUntrustedHttp,
      isUsingMailFunction,
      isUsingTinyUrl,
      isUrlLengthMoreThan54,
      hasUnicodeCharacters,
      isUsingIFrame,
      hostnameNotIncluded,
      ageOfDomainLessThanSixMonths,
      noDnsRecordForDomain,
      notIndexedByGoogle,
    });
  }
});
