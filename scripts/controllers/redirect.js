export function redirectAfterFiveSec(ctx, page){
    setTimeout(function () {
        ctx.redirect(page);
    }, 5000)
}