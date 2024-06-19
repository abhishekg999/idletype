import './app.css'
import { TypeArea } from './components/TypeArea';
import { meowCount } from './signals/WordSignal';

export function App() {
    return (
        <>
            <main>
                <TypeArea />

                <div class="upgrade-area" id="counter">
                    <span>You have meowed {meowCount} times.</span>
                </div>
            </main>
        </>
    )
}
