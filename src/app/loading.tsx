import LoadingComponent from "@/components/loading/Loading";

const LONG_LOADING_TIME = 6000;

const Loading = () => (
  <div data-testid="loading">
    <LoadingComponent tooLongToLoadTime={LONG_LOADING_TIME} />
  </div>
);

export default Loading;
