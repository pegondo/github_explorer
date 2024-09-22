import DownloadIcon from "../../../../../public/icons/download";
import Pencil from "../../../../../public/icons/pencil";
import Rocket from "../../../../../public/icons/rocket";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CommonCard from "../Card";

/**
 * Returns the number of lines a string.
 * @param str {string} - The string.
 * @returns {number} - The number of lines in the string.
 */
const numberOfLines = (str: string): number => str.split(/\r\n|\r|\n/).length;

/**
 * Returns whether the given card body is too long.
 * @param body {string} - The card body.
 * @returns {boolean} - If the body is too long for the card.
 */
export const bodyTooLong = (body: string): boolean => numberOfLines(body) > 6;

type Props = {
  tagName: string;
  name?: string;
  body?: string;
  url: string;
  tarballUrl?: string;
  isDraft: boolean;
  isPrerelease: boolean;
  author: {
    name?: string;
    url: string;
  };
};

const Card = ({
  tagName,
  name,
  body,
  url,
  tarballUrl,
  isDraft,
  isPrerelease,
  author,
}: Props) => (
  <CommonCard>
    <div>
      <a href={url} target="_blank">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight ">
          {name || "Unnamed release"}
        </h5>
      </a>
      <p className="mb-3 text-opacity-75">
        <strong>Tag:</strong> {tagName}
      </p>
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
      {isDraft && (
        <div>
          <div className="pt-2 inline-flex gap-2">
            Draft <Pencil width={25} height={25} />
          </div>
        </div>
      )}
      {isPrerelease && (
        <div>
          <div className="inline-flex gap-2">
            Pre-release <Rocket width={25} height={25} />
          </div>
        </div>
      )}
      {tarballUrl && (
        <a
          href={tarballUrl}
          className="inline-flex gap-2 font-medium items-center text-blue-600 hover:underline"
        >
          Download <DownloadIcon width={25} height={25} />
        </a>
      )}
      {author?.name && (
        <div>
          <a href={author.url} target="_blank" className="text-s">
            By{" "}
            <span className="text-blue-600 hover:underline">{author.name}</span>
          </a>
        </div>
      )}
    </div>
  </CommonCard>
);
export default Card;
