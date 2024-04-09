import { getGroups } from "./index";
import { showErrorDialog } from "./visual";

const NO_ISSUE_MESSAGE = "No issue was found in the input"

function validateGroup(input) {
    if(input === "") {
        throwError("Please enter group name!")
        return false;
    }
    let groups = getGroups();
    for(let i = 0; i < groups.length; i++) {
        if(input === groups[i]) {
            throwError("Group already exist!")
            return false;
        }
    }
    console.log(NO_ISSUE_MESSAGE + ", " + "Group")
    return true;
}
function validateText(input, inputName, min = 0, max = null) {
    if(input.length < min) {
        throwError(`the minimum input length is ${min}`, inputName)
        return false;
    }
    else if(max != null && input.length > max) {
        throwError(`the maximum input length is ${max}`, inputName)
        return false;
    }
    console.log(NO_ISSUE_MESSAGE + ", " + inputName)
    return true;
}

function throwError(message, inputName = "") {
    console.log(`${message}, "${inputName}"`);
    showErrorDialog(inputName, message)
}

export { validateGroup, validateText }