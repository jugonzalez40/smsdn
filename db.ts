import "cross-fetch/polyfill";
// import eventsource from "eventsource";
import PocketBase from "pocketbase";
import { Logger } from "./logger";

const pb = new PocketBase(`http://127.0.0.1:${process.env.DB_PORT}`);

export type TMessage = {
  text: string;
  id: string;
};

type TMessageSent = {
  message_fk: string;
};

const getMessages = async (): Promise<TMessage[] | null> => {
  try {
    return pb.collection("message").getFullList<TMessage>();
  } catch (error) {
    Logger.error(error);
    return null;
  }
};

const addMessageSent = ({ id }: TMessage) => {
  pb.collection("message_sent").create<TMessageSent>({
    message_fk: id,
  });
};

const addMessagesBulk = (messages: string[]) => {
  pb.autoCancellation(false);

  messages.forEach(message => {
    pb.collection("message").create<TMessageSent>({
      text: message,
    });
  });
  
};

const getAuthCodeTwilio = async () => {
  try {
    const authTwilio = await pb.collection("auth_twilio").getFullList<{auth_code: string}>();
    const authCode = authTwilio[0]["auth_code"];
    return authCode;
  } catch (error) {
    Logger.error(error);
    return null;
  }
}

export { getMessages, addMessageSent, addMessagesBulk, getAuthCodeTwilio };
