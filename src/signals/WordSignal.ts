import { computed, effect, signal } from "@preact/signals";
import { randomWord } from "../lib/words.ts";
/**
 * The current target word.
 * At anytime, there will be at most one target word.
 * This word will always be displayed in the TypeArea at all times.
 */
export const word = signal<string>(randomWord());

/**
 * The length of the current target word.
 * This will always be > 0.
 */
export const wordLength = computed(() => word.value.length);

/**
 * The index of the current target word that the user is on.
 * For example, if userWordIndex == 0, then the user needs to type
 * word[0] to proceed with the next character.
 * 
 * When the user types the correct character, userWordIndex will increment by 1.
 */
export const userWordIndex = signal(0);

/**
 * The overall running score. This will be incremented by 1 every time the user
 * types the word.
 */
export const score = signal(0);


/**
 * This effect will reset the userWordIndex to 0 when the user has typed the entire word.
 */
effect(() => {
    if (userWordIndex.value >= wordLength.value) {
        setTimeout(() => {
            userWordIndex.value = 0;
            word.value = randomWord();
            score.value++;
        }, 100);
    }
});

