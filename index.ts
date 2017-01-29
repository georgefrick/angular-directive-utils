import {NgModule, ModuleWithProviders} from "@angular/core";
import { UppercaseDirective} from "./src/uppercase.directive";

export * from "./src/uppercase.directive";

@NgModule({
    declarations: [
        UppercaseDirective
    ],
    exports: [
        UppercaseDirective
    ]
})
export class DirectiveUtilModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DirectiveUtilModule
        };
    }
}
