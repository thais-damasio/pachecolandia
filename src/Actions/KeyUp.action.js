import PachequitoObj from "../Objects/Pachequito.js";


const evKeyUpR = new KeyboardEvent('keyup', { bubbles: true, key: "ArrowRight" });
const evKeyUpL = new KeyboardEvent('keyup', { bubbles: true, key: "ArrowLeft" });

document.getElementById("L").addEventListener('pointerup', () => { dispatchEvent(evKeyUpL); });
document.getElementById("L").addEventListener('pointerleave', () => { dispatchEvent(evKeyUpL); });
document.getElementById("R").addEventListener('pointerup', () => { dispatchEvent(evKeyUpR); });
document.getElementById("R").addEventListener('pointerleave', () => { dispatchEvent(evKeyUpR); });

/**
 * Registers the buttons' events (keydown) of the game
 * @param {PachequitoObj} pachequitoObj - Object which represents Pachequito
 * @return void
 */
function KeyUpAction(pachequitoObj) {
    window.addEventListener('keyup', function (ev) {
        if (ev.key === 'ArrowRight') {
            pachequitoObj.walk(false);
        }
        else if (ev.key === 'ArrowLeft') {
            pachequitoObj.walk(false);
        }
    });
}

export default KeyUpAction;