chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  
  const currentTab = tabs[0];
  const url = new URL(currentTab.url);

  // Update the URL display
  const urlEl = document.getElementById('url');
  urlEl.textContent = currentTab.url;

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
  const isUsingIFrame = currentTab.url.startsWith('chrome-extension://');
  const hostnameNotIncluded = url.hostname === '';
  const ageOfDomainLessThanSixMonths = false; // you will need to implement this check separately
  const noDnsRecordForDomain = false; // you will need to implement this check separately
  const notIndexedByGoogle = false; // you will need to implement this check separately
 
  // Display the results
  let resultEl = document.getElementById('resultList');
  let resultBtn = document.getElementById('button');
  resultEl.style.display = 'none';  
  var btnStat = false;

  resultBtn.addEventListener('click', () => {
    btnStat = !btnStat;
    if(btnStat == false){
      resultEl.style.display = 'none';  
    } else {
      resultEl.style.display = 'initial';
    }
  })

  resultEl.innerHTML = `
    <table>
    <colgroup>
      <col class="col1" span="1">
      <col class="col2" span="1">
    </colgroup>
    <tr>
      <th>Feature</th>
    </tr>
    <tr>
      <td>IP address:</td>
      <td>${hasIpAddress ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <td>More than 3 dots:</td>
      <td>${hasMoreThanThreeDots ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <td>Hyphen in the domain:</td>
      <td>${hasHyphenInDomain ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <td>Last double slash > 7:</td>
      <td>${lastDoubleSlashGreaterThanSeven ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <td>Using untrusted HTTP:</td>
      <td>${isUsingUntrustedHttp ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <td>Using mail function:</td>
      <td>${isUsingMailFunction ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <td>Using TinyURL:</td>
      <td>${isUsingTinyUrl ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <td>URL Length ≥ 54:</td>
      <td>${isUrlLengthMoreThan54 ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <td>Unicode characters:</td>
      <td>${hasUnicodeCharacters ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <td>Using IFRAME:</td>
      <td>${isUsingIFrame ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <td>Hostname not included:</td>
      <td>${hostnameNotIncluded ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <td>Age of domain < 6 months:</td>
      <td>${ageOfDomainLessThanSixMonths ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <td>No DNS record for domain:</td>
      <td>${noDnsRecordForDomain ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <td>Not indexed by Google:</td>
      <td>${notIndexedByGoogle ? 'Yes' : 'No'}</td>
    </tr>
    </table>
  `;
});