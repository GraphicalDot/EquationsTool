export class DomainModel {

    constructor(
        public domain_id: number,
        public domain_name: string,
        public description: string,
        public concepts: Array<ConceptModel>,
        indian_time: string,
        public detailed? : string

    ){}

} 

export class ConceptModel {

    constructor(
        public concept_id: number,
        public parent_id: number, //domain id of parent of this concept
        public concept_name: string,
        public connections: Array<string>, //string of ids for domains
        public bloom_taxonomy: Array<string>,
        public required_domains: Array<string>, //string of ids for domains 
        public description: string,
        public difficulty_level: number,
        indian_time: string,
        public detailed? : string      
    ){}

} 


export class SubConceptModel {

    constructor(
        public sub_concept_id: number,
        public sub_concept_name: string,
        public description: string,
        public parent_id: string,
        indian_time: string,
        public detailed? : string      
    ){}
} 


export class NanoskillsModel {

    constructor(
        public nanoskill_id: number,
        public nanoskill_name: string,
        public description: string,
        public parent_id : string,
        indian_time: string,
        public detailed? : string      
    ){}
} 
