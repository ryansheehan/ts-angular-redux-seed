import {IComponentOptions} from 'angular';

class HomeController {
    now = new Date();
}

export class HomeComponent implements IComponentOptions {
    static CID = 'tarHome';
    
    templateUrl = 'app/components/home/home.html';
    controllerAs = "vm";
    controller = HomeController;
}