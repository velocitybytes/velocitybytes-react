import React, {useEffect, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import '../../assets/css/voice_assistant.scss';

const VoiceAssistant = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const commands = [
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
  ];

  const {
    transcript,
    resetTranscript
  } = useSpeechRecognition({commands});

  useEffect(() => {
    setSearchTerm(transcript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  useEffect(() => {
    setTimeout(() => {
      if (isListening && searchTerm.length === 0) {
        setIsListening(false);
        setIsMicOn(true);
      }
    }, 6000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.currentTarget.value);
  }

  const handleMic = () => {
    setIsMicOn(!isMicOn);
    if (isMicOn) {
      setIsListening(true);
      SpeechRecognition.startListening()
        .then(() => {})
    }
    if (!isMicOn) {
      SpeechRecognition.stopListening();
      SpeechRecognition.abortListening();
      setIsListening(false);
    }
  };

  const handleReset = () => {
    resetTranscript();
    setIsMicOn(!isMicOn);
  }

  const handleResetTranscript = (event) => {
    resetTranscript();
    event.preventDefault();
    event.target.classList.remove('animate');
    event.target.classList.add('animate');

    setTimeout(function(){
      event.target.classList.remove('animate');
    }, 700);
  }

  let bubblyButtons = document.getElementsByClassName("reset-button");

  for (let i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', handleResetTranscript, false);
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <>
        Your browser doesn't support speech recognition
      </>
    );
  }

  return (
    <>
      <div className="voice-asst">
        <form>
          <img
            src="https://velocitybytes.com/uploads/logo/logo_60bbbd94a064d1.png"
            alt="VelocityBytes"
            width="145" height="46"
          />
          <fieldset>
            <legend>Voice Assistant</legend>
            <div className="inner-form">
              <div className="input-field">
                <button className="btn-search" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3
                    9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14
                     5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </button>
                <button
                  className="btn-voice"
                  type="button"
                  onClick={handleMic}
                >
                  {
                    !isMicOn ? (<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <g data-name="Layer 2">
                        <g data-name="mic">
                          <rect width="24" height="24" opacity="0"/>
                          <path d="M12 15a4 4 0 0 0 4-4V6a4 4 0 0 0-8 0v5a4 4 0 0 0 4 4z"/>
                          <path d="M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H8.89a.89.89 0 0
                          0-.89.89v.22a.89.89 0 0 0 .89.89h6.22a.89.89 0 0 0 .89-.89v-.22a.89.89 0 0 0-.89-.89H13v-2.08A7
                          7 0 0 0 19 11z"/>
                        </g>
                      </g>
                    </svg>) : (<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <g data-name="Layer 2">
                        <g data-name="mic-off">
                          <rect width="24" height="24" opacity="0"/>
                          <path d="M15.58 12.75A4 4 0 0 0 16 11V6a4 4 0 0 0-7.92-.75"/>
                          <path d="M19 11a1 1 0 0 0-2 0 4.86 4.86 0 0 1-.69 2.48L17.78 15A7 7 0 0 0 19 11z"/>
                          <path d="M12 15h.16L8 10.83V11a4 4 0 0 0 4 4z"/>
                          <path d="M20.71 19.29l-16-16a1 1 0 0 0-1.42 1.42l16 16a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
                          <path
                            d="M15 20h-2v-2.08a7 7 0 0 0 1.65-.44l-1.6-1.6A4.57 4.57 0 0 1 12 16a5 5 0 0 1-5-5 1 1 0 0 0-2
                        0 7 7 0 0 0 6 6.92V20H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"/>
                        </g>
                      </g>
                    </svg>)
                  }
                </button>
                <input
                  type="search"
                  placeholder={isListening ? 'Listening...' : 'Speak something...'}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="suggestion-wrap">
                <button
                  type="button"
                  className="reset-button"
                  onClick={handleResetTranscript}
                >
                  Reset
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default VoiceAssistant;
