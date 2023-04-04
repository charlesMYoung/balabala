import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Button, Card, Icon } from "../index";
import "twin.macro";
import Drawer from "rc-drawer";
import { useSession } from "next-auth/react";
import { SideMenu } from "./side_menu";
import { themeColors } from "~/utils";
import { useMediaQuery } from "~/hooks";

export interface TopAppBarProps {
  appTitle?: string;
  category?: any;
}

export const TopAppBar = ({ appTitle = "", category = {} }: TopAppBarProps) => {
  const [isShowSideBar, setShowSideBar] = useState<boolean>(false);
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const { data: session } = useSession();
  const [activeClass, setActiveClass] = useState("active");
  const { asPath, isReady, push, query } = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const menus = useMemo(() => {
    let staticMenu = [
      {
        title: "主页",
        path: "/",
        icon: "home-4",
      },
    ];
    if (session?.user) {
      staticMenu = [
        ...staticMenu,
        {
          title: "配置",
          path: "/manage/config",
          icon: "settings-2",
        },
        {
          title: "博客编辑",
          path: "/manage/post",
          icon: "edit-box",
        },
        {
          title: "日志",
          path: "/manage/log",
          icon: "file-4",
        },
      ];
    }

    return staticMenu;
  }, [session?.user]);

  useEffect(() => {
    if (isReady) {
      const activePathname = new URL(asPath, location.href).pathname;
      setActiveClass(decodeURI(activePathname));
    }
  }, [asPath, isReady]);

  const onClickHandle = () => {
    if (query.source) {
      onRequestClose();
    } else {
      setShowSideBar(true);
    }
  };

  const onRequestClose = () => {
    push(`post/${query.genreId}`);
  };

  const closeSlideBar = () => setShowSideBar(false);

  const targetHomePage = () => {
    push("/");
  };

  const openSearchDialog = () => {
    setSearchVisible(true);
  };

  const [debugSide, setDebugSide] = useState<boolean>(false);

  return (
    <div tw="flex fixed h-16  top-0 left-0 w-full box-border px-4 md:px-0 z-30 bg-surface backdrop-filter backdrop-blur backdrop-saturate-50">
      <div tw="container mx-auto flex h-full items-center justify-between">
        <Icon
          onClick={onClickHandle}
          name={query.source ? "arrow-left-s" : "menu"}
          tw="h-12 w-12 cursor-pointer fill-on-surface md:!hidden"
        ></Icon>
        <div
          tw="title-large ml-6 mr-6 w-full cursor-pointer text-center text-on-surface md:w-auto"
          onClick={targetHomePage}
        >
          {appTitle || "Blog"}
        </div>
        <div tw="title-medium hidden w-full text-on-surface md:block">
          <div tw="mr-8 flex justify-end space-x-2">
            {menus.map((menu) => (
              <Link href={`${menu.path}`} key={menu.title}>
                <Button
                  className="title-medium text-on-surface-variant"
                  type={
                    menu.path === "/" && activeClass === menu.path
                      ? "filled"
                      : menu.path + "/" === activeClass
                      ? "filled"
                      : "text"
                  }
                >
                  {menu.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <Icon
          onClick={openSearchDialog}
          name="search"
          type="line"
          tw="h-12 w-12 cursor-pointer fill-on-surface"
        ></Icon>
        <Icon
          onClick={() => {
            setDebugSide(true);
          }}
          name="bug"
          type="line"
          tw="h-12 w-12 cursor-pointer fill-on-surface"
        ></Icon>
      </div>
      {!isDesktop && (
        <SideMenu
          isVisible={isShowSideBar}
          onClose={closeSlideBar}
          appTitle={appTitle}
          menus={menus}
        ></SideMenu>
      )}

      <Drawer
        open={debugSide}
        onClose={() => {
          setDebugSide(false);
        }}
        autoFocus={true}
        prefixCls="drawer"
      >
        <div tw="title-small box-border py-4 space-y-3 leading-[3.5rem] text-on-surface-variant flex flex-col items-center">
          <Card tw="w-full">
            <div tw="display-small">colors</div>
            {Object.keys(themeColors()).map((item) => {
              const obj = themeColors() as Record<string, string>;
              return (
                <div
                  tw="text-center"
                  key={item}
                  style={{
                    backgroundColor: obj[item],
                  }}
                >
                  {item}
                </div>
              );
            })}
          </Card>
        </div>
      </Drawer>
    </div>
  );
};
