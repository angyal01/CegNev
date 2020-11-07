import Hasznalat from "../Hasznalat";
describe("Hasznalat osztály unit tesztjei:", () => {
    const tesztHasznalat = new Hasznalat("1 08:45 CEG306 501 23989 0");
    it("Jellemzők elenőrzése", async () => {
        expect(tesztHasznalat.Nap).toBe(1);
        expect(tesztHasznalat.OraPerc).toBe("08:45");
        expect(tesztHasznalat.Rendszam).toBe("CEG306");
        expect(tesztHasznalat.Id).toBe(501);
        expect(tesztHasznalat.Km).toBe(23989);
        expect(tesztHasznalat.Ki_behajtas).toBe(false);
    });
});