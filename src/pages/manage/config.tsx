import { type NextPage } from "next";
import Head from "next/head";
import "twin.macro";
import { api } from "~/utils/api";
import { Button, Icon, Input, Layout, useSnackbar } from "~/components";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Social, type Config } from "@prisma/client";
import { ConfigSchema } from "~/utils/schema";

interface ConfigForm extends Config {
  socials: Pick<Social, "name" | "url">[];
}

const ConfigManager: NextPage = () => {
  const { open } = useSnackbar();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ConfigForm>({
    resolver: zodResolver(ConfigSchema),
  });

  const ConfigApi = api.config.upSert.useMutation({
    onSuccess: () => {
      open && open("保存成功");
      route.push("/");
    },
    onError: () => {
      open && open("保存失败");
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  const route = useRouter();

  const onSubmit: SubmitHandler<ConfigForm> = async (data) => {
    ConfigApi.mutate({
      blog_title: data.blog_title,
      blog_introduce: data.blog_introduce,
      slogan: data.slogan || "",
      socials: data.socials || [],
    });
  };

  console.log("errors=====", errors);
  return (
    <>
      <Head>
        <title>配置管理</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div tw="mt-52 container mx-auto px-4 md:w-96">
          <div tw="mb-4">
            <h1 tw="headline-large text-center text-on-surface ">
              配置你的博客
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              trailingIcon={<Icon name="title"></Icon>}
              label="标题"
              errors={errors}
              {...register("blog_title")}
            ></Input>
            <Input
              {...register("slogan")}
              label="标语"
              errors={errors}
              trailingIcon={<Icon name="auto_awesome"></Icon>}
            ></Input>
            <Input
              trailingIcon={<Icon name="description"></Icon>}
              {...register("blog_introduce")}
              label="描述"
              errors={errors}
            ></Input>
            {fields.map((item, index) => (
              <div key={item.id} tw="flex">
                <Input
                  {...register(`socials.${index}.name`)}
                  label="社交名称"
                  errors={errors}
                />
                <Input
                  {...register(`socials.${index}.url`)}
                  label="社交链接"
                  errors={errors}
                />
                <Button
                  icon={<Icon name="delete"></Icon>}
                  onClick={() => remove(index)}
                ></Button>
              </div>
            ))}
            <Button onClick={() => append({ name: "", url: "" })}>
              新增友联
            </Button>
            <div tw="flex flex-col md:flex-row justify-center space-y-2 md:(space-x-2 space-y-0)">
              <Button nativeType="submit" type="filled" tw="w-full">
                保存
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ConfigManager;