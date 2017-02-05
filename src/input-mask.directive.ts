/**
 * Created by George Frick on 2/5/2017.
 * input-mask="**-**-****" // ssn excample
 */

import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import {NgControl} from "@angular/forms";
import {InputMaskModel} from "./input-mask";

@Directive({
    selector: "[input-mask]"
})
export class InputMask {

    public modelValue: string;
    public viewValue: string;
    public inputMask: InputMaskModel;
    private _mask: string;

    constructor(public formControl: NgControl,
                public ele: ElementRef) {
        this.inputMask = null;
    }

    @Input("input-mask")
    set mask(value: string) {
        this._mask = value;
        if (this._mask) {
            this.inputMask = new InputMaskModel(this._mask);
        }
    }

    @HostListener("input")
    public onInputChange(): void {
        this.update();
    }

    @HostListener("click")
    public setInitialCaretPosition(): void {
        if (!this.inputMask) {
            return;
        }
        this.ele.nativeElement.selectionStart = 0;
        let value = this.formControl.value || "";
        this.ele.nativeElement.selectionEnd = value.length;
    }

    public update(): void {
        if (!this.inputMask) {
            return;
        }
        let caretPosition = this.ele.nativeElement.selectionStart;

        this.modelValue = this.inputMask.unmaskValue(this.formControl.value);
        this.viewValue = this.inputMask.maskValue(this.modelValue);
        this.formControl.viewToModelUpdate(this.inputMask.realValue(this.viewValue));
        this.formControl.valueAccessor.writeValue(this.inputMask.realValue(this.viewValue));

        caretPosition = this.inputMask.getNextCaretPosition(this.viewValue, caretPosition);
        this.ele.nativeElement.selectionStart = caretPosition;
        this.ele.nativeElement.selectionEnd = caretPosition;
    }
}

