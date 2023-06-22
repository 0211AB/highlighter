const injectFile = document.getElementById('inject-file');
const injectFunction = document.getElementById('inject-function');

async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

injectFile.addEventListener('click', async () => {
  const tab = await getCurrentTab();

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content-script.js']
  });
});

// function showAlertWindow(givenName) {
//   const bodyTag = document.body
//   const article = document.querySelector('article');
//   const articleClass = document.querySelector('[class*="article"]');
//   // If there is an article tag, use it, otherwise use the body tag
//   elements = (article ?? articleClass ?? bodyTag).getElementsByTagName('*');
//   var allWords = '';

//   // Loop through all elements
//   for (var i = 0; i < elements.length; i++) {
//     var element = elements[i];
//     if (element.tagName != 'SCRIPT'){
//       allWords = allWords + " " + element.textContent
//     }
//   }
//   allWords = allWords.replace(/\s+/g, ' ').trim();
  
//   try {
//     navigator.clipboard.writeText("Is the following text politically left, centrist or to the right? " + allWords.slice(0,600));
//     console.log('Page copied to clipboard');
//   } catch (err) {
//     console.error('Failed to copy: ', err);
//   }
//   alert('Hello, we could have made an API call to OpenAI, but OpenAI is not very open and costs money. Instead, I have copied a query to the clipboard. Please click go to ChatGPT and then manually paste it into the text box. Then, click the "Chat" button, and you will see the results in the chat box.')
   
//   // Note if you try to automate opening up chat the clipboard does not work (supposedly because of security) 
//   // window.open('https://chat.openai.com/chat', '_blank');
  
// }

// injectFunction.addEventListener('click', async () => {
//   const tab = await getCurrentTab();

//   const name = 'World';
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: showAlertWindow,
//     args: [name]
//   });
// });

