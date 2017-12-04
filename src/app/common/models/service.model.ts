export interface IService {
    serviceId: string
    svcDateTime: string
    theme: string
    title: string
    notes: string
    organistConf: string
    songleaderConf: string
    pianistConf: string
    organistId: string
    songleaderId: string
    pianistId: string
    organist: string
    pianist: string
    songleader: string
    personunavailable: any
    serviceevent: any
}

export interface IPeople {
    personId: string
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
    eventId: any
    serviceId: any
    seqNum: any
    eventTypeId: any
    notes: any
    confirmed: any
    personId: any
    ensembleId: null,
    songId: any
    ensemble: any
    eventType: any
    person: any
    service: any
    song: any
}