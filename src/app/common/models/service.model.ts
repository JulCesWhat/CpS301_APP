export interface IService {
    serviceId: number
    svcDateTime: string
    theme: string
    title: string
    notes: string
    organistConf: string
    songleaderConf: string
    pianistConf: string
    organistId: string
    songleaderId: number
    pianistId: string
    organist: string
    pianist: string
    songleader: string
    personunavailable: any
    serviceevent: any
}

export interface IPeople {
    personId: number
    firstName: string
    lastName: string
    email: string
    ensembleperson: any
    personunavailable: any
    serviceOrganist: any
    servicePianist: any
    serviceSongleader: any
    serviceevent: any
}

export interface IServiceEvent {
    eventId: number
    serviceId: number
    seqNum: string
    eventTypeId: number
    notes: string
    confirmed: string
    personId: number
    ensembleId: number
    songId: number
    ensemble: any
    eventType: any
    person: any
    service: any
    song: any
}

export interface ISong {
    songId: number
    songType: string
    title: string
    hymnbookNum: string
    arranger: string
    serviceevent: any
}

export interface IEventType {
    eventTypeId: number
    description: any
    serviceevent: any
}


export interface ScheduleEvent {
    eventId: number
    songName: string
    personName: string
    eventName: string
}