export const sounds = {
  click: './assets/sounds/click.wav',
  clap: './assets/sounds/clap.wav',
  coin: './assets/sounds/coin.wav',
  explosion: './assets/sounds/explosion.wav',
  heartbeat: './assets/sounds/heart-beat.wav',
  tink: './assets/sounds/tink.wav',
  melodicClick:'./assets/sounds/melodic-click.wav'
}

export const playAudio = (audio) => {
  audio.currentTime = 0;
  audio.play();
}