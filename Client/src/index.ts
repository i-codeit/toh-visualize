import { initialize, onClickEvent, reDrawBlocks } from "./main";

initialize();
registerEvents();

/**
 * Register UI events
 */
function registerEvents() {
    let selection: HTMLSelectElement = document.getElementById("selectBox") as HTMLSelectElement;

    document.getElementById("submit")!.onclick = function () { onClickEvent() };
    selection!.onchange = function () {
        reDrawBlocks(parseInt(selection!.options[selection!.selectedIndex].value))
    };
}