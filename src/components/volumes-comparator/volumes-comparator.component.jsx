import { useContext } from "react";
import CircleComparator from "../circle-comparator/circle-comparator.component";
import { VolumesComparatorContext } from "../../contexts/volumes-comparator.context";
import { CurrentCategoryContext } from "../../contexts/current-category.context";
import BeginDateSelector from "../date-selector/begin-date.component";
import EndDateSelector from "../date-selector/end-date.component";

import opt from "../../utils/dates-data";

const VolumesComparator = () => {
  const {
    minEvolution,
    maxEvolution,
    avgEvolution,
    primaryMin,
    primaryMax,
    primaryAvg,
    secondaryMin,
    secondaryMax,
    secondaryAvg,
  } = useContext(VolumesComparatorContext);

  const { currentCategoryInfos } = useContext(CurrentCategoryContext);

  return (
    <div className="volumes-comparator">
      <h2 className="title">SUMMARY</h2>
      <div className="infos">
        <div className="category-details">
          <div className="title">
            <p>NAME : </p>
            <span>{currentCategoryInfos.title}</span>
          </div>
          <div className="keywords">
            <p>KEYWORDS : </p>
            <span>{currentCategoryInfos.nbKeywords}</span>
          </div>
          <div className="id">
            <p>IDENTIFIER : </p>
            <span>{currentCategoryInfos.id}</span>
          </div>
        </div>
        <div className="period-selection">
          <p>- Select the period range :</p>
          <div className="date-selectors">
            <BeginDateSelector label={"STARTING DATE"} options={opt} />
            <EndDateSelector label={"ENDING DATE"} options={opt} />
          </div>
        </div>

        <div className="evolution">
          <div className="current">
            <div className="circle-dot-container">
              <div className="circle-dot average-dot"></div>
            </div>
            <div className="details">
              <strong className="">{primaryAvg}</strong>
              <p className="average-label">AVG</p>
              <span className="">Current</span>
            </div>
          </div>
          <div className="previous">
            <div className="circle-dot-container">
              <div className="circle-dot average-dot"></div>
            </div>
            <div className="details">
              <strong className="">{secondaryAvg}</strong>
              <p className="average-label">AVG</p>
              <span className="">1 Year Ago</span>
            </div>
          </div>
        </div>

        <div className="evolution">
          <div className="current">
            <div className="circle-dot-container">
              <div className="circle-dot minimum-dot"></div>
            </div>
            <div className="details">
              <strong className="">{primaryMin}</strong>
              <p className="minimum-label">MIN</p>
              <span className="">Current</span>
            </div>
          </div>
          <div className="previous">
            <div className="circle-dot-container">
              <div className="circle-dot minimum-dot"></div>
            </div>
            <div className="details">
              <strong className="">{secondaryMin}</strong>
              <p className="minimum-label">MIN</p>
              <span className="">1 Year Ago</span>
            </div>
          </div>
        </div>

        <div className="evolution">
          <div className="current">
            <div className="circle-dot-container">
              <div className="circle-dot maximum-dot"></div>
            </div>
            <div className="details">
              <strong className="number">{primaryMax}</strong>
              <p className="maximum-label">MAX</p>
              <span>Current</span>
            </div>
          </div>
          <div className="previous">
            <div className="circle-dot-container">
              <div className="circle-dot maximum-dot"></div>
            </div>
            <div className="details">
              <strong className="">{secondaryMax}</strong>
              <p className="maximum-label">MAX</p>
              <span>1 Year Ago</span>
            </div>
          </div>
        </div>
      </div>
      <div className="circle-comparators">
        <CircleComparator
          title="AVG"
          percentage={avgEvolution}
          className={"circle-comparator average-circle"}
        ></CircleComparator>
        <CircleComparator
          title="MIN"
          percentage={minEvolution}
          className={"circle-comparator minimum-circle"}
        ></CircleComparator>
        <CircleComparator
          title="MAX"
          percentage={maxEvolution}
          className={"circle-comparator maximum-circle"}
        ></CircleComparator>
      </div>
    </div>
  );
}

export default VolumesComparator;
