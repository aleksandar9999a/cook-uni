import { getSessionInfo } from "./sessionController.js";
import { partials } from "../partials/partials.js";
import { get } from "../requester.js";

export function loadHome(ctx) {
    getSessionInfo(ctx)
    partials['food'] = './templates/home/food.hbs';
    this.loadPartials(partials).then(function load() {
        if (sessionStorage.getItem('authtoken') !== null) {
            get('appdata', 'recipes', 'Kinvey')
                .then(x => {
                    if (x.length > 0 ) {
                        ctx.foundFood = true;
                        ctx.foods = x;
                    }else{
                        ctx.foundFood = false;
                    }
                    
                    this.partial('./templates/home/foodForm.hbs')
                })
            
        } else {
            this.partial('./templates/home/home.hbs');
        }
    });
}