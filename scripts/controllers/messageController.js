export function showMessage(type, message) {
    const types = {
        success: 'successBox',
        error: 'errorBox',
        load: 'loadingBox'
    }

    if (types[type] !== undefined) {
        const div = document.getElementById(types[type]);
        div.style.display = 'block';
        div.innerHTML = message;

        setTimeout(function () {
            div.style.display = 'none';
        }, 5000)
    }
}