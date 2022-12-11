import axios from "axios"

describe("/api/pizzaStreaks", () => {
    it("should return correct first pizza streak value", async () => {
        const response = await axios.get("http://localhost:9000/api/pizzaStreaks")
        // Filter out streaks with only 1 item
        const streaks = response?.data?.filter(streak => streak?.length > 1)
        // The 3rd item in the first streak should have a date of 2015-1-7
        expect(streaks[0][2]?.date).toEqual('2015-1-7')
        // The 3rd item in the first streak should have a pizzaCount of 3
        expect(streaks[0][2]?.pizzaCount).toEqual(3)
    })
})