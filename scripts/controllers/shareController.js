import { getSessionInfo } from "./sessionController.js";
import { post } from "../requester.js";
import { showMessage } from "./messageController.js";
import { partials } from "../partials/partials.js";
import { categories } from './categories.js';

export function loadShare(ctx){
    getSessionInfo(ctx)
    this.loadPartials(partials).then(function () {
        this.partial('./templates/share/shareForm.hbs');
    });
}

export function createRecipe(ctx){
    let { meal, ingredients, prepMethod, description, foodImageURL, category } = ctx.params;

    ingredients = ingredients.split(', ');

    if (meal.length > 4 && ingredients.length > 2 && prepMethod.length > 10 && description.length > 10 && foodImageURL.includes('http') && categories[category] !== undefined) {
        const header = { meal, ingredients, prepMethod, description, foodImageURL, category, categoryImageURL: categories[category], likesCounter: 0}
        post('appdata', 'recipes', 'Kinvey', header)
            .then(x => {
                showMessage('success', 'Recipe shared successfully!');
                }
            )
            .catch(console.error)
    }
}