import {
    Menu,
    Item,
    Separator,
    Submenu,
    useContextMenu,
  } from "react-contexify";
  import { useEffect, useState } from "react";
  import { Image } from "../../schema/image";
  import { getImage } from "../../lib/image";
  import {
    IconBxDelete,
    IconBxsEdit,
    IconBxsFileJpg,
    IconDownload,
    IconPng,
    OpenInNewTab,
  } from "../../assets/Image";
  import { useNavigate } from "react-router-dom";
  import NotFound from "../../assets/NotFound.png";
  import { useSetRecoilState } from "recoil";
  import { deleteImageConfigState } from "../../state/image";
  import { Item as ItemPSG} from "react-photoswipe-gallery"
  
  export default function ImageCx({ image }: { image: Image }) {
    const [loading, setLoading] = useState<null | boolean>(true);
    const [imageUrl, setImageUrl] = useState<string>("");
    const { show } = useContextMenu({
      id: image.id,
    });
    useEffect(() => {
      getImage(image.id)
        .then((res) => {
          setImageUrl(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(null);
        });
    }, [image.id]);
  
    return (
      <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] overflow-hidden rounded-xl m-2 md:m-10 shadow-custom2">
        {loading ? (
          <div className="w-full h-full animate-pulse bg-gray-400" />
        ) : loading === null ? (
          <img
            src={NotFound}
            alt="Not Found"
            className="w-full h-full aspect-square object-cover"
             title="Image not found"
             onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <>
            <ItemPSG
            original={imageUrl}
            thumbnail={imageUrl}
            width="1024"
            height="768"
          >
            {({ ref, open }) => (
              <img
                ref={ref}
                onClick={open}
                src={imageUrl}
                alt="Image"
                className="w-full h-full aspect-square object-cover scale-110 hover:scale-100 transition-transform cursor-pointer"
                onContextMenu={(e) => {
                  show({
                    event: e,
                  });
                }}
              />
            )}
          </ItemPSG>
            <MenuCX id={image.id} imageUrl={imageUrl} />
          </>
        )}
      </div>
    );
  }
  
  function MenuCX({ id, imageUrl }: { id: string; imageUrl: string }) {
    const navigate = useNavigate();
    const setDeleteImageConfig = useSetRecoilState(deleteImageConfigState);
    function downlaodImage(type: "png" | "jpg") {
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = "image." + type;
      a.click();
    }
    return (
      <Menu
        id={id}
        className="text-base"
        animation={{ enter: "scale", exit: "fade" }}
      >
        <Item>Id: {id}</Item>
        <Separator />
        <Item
          onClick={() => {
            window.open(imageUrl, "_blank");
          }}
        >
          <OpenInNewTab /> &nbsp; Open in new tab
        </Item>
        <Item onClick={() => navigate("/dashboard/edit/" + id)}>
          <IconBxsEdit /> &nbsp; Edit
        </Item>
        <Item
        onClick={() => {
          setDeleteImageConfig({
            open: true,
            imageId: id,
            imageUrl: imageUrl,
          });
        }}
      >
        <IconBxDelete /> &nbsp; <p className="text-red-600">Delete</p>
      </Item>
        <Separator />
        <Submenu
          label={
            <>
              <IconDownload /> &nbsp; Download as
            </>
          }
        >
          <Item onClick={() => downlaodImage("png")}>
            <IconPng /> &nbsp; PNG
          </Item>
          <Item onClick={() => downlaodImage("jpg")}>
            <IconBxsFileJpg /> &nbsp; JPG
          </Item>
        </Submenu>
      </Menu>
    );
  }