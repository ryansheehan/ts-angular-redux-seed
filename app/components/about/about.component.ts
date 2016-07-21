class AboutController {
    description = "Fill in a some stuff.";
}

export class AboutComponent implements angular.IComponentOptions {
    templateUrl = "app/components/about/about.template.html";
    controller = AboutController;
    controllerAs = "vm";
}
