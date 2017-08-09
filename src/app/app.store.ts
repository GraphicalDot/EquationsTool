
import {DomainModel} from "./home/side-bar/ontology/ontology.models";

export interface ApplicationStore {
    domains: Array<DomainModel>;
    concepts: Array<any>;
    subconcepts: Array<any>;
    nanoskills: Array<any>;
} 