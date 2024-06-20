import './app.css'
import { TypableElement } from './components/TypableElement';
import { TypeArea } from './components/TypeArea';
import { score } from './signals/WordSignal';


export function App() {


    return (
        <>
            <header>
                <span><TypableElement value='Menu' /></span>
            </header>
            <main>
                <TypeArea />
                <div class="upgrade-area" id="counter">
                    <span>Letters: {score}</span>
                </div>
            </main>
        </>
    )
}
