import { useContext, useState } from "react";
import "./Sentences-Modal.styles.css";
import SearchBox from "../SearchBox/SearchBox.component";
import { UnClusteredContext } from "../../context/unClustered.context";
import { ClustersContext } from "../../context/clusters.context";

const SentencesModal = ({ title, sentences, isOpenHandler, clusterID }) => {
  const [searchField, setSearchField] = useState("");
  const [filteredSentences, setFilteredSentences] = useState(sentences);
  const { unClusteredSentences, setUnClusteredSentences } =
    useContext(UnClusteredContext);
  const { clusters, setClusters } = useContext(ClustersContext);

  const filterSentencesHandler = (e) => {
    const searchValue = e.target.value.toLowerCase();

    setFilteredSentences(
      sentences.filter((sentenceMap) => {
        return sentenceMap.sentence.includes(searchValue);
      })
    );

    setSearchField(searchValue);
  };

  const removeSentenceFromCluster = (id, sentence) => {
    setUnClusteredSentences([...unClusteredSentences, { id, sentence }]);

    const specificCluster = clusters.find(
      (cluster) => cluster.id === clusterID
    );
    const filteredSentences = specificCluster.sentences.filter(
      (sentenceInArray) => sentenceInArray !== sentence
    );
    setClusters(
      clusters.map((cluster) =>
        cluster.id === clusterID
          ? { ...cluster, sentences: filteredSentences }
          : cluster
      )
    );

    isOpenHandler(false);
  };
  // redo whole data structure of clusters so that it has an array of objects like this:
  // [{sentenceID: "", sentence: ""}], otherwise will filter out duplicate sentences too.

  return (
    <div className="modal">
      <h2 className="modal__header">{title}</h2>
      <SearchBox
        placeholder="Search Sentences"
        value={searchField}
        onChangeHandler={(e) => filterSentencesHandler(e)}
      />
      <div className="modal__content">
        {filteredSentences.map((sentenceMap) => (
          <div
            key={sentenceMap.sentenceID}
            className="sentence-and-button-container"
          >
            <p>{sentenceMap.sentence}</p>
            <button
              className="button"
              type="button"
              onClick={() =>
                removeSentenceFromCluster(
                  sentenceMap.sentenceID,
                  sentenceMap.sentence
                )
              }
            >
              Remove Above Sentence from Cluster
            </button>
          </div>
        ))}
      </div>
      <div className="modal__footer">
        <button type="button" onClick={() => isOpenHandler(false)}>
          Close Window
        </button>
      </div>
    </div>
  );
};

export default SentencesModal;
