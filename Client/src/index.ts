import { initialize, onClickEvent, reDrawBlocks } from "./main";

initialize();
// document.domain = 'http://127.0.0.1:3000/';
document.getElementById("submit")!.onclick = function() {onClickEvent()};
let selection: HTMLSelectElement = document.getElementById("selectBox") as HTMLSelectElement;
selection!.onchange = function() {
    reDrawBlocks(parseInt(selection!.options[selection!.selectedIndex].value))};