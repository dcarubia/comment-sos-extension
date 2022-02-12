const randomEmoji = () => {
  const emojis = [0x1F60D, 0x1F495, 0x1F496, 0x1F499, 0x1F49A, 0x2728, 0x2728, 0x2728, 0x1F970, 0x2764]
  const randomNum = Math.floor(Math.random() * 9)
  return String.fromCodePoint(emojis[randomNum])
}

const comments = ["love this energy " + randomEmoji(), 
"love this design! so creative " + randomEmoji(),
"beautiful vision board "  + randomEmoji(),
"So pretty " + randomEmoji(),
"love this aesthetic! " + randomEmoji(),
"this is so cute!  " + randomEmoji() + " " + randomEmoji(),
"oo love this! thanks for including links! " + randomEmoji(),
"oo such a cool way to use a board! ",
"love this! " + randomEmoji() + " the images are so cool! where did you find them?"
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

