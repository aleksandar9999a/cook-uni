import { del, get, put } from "../requester.js";
import { showMessage } from "./messageController.js";
import { redirectAfterFiveSec } from "./redirect.js";

export function archive(ctx) {
    const { id } = ctx.params;
    del('appdata', `recipes/${id}`, 'Kinvey')
        .then(x => {
            showMessage('success', 'Successful archive.');
            redirectAfterFiveSec(ctx, '/');
        })
        .catch(console.error)
}

export function likes(ctx) {
    const { id } = ctx.params;
    get('appdata', `recipes/${id}`, 'Kinvey')
        .then(x => {
            x.likesCounter = x.likesCounter + 1;
            put('appdata', `recipes/${id}`, 'Kinvey', x)
                .then(x => {
                    showMessage('success', 'You successful like this recipe!')
                    redirectAfterFiveSec(ctx, '/');
                })
                .catch(console.error)
        })
        .catch(console.error)
}