import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { Advisor } from '../../models/advisor'
import { Client } from '../../models/client'
import { Region } from '../../models/region'

export const AdvisorActions = createActionGroup({
    source: 'Advisor',
    events:{
        'Create Advisor':props<{advisor:Advisor}>(),
        'Create Advisor Success':props<{advisor:Advisor}>(),
        'Create Advisor Failure':props<{message: string}>(),
        'Clients Load':props<{id:number}>(),
        'Clients Load Success':props<{clients:Array<Client>}>(),
        'Clients Load Failure':props<{message: string}>(),
        'Create Client':props<{client:Client, test_type:string}>(),
        'Create Client Success':props<{client:Client}>(),
        'Create Client Failure':props<{message: string}>(),
        'Regions Load':emptyProps(),
        'Regions Load Success':props<{regions:Array<Region>}>(),
        'Regions Load Failure':props<{message: string}>(),
    }
})