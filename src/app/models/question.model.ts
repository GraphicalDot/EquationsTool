



export class QuestionModel {

    constructor(
        public module_id: number,
        public module_name: string,
        public module_type,
        public description: string,
        public question_text: string,
        public options: Array<any>,
        public parent_id: string,
        public creation_approval: boolean,
        public deletion_approval: boolean,
        indian_time: string,
        
    ){}
} 
