(function() {
  'use strict';
  
  const foods = [];
  
  const prom = fetch('data.json')
    .then(blob => blob.json())
    .then(data => {
      for(let rating in data) {
        data[rating].forEach(category => {
          category.items.forEach(food => {
            let item = {
              rating: rating,
              name: food
            };
            foods.push(item);
          })
        })
      }
    });
  
  function findMatches(wordToMatch, foods) {
    return foods.filter(food => {
      const regex = new RegExp(wordToMatch, 'gi');
      return food.name.match(regex);
    });
  }
  
  function displayMatches() {
    if(!this.value.length) return suggestions.innerHTML = '';
    const matchArray = findMatches(this.value, foods);
    const html = matchArray.map(food => {
      const regex = new RegExp(this.value, 'gi');
      const foodName = food.name.replace(regex, `<span class="hl">${this.value}</span>`);
  
      return `
        <li class="${food.rating}">
          <span class="name">${foodName}</span>
        </li>
      `;
    }).join('');
    suggestions.innerHTML = html.length ? html : '<li>Sorry, no results were found.</li>';
  }
  
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');
  
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('input', displayMatches);
  
  /**
   * Copyright 2015 Google Inc. All rights reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  if ('serviceWorker' in navigator) {
    // Your service-worker.js *must* be located at the top-level directory relative to your site.
    // It won't be able to control pages unless it's located at the same level or higher than them.
    // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
    // See https://github.com/slightlyoff/ServiceWorker/issues/468
    navigator.serviceWorker.register('service-worker.js').then(function(reg) {
      // updatefound is fired if service-worker.js changes.
      reg.onupdatefound = function() {
        // The updatefound event implies that reg.installing is set; see
        // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
        var installingWorker = reg.installing;

        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // At this point, the old content will have been purged and the fresh content will
                // have been added to the cache.
                // It's the perfect time to display a "New content is available; please refresh."
                // message in the page's interface.
                console.log('New or updated content is available.');
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a "Content is cached for offline use." message.
                console.log('Content is now available offline!');
              }
              break;

            case 'redundant':
              console.error('The installing service worker became redundant.');
              break;
          }
        };
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

})();