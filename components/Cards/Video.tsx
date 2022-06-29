/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import { Reflink } from "../../constants";
import DateTime from "date-and-time";
import PlaySVG from "../../assets/img/play.svg";
import { FaUser } from "react-icons/fa";
import convert from "convert-units";
import nsfwWarning from "../../assets/img/nsfw.png";
import IpfsLogo from "../../assets/img/ipfs-logo-vector-ice.svg";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { VideoService } from "../../services/video.service";

export function Video(props: any) {
  const video_info = useMemo(() => {
    return props;
  }, []);

  const reflink = useMemo(() => {
    return Reflink.parse(props.reflink);
  }, [props.reflink]);

  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    const load = async () => {
      let thumbnail: string;
      if (props.isNsfw === true) {
        thumbnail = nsfwWarning.toString();
      } else {
        const [, author, permlink] = props.reflink.split(":");
        thumbnail = (
          await VideoService.getNewThumbnailURL(author, permlink)
        ).toString();
      }

      setThumbnailUrl(thumbnail);
    };

    void load();
  }, []);

  return (
    <div className=" col-lg-3 col-md-4 col-xl-2 col-xxl-2     col-6 p-2 mb-3 marg_bot1 videowidget-padding">
      <div className="teaser_holder text-center">
        <div className="card-label card-label-views">
          <img className="play_i" src={PlaySVG} height="11px" />
          <span>{props.views}</span>
        </div>
        <div className="card-label">
          {(() => {
            const pattern = DateTime.compile("mm:ss");
            return DateTime.format(
              new Date(video_info.duration * 1000),
              pattern
            );
          })()}
        </div>
        <a href={`#/watch/${props.reflink}`}>
          <img
            style={{
              width: "100% !important",
              padding: "5px",
              maxHeight: "13em",
            }}
            className="img-fluid bg-dark"
            src={thumbnailUrl}
          />
        </a>
      </div>
      <a href={`#/watch/${props.reflink}`}>
        <b
          data-toggle="tooltip"
          data-placement="bottom"
          title={video_info.title}
          className="max-lines word-break"
          data-original-title={video_info.title}
        >
          {video_info.title}
        </b>
      </a>
      <div className="mt-2">
        <span className="black_col">
          <b>
            <a href={`#/user/${props.reflink}`}>
              {" "}
              <FaUser /> {reflink.root}
            </a>
          </b>
        </span>
        <br />
        <span>
          {(() => {
            const dateBest = convert(
              new Date().getTime() - (new Date(video_info.created) as any) / 1
            )
              .from("ms")
              .toBest();
            if (Math.round(dateBest.val) >= 2) {
              return `${Math.round(dateBest.val)} ${dateBest.plural} ago`;
            } else {
              return `${Math.round(dateBest.val)} ${dateBest.singular} ago`;
            }
          })()}
        </span>
        {props.isIpfs ? (
          <div className="card-label" style={{ right: "10px", bottom: "25px" }}>
            <OverlayTrigger
              overlay={
                <Tooltip id="video-available">Video available on IPFS</Tooltip>
              }
            >
              <img className="play_i" src={IpfsLogo} height="17px" />
            </OverlayTrigger>
          </div>
        ) : null}
      </div>
    </div>
  );
}
