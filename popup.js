const randomEmoji = () => {
  const emojis = [0x1F60D, 0x1F495, 0x1F496, 0x1F499, 0x1F49A, 0x2728, 0x2728, 0x2728, 0x1F970, 0x2764]
  const randomNum = Math.floor(Math.random() * 9)
  return String.fromCodePoint(emojis[randomNum])
}

const coolSynonym = () => {
  const adjectives = ["fun", "vibey", "cool"]
  const randomNum = Math.floor(Math.random() * adjectives.length)
  return adjectives[randomNum]
}

const beautifulSynonym = () => {
  const adjectives = ["gorgeous", "beautiful"]
  const randomNum = Math.floor(Math.random() * adjectives.length)
  return adjectives[randomNum]
}

const randomBoardElement = () => {
  const elements = ["vibe", "design", "aesthetic","concept", "layout", "energy", "style"]
  const randomNum = Math.floor(Math.random() * elements.length)
  return elements[randomNum]
}

const crashLandingCompliment = () => {
  const elements = ["love what you did with this!", "amazing first board!", "this is beautiful!" ]
  const randomNum = Math.floor(Math.random() * elements.length)
  return elements[randomNum]
}

const welcome = () => {
  const elements = ["welcome!", "welcome to landing!", "so happy you're here!", "so excited to see what you create!" ]
  const randomNum = Math.floor(Math.random() * elements.length)
  return elements[randomNum]
}

const comments = ["love this " + randomBoardElement() + " " + randomEmoji(), 
"love this " + randomBoardElement() + "! so creative! " + randomEmoji() ,
"this is " + beautifulSynonym() + "! " + randomEmoji() + " " + randomEmoji(), 
 beautifulSynonym() + " vision board "  + randomEmoji(), 
"So pretty " + randomEmoji(), 
"this is so cute!  " + randomEmoji() + " " + randomEmoji(),
"love these summer vibes! " + randomEmoji(),
crashLandingCompliment() + " " + welcome() + " " + randomEmoji(),
crashLandingCompliment() + " " + welcome() + " " + randomEmoji(),
]



for (let i = 0; i < comments.length; i++) {

  let comment = document.getElementById(i.toString());
  comment.textContent = comments[i]

  const doComment = (commentText) => {
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
    
    const el = document.getElementsByClassName('mentions__input')[0];
    el.focus()
    nativeInputValueSetter.call(el , commentText);
    // dispath event
    el.dispatchEvent(new Event("input", { bubbles: true }));
    // submit
    document.querySelector('[title="Reply"]').click();
  }

  comment.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: doComment,
      args: [comments[i]]
    });
  });
}

