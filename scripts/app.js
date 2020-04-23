import { loadHome } from './controllers/homeController.js';
import { loadSignup, loadSignin, logout, createUser, login } from './controllers/loginController.js';
import { loadShare, createRecipe } from "./controllers/shareController.js";
import { loadDetails } from './controllers/detailsController.js';
import { loadEditForm, edit } from './controllers/editController.js';
import { archive, likes } from './controllers/likesArchiveController.js';

const app = Sammy('#rooter', function () {
    this.use('Handlebars', 'hbs');

    this.get('/', loadHome)
    this.get('/signup', loadSignup);
    this.get('/signin', loadSignin);
    this.get('/logout', logout);
    this.get('/share', loadShare);
    this.get('/details/:id', loadDetails);
    this.get('/archive/:id', archive);
    this.get('/edit/:id', loadEditForm);
    this.get('/likes/:id', likes);

    this.post('/signup', createUser);
    this.post('/signin', login);
    this.post('/share', createRecipe);

    this.put('/edit/:id', edit);
})

app.run();