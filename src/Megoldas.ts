import Hasznalat from './Hasznalat';
import fs from "fs";
import { strict } from 'assert';
import { kill } from 'process';

interface IlegtobbKm {
    km: number;
    id: number;
}
interface Imegtettkmek {
    rendszam: string;
    elsoKm: number;
    utolsoKm: number;
}
interface Iutoljaraelvitt {
    rendszam: string;
    nap: number;
}
export default class Megoldas {
    private _hasznalatadatok: Hasznalat[] = [];
    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                this._hasznalatadatok.push(new Hasznalat(aktSor));
            });
    }
    public get utoljaraelvitt(): Iutoljaraelvitt {
        for (let i = this._hasznalatadatok.length - 1; i >= 0; i--) {

            if (!this._hasznalatadatok[i].Ki_behajtas) {
                return { rendszam: this._hasznalatadatok[i].Rendszam, nap: this._hasznalatadatok[i].Nap };
            }
        }
        return { rendszam: "", nap: -1 };
    }
    public get Minden(): string {
        let ki = "";
        this._hasznalatadatok.forEach((i) => {
            ki += i.Nap + ";" + i.OraPerc + ";" + i.Rendszam + ";" + i.Id + ";" + i.Km + ";" + i.Ki_behajtas + "<br/>";
        })
        return ki;

    }
    public Napforgalma(nap: number): string {
        let ki = "";
        this._hasznalatadatok.forEach((item) => {
            if (item.Nap == nap) ki += item.OraPerc + " " + item.Rendszam + " " + item.Id + " " + (item.Ki_behajtas ? "be" : "ki") + "<br>";
        })
        return ki;
    }

    public get kintmaradtakSzama(): any {
        var maradt: number = 0;
        this._hasznalatadatok.forEach((item, index) => {
            if (!item.Ki_behajtas) {//false: ki; true: be
                maradt++;
            } else {
                maradt--;
            }
        })


        // var temp: string[] = new Array();

        // this._hasznalatadatok.forEach((item, index) => {
        //     if (!item.Ki_behajtas && !temp.includes(item.Rendszam)) {
        //         temp.push(item.Rendszam);
        //     } else if (item.Ki_behajtas && temp.includes(item.Rendszam)) {
        //         temp.splice(temp.indexOf(item.Rendszam), 1);
        //     }
        // })
        // let ki: string = "";
        // temp.forEach((item) => {
        //     ki += item + "\n";
        // })
        return maradt;
    }
    public get megtettkmek(): any {
        // let elsoKmek: number[];
        // let utolsoKmek: number[];

        //elsoKmek.fill(-1, 0);
        // this._hasznalatadatok.forEach((item) => {
        //     if (elsoKmek["asd"] == -1) elsoKmek[parseInt(item.Rendszam[6])] = item.Km;
        //     else utolsoKmek[parseInt(item.Rendszam[6])] = item.Km;
        // })

        let autokkmei: Imegtettkmek[] = new Array();

        this._hasznalatadatok.forEach((item) => {
            if (autokkmei.filter(x => x.rendszam == item.Rendszam).length == 0) autokkmei.push({ rendszam: item.Rendszam, elsoKm: item.Km, utolsoKm: -1 });
            else autokkmei.filter(x => x.rendszam == item.Rendszam)[0].utolsoKm = item.Km;
        })


        let ki: string = "";
        for (let i = 0; i < autokkmei.length - 1; i++) {
            ki += autokkmei[i].rendszam + " " + (autokkmei[i].utolsoKm - autokkmei[i].elsoKm) + " km\n";
        }

        return ki;
    }

    public get legtobbKm(): any {


        // var legnagyobbKm: number = 0;
        // var legnagyobbKmIdja: number = -1;
        // for (let i = 0; i < this._hasznalatadatok.length; i++) {
        //     for (let j = i + 1; j < this._hasznalatadatok.length; j++) {
        //         if (this._hasznalatadatok[j].Rendszam == this._hasznalatadatok[i].Rendszam) {
        //             if ((this._hasznalatadatok[j].Km - this._hasznalatadatok[i].Km) > legnagyobbKm) {
        //                 legnagyobbKm = (this._hasznalatadatok[j].Km - this._hasznalatadatok[i].Km);
        //                 legnagyobbKmIdja = this._hasznalatadatok[j].Id;
        //             }
        //             break;
        //         }
        //     }
        // }

        let legnagyobb: IlegtobbKm = { km: 0, id: -1 };
        // var legnagyobbKm: number = 0;
        // var legnagyobbKmIdja: number = -1;
        for (let i = 0; i < this._hasznalatadatok.length; i++) {
            for (let j = i + 1; j < this._hasznalatadatok.length; j++) {
                if (this._hasznalatadatok[j].Rendszam == this._hasznalatadatok[i].Rendszam) {
                    if ((this._hasznalatadatok[j].Km - this._hasznalatadatok[i].Km) > legnagyobb.km) {
                        legnagyobb.km = (this._hasznalatadatok[j].Km - this._hasznalatadatok[i].Km);
                        legnagyobb.id = this._hasznalatadatok[j].Id;
                    }
                    break;
                }
            }
        }
        return legnagyobb;
    }
    public menetlevel(rendszambe: string): any {
        var ki: string = "";
        this._hasznalatadatok.filter(x => x.Rendszam == rendszambe).forEach((item) => {
            if (!item.Ki_behajtas) ki += item.Id + "\t" + item.Nap + ". " + item.OraPerc + "\t" + item.Km + " km \t";
            else ki += item.Nap + ". " + item.OraPerc + "\t" + item.Km + " km\n";
        })
        // fs.write( + "_menetlevel.txt",megold.menetlevel
        return ki;
    }
}