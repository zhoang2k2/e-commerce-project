import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import "./feedback.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Feedback() {
  return (
    <div className="feedback-container">
      <h2>What do customers think about us?</h2>
      <div className="customer-feedback">
        {/* FIRST */}
        <div className="feedback-card">
          <div className="customer-img">
            <img src="https://i.imgur.com/64xI96q.jpeg" alt="customer" />
          </div>
          <div className="customer-text">
            <h3>Michael J.</h3>
            <p>
              "Love da kitty so much! just wanna YÉHEE whenever see them..."
            </p>
            <FontAwesomeIcon icon={faQuoteRight} />
          </div>
        </div>
        {/* SECOND */}
        <div className="feedback-card">
          <div className="customer-img">
            <img src="https://i.imgur.com/HVBLzWd.jpeg" alt="customer" />
          </div>
          <div className="customer-text">
            <h3>Roar Singer</h3>
            <p>
              "What a nice brand name. Love the kitty more when they ROARR!!"
            </p>
            <FontAwesomeIcon icon={faQuoteRight} />
          </div>
        </div>
        {/* THIRD */}
        <div className="feedback-card">
          <div className="customer-img">
            <img src="https://i.imgur.com/9sj2HJT.jpeg" alt="customer" />
          </div>
          <div className="customer-text">
            <h3>Rick Astley</h3>
            <p>"Never gonna give you up...Never gonna put kitty down..."</p>
            <FontAwesomeIcon icon={faQuoteRight} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
