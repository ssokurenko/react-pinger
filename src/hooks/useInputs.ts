import useLocalStorage from "./useLocalStorage";

const useInputs = () => {
  const [url, setUrl] = useLocalStorage<string>("url", undefined); // Default URL
  const [bearerToken, setBearerToken] = useLocalStorage<string>(
    "bearerToken",
    undefined
  ); // Default JWT token
  const [delayMs, setDelayMs] = useLocalStorage<number>("delayMs", 5000); // Default delay in milliseconds

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleBearerTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBearerToken(e.target.value);
  };

  const handleDelayMsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelayMs(Number(e.target.value));
  };

  return {
    url,
    bearerToken,
    delayMs,
    handleUrlChange,
    handleBearerTokenChange,
    handleDelayMsChange,
  };
};

export default useInputs;
