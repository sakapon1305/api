//const fetch = require("node-fetch");
const cors = require("cors");
const express = require("express");

const app = express();
const port = 3002;

app.use(cors());

// //getでリクエスト時に処理するコールバックを記述する
// app.get("/", function (req, res) {
//   return res.send("Hello");
// });

// //サーバーの設定
// const server = http.createServer(app);
// server.listen(3000);

app.get("/api/data", async (req, res) => {
  const url =
    "http://api.e-stat.go.jp/rest/2.0/app/json/getStatsData?appId=462faf8e9e5899e2545b383e37175fd67fb8c2b0&statsDataId=C0020050213000&cdCat01=%23A03503";
  try {
    const { default: fetch } = await import("node-fetch");
    const response = await fetch(url);
    console.log("Response:", response);
    if (!response.ok) {
      // APIがエラーを返した場合
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorText}`
      );
    }
    const data = await response.json();
    console.log("Response:", data);
    res.json(data);
  } catch (error) {
    console.error("Error Fetching Data:", error);
    res.status(500).json({ error: `Error Fetching Data: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
