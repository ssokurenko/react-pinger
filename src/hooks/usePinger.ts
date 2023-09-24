import { useState, useEffect } from "react";

interface PingerOptions {
  url?: string;
  bearerToken?: string;
  delayMs?: number;
}

interface PingerResult {
  pinging: boolean;
  success?: boolean;
  startPinging: () => void;
  stopPinging: () => void;
}

function usePinger({ url, bearerToken, delayMs }: PingerOptions): PingerResult {
  const [pinging, setPinging] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const ping = async () => {
    try {
      if (!url) throw "Provide url";
      const authHeaders = {
        Authorization: `Bearer ${bearerToken}`,
      };

      const response = await fetch(url, {
        method: "GET",
        headers: bearerToken ? authHeaders : {},
      });
      setSuccess(response.ok)
      console.log('response', response)

    } catch (error) {

      // Handle any network or other errors here
      console.error(`Error while pinging ${url}: ${error}`);
      setSuccess(false)
    }
  };

  useEffect(() => {
    let interval: number = 1000;

    if (pinging) {
      // Start pinging when pinging is true
      ping();
      interval = setInterval(ping, delayMs);
    } else {
      // Stop pinging when pinging is false
      clearInterval(interval);
    }

    return () => {
      // Cleanup: clear the interval when the component unmounts
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinging, url, delayMs, bearerToken]);

  return {
    pinging,
    success,
    startPinging: () => setPinging(true),
    stopPinging: () => setPinging(false),
  };
}

export default usePinger;
