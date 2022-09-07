//emojis
const heartFace = 0x1f60d;
const twoHearts = 0x1f495;
const sparklingHeart = 0x1f496;
const blueHeart = 0x1f499;
const greenHeart = 0x1f49a;
const sparkles = 0x2728;
const smilingFaceWithHearts = 0x1f970;
const redHeart = 0x2764;
const blackHeart = 0x1f5a4;
const shootingStar = 0x1f4ab;
const leaves = 0x1F342

const randomEmoji = () => {
  const emojis = [
    twoHearts,
    sparkles,
    sparkles,
    sparkles,
    sparklingHeart,
    blueHeart,
    greenHeart,
    shootingStar,
    blackHeart
  ];
  const randomNum = Math.floor(Math.random() * emojis.length);
  return String.fromCodePoint(emojis[randomNum]);
};

const coolSynonym = () => {
  const adjectives = ["fun", "vibey", "cool"];
  const randomNum = Math.floor(Math.random() * adjectives.length);
  return adjectives[randomNum];
};

const beautifulSynonym = () => {
  const adjectives = ["gorgeous", "beautiful"];
  const randomNum = Math.floor(Math.random() * adjectives.length);
  return adjectives[randomNum];
};

const randomBoardElement = () => {
  const elements = ["vibe", "design", "aesthetic", "layout", "energy", "style"];
  const randomNum = Math.floor(Math.random() * elements.length);
  return elements[randomNum];
};

const randomPluralBoardElement = () => {
  const elements = ["colors", "finds", "vibes"];
  const randomNum = Math.floor(Math.random() * elements.length);
  return elements[randomNum];
};

const firstBoardCompliment = () => {
  const elements = ["amazing first board!", "this is beautiful!"];
  const randomNum = Math.floor(Math.random() * elements.length);
  return elements[randomNum];
};

const welcome = () => {
  const elements = [
    "welcome!",
    "welcome to landing!",
    "so happy you're here!",
    "can't wait to see what you create next!",
  ];
  const randomNum = Math.floor(Math.random() * elements.length);
  return elements[randomNum];
};

const comments = [
  "love these " + randomPluralBoardElement() + "! " + randomEmoji(),
  "love this " + randomBoardElement() + "! so creative! " + randomEmoji(),
  "this is " + beautifulSynonym() + "! " + randomEmoji() + " " + randomEmoji(),
  beautifulSynonym() + " vision board " + randomEmoji(),
  "So pretty " + randomEmoji(),
  "this is so cute!  " + randomEmoji() + " " + randomEmoji(),
  "love these fall vibes! " + String.fromCodePoint(leaves),
  firstBoardCompliment() + " " + welcome() + " " + randomEmoji(),
  firstBoardCompliment() + " " + welcome() + " " + randomEmoji(),
];

for (let i = 0; i < comments.length; i++) {
  let comment = document.getElementById(i.toString());
  comment.textContent = comments[i];

  const doComment = (commentText) => {
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value"
    ).set;

    const el = document.getElementsByClassName("mentions__input")[0];
    el.focus();
    nativeInputValueSetter.call(el, commentText);
    // dispath event
    el.dispatchEvent(new Event("input", { bubbles: true }));
    // submit
    document.querySelector('[title="Reply"]').click();
  };

  comment.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: doComment,
      args: [comments[i]],
    });
  });
}
