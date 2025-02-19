import { StartFunc as StartFuncFuncToRun } from "./ButtonClickFunc.js";

let StartFunc = () => {
    const arrClass = document.querySelector("#RefreshBSTableClass");

    arrClass.addEventListener("click", StartFuncFuncToRun);
};

export { StartFunc };