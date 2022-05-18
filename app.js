const express = require("express"); //설치 한 라이브러리 사용할거다
const app = express(); //express개체 생성

const fs = require("fs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs"); //레이러를  잘 해줌
// app.use("/public", express.static("public")); //나는 static파일을 보관하기 위해 public폴더를 쓸거다
app.use("/public", express.static(__dirname + "/public")); // 위는 상대경로라 public 경로를 못찾음 해당 코드와 같이 절대 경로로 작성 필요 !

app.listen(8080, function () {
  console.log("listening on 8080");
}); //8080포트에 서버 띄워주세요.-->http://localhost:8080/이라고 주소창에 쓰면 뜸

app.get("/pk", function (req, res) {
  // http://localhost:8080/pk 경로 접근시 parking.ejs 반환 (result 값과 함께)
  let result = new Array(65);

  const id = req.query.id;

  if (id) {
    //txt파일 읽어서 배열로 나타내기
    fs.readFile(
      "./only4output/only4output/output" + id + ".txt",
      "utf-8",
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        result = data.split(","); //,으로 나누어 읽기

        console.log(id);
        // parking.ejs result 값을 넣어서 불러오기
        res.render("parking.ejs", { result, id });
      }
    );
  } else {
    //txt파일 읽어서 배열로 나타내기
    fs.readFile(
      "./only4output/only4output/output1.txt",
      "utf-8",
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        result = data.split(","); //,으로 나누어 읽기

        // parking.ejs result 값을 넣어서 불러오기
        res.render("parking.ejs", { result, id: 1 });
      }
    );
  }
});
