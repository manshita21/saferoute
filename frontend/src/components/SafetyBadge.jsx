export default function SafetyBadge({score}){
  let text="Safe";
  if(score<70) text="Moderate";
  if(score<40) text="High Risk";

  return(
    <div className="glass">
      <h3>Safety Score: {score}</h3>
      <h4>{text}</h4>
    </div>
  );
}
