import { useEffect } from "preact/hooks"
import "./TypeArea.css"
import { userWordIndex, word } from "../signals/WordSignal";


/**
 * This function will be called every time a key is pressed.
 * When a key is pressed, check if the keycode matches 
 * the current character in the word. If it does, increment
 * the userWordIndex by 1.
 */
const keypressListener = (event: KeyboardEvent) => {
    event.preventDefault();

    // This may only happen due to delay effect
    if (userWordIndex.value >= word.value.length) {
        return;
    }

    if (event.key.toLowerCase() === word.value[userWordIndex.value].toLowerCase()) {
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
        window.addEventListener('keypress', keypressListener);
        return () => {
            window.removeEventListener('keypress', keypressListener);
        }
    });


    return (
        <div class="type-area" >
            <div class="type-input" id="type-input" >
                {word.value.split('').map((letter, index) => (
                    <input class="form-control form-control-solid"
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
