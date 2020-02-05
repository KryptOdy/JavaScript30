class Key {
  constructor(keyValue) {
    this.keyValue = keyValue;
    this.audio = document.querySelector(`audio[data-key="${keyValue}"]`);
    this.key = document.querySelector(`div[data-key="${keyValue}"]`);
    this.addTransitionEventListener();
  }

  playAudio() {
    this.audio.currentTime = 0;
    this.audio.play();
    this.transition();
  }

  transition() {
    this.key.classList.add('playing');
  }

  addTransitionEventListener() {
    this.key.addEventListener('transitionend', this.removeTransition);
  }

  removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    console.log(e)
    e.target.classList.remove('playing');
  }
}

class DrumKit {
  constructor() {
    this.keyList = {};
    this.setupKeys();
    this.addWindowEventListener();
  }

  setupKeys() {
    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => this.addKey(key));
  }

  addKey(key) {
    let keyValue = key.dataset.key;
    this.keyList[keyValue] = new Key(keyValue);
  }

  addWindowEventListener() {
    window.addEventListener('keydown', this.pressKey.bind(this));
  }

  pressKey(e) {
    const keyPress = this.keyList[e.keyCode];
    if (keyPress) {
      keyPress.playAudio();
    }
  }
}

const drumKit = new DrumKit();
