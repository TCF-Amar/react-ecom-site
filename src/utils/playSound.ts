
import soundFile from "../assets/sound-effect-hd.mp3";

let aud: HTMLAudioElement | null = null;

export const play = () => {
    try {
        if (!aud) {
            aud = new Audio(soundFile)
            aud.currentTime = 0;
            aud.play();
        }
    } catch (error) {
        console.log(error);
        
    }
}