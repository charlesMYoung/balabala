import { type NextPage } from "next";
import Head from "next/head";
import "twin.macro";
import { Layout } from "~/components";
import { Card } from "~/components/myd";
import Button from "~/components/myd/Button/Button";
import FabButton from "~/components/myd/FabButton/FabButton";
import IconButton from "~/components/myd/IconButton/IconButton";

const ViewCom: NextPage = () => {
  return (
    <>
      <Head>
        <title>view</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div tw="title-small">button tonal</div>
        <div tw="mt-52 container mx-auto px-4 flex space-x-1.5">
          <Button variant="elevated" disabled>
            elevated
          </Button>
          <Button variant="filled" disabled>
            filled
          </Button>
          <Button variant="outlined" disabled>
            outlined
          </Button>
          <Button variant="text" disabled>
            text
          </Button>
          <Button variant="tonal" disabled>
            tonal
          </Button>
        </div>
        <div tw="container mx-auto px-4 flex mt-8 space-x-1.5">
          <Button variant="elevated">elevated</Button>
          <Button variant="filled">filled</Button>
          <Button variant="outlined">outlined</Button>
          <Button variant="text">text</Button>
          <Button variant="tonal">tonal</Button>
        </div>

        <div tw="container mx-auto px-4 flex mt-8 space-x-1.5">
          <Button variant="elevated" icon="start">
            elevated
          </Button>
          <Button variant="filled" icon="start">
            filled
          </Button>
          <Button variant="outlined" icon="start">
            outlined
          </Button>
          <Button variant="text" icon="start">
            text
          </Button>
          <Button variant="tonal" icon="start">
            tonal
          </Button>
        </div>

        <div tw="container mx-auto px-4 mt-8">
          <div tw="title-small">button filled</div>
          <div tw="flex mt-4 space-x-1.5">
            <IconButton icon={"cancel"} disabled variant="filled"></IconButton>
            <IconButton icon={"cancel"} variant="filled"></IconButton>
            <IconButton
              icon={"cancel"}
              variant="filled"
              unSelected
            ></IconButton>
            <IconButton
              icon={"cancel"}
              disabled
              variant="filled"
              unSelected
            ></IconButton>
          </div>
        </div>
        <div tw="container mx-auto px-4 mt-8">
          <div tw="title-small">button tonal</div>
          <div tw="flex mt-4 space-x-1.5">
            <IconButton icon={"cancel"} disabled variant="tonal"></IconButton>
            <IconButton icon={"cancel"} variant="tonal"></IconButton>
            <IconButton icon={"cancel"} variant="tonal" unSelected></IconButton>
            <IconButton
              icon={"cancel"}
              disabled
              variant="tonal"
              unSelected
            ></IconButton>
          </div>
        </div>

        <div tw="container mx-auto px-4 mt-8">
          <div tw="title-small">button outlined</div>
          <div tw="flex mt-4 space-x-1.5">
            <IconButton
              icon={"cancel"}
              disabled
              variant="outlined"
            ></IconButton>
            <IconButton icon={"cancel"} variant="outlined"></IconButton>
            <IconButton
              icon={"cancel"}
              variant="outlined"
              unSelected
            ></IconButton>
            <IconButton
              icon={"cancel"}
              disabled
              variant="outlined"
              unSelected
            ></IconButton>
          </div>
        </div>

        <div tw="container mx-auto px-4 mt-8">
          <div tw="title-small">button default</div>
          <div tw="flex mt-4 space-x-1.5">
            <IconButton icon={"cancel"} disabled></IconButton>
            <IconButton icon={"star"}></IconButton>
            <IconButton icon={"cancel"} unSelected></IconButton>
            <IconButton icon={"cancel"} disabled unSelected></IconButton>
          </div>
        </div>
        <div tw="container mx-auto px-4 mt-8">
          <div tw="title-small">button default</div>
          <div tw="flex mt-4 space-x-1.5">
            <IconButton icon={"star"} size="sm"></IconButton>
            <IconButton icon={"star"}></IconButton>
            <IconButton icon={"star"} size="lg"></IconButton>
          </div>
        </div>
        <div tw="container mx-auto px-4 mt-8">
          <div tw="title-small">fab default</div>
          <div tw="flex mt-4 space-x-1.5">
            <FabButton icon={"star"}></FabButton>
            <FabButton icon={"star"} color="surface"></FabButton>
            <FabButton icon={"star"} color="secondary"></FabButton>
            <FabButton icon={"star"} color="tertiary"></FabButton>
          </div>

          <div tw="flex mt-4 space-x-1.5">
            <FabButton icon={"star"} size="sm"></FabButton>
            <FabButton icon={"star"} color="surface" size="sm"></FabButton>
            <FabButton icon={"star"} color="secondary" size="sm"></FabButton>
            <FabButton icon={"star"} color="tertiary" size="sm"></FabButton>
          </div>

          <div tw="flex mt-4 space-x-1.5">
            <FabButton icon={"star"} size="lg" elevation="lowered"></FabButton>
            <FabButton icon={"star"} color="surface" size="lg"></FabButton>
            <FabButton icon={"star"} color="secondary" size="lg"></FabButton>
            <FabButton icon={"star"} color="tertiary" size="lg"></FabButton>
          </div>
          <div tw="container mx-auto px-4 mt-8">
            <div tw="title-small">card</div>
            <div tw="flex mt-4 space-x-1.5">
              <Card>d sadaa</Card>
              <Card></Card>
              <Card></Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ViewCom;
