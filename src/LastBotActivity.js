import React from 'react';
import ReactMarkdown from 'react-markdown';

import { connectToWebChat, Components } from 'botframework-webchat';

const { SpeakActivity } = Components;

const msg = "I’m sorry — all of the humans are out of the office right now. " +
    "(I’m just a bot.) If you're looking for resources to help you get the " +
    "most out of the programs you're already using, check our " +
    "[knowledge base](https://j1visa.state.gov/basics/common-questions).";

export default connectToWebChat(
  ({
       activities,
       className
  }) => ({
    activity: activities.slice().reverse().find(({ from: { role }, type }) => role === 'bot' && type === 'message'),
      className,
  })
)(({ activity, className }) =>
  !!activity &&
    <React.Fragment className={ className }>
      <ReactMarkdown>{ activity.text.includes("No QnA Maker answers were found.") ? msg : activity.text }</ReactMarkdown>
      { activity.channelData && activity.channelData.speak && <SpeakActivity activity={ activity } /> }
    </React.Fragment>
)
