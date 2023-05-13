chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  
  const currentTab = tabs[0];
  const url = new URL(currentTab.url);
  
  // Update the URL display
  const urlEl = document.getElementById('url');
  urlEl.textContent = currentTab.url;

  chrome.storage.local.get('is_inside', data => {
    if (data.is_inside === true) {
      document.getElementById('status').textContent = 'Url is inside the database';
    } else if (data.is_inside === false) {
      document.getElementById('status').textContent = 'Url is not inside the database';
    }
  });

  chrome.storage.local.get('report', function(data) {
    const report = JSON.parse(data.report);
    const resultDiv = document.getElementById('result');
    const url = new URL(currentTab.url);
  
    if (report === 'clean') {
      resultDiv.textContent = 'Result: Clean according to PhishTank';
      resultDiv.style.backgroundColor = 'darkgreen';
    }
    else if (report === 'Whitelisted Clean'){
      resultDiv.textContent = 'Result: ' + report;
      resultDiv.style.backgroundColor = 'darkgreen';
    }
    else if (report === 'phishing'){
      resultDiv.textContent = 'Result: Phishing according to PhishTank';
      resultDiv.style.backgroundColor = 'red';
    }
    else if (report === 'Blacklisted Phishing'){
      resultDiv.textContent = 'Result: ' + report;
      resultDiv.style.backgroundColor = 'red';
    }
    else {
      resultDiv.textContent = 'Result: ' + report;
      resultDiv.style.backgroundColor = 'rgb(179, 216, 77)';
      fetch(url)
        .then(response => {
          if (response.status === 200) {
            const button = document.getElementById('my-button');
            button.classList.remove('hidden');
            const p = document.getElementById('para');
            p.classList.remove('hidden');
          } else {
            const button = document.getElementById('my-button');
            button.classList.add('hidden');
            const p = document.getElementById('para');
            p.classList.add('hidden');
          }
        })
        .catch(error => {
          // Only used for testing
          if (error.message.includes('Failed to fetch')) {
            console.log('404');
            const button = document.getElementById('my-button');
            button.classList.remove('hidden');
            const p = document.getElementById('para');
            p.classList.remove('hidden');
          } else {
            console.log(error.message)
            const button = document.getElementById('my-button');
            button.classList.add('hidden');
            const p = document.getElementById('para');
            p.classList.add('hidden');
          }
        });
    }
  });

  const myButton = document.getElementById("my-button");

  myButton.addEventListener("click", () => {
    const url = new URL(currentTab.url);
    fetch('https://nb-3-mgpp2ks77a-as.a.run.app/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'url=' + encodeURIComponent(url)
    })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
    });

    console.log(`Retraining this URL: ${urlWithoutProtocol}`); // log the URL being sent to the Flask app
  });
  
  // inf button element and the popup element
  const infButton = document.getElementById('inf-button');
  const popup = document.getElementById('popup');

  // Display the results
  let resultEl = document.getElementById('resultList');
  let resultBtn = document.getElementById('button');
  resultEl.style.display = 'none';  
  var btnStat = false;

  infButton.addEventListener('click', () => {
    if (popup.style.display === 'block') {
      popup.style.display = 'none';
    } else {
      popup.style.display = 'block';
      resultEl.style.display = 'none'; 
      btnStat = false;
    }
  });

  resultBtn.addEventListener('click', () => {
    btnStat = !btnStat;
    if(btnStat == false){
      resultEl.style.display = 'none';  
    } else {
      resultEl.style.display = 'initial';
    }
  })

  chrome.storage.local.get(['ftrs'], data => {
    const ftrs = data.ftrs;
    let resultEl = document.getElementById('resultList');

    const isUsingUntrustedHttp = url.protocol === 'http:' && !url.origin.startsWith('https://');
  
    resultEl.innerHTML = `
      <table>
      <tr>
        <td>IP address:</td>
        <td>${ftrs[0] ? 'Yes' : 'No'}</td> 
      </tr>
      <tr>
        <td>Contains @ symbol:</td>
        <td>${ftrs[1] ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td>More than 3 dots:</td>
        <td>${ftrs[2] ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td>Contains - symbol:</td>
        <td>${ftrs[3] ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td>URL Redirections:</td>
        <td>${ftrs[4] ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td>Using untrusted HTTP:</td>
        <td>${isUsingUntrustedHttp ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td>Using mail function:</td>
        <td>${ftrs[6] ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td>Using URL shortening services:</td>
        <td>${ftrs[7] ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td>URL Length ≥ 54:</td>
        <td>${ftrs[8] ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td>Sensitive words:</td>
        <td>${ftrs[9] ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td>Unicode characters:</td>
        <td>${ftrs[10] ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td>Anchor percentage:</td>
        <td>${ftrs[11] ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td>No DNS record for domain:</td>
        <td>${ftrs[12] ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td>Not indexed by Google:</td>
        <td>${ftrs[13] ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td>Age is less than 6 months:</td>
        <td>${ftrs[14] ? 'Yes' : 'No'}</td>
      </tr>
      </table>
    `;
  });
})