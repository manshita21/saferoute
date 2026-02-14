export function calculateSafety() {

    const hour = new Date().getHours();
  
    let base = Math.floor(Math.random() * 40) + 50;
  
    if (hour > 22 || hour < 5) {
      base -= 20;
    }
  
    return Math.max(10, base);
  }
  