export interface ScheduledModel {
  date: Date;
  time: String;
  timezone: String;
}
export interface CommonFormData {
  addNote: String;
  attachmentName: String;
  createdBy: String;
  emailSignature: String;
  name: String;
  sendAttachment: String;
  sendToReporters: String;
  templateAmount: String;
  templateDescription: String;
  templateHeading: String;
  templateNo: String;
  templateRewardType: String;
  customText: string;
  customTextLink : string;
}
export interface PreviewFormData extends CommonFormData {
  email: String;
  attachmentText: String;
}
export interface SenderEmails {
  senderEmail: String;
}
export interface SendFormData extends CommonFormData {
  victimEmails: String[];
  senderCredentials: SenderEmails[];
  fileContent: String;
}
export interface ScehduleFormData extends SendFormData {
  scheduleDate: String;
  scheduleTimeZone: String;
  scheduleTime: String;
}
export interface CreateCampaignStatus {
  message: String;
  status: boolean;
}
