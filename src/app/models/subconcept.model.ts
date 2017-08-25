



export class SubconceptModel {

    constructor(
        public module_id: number,
        public module_name: string,
        public module_type,
        parents: Array<any>,
        public description: string,
        public parent_id: string,
        public creation_approval: boolean,
        public deletion_approval: boolean,
        indian_time: string,
        public detailed? : string      
        
    ){}
} 
