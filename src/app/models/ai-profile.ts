export interface GraphDatum {
label: string;
value: number;
/** "type" | "skill" | "soft_skill" | string */
category: string;
}


export interface DominantTraits {
types: string[];
skills: string[];
soft_skills: string[];
}


export interface AiProfileResponse {
/** Raw table grouped by type; server returns a list of records */
types_table: Array<Record<string, any>>;
/** Formatted profile text coming from the AI formatter */
profile_text: string;
dominant_traits: DominantTraits;
graph_data: GraphDatum[];
incomplete: boolean; 
message?: string;
}