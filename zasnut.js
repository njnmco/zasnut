// Copyright (c) 2021 Neal Fultz. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice,
// this list of conditions and the following disclaimer.
//
// 2. Redistributions in other forms must reproduce the above copyright notice,
// this list of conditions and the following disclaimer in the documentation
// and/or other materials provided with the distribution.
//
// 3. All advertising materials mentioning features or use of this software
// must display the following acknowledgement: This product includes software
// developed by Neal Fultz <neal@njnm.co>.
//
// 4. Neither the name of Neal Fultz nor the names of its contributors may be
// used to endorse or promote products derived from this software without specific
// prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY Neal Fultz "AS IS" AND ANY EXPRESS OR
// IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL Neal Fultz BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
// BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
// IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

chrome.tabs.onActivated.addListener(function(active) {
    chrome.alarms.create(active.tabId+"new", {periodInMinutes: 2});
    chrome.alarms.clear(active.tabId+"zzz");
});

chrome.tabs.onRemoved.addListener(function(tId) {
    chrome.alarms.clear(tId+"new");
    chrome.alarms.clear(tId+"zzz");
});

chrome.tabs.onCreated.addListener(function(tab) {
    chrome.alarms.create(tab.id+ "new", {periodInMinutes: 5});
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    chrome.tabs.get(Number(alarm.name.replace(/[^\d]+/, '')), (t) => {
        if (chrome.runtime.lastError) {
            //
        } else if (t.active || t.audible || t.pinned || !t.autoDiscardable) {
            return true;
        } else if (alarm.name.endsWith("zzz")) {
            chrome.tabs.discard(t.id);
        } else {
            chrome.alarms.create(t.id + "zzz", {periodInMinutes: 2});
        }
        chrome.alarms.clear(alarm.name);
    })
})

  
