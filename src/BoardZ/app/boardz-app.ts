// angular2 stuff
import {Component, provide} from 'angular2/core';
import {FormBuilder} from 'angular2/common';
import {Http, HTTP_PROVIDERS, RequestOptions} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';

// rx operators - ALL you can eat
import 'rxjs/Rx';

// services
import {ApplicationConfiguration, Configuration} from './app-config';
import {LoginService} from './services/login/loginService';
import {DashboardService} from './services/dashboard/dashboardService';
import {Logger, LogLevel} from './services/logging/logger';
import {AuthenticationRequestOptions} from './services/http/authenticationRequestOptions';
import {GamesService} from './services/games/gamesService';

// components
import {LoginForm} from './components/login/loginform';
import {Dashboard} from './components/dashboard/dashboard';
import {Sidebar} from './components/sidebar/sidebar';
import {Headerbar} from './components/headerbar/headerbar';
import {Games} from './components/games/games';

@Component({
    selector: 'boardz-app',
    providers: [
        // Angular stuff
        Http,
        HTTP_PROVIDERS,
        FormBuilder,

        // Special static config type
        [provide(Configuration, { useValue: new ApplicationConfiguration() })],

        // override default request options with ours that add additional headers
        [provide(RequestOptions, { useClass: AuthenticationRequestOptions })],

        // Our own stuff:
        LoginService,
        DashboardService,
        GamesService,
    ],
    directives: [
        // Angular stuff
        ROUTER_DIRECTIVES,

        // Our own stuff:
        Sidebar,
        Headerbar
    ],
    templateUrl: 'app/boardz-app.html'
})
@RouteConfig([
    { path: '/', component: Dashboard, name: 'Dashboard', useAsDefault: true, data: { displayName: 'Dashboard' }},
    { path: '/login', component: LoginForm, name: 'Login', data: { displayName: 'Login' }},
    { path: '/games/...', component: Games, name: 'Games', data: { displayName: 'Games' }} // prepare for nested routes
])
export class BoardzApp {

    constructor(logger: Logger) {
        // configure logger
        logger.maximumLogLevel = LogLevel.Verbose;
    }

}