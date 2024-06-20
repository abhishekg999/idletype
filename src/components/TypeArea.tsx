import "./TypeArea.css"
import { userWordIndex, word } from "../signals/WordSignal";
import { useEffect } from "preact/hooks";

/**
 * The keypressListener for the TypeArea. Since everything from the game
 * to menu navigation is handled via only keypresses, we move 
 * this out to the main app component.
 */
const keypressListener = (event: KeyboardEvent) => {
    // Propogate any "Special" key presses.
    const modifiers = ['Alt', 'AltGraph', 'Control', 'Fn', 'Meta', 'OS'];
    if (modifiers.map(mod => event.getModifierState(mod)).includes(true)) {
        return;
    }

    event.preventDefault();

    // This may only happen due to delay effect
    if (userWordIndex.value >= word.value.length) {
        return;
    }

    if (event.key === word.value[userWordIndex.value]) {
        // Correct next character pressed
        userWordIndex.value++;
    } else {
        // Otherwise reset index to start of current word
        userWordIndex.value = 0;
    }
};

export function TypeArea() {
    // Initialize keypress listener on the entire page
    useEffect(() => {
        window.addEventListener('keydown', keypressListener);
        return () => {
            window.removeEventListener('keydown', keypressListener);
        }
    });

    return (
        <div class="type-area" >
            <div class="type-input" id="type-input" >
                {word.value.split('').map((letter, index) => (
                    <input className="font-[Invasion] size-16 text-[44px] text-center text-white bg-transparent"
                        type="text"
                        id={`input-cell-${index}`}
                        maxlength={1}
                        pattern="[A-Za-z]"
                        placeholder={letter}
                        readonly
                        disabled
                        value={userWordIndex.value > index ? letter : ""}
                    />
                ))}
            </div>
        </div>
    )
}
