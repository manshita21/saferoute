export default function ScoreBreakdown({ score }) {
    const getColor = () => {
      if (score >= 80) return "#22c55e";   // green
      if (score >= 50) return "#facc15";   // yellow
      return "#ef4444";                    // red
    };
  
    return (
      <div style={styles.container}>
        <h3>Safety Score</h3>
  
        <div style={styles.barWrapper}>
          <div
            style={{
              ...styles.bar,
              width: `${score}%`,
              background: getColor()
            }}
          />
        </div>
  
        <p>{score}/100</p>
      </div>
    );
  }
  
  const styles = {
    container: {
      marginTop: "20px",
      padding: "20px",
      background: "#1e293b",
      borderRadius: "12px",
      textAlign: "center",
      color: "white"
    },
  
    barWrapper: {
      width: "100%",
      height: "14px",
      background: "#334155",
      borderRadius: "8px",
      marginTop: "10px",
      overflow: "hidden"
    },
  
    bar: {
      height: "100%",
      borderRadius: "8px",
      transition: "0.4s ease"
    }
  };
  