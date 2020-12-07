import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import soundUrl from '../../sound/JingleBellsKevinMacLeod.mp3';
//import playButton from '../../images/play-music.png';

function PlayMusic() {
  return (
    <AudioPlayer
      src={soundUrl}
      showJumpControls={false}
      customVolumeControls={[]}
      customProgressBarSection={[]}
      customAdditionalControls={[]}
      showDownloadProgress={false}
      showFilledProgress={false}
      //   customIcons={{
      //     play: playButton,
      //   }}
      style={{
        textAlign: 'center',
        width: '4em',
        backgroundColor: 'none',
      }}
    />
  );
}
export default PlayMusic;
