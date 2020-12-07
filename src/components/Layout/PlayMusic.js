import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import lastChristmas from '../../sound/LastChristmas.mp3';

function PlayMusic() {
  return (
    <div className='audioWrapper'>
      <AudioPlayer
        title='Play Christmas Music'
        src={lastChristmas}
        showJumpControls={false}
        customVolumeControls={[]}
        customProgressBarSection={[]}
        customAdditionalControls={[]}
        showDownloadProgress={false}
        showFilledProgress={false}
        style={{
          border: 'none',
          display: 'flex',
          padding: '0',
          margin: '0',
          justifyContent: 'center',
          //alignItems: '',
          textAlign: 'center',
          maxWidth: '4em',
          height: '2em',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          boxShadow: 'none',
        }}
      />
    </div>
  );
}
export default PlayMusic;
