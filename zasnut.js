
(function(){
    // windowId => {windowId, tabId} of active tab
    var activeMap = new Map();

    // Configurable delay
    var zasnut = { delayInMinutes: 4 }
    //chrome.storage.local.get("zasnut", o => Object.assign(zasnut, o))
    //chrome.storage.local.onChanged.addListener( o => o.zasnut && Object.assign(zasnut, o.zasnut.newValue))

    chrome.tabs.onActivated.addListener(function(active) {
      let repr = (info) =>`zzz_${info.tabId}`;
      chrome.alarms.clear(repr(active));
      let last = activeMap.get(active.windowId);
      if (last) chrome.alarms.create(repr(last), zasnut);
      activeMap.set(active.windowId, active);
    })
})();

chrome.alarms.onAlarm.addListener(function(alarm) {
  let check = (t) => t && !t.active && !t.audible && !t.pinned && t.autoDiscardable;
  if (!alarm.name.startsWith("zzz_")) return;
  let tabId = parseInt(alarm.name.substr(4));
  chrome.tabs.get(tabId, (t) => chrome.runtime.lastError || check(t) && chrome.tabs.discard(t.id))
})
  
