import $ from "jquery"
import MultiStepForm from "./multistep-form";


const multistepform = new MultiStepForm();

function dummyCheck(){
    return true;
}
/**
 * Initialize Multistep Form ( index.html )
 */
 $(function(){
    multistepform
        .bindNext($(".next-button"))
        .bindBack($(".back-button"))
        .setFormSections([
            $("div[class*='form-section'][data-form-step='1']"),
            $("div[class*='form-section'][data-form-step='2']"),
            $("div[class*='form-section'][data-form-step='3']")
        ])
        .setFormSectionsChecks([
            dummyCheck,
            dummyCheck,
            dummyCheck
        ]
        )
        .setProgressBars([
            $("li[class*='cb-progressbar'][data-progress-step='1']"),
            $("li[class*='cb-progressbar'][data-progress-step='2']"),
            $("li[class*='cb-progressbar'][data-progress-step='3']")
        ])
        .init();
});