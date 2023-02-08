import React from "react";
import DetailedCard from "../../components/DetailedCard";
import Layout from "../../components/Layout";

const MainPage = () => {
  return (
    <Layout nickName="smatviyuk" id={1}>
      <div>main page</div>
      <DetailedCard
        userName="smatviyuk"
        userId={1}
        imgUrl="https://upload.wikimedia.org/wikipedia/commons/a/a4/%D0%97%D0%B0%D0%BA%D0%B0%D1%82_%D0%9F%D0%B0%D0%B0%D0%BD%D0%B0%D1%8F%D1%80%D0%B2%D0%B8.jpg"
        likes={10}
        isLikedByYou={true}
        comments={[{ text: "asfdaw", nickName: "dawn" }, { text: "asfdaw", nickName: "dawn" }, { text: "asfdaw", nickName: "dawn" }, { text: "asfdaw", nickName: "dawn" }]}
      />
    </Layout>
  );
};

export default MainPage;
