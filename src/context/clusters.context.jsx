import { createContext, useState } from "react";
import { clustersWithSentences } from "../data/data-transformation";

export const ClustersContext = createContext({
  clusters: clustersWithSentences,
  setClusters: () => null,
});

export const ClustersProvider = ({ children }) => {
  const [clusters, setClusters] = useState(clustersWithSentences);

  const value = { clusters, setClusters };

  return (
    <ClustersContext.Provider value={value}>
      {children}
    </ClustersContext.Provider>
  );
};
