
chrome.tabs.onActivated.addListener(function(active) {
    chrome.alarms.create(
        active.tabId.toString(),
        { periodInMinutes: 2 }
    );
})

chrome.alarms.onAlarm.addListener(function(alarm) {
    chrome.tabs.get(parseInt(alarm.name), (t) => {
        if (!chrome.runtime.lastError && t) {
            if (t.active || t.audible || t.pinned || !t.autoDiscardable)
                return true;
            chrome.tabs.discard(t.id);
        }
        chrome.alarms.clear(alarm.name);
    })
})
  
