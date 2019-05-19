import './App.css';
import './demo/assets/styles/header.css';
import './demo/assets/styles/footer.css';
import './demo/assets/styles/base.css';

import { Components, createDirectLine, createCognitiveServicesSpeechServicesPonyfillFactory } from 'botframework-webchat';
import React, { Component } from 'react';

import CustomDictationInterims from './CustomDictationInterims';
import CustomMicrophoneButton from './CustomMicrophoneButton';
import fetchSpeechServicesToken from './fetchSpeechServicesToken';
import LastBotActivity from './LastBotActivity';

import Header from './demo/src/Header';
import Footer from './demo/src/Footer';

const { Composer } = Components;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            directLine: null
        };
    }

    async componentDidMount() {
        const res = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', { method: 'POST' });
        const token = 'yBAq-XoF_kE.9YRJe2wxjboovSX74EBD5RtbRv5wdmvmw-UhkGVBwFI';

        this.setState(() => ({
            directLine: createDirectLine({
                token,
                webSpeechPonyfillFactory: createCognitiveServicesSpeechServicesPonyfillFactory({
                    // TODO: [P3] Fetch token should be able to return different region
                    region: 'westus',
                    token,
                })
            })
        }));
    }

    render() {
        const {
            state: { directLine }
        } = this;

        return (
            !!directLine &&
            <Composer
                directLine={ directLine }>
                <div className="App">
                    <Header/>
                    <CustomMicrophoneButton className="App-speech-button" />
                    <CustomDictationInterims className="App-speech-interims" />
                    <LastBotActivity className="App-bot-activity" />
                </div>
                <Footer/>
            </Composer>
        );
    }
}
