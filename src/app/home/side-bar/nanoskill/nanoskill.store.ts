import {NanoskillModule } from './nanoskill.module';

import {NanoskillModel} from "./nanoskill.model"

export interface NanoskillStore {
    nanoskills: NanoskillModel[];
    selectednanoskill: NanoskillModel;


} 