import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CommonCard from "../Card";
import { bodyTooLong } from "../GitHubRelease/Card";
import Open from "../../../../../public/icons/open";
import Closed from "../../../../../public/icons/closed";

// TODO: Consider moving some common code together.

export type Props = {
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
  <CommonCard data-testid="github-issues-card">
    <div>
      <a href={url} target="_blank" data-testid="repositories-card-url">
        <h5
          className="mb-2 text-2xl font-semibold tracking-tight"
          data-testid="repositories-card-title-header"
        >
          Issue #{number}: {title}
        </h5>
      </a>
      {body && (
        <div>
          <div className="line-clamp-6 pb-2">
            <div className="prose" data-testid="repositories-card-body">
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
        <div data-testid="repositories-card-open-icon">
          <div className="pt-2 inline-flex gap-2">
            Open <Open width={25} height={25} />
          </div>
        </div>
      ) : (
        <div data-testid="repositories-card-closed-icon">
          <div className="pt-2 inline-flex gap-2">
            Closed <Closed width={25} height={25} />
          </div>
        </div>
      )}
      {stateReason && <p>Reason: {stateReason}</p>}
      {user?.login && (
        <div>
          <a
            href={user.url}
            target="_blank"
            className="text-s"
            data-testid="repositories-card-user"
          >
            By{" "}
            <span className="text-blue-600 hover:underline">{user.login}</span>
          </a>
        </div>
      )}
      {assignee?.login && (
        <div>
          <a
            href={assignee.url}
            target="_blank"
            className="text-s"
            data-testid="repositories-card-assignee"
          >
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
