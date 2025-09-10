const express = require("express");
const axios = require("axios");
const { createClient } = require("redis");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

const client = createClient({ url: "redis://redis:6379" });
client.on("error", (err) => console.error("Redis error:", err));

async function init() {
  await client.connect();

  app.get("/joke", async (req, res) => {
    const cacheKey = "random_joke";

    // Check Redis
    const cached = await client.get(cacheKey);
    if (cached) {
      return res.json({ joke: cached, cached: true });
    }

    // Fetch new joke
    const { data } = await axios.get("https://official-joke-api.appspot.com/jokes/random");
    const joke = `${data.setup} - ${data.punchline}`;

    // Store in Redis (expire after 10s)
    await client.set(cacheKey, joke, { EX: 10 });

    res.json({ joke, cached: false });
  });

  app.listen(port, () => console.log(`Backend running on port ${port}`));
}
init();

