import { Advisor } from "../../models/advisor";
import { Client } from "../../models/client";
import { Region } from "../../models/region";

export interface AdvisorState {
    advisor: Advisor
    clients: Array<Client>
    regions: Array<Region>
    lastCreatedClient: Client
    loading: boolean
   

}

export const initialState: AdvisorState = {
    advisor: {} as Advisor,
    clients: [],
    regions: [],
    lastCreatedClient: {} as Client,
    loading: false,


}