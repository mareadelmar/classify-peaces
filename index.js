import cohere from 'cohere-ai';
import ora from 'ora';
import { performance } from "perf_hooks";
import dotenv from "dotenv";

dotenv.config();
cohere.init(process.env.API_KEY);

const spinner = ora('Haciendo magia...').start();
spinner.color = 'yellow';
const start = performance.now();

const interval = setInterval(() => {
    const now = Math.floor(performance.now() - start, 1000);
    spinner.text = `${now}s de pura magia`
});

const response = await cohere.classify({
    model: 'large',
    inputs: ["La ilusión de que siempre hay algo más que saber o que buscar y no querer buscarlo ni preguntar para que no se agote, que no se apague el rescoldo; de eso se trata ser hija cuando tu madre está desaparecida.", "¿Venderle el alma al diablo? Sí, pero cara. Y si se puede, venderle también otras cosas. Y venderle a Dios lo que el diablo no compre."],
    examples: [{ "text": "No existe muerte natural: nada de lo que sucede al hombre es natural puesto que su sola presencia cuestiona al mundo. Todos los hombres son mortales: pero para todos la muerte es un accidente y, aunque la conozcan y la acepten, es una violencia indebida.", "label": "sad" }, { "text": "Estábamos solos, representando, exprimiendo, tratando de comprender una simple situación humana.", "label": "sad" }, { "text": "El lenguaje del amor no se habla, se inscribe.", "label": "happy" }, { "text": "Dame placer y te daré la vida, dinero o teoría, todas transacciones en las que nos jugamos el cuerpo", "label": "happy" }]
});
console.log(response.body.classifications)
spinner.succeed("Listou");
clearInterval(interval);

//const message = response.body.classifications ? response.body?.classifications[0]?.text : "nada";
let message = "";
if (response.body.classifications.length) {
    response.body.classifications.forEach(item => {
        message += `
        ---
        - "${item.input}": 
        - predicción: ${item.prediction}
        ---
        `
    })
    console.log(`Haz tu magia: ${message}`);
} else {
    console.log("nada")
}