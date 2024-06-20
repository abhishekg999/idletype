/**
 * TypableElement component
 * 
 * This component is a reusable component that allows for managing a
 * readonly set of input values. This is used for any text on the page
 * that needs to be controlled via typing.
 */

import { useEffect, useState } from "preact/hooks";

type TypableElementProps = {
    /**
     * The string value of this element. The user will 
     * need to type this string to "complete" this element.
     */
    value: string;

    /**
     * Should the word index reset if the user mistypes the next
     * letteer?
     */
    resetOnFail?: boolean;

    /**
     * On any successful keypress, call this callback.
     */
    onInput?: (index: number, letter: string) => void;

    /**
     * Once all letters for this component are finished, call this.
     */
    onComplete?: () => void;
}

const defaultTypableElementProps: Required<TypableElementProps> = {
    value: "",
    resetOnFail: true,
    onInput: () => { },
    onComplete: () => { }
}

export function TypableElement(props: TypableElementProps) {
    const [index, setIndex] = useState(0);
    const { value, resetOnFail, onInput, onComplete } = { ...defaultTypableElementProps, ...props };

    const keypressListener = (event: KeyboardEvent) => {
        // Propogate any "Special" key presses.
        const modifiers = ['Alt', 'AltGraph', 'Control', 'Fn', 'Meta', 'OS'];
        if (modifiers.map(mod => event.getModifierState(mod)).includes(true)) {
            return;
        }

        event.preventDefault();

        if (index >= value.length) {
            return;
        }

        if (event.key === value[index]) {
            // Correct next character pressed
            onInput(index, event.key);
            setIndex(index + 1);
        } else {
            // If `reset_on_fail` reset index to start of current word
            if (resetOnFail) setIndex(0);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', keypressListener);
        return () => {
            window.removeEventListener('keydown', keypressListener);
        }
    }, [index]);

    useEffect(() => {
        if (index == value.length) {
            onComplete();
        }
    }, [index]);


    return (
        <div>
            <div>
                {value.split('').map((letter, i) => (
                    <input className="font-mono w-4 h-4 text-white bg-transparent"
                        type="text"
                        maxlength={1}
                        pattern="[A-Za-z]"
                        placeholder={letter}
                        readonly
                        disabled
                        value={index > i ? letter : ""}
                    />
                ))}
            </div>
        </div>
    )
}