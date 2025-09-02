import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./home/home.component').then((m) => m.HomeComponent),

    },
    {
        path: 'try',
        loadComponent: () =>
            import('./trying/trying.component').then((m) => m.TryingComponent),
    },
    {
        path: 'consulting',
        loadComponent: () =>
            import('./home-consulting/home-consulting.component').then((m) => m.HomeConsultingComponent),
    
    },
    {
        path: 'startTest',
        loadComponent: () =>
            import('./home-consulting/start-the-test/start-the-test.component').then((m) => m.StartTheTestComponent),
            data: {hideButtons: true},

    },
    {
        path: 'test',
        loadComponent: () =>
            import('./simple/test/test.component').then((m) => m.TestComponent),
            data: {hideButtons: true},
        children: [
            {
                path: 'part-test',
                loadComponent: () =>
                    import('./simple/test/partTest/partTest.component').then((m) => m.PartTestComponent)

            },
            {
                path: 'introduction',
                loadComponent: () =>
                    import('./simple/test/intrudaction/intrudaction.component').then((m) => m.IntrudactionComponent)
            }]
    },
    {
        path:'results',
        loadComponent:()=>
        import('./simple/results/results.component').then((m) => m.ResultsComponent)
    },
    // {
    //     path: 'loginCounsellor',
    //     loadComponent: () =>
    //         import('./login-counsellor/login-counsellor.component').then((m) => m.LoginCounsellorComponent),
    // },
    {
        path: 'counsellor',
        loadComponent: () =>
        import('./counsellor/results-consultings/results-consultings.component').then((m) => m.ResultsConsultingsComponent),
        children:[
            // {  path: 'addConsulting',
            // loadComponent: () =>
            // import('./counsellor/add-consulting/add-consulting.component').then((m) => m.AddConsultingComponent)
            // },
            // {
            //       path: 'allResults',
            //     loadComponent: () =>
            //     import('./counsellor/results-consultings/results-consultings.component').then((m) => m.ResultsConsultingsComponent),  
            //     children:[
                   
                ]
            },
            {
                path: 'one-consulting-results',
                loadComponent: () =>
                    import('./simple/results/results.component').then((m) => m.ResultsComponent),
            },
        ]
  //  },
   


