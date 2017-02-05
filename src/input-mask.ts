/**
 * Created by George Frick on 2/5/2017.
 */


export class InputMaskModel {

    private dividerCharacterSet: string[];
    private originalStringPattern: string;

    constructor(maskPattern: string) {
        this.originalStringPattern = maskPattern;
        this.dividerCharacterSet = this.extractDividers(maskPattern);
    }

    public get originalPattern() {
        return this.originalStringPattern;
    }

    public get dividerCharSet() {
        return this.dividerCharacterSet;
    }

    /**
     * Count the number of place holder values in the original pattern.
     * @returns {number}
     */
    public get placeHolderCount(): number {
        return (this.originalPattern.match(/\*/g) || []).length;
    }

    /**
     * Create an array representing all of the placeholder characters used
     * in the pattern. Currently this is anything not "$" and at least ["_"]
     * @param originalPattern
     * @returns {string[]}
     */
    public extractDividers(originalPattern: string): Array<string> {
        let dividers = originalPattern.replace(/\*/g, "").split("");
        //  dividers.push("_");
        return dividers;
    }

    /**
     * Is a given character a divider character?
     * @param character
     * @returns {boolean}
     */
    public isDivider(character: string): boolean {
        for (let dividerSetLoop = 0; dividerSetLoop < this.dividerCharSet.length; dividerSetLoop++) {
            if (character === this.dividerCharSet[dividerSetLoop]) {
                return true;
            }
        }
        return false;
    }

    /**
     * will turn X$$$X => X{0}{1}{2}X
     * @param patternString
     * @returns  X$$$X => X{0}{1}{2}X
     */
    public get maskedPattern(): string {
        let generatedPattern = this.originalPattern;
        for (let patternIndex = 0; patternIndex < this.placeHolderCount; patternIndex++) {
            generatedPattern = generatedPattern.replace(/\*/, "{" + patternIndex + "}");
        }
        return generatedPattern;
    }

    /**
     * Given a non-masked value; use the maskedPattern to create a masked value.
     * @param nonMaskedValue
     * @returns {string}
     */
    public maskValue(nonMaskedValue: string): string {
        let formattedString = this.maskedPattern;
        let replacement: string;
        let inputValue = nonMaskedValue || "";
        inputValue = this.unmaskValue(inputValue);
        for (let i = 0; i < this.placeHolderCount; i++) {
            replacement = inputValue.charAt(i) || "_";
            formattedString = formattedString.replace("{" + i + "}", replacement);
        }
        return formattedString;
    }

    /**
     * This is the current value when dividers are removed
     * @returns 9-5_1 => 951
     */
    public unmaskValue(inputValue: string): string {
        if (!inputValue) {
            return "";
        }
        let modelValue = inputValue;
        for (let dividerIndex = 0; dividerIndex < this.dividerCharSet.length; dividerIndex++) {
            while (modelValue.indexOf(this.dividerCharSet[dividerIndex]) > -1) {
                modelValue = modelValue.replace(this.dividerCharSet[dividerIndex], "");
            }
        }
        return modelValue.replace(/_/g, "");
    }

    /**
     * This is the current value when place holders are removed
     * @returns 9-5_ => 9-5
     */
    public realValue(inputValue: string): string {
        if (!inputValue || this.unmaskValue(inputValue) === "") {
            return "";
        } else {
            return inputValue.replace(/[*_]/g, "");
        }
    }

    public getNextCaretPosition(viewValue: string, currentCaretPosition: number): number {
        // Cursor can always be at 0.
        if (currentCaretPosition <= 0) {
            return 0;
        }
        // Cursor can't be positioned after a spacer.
        let firstSpacer = viewValue.indexOf("_");
        if (firstSpacer >= 0 && firstSpacer < currentCaretPosition) {
            return firstSpacer;
        }
        // Cursor
        while (this.isDivider(viewValue.charAt(currentCaretPosition))) {
            currentCaretPosition++;
        }
        return currentCaretPosition;
    }

}


