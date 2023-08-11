import { ObjectId } from "mongodb";

export default class Event {
    constructor(
        public name: string, 
        public description: string, 
        public domain: string, 
        public start: string, 
        public end: string, 
        public venue: string, 
        public coordinator: string, 
        public status: string, 
        public registrationDeadline: string, 
        public club: string, 
        public participants: string[], 
        public creationDate: string, 
        public id?: ObjectId) {}
}
