chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, currentTab => {
    const url = new URL(currentTab.url);
    const urlWithoutProtocol = url.hostname + url.pathname;

    fetch('https://nb-3-mgpp2ks77a-as.a.run.app/check_csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'urlWithoutProtocol=' + encodeURIComponent(urlWithoutProtocol)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    })
    .then(data => {
      console.log(data);
      chrome.storage.local.set({is_inside: data.is_inside});
    })
    .catch(error => {
      console.error(error);
      // handle the error here
    });
    
    console.log(`CSV CHECK Sending URL to Flask app: ${urlWithoutProtocol}`); // log the URL being sent to the Flask app
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const url = new URL(tab.url);
    const urlWithoutProtocol = url.hostname + url.pathname;

    fetch('https://nb-3-mgpp2ks77a-as.a.run.app/check_csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'urlWithoutProtocol=' + encodeURIComponent(urlWithoutProtocol)
    })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      chrome.storage.local.set({is_inside: data.is_inside});
    });

    console.log(`CSV CHECK Sending URL to Flask app: ${urlWithoutProtocol}`); // log the URL being sent to the Flask app
  }
});

// VIRUSTOTAL
chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, currentTab => {
    const url = new URL(currentTab.url);

    fetch('https://nb-3-mgpp2ks77a-as.a.run.app/analyze_urlv2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'url=' + encodeURIComponent(url)
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      chrome.storage.local.set({report: JSON.stringify(data.report)});

      if (data.report === 'clean' || data.report === 'Whitelisted Clean') {
        chrome.action.setBadgeText({text: 'C'});
        chrome.action.setBadgeBackgroundColor(
          {color: 'darkgreen'}
        );
      }
      else if (data.report === 'phishing' || data.report === 'Blacklisted Phishing'){
        chrome.action.setBadgeText({text: 'P'});
        chrome.action.setBadgeBackgroundColor(
          {color: 'red'}
        );
      }
      else {
        chrome.action.setBadgeText({text: '?'});
        chrome.action.setBadgeBackgroundColor(
          {color: 'yellow'});
          fetch(url)
            .then(response => {
              if (response.status === 200) {
                console.log(response.status)
              } else {
                console.log(response.status)
              }
            })
            .catch(error => {
              if (error.message.includes('Failed to fetch')) {
                console.log(error.message)
              } else {
                console.log(error.message)
              }
            });
      }
    });
    
    console.log(`VIRUSTOTAL CHECK Sending URL to Flask app: ${url}`); // log the URL being sent to the Flask app
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const url = new URL(tab.url);

    fetch('https://nb-3-mgpp2ks77a-as.a.run.app/analyze_urlv2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'url=' + encodeURIComponent(url)
    })
    .then(response => { 
      return response.json();
    })
    .then(data => {
      console.log(data);
      chrome.storage.local.set({report: JSON.stringify(data.report)});

      if (data.report === 'clean' || data.report === 'Whitelisted Clean') {
        chrome.action.setBadgeText({text: 'C'});
        chrome.action.setBadgeBackgroundColor(
          {color: 'darkgreen'}
        );
      }
      else if (data.report === 'phishing' || data.report === 'Blacklisted Phishing'){
        chrome.action.setBadgeText({text: 'P'});
        chrome.action.setBadgeBackgroundColor(
          {color: 'red'}
        );
      }
      else {
        chrome.action.setBadgeText({text: '?'});
        chrome.action.setBadgeBackgroundColor(
          {color: 'yellow'});
          fetch(url)
            .then(response => {
              if (response.status === 200) {
                console.log(response.status)
              } else {
                console.log(response.status)
              }
            })
            .catch(error => {
              if (error.message.includes('Failed to fetch')) {
                console.log(error.message)
              } else {
                console.log(error.message)
              }
            });
      }
    });

    console.log(`VIRUSTOTAL CHECK Sending URL to Flask app: ${url}`); // log the URL being sent to the Flask app
  }
});

// Features
chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, currentTab => {
    const url = new URL(currentTab.url);

    fetch('https://nb-3-mgpp2ks77a-as.a.run.app/features', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'url=' + encodeURIComponent(url)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    })
    .then(data => {
      console.log(data);
      chrome.storage.local.set({ftrs: data.ftrs});
    })
    .catch(error => {
      console.error(error);
      // handle the error here
    });
    
    console.log(`FTRS CHECK Sending URL to Flask app: ${url}`); // log the URL being sent to the Flask app
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const url = new URL(tab.url);

    fetch('https://nb-3-mgpp2ks77a-as.a.run.app/features', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'url=' + encodeURIComponent(url)
    })
    .then(response => { 
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    })
    .then(data => {
      console.log(data);
      chrome.storage.local.set({ftrs: data.ftrs});
    })
    .catch(error => {
      console.error(error);
      // handle the error here
    });

    console.log(`FTRS CHECK Sending URL to Flask app: ${url}`); // log the URL being sent to the Flask app
  }
});

// ML
chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, currentTab => {
    const url = new URL(currentTab.url);

    fetch('https://nb-3-mgpp2ks77a-as.a.run.app/ml', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'url=' + encodeURIComponent(url)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    })
    .then(data => {
      console.log(data);
      chrome.storage.local.set({rfc: data.rfc});
    })
    .catch(error => {
      console.error(error);
      // handle the error here
    });
    
    console.log(`FTRS CHECK Sending URL to Flask app: ${url}`); // log the URL being sent to the Flask app
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const url = new URL(tab.url);

    fetch('https://nb-3-mgpp2ks77a-as.a.run.app/ml', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'url=' + encodeURIComponent(url)
    })
    .then(response => { 
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    })
    .then(data => {
      console.log(data);
      chrome.storage.local.set({rfc: data.rfc});
    })
    .catch(error => {
      console.error(error);
      // handle the error here
    });

    console.log(`FTRS CHECK Sending URL to Flask app: ${url}`); // log the URL being sent to the Flask app
  }
});