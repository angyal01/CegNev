import Megoldas from "../Megoldas";
describe("Megoldas osztály unit tesztjei:", () => {
    const tesztMegoldas = new Megoldas("autok_teszt.txt");
    // 1 08:45 CEG306 501 23989 0
    // 1 09:04 CEG304 583 8477 0
    // 1 11:37 CEG302 500 25385 0
    // 1 12:02 CEG308 586 26496 0
    // 1 12:23 CEG307 514 26508 0
    // 1 14:42 CEG309 518 12734 0
    // 1 15:39 CEG303 573 4289 0
    // 1 16:09 CEG308 586 26738 1
    // 1 16:41 CEG306 501 24287 1
    // 2 17:03 CEG306 523 24287 0
    it("Utoljára elvitt ellenőrzése", async () => {
        expect(tesztMegoldas.utoljaraelvitt).toStrictEqual({ rendszam: "CEG306", nap: 2 });
    });
    it("Bekért nap forgalmának ellenőrzése", async () => {
        expect(tesztMegoldas.Napforgalma(1)).toBe(
            "08:45 CEG306 501 ki<br>" +
            "09:04 CEG304 583 ki<br>" +
            "11:37 CEG302 500 ki<br>" +
            "12:02 CEG308 586 ki<br>" +
            "12:23 CEG307 514 ki<br>" +
            "14:42 CEG309 518 ki<br>" +
            "15:39 CEG303 573 ki<br>" +
            "16:09 CEG308 586 be<br>" +
            "16:41 CEG306 501 be<br>");
    });
    it("Kimaradtak számának ellenőrzése", async () => {
        expect(tesztMegoldas.kintmaradtakSzama).toBe(6);
    });
    it("Statisztika ellenőrzése", async () => {
        expect(tesztMegoldas.megtettkmek).toBe(
            "CEG306 298 km\n" +
            "CEG304 0 km\n" +
            "CEG302 0 km\n" +
            "CEG308 242 km\n" +
            "CEG307 0 km\n" +
            "CEG309 0 km\n" +
            "CEG303 0 km\n");
    });
    it("Legnagyobb km ellenorzése", async () => {
        expect(tesztMegoldas.legtobbKm).toStrictEqual({ km: 298, id: 501 });
    })
    it("Menetlevél ellenőrzése", async () => {
        expect(tesztMegoldas.menetlevel("CEG308")).toBe("586\t1. 12:02\t26496 km\t1. 16:09\t26738 km\n");
    });
})