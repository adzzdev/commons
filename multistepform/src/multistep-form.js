import $ from "jquery";

/**
* Binds HTML sections / divs to represent a Multistep form
* - Jquery Required
* - Bootstrap required ( 4.3.1 used )
**/
class MultiStepForm{
    /**
     * 
     * @param {Number} start 
     * @param {HTMLElement} nextButtonEl 
     * @param {HTMLElement} backButtonEl 
     * @param {Array<HTMLElement>} formSections 
     * @param {Array<Function>} formSectionsChecks 
     * @param {Array<HTMLElement>} progressBars 
     */
    constructor(start=0, nextButtonEl=null, backButtonEl=null, formSections=[], formSectionsChecks=[], progressBars=[]){
        this.formStep = start;
        this.nextButtonEl = nextButtonEl;
        this.backButtonEl = backButtonEl;
        this.formSections = formSections;
        this.formSectionsChecks = formSectionsChecks;
        this.progressBars = progressBars;

        this.incrementStep = this.incrementStep.bind(this);
        this.decrementStep = this.decrementStep.bind(this);
    }

    init(callback=()=>{}){
        if(this.nextButtonEl && this.backButtonEl && this.formSections.length > 0 && (this.formSections.length === this.progressBars.length)){
            //do ops here
            let currentStep = this.formStep;
            this.formSections.forEach(function(section, index){
                if(index != currentStep){
                    $(section).hide();
                } 
            });
            this.progressBars.forEach(function(bar, index){
                if(index == currentStep){
                    $(bar).addClass("ready");
                }
            });

            let incrementStep = this.incrementStep;
            $(this.nextButtonEl).on("click", function(e){
                e.preventDefault();
                incrementStep();
            });

            let decrementStep = this.decrementStep;
            $(this.backButtonEl).on("click", function(e){
                e.preventDefault();
                decrementStep();
            })
            callback(true);
        }else{
            console.error('MultiStepForm: There where problems intializing multistepform with the given parameters.');
            callback(false);
        }
        console.log("Multistep Form Initialized")
        
    }
    bindNext(selector){
        this.nextButtonEl = $(selector);
        return this;
    }
    bindBack(selector){
        this.backButtonEl = $(selector);
        return this;
    }
    //accepts list of Node ( not selector ) for Form Sections
    setFormSections(formSections){
        this.formSections = formSections;
        return this;
    }
    //accepts list of functions for corresponding ( same index ) Form Sections
    setFormSectionsChecks(formSectionsChecks){
        this.formSectionsChecks = formSectionsChecks;
        return this;
    }
    //accepts list of Node ( not selector ) for Progress Bar Indicator
    setProgressBars(progressBars){
        this.progressBars = progressBars;
        return this;
    }
    getFormStep(){
        return this.formStep;
    }
    incrementStep(){
        if(this.formSectionsChecks[this.formStep] instanceof Function){
            if(this.formSectionsChecks[this.formStep]()){
                if(this.formStep < this.formSections.length-1){
                    this.formStep +=1;
                    this.render(this.formStep);
                }else{
                    console.warn("MultiStepForm: End of the form");
                }
            }else{
                Toast.fire({
                    icon: 'error',
                    title: 'Try again.'
                  })
            }  
        }else{
            console.error("MultiStepForm: Something wrong with the step Checker.");
        }
    }
    decrementStep(){
        if(this.formStep > 0){
            this.formStep -=1;
            this.render(this.formStep);
        }else{
            console.warn("MultiStepForm: End of the form")
        }
    }
    render(currentStep){
        this.formSections.forEach(function(section, index){
            if(index != currentStep){
                $(section).hide();
            }else{
                $(section).show();
            }
        });
        this.progressBars.forEach(function(bar, index){
            if(index == currentStep){
                $(bar).addClass("ready");
            }else if(index < currentStep){
                $(bar).addClass("active done");
            }else if(index > currentStep){
                $(bar).removeClass("active done ready");
            }
        });
    }
}

const multistepform = new MultiStepForm();

export default multistepform;