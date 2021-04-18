import PachequitoObj from "../Objects/Pachequito.js";


const evKeyUpR = new KeyboardEvent('keyup', { bubbles: false, key: "ArrowRight" });
const evKeyUpL = new KeyboardEvent('keyup', { bubbles: false, key: "ArrowLeft" });

document.getElementById("L").onmouseup = () => { dispatchEvent(evKeyUpL) };
document.getElementById("R").onmouseup = () => { dispatchEvent(evKeyUpR) };

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