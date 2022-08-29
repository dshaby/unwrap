import { createContext, useState } from "react";
import { unClusteredSentences as sentences } from "../components/test";

export const UnClusteredContext = createContext({
  unClusteredSentences: sentences,
  setUnClusteredSentences: () => null,
});

export const UnClusteredProvider = ({ children }) => {
  const [unClusteredSentences, setUnClusteredSentences] = useState(sentences);
  const value = { unClusteredSentences, setUnClusteredSentences };

  return (
    <UnClusteredContext.Provider value={value}>
      {children}
    </UnClusteredContext.Provider>
  );
};
