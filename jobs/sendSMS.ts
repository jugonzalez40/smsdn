import twilio, { Twilio } from "twilio";
import { TMessage, addMessageSent, getAuthCodeTwilio, getMessages } from "../db";
import { Logger } from "../logger";

const { TWILIO_ACCOUNT_SID, TWILIO_FROM, TWILIO_TO } =
  process.env;

let client: null | Twilio = null; 

const getClient = async () => {
  const authToken = await getAuthCodeTwilio();
  if(!authToken) {
    Logger.error('No auth token');
    return;
  }

  Logger.info("Twilio credentials");
  Logger.info(TWILIO_ACCOUNT_SID);
  Logger.info(authToken);

  client = twilio(TWILIO_ACCOUNT_SID, authToken);
}

const getRandomMessage = async (): Promise<TMessage | null> => {
  try {
    
    const messages = await getMessages();
    if(!messages?.length) {
      Logger.error('No auth messages list');
      return null;
    }

    const randomIndex = Math.ceil(Math.random() * (messages.length - 1));
    const randomMessage = messages[randomIndex];
    Logger.info(`The choosed message was ${randomMessage.text}`);

    return randomMessage;
  } catch (error) {
    Logger.error("sendSMS");
    Logger.error(error);
    return null;
  }
};

const sendSMS = async () => {
  try {
    if(!client) {
      await getClient();
    }
    const message = await getRandomMessage();
    // return;
    if (!message) return;
    const smsMessage = await (client as Twilio).messages.create({
      body: message?.text,
      from: TWILIO_FROM,
      to: TWILIO_TO as string,
    });

    Logger.info(`TWILIO STATUS CODE => ${smsMessage.status}`);
    addMessageSent(message);

  } catch (error) {
    Logger.error('Error sending message');
    Logger.error(error);
  }
};

export { sendSMS };
