// eslint-disable-next-line no-shadow
export enum OrderStatus {
  Staffing = 'STAFFING',
  Actioned = 'ACTIONED',
  Acknowledged = 'ACKNOWLEDGED',
  Published = 'PUBLISHED',
}

export interface FileAttachment {
  readonly name: string;
  readonly extension: string;
  readonly path: string;
  readonly src: string;
}

export interface Acknowledgement {
  readonly subscriberID: string;
  readonly organizationID: string;
  readonly timestamp: string;
}

export interface Action {
  readonly subscriberID: string;
  readonly organizationID: string;
  readonly timestamp: string;
}

export interface Frago {
  readonly _id: string;
  readonly file: FileAttachment
  readonly status: 'STAFFING' | 'PUBLISHED';
  readonly createdAt: Date;
  readonly createdBy: string;
  readonly publishedAt?: Date;
  readonly subscriberAcknowledgements: Acknowledgement[];
  readonly subscriberActions: Action[];
}

export interface Order {
  readonly id: string;
  readonly opord: FileAttachment;
  readonly status: 'STAFFING' | 'PUBLISHED';
  readonly createdBy: string;
  readonly createdAt: string;
  readonly subscriberAcknowledgements: Acknowledgement[];
  readonly subscriberActions: Action[];
  readonly attachments: FileAttachment[];
  readonly fragos: Frago[];
  readonly publishedBy?: string;
  readonly publishedAt?: string;
  readonly publishingOrganization?: string;
}

export interface MSALUser {
  readonly tenantId: string;
  readonly uniqueId: string;
  readonly name: string;
  readonly username: string;
}

export interface User {
  readonly id: string;
  readonly tenantId: string;
  readonly uniqueId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly organization: string;
  readonly rank: 'PV2' | 'PVT' | 'PFC' | 'SPC' | 'CPL' | 'SGT' | 'SSG' | 'SFC' | 'MSG' | '1SG' | 'SGM' | 'CSM' | 'W01' | 'CW2' | 'CW3' | 'CW4' | 'CW5' | '2LT' | '1LT' | 'CPT' | 'MAJ' | 'LTC' | 'COL' | 'BG' | 'MG' | 'LTG' | 'GEN' | 'GA';
  readonly role: ('PUBLISHER' | 'SUBSCRIBER')[];
}

export interface Organization {
  readonly id: string;
  readonly name: string;
  readonly subscribers: string[];
}
