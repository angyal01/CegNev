import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from './Megoldas';

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->

        // res.write("Egyszerű Hello World!\n");

        // // Tetszőleges html teg-ek és attribútumok beépítése:
        // res.write("<span style='color: blue;'><i>Színes és dőlt Hello World!'</i></span>\n");

        // Próbáljuk számra konvertálni a "kor" paraméter (http://localhost:8080/?kor=16) értékét:
        // let korod: number = parseInt(params.kor as string);
        // if (isNaN(korod)) korod = 18;
        // res.write(`Kérem a korod: <input type='number' name='kor' value=${korod} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        // res.write(`Te ${korod} éves vagy!\n`);


        const megold: Megoldas = new Megoldas("autok.txt");
        res.write(`2. feladat<br/>${megold.utoljaraelvitt.nap}. nap rendszám: ${megold.utoljaraelvitt.rendszam}<br/>`)


        let bekertnap: number = parseInt(params.bekeresnap as string);
        if (isNaN(bekertnap)) bekertnap = 0;
        res.write(`3. feladat<br>Nap: <input type='number' name='bekeresnap' value=${bekertnap} style='max-width:100px;' onChange='this.form.submit();'><br>`);
        res.write(`Forgalom a(z) ${bekertnap}. napon:<br>${megold.Napforgalma(bekertnap)}`);
        res.write(`4. feladat<br>A hónap végén ${megold.kintmaradtakSzama} autót nem hoztak vissza.<br/>`)


        res.write(`5. feladat<br/>${megold.megtettkmek}`)
        //res.write(`6. feladat<br>Leghosszabb út: ${megold.legtobbKm.km}, személy: ${megold.legtobbKm.id}`);
        res.write(`6. feladat<br>Leghosszabb út: ${megold.legtobbKm.km} km, személy: ${megold.legtobbKm.id}<br>`);

        let bekertrendszam: string = params.bekeresrendszam as string;
        
        res.write(`7. feladat<br>Rendszám: <input type='text' name='bekeresrendszam' value=${bekertrendszam} style='max-width:100px;' onChange='this.form.submit();'><br>`);
        if (bekertrendszam != undefined) {
            fs.writeFileSync(bekertrendszam + '_menetlevel.txt', megold.menetlevel(bekertrendszam));
            res.write(`Menetlevél kész<br>`);
            res.write(megold.menetlevel(bekertrendszam));
        }
        
        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
