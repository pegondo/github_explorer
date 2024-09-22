import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CommonCard from "../Card";
import { bodyTooLong } from "../GitHubRelease/Card";
import Open from "../../../../../public/icons/open";
import Closed from "../../../../../public/icons/closed";

// TODO: Consider moving some common code together.

type Props = {
  title: string;
  number: number;
  body?: string;
  url: string;
  state: "open" | "closed";
  stateReason?: "completed" | "reopened" | "not_planned";
  user?: {
    name?: string;
    login: string;
    url: string;
  };
  assignee?: {
    name?: string;
    login: string;
    url: string;
  };
};

const Card = ({
  title,
  number,
  body,
  url,
  state,
  stateReason,
  user,
  assignee,
}: Props) => (
  <CommonCard>
    <div>
      <a href={url} target="_blank">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight ">
          Issue #{number}: {title}
        </h5>
      </a>
      {body && (
        <div>
          <div className="line-clamp-6 pb-2">
            <div className="prose">
              <ReactMarkdown rehypePlugins={[rehypeRaw]} skipHtml={false}>
                {body}
              </ReactMarkdown>
            </div>
          </div>
          {bodyTooLong(body) && (
            <a
              href={url}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Read more...
            </a>
          )}
        </div>
      )}
      {state === "open" ? (
        <div>
          <div className="pt-2 inline-flex gap-2">
            Open <Open width={25} height={25} />
          </div>
        </div>
      ) : (
        <div>
          <div className="pt-2 inline-flex gap-2">
            Closed <Closed width={25} height={25} />
          </div>
        </div>
      )}
      {stateReason && <p>Reason: {stateReason}</p>}
      {user?.login && (
        <div>
          <a href={user.url} target="_blank" className="text-s">
            By{" "}
            <span className="text-blue-600 hover:underline">{user.login}</span>
          </a>
        </div>
      )}
      {assignee?.login && (
        <div>
          <a href={assignee.url} target="_blank" className="text-s">
            Assigned to{" "}
            <span className="text-blue-600 hover:underline">
              {assignee.login}
            </span>
          </a>
        </div>
      )}
    </div>
  </CommonCard>
);
export default Card;
