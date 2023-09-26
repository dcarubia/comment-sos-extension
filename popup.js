const comments = [];

const updateButtons = () => {
  // clear the buttons container
  let container = document.getElementById('buttons-container');
  container.innerHTML = '';

  // create a button for each comment
  for (let i = comments.length - 1; i >= 0; i--) {
    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'row';
    buttonContainer.id = `button-container-${i}`;

    let deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'X';

    let button = document.createElement('button');
    button.id = `button-${i}`;
    button.textContent = comments[i];

    // create a function to be executed on click of the button
    const doComment = (commentText) => {
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      ).set;

      const el = document.getElementsByClassName('mentions__input')[0];
      el.focus();
      nativeInputValueSetter.call(el, commentText);
      // dispath event
      el.dispatchEvent(new Event('input', { bubbles: true }));
      // submit
      document.querySelector('[title="Reply"]').click();
    };

    const deleteComment = (index) => {
      comments.splice(index, 1);
      chrome.storage.sync.set({ comments: comments }, () => {
        console.log('Comments saved');
      });
      updateButtons();
    };

    // add event listener
    button.addEventListener('click', async () => {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: doComment,
        args: [comments[i]],
      });
    });

    deleteButton.addEventListener('click', () => {
      deleteComment(i);
    });

    // append to the DOM
    let mainContainer = document.getElementById('buttons-container');
    mainContainer.appendChild(buttonContainer);
    buttonContainer.appendChild(button);
    buttonContainer.appendChild(deleteButton);
  }
};

// Get comments from storage
chrome.storage.sync.get(['comments'], (result) => {
  console.log('Comments retrieved', result);
  if (result.comments) {
    if (result.comments.length > 0) {
      comments.push(...result.comments);
      updateButtons();
    } else {
      const defaultComment = 'This is so cute :)';
      comments.push(defaultComment);
      updateButtons();
    }
  }
});

const commentInput = document.getElementById('comment-input');
const saveCommentButton = document.getElementById('save-comment-button');
saveCommentButton.addEventListener('click', () => {
  if (!commentInput.value) return;
  comments.push(commentInput.value);
  commentInput.value = '';
  chrome.storage.sync.set({ comments: comments }, () => {
    console.log('Comments saved');
  });
  updateButtons();
});
