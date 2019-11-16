/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/block.ts":
/*!**********************!*\
  !*** ./src/block.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = __webpack_require__(/*! ./text */ "./src/text.ts");
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
class Block {
    constructor(ctx, id, position, color) {
        this.ctx = ctx;
        this.id = id;
        this.position = position;
        this.color = color;
        this.text = new text_1.Text(this.ctx, this.id, this.position, this.getRadiusY());
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.ellipse(this.position.x, this.position.y, this.getRadiusX(), this.getRadiusY(), 0, 0, Math.PI, true);
        this.ctx.fill();
        // Add text
        this.text.draw();
    }
    getRadiusX() {
        return constants_1.Constants.ELLIPSE_RADIUS_X - (this.id * constants_1.Constants.MAGIC_REDUCE_RATIO);
    }
    getRadiusY() {
        return this.getRadiusX() * constants_1.Constants.ELLIPSE_RADIUS_RATIO;
    }
}
exports.Block = Block;


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = {
    NUM_OF_TOWERS: 3,
    TOWER_LINEWIDTH: 10,
    TOWER_HEIGHT: 350,
    ELLIPSE_RADIUS_X: 80,
    ELLIPSE_RADIUS_RATIO: 0.6,
    MAGIC_REDUCE_RATIO: 4.5,
    MAGIC_TEXT_ALIGN: 4
};
var TowerId;
(function (TowerId) {
    TowerId[TowerId["A"] = 0] = "A";
    TowerId[TowerId["B"] = 1] = "B";
    TowerId[TowerId["C"] = 2] = "C";
})(TowerId = exports.TowerId || (exports.TowerId = {}));
;
var BlockColor;
(function (BlockColor) {
    BlockColor[BlockColor["Tomato"] = 0] = "Tomato";
    BlockColor[BlockColor["DodgerBlue"] = 1] = "DodgerBlue";
    BlockColor[BlockColor["Orange"] = 2] = "Orange";
    BlockColor[BlockColor["Gold"] = 3] = "Gold";
    BlockColor[BlockColor["Green"] = 4] = "Green";
    BlockColor[BlockColor["LightCoral"] = 5] = "LightCoral";
    BlockColor[BlockColor["DarkBlue"] = 6] = "DarkBlue";
    BlockColor[BlockColor["Plum"] = 7] = "Plum";
    BlockColor[BlockColor["Chocolate"] = 8] = "Chocolate";
    BlockColor[BlockColor["SlateBlue"] = 9] = "SlateBlue";
})(BlockColor = exports.BlockColor || (exports.BlockColor = {}));
;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __webpack_require__(/*! ./main */ "./src/main.ts");
main_1.initialize();


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const tower_1 = __webpack_require__(/*! ./tower */ "./src/tower.ts");
const block_1 = __webpack_require__(/*! ./block */ "./src/block.ts");
let towers = Array();
let blocks = Array();
// let uiObjs: Object;
function initialize() {
    let [canvas, ctx] = createContext();
    initializeObjects(canvas, ctx);
    draw();
}
exports.initialize = initialize;
function initializeObjects(canvas, ctx) {
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;
    // create the outer boundary
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'black';
    ctx.stroke();
    // initialize the towers
    initializeTowers(ctx, canvasWidth, canvasHeight);
    // initialize blocks
    initializeBlocks(ctx, canvasHeight);
}
exports.initializeObjects = initializeObjects;
function createContext() {
    let canvas = document.getElementById("toh");
    let ctx = canvas.getContext("2d");
    return [canvas, ctx];
}
function initializeTowers(ctx, canvasWidth, canvasHeight) {
    let leftWidth;
    let rigthWidth;
    let towerWidth = constants_1.Constants.TOWER_LINEWIDTH;
    let currentPos = { x: 0, y: 0 };
    leftWidth = rigthWidth = (canvasWidth / (constants_1.Constants.NUM_OF_TOWERS * 2)) - (towerWidth / 2);
    for (let index = 0; index < constants_1.Constants.NUM_OF_TOWERS; index++) {
        if (index === 0) {
            currentPos = { x: currentPos.x + leftWidth, y: canvasHeight };
        }
        else {
            currentPos = { x: currentPos.x + leftWidth + rigthWidth, y: canvasHeight };
        }
        let tower = new tower_1.Tower(ctx, constants_1.TowerId[index], currentPos);
        towers.push(tower);
    }
    // uiObjs = [towers];
}
function initializeBlocks(ctx, canvasHeight) {
    let numberOfBlocks = 10;
    let currentHeight = canvasHeight;
    for (let index = 0; index < numberOfBlocks; index++) {
        let block = new block_1.Block(ctx, index, { x: towers[0].getPosition().x, y: currentHeight }, constants_1.BlockColor[index]);
        blocks.push(block);
        currentHeight -= block.getRadiusY();
    }
    // uiObjs = [uiObjs, blocks];
}
function draw() {
    towers.forEach((tower) => {
        tower.draw();
    });
    blocks.forEach((block) => {
        block.draw();
    });
}


/***/ }),

/***/ "./src/text.ts":
/*!*********************!*\
  !*** ./src/text.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
class Text {
    constructor(ctx, textId, position, textHeight) {
        this.ctx = ctx;
        this.textId = textId;
        this.position = position;
        this.textHeight = textHeight;
    }
    draw() {
        let fontHeight = this.textHeight;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'alphabetic';
        this.ctx.fillStyle = 'white';
        this.ctx.font = `${fontHeight}px Arial`;
        this.ctx.fillText(`${this.textId + 1}`, this.position.x, this.position.y - constants_1.Constants.MAGIC_TEXT_ALIGN);
    }
}
exports.Text = Text;


/***/ }),

/***/ "./src/tower.ts":
/*!**********************!*\
  !*** ./src/tower.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
class Tower {
    constructor(ctx, id, position) {
        this.ctx = ctx;
        this.id = id;
        this.lineWidth = constants_1.Constants.TOWER_LINEWIDTH;
        this.towerHeight = constants_1.Constants.TOWER_HEIGHT;
        this.position = position;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.moveTo(this.position.x, this.position.y);
        this.ctx.lineTo(this.position.x, this.towerHeight);
        this.ctx.stroke();
    }
    getPosition() {
        return this.position;
    }
}
exports.Tower = Tower;


/***/ })

/******/ });
//# sourceMappingURL=windex.js.map