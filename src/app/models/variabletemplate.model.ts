
import {VariableModel} from "./variable.model"

export interface VariabletemplateModel{
    variables: VariableModel[], //This will be a list of variable with their categories filled.
    variabletemplate_name?: string,
    variabletemplate_id?: string,
    user_id?: string,
    description?: string,
}