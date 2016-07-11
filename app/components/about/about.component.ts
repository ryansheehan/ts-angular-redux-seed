import {IComponentOptions} from 'angular';

class AboutController {
    description = "Fill in a some stuff.";
}

export class AboutComponent implements IComponentOptions {
    templateUrl = "app/components/about/about.template.html";
    controller = AboutController;
    controllerAs = "vm";
}
