import {Directive} from '@angular/core';
import {NgControl} from "@angular/forms";


@Directive({
    selector: "[lowercase]",
    host: {
        "(input)": "onInputChange()"
    }
})
export class LowercaseDirective  {

    constructor( private ctrl: NgControl ) {}

    public onInputChange() {
        let newValue = this.ctrl.value.toUpperCase();
        this.ctrl.reset(newValue);
    }

}
