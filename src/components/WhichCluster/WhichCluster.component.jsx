import { Fragment, useContext, useState } from "react";
import { ClustersContext } from "../../context/clusters.context";
import { UnClusteredContext } from "../../context/unClustered.context";
import SearchBox from "../SearchBox/SearchBox.component";
import "../clusters/clusters.styles.css";

const WhichCluster = ({ sentenceToAdd, isOpenHandler }) => {
  const { sentenceID, sentence } = sentenceToAdd;
  const { clusters, setClusters } = useContext(ClustersContext);
  const { unClusteredSentences, setUnClusteredSentences } =
    useContext(UnClusteredContext);

  const [searchField, setSearchField] = useState("");
  const [filteredClusterTitles, setFilteredClusterTitles] = useState(clusters);

  const onSearchChangeHandler = (e) => {
    const searchFieldString = e.target.value.toLowerCase();
    setSearchField(searchFieldString);

    setFilteredClusterTitles(
      clusters.filter((cluster) =>
        cluster.title.toLowerCase().includes(searchField)
      )
    );
  };

  const addSentenceToCluster = (clusterID) => {
    setClusters(
      clusters.map((cluster) =>
        cluster.id === clusterID
          ? { ...cluster, sentences: [...cluster.sentences, sentence] }
          : cluster
      )
    );
    setUnClusteredSentences(
      unClusteredSentences.filter(
        (sentenceMap) => sentenceMap.id !== sentenceID
      )
    );

    isOpenHandler(false);
  };

  return (
    <>
      <h3>Which Cluster?</h3>
      <SearchBox
        placeholder="Filter by Cluster Name"
        value={searchField}
        onChangeHandler={(e) => onSearchChangeHandler(e)}
      />
      {filteredClusterTitles.map((cluster) => (
        <Fragment key={cluster.id}>
          <h5>{cluster.title}</h5>
          <button
            type="button"
            className="button"
            onClick={() => addSentenceToCluster(cluster.id)}
          >
            Add To Above Cluster
          </button>
        </Fragment>
      ))}
    </>
  );
};

export default WhichCluster;
