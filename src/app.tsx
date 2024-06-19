import './app.css'
import { TypeArea } from './components/TypeArea';
import { score } from './signals/WordSignal';

export function App() {
    return (
        <>
            <main>
                <TypeArea />

                <div class="upgrade-area" id="counter">
                    <span>Words Typed: {score}</span>
                </div>
            </main>
        </>
    )
}
