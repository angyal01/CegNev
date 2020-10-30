export default class Hasznalat {
    private _nap: number;
    private _oraPerc: string;
    private _rendszam: string;
    private _id: number;
    private _km: number;
    private _ki_behajtas: boolean;
    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._nap = parseInt(m[0]);
        this._oraPerc = m[1];
        this._rendszam = m[2];
        this._id = parseInt(m[3]);
        this._km = parseInt(m[4]);
        if (parseInt(m[5]) == 0) {
            this._ki_behajtas = false;
        } else {
            this._ki_behajtas = true;
        }

    }
    public get Nap(): number {
        return this._nap;
    }
    public get OraPerc(): string {
        return this._oraPerc;
    }
    public get Rendszam(): string {
        return this._rendszam;
    }
    public get Id(): number {
        return this._id;
    } public get Km(): number {
        return this._km;
    }
    public get Ki_behajtas(): boolean {
        return this._ki_behajtas;
    }


}