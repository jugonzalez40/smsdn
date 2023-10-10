import twilio from "twilio";
import { TMessage, addMessageSent, getMessages } from "../db";
import { Logger } from "../logger";

// const accountSid = "AC30fcf75234816737f1d3cc70678dfe07";
// const authToken = "a6f3ba5bdd7277e4a09fc81bfd8a2dfc";
// const from = "+12294695809";
// const to = "+573197053513";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, TWILIO_TO } =
  process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const getRandomMessage = async (): Promise<TMessage | null> => {
  try {
    const messages = await getMessages();
    if(!messages?.length) return null;

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
    const message = await getRandomMessage();
    // return;
    if (!message) return;
    const smsMessage = await client.messages.create({
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
