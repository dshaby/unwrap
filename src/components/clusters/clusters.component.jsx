import { useContext, useState } from "react";
import SearchBox from "../SearchBox/SearchBox.component";
import SentencesModal from "../Sentences-Modal/Sentences-Modal.component";
import WhichCluster from "../WhichCluster/WhichCluster.component";
import { ClustersContext } from "../../context/clusters.context";
import { UnClusteredContext } from "../../context/unClustered.context";
import "./clusters.styles.css";

const Clusters = () => {
  const { clusters, setClusters } = useContext(ClustersContext);
  const { unClusteredSentences } = useContext(UnClusteredContext);

  const [filteredTitles, setFilteredTitles] = useState(clusters);
  const [searchField, setSearchField] = useState("");
  const [isTitleClicked, setIsTitleClicked] = useState(false);
  const [sentencesByCID, setSentencesByCID] = useState([]);
  const [isFilteringAccepted, setIsFilteringAccepted] = useState(false);
  const [isAddingSentenceToCluster, setIsAddingSentenceToCluster] =
    useState(false);
  const [sentenceToAdd, setSentenceToAdd] = useState({});
  const [specificTitleID, setSpecificTitleID] = useState({});

  const [unClusteredSearchField, setUnClusteredSearchField] = useState("");
  const [filteredUnClusteredSentences, setFilteredUnClusteredSentences] =
    useState(unClusteredSentences);

  const onSearchChangeHandler = (e) => {
    const searchFieldString = e.target.value.toLowerCase();
    setSearchField(searchFieldString);

    setFilteredTitles(
      clusters.filter((cluster) => {
        return cluster.title.toLowerCase().includes(searchField);
      })
    );
  };

  const titleClickHandler = (clusterID) => {
    const specificCluster = clusters.find(
      (cluster) => cluster.id === clusterID
    );
    const sentences = [];

    for (let i = 0; i < specificCluster.sentences.length; i++) {
      const sentenceID = specificCluster.sentenceIDs[i];
      const sentence = specificCluster.sentences[i];
      sentences.push({ sentenceID, sentence });
    }

    setSentencesByCID(sentences);
    const specificTitle = specificCluster.title;
    setSpecificTitleID({ specificTitle, clusterID });

    setIsTitleClicked(!isTitleClicked);
  };

  const editClusterOnClickHandler = (clusterID, acceptedValue) => {
    const newFilteredClusters = filteredTitles.map((cluster) =>
      cluster.id === clusterID
        ? { ...cluster, accepted: acceptedValue === "1" ? "0" : "1" }
        : cluster
    );
    setClusters(newFilteredClusters);
    setFilteredTitles(newFilteredClusters);
  };

  const filterAccepted = () => {
    const clustersWithAcceptedFilter = clusters.filter((cluster) =>
      isFilteringAccepted ? cluster.accepted === "0" : cluster.accepted === "1"
    );

    setIsFilteringAccepted(!isFilteringAccepted);
    setFilteredTitles(clustersWithAcceptedFilter);
  };

  const resetFilters = () => {
    setFilteredTitles(clusters);
  };

  const addSentenceToCluster = (sentenceID, sentence) => {
    setSentenceToAdd({ sentenceID, sentence });
    setIsAddingSentenceToCluster(true);
  };

  const onUnClusteredSearchChange = (e) => {
    const searchFieldString = e.target.value.toLowerCase();
    setUnClusteredSearchField(searchFieldString);

    setFilteredUnClusteredSentences(
      unClusteredSentences.filter((sentenceMap) => {
        return sentenceMap.sentence
          .toLowerCase()
          .includes(unClusteredSearchField);
      })
    );
  };

  return (
    <>
      <h1>ALL Clusters</h1>
      <SearchBox
        placeholder="Search Cluster Titles"
        value={searchField}
        onChangeHandler={onSearchChangeHandler}
      />
      <div className="buttons-container">
        <button type="button" className="button" onClick={filterAccepted}>
          {isFilteringAccepted ? (
            <span>View UNACCEPTED Clusters</span>
          ) : (
            <span>View ACCEPTED Clusters</span>
          )}
        </button>
        <button
          type="reset"
          className="inverted-button button"
          onClick={resetFilters}
        >
          View ALL Clusters
        </button>
      </div>
      <div className="all-clusters">
        {filteredTitles.map((cluster) => (
          <div className="cluster-structure" key={cluster.id}>
            <h3>{cluster.title}</h3>

            {cluster.accepted === "1" ? (
              <span className="acceptance-status">ACCEPTED</span>
            ) : (
              <span className="acceptance-status">NOT ACCEPTED</span>
            )}
            <button
              type="button"
              className="button"
              onClick={() =>
                editClusterOnClickHandler(cluster.id, cluster.accepted)
              }
            >
              {cluster.accepted === "1" ? (
                <span>UNACCEPT</span>
              ) : (
                <span>ACCEPT</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => titleClickHandler(cluster.id)}
              className="inverted-button button"
            >
              SHOW SENTENCES
            </button>
          </div>
        ))}
      </div>
      {isTitleClicked && (
        <SentencesModal
          clusterID={specificTitleID.clusterID}
          title={specificTitleID.specificTitle}
          sentences={sentencesByCID}
          isOpenHandler={setIsTitleClicked}
        />
      )}

      <h2 id="unClustered-heading">UNCLUSTERED SENTENCES</h2>

      {isAddingSentenceToCluster && (
        <WhichCluster
          sentenceToAdd={sentenceToAdd}
          isOpenHandler={() => setIsAddingSentenceToCluster()}
        />
      )}

      <SearchBox
        className="UnClustered-Search-box"
        placeholder="Search UnClustered Sentences"
        value={unClusteredSearchField}
        onChangeHandler={(e) => onUnClusteredSearchChange(e)}
      />

      <div className="all-unClustered-container">
        {filteredUnClusteredSentences.map((sentenceMap) => (
          <div className="single-unClustered-container" key={sentenceMap.id}>
            <p>{sentenceMap.sentence}</p>
            <button
              type="button"
              className="button"
              onClick={() =>
                addSentenceToCluster(sentenceMap.id, sentenceMap.sentence)
              }
            >
              Add SENTENCE TO A CLUSTER
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
export default Clusters;
