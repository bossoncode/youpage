import Head from "next/head";
import Header from "../../components/user/Header";
import Tabs from "../../components/user/Tabs";

export async function getServerSideProps({ query }: any) {
  const { username } = query;
  const res = await fetch(`http://localhost:2004/user?username=${username}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

const User = ({ data }: any) => {
  const userData = data.data;
  return (
    <>
      {!userData ? (
        <>404</>
      ) : (
        <>
          <Head>
            <title>
              {userData?.displayName || "Phollio"} | {userData?.bio || ""} |
              Phollio
            </title>
          </Head>
          <div className="max-w-2xl mx-auto py-8">
            <Header displayName={userData.displayName} bio={userData.bio} />
            <Tabs projects={userData?.projects} links={userData?.links} />
          </div>
        </>
      )}
    </>
  );
};

export default User;
