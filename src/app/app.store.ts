import { Selectedconcept, Selecteddomain } from './home/side-bar/ontology/ontology.actions';

import {DomainModel, ConceptModel} from "./home/side-bar/ontology/ontology.models";

export interface ApplicationStore {
    domains: Array<DomainModel>;
    concepts: Array<ConceptModel>;
    subconcepts: Array<any>;
    nanoskills: Array<any>;
    Selectedconcept: ConceptModel;
    Selecteddomain: DomainModel;

} 