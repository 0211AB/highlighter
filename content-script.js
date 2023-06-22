async function getTargetWords() {
  const data = await fetch('https://random-word-api.vercel.app/api?words=10'); // REPLACE WITH API THAT SENDS WORDS
  const res = await data.json();
  return res;
}

function highlightWordsOnPage(words) {
  const wordRegexes = words.map(word => new RegExp(`\\b${word}\\b`, 'gi'));
  const walkDOM = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const content = node.textContent;
      for (let i = 0; i < wordRegexes.length; i++) {
        const wordRegex = wordRegexes[i];
        if (wordRegex.test(content)) {
          const highlightedContent = content.replace(wordRegex, '<span style="background-color: yellow">$&</span>');
          const tempElement = document.createElement('span');
          tempElement.innerHTML = highlightedContent;
          node.parentNode.replaceChild(tempElement, node);
          break;
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const childNodes = node.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        walkDOM(childNodes[i]);
      }
    }
  };

  walkDOM(document.body);
}


async function highlight() {
  const targetWords = await getTargetWords()
  highlightWordsOnPage(targetWords);
}

highlight();
