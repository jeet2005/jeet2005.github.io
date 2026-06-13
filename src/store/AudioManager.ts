import { Howl, Howler } from 'howler';
import { usePortfolioStore } from './usePortfolioStore';

class AudioManager {
  private hoverSound: Howl | null = null;
  private scrollSound: Howl | null = null;
  private ambientSound: Howl | null = null;
  private initialized = false;

  public init() {
    if (this.initialized) return;
    
    // Load sounds
    this.hoverSound = new Howl({
      src: ['/sounds/hover.wav'], // Expected to be a typewriter clack or soft tick
      volume: 0.2,
    });

    this.scrollSound = new Howl({
      src: ['/sounds/scrolling.wav'], // Expected to be a paper rustle
      volume: 0.3,
    });

    this.ambientSound = new Howl({
      src: ['/sounds/bg.mp3'], // Expected to be a low space/drone track
      volume: 0.5,
      loop: true,
    });
    
    // Set initial mute state
    Howler.mute(!usePortfolioStore.getState().soundEnabled);

    // Subscribe to changes in the store to toggle mute
    usePortfolioStore.subscribe((state) => {
      Howler.mute(!state.soundEnabled);
      if (state.soundEnabled && this.ambientSound && !this.ambientSound.playing()) {
        this.ambientSound.play();
      }
    });

    this.initialized = true;
  }

  public playHover() {
    if (this.hoverSound && this.hoverSound.state() === 'loaded') {
      this.hoverSound.play();
    }
  }

  public playScroll() {
    if (this.scrollSound && this.scrollSound.state() === 'loaded') {
      this.scrollSound.play();
    }
  }

  public startAmbient() {
    const isEnabled = usePortfolioStore.getState().soundEnabled;
    if (isEnabled && this.ambientSound && !this.ambientSound.playing()) {
      this.ambientSound.play();
    }
  }

  public stopAmbient() {
    if (this.ambientSound && this.ambientSound.playing()) {
      this.ambientSound.stop();
    }
  }
}

export const audioManager = new AudioManager();
