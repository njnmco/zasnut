
chrome.tabs.onActivated.addListener(function(active) {
    chrome.alarms.create(active.tabId.toString(), {periodInMinutes: 2});
})

chrome.tabs.onRemoved.addListener((tId) => chrome.alarms.clear(tId.toString()));

chrome.alarms.onAlarm.addListener(function(alarm) {
    chrome.tabs.get(parseInt(alarm.name), (t) => {
        if (t.active || t.audible || t.pinned || !t.autoDiscardable)
            return true;
        chrome.tabs.discard(t.id, (t) => chrome.alarms.clear(alarm.name));
    })
})

  
