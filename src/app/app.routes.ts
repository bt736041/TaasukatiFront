import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        path: 'test-ai',
        loadComponent: () =>
            import('./components/ai/start-part-page/start-part-page.component').then((m) => m.StartPartPageComponent),
    },
    {
        path: 'open',
        loadComponent: () =>
            import('./components/ai/open-questions/open-questions.component').then((m) => m.OpenQuestionsComponent)
    },
    {
        path: 'closed',
        loadComponent: () =>
            import('./components/ai/closed-questions/closed-section/closed-section.component').then((m) => m.ClosedSectionComponent)
    },
    {
        path: 'category',
        loadComponent: () =>
            import('./components/ai/closed-questions/closed-category/closed-category.component').then((m) => m.ClosedCategoryComponent)
    },
    {
        path: 'end-page',
        loadComponent: () =>
            import('./components/ai/end-test-page/end-test-page.component').then((m) => m.EndTestPageComponent)
    },
    { path: 'read-only/:id', 
        loadComponent:()=>
            import('./components/ai/chat/read-only-chat/read-only-chat.component').then((m)=>m.ReadOnlyChatComponent)
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
        path: 'results/:testId',
        loadComponent: () =>
            import('./components/general/diagnosis-results/diagnosis-results.component').then((m) => m.DiagnosisResultsComponent),
    },
    {
        path: 'advisor',
        loadComponent: () =>
            import('./components/general/advisor/advisor.component').then((m) => m.AdvisorComponent),
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
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



