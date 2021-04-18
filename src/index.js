import '../assets/style/style.css';
import Game from './Game.js';

const canvas = document.querySelector("canvas");

const GamePacheco = new Game(canvas);

GamePacheco.start();