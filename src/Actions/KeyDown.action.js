import DirectionsEnum from '../../utils/enum/Directions.enum.js';
import PachequitoObj from "../Objects/Pachequito.js";

const evKeyDownR = new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight" });
const evKeyDownL = new KeyboardEvent('keydown', { bubbles: true, key: "ArrowLeft" });
const evKeyDownU = new KeyboardEvent('keydown', { bubbles: true, key: "ArrowUp" });


document.getElementById("L").addEventListener('pointerdown', () => { dispatchEvent(evKeyDownL) });
document.getElementById("R").addEventListener('pointerdown', () => { dispatchEvent(evKeyDownR) });
document.getElementById("U").addEventListener('pointerdown', () => { dispatchEvent(evKeyDownU) });


/**
 * Registers the buttons' events (keydown) of the game
 * @param {PachequitoObj} pachequitoObj - Object which represents Pachequito
 * @return void
 */
function KeyDownAction(pachequitoObj) {
    window.addEventListener('keydown', function (ev) {
        if (ev.key === 'ArrowRight') {
            pachequitoObj.walk(DirectionsEnum.right);
        }
        else if (ev.key === 'ArrowLeft') {
            pachequitoObj.walk(DirectionsEnum.left);
        }
        else if (ev.key === 'ArrowUp') {
            pachequitoObj.jump();
        }
    });
}

export default KeyDownAction;