import { useContext } from "react";
import CircleComparator from "../circle-comparator/circle-comparator.component";
import { VolumesComparatorContext } from "../../contexts/volumes-comparator.context";
import { CurrentCategoryContext } from "../../contexts/current-category.context";
import BeginDateSelector from "../date-selector/begin-date.component";
import EndDateSelector from "../date-selector/end-date.component";

import opt from "../../utils/dates-data";

function VolumesComparator() {
  const {
    minEvolution,
    maxEvolution,
    avgEvolution,
    primaryMin,
    primaryMax,
    primaryAvg,
    secondaryMin,
    secondaryMax,
    secondaryAvg
  } = useContext(VolumesComparatorContext);

  const { title, nbKeywords, id } = useContext(CurrentCategoryContext);

  return (
    <div className="volumes-comparator">
      <h2 className="title">SUMMARY</h2>
      <div className="infos">
        <div className="category-details">
          <div className="id">
            <p>IDENTIFIER : </p>
            <span>{id}</span>
          </div>
          <div className="title">
            <p>NAME : </p>
            <span>{title}</span>
          </div>
          <div className="keywords">
            <p>KEYWORDS : </p>
            <span>{nbKeywords}</span>
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
            <i className="fa-solid fa-circle"></i>
            <div className="details">
              <strong className="number">{primaryAvg}</strong>
              <p>AVG</p>
              <span>Current</span>
            </div>
          </div>
          <div className="previous">
            <i className="fa-solid fa-circle"></i>
            <div className="details">
              <strong className="number">23</strong>
              <p>AVG</p>
              <span>1 Year Ago</span>
            </div>
          </div>
        </div>

        <div className="evolution">
          <div className="current">
            <i className="fa-solid fa-circle"></i>
            <div className="details">
              <strong className="number">{primaryMin}</strong>
              <p>MIN</p>
              <span>Current</span>
            </div>
          </div>
          <div className="previous">
            <i className="fa-solid fa-circle"></i>
            <div className="details">
              <strong className="number">{secondaryMin}</strong>
              <p>MIN</p>
              <span>1 Year Ago</span>
            </div>
          </div>
        </div>

        <div className="evolution">
          <div className="current">
            <i className="fa-solid fa-circle"></i>
            <div className="details">
              <strong className="number">{primaryMax}</strong>
              <p>MAX</p>
              <span>Current</span>
            </div>
          </div>
          <div className="previous">
            <i className="fa-solid fa-circle"></i>
            <div className="details">
              <strong className="number">{secondaryMax}</strong>
              <p>MAX</p>
              <span>1 Year Ago</span>
            </div>
          </div>
        </div>
      </div>
      <div className="circle-comparators">
      <CircleComparator
        title="AVG"
        value={primaryAvg}
        percentage={avgEvolution}
      ></CircleComparator>
      <CircleComparator
        title="MIN"
        value={primaryMin}
        percentage={minEvolution}
      ></CircleComparator>
      <CircleComparator
        title="MAX"
        value={primaryMax}
        percentage={maxEvolution}
      ></CircleComparator>
      </div>
      
    </div>
  );
}

export default VolumesComparator;
