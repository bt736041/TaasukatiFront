import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/general/home/home.component').then((m) => m.HomeComponent),

    },
    {
        path: 'try',
        loadComponent: () =>
            import('./trying/trying.component').then((m) => m.TryingComponent),
    },
    {
        path: 'client',
        loadComponent: () =>
            import('./components/general/home-client/home-client.component').then((m) => m.HomeClientComponent),

    },
    {
        path: 'startTest',
        loadComponent: () =>
            import('./components/general/home-client/start-the-test/start-the-test.component').then((m) => m.StartTheTestComponent),
        data: { hideButtons: true },

    },
    {
        path: 'test',
        loadComponent: () =>
            import('./components/simple/test/test.component').then((m) => m.TestComponent),
        data: { hideButtons: true },
        children: [
            {
                path: 'part-test',
                loadComponent: () =>
                    import('./components/simple/test/partTest/partTest.component').then((m) => m.PartTestComponent)

            },
            {
                path: 'introduction',
                loadComponent: () =>
                    import('./components/simple/test/intrudaction/intrudaction.component').then((m) => m.IntrudactionComponent)
            }]
    },
    {
        path: 'results',
        loadComponent: () =>
            import('./components/simple/results/results.component').then((m) => m.ResultsComponent)
    },
    // {
    //     path: 'loginAdvisor',
    //     loadComponent: () =>
    //         import('./login-advisor/login-advisor.component').then((m) => m.LoginAdvisorComponent),
    // },
    {
        path: 'advisor',
        loadComponent: () =>
            import('./components/general/advisor/results-clients/results-clients.component').then((m) => m.ResultsClientsComponent),
    },
    {
        path: 'one-client-results',
        loadComponent: () =>
            import('./components/simple/results/results.component').then((m) => m.ResultsComponent),
    },
    {
        path: 'reset-password',
        loadComponent: () =>
            import('./components/general/login/reset-password/reset-password.component').then((m) => m.ResetPasswordComponent)
    }
]
//  },



