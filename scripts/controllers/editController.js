import { getSessionInfo } from "./sessionController.js";
import { get, put } from "../requester.js";
import { partials } from "../partials/partials.js";
import { showMessage } from "./messageController.js";
import { redirectAfterFiveSec } from "./redirect.js";
import { categories } from './categories.js';

export function loadEditForm(ctx){
    getSessionInfo(ctx)
    this.loadPartials(partials).then(function () {
        let { id } = ctx.params;
        ctx.id = id;
        
        get('appdata', `recipes/${id}`, 'Kinvey')
            .then(x => {
                ctx.meal = x.meal;
                ctx.ingredients = x.ingredients.join(', ');
                ctx.prepMethod = x.prepMethod;
                ctx.description = x.description;
                ctx.foodImageURL = x.foodImageURL;
                this.partial('../templates/edit/editForm.hbs');
            })
            .catch(console.error)
    });
}

export function edit(ctx){
    let { meal, ingredients, prepMethod, description, foodImageURL, category, id } = ctx.params;
    
    ingredients = ingredients.split(', ');

    if (meal.length > 4 && ingredients.length > 2 && prepMethod.length > 10 && description.length > 10 && foodImageURL.includes('http') && categories[category] !== undefined) {
        const header = { meal, ingredients, prepMethod, description, foodImageURL, category, categoryImageURL: categories[category]}
        put('appdata', `recipes/${id}`, 'Kinvey', header)
            .then(x => {
                showMessage('success', 'Recipe is successful edited!');
                redirectAfterFiveSec(ctx, '/');
                }
            )
            .catch(console.error)
    }
}