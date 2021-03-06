const moment = require('moment');
const showdown = require('showdown');
const converter = new showdown.Converter({
  omitExtraWLInCodeBlocks: true,
  simplifiedAutoLink: true,
  excludeTrailingPunctuationFromURLs: true,
  strikethrough: true,
  simpleLineBreaks: true,
});
converter.setFlavor('github');

export const formatRoomContents = (title, messages) => {
  return stylesheet + roomTitle(title) + converter.makeHtml(messageList(messages));
};

const roomTitle = title => {
  return `<div class="room-title"><h1>${title}</h1></div>`;
};

const messageList = messages => {
  const start = '<div class="message-list">';
  const end = '</div>';
  return start + messages.map(m => formattedMessage(m)).join('\n\n') + end;
};

const formattedMessage = message => {
  // console.log(message);
  return '<div class="message-container">' + userName(message) + messageBody(message) + urls(message) + '</div>';
  // return '**' + userName(message) + '**: ' + messageBody(message);
};

const userName = message => {
  const name = message.alias || message.u.username;
  const time = moment(message.ts).fromNow();
  return `<span class="username" title="${time}">${name}</span>: `;
  // return name;
};

const messageBody = message => ((message.msg.substring(0, 3) === '```') ? '\n' : '') + message.msg;

const urls = message => {
  if (message.urls) {
    return '<br/>' + message.urls.map(u => `<a href="${u.url}" class="link">${u.url}</a><br/>`).join('<br/>');
  } else {
    return '';
  }
};

const stylesheet = `<style type="text/css">
  .room-title {
    font-size: 2.5vw;
    line-height: 2.6vw;
    padding-top: 0;
    padding-left: 2vw;
    border-bottom: 1px solid grey;
    background-color: black;
    color: grey;
    height: 10vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .message-list {
    margin-top: 10vw;
    font-size: 1.1em;
  }

  .message-container {
    padding: 0.1em;
    margin-bottom: 0.3em;
  }

  .username {
    font-weight: 700;
  }

  .link {
    color: white;
  }

  pre {
    border: 1px solid grey;
    padding: 4px;
  }
  </style>`;


export default {
  formatRoomContents,
};
