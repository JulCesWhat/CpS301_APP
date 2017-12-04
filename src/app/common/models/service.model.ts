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