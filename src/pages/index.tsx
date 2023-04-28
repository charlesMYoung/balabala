import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import "twin.macro";
import { api } from "~/utils/api";
import { Card, Chips, Layout } from "~/components";
import Image from "next/image";
import { env } from "~/env.mjs";

const Home: NextPage<{ coverUrl: string }> = ({ coverUrl }) => {
  const config = api.config.get.useQuery();
  const posts = api.post.post20Latest.useQuery();

  return (
    <>
      <Head>
        <title>{config.data?.blog_title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {config.data ? (
          <div
            tw="h-80 md:h-96 lg:h-[34rem]
            relative mt-16 box-border px-4 md:(px-0) container mx-auto"
          >
            <Image
              fill
              src={coverUrl || ""}
              alt="Post picture"
              tw="[object-fit: cover] rounded-3xl overflow-hidden !static"
            ></Image>
            <div
              tw="absolute top-0 z-10 right-0 flex h-full w-full
             flex-col items-center justify-center"
            >
              <h1 tw="display-small text-inverse-primary md:display-large">
                {config.data.blog_title}
              </h1>
              <h4 tw="title-large mt-2 text-inverse-primary md:headline-medium">
                {config.data?.slogan}
              </h4>
            </div>
          </div>
        ) : (
          []
        )}
        <main tw="container mx-auto items-stretch mt-8 px-4 md:(px-0)">
          {Array.isArray(posts.data) && posts.data.length > 0 ? (
            <div tw="display-small md:display-medium lg:display-large text-on-surface px-4">
              最新博客
            </div>
          ) : (
            <div tw="headline-small text-on-surface w-full text-center">
              没有数据
            </div>
          )}
          <div tw="grid grid-cols-1 md:(grid-cols-2) gap-2 xl:(grid-cols-3 gap-4) 2xl:(grid-cols-4 gap-4)">
            {Array.isArray(posts.data)
              ? posts.data.map((post) => {
                  return (
                    <Link
                      passHref
                      legacyBehavior
                      href={`/post/${post.id}`}
                      key={post.id}
                    >
                      <a tw="z-10 m-4 flex shrink cursor-pointer flex-col overflow-hidden w-auto basis-80 pb-5">
                        <Card key={post.id}>
                          <div title={post.title}>
                            <div tw="overflow-hidden rounded-xl h-48 w-full bg-no-repeat relative">
                              {post?.cover && (
                                <Image
                                  fill
                                  src={post?.cover.url || ""}
                                  alt="Post picture"
                                  tw="[object-fit: cover]"
                                ></Image>
                              )}
                            </div>
                            <div tw="box-border flex flex-col justify-center px-6">
                              <h1 tw="text-on-surface mt-5 display-small">
                                {post.title}
                              </h1>
                              <h2 tw="title-medium text-secondary md:mt-2">
                                {post.introduce}
                              </h2>
                              <div tw="md:mt-2">
                                {["tag1", "tah2"].map((tag) => {
                                  return (
                                    <Chips
                                      onClick={(event) => {
                                        event.stopPropagation();
                                      }}
                                      tw="z-10 m-1"
                                      icon="tag"
                                      key={tag}
                                      type="suggestion"
                                    >
                                      {tag}
                                    </Chips>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </a>
                    </Link>
                  );
                })
              : []}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  //set fetch timeout 5000s
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 2000);
  let imageUrl = "";
  try {
    imageUrl = await fetch(env.UNSPLASH_RANDOM_IMAGE_API, {
      signal: controller.signal,
    }).then((res) => res.url);
  } catch (error) {
    imageUrl = "";
  } finally {
    clearTimeout(timeout);
  }

  return {
    props: {
      coverUrl: imageUrl,
    },
  };
}
