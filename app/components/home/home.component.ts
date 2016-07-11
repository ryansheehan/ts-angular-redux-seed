import {IComponentOptions} from 'angular';

class HomeController {
    now = new Date();
}

export class HomeComponent implements IComponentOptions {
    templateUrl = 'app/components/home/home.template.html';
    controllerAs = "vm";
    controller = HomeController;
}