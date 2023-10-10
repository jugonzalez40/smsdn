import express from "express";
import { Job } from "./job";
import { LoggerHttp, Logger } from "./logger";
import { sendSMS } from "./jobs/sendSMS";
import { addMessagesBulk } from "./db";

const smsJob = Job(sendSMS);

const app = express();
const port = 8085;

app.use(LoggerHttp);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/cronstatus", (req, res) => {
  const status = smsJob.getStatus();
  res.send(status);
});

app.get("/start", (req, res) => {
  smsJob.start();
  res.send("STARTED");
});

app.get("/stop", (req, res) => {
  smsJob.stop();
  res.send("STOPPED");
});

app.get("/bulk", (req, res) => {
  const xd = [
    "🚰❤️ Mi amor, en cada sorbo de agua que tomas, imagina que es un beso mío que te abraza. ¡Hidrátate, mi vida!",
    "🚰😍 Cada gota de agua que bebes me hace amarte aún más. Cuídate y mantente hidratada, mi dulce amor.",
    "🚰👸 El agua es la fuente de la vida, y tú eres la fuente de mi amor. No olvides beber tu agua, mi princesa.",
    "🚰🌟 Nuestro amor es como el agua, esencial para la vida. Bebe con amor, mi corazón.",
    "🚰👑 Cada vaso de agua que tomas es un recordatorio de lo importante que eres para mí. ¡Hidrátate, mi reina!",
    "🚰☀️ Amor, como el sol calienta el día, el agua refresca tu vida. Bebe con amor y cuida de ti siempre.",
    "🚰💖 Tal como el agua nutre la tierra, tu sonrisa nutre mi corazón. Bebe agua, amor mío, para mantenernos fuertes juntos.",
    "🚰😊 Cada sorbo de agua te acerca más a un día maravilloso junto a mí. Hidrátate y haz que nuestra historia de amor sea aún más hermosa.",
    "🚰💞 En cada gota de agua, siento la dulzura de tu amor. No olvides cuidarte y beber suficiente agua, mi amor.",
    "🚰🌹 Amor mío, beber agua es como abrazarme desde dentro. Hazlo con amor y siente mi amor en cada sorbo.",
    "🚰😘 Cada vaso de agua que tomas es un beso de amor que te envío. ¡Hidrátate, mi corazón!",
    "🚰💗 La sed de amor y la sed de agua van de la mano. Bebe con amor y recuerda que te amo profundamente.",
    "🚰✨ Mi amor por ti es como el agua, inagotable y esencial. Bebe agua con cariño, mi amor.",
    "🚰🌈 Cada gota de agua que bebes es un recordatorio de lo especial que eres para mí. Cuídate, mi reina.",
    "🚰💓 El agua es vida, y tú eres mi razón de vivir. Bebe con amor, mi amor eterno.",
    "🚰💫 Amor, tu belleza brilla aún más cuando estás hidratada. Bebe agua y sigue iluminando mi vida.",
    "🚰🌺 En cada sorbo de agua, encuentro la esencia de nuestro amor. Hidrátate, mi amor, y sigue nutriendo mi corazón.",
    "🚰💕 Cada gota de agua es como un abrazo invisible que te envío. ¡Cuídate, mi vida!",
    "🚰🌷 El agua es el elixir de la vida, y tú eres el elixir de mi amor. Bebe con cariño, mi princesa.",
    "🚰🌼 Mi amor, el agua es esencial para ti y para nosotros. Bebe con amor y sigue siendo la razón de mi sonrisa.",
    "🚰🌻 Cuando tomas agua, siento que nuestro amor fluye como un río eterno. ¡Hidrátate, mi amor!",
    "🚰💋 Amor mío, el agua es el ingrediente secreto de nuestro amor. Bebe con pasión y mantenlo siempre vivo.",
    "🚰🌞 Cada sorbo de agua es un recordatorio de lo refrescante que es amarte. ¡Hidrátate, mi sol radiante!",
    "🚰💏 Como el agua que fluye, nuestro amor nunca se detiene. Bebe con amor y siente nuestra conexión eterna.",
    "🚰🌠 Eres mi estrella brillante, y el agua es tu brillo interior. Bebe y sigue iluminando mi vida, mi amor.",
    "🚰🌆 En cada vaso de agua, veo un reflejo de nuestro amor. ¡Hidrátate y sigue brillando, mi ciudad encantadora!",
    "🚰💑 Nuestro amor es como un río constante, y el agua es su esencia. Bebe con amor y fluye conmigo, mi amor.",
    "🚰🌅 Como el sol sale cada día, mi amor por ti nunca se apaga. Bebe agua y mantén viva la llama de nuestro amor.",
    "🚰🚀 Amor mío, como el agua es esencial para la vida, tú eres esencial para mi felicidad. ¡Hidrátate y sé feliz, mi amor eterno!",
    "🚰🌻 Cada sorbo de agua es como un beso que te envío. ¡Hidrátate, mi amor!",
    "🚰🍀 Al igual que las flores necesitan agua para florecer, nuestro amor necesita cuidado. Bebe agua y cuidemos de nosotros, mi amor.",
    "🚰🌿 La vida es como un río constante, y tú eres mi corriente de felicidad. Bebe con amor y sigue fluyendo, mi amor.",
    "🚰🏞️ Cada gota de agua que tomas es como un regalo para nuestro amor. ¡Hidrátate, mi amor!",
    "🚰🎶 Como una melodía armoniosa, nuestro amor fluye como el agua. Bebe con amor y sigamos tocando nuestra canción, mi amor.",
    "🚰🌄 Al igual que el sol se pone cada noche, mi amor por ti nunca se apaga. Bebe agua y sueña conmigo, mi amor.",
    "🚰🏰 Eres mi castillo de amor, y el agua es su base sólida. Bebe y mantén nuestro amor fuerte como una fortaleza, mi amor.",
    "🚰🌊 Como las olas en el mar, nuestro amor es infinito. Bebe con amor y sigamos navegando juntos, mi amor.",
    "🚰🌈 Eres el arcoíris que ilumina mi vida, y el agua es la lluvia que nutre nuestro amor. Bebe con alegría, mi amor.",
    "🚰🌸 Como las flores necesitan agua para florecer, mi amor necesita cuidado para crecer. Bebe con cariño, mi amor.",
    "🚰🐦 Eres el canto de mi corazón, y el agua es su melodía. Bebe con amor y sigue llenando mi vida de alegría, mi amor."
  ];

  addMessagesBulk(xd);
  res.send("BULK");
});





app.listen(port, () => {
  Logger.info(`Listening on port ${port}...`);
});
