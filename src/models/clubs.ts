import { ObjectId } from "mongodb";

export default class Club {
    constructor(
        public name: string,
        public description: string,
        public coordinator: string,
        public status: string,
        public events: string[],
        public email: string, 
        public members: string[],
        public creationDate: string,
        public id?: ObjectId) {}
}
