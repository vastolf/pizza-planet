import axios from "axios"

describe("/api/pizzaDay", () => {
    it("returns the necessary data to determine the biggest pizza day of the month", async () => {
      const response = await axios.post("http://localhost:9000/api/pizzaDay", {year: 2015, month: 1})
      expect(response?.data['2015-1-7']).toHaveLength(3)
      expect(response?.data['2015-1-8']).toHaveLength(1)
    })
})