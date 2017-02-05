import {NgModule, ModuleWithProviders} from "@angular/core";
import {InputMask} from "./src/input-mask.directive";
import {LowercaseDirective} from "./src/lowercase.directive";
import {UppercaseDirective} from "./src/uppercase.directive";

export * from "./src/input-mask.directive";
export * from "./src/uppercase.directive";
export * from "./src/lowercase.directive";

@NgModule({
    declarations: [
        InputMask, LowercaseDirective, UppercaseDirective
    ],
    exports: [
        InputMask, LowercaseDirective, UppercaseDirective
    ]
})
export class DirectiveUtilModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DirectiveUtilModule
        };
    }
}
