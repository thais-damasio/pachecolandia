import DirectionsEnum from '../../utils/enum/Directions.enum.js';
import PachequitoObj from "../Objects/Pachequito.js";

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