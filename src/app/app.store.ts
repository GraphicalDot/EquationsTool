import { Selectedconcept, Selecteddomain } from './actions/ontology.actions';

import {DomainModel, ConceptModel} from "./models/ontology.models";
import { UserModel } from './models/user.model'

export interface ApplicationStore {
    domains: Array<DomainModel>;
    concepts: Array<ConceptModel>;
    subconcepts: Array<any>;
    nanoskills: Array<any>;
    Selectedconcept: ConceptModel;
    Selecteddomain: DomainModel;
    users: Array<UserModel>;
    user: UserModel;
} 