"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    constructor(name, description, domain, start, end, venue, coordinator, status, registrationDeadline, club, participants, creationDate, id) {
        this.name = name;
        this.description = description;
        this.domain = domain;
        this.start = start;
        this.end = end;
        this.venue = venue;
        this.coordinator = coordinator;
        this.status = status;
        this.registrationDeadline = registrationDeadline;
        this.club = club;
        this.participants = participants;
        this.creationDate = creationDate;
        this.id = id;
    }
}
exports.default = Event;
//# sourceMappingURL=events.js.map