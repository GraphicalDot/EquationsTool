



export interface VariableModel{
    variable_name: string,
    variable_id: string,
    user_id: string,
    description: string,
    identifier: string,
    categories: CategoryModel[],
}



export interface CategoryModel{
    category_id: string;
    category_description: string,
    category_name: string,
    category_identifier: string,
    images: Images[],

} 

export interface Images{
    url: string, 
    image_name: string

}