import { feedback_clusters } from "../data/feedback_clusters";
import { feedback_sentences } from "../data/feedback_sentences";
import { sentence_cluster_mapping } from "../data/sentence_cluster_mapping";

// Adding two new arrays to each cluster
const clustersWithArrays = feedback_clusters.map((cluster) => ({
  ...cluster,
  sentenceIDs: [],
  sentences: [],
}));

// Adding sentence IDs
for (let i = 0; i < clustersWithArrays.length; i++) {
  let clusterID = clustersWithArrays[i].id;

  for (let j = 0; j < sentence_cluster_mapping.length; j++) {
    let sentenceID = sentence_cluster_mapping[j].sentence_id;
    let CIDMap = sentence_cluster_mapping[j].cluster_id;

    if (CIDMap === clusterID) {
      clustersWithArrays[i].sentenceIDs.push(sentenceID);
    }
  }
}

// Adding Sentence Text
for (let i = 0; i < clustersWithArrays.length; i++) {
  let sentenceIDs = clustersWithArrays[i].sentenceIDs;

  for (let j = 0; j < sentenceIDs.length; j++) {
    let sentenceID = sentenceIDs[j];

    for (let p = 0; p < feedback_sentences.length; p++) {
      let sentence = feedback_sentences[p].sentence_text;

      if (sentenceID === feedback_sentences[p].id)
        clustersWithArrays[i].sentences.push(sentence);
    }
  }
}

export const clustersWithSentences = clustersWithArrays;

const unClusteredArray = [{ sentence: "", id: "" }]; //grab ID & sentence
const unClusteredSentencesArray = [];

const mappedSentenceIDs = [];
const unmappedSentenceIDs = [];

for (let i = 0; i < sentence_cluster_mapping.length; i++) {
  let sentenceID = sentence_cluster_mapping[i].sentence_id;
  mappedSentenceIDs.push(sentenceID);
}

for (let i = 0; i < feedback_sentences.length; i++) {
  let sentenceID = feedback_sentences[i].id;

  const foundMappedSID = mappedSentenceIDs.find((mID) => mID === sentenceID);

  if (!foundMappedSID) {
    unmappedSentenceIDs.push(sentenceID);
  }
}

// console.log({ mappedSentenceIDs });
// console.log({ unmappedSentenceIDs });
// console.log(feedback_sentences.length);
// console.log(sentence_cluster_mapping.length);

for (let i = 0; i < unmappedSentenceIDs.length; i++) {
  const unMappedSID = unmappedSentenceIDs[i];

  for (let j = 0; j < feedback_sentences.length; j++) {
    const anySID = feedback_sentences[j].id;

    if (unMappedSID === anySID) {
      unClusteredSentencesArray.push({
        id: feedback_sentences[j].id,
        sentence: feedback_sentences[j].sentence_text,
      });
    }
  }
}

export const unClusteredSentences = unClusteredSentencesArray;
