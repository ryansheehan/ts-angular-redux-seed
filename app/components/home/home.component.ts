class HomeController {
    now = new Date();
}

export class HomeComponent implements angular.IComponentOptions {
    templateUrl = 'app/components/home/home.template.html';
    controllerAs = "vm";
    controller = HomeController;
}