import { getSessionInfo } from "./sessionController.js";
import { partials } from "../partials/partials.js";
import { get } from "../requester.js";

export function loadDetails(ctx){
    getSessionInfo(ctx)
    this.loadPartials(partials).then(function () {
        const { id } = ctx.params;
        get('appdata', `recipes/${id}`, 'Kinvey')
            .then(x => {
                let creator = x._acl.creator;
                ctx.ingredients = x.ingredients;
                ctx.id = x._id;
                ctx.meal = x.meal;
                ctx.prep = x.prepMethod;
                ctx.desc = x.description;
                ctx.img = x.foodImageURL;
                ctx.likesCounter = x.likesCounter;
                
                if (creator === sessionStorage.getItem('id')) {
                    ctx.isCreator = true;
                }else{
                    ctx.isCreator = false;
                }

                this.partial('../templates/recipeInfo/recipeInfo.hbs');
            })
            .catch(console.error)
    });
}